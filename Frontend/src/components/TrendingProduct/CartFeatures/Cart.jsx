import React, { useContext } from 'react'
import { useCart } from '../Features/ContextProvider'
import CartProduct from './CartProduct'
import PaymentDetails from '../../PaymentDetails/PaymentDetails'

const Cart = () => {
  const { cart } = useCart()
  console.log('Cart state:', cart);
  
  // Calculate total items and subtotal
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (parseFloat(item.cost || 0) * (item.quantity || 1)), 
    0
  ).toFixed(2);
  
  return (
    <div className='container mx-auto py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Your Shopping Cart</h2>
        <span className='text-gray-600'>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-8/12">
          {cart.length === 0 ? (
            <div className='bg-white p-6 rounded-lg shadow text-center'>
              <p className='text-gray-600 text-lg mb-4'>Your cart is empty</p>
              <a 
                href='/' 
                className='text-primary hover:underline font-medium'
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className='space-y-4'>
              {cart.map((item) => (
                <CartProduct key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="w-full md:w-4/12">
            <div className='bg-white p-6 rounded-lg shadow sticky top-4'>
              <h3 className='text-lg font-semibold mb-4'>Order Summary</h3>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span>{subtotal}Tsh</span>
                  </div>
                  <div className='flex justify-between text-sm text-gray-500'>
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className='flex justify-between text-sm text-gray-500'>
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className='border-t pt-4'>
                  <div className='flex justify-between font-semibold text-lg mb-4'>
                    <span>Estimated Total</span>
                    <span>{subtotal}Tsh</span>
                  </div>
                  
                  <button 
                    type="button"
                    className='w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium mb-4'
                    onClick={() => {
                      // Navigate to checkout or show payment details
                      document.getElementById('payment-details').classList.toggle('hidden');
                    }}
                  >
                    Proceed to Checkout
                  </button>
                  <div id="payment-details" className="hidden">
                    <PaymentDetails />
                  </div>
                  
                  <div className='mt-4 text-center text-sm text-gray-500'>
                    <p>or</p>
                    <a href='/' className='text-primary hover:underline'>Continue Shopping</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
