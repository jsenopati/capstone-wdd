import { CartItemWithProduct, getCart } from "@/lib/db/cart"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/action/getCurrentUser"
import { Order } from "@prisma/client"

type CartEntryProps = {
  cartItem: CartItemWithProduct
}

export async function POST() {
  const cart = await getCart()

  if (!cart || null) {
    return new NextResponse("cart is required", { status: 400 })
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  cart.items.forEach((item) => {
    line_items.push({
      quantity: item.quantity,
      price_data: {
        currency: "CAD",
        product_data: {
          name: item.Product.name
        },
        unit_amount: item.Product.stripe
      }
    })
  })

  const user = await getCurrentUser()
  let newOrder: Order

  if (user) {
    newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        isPaid: false,
        total: cart.subtotal,
        items: {
          create: cart.items.map((item) => ({
            Product: {
              connect: {
                id: item.ProductId
              }
            },
            quantity: item.quantity
          }))
        }
      }
    })
  } else {
    newOrder = await prisma.order.create({
      data: {
        isPaid: false,
        total: cart.subtotal,
        items: {
          create: cart.items.map((item) => ({
            Product: {
              connect: {
                id: item.ProductId
              }
            },
            quantity: item.quantity
          }))
        }
      }
    })
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: false
    },
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/cart?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/cart?cancel=true`,
    metadata: {
      orderId: newOrder.id
    }
  })

  return NextResponse.json({ url: session.url })
}
