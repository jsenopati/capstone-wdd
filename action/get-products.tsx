import { Product } from "@/lib/types"
import prisma from "@/lib/prisma"

const getProducts = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany()

  return products
}

export default getProducts
