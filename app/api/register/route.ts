import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface RequestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()
  
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10)
    }
  })
    return NextResponse.json(user)
}
