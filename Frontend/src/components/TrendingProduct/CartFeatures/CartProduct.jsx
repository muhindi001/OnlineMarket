import React from 'react'

const CartProduct = ({shoes}) => {
  return (
    <div className='d-flex'>
        <img src={shoes.img} alt="" />
        <div className="detail">
            <h4>{shoes.title}</h4>
            <h5>{shoes.cost}Tsh</h5>
        </div>
    </div>
  )
}

export default CartProduct