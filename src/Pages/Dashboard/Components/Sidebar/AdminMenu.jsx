import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AdminMenu = ({ setCollapse }) => {
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
          Teacher Requests
        </NavLink>
      </li>
      <li
        onClick={() => setCollapse(true)}
        className={`${
          pathname === '/dashboard/users'
            ? 'bg-infoBlue text-white opacity-70'
            : 'hover:bg-skyBlue hover:text-white'
        }`}
      >
        <NavLink className="px-4 w-full inline-block" to="/dashboard/users">
          Users
        </NavLink>
      </li>
      <li
        onClick={() => setCollapse(true)}
        className={`${
          pathname === '/dashboard/all_classes'
            ? 'bg-infoBlue text-white opacity-70'
            : 'hover:bg-skyBlue hover:text-white'
        }`}
      >
        <NavLink
          className="px-4 w-full inline-block"
          to="/dashboard/all_classes"
        >
          All Classes
        </NavLink>
      </li>
    </>
  );
};

export default AdminMenu;
