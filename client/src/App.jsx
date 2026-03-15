import Navbar from './components/navbar';
import Navbar2 from './components/navbar2';
import Footer from './components/footer';
import Home from './pages/home';
import Product from './pages/product';
import AboutUs from './pages/aboutUs';
import Contact from './pages/contact';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import Error404 from './pages/error404page';
import ForgotPassword from './pages/forgotPassword';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';
import ChatbotWidget from './components/ChatbotWidget';
import { isLoggedInWithValidSession } from './lib/auth';

const App = () => {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => isLoggedInWithValidSession());

  useEffect(() => {
    setIsLoggedIn(isLoggedInWithValidSession());
  }, [location.pathname]);

  const validPaths = ['/', '/product', '/login', '/register', '/about-us', '/contact','/forgot-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isForm = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password';
  const wrongURL = !validPaths.includes(location.pathname);

  return (
    <ThemeProvider>
    <>
    <Toaster/>
    <ChatbotWidget />
    {!isAdminRoute && !isForm && !wrongURL && (
       isLoggedIn ? <Navbar2/>: <Navbar/>)}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/*' element={<Error404/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
    </Routes>
    {!isAdminRoute && !isForm && !wrongURL && <Footer/>}
    </>
    </ThemeProvider>
  );
}

export default App;