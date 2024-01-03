"use client"
import Image from "next/image"
import WDD from "@/public/WDDbig.svg"
import Link from "next/link"
import AuthInput from "../components/ui/authInput"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { Button } from "../components/ui/button"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { SafeUser } from "@/types"
import AccessDenied from "../components/accessDenied"

interface SignInFormProps {
  currentUser: SafeUser | null
}

const SignInForm: React.FC<SignInFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn("credentials", {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        router.push("/")
        router.refresh()
        toast.success("Logged in!")
      }
      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  if (currentUser) {
    return (
      <AccessDenied title="Signed In. Redirecting..." />
    )
  }

  return (
    <>
      <div className="container relative flex h-screen flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src={WDD}
              width={250}
              height={250}
              alt="/images/WDD.png"
              className=""
            ></Image>
            <h1 className="text-2xl font-bold">Sign In</h1>
            <Link href="register" className="text-orange-500 hover:underline">
              Don't have an account? <span className="font-bold">Register</span>
            </Link>
          </div>
          <div className="grid gap-6">
            <form>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2 relative">
                  <AuthInput
                    disabled={isLoading}
                    placeholder="Email"
                    label="Email"
                    required
                    register={register}
                    errors={errors}
                    id="email"
                    className={cn({
                      "focus-visible:ring-orange-500": true,
                      "text-black": true,
                      "ring-red-700 ring-2": errors.email
                    })}
                  />
                  {errors.email && (
                    <div className="absolute left-3 top-4 pointer-events-none text-red-500">
                      Email is required
                    </div>
                  )}
                </div>
                <div className="grid gap-1 py-2 relative">
                  <AuthInput
                    disabled={isLoading}
                    placeholder="Password"
                    label="Password"
                    required
                    register={register}
                    errors={errors}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={cn({
                      "focus-visible:ring-orange-500": true,
                      "text-black": true,
                      "ring-red-700 ring-2": errors.password
                    })}
                  />
                  {errors.password && (
                    <div className="absolute left-3 top-4 pointer-events-none text-red-500">
                      Password is required
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 bottom-4"
                  >
                    {showPassword ? (
                      <AiFillEye color="black" size="1.5em" />
                    ) : (
                      <AiFillEyeInvisible color="black" size="1.5em" />
                    )}
                  </button>
                </div>

                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="outline"
                  className="hover:text-orange-500 mt-2 hover:ring-orange-500 hover:border-orange-500 ring-2 ring-transparent hover:bg-black bg-black"
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default SignInForm
