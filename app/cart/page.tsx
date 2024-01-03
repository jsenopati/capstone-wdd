import React from "react"

import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry"
import { deleteCart, setProductQuantity } from "./actions"
import CheckoutButton from "./checkoutButton"

export default async function Cart() {
  const cart = await getCart()
  

  return (
    <div className="min-h-screen mt-24 mx-4 sm:mx-16">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <hr className="pb-2"/>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Subtotal: ${cart?.subtotal.toFixed(2) || (0.0).toFixed(2)}
        </p>
        <CheckoutButton cart={cart} deleteCart={deleteCart}/>
        
      </div>
    </div>
  )
}
