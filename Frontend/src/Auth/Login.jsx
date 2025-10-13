import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaLock } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    identifier: '', // email or username
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const userData = {
      identifier: form.identifier,
      password: form.password,
    }
    console.log('userData==>', userData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      console.log('Login successful');
      // If login is successful, navigate to dashboard or home
      navigate('/Dashboard');
    } catch (error) {
      let errorMsg = 'Login failed. Please check your email/username and password.';
      if (error.response && error.response.data) {
        if (error.response.data.detail) {
          errorMsg = error.response.data.detail;
        }
      }
      setErrors({ general: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className='flex justify-center mb-4 text-sm text-gray-600'>
            <p>Already have an account login here</p>
        </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Email or Username</label>
            <div className="relative">
              <IoPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-1 border rounded"
                placeholder="Enter your email or username"
              />
            </div>
          </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              className="w-full pl-10 pr-3 py-1 border rounded" 
              placeholder="Enter your password"
            />
          </div>
        </div>
        {/* Remember box and Forgot Password link */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="/#ForgotPassword" className="text-primary text-sm font-semibold hover:underline">Forgot Password?</a>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition font-bold" disabled={loading}>
          {loading ? <FaSpinner className="animate-spin inline-block mr-2" /> : 'Login'}
        </button>
        {errors.general && (
          <div className="text-red-500 text-xs mt-2 text-center">{errors.general}</div>
        )}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <span className="text-primary font-semibold cursor-pointer">
            <a href="/Register">Register now.</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login