import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />

      <Navbar />
      <div className="h-20"></div>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
