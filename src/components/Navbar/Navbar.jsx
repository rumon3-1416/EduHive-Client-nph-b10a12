import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

import { useAuthContext } from '../../Hooks/useAuthContext';
import Container from '../Container/Container';

import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.png';
import Button from '../Button';

const navLinks = [
  { id: '01', title: 'Home', link: '/' },
  { id: '02', title: 'All Classes', link: '/all_classes' },
  { id: '03', title: 'Teach on EduHive', link: '/apply_teacher' },
];

const dashboardLinks = [
  { id: '01', title: 'Profile', link: '/dashboard/profile' },
  { id: '02', title: 'Dashboard', link: '/dashboard' },
];

const Navbar = () => {
  const profileRef = useRef(null);
  const profileMenuRef = useRef(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { darkTheme, setDarkTheme, user, signOutUser } = useAuthContext();
  const navigate = useNavigate();

  // Outside click
  useEffect(() => {
    const handleOutsideClick = e => {
      if (
        !profileRef.current?.contains(e.target) &&
        !profileMenuRef.current?.contains(e.target)
      ) {
        setShowProfile(false);
      }

      if (
        !menuRef.current?.contains(e.target) &&
        !navRef.current?.contains(e.target)
      ) {
        setShowNav(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Theme
  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? '#303030' : '#f7f7f7';
    window.document.documentElement.classList.add(
      darkTheme ? 'bg-dark3' : 'bg-[#f7f7f7]'
    );
    window.document.documentElement.classList.remove(
      darkTheme ? 'bg-[#f7f7f7]' : 'bg-dark3'
    );
  }, [darkTheme]);

  return (
    <div className="w-full fixed top-0 inset-x-0 z-10">
      <div
        className={`w-full backdrop-blur-md shadow-lg ${
          darkTheme ? 'bg-[#212527f0]' : 'bg-[#f4fbffb6]'
        }`}
      >
        <Container>
          <nav
            className={`h-16 flex justify-between items-center gap-2 relative`}
          >
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-1"
            >
              <h2 className="text-skyBlue text-xl font-bold">EduHive</h2>
              <img className="h-8" src={logo} alt="" />
            </div>

            {/* Nav Links */}
            <ul
              ref={navRef}
              className={`text-sm sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none font-medium sm:h-fit sm:py-0 rounded-b-md shadow-lg sm:shadow-none overflow-hidden flex flex-col sm:flex-row items-center gap-4 sm:gap-2 lg:gap-4 xl:gap-8 absolute sm:static inset-x-0 top-16 sm:top-0 z-20 transition-all duration-300 ${
                darkTheme
                  ? 'text-light2 bg-[#212527f0]'
                  : 'text-[#24312e] bg-[#f4fbfff0]'
              } ${showNav ? 'h-36 py-6' : 'h-0'}
`}
            >
              {navLinks.map(nav => (
                <li
                  key={nav.id}
                  onClick={() => setShowNav(false)}
                  className="hover:text-skyBlue text-nowrap transition-colors duration-300"
                >
                  <NavLink to={nav.link}>{nav.title}</NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 lg:gap-3 relative">
              {/* Theme Button */}
              <button
                onClick={() => {
                  localStorage.setItem('darkTheme', darkTheme ? '' : true);
                  setDarkTheme(!darkTheme);
                }}
                className={`text-xl p-1 rounded-full transition-colors duration-200 ${
                  darkTheme
                    ? 'text-white bg-white/10 hover:bg-white/20'
                    : 'text-dark bg-black/10 hover:bg-black/20'
                }`}
              >
                {darkTheme ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
              </button>

              {user ? (
                <>
                  <button
                    ref={profileRef}
                    onClick={() => setShowProfile(!showProfile)}
                    className="bg-transparent w-9 h-9 p-0.5 border-[1.5px] border-lightBlue hover:border-skyBlue rounded-full transition-colors duration-300"
                  >
                    <img
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                      src={user?.photoURL || userIcon}
                      alt=""
                    />
                  </button>

                  {/* Profile Info */}
                  <div
                    ref={profileMenuRef}
                    className={`p-2 top-8 right-2 absolute z-20 ${
                      showProfile ? 'block' : 'hidden'
                    }`}
                  >
                    <div
                      className={`px-3 py-4 rounded-md shadow-md shadow-[#7b7b7b] backdrop-blur-md flex flex-col gap-1 ${
                        darkTheme ? 'bg-[#212527]' : 'bg-[#e6ecf0]'
                      }`}
                    >
                      {dashboardLinks.map(link => (
                        <button
                          key={link.id}
                          onClick={() => {
                            navigate(link.link);
                            setShowProfile(false);
                          }}
                          className={`hover:bg-skyBlue/90 text-sm text-left w-full text-nowrap px-4 py-1 rounded-md transition-colors duration-300 ${
                            darkTheme
                              ? 'text-light2'
                              : 'text-black hover:text-light2'
                          }`}
                        >
                          {link.title}
                        </button>
                      ))}
                      {/* Log Out */}
                      <button
                        onClick={() => {
                          signOutUser();
                          setShowProfile(false);
                        }}
                        className={`hover:bg-orange-500 text-sm text-left w-full text-nowrap px-4 py-1 rounded-md transition-colors duration-300 ${
                          darkTheme
                            ? 'text-light2'
                            : 'text-black hover:text-light2'
                        }`}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Button onClick={() => navigate('/signin')}>Log In</Button>
              )}

              {/* Menubar */}
              <button
                ref={menuRef}
                onClick={() => setShowNav(!showNav)}
                className={`text-2xl p-1 border-lightBlue hover:border-skyBlue border-[1.5px] rounded-full sm:hidden transition-colors duration-300 ${
                  darkTheme
                    ? 'text-light2 border-light2'
                    : 'text-gray-900 border-gray-800'
                }`}
              >
                <IoIosMenu />
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
