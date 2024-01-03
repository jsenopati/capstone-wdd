import Link from "next/link"
import React from "react"

export default function Success() {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 text-center">
      <h1 className="text-7xl font-bold">Order Confirmed</h1>
      <div className="text-xl w-[30rem]">Our team is working diligently to ensure your order is processed swiftly and accurately. If you have any questions or special requests, please feel free to reach out to our customer service team at Whispering Dutchman Distillery.</div>
      <div className="text-2xl flex flex-col">
        Thank you, <span>Whispering Dutchman Distillery</span> 
      </div>
      <Link href="/" className="underline hover:scale-[1.05]">return home</Link>
    </div>
  )
}
