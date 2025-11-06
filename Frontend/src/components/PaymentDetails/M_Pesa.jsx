import React, { useState, useEffect } from 'react';
import { FaMobileAlt, FaUser, FaMoneyBillWave, FaLock, FaInfoCircle } from 'react-icons/fa';

const M_Pesa = ({ amount = 0, currency = 'TZS', onPaymentInitiated, onError }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    name: '',
    amount: amount.toFixed(2),
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as 255XXXXXXXXX
    if (cleaned.startsWith('0')) {
      return `255${cleaned.substring(1, 10)}`;
    } else if (cleaned.startsWith('255')) {
      return cleaned.substring(0, 12);
    } else {
      return cleaned;
    }
  };

  const validatePhoneNumber = (phone) => {
    // Check if it's a valid Tanzanian phone number (255XXXXXXXXX)
    const tzRegex = /^255[67]\d{8}$/;
    return tzRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
      
      // Clear error when user starts typing
      if (errors.phoneNumber) {
        setErrors(prev => ({ ...prev, phoneNumber: null }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Tanzanian phone number (e.g., 255712345678)';
    }
    
    if (amount <= 0) {
      newErrors.amount = 'Invalid amount';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Start the payment process
    setIsSubmitting(true);
    setCountdown(60); // Start 60-second countdown
    
    try {
      // In a real app, this would be an API call to your backend
      // which would then initiate the M-Pesa STK push
      const paymentData = {
        phoneNumber: formData.phoneNumber,
        name: formData.name || 'Customer',
        amount: parseFloat(amount).toFixed(2),
        currency,
        timestamp: new Date().toISOString(),
        reference: `MPESA-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      };
      
      console.log('Initiating M-Pesa payment:', paymentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onPaymentInitiated) {
        onPaymentInitiated(paymentData);
      }
      
      // Start polling for payment status in a real app
      // pollPaymentStatus(paymentData.reference);
      
    } catch (error) {
      console.error('M-Pesa payment error:', error);
      if (onError) {
        onError(error.message || 'Failed to initiate M-Pesa payment');
      }
      setIsSubmitting(false);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isSubmitting) {
      setIsSubmitting(false);
      if (onError) {
        onError('Payment request timed out. Please try again.');
      }
    }
  }, [countdown, isSubmitting]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <FaMobileAlt className="text-4xl text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Pay with M-Pesa</h2>
        <p className="text-gray-600 mt-1">
          Complete your payment using M-Pesa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaMobileAlt className="text-gray-500" />
            M-Pesa Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="255712345678"
              className={`w-full p-2.5 pl-10 border ${
                errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              disabled={isSubmitting}
              maxLength={12}
            />
            <FaMobileAlt className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.phoneNumber ? (
            <p className="text-sm text-red-600">{errors.phoneNumber}</p>
          ) : (
            <p className="text-xs text-gray-500">
              Enter your M-Pesa registered phone number (e.g., 255712345678)
            </p>
          )}
        </div>

        {/* Name (Optional) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaUser className="text-gray-500" />
            Your Name (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isSubmitting}
            />
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">
            The name associated with your M-Pesa account (optional)
          </p>
        </div>

        {/* Amount */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaMoneyBillWave className="text-gray-500" />
            Amount to Pay
          </label>
          <div className="relative">
            <input
              type="text"
              value={`${currency} ${parseFloat(amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`}
              readOnly
              className="w-full p-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
            />
            <FaMoneyBillWave className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        {/* Payment Instructions */}
        {isSubmitting ? (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800">Check your phone!</h4>
                <p className="text-sm text-blue-700 mt-1">
                  You will receive an M-Pesa payment prompt on <strong>{formData.phoneNumber}</strong>.
                  Please enter your M-Pesa PIN to complete the payment.
                </p>
                <div className="mt-2 text-sm text-blue-600">
                  Time remaining: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3">
            <FaLock className="text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-green-800">
                <strong>Secure Payment:</strong> Your payment is processed securely via M-Pesa's payment system.
                We do not store your M-Pesa PIN or any sensitive information.
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || amount <= 0}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
              isSubmitting || amount <= 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-green-600 hover:bg-green-700 text-white'
            } transition-colors`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Awaiting Payment...
              </>
            ) : (
              <>
                <FaMobileAlt className="text-lg" />
                <span>Pay with M-Pesa</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          Having trouble? Ensure your phone has mobile data or SMS services enabled.
          You will receive an M-Pesa push notification to complete the payment.
        </p>
      </div>
    </div>
  );
};

export default M_Pesa;