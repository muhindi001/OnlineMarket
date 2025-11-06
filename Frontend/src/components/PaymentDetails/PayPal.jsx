import React, { useState } from 'react';
import { FaPaypal, FaGlobe, FaEnvelope, FaLock, FaExternalLinkAlt } from 'react-icons/fa';

const PayPal = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('TZ');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const countries = [
    { code: 'TZ', name: 'Tanzania' },
    { code: 'KE', name: 'Kenya' },
    { code: 'UG', name: 'Uganda' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'BI', name: 'Burundi' },
    { code: 'ZA', name: 'South Africa' },
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process PayPal payment
    processPayPalPayment();
  };

  const processPayPalPayment = () => {
    setIsProcessing(true);
    
    // Simulate API call to your backend to initiate PayPal payment
    // In a real implementation, this would be a call to your backend
    // which would then redirect to PayPal or return a PayPal payment URL
    setTimeout(() => {
      // This is where you would typically open the PayPal popup
      // For demonstration, we'll simulate a successful payment
      if (onSuccess) {
        onSuccess({
          email,
          country: countries.find(c => c.code === country)?.name,
          paymentId: `PAYPAL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date().toISOString()
        });
      }
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <FaPaypal className="text-4xl text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Pay with PayPal</h2>
        <p className="text-gray-600 mt-1">
          Securely pay using your PayPal account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            PayPal Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              placeholder="johndoe@example.com"
              className={`w-full p-2.5 pl-10 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              disabled={isProcessing}
            />
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            The email linked to your PayPal account
          </p>
        </div>

        {/* Country Field */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaGlobe className="text-gray-500" />
            Country
          </label>
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              disabled={isProcessing}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <FaGlobe className="absolute left-3 top-3.5 text-gray-400" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Your country or region (some APIs may require this)
          </p>
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-3">
          <div className="mt-0.5">
            <FaLock className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-blue-800 font-medium">Secure Payment</p>
            <p className="text-xs text-blue-700">
              You'll be redirected to PayPal's secure site to complete your payment.
              No sensitive payment information is stored on our servers.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
              isProcessing
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
            } transition-colors`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FaPaypal className="text-lg" />
                <span>Log in to PayPal</span>
                <FaExternalLinkAlt className="text-xs opacity-70" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Terms and Conditions */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
          and acknowledge you have read our{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default PayPal;