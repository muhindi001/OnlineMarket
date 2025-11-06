import React from "react";
import { FaCreditCard, FaMapMarkerAlt, FaShoppingCart, FaPhone } from "react-icons/fa";

const QuickActions = () => {
  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Quick Actions</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <button className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
          <FaShoppingCart className="text-blue-500 text-3xl mb-2" />
          <span>Shop Now</span>
        </button>

        <button className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
          <FaCreditCard className="text-green-500 text-3xl mb-2" />
          <span>Make Payment</span>
        </button>

        <button className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
          <FaMapMarkerAlt className="text-red-500 text-3xl mb-2" />
          <span>Find Location</span>
        </button>

        <button className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
          <FaPhone className="text-purple-500 text-3xl mb-2" />
          <span>Contact Us</span>
        </button>
      </div>
    </section>
  );
};

export default QuickActions;
