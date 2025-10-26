import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // No need for blob animation, will use SVG waves
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    profileImg: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImg') {
      setForm({ ...form, profileImg: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('confirm_password', form.confirm_password);
    if (form.profileImg) {
      formData.append('profile_image', form.profileImg);
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response.data==>', response.data);
      
      // Store user data in localStorage
      const userData = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        username: form.username,
        profile_image: response.data.profile_image || null
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('User registered successfully');
      navigate('/Dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({general: 'Registration failed. Please try again.'});
      }
      console.error('Registration error:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Animated Waves / Liquid Motion Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{zIndex:0}}>
        <svg viewBox="0 0 1440 320" width="100%" height="320" style={{position:'absolute',top:0,left:0}}>
          <path fill="#a78bfa" fillOpacity="0.5">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,160L60,149.3C120,139,240,117,360,128C480,139,600,181,720,186.7C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
              M0,192L60,186.7C120,181,240,149,360,160C480,171,600,213,720,218.7C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
              M0,224L60,218.7C120,213,240,181,360,192C480,203,600,245,720,250.7C840,256,960,224,1080,218.7C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
              M0,160L60,149.3C120,139,240,117,360,128C480,139,600,181,720,186.7C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </path>
        </svg>
        <svg viewBox="0 0 1440 320" width="100%" height="320" style={{position:'absolute',top:120,left:0}}>
          <path fill="#38bdf8" fillOpacity="0.3">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0,224L60,218.7C120,213,240,181,360,192C480,203,600,245,720,250.7C840,256,960,224,1080,218.7C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
              M0,160L60,149.3C120,139,240,117,360,128C480,139,600,181,720,186.7C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
              M0,192L60,186.7C120,181,240,149,360,160C480,171,600,213,720,218.7C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;
              M0,224L60,218.7C120,213,240,181,360,192C480,203,600,245,720,250.7C840,256,960,224,1080,218.7C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </path>
        </svg>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className='flex justify-center mb-4 text-sm text-gray-600'>
            <p>Don't have an account register now</p>
        </div>
        <div className="mb-1 flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-semibold">First Name</label>
            <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required className="w-full px-3 py-1 border rounded" />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-semibold">Last Name</label>
            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required className="w-full px-3 py-1 border rounded" />
          </div>
        </div>
    <div className="w-1/2">
      <label className="block mb-1 font-semibold">Username</label>
      <input type="text" name="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-1 border rounded" />
      {errors.username && (
        <div className="text-red-500 text-xs mt-1">{errors.username[0]}</div>
      )}
    </div>
        <div className="mb-1">
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-1 border rounded" />
      {errors.email && (
        <div className="text-red-500 text-xs mt-1">{errors.email[0]}</div>
      )}
        </div>
        <div className="mb-1">
          <label className="block mb-1 font-semibold">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-1 border rounded" />
        </div>
        <div className="mb-1">
          <label className="block mb-1 font-semibold">Confirm Password</label>
          <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required className="w-full px-3 py-1 border rounded" />
      {errors.confirm_password && (
        <div className="text-red-500 text-xs mt-1">{errors.confirm_password[0]}</div>
      )}
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Profile Image</label>
          <input type="file" name="profileImg" accept="image/*" onChange={handleChange} className="w-full" />
          {form.profileImg && (
            <div className="mt-2 flex justify-center">
              <img
                src={URL.createObjectURL(form.profileImg)}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full border"
              />
            </div>
          )}
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition font-bold" disabled={loading}>
          {loading ? <FaSpinner className="animate-spin inline-block mr-2" /> : 'Register'}
        </button>
      {errors.general && (
        <div className="text-red-500 text-xs mt-2 text-center">{errors.general}</div>
      )}
        <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account? <span className="text-primary font-semibold cursor-pointer">
            <a href="/login">Login</a>
        </span>
      </div>
      </form>
      
    </div>
  );
}

export default Register