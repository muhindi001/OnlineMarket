import React, { useContext } from 'react';
import Logo from '../../assets/logo.png' 
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from 'react-icons/fa6';
import DarkMode from './DarkMode';
import { CartContext } from '../TrendingProduct/Features/ContextProvider';


const Menu = [
  {
    id: 1,
    name: 'Home',
    link: '/'
  },
   {
    id: 2,
    name: 'Shoes',
    link: '/Shoes'
  },
   {
    id: 3,
    name: 'Kids Wear',
    link: '/Kids_Wear'
  },
   {
    id: 4,
    name: 'Mens Wear',
    link: '/Mens_Wear'
  },
   {
    id: 5,
    name: 'Electronics',
    link: '/Electronics'
  },
];
const DropdownLinks = [
  {
    id: 1,
    name: 'Trending Products',
    link: '/#products',
  },
   {
    id: 2,
    name: 'Best Sales',
    link: '/#',
  },
   {
    id: 3,
    name: 'Top Rated',
    link: '/#',
  },
  {
    id: 4,
    name: 'Dashboard',
    link: '/Dashboard',
  }

]

const Navbar = () => {
  const {cart} = useContext(CartContext)
  return (
    <div className='shadow-md bg-white dark:bg-gray dark:bg-gray-900 dark:text-white
    duration-200 relative z-10'>
      {/* upper bar */}
      <div className='bg-primary/70 py-2 sm:py-0'>
        <div className='container mx-auto flex items-center'>
          {/* Logo */}
          <div>
            <a href="/" className='font-bold text-2xl sm:text-2xl flex gap-2'>
              <img src={Logo} alt='Logo'
                className='w-8'
              />
              OnlineMarket
            </a>
          </div>
          {/* Right side: search, cart, dark mode */}
          <div className='flex items-center gap-3 ml-auto'>
            {/* search bar */}
            <div className='group relative hidden sm:block'>
              <input 
                type="text" 
                placeholder='search' 
                className='w-[200px] sm:w-[200px] group-hover:w-[300px]
                transition-all duration-300 rounded-full border border-gray-300
                px-2 py-1 focus:outline-none focus:border-1 focus:border-primary bg-amber-50
                dark-border-gray-500 dark:bg-gray-800'
              />
              <IoMdSearch className='text-gray-500 group-hover:text-primary
                absolute top-1/2 -translate-y-1/2 right-3'/>
            </div>
            {/* order button */}
            <button
              className='bg-gradient-to-r from-primary to-secondary transition-allduration-200
              text-white px-4 py-1 rounded-full flex items-center gap-3 group'
            >
              <span className='group-hover:block hidden transition-all duration-200'>
                Cart
              </span>
              <a href="/Cart">
              <FaCartShopping className='text-xl text-white drop-shadow-sm cursor-pointer '/>{cart.length}
              </a>
            </button>
            {/* darkmode switch */}
            <div>
              <DarkMode/>
            </div>
          </div>
        </div>
      </div>
      {/* lower bar */}
      <div data-aos='zoom-in'
      className='flex justify-center'>
        <ul className='sm:flex items-center hidden gap-4'>
          {
            Menu.map((data) =>(
              <li key={data.id}>
                <a href={data.link} className='inline-block px-4 hover:text-primary duration-200'>
                  {data.name}</a>
              </li>
            ))
          }
          {/* Simple Dropdown and Link */}
          <li className='group relative cursor-pointer'>
            <a href="#"
            className='flex items-center gap-[2px] py-2'
            >Trending Products
            <span>
              <FaCaretDown
              className='transition-all duration-200 group-hover:rotate-180 '
              />
            </span>
            </a>
            <div className='absolute z-[9999] hidden group-hover:block w-[150px] 
            rounded-md bg-white p-2 text-black shadow-md
            '>
              <ul>
                {DropdownLinks.map((data) =>(
                  <li key={data.id} >
                    <a href={data.link}
                    className='inline-block w-full rounded-md p-2 hover:bg-primary/20 '>
                      {data.name}
                    </a>
                  </li>
                ))
                }
              </ul>
            </div>
          </li>
          {/* Login Button */}
          <li>
            <a href="/Login" className="inline-block px-6 py-1 bg-blue-700 text-white rounded-full
             hover:bg-blue-900 transition duration-200 ">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar