"use client"

import React, { useEffect, useState, useTransition } from "react"
import toast from "react-hot-toast"
import { AiOutlineShoppingCart } from "react-icons/ai"

type AddtoCartButtonProps = {
  productId: string
  incrementProductQuantity: (
    productId: string,
    quantity: number
  ) => Promise<void>
}

export default function AddtoCartButton({
  productId,
  incrementProductQuantity
}: AddtoCartButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [quantity, setQuantity] = useState<number>(1)

  const quantityOptions: JSX.Element[] = []
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    )
  }

  return (
    <section>
      <h2 className="pb-2">Quantity:</h2>
      <select
        className="text-black rounded-md h-[2rem] w-[4rem] pl-4 bg-gray-200"
        defaultValue={1}
        onChange={(e) => {
          const newQuantity = parseInt(e.currentTarget.value)
          setQuantity(newQuantity)
        }}
      >
        <option value={0}>0</option>
        {quantityOptions}
      </select>
      <hr className="my-4 lg:w-2/3" />
      <div className="flex items-center gap-2">
        <button
          className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] text-white rounded-2xl ouline-none transition-all focus:scale-110 hover:scale-110 active:scale-105 bg-orange-500  disabled:scale-100 disabled:bg-opacity-65"
          onClick={() => {
            startTransition(async () => {
              await incrementProductQuantity(productId, quantity)
              setSuccess(true)
              if ({ success }) {
                toast.success("Added to Cart")
              }
            })
          }}
        >
          {isPending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          ) : (
            <>
              Add to cart{" "}
              <AiOutlineShoppingCart size="20" className="text-xs opacity-70" />
            </>
          )}
        </button>
      </div>
    </section>
  )
}
