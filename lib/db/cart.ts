"use server"

import { Cart, CartItem, Prisma } from "@prisma/client"
import prisma from "../prisma"
import { cookies } from "next/dist/client/components/headers"
import { getCurrentUser } from "@/action/getCurrentUser"

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { Product: true } } }
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { Product: true }
}>

export type ShoppingCart = CartWithProducts & {
  size: number
  subtotal: number
}

export async function getCart(): Promise<ShoppingCart | null> {
  const user = await getCurrentUser()
  let cart: CartWithProducts | null = null

  if (user) {
    cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: { items: { include: { Product: true } } }
    })
  } else {
    const localCartId = cookies().get("localCartId")?.value
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { Product: true } } }
        })
      : null
  }

  if (!cart) {
    return null
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.Product.price,
      0
    )
  }
}

export async function createCart(): Promise<ShoppingCart> {
  const user = await getCurrentUser()
  let newCart: Cart

  if (user) {
    newCart = await prisma.cart.create({
      data: { userId: user.id }
    })
  } else {
    newCart = await prisma.cart.create({
      data: {}
    })
    cookies().set("localCartId", newCart.id)
  }

  //encrypt later

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0
  }
}

export async function mergeCarts(userId: string) {
  const localCartId = cookies().get("localCartId")?.value

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true }
      })
    : null

  if (!localCart) return

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true }
  })

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items)

      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id }
      })

      await tx.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          ProductId: item.ProductId,
          quantity: item.quantity
        }))
      })
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                ProductId: item.ProductId,
                quantity: item.quantity
              }))
            }
          }
        }
      })
    }

    await tx.cart.delete({
      where: { id: localCart.id }
    })

    cookies().set("localCartId", "")
  })
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.ProductId === item.ProductId)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        acc.push(item)
      }
    })
    return acc
  }, [] as CartItem[])
}
