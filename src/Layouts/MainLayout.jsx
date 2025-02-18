import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />

      <Navbar />
      <div className="bg-blueBg h-10"></div>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
