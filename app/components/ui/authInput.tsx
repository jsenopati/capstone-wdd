import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"

export interface AuthInputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  className?: string
  placeholder?: string
  min?: number
  max?: number
}

const AuthInput: React.FC<AuthInputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  placeholder,
  className,
  min,
  max
}) => {
  return (
    <input
      min={min}
      max={max}
      autoComplete="off"
      id={id}
      disabled={disabled}
      placeholder={errors[id] ? "" : placeholder}
      {...register(id, { required })}
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        errors[id] ? "ring-red-700" : "ring-stone-300"
      } ${
        errors[id] ? "focus:ring-red-700" : "focus:ring-stone-300"
      } ${className}`}
    />
  )
}

export default AuthInput
