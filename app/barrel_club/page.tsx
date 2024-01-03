"use client"
import React from "react"
import Image from "next/image"
import barrel from "@/public/Barrels.png"
import Heading from "../components/heading"
import BarrelCard from "../components/barrel-card-test"
import { motion } from "framer-motion"

export default function Barrel_Club() {
  return (
    <main className="min-h-screen">
      <Heading
        image={
          <Image
            src={barrel}
            alt="Barrel Picture"
            quality={95}
            className="w-full z-0"
          />
        }
        header="What is the Barrel Club?"
        text="We are proud to formally launch our Whiskey Project/Barrel club. Our
            first Barrel should be ready in October 2023! This date will come
            faster than you can imagine. We are offering a reduced rate for the
            initial 10 investors, of which we have already sold 6 (thank you!!).
            Please contact us at 403-830-5663 for more information. Thank you!"
      />
      <motion.div className="flex flex-col md:flex-row items-center sm:justify-center gap-6 py-8 px-2"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 0.2, duration: 0.6}}>
        <BarrelCard
            title="Barrel Club 1400"
            label="CLUB"
            description="$1400.00"
            accentColor="BLUE"
            list={[
              '24 750ml custom labeled bottles',
              'Valued at $74.95/bottle',
              '4 375ml bottles/year',
              'Valued at $24.95/bottle',
            ]}
            width="max-w-[20rem] min-[500px]:w-[20rem]"
            height="min-h-[28rem]"
          />
          <BarrelCard
            title="Barrel Club 700"
            label="CLUB"
            description="$700.00"
            accentColor="GREEN"
            list={[
              '12 750ml custom labeled bottles',
              'Valued at $74.95/bottle',
              '2 375ml bottles/year',
              'Valued at $24.95/bottle',
            ]}
            width="max-w-[20rem] min-[500px]:w-[20rem]"
            height="min-h-[28rem]"
          />
          <BarrelCard
            title="Barrel Club 500"
            label="CLUB"
            description="$500.00"
            accentColor="RED"
            list={[
              '8 750ml custom labeled bottles',
              'Valued at $74.95/bottle',
              '2 375ml bottles/year',
              'Valued at $24.95/bottle',
            ]}
            width="max-w-[20rem] min-[500px]:w-[20rem]"
            height="min-h-[28rem]"
          />
      </motion.div>
    </main>
  )
}
