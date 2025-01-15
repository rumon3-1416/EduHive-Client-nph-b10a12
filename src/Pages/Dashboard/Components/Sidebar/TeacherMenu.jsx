import React from 'react';
import { NavLink } from 'react-router-dom';

const TeacherMenu = () => {
  return (
    <>
      <li>
        <NavLink to="/dashboard/add_class">Add Class</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my_classes">My Classes</NavLink>
      </li>
    </>
  );
};

export default TeacherMenu;
