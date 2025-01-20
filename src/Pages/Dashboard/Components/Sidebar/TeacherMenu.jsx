import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const TeacherMenu = () => {
  const { pathname } = useLocation();

  return (
    <>
      <li
        className={`${
          pathname === '/dashboard'
            ? 'bg-infoBlue text-white opacity-70'
            : 'hover:bg-skyBlue hover:text-white'
        }`}
      >
        <NavLink className="w-full inline-block" to="/dashboard">
          Add Class
        </NavLink>
      </li>
      <li
        className={`${
          pathname === '/dashboard/my_classes'
            ? 'bg-infoBlue text-white opacity-70'
            : 'hover:bg-skyBlue hover:text-white'
        }`}
      >
        <NavLink className="w-full inline-block" to="/dashboard/my_classes">
          My Classes
        </NavLink>
      </li>
    </>
  );
};

export default TeacherMenu;
