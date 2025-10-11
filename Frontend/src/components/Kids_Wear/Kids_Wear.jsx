import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";

const KidsWear = () => {
  const [kidsWear, setKidsWear] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/kids_wear/")
      .then((response) => {
        setKidsWear(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching kids wear!", error);
      });
  }, []);

  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto ">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary font-semibold">
            Kids Wear products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Kids Wear Fashion
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            nisi ratione neque quasi exercitationem. Quia quaerat
          </p>
        </div>

        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 lg:grid-cols-5 place-items-center">
            {/* card section */}
            {kidsWear.map((data) => (
              <div data-aos="fade-up" key={data.id} className="space-y-3">
                <img
                  src={data.img ? data.img : "https://via.placeholder.com"}
                  alt={data.img}
                  className="h-[220px] w-[180px] object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com";
                  }}
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>{data.rating}</span>
                  </div>
                  <div className="flex items-center font-semibold gap-1">
                    <span>{data.cost}Tsh</span>
                  </div>
                </div>
                <div>
                  <button className="bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full cursor-pointer">
                    <p>Add to Cart</p>
                  </button>
                </div>
              </div>
            ))}
            {kidsWear.length === 0 && (
              <div className="col-span-full text-gray-500">No kids wear found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsWear;
