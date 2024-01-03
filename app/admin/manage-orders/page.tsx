import { getCurrentUser } from "@/action/getCurrentUser"
import AccessDenied from "@/app/components/accessDenied"
import ManageOrdersClient from "./manageOrdersClient"
import getOrders from "@/action/getOrders"

const ManageOrders = async () => {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccessDenied title="Access Denied. Redirecting..." />
  }

  return (
    <div>
      <ManageOrdersClient orders={orders} />
    </div>
  )
}
export default ManageOrders
