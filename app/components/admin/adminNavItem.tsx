import { IconType } from "react-icons"

interface AdminNavItemProps {
  selected?: boolean
  icon: IconType
  label: string
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label
}) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-2 p-2 border-b-2 hover:scale-110 transition cursor-pointer ${
        selected ? "border-b-orange-500 text-orange-500" : ""
      }`}
    >
      <Icon size={20} />
      <div className="text-center break-normal">{label}</div>
    </div>
  )
}
export default AdminNavItem
