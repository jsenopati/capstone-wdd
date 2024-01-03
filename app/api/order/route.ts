import { getCurrentUser } from "@/action/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }

  const body = await request.json()
  const { id, status } = body
  const order = await prisma.order.update({
    where: { id: id },
    data: { status }
  })
  return NextResponse.json(order)
}
