import React, { useEffect, useState } from 'react';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const DashNavbar = ({ setCollapse }) => {
  const [title, setTitle] = useState('');

  const { role } = useAuthContext();
  const { pathname } = useLocation();

  useEffect(() => {
    pathname === '/dashboard'
      ? setTitle('Overview')
      : pathname === '/dashboard/my_enrolls'
      ? setTitle('My Enrolls')
      : pathname === '/dashboard/my_request'
      ? setTitle('My Request')
      : pathname === '/dashboard/add_class'
      ? setTitle('Add Class')
      : pathname === '/dashboard/my_classes'
      ? setTitle('My Classes')
      : pathname === '/dashboard/teacher_requests'
      ? setTitle('Teacher Requests')
      : pathname === '/dashboard/users'
      ? setTitle('All Users')
      : pathname === '/dashboard/all_classes'
      ? setTitle('All Classes')
      : pathname.includes('/dashboard/enroll_class_details')
      ? setTitle('Class Details')
      : pathname.includes('/dashboard/teach_class_details')
      ? setTitle('Class Details')
      : pathname === '/dashboard/profile'
      ? setTitle('My Profile')
      : setTitle('');
  }, [pathname, role]);

  return (
    <>
      {/* Navbar */}
      <div
        className={
          'bg-[#f4fbffbb] backdrop-blur-md w-full h-16 px-[2.5%] shadow-lg fixed top-0 left-0 right-0 flex md:hidden justify-between items-center'
        }
      >
        <button
          onClick={() => setCollapse(false)}
          className="text-skyBlue text-4xl"
        >
          <TbLayoutSidebarLeftExpandFilled />
        </button>

        <h3 className="poppins-font text-gray-600 text-2xl font-bold">
          {title}
        </h3>

        <p></p>
      </div>
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default DashNavbar;
