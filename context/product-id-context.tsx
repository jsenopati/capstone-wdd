"use client"

import { createContext, useContext, useState } from "react"

type ProductIdContextProviderProps = {
  children: React.ReactNode
}

type ProductIdContextProps = {
  ProductId: string
  setProductId: React.Dispatch<React.SetStateAction<string>>
}

const ProductIdContext = createContext<ProductIdContextProps | null>(null)

export default function ProductIdContextProvider({
  children
}: ProductIdContextProviderProps) {
  const [ProductId, setProductId] = useState('')

  return (
    <ProductIdContext.Provider
      value={{
        ProductId,
        setProductId
      }}
    >
      {children}
    </ProductIdContext.Provider>
  )
}

export function useProductIdContext() {
  const context = useContext(ProductIdContext)
  if (context === null) {
    throw new Error(
      "useProductIdContext must be used with an ProductIdContextProvider"
    )
  }
  return context
}
