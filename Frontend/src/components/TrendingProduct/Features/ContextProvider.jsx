// ContextProvider.jsx
import React, { createContext, useReducer } from 'react'
import CartReducer from './CartReducer'

export const CartContext = createContext()

const ContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(CartReducer, [])
  // console.log('ContextProvider mounted, initial cart:', cart) // temp log

  return (
    <CartContext.Provider value={{ data, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
export default ContextProvider
