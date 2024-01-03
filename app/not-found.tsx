"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import WDD from "@/public/WDDbig.svg"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/")
      router.refresh()
    }, 3000)
  }, [])

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image
            src={WDD}
            width={250}
            height={250}
            alt="/images/WDD.png"
            className=""
          ></Image>
          <h1 className="text-2xl font-bold text-red-600">
            404: Not Found. Redirecting...
          </h1>
        </div>
      </div>
    </div>
  )
}
