import React from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollRestoration />

      <Navbar />
      <div className={`bg-blueBg ${pathname !== '/' ? 'h-20' : 'h-10'}`}></div>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
