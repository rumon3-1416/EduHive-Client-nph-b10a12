import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import Sidebar from '../Pages/Dashboard/Components/Sidebar/Sidebar';
import Container from '../components/Container/Container';

const DashboardLayout = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="bg-blueBg pb-16">
      <div className="flex">
        {/* Navbar */}
        <Sidebar collapse={collapse} setCollapse={setCollapse} />

        {/* Outlet */}
        <div className="pt-12 flex-grow overflow-x-hidden">
          {/* Navbar */}
          <div
            className={
              'bg-[#f4fbff8e] w-full h-16 px-[2.5%] shadow-lg fixed top-0 left-0 right-0 flex md:hidden items-center'
            }
          >
            <button
              onClick={() => setCollapse(false)}
              className="text-skyBlue text-4xl"
            >
              <TbLayoutSidebarLeftExpandFilled />
            </button>
          </div>
          <div className="h-16 md:hidden"></div>

          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
