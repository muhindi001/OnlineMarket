import React from 'react'
import { useCart } from '../Features/ContextProvider'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartProduct = ({ item }) => {
  const { dispatch } = useCart()
  
  // Calculate total price for this item
  const totalPrice = (parseFloat(item.cost) * (item.quantity || 1)).toFixed(2);

  return (
    <div className='flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow'>
      <img 
        src={item.img} 
        alt={item.title} 
        className='w-full md:w-24 h-24 object-cover rounded' 
      />
      <div className='flex-1 w-full'>
        <h3 className='font-medium text-lg'>{item.title}</h3>
        <p className='text-gray-600'>${parseFloat(item.cost).toFixed(2)} each</p>
        <p className='text-sm text-gray-500'>Rating: {item.rating} ⭐</p>
        
        {/* Quantity Controls */}
        <div className='flex items-center mt-2 gap-4'>
          <div className='flex items-center border rounded-md overflow-hidden'>
            <button 
              onClick={() => dispatch({ type: "DecreaseQuantity", id: item.id })}
              className='px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors'
              disabled={(item.quantity || 1) <= 1}
            >
              <FaMinus size={12} />
            </button>
            <span className='px-4 py-1 bg-white'>{item.quantity || 1}</span>
            <button 
              onClick={() => dispatch({ type: "IncreaseQuantity", id: item.id })}
              className='px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors'
            >
              <FaPlus size={12} />
            </button>
          </div>
          
          <button
            onClick={() => dispatch({ type: "Remove", id: item.id })}
            className='flex items-center gap-1 text-red-600 hover:text-red-700 text-sm'
            title='Remove item'
          >
            <FaTrash size={14} />
            <span>Remove</span>
          </button>
        </div>
      </div>
      
      <div className='text-right font-medium w-full md:w-auto'>
        <p className='text-lg'>${totalPrice}</p>
      </div>
    </div>
  )
}

export default CartProduct
