import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AdminMenu = () => {
  const { pathname } = useLocation();

  return (
    <>
      <li className={`${pathname === '/dashboard' ? 'text-blue-500' : ''}`}>
        <NavLink to="/dashboard">Teacher Requests</NavLink>
      </li>
      <li
        className={`${pathname === '/dashboard/users' ? 'text-blue-500' : ''}`}
      >
        <NavLink to="/dashboard/users">Users</NavLink>
      </li>
      <li
        className={`${
          pathname === '/dashboard/all_classes' ? 'text-blue-500' : ''
        }`}
      >
        <NavLink to="/dashboard/all_classes">All Classes</NavLink>
      </li>
    </>
  );
};

export default AdminMenu;
