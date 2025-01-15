import React from 'react';
import { NavLink } from 'react-router-dom';

const StudentMenu = () => {
  return (
    <li>
      <NavLink to="/dashboard/my_enroll_class">My Enroll Class</NavLink>
    </li>
  );
};

export default StudentMenu;
