import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../TrendingProduct/Features/ContextProvider";
import { toast } from "react-toastify";

const TopProducts = ({ handleOrderPopup, setSelectedProduct }) => {
  const [top_products, setHeroes] = useState([]);
  const { dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: "Add", payload: product });
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/top_products/") // ✅ fetch from top_products API
      .then((response) => {
        setHeroes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching heroes!", error);
      });
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-700">
      <div className="container mx-auto">
        {/* header section */}
        <div className="text-left mb-24">
          <p
            data-aos="fade-up"
            className="text-sm text-primary dark:text-white font-semibold"
          >
            Top Rated Products for you
          </p>
          <h1
            data-aos="fade-up"
            className="text-3xl font-bold text-black dark:text-white"
          >
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            nisi ratione neque quasi.
          </p>
        </div>

        {/* body section */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5
          lg:grid-cols-5 place-items-center mb-24"
        >
          {top_products.map((item) => (
            <div
              key={item.id}
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 
              hover:bg-black/80 dark:hover:bg-primary hover:text-white
              relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={item.img || "https://via.placeholder.com"}
                  alt={item.img}
                  className="max-w-[140px] block mx-auto transform -translate-y-20
                  group-hover:scale-105 duration-300 drop-shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com";
                  }}
                />
              </div>

              {/* detail section */}
              <div className="p-4 text-center">
                {/* star rating (static since top_products model has no rating) */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{item.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 mb-2">
                  {item.description}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-primary group-hover:text-white">
                    ${parseFloat(item.cost || 0).toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProduct({
                        id: item.id,
                        title: item.title,
                        price: item.cost,
                        // Add other product details as needed
                      });
                      handleOrderPopup(item);
                    }}
                    className="flex items-center justify-center gap-2 bg-primary group-hover:text-primary
                    hover:scale-105 duration-200 text-white py-2 px-4 rounded-full 
                    cursor-pointer group-hover:bg-white"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {top_products.length === 0 && (
            <div className="col-span-full text-gray-500">
              No top products found.
            </div>
          )}
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

export default TopProducts;
