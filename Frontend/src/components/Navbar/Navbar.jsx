import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // ✅ added
import Logo from '../../assets/logo.png';
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from 'react-icons/fa6';
import DarkMode from './DarkMode';
import { useCart } from '../TrendingProduct/Features/ContextProvider';

const Menu = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'Shoes', link: '/Shoes' },
  { id: 3, name: 'Kids Wear', link: '/Kids_Wear' },
  { id: 4, name: 'Mens Wear', link: '/Mens_Wear' },
  { id: 5, name: 'Electronics', link: '/Electronics' },
];

const DropdownLinks = [
  { id: 1, name: 'Trending Products', link: '/#products' },
  { id: 2, name: 'Best Sales', link: '/#' },
  { id: 3, name: 'Top Rated', link: '/#' },
  { id: 4, name: 'Dashboard', link: '/Dashboard' },
];

const Navbar = () => {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const location = useLocation(); // ✅ to detect which page user is on



  // ✅ Smart search handler
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    // detect current page (like /Shoes, /Kids_Wear, /Mens_Wear, /Electronics)
    const currentPath = location.pathname.toLowerCase();

    // map page to backend filter
    let filterField = '';
    if (currentPath.includes('shoes')) filterField = 'shoes';
    else if (currentPath.includes('kids_wear')) filterField = 'kids_wear';
    else if (currentPath.includes('mens_wear')) filterField = 'mens_wear';
    else if (currentPath.includes('electronics')) filterField = 'electronics';

    // build API URL
    let url = `http://127.0.0.1:8000/api/v1/product/?type=${filterField}&search=${searchTerm}`;
    if (filterField) url += `&type=${filterField}`; // backend should filter by type

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Search results:", data);
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSelect = () => {
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray dark:bg-gray-900 dark:text-white duration-200 relative z-10">
      {/* upper bar */}
      <div className="bg-primary/70 py-2 sm:py-0">
        <div className="container mx-auto flex items-center">
          {/* Logo */}
          <div>
            <a href="/" className="font-bold text-2xl sm:text-2xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-8" />
              OnlineMarket
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            {/* search bar */}
            <div className="group relative hidden sm:block">
              <input
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px] sm:w-[200px] group-hover:w-[300px]
                transition-all duration-300 rounded-full border border-gray-300
                px-2 py-1 focus:outline-none focus:border-1 focus:border-primary bg-amber-50
                dark-border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch
                onClick={handleSearch}
                className="text-gray-500 hover:text-primary cursor-pointer
                absolute top-1/2 -translate-y-1/2 right-3"
              />

              {/* Search results dropdown */}
              {showResults && results.length > 0 && (
                <div className="absolute top-10 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-50 max-h-60 overflow-y-auto">
                  {results.map((item) => (
                    <a
                      key={item.id}
                      href={`/product/${item.id}`}
                      onClick={handleSelect}
                      className="flex items-center gap-3 p-2 hover:bg-primary/20 rounded-md transition"
                    >
                      <img src={item.img} alt={item.title} className="w-10 h-10 object-cover rounded-md" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.cost} Tsh</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* order button */}
            <button className="relative bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full flex items-center gap-3 group">
              <a href="/Cart" className="relative flex items-center">
                <FaCartShopping className="text-2xl drop-shadow-sm cursor-pointer text-gray-50" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg">
                    {cart.length}
                  </span>
                )}
              </a>
              <span className="hidden group-hover:block transition-all duration-200">
                Cart
              </span>
            </button>

            {/* darkmode switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* lower bar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex items-center hidden gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a href={data.link} className="inline-block px-4 hover:text-primary duration-200 text-lg">
                {data.name}
              </a>
            </li>
          ))}

          {/* Simple Dropdown */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a href={data.link} className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Login Button */}
          <li>
            <a
              href="/Login"
              className="inline-block px-6 py-1 bg-blue-700 text-white rounded-full hover:bg-blue-900 transition duration-200"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
