import { getCurrentUser } from "@/action/getCurrentUser"
import RegisterForm from "./registerForm"

const Register = async () => {
  const currentUser = await getCurrentUser()
  return (
      <>
          <RegisterForm currentUser= {currentUser} />
      </>
  )
}
export default Register