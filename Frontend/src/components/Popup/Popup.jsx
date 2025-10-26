import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Popup = ({ orderPopup, setOrderPopup, product, addOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!product) {
      toast.error('No product selected');
      return;
    }

    const newOrder = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      address: formData.address,
      date: new Date().toISOString(),
      products: [{
        id: product.id || Date.now(),
        name: product.title || 'Product',
        quantity: 1,
        price: product.price || 0
      }],
      status: 'Pending'
    };

    addOrder(newOrder);
    setOrderPopup(false);
    setFormData({ name: '', email: '', address: '' });
    toast.success('Order placed successfully!');
  };

  return (
    <>
      {orderPopup && (
        <div className='popup'>
          <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 shadow-md bg-white dark:bg-gray-900 rounded-md w-[90%] max-w-md'>
              {/* Header section */}
              <div className='flex items-center justify-between mb-4'>
                <h1 className='text-xl font-semibold'>Order Now</h1>
                <IoCloseOutline 
                  className='text-2xl cursor-pointer hover:text-red-500 transition-colors'
                  onClick={() => setOrderPopup(false)}
                />
              </div>
              
              {/* Product info */}
              {product && (
                <div className='mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md'>
                  <h3 className='font-medium'>{product.title}</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Price: ${product.price}
                  </p>
                </div>
              )}
              
              {/* Form section */}
              <form onSubmit={handleSubmit}>
                <div className='space-y-3'>
                  <div>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='Full Name'
                      className='w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='Email Address'
                      className='w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      placeholder='Shipping Address'
                      rows='3'
                      className='w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div className='pt-2'>
                    <button 
                      type='submit'
                      className='w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 flex items-center justify-center'
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;