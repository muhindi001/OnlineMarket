import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import profileImg from '../../../assets/profile/profile.jpg';
import homeimg from '../../../assets/home.png';
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { FaBars } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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
  { title: 'Orders', icon: '📦' },
  { title: 'Trending Product', icon: '🔥' },
  { title: 'Setting', icon: '⚙️' },
];

const cards = [
  { title: 'Product View', value: '0', icon: '👀', color: 'bg-blue-100', text: 'Total views of your products' },
  { title: 'Payment Category', value: '0', icon: '💳', color: 'bg-green-100', text: 'Active payment methods' },
  { title: 'Total Pay', value: '$0', icon: '💰', color: 'bg-purple-100', text: 'Total payments received' },
];

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [notifyCount, setNotifyCount] = useState(2);
  // Get orders from props or use empty array if not provided
  const [orders, setOrders] = useState(props.orders || []);
  
  // Update local state when props.orders changes
  useEffect(() => {
    if (props.orders) {
      setOrders(props.orders);
    }
  }, [props.orders]);

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate total price for an order
  const calculateTotal = (products) => {
    return products.reduce((total, product) => {
      return total + (product.quantity * product.price);
    }, 0).toFixed(2);
  };

  // Chart data
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
      title: { 
        display: true, 
        text: 'Monthly Sales Overview', 
        font: { size: 16 } 
      },
    },
    scales: { 
      y: { 
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 5
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };
  
  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/v1/api/logout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      navigate('/Login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      navigate('/Login');
    }
  };
  
  const handleMenuClick = (item) => {
    setActiveMenu(item.title);
    if (item.title === 'Logout') {
      handleLogout();
    } else if (item.title === 'My Cart') {
      navigate('/Cart');
    } else if (item.title === 'Trending Product') {
      navigate('/#products');
    }
  };

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const Orders = ({ orders = [] }) => {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{order.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{order.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{order.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.products.map((product) => (
                        <div key={product.id} className="text-sm">
                          {product.name} × {product.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ${calculateTotal(order.products)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-all overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col py-6 px-5 shadow-xl fixed left-0 top-0 z-10">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">MyShop</h2>
        <nav className="flex flex-col gap-2 w-full flex-1">
          {sidebarMenu.map((item) => (
            <button
              key={item.title}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left ${
                activeMenu === item.title 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                  : 'hover:bg-blue-50 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 font-medium w-full border border-red-200 dark:border-red-700"
          >
            <LuLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      )}

      {/* Main Section */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <main className="flex-1 p-8 overflow-y-auto h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <FaBars
                className="text-3xl text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-600 transition"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">OnlineMarket Shop</h1>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-5">
              <a href="/" title="Home" className="flex items-center">
                <img
                  src={homeimg}
                  alt="Home"
                  className="w-6 h-6 hover:scale-105 transition-transform"
                />
              </a>
  <div className="flex items-center gap-2">
    {user?.profile_image ? (
      <img
        src={user.profile_image}
        alt="Profile"
        className="w-8 h-8 rounded-full object-cover border-2 border-primary"
      />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
        {user?.first_name?.[0] || 'U'}
      </div>
    )}
    <span className="hidden md:inline text-sm font-medium">
      {user ? `${user.first_name} ${user.last_name}`.trim() : 'User'}
    </span>
  </div>
  {/* notify icon */}
  <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600">
    <IoMdNotificationsOutline className="text-2xl" />
    {notifyCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {notifyCount}
      </span>
    )}
  </button>
</div>
          </div>

          {/* Header Title */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {activeMenu === 'Orders' ? 'Order Management' : `Welcome back, ${user ? `${user.first_name} ${user.last_name}`.trim() : 'User'}`}
            </h1>
            
            {activeMenu === 'Orders' ? (
              <div className="min-h-[300px] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Order Management</h2>
                {orders && orders.length > 0 ? (
                  <Orders orders={orders} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                      You haven't placed any orders yet. Start shopping to see your orders here!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {cards.map((card, index) => (
                    <div 
                      key={index} 
                      className={`${card.color} dark:bg-opacity-20 p-6 rounded-xl shadow-sm transition-transform hover:scale-[1.02]`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{card.title}</p>
                          <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{card.text}</p>
                        </div>
                        <span className="text-3xl">{card.icon}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Chart Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <div className="h-80">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>
              </>
            )}
            
            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300">📊</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">New order received</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;