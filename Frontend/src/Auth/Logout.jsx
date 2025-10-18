import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const Logout = () => {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true)
    
    try {
      // Clear tokens from localStorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      
      // Call logout endpoint
      try {
        await axios.post('http://127.0.0.1:8000/api/v1/logout/')
        console.log('Logout API call successful')
      } catch (apiError) {
        console.warn('Logout API call failed, but continuing with local logout:', apiError)
      }
      
      console.log('Logout successful')
      
      // Redirect to home page after logout
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if there's an error, clear local tokens and redirect
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="mb-6">
          <FaSignOutAlt className="mx-auto text-4xl text-gray-700 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Logout</h2>
          <p className="text-gray-600">Are you sure you want to logout?</p>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={handleLogout}
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition font-bold disabled:opacity-50"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin inline-block mr-2" />
                Logging out...
              </>
            ) : (
              <>
                <FaSignOutAlt className="inline-block mr-2" />
                Logout
              </>
            )}
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout