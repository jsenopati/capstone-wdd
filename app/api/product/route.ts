import { getCurrentUser } from "@/action/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }

  const body = await request.json()
  const {
    name,
    type,
    price,
    stripe,
    inventory,
    description,
    percentage,
    imageurl
  } = body

  const product = await prisma.product.create({
    data: {
      name,
      type,
      price: parseFloat(price),
      stripe,
      inventory,
      description,
      percentage,
      imageurl
    }
  })
  return NextResponse.json(product)
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }

  const body = await request.json()
  const { id, inventory } = body
  const product = await prisma.product.update({
    where: { id: id },
    data: { inventory }
  })
  return NextResponse.json(product)
}
