import React from 'react';
import profileImg from '../../../assets/profile/profile.jpg';
import homeimg from '../../../assets/home.png'
import { IoMdNotificationsOutline } from "react-icons/io";

const sidebarMenu = [
  { title: 'Dashboard', icon: '🏠' },
  { title: 'My Cart', icon: '🛒' },
  { title: 'Trending Product', icon: '🔥' },
  { title: 'Setting', icon: '⚙️' },
  { title: 'Logout', icon: '🚪' },
];

const cards = [
  { title: 'Product View', value: '0', icon: '👀', color: 'bg-blue-100', text: 'Total views of your products' },
  { title: 'Payment Category', value: '0', icon: '💳', color: 'bg-green-100', text: 'Active payment methods' },
  { title: 'Total Pay', value: '$0', icon: '💰', color: 'bg-purple-100', text: 'Total payments received' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-700">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col py-8 px-4 shadow-lg min-h-screen">
        {/* Profile image and user info removed from sidebar */}
        <nav className="flex flex-col gap-2 w-full">
          {sidebarMenu.map((item, idx) => (
            <button key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition w-full text-left ${idx === 0 ? 'bg-blue-100' : ''}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-base font-semibold">{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="w-full bg-white flex items-center justify-between px-8 py-4 border-b shadow-sm rounded-xl mb-8">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-800">Welcome back, Aliah Lane!</span>
          </div>
          <div className="flex items-center gap-6 ">
            <a href="/" className="text-1xl hover:text-blue-500" title="Home">
              <img src={homeimg} alt="Home" className="w-6 h-6 text-blue-800"/>
            </a>
            <button className="relative text-gray-500 hover:text-blue-500">
              <IoMdNotificationsOutline className='text-3xl text-blue-700'/>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
            </button>
            <img src={profileImg} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-blue-200" />
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {cards.map((card, idx) => (
            <div key={idx} className={`rounded-2xl shadow-lg p-4 flex flex-col items-center ${card.color} hover:scale-105 transition-transform duration-200`}>
              <span className="text-4xl mb-3">{card.icon}</span>
              <div className="font-bold text-xl text-gray-800 mb-1">{card.title}</div>
              <div className="text-2xl font-bold text-blue-700 mb-1">{card.value}</div>
              <div className="text-xs text-gray-500 text-center">{card.text}</div>
            </div>
          ))}
        </div>
        {/* ...additional dashboard content can go here... */}
      </main>
    </div>
  );
}

export default Dashboard