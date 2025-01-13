import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />

      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
