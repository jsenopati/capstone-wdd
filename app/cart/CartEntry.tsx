"use client"

import React, { useTransition } from "react"
import { CartItemWithProduct } from "@/lib/db/cart"
import Image from "next/image"
import Link from "next/link"

type CartEntryProps = {
  cartItem: CartItemWithProduct
  setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export default function CartEntry({
  cartItem: { Product, quantity },
  setProductQuantity
}: CartEntryProps) {
  const quantityOptions: JSX.Element[] = []
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    )
  }
  const [isPending, startTransition] = useTransition()
  const total = Product.price * quantity

  return (
    <div>
      <div className="flex flex-wrap flex-col sm:flex-row items-center gap-3 mx-2 pb-2">
        <div className="pt-4 p-2 flex flex-col bg-gradient-to-l from-black via-gray-900 to-black text-white rounded hover:scale-[1.05] transition-all group sm:mr-5">
          <Link href={"/shop/" + Product.id}>
            <Image
              src={Product.imageurl}
              alt={Product.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </Link>
        </div>
        <div>
          <Link href={"/shop/" + Product.id}>{Product.name}</Link>
          <div>Price: ${Product.price.toFixed(2)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="text-black rounded-md h-[2rem] w-[4rem] pl-4 bg-gray-200"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value)
                startTransition(async () => {
                  await setProductQuantity(Product.id, newQuantity)
                })
              }}
            >
              <option value={0}>0</option>
              {quantityOptions}
            </select>
          </div>

          <div className="flex items-center gap-3">
            Total: ${total.toFixed(2)}
            {isPending && (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            )}
          </div>
        </div>
      </div>
      <hr className="pb-2" />
    </div>
  )
}
