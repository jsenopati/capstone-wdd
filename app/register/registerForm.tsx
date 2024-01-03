"use client"
import Image from "next/image"
import WDD from "@/public/WDDbig.svg"
import Link from "next/link"
import AuthInput from "../components/ui/authInput"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { Button } from "../components/ui/button"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import AuthCheckbox from "../components/ui/authCheckbox"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SafeUser } from "@/types"
import AccessDenied from "../components/accessDenied"

interface RegisterFormProps {
  currentUser: SafeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created!")

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/")
            router.refresh()
            toast.success("Logged in!")
          }
          if (callback?.error) {
            toast.error(callback.error)
          }
        })
      })
      .catch(() => toast.error("An error occurred."))
      .finally(() => {
        setIsLoading(false)
      })
  }
  if (currentUser) {
    return <AccessDenied title="Signed In. Redirecting..." />
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
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link href="signIn" className="text-orange-500 hover:underline">
              Already have an account?{" "}
              <span className="font-bold">Sign in</span>
            </Link>
          </div>
          <div className="grid gap-6">
            <form>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2 relative">
                  <AuthInput
                    disabled={isLoading}
                    placeholder="Name"
                    label="name"
                    required
                    register={register}
                    errors={errors}
                    id="name"
                    className={cn({
                      "focus-visible:ring-orange-500": true,
                      "text-black": true,
                      "ring-red-700 ring-2": errors.name
                    })}
                  />
                  {errors.name && (
                    <div className="absolute left-3 top-4 pointer-events-none text-red-500">
                      Name is required
                    </div>
                  )}
                </div>
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
                <div className="flex flex-row">
                  <AuthCheckbox
                    disabled={isLoading}
                    id="terms"
                    className="mr-2 mt-1"
                    register={register}
                    errors={errors}
                  />
                  <div className="">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I certify that I am of legal drinking age in Canada and
                      agree to the terms and conditions of Whispering Dutchman
                      Distillery.
                    </label>
                    {errors.terms && (
                      <div className="pointer-events-none text-red-500">
                        You must accept the terms and conditions and confirm
                        your age.
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="outline"
                  className="hover:text-orange-500 mt-2 hover:ring-orange-500 hover:border-orange-500 ring-2 ring-transparent hover:bg-black bg-black"
                >
                  {isLoading ? "Loading..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default RegisterForm
