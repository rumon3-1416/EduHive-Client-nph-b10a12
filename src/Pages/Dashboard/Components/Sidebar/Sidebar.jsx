import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import sidebarIcon from '../../../../assets/icons/sidebar.png';
import { useAuthContext } from '../../../../Hooks/useAuthContext';
import StudentMenu from './StudentMenu';
import TeacherMenu from './TeacherMenu';
import AdminMenu from './AdminMenu';

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const { pathname } = useLocation();
  const { role } = useAuthContext();

  useEffect(() => {
    window.innerWidth < 768 ? setCollapse(true) : setCollapse(false);
  }, []);
  window.addEventListener('resize', e => {
    e.target.innerWidth < 768 && setCollapse(true);
  });

  return (
    <div className="min-h-[13.5rem] max-h-[calc(100vh-96px)] sticky top-24 left-0 z-10">
      <div className="h-full relative">
        <div
          className={
            'bg-[#3db05828] backdrop-blur-md w-max h-full absolute md:static'
          }
        >
          <div
            className={`ps-3 md:ps-6 pt-20 pb-8 relative ${
              collapse ? 'pe-3.5 md:pe-6' : 'pe-6 md:pe-8'
            }`}
          >
            {/* Sidebar Button */}
            <button
              onClick={() => setCollapse(!collapse)}
              className="bg-[#DDF1E2] rounded-md shadow-md shadow-gray absolute top-6 -right-4"
            >
              <img className="w-8" src={sidebarIcon} alt="" />
            </button>

            {/* Sidebar Links */}
            <ul className="text-gray font-medium">
              {role === 'student' ? (
                <StudentMenu />
              ) : role === 'teacher' ? (
                <TeacherMenu />
              ) : (
                role === 'admin' && <AdminMenu />
              )}

              <li
                className={`${
                  pathname === '/dashboard/profile' ? 'text-blue-500' : ''
                }`}
              >
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
