"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {

  const hiddenFooter = ["/admin", "/admin/manage-products", "/admin/add-products", "/admin/manage-orders", null]

  const isFooterHidden = hiddenFooter.includes(usePathname())
  return (
    <>
      {!isFooterHidden && (
        <footer
          className={`bg-transparent pt-4 px-2 lg:px-8 flex flex-col w-full items-center justify-center`}
        >
          <hr className={`w-full h-0.5 bg-gray-300`} />
          <div className={`flex flex-col h-full w-full py-6 sm:py-8`}>
            <div
              className={`flex flex-row justify-center sm:justify-start items-center pb-6`}
            >
              <Link href="/" className="flex items-center">
                <div className="text-2xl font-semibold">
                  Whispering <span className="text-orange-500">Dutchman </span>
                  Distillery
                </div>
              </Link>
            </div>
            <div
              className={`flex flex-col sm:flex-row justify-between items-center sm:items-start`}
            >
              <div className={`flex flex-col items-center sm:items-start pb-4`}>
                <div className={`flex flex-col items-center sm:items-start`}>
                  <div>12 Griffin Industrial Point #105</div>
                  <div>Cochrane, AB</div>
                  <div>T4C 0A2</div>
                </div>
              </div>
            </div>
            <div className={`flex mt-4 justify-center sm:justify-start`}>
              <p className="text-xs">
                © 2023 Whispering Dutchman Distillery, all rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}
