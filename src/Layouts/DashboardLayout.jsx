import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Pages/Dashboard/Components/Sidebar/Sidebar';
import Container from '../components/Container/Container';
import DashNavbar from '../Pages/Dashboard/Components/DashNavbar';

const DashboardLayout = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="bg-blueBg pb-16">
      <div className="flex">
        {/* Navbar */}
        <Sidebar collapse={collapse} setCollapse={setCollapse} />

        <div className="min-h-[100vh] pt-12 pb-8 flex-grow overflow-x-hidden">
          <DashNavbar setCollapse={setCollapse} />

          {/* Outlet */}
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
