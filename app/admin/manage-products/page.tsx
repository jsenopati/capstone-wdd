import getProductDash from "@/action/getProductDash"
import ManageProductsClient from "./manageProductsClient"
import { getCurrentUser } from "@/action/getCurrentUser"
import AccessDenied from "@/app/components/accessDenied"

const ManageProducts = async () => {
  const products = await getProductDash()
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccessDenied title="Access Denied. Redirecting..." />
  }

  return (
    <div>
      <ManageProductsClient products={products} />
    </div>
  )
}
export default ManageProducts
