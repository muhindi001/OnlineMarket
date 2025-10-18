import React, { useContext } from 'react'
import { CartContext } from '../Features/ContextProvider'
import CartProduct from './CartProduct'

const Cart = () => {
  const {data} = useContext(CartContext)
  return (
    <div className='container mx-auto'>
      <div className="row">
        <div className="col-8">
          {data.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            data.map((shoes) =>(
              <CartProduct key={shoes.id}></CartProduct>           
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
