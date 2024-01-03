"use client"
import AccountInfo from "../components/accountInfo"

export default function Account() {
  return (
    <main>
      <div className={`fixed top-24 left-32 p-3 hidden 2xl:block`}>
        <div className={`flex flex-col`}>
          <button className={`text-left font-semibold text-lg`}>Account</button>
          <button className={`text-left font-semibold text-lg`}>Billing</button>
          <button className={`text-left font-semibold text-lg`}>
            Sign out
          </button>
        </div>
      </div>
      <div className={`h-full 2xl:flex 2xl:justify-end`}>
        <div className={`w-auto 2xl:w-3/5 flex flex-col 2xl:mr-40`}>
          <div className={`bg-black mt-24 p-3 mx-4 rounded-xl`}>
            <h1
              className={`text-3xl md:text-4xl pb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-semibold`}
            >
              Your Account (Coming Soon)
            </h1>
            <AccountInfo
              header={"Name"}
              info={"John Smith"}
              buttonTitle={"Change"}
              buttonStyle="w-16 rounded-md text-sm md:rounded-lg md:font-semibold md:text-lg md:mb-2 md:w-32 md:py-1"
            />
            <AccountInfo
              header={"Birthday"}
              info={"00-00-00"}
              buttonTitle={"Change"}
              buttonStyle="w-16 rounded-md text-sm md:rounded-lg md:font-semibold md:text-lg md:mb-2 md:w-32 md:py-1"
            />
            <AccountInfo
              header={"Email"}
              info={"example@email.com"}
              buttonTitle={"Change"}
              buttonStyle="w-16 rounded-md text-sm md:rounded-lg md:font-semibold md:text-lg md:mb-2 md:w-32 md:py-1"
            />
            <AccountInfo
              header={"Password"}
              info={"change your account password."}
              infostyle={"text-xs md:text-lg"}
              buttonTitle={"Change"}
              buttonStyle="w-16 mb-1 rounded-md text-sm md:rounded-lg md:font-semibold md:text-lg md:mb-2 md:w-32 md:py-1"
            />
            <AccountInfo
              header={"Delete Account"}
              info={"Delete your account."}
              infostyle={"text-xs md:text-lg"}
              buttonTitle={"Delete"}
              buttonColor={"bg-red-500"}
              buttonStyle="w-16 rounded-md text-sm md:rounded-lg md:font-semibold md:text-lg md:mb-2 md:w-32 md:py-1"
              hr="bottom"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
