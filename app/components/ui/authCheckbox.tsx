import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"

export interface AuthCheckboxProps {
  id: string
  className?: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled: boolean
}

const AuthCheckbox: React.FC<AuthCheckboxProps> = ({
  id,
  className,
  register,
  errors,
  disabled
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      {...register(id, {
        validate: (value) =>
          value ||
          "You must accept the terms and conditions and confirm your age."
      })}
      className={`text-orange-500 h-4 w-4 ${
        errors[id] ? "border-red-500" : ""
      } ${className}`}
    />
  )
}

export default AuthCheckbox
