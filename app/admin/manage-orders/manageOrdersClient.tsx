"use client"
import { formatPrice } from "@/util/formatPrice"
import { Order, Role, User } from "@prisma/client"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import type {} from "@mui/x-data-grid/themeAugmentation"
import ActionButton from "@/app/components/actionButton"
import {
  MdAttachMoney,
  MdLocalShipping,
  MdMoneyOff,
  MdPending,
  MdRemoveRedEye
} from "react-icons/md"
import Status from "@/app/components/status"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import moment from "moment"
import { FaCheck } from "react-icons/fa"

interface ManageOrdersClientProps {
  orders: (ExtendedOrder | null)[]
}

type ExtendedOrder = Order & {
  User?: {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    password: string
    image: string | null
    createdAt: Date
    updatedAt: Date
    role: Role
  } | null
}

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter()
  let rows: any = []

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order?.id ?? "N/A",
        customer: order?.User?.name ?? order?.sName ?? "N/A",
        date: moment(order?.createdAt).fromNow() ?? "N/A",
        total: order?.total ? formatPrice(order.total) : "N/A",
        payment: order?.isPaid,
        status: order?.status
      }
    })
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 150
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 130
    },
    {
      field: "total",
      headerName: "Total",
      width: 100
    },
    {
      field: "date",
      headerName: "Date",
      width: 120
    },
    {
      field: "payment",
      headerName: "Payment Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.payment === true ? (
              <Status
                text="Paid"
                icon={MdAttachMoney}
                bg="bg-emerald-400"
                color="text-black"
              />
            ) : (
              <Status
                text="Not Paid"
                icon={MdMoneyOff}
                bg="bg-red-400"
                color="text-black"
              />
            )}
          </div>
        )
      }
    },
    {
      field: "status",
      headerName: "Shipping Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "Pending" ? (
              <Status
                text="Pending"
                icon={MdPending}
                bg="bg-red-400"
                color="text-black"
              />
            ) : params.row.status === "Shipped" ? (
              <Status
                text="Shipped"
                icon={MdLocalShipping}
                bg="bg-yellow-400"
                color="text-black"
              />
            ) : params.row.status === "Delivered" ? (
              <Status
                text="Delivered"
                icon={FaCheck}
                bg="bg-emerald-400"
                color="text-black"
              />
            ) : (
              <></>
            )}
          </div>
        )
      }
    },
    {
      field: "action",
      headerName: "Ship | View | Deliver",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionButton
              icon={MdLocalShipping}
              onClick={() => {
                toggleShipping(params.row.id)
              }}
            />
            <ActionButton
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`)
              }}
            />
            <ActionButton
              icon={FaCheck}
              onClick={() => {
                toggleDeliver(params.row.id)
              }}
            />
          </div>
        )
      }
    }
  ]

  const toggleShipping = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        status: "Shipped"
      })
      .then((res) => {
        toast.success("Order Shipped!")
        router.refresh()
      })
      .catch((err) => {
        toast.error("An error occurred.")
        console.log(err)
      })
  }, [])

  const toggleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        status: "Delivered"
      })
      .then((res) => {
        toast.success("Order Delivered!")
        router.refresh()
      })
      .catch((err) => {
        toast.error("An error occurred.")
        console.log(err)
      })
  }, [])

  return (
    <div className="">
      <DataGrid
        className="bg-stone-200"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  )
}
export default ManageOrdersClient
