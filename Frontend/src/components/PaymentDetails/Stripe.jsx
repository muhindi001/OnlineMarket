import React, { useState, useEffect, useRef } from 'react';
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const Stripe = ({ amount, currency = 'USD', onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const cardNumberRef = useRef(null);
  const expiryDateRef = useRef(null);
  const cvcRef = useRef(null);

  // Format card number as user types (adds spaces after every 4 digits)
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .substring(0, 19);
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})/, '$1/')
      .substring(0, 5);
  };

  // Format CVC (3-4 digits)
  const formatCVC = (value) => {
    return value.replace(/\D/g, '').substring(0, 4);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    const cardNumber = formData.cardNumber.replace(/\s+/g, '');
    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const expiryMonth = parseInt(month, 10);
      const expiryYear = 2000 + parseInt(year, 10);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      
      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      } else if (expiryMonth < 1 || expiryMonth > 12) {
        newErrors.expiryDate = 'Invalid month';
      }
    }
    
    if (!formData.cvc) {
      newErrors.cvc = 'CVC is required';
    } else if (formData.cvc.length < 3) {
      newErrors.cvc = 'CVC must be 3-4 digits';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Apply formatting based on field type
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvc') {
      formattedValue = formatCVC(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    // Auto-focus next field
    if (name === 'cardNumber' && formattedValue.replace(/\s/g, '').length === 16) {
      expiryDateRef.current.focus();
    } else if (name === 'expiryDate' && formattedValue.length === 5) {
      cvcRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, you would create a PaymentMethod with Stripe.js
      // and send it to your backend to complete the payment
      console.log('Processing payment with Stripe:', {
        amount,
        currency,
        ...formData,
        // Remove spaces from card number for processing
        cardNumber: formData.cardNumber.replace(/\s+/g, '')
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would handle the payment confirmation here
      const paymentResult = {
        id: `pi_${Math.random().toString(36).substr(2, 14)}`,
        amount: amount,
        currency: currency,
        status: 'succeeded',
        receipt_email: formData.email,
        created: Math.floor(Date.now() / 1000)
      };
      
      setIsCompleted(true);
      
      if (onSuccess) {
        onSuccess(paymentResult);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      if (onError) {
        onError(error.message || 'Payment failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <FaCheckCircle className="text-green-600 text-4xl" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. A receipt has been sent to {formData.email}.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-left max-w-md mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
              }).format(amount / 100)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Payment Method:</span>
            <span>•••• {formData.cardNumber.slice(-4)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <FaCreditCard className="text-4xl text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Pay with Card</h2>
        <p className="text-gray-600 mt-1">
          Complete your payment securely with Stripe
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cardholder Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaUser className="text-gray-500" />
            Cardholder Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full p-2.5 pl-10 border ${
                errors.cardholderName ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              disabled={isProcessing}
              autoComplete="cc-name"
            />
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.cardholderName && (
            <p className="text-sm text-red-600">{errors.cardholderName}</p>
          )}
        </div>

        {/* Card Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaCreditCard className="text-gray-500" />
            Card Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              ref={cardNumberRef}
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="4242 4242 4242 4242"
              className={`w-full p-2.5 pl-10 border ${
                errors.cardNumber ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              disabled={isProcessing}
              autoComplete="cc-number"
              maxLength={19}
            />
            <FaCreditCard className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.cardNumber ? (
            <p className="text-sm text-red-600">{errors.cardNumber}</p>
          ) : (
            <p className="text-xs text-gray-500">
              Test card: 4242 4242 4242 4242
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                ref={expiryDateRef}
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className={`w-full p-2.5 pl-10 border ${
                  errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                disabled={isProcessing}
                autoComplete="cc-exp"
                maxLength={5}
              />
              <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.expiryDate && (
              <p className="text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>

          {/* CVC */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaLock className="text-gray-500" />
              CVC <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                ref={cvcRef}
                type="text"
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                placeholder="123"
                className={`w-full p-2.5 pl-10 border ${
                  errors.cvc ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                disabled={isProcessing}
                autoComplete="cc-csc"
                maxLength={4}
              />
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.cvc && (
              <p className="text-sm text-red-600">{errors.cvc}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            Email for receipt <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              className={`w-full p-2.5 pl-10 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              disabled={isProcessing}
              autoComplete="email"
            />
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Security Info */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-3">
          <div className="mt-0.5">
            <FaLock className="text-indigo-500" />
          </div>
          <div>
            <p className="text-sm text-gray-700">
              <strong>Secure Payment:</strong> Your payment information is encrypted and processed by Stripe. 
              We don't store your card details on our servers.
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
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
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
                <FaCreditCard className="text-lg" />
                <span>Pay {currency} {(amount / 100).toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Stripe;