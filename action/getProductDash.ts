import prisma from "@/lib/prisma"

export default async function getProductDash() {
  try {
    const orders = await prisma.product.findMany({
      orderBy: {
        name: "desc"
      }
    })
    return orders
  } catch (error: any) {
    throw new Error(error)
  }
}
