import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import OrderPage from './Pages/OrderPage';
import UserLogin from './Pages/userLogin';
import OrderSuccessPage from './Pages/OrderSuccessPage';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.authUser);

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:category/:id" element={<ProductDetailsPage />} />
        <Route 
          path="/cart" 
          element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/checkout" 
          element={isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/order-page" 
          element={isLoggedIn ? <OrderPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/order-success/:id" 
          element={isLoggedIn ? <OrderSuccessPage /> : <Navigate to="/login" />}
        />  
      </Routes>
      <Footer />
    </>
  );
};

export default App;
