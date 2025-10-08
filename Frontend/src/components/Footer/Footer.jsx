import Logo from '../../assets/logo.png';
import Banner from '../../assets/banner/banner1.png';
import React from 'react';
import { FiInstagram } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";



const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  minHeight: '100%',
  width: '100%',
};

const FooterLinks = [
  { title: "Home", link: "/#" },
  { title: "About", link: "/#about" },
  { title: "Contact", link: "/#contact" },
  { title: "Blog", link: "/#blog" },
];

const Footer = () => {
  return (
    <footer style={BannerImg} className="text-white py-10">
      <div className="container mx-auto px-4">
        <div data-aos="zoom-in"
        className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Company Info */}
          <div className="flex flex-col items-start">
            <img src={Logo} alt="Logo" className="w-20 h-20 mb-4 rounded-full shadow-lg" />
            <h1 className="text-2xl font-bold mb-2">OnlineMarket</h1>
            <p className="text-sm opacity-80">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae ut natus nesciunt iure saepe distinctio eveniet re
            </p>
          </div>
          {/* Footer Links */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {FooterLinks.map((item, idx) => (
                <li key={idx}>
                  <a href={item.link} className="hover:underline text-base">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact & Social */}
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-sm mb-2">Email: info@onlinemarket.com</p>
            <p className="text-sm mb-4">Phone: +255 456 7890</p>
            <div className="flex space-x-4">
              <a href="#facebook" className="hover:text-blue-900 text-4xl"><FaFacebook /></a>
              <a href="#twitter" className="hover:text-blue-900 text-4xl"><BsTwitterX /></a>
              <a href="#instagram" className="hover:text-orange-500 text-4xl"><FiInstagram /></a>
              <a href="#whatsApp" className="hover:text-green-700 text-4xl"><IoLogoWhatsapp /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs opacity-70">
          &copy; {new Date().getFullYear()} OnlineMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;