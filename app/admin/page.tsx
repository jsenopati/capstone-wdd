import { Card, CardContent } from "../components/ui/card"
import { formatPrice } from "@/util/formatPrice"
import { getTotalRevenue } from "@/action/getTotalRevenue"
import { getSalesCount } from "@/action/getSalesCount"
import { getStockCount } from "@/action/getStockCount"
import { getCurrentUser } from "@/action/getCurrentUser"
import AccessDenied from "../components/accessDenied"
import { Stats } from "./stats"
import { getGraphRevenue } from "@/action/getGraphRevenue"

const Admin = async () => {
  const totalRevenue = await getTotalRevenue()
  const salesCount = await getSalesCount()
  const productsCount = await getStockCount()
  const currentUser = await getCurrentUser()
  const graphRevenue = await getGraphRevenue()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccessDenied title="Access Denied. Redirecting..." />
  }
  return (
    <div className="w-4/6 justify-between space-y-8">
      <div className="flex flex-row justify-between space-x-8">
        <Card className="w-1/3 text-stone-50 bg-stone-800">
          <h1 className="font-bold p-4">Total Revenue</h1>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/3 text-stone-50 bg-stone-800">
          <h1 className="font-bold p-4">Paid Orders</h1>
          <CardContent>
            <div className="text-2xl font-bold">{salesCount}</div>
          </CardContent>
        </Card>
        <Card className="w-1/3 text-stone-50 bg-stone-800">
          <h1 className="font-bold p-4">Products in Stock</h1>
          <CardContent>
            <div className="text-2xl font-bold">{productsCount}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4 text-stone-50 bg-stone-800">
        <h1 className="font-bold p-4">Statistics</h1>
        <CardContent>
          <Stats data={graphRevenue} />
        </CardContent>
      </Card>
    </div>
  )
}
export default Admin
