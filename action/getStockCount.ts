import prisma from "@/lib/prisma"

export const getStockCount = async () => {
  const stockCount = await prisma.product.count({
    where: {
      inventory: true
    }
  })
  return stockCount
}
