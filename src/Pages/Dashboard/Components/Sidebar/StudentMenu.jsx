import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const StudentMenu = () => {
  const { pathname } = useLocation();

  return (
    <li className={`${pathname === '/dashboard' ? 'text-blue-500' : ''}`}>
      <NavLink to="/dashboard">My Enroll Class</NavLink>
    </li>
  );
};

export default StudentMenu;
