import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import AOS from 'aos'
import 'aos/dist/aos.css'
import TopProducts from './components/TopProducts/TopProducts'
import Banner from './components/Banner/Banner'
import Subscribe from './components/Subscribe/Subscribe'
import Testmonials from './components/Testmonials/Testmonials'
import Footer from './components/Footer/Footer'
import Popup from './components/Popup/Popup'
import Fashion from './components/Fashion/Fashion'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Shoes from './components/Shoes/Shoes'
import Kids_Wear from './components/Kids_Wear/Kids_Wear'
import Mens_Wear from './components/Mens_Wear/Mens_Wear'
import Electronics from './components/Electronics/Electronics'
import Dashboard from './components/TrendingProduct/Dashboard/Dashboard'
import TopSelling from './components/TopSelling/TopSelling'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Cart from './components/TrendingProduct/CartFeatures/Cart'
import { CartProvider } from './components/TrendingProduct/Features/ContextProvider'
import ForgotPassword from './Auth/ForgotPassword'
import CheckoutPage from './components/CheckoutPage/CheckoutPage'


const App = () => {
  const location = typeof window !== 'undefined' ? window.location : { pathname: '/' };
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [orders, setOrders] = React.useState(() => {
    // Load orders from localStorage if available
    const savedOrders = typeof window !== 'undefined' ? localStorage.getItem('orders') : null;
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const handleOrderPopup = (product = null) => {
    setSelectedProduct(product);
    setOrderPopup(!orderPopup);
  };

  const addOrder = (newOrder) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  React.useEffect(() => {
    AOS.init({
    offset: 100,
    duration: 800,
    easing: 'ease-in-sine',
    delay: 100,
  });
  AOS.refresh();
  }, []);

  return (
    <React.StrictMode>
    <CartProvider>
      <div className='bg-gray-100 dark:bg-gray-900 
      dark:text-white duration-200'>
        <Router>
    {location.pathname !== '/Dashboard' && location.pathname.toLowerCase() !== '/login' && location.pathname !== '/ForgotPassword' &&
    location.pathname.toLowerCase() !== '/register' &&  
    <Navbar handleOrderPopup={handleOrderPopup}/>} 
          <Routes>
            <Route 
              path='/'
              element={
        <>
          <Hero handleOrderPopup={handleOrderPopup} setSelectedProduct={setSelectedProduct}/>
          <Products />
          <TopProducts handleOrderPopup={handleOrderPopup} setSelectedProduct={setSelectedProduct}/>
          <Banner />
          <Subscribe />
          <Fashion handleOrderPopup={handleOrderPopup} setSelectedProduct={setSelectedProduct}/>
          <Testmonials/>
          <Footer/>
          <Popup 
            orderPopup={orderPopup} 
            setOrderPopup={setOrderPopup}
            product={selectedProduct}
            addOrder={addOrder}
          />
        </>
              }
            />
            <Route path="/Shoes" element={<Shoes />} />
            <Route path="/Kids_Wear" element={<Kids_Wear />} /> 
            <Route path="/Mens_Wear" element={<Mens_Wear />} />
            <Route path="/Electronics" element={<Electronics />} /> 
            <Route path='/Dashboard' element={<Dashboard orders={orders} setOrders={setOrders}/>}/> 
            <Route path='/TopSelling' element={<TopSelling/>}/>  
            <Route path='/Login' element={<Login/>}/>  
            <Route path='/Register' element={<Register/>}/>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/> 
            <Route path='/Cart' element={<Cart/>}/>
            <Route path="/checkout/payment/:method?" element={<CheckoutPage />} />
            <Route path="*" element={<h2 className='text-center mt-20'>404 - Page Not Found</h2>} />
          </Routes> 
        </Router>
      </div>
    </CartProvider>
    </React.StrictMode>
  )  
}
export default App