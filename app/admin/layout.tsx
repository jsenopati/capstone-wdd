import AdminNav from "../components/admin/adminNav"

export const metadata = {
  title: "WDD Admin Dashboard",
  description: "WDD Admin Dashboard"
}

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="h-screen flex justify-center items-center">
      <AdminNav />
      {children}
    </div>
  )
}
export default AdminLayout
