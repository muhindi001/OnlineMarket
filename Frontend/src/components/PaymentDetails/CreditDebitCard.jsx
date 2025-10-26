import React, { useState } from 'react';
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock, FaMapMarkerAlt } from 'react-icons/fa';

const CreditDebitCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces after every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s+/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substring(0, 19) || '';
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .match(/(\d{0,2})(\d{0,2})/)
        .slice(1)
        .filter(Boolean)
        .join('/')
        .substring(0, 5);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format CVV (3-4 digits)
    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 4);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2">
        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-1">
          <FaCreditCard className="text-blue-600" />
          Credit / Debit Card
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Used for VISA, MasterCard, etc.
        </p>
      </div>

      {/* Cardholder Name */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
          <FaUser className="text-gray-500" />
          Cardholder Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <p className="text-xs text-gray-500">Name as it appears on your card</p>
      </div>

      {/* Card Number */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Card Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="4111 1111 1111 1111"
            className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <FaCreditCard className="absolute left-3 top-3.5 text-gray-400" />
        </div>
        <p className="text-xs text-gray-500">16 digits on the front of your card</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <FaCalendarAlt className="text-gray-500" />
            Expiry Date <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500">MM/YY format</p>
        </div>

        {/* CVV */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <FaLock className="text-gray-500" />
            CVV <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <FaLock className="absolute left-3 top-3 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">3-4 digit security code</p>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-500" />
          Billing Address (optional)
        </label>
        <input
          type="text"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
          placeholder="123 King St, Dar es Salaam"
          className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500">Must match your card's billing information</p>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default CreditDebitCard;