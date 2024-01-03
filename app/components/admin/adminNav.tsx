"use client"
import Link from "next/link"
import AdminNavItem from "./adminNavItem"
import { RxDashboard } from "react-icons/rx"
import { TbBottleFilled } from "react-icons/tb"
import { MdManageSearch } from "react-icons/md"
import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import { usePathname } from "next/navigation"

const AdminNav = () => {
  const pathname = usePathname()

  return (
    <nav
      className={`px-auto border-t-orange-500 border-t-2 py-4 fixed top-20 left-0 right-0`}
    >
      <ul className="flex items-center justify-center sm:space-x-4 md:space-x-6 lg:space-x-8 text-xs sm:text-base md:text-lg font-semibold">
        <li>
          <Link href="/admin">
            <AdminNavItem
              label="Dashboard"
              icon={RxDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
        </li>
        <li>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={TbBottleFilled}
              selected={pathname === "/admin/add-products"}
            />
          </Link>
        </li>
        <li>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdManageSearch}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
        </li>
        <li>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={MdOutlineShoppingCartCheckout}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default AdminNav
