import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Product from './pages/product';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import Error404 from './pages/error404page';
import ForgotPassword from './pages/forgotPassword';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const location = useLocation();
  const validPaths = ['/', '/product', '/login', '/register', '/about-us', '/contact','/forgot-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isForm = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password';
  const wrongURL = !validPaths.includes(location.pathname);

  return (
    <>
    <Toaster/>
    {!isAdminRoute && !isForm && !wrongURL && <Navbar/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/*' element={<Error404/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
    </Routes>
    {!isAdminRoute && !isForm && !wrongURL && <Footer/>}
    </>
  );
}

export default App;