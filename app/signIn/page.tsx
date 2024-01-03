import { getCurrentUser } from "@/action/getCurrentUser"
import SignInForm from "./signInForm"

const SignIn = async () => {
  const currentUser = await getCurrentUser()
  return (
    <>
      <SignInForm currentUser={currentUser} />
    </>
  )
}
export default SignIn