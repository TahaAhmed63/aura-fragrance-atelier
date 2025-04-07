
import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Cart />
      <Outlet />
    </>
  );
};

export default Layout;
