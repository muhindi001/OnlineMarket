import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick'

const Hero = ({ handleOrderPopup, setSelectedProduct }) => {
  const [hero, setHero] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/hero/") // Fetch from Django API
      .then((response) => {
        setHero(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hero!", error);
      });
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    arrows: false,
  };

  return (
    <div
      className="relative overflow-hidden min-h-[550px]
      sm:min-h-[650px] bg-gray-200 flex justify-center items-center
      dark:bg-gray-950 dark:text-white"
    >
      {/* background pattern */}
      <div
        className="h-[700px] w-[700px] bg-primary/40 absolute 
        -top-1/2 right-0 rounded-3xl rotate-45"
      ></div>

      {/* hero section */}
      <div className="container mx-auto pb-8 sm:pb-0">
        {/* slider section */}
        <Slider {...settings}>
          {hero.map((item) => (
            <div key={item.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div
                  className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center
                  sm:text-left order-2 sm:order-1 relative z-10"
                >
                  <h1
                    data-aos="zoom-out"
                    data-aos-once="true"
                    data-aos-dulation="500"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {item.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-dulation="500"
                    data-aos-delay="100"
                    className="text-sm"
                  >
                    {item.description}
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-dulation="500"
                    data-aos-delay="300"
                  >
                    <button
                      onClick={() => {
                        if (item.product) {
                          // Use the product data from the API if available
                          const product = {
                            id: item.product.id || `hero-product-${item.id}`,
                            title: item.product.title || item.title,
                            price: item.product.price || 99.99,
                            // Include any other product details from the API
                            ...item.product
                          };
                          setSelectedProduct(product);
                          handleOrderPopup(product);
                        } else {
                          // Fallback to default values if no product data
                          const product = {
                            id: `hero-product-${item.id}`,
                            title: item.title,
                            price: 99.99
                          };
                          setSelectedProduct(product);
                          handleOrderPopup(product);
                        }
                      }}
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full cursor-pointer"
                    >
                      Order Now
                    </button>
                  </div>
                </div>

                {/* image section */}
                <div className="order-1 sm:order-2">
                  <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className="relative z-10"
                  >
                    <img
                      src={item.img || "https://via.placeholder.com"}
                      alt={item.img}
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px]
                      sm:scale-105 object-contain mx-auto lg:scale-120"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {hero.length === 0 && (
            <div className="text-center text-gray-500">No hero items found.</div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
