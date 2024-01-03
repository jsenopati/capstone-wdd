import prisma from "@/lib/prisma"

export const getTotalRevenue = async () => {
  const paidOrders = await prisma.order.findMany({
    where: {
      isPaid: true
    },
    include: {
      items: {
        include: {
          Product: true
        }
      }
    }
  })

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.items.reduce((orderSum, item) => {
      return orderSum + item.Product.price * item.quantity
    }, 0)

    return total + orderTotal
  }, 0)
  return totalRevenue
}
