import { getOrder } from "@/lib/db/order"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import getOrderByID from "@/action/getOrderById"
import { getCurrentUser } from "@/action/getCurrentUser"
import AccessDenied from "@/app/components/accessDenied"

interface IParams {
  orderId?: string
}

const Order = async ({ params }: { params: IParams }) => {
    const order = await getOrderByID(params)
    const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccessDenied title="Access Denied. Redirecting..." />
  }

  return (
    <div className="min-h-screen mt-24 mx-4 sm:mx-16">
      <h1 className="text-3xl font-bold mb-6"></h1>
      <hr className="pb-2" />

      <div className="">
        <div className="flex flex-col md:flex-row w-full justify-between">
          <div className="pb-4">
            {order?.items.map((item) => (
              <div className="flex flex-wrap flex-col sm:flex-row items-center gap-3 mx-2 pb-2">
                <div className="pt-4 p-2 flex flex-col bg-gradient-to-l from-black via-gray-900 to-black text-white rounded hover:scale-[1.05] transition-all group sm:mr-5">
                  <Link href={"/shop/" + item.Product.id}>
                    <Image
                      src={item.Product.imageurl}
                      alt={item.Product.name}
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </Link>
                </div>
                <div>
                  <Link href={"/shop/" + item.Product.id}>
                    {item.Product.name}
                  </Link>
                  <div>Price: ${item.Product.price.toFixed(2)}</div>
                  <div className="my-1 flex items-center gap-2">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end">
            <div>ORDER # {order?.id} </div>
            <div>ORDER DATE {order?.updatedAt.toISOString().slice(0, 10)}</div>
            <div>TOTAL ${order?.total?.toFixed(2)}</div>
          </div>
        </div>
        <hr className="pb-2" />
      </div>
    </div>
  )
}

export default Order
