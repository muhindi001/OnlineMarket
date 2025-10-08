import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/products/") // updated API endpoint
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products!", error);
      });
  }, []);

  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary font-semibold">
            Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>

        {/* Body */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 lg:grid-cols-5 place-items-center">
            {products.map((item) => (
              <div key={item.id} data-aos="fade-up" className="space-y-3">
                <img
                  src={item.img || "https://via.placeholder.com"}
                  alt={item.title}
                  className="h-[220px] w-[180px] object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com";
                  }}
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-gray-500">No products found.</div>
            )}
          </div>         
        </div>
        {/* view all button */}
          <div className='flex justify-center'>
            <a href="/TopSelling">
              <button className='text-center mt-10 cursor-pointer bg-primary
            text-white py-1 px-2 rounded-md'>View All Products</button>
            </a>
          </div>
      </div>
    </div>
  );
};

export default Products;
