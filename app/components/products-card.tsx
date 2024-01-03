"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "@/lib/types"
import { motion } from "framer-motion"

type ProductsProps = {
  product: Product[]
}

export default function Products({ product }: ProductsProps) {
  const router = useRouter()

  return (
    <motion.section
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay: 0.2, duration: 0.6}}
    >
      <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3 text-lg text-gray-800">
        {product.map((product) => (
          <div
            className="pt-4 p-2 pb-5 flex flex-col max-w-[40rems] bg-gradient-to-l from-black via-gray-900 to-black text-white rounded sm:hover:scale-[1.05] transition-all group cursor-pointer"
            onClick={() => {
              router.push(`/shop/${product.id}`)
            }}
          >
            <div className="flex justify-center overflow-hidden">
              <Image
              src={product.imageurl}
              width={400}
              height={400}
              alt={product.name}
            />
            </div>
            
            <div className=" ">{product.name}</div>
            <div className=" ">{product.type}</div>
            <div>
              <hr></hr>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex">${product.price}</div>
            </div>
          </div>
        ))}
      </ul>
    </motion.section>
  )
}
