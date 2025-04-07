
import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Cart />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
