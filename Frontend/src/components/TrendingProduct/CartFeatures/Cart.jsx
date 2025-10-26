import React, { useContext } from 'react'
import { CartContext } from '../Features/ContextProvider'
import CartProduct from './CartProduct'

const Cart = () => {
  const {cart} = useContext(CartContext)
  return (
    <div className='container mx-auto'>
      <div className="row">
        <div className="col-8">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((items) =>(
              <CartProduct key={item.id}></CartProduct>           
            ))
          )}
        </div>
        <div className="col-4">
        </div>
      </div>
      
    </div>
  )
}

export default Cart
