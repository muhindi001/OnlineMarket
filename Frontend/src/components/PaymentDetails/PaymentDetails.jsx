import React, { useState } from "react";
import axios from "axios";
import { FaCreditCard, FaPaypal, FaMobileAlt, FaMoneyBillWave, FaBuilding } from "react-icons/fa";


const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: <FaCreditCard className="text-blue-600 text-2xl" />,
    description: "Pay with Visa, Mastercard, or other cards",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <FaPaypal className="text-blue-500 text-2xl" />,
    description: "Pay with your PayPal account",
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: <FaMobileAlt className="text-green-600 text-2xl" />,
    description: "Pay via M-Pesa mobile money",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: <FaBuilding className="text-indigo-600 text-2xl" />,
    description: "Make a direct bank transfer",
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    icon: <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
    description: "Pay in cash upon delivery",
  },
];

const PaymentDetails = ({ onPaymentSelect, amount }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [accNumber, setAccNumber] = useState("");

  const handlePaymentSelect = (methodId) => {
    setSelectedMethod(methodId);
    if (onPaymentSelect) onPaymentSelect(methodId);
  };

  const handleConfirmPayment = async () => {
    const payload = {
      full_name: "John Doe",
      email: "john@example.com",
      amount,
      payment_method: selectedMethod,
      phone_number: phone,
      bank_name: bank,
      account_number: accNumber,
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/payment/process/",
        payload
      );
      alert("Payment Status: " + res.data.status);
    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Payment Method</h2>

      {/* Scrollable payment methods */}
      <div className="max-h-96 overflow-y-auto pr-2 -mr-2">
        <div className="space-y-3 pr-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => handlePaymentSelect(method.id)}
              className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{method.icon}</div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{method.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{method.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMethod && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">
            {paymentMethods.find((m) => m.id === selectedMethod)?.name} selected.
            {selectedMethod === "cash"
              ? " Please have the exact amount ready for the delivery person."
              : " Please proceed with the payment."}
          </p>

          {selectedMethod !== "cash" && (
            <div className="mt-4 space-y-3">
              {selectedMethod === "card" && (
                <>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Card Number"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                    <input
                      type="text"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="CVV"
                    />
                  </div>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cardholder Name"
                  />
                </>
              )}

              {selectedMethod === "paypal" && (
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={handleConfirmPayment}
                >
                  <FaPaypal className="text-lg" />
                  Log in to PayPal
                </button>
              )}

              {selectedMethod === "mpesa" && (
                <div className="space-y-3">
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="M-Pesa Phone Number (e.g., 0712345678)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="text-sm text-gray-600">
                    You'll receive an M-Pesa prompt on your phone to complete the payment.
                  </p>
                </div>
              )}

              {selectedMethod === "bank" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">Please transfer to:</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Bank:</span> Your Bank Name
                    </p>
                    <p>
                      <span className="font-medium">Account Name:</span> Your Business Name
                    </p>
                    <p>
                      <span className="font-medium">Account Number:</span> 1234567890
                    </p>
                    <p>
                      <span className="font-medium">Branch:</span> Main Branch
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Use your order ID as the reference.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mt-4"
                onClick={handleConfirmPayment}
              >
                {selectedMethod === "card" ? "Pay Now" : "Confirm Order"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
