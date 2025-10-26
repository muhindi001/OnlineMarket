import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../../assets/profile/profile.jpg';
import homeimg from '../../../assets/home.png';
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { FaBars } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const sidebarMenu = [
  { title: 'Dashboard', icon: '🏠' },
  { title: 'My Cart', icon: '🛒' },
  { title: 'Trending Product', icon: '🔥' },
  { title: 'Setting', icon: '⚙️' },
];

const cards = [
  { title: 'Product View', value: '0', icon: '👀', color: 'bg-blue-100', text: 'Total views of your products' },
  { title: 'Payment Category', value: '0', icon: '💳', color: 'bg-green-100', text: 'Active payment methods' },
  { title: 'Total Pay', value: '$0', icon: '💰', color: 'bg-purple-100', text: 'Total payments received' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/v1/api/logout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/Login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/Login');
    }
  };

  const handleMenuClick = (item) => {
    if (item.title === 'Logout') {
      handleLogout();
    } else if (item.title === 'My Cart') {
      navigate('/Cart');
    } else if (item.title === 'Trending Product') {
      navigate('/#products');
    } else if (item.title === 'Setting') {
      console.log('Settings clicked');
    }
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 8, 15, 10, 17],
        backgroundColor: 'rgba(37, 99, 235, 0.6)',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Monthly Sales Overview', font: { size: 16 } },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-all">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col py-6 px-5 shadow-xl">
          {/* <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">MyShop</h2> */}
          
          <nav className="flex flex-col gap-2 w-full flex-1">
            {sidebarMenu.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleMenuClick(item)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left ${
                  idx === 0 ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 font-medium w-full border border-red-200 dark:border-red-700"
            >
              <LuLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* Hamburger icon */}
            <FaBars
              className="text-3xl text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-600 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">OnlineMarket Shop</h1>
          </div>
         
        </div>

        {/* Header Title */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-1xl font-bold text-gray-800 dark:text-white">
              Welcome back, Aliah Lane 
            </h1>
            {/* Grouped Home, Notification & Profile */}
          <div className="flex items-center gap-5">
            <a href="/" title="Home">
              <img
                src={homeimg}
                alt="Home"
                className="w-6 h-6 hover:scale-105 transition-transform cursor-pointer"
              />
            </a>

            <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600">
              <IoMdNotificationsOutline className="text-3xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
            </button>

            <img
              src={profileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.color} rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.02] transition-transform`}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="font-semibold text-lg text-gray-800">{card.title}</div>
              <div className="text-2xl font-bold text-blue-700">{card.value}</div>
              <p className="text-sm text-gray-500 mt-1 text-center">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Sales Statistics</h2>
          <Bar data={chartData} options={chartOptions} height={120} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
