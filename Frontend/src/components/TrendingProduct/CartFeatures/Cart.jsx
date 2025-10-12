import React, { useContext } from 'react'
import { CartContext } from '../Features/ContextProvider'
import CartProduct from './CartProduct'

const Cart = () => {
  const {cart} = useContext(CartContext)
  return (
    <div className='container mx-auto'>
      <div className="row">
        <div className="col-8">
          {cart.map(p =>(
            <CartProduct shoes={p}></CartProduct>           
          ))}
        </div>
        <div className="col-4">

        </div>
      </div>
      
    </div>
  )
}

export default Cart
