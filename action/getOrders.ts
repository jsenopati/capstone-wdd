import prisma from "@/lib/prisma"

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        User: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return orders
  } catch (error: any) {
    throw new Error(error)
  }
}
