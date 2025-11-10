import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Banner from '../../assets/banner/orange-pattern.png'

const BannerImg = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%"
} 

const Subscribe = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter an email'); return }
    try {
      await axios.post('http://127.0.0.1:8000/api/subscribe/', { email }) // adjust URL if needed
      toast.success('Subscribed — you will be notified!')
      setEmail('')
      // Dispatch a custom event so other UI (dashboard notify icon) can update immediately
      const eventDetail = { type: 'subscribe', message: 'New subscriber', email }
      window.dispatchEvent(new CustomEvent('app:new-notification', { detail: eventDetail }))
    } catch (err) {
      toast.error('Subscription failed')
      console.error(err)
    }
  }

  return (
    <div data-aos="zoom-in"
         className='mb-20 bg-orange-300 dark:bg-orange-800 text-white'
         style={BannerImg}
    >
        <div className='container mx-auto backdrop-blur-sm py-10'>
            <div className='space-y-6 max-w-xl mx-auto'>
                <h1
                className='text-2xl text-center sm:text-left sm:text-4xl font-semibold'
                >
                    Get Notified About New Products</h1>
                <form onSubmit={handleSubmit}>
                    <input
                      data-aos="fade-up"
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='Enter your email'
                      className='w-full p-3 bg-white text-gray-900'
                    />
                    <button type="submit" className="mt-3 px-4 py-2 bg-orange-600 rounded">Subscribe</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Subscribe