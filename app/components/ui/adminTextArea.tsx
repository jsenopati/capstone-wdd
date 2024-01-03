"use client"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"

export interface AdminTextAreaProps {
  id: string
  label: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  className?: string
  placeholder?: string
}

const AdminTextArea: React.FC<AdminTextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  placeholder,
  className
}) => {
  return (
    <textarea
      autoComplete="off"
      id={id}
      disabled={disabled}
      placeholder={errors[id] ? "" : placeholder}
      {...register(id, { required })}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        errors[id] ? "ring-red-700" : "ring-stone-300"
      } ${
        errors[id] ? "focus:ring-red-700" : "focus:ring-stone-300"
      } ${className}`}
    />
  )
}

export default AdminTextArea
