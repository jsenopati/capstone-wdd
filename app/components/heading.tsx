"use client"

import React, { ReactNode } from "react"
import { motion } from "framer-motion"

type HeadingProps = {
  image: ReactNode
  header: String
  text?: String
}

export default function Heading({ image, header, text }: HeadingProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <motion.div className="sm:h-[24rem] 2xl:h-[35rem] overflow-hidden"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        >{image}</motion.div>
      </div>
      <div className=" text-gray-50 text-opacity-90 z-20">
        <motion.div
          className="pt-12 w-full flex justify-center flex-col items-start px-8 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-4xl pb-8 font-bold">{header}</p>
          <p className="flex flex-wrap justify-center text-white/60 text-lg">
            {text}
          </p>
          <hr className={`w-full h-0.5 bg-gray-300 mt-12`} />
        </motion.div>
      </div>
    </div>
  )
}
