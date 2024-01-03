import { getCurrentUser } from "@/action/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }
  const product = await prisma.product.delete({
    where: { id: params.id }
  })
  return NextResponse.json(product)
}
