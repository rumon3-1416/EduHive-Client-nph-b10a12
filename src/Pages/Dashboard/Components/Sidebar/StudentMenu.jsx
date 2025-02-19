import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const StudentMenu = ({ setCollapse }) => {
  const { pathname } = useLocation();

  return (
    <li
      onClick={() => setCollapse(true)}
      className={`${
        pathname === '/dashboard/my_enrolls'
          ? 'bg-infoBlue text-white bg-opacity-70'
          : 'hover:bg-skyBlue hover:text-white'
      }`}
    >
      <NavLink className="px-4 w-full inline-block" to="/dashboard/my_enrolls">
        My Enroll Class
      </NavLink>
    </li>
  );
};

export default StudentMenu;
