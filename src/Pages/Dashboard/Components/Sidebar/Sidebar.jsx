import React, { useEffect, useRef } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdLogout,
} from 'react-icons/md';

import { useAuthContext } from '../../../../Hooks/useAuthContext';
import StudentMenu from './StudentMenu';
import TeacherMenu from './TeacherMenu';
import AdminMenu from './AdminMenu';

import './sidebar.css';
import logo from '../../../../assets/icons/logo.png';

const Sidebar = ({ collapse, setCollapse }) => {
  const divRef = useRef(null);

  const { pathname } = useLocation();
  const { darkTheme, setDarkTheme, user, role, signOutUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    // Handle Resize Screen
    const handleResize = e => {
      e.target.innerWidth < 768 ? setCollapse(true) : setCollapse(false);
    };
    // Handle Outside Click
    const handleClick = e => {
      if (
        window.innerWidth < 768 &&
        divRef.current &&
        !divRef.current.contains(e.target)
      ) {
        setCollapse(true);
      }
    };

    window.innerWidth < 768 ? setCollapse(true) : setCollapse(false);

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? '#303030' : '#f7f7f7';
    window.document.documentElement.classList.add(
      darkTheme ? 'bg-dark3' : 'bg-[#f7f7f7]'
    );
    window.document.documentElement.classList.remove(
      darkTheme ? 'bg-[#f7f7f7]' : 'bg-dark3'
    );
  }, [darkTheme]);

  return (
    <div className="min-h-[100vh] max-h-[100vh] sticky top-0 left-0 z-20">
      <div className="h-full relative">
        {/* Sidebar */}
        <div
          ref={divRef}
          className={`sidebar backdrop-blur-md md:h-full absolute md:static top-0 bottom-0 transition-all duration-300 ${
            collapse ? 'w-0 md:w-48 overflow-hidden' : 'w-48'
          } ${darkTheme ? 'bg-[#212527f0]' : 'bg-[#f4fbffbb]'}`}
        >
          <div className="h-full p-3 relative">
            {/* sidebar Head */}
            <div
              onClick={() => navigate('/')}
              className="py-2 cursor-pointer flex items-center gap-1"
            >
              <h2 className="text-skyBlue text-xl font-bold">EduHive</h2>
              <img className="h-8" src={logo} alt="" />
            </div>

            {/* Border */}
            <div
              className={`my-2 border ${
                darkTheme ? 'border-[#ffffff27]' : 'border-[#00000027]'
              }`}
            ></div>

            {/* sidebar body */}
            {/* Sidebar Links */}
            <ul
              className={`side-ul font-medium h-[calc(100vh-11.7rem)] pt-2 overflow-y-auto ${
                darkTheme ? 'text-gray-200' : 'text-darkGray'
              }`}
            >
              {/* Overview */}
              <li
                onClick={() => setCollapse(true)}
                className={`${
                  pathname === '/dashboard'
                    ? 'bg-infoBlue text-white bg-opacity-70'
                    : 'hover:bg-skyBlue hover:text-white'
                }`}
              >
                <NavLink className="px-4 w-full inline-block" to="/dashboard">
                  Overview
                </NavLink>
              </li>
              {/* Role based menu */}
              {role === 'student' ? (
                <StudentMenu setCollapse={setCollapse} />
              ) : role === 'teacher' ? (
                <TeacherMenu setCollapse={setCollapse} />
              ) : (
                role === 'admin' && <AdminMenu setCollapse={setCollapse} />
              )}
              {/* Profile */}
              <li
                onClick={() => setCollapse(true)}
                className={`${
                  pathname === '/dashboard/profile'
                    ? 'bg-infoBlue text-white bg-opacity-70'
                    : 'hover:bg-skyBlue hover:text-white'
                }`}
              >
                <NavLink
                  className="px-4 w-full inline-block"
                  to="/dashboard/profile"
                >
                  Profile
                </NavLink>
              </li>

              {/* Border */}
              <div
                className={`my-2 border ${
                  darkTheme ? 'border-[#ffffff27]' : 'border-[#00000027]'
                }`}
              ></div>

              {/* Home */}
              <li
                onClick={() => setCollapse(true)}
                className="hover:bg-skyBlue hover:text-white"
              >
                <NavLink className="px-4 w-full inline-block" to="/">
                  Home
                </NavLink>
              </li>
              <li
                onClick={() => setCollapse(true)}
                className="hover:bg-skyBlue hover:text-white"
              >
                <NavLink className="px-4 w-full inline-block" to="/all_classes">
                  Classes
                </NavLink>
              </li>
            </ul>

            {/* sidebar Footer */}
            <div className="p-3 absolute bottom-0 inset-x-0">
              {/* Border */}
              <div
                className={`my-2 border ${
                  darkTheme ? 'border-[#ffffff27]' : 'border-[#00000027]'
                }`}
              ></div>
              {/* Footer Links */}

              <ul
                className={`side-ul font-medium ${
                  darkTheme ? 'text-gray-200' : 'text-darkGray'
                }`}
              >
                {/* Theme Button */}
                <li
                  onClick={() => {
                    setDarkTheme(!darkTheme);
                    setCollapse(true);
                  }}
                  className={
                    darkTheme
                      ? 'hover:text-gray-800 hover:bg-white/90'
                      : 'hover:text-light2 hover:bg-[#414141]'
                  }
                >
                  <button className="px-4 w-full text-left flex items-center gap-2">
                    <span className="text-xl">
                      {darkTheme ? (
                        <MdOutlineLightMode />
                      ) : (
                        <MdOutlineDarkMode />
                      )}
                    </span>
                    <span>{darkTheme ? 'Light Theme' : 'Dark Theme'}</span>
                  </button>
                </li>
                {/* Logout */}
                {user && (
                  <li
                    onClick={() => setCollapse(true)}
                    className="hover:bg-orange-500 hover:text-white"
                  >
                    <button
                      className="px-4 w-full text-left flex items-center gap-2"
                      onClick={() => signOutUser()}
                    >
                      <span className="text-xl">
                        <MdLogout />
                      </span>
                      <span>Log Out</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
