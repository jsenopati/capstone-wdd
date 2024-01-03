import React, { ReactNode } from "react"

interface MenuItemProps {
    children: ReactNode
    onClick: () => void
}

const MenuItem:React.FC<MenuItemProps> = ({children, onClick}) => {
  return (
      <div onClick={onClick} className="px-4 py-3 hover:bg-black hover:text-orange-500 hover:border-orange-500 border-transparent border-2 rounded-md transition">
          {children}
    </div>
  )
}
export default MenuItem