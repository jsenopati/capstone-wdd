"use client"
import React, { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import WDD from "@/public/WDD.png"
import { motion } from "framer-motion"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { usePathname } from "next/navigation"
import UserMenu from "./userMenu"
import { SafeUser } from "@/types"


interface HeaderProps {
  currentUser: SafeUser | null
}

export default function Header({ currentUser }: HeaderProps) {

  const hiddenHeader = ["/adminNO!", null]
  const isHeaderHidden = hiddenHeader.includes(usePathname())
  //just testing how it looks with the navbar on admin.

  return (
    <>
      {!isHeaderHidden && (
        <nav
          className={`px-auto py-4 fixed top-0 left-0 right-0 backdrop-blur-lg z-[999]`}
        >
          <ul className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 text-xs sm:text-base md:text-lg font-semibold">
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link href="/">
                <Image
                  src={WDD}
                  width={36}
                  height={36}
                  alt="/images/WDD.png"
                ></Image>
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link href="/barrel_club">Barrel Club</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link href="/shop">Shop</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link href="/recipes">Recipes</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link href="/contact">Contact</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link href="/cart">
                <AiOutlineShoppingCart size="24" />
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.0 }}>
              <UserMenu currentUser={currentUser} />
            </motion.li>
          </ul>
        </nav>
      )}
    </>
  )
}
