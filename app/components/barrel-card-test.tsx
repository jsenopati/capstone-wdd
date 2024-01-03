"use client"
import React from "react"
import { motion } from "framer-motion"
import { MdOutlineCheckBox } from "react-icons/md"
import { useRouter } from "next/navigation"

export interface BarrelCardProps {
  label: string
  height?: string
  width?: string
  accentColor?: "BLUE" | "RED" | "GREEN"
  title: string
  titleStyle?: string
  list?: Array<string>
  description: string
}

interface CheckboxListProps {
  list: Array<string>
}

export default function BarrelCard({
  label,
  width = "w-[20rem]",
  height = "h-auto",
  accentColor,
  title,
  titleStyle,
  description,
  list
}: BarrelCardProps) {
  const tailwindColor =
    accentColor === "BLUE"
      ? "bg-blue-400"
      : accentColor === "GREEN"
      ? "bg-emerald-400"
      : "bg-red-400"

  const CheckboxList = ({ list }: CheckboxListProps) => {
    return (
      <div>
        {list[0] ? (
          <p className={`text-sm font-semibold pt-4 pb-2`}>Includes:</p>
        ) : (
          <></>
        )}
        {list.map((item, index) => (
          <div
            key={index}
            className={`flex flex-row space-x-2 pb-2 items-center`}
          >
            <MdOutlineCheckBox size={20} color={"white"} />
            <p className={`text-xs`}>{item}</p>
          </div>
        ))}
      </div>
    )
  }

  const router = useRouter()
  return (
    <div className={`bg-black/50 rounded-xl pb-6 ${height} ${width}`}>
      <div className={`flex flex-row justify-between`}>
        <div
          className={`flex rounded-full h-6 w-12 mx-6 mt-6 mb-10 justify-center items-center`}
        >
          <p className={`text-xs font-semibold`}>{label}</p>
        </div>

        <div className={`h-12 w-12 ${tailwindColor} rounded-full mt-4 mr-4`} />
      </div>
      <div className={`flex flex-col justify-center items-left px-6`}>
        <p className={`${titleStyle ?? "text-5xl font-bold"}`}>{title}</p>
        <p className={`text-sm text-grey-700 pt-4`}>{description}</p>
        <motion.button
          onClick={() => router.push("/contact")}
          className={`flex rounded-full h-10 w-auto justify-center items-center bg-orange-500 mt-4`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "tween", duration: 0.1 }}
        >
          <p className={`font-semibold text-white`}>Contact Us</p>
        </motion.button>
        <CheckboxList list={list ?? []} />
      </div>
    </div>
  )
}
