import React, { useContext } from "react";
import { CartContext } from "../CartFeatures/CartContextProvider";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const sampleProducts = [
    { id: 1, name: "Smartphone", price: 450 },
    { id: 2, name: "Headphones", price: 120 },
    { id: 3, name: "Smartwatch", price: 300 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Shopping Cart</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Products */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Products</h2>
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-3"
            >
              <span className="font-medium">{product.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-3"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span>x{item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
