import { IconType } from "react-icons"

interface ActionButtonProps {
  icon: IconType
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  trash?: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  onClick,
  disabled,
  trash
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] border border-stone-400 ${
        disabled && "opacity-50 cursor-not-allowed"
      } ${trash && "text-red-700"}`}
    >
      <Icon size={18} />
    </button>
  )
}
export default ActionButton
