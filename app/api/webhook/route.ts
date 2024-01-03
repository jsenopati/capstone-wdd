import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const address = session?.customer_details?.address
  const email = session?.customer_details?.email
  const name = session?.customer_details?.name

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ]

  const addressString = addressComponents.filter((c) => c !== null).join(", ")

  if (event.type === "checkout.session.completed") {
    const order = await prisma.order.update({
      where: {
        id: session?.metadata?.orderId
      },
      data: {
        isPaid: true,
        address: addressString,
        sEmail: email,
        sName: name
      },
      include: {
        items: true
      }
    })

    const productIds = order.items.map((item) => item.ProductId)

    await prisma.product.updateMany({
      where: {
        id: {
          in: [...productIds]
        }
      },
      data: order.items.map((item) => ({
        inventory: {
          decrement: item.quantity
        }
      }))
    })
  }
  return new NextResponse(null, { status: 200 })
}