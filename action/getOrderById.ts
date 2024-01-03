import prisma from "@/lib/prisma"

interface IParams {
  orderId?: string
}

export default async function getOrderByID(params: IParams) {
  try {
    const { orderId } = params
    const order = await prisma.order.findFirst({
      where: {
        id: orderId
      },
      include: {
        items: {
          include: {
            Product: true
          }
        }
      }
    })
    if (!order) return null
    return order
  } catch (error: any) {
    throw new Error(error)
  }
}
