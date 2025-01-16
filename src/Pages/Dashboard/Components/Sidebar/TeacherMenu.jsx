import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const TeacherMenu = () => {
  const { pathname } = useLocation();

  return (
    <>
      <li className={`${pathname === '/dashboard' ? 'text-blue-500' : ''}`}>
        <NavLink to="/dashboard">Add Class</NavLink>
      </li>
      <li
        className={`${
          pathname === '/dashboard/my_classes' ? 'text-blue-500' : ''
        }`}
      >
        <NavLink to="/dashboard/my_classes">My Classes</NavLink>
      </li>
    </>
  );
};

export default TeacherMenu;
