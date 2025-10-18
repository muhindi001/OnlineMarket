import React, { useContext } from 'react'
import { CartContext } from '../Features/ContextProvider'

const CartProduct = () => {
  const {data, dispatch } = useContext(CartContext)

  return (
    <div className='d-flex align-items-center gap-3 mb-3 border p-2 rounded'>
      <img src={data.img} alt={shoes.title} width="100" />
      <div className="detail">
        <h4>{data.title}</h4>
        <h5>{data.cost} Tsh</h5>
        <button
          onClick={() => dispatch({ type: "Remove", id: shoes.id })}
          className="bg-red-500 text-white px-3 py-1 rounded mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartProduct
