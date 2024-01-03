"use client"
import { Prisma } from "@prisma/client"
import { Order, Product, User } from "@prisma/client"

interface StatsProps {
  orders: Order[]
  products: Product[]
  users: User[]
}

const Stats: React.FC<StatsProps> = () => {
  return (
    <div>Stats</div>
  )
}
export default Stats