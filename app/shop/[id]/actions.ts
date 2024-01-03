"use server"

import { createCart, getCart } from "@/lib/db/cart"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function incrementProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart())

  const articleInCart = cart.items.find((item) => item.ProductId === productId)

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: quantity } }
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        ProductId: productId,
        quantity: quantity
      }
    })
  }

  revalidatePath("/shop/[id]")
}
