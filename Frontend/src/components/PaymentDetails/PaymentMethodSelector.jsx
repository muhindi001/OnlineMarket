import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import CreditDebitCard from './CreditDebitCard';
import PayPal from './PayPal';
import M_Pesa from './M_Pesa';
import BankTransfer from './BankTransfer';

const PaymentMethodSelector = ({ amount, currency = 'USD', onPaymentSuccess, onPaymentError }) => {
  const [selectedMethod, setSelectedMethod] = useState('creditCard');

  const paymentMethods = [
    {
      id: 'creditCard',
      name: 'Credit/Debit Card',
      icon: <FaCreditCard className="text-blue-500" />,
      component: (
        <CreditDebitCard
          amount={amount}
          currency={currency}
          onSuccess={onPaymentSuccess}
          onError={onPaymentError}
        />
      ),
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal className="text-blue-700" />,
      component: (
        <PayPal
          amount={amount}
          currency={currency}
          onSuccess={onPaymentSuccess}
          onError={onPaymentError}
        />
      ),
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: <FaMobileAlt className="text-green-600" />,
      component: (
        <M_Pesa
          amount={amount}
          currency={currency}
          onPaymentInitiated={onPaymentSuccess}
          onError={onPaymentError}
        />
      ),
    },
    {
      id: 'bankTransfer',
      name: 'Bank Transfer',
      icon: <FaUniversity className="text-indigo-600" />,
      component: (
        <BankTransfer
          amount={amount}
          currency={currency}
          onPaymentSubmitted={onPaymentSuccess}
          onError={onPaymentError}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Select Payment Method</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 mr-3">
                {method.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {method.name}
              </span>
              {selectedMethod === method.id && (
                <div className="absolute top-0 right-0 -mt-1 -mr-1">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {paymentMethods.find(m => m.id === selectedMethod)?.name} Details
        </h3>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {paymentMethods.find(m => m.id === selectedMethod)?.component}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
