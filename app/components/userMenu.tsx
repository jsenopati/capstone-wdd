"use-client"
import Link from "next/link"
import { useCallback, useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import MenuItem from "./menuItem"
import { signOut } from "next-auth/react"
import BackDrop from "./backDrop"
import { SafeUser } from "@/types"
import toast from "react-hot-toast"

interface UserMenuProps {
  currentUser: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <>
      <div className="relative z-30">
        <div onClick={toggleOpen} className="cursor-pointer transition">
          {currentUser ? (
            <AiOutlineUser
              size="24"
              className="text-orange-500 hover:scale-110 transition"
            />
          ) : (
            <AiOutlineUser size="24" className="hover:scale-110 transition" />
          )}
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-stone-500 overflow-hidden right-0 top-8 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                {currentUser?.role === "ADMIN" ? (
                  <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                ) : null}
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen()
                    setTimeout(() => {
                      toast.success("You have been signed out!")
                    }, 1000)
                    setTimeout(() => {
                      signOut({ callbackUrl: "/" })
                    }, 3000)
                  }}
                >
                  Sign out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/signIn">
                  <MenuItem onClick={toggleOpen}>Sign in</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  )
}
export default UserMenu
