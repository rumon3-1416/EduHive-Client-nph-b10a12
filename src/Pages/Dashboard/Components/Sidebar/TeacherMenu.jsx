import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const TeacherMenu = ({ setCollapse }) => {
  const { pathname } = useLocation();

  return (
    <>
      <li
        onClick={() => setCollapse(true)}
        className={`${
          pathname === '/dashboard'
            ? 'bg-infoBlue text-white opacity-70'
            : 'hover:bg-skyBlue hover:text-white'
        }`}
      >
        <NavLink className="px-4 w-full inline-block" to="/dashboard">
          Add Class
        </NavLink>
      </li>
      <li
        onClick={() => setCollapse(true)}
        className={`${
          pathname === '/dashboard/my_classes'
            ? 'bg-infoBlue text-white opacity-70'
            : 'hover:bg-skyBlue hover:text-white'
        }`}
      >
        <NavLink
          className="px-4 w-full inline-block"
          to="/dashboard/my_classes"
        >
          My Classes
        </NavLink>
      </li>
    </>
  );
};

export default TeacherMenu;
