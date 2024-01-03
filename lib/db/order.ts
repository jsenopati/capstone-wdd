import { getCurrentUser } from "@/action/getCurrentUser"
import { Prisma } from "@prisma/client"
import prisma from "../prisma"

export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: { items: { include: { Product: true } } }
}>

export type OrderItemWithProduct = Prisma.OrderItemGetPayload<{
  include: { Product: true }
}>

export type Order = OrderWithProduct & {
  subtotal: number
}

export async function getOrder() {
  const user = await getCurrentUser()
  const order = await prisma.order.findMany({
    where: {
      userId: user?.id,
      isPaid: true
    },
    include: {
      items: {
        include: {
          Product: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  })

  if (!order) {
    return null
  }

  return order
}
