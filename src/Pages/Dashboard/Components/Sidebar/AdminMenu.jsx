import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
      <li>
        <NavLink to="/dashboard/teacher_requests">Teacher Requests</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all_classes">All Classes</NavLink>
      </li>
    </>
  );
};

export default AdminMenu;
