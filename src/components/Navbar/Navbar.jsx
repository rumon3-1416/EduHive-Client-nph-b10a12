import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

import { useAuthContext } from '../../Hooks/useAuthContext';
import Container from '../Container/Container';

import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.png';

const navLinks = [
  { id: '01', title: 'Home', link: '/' },
  { id: '02', title: 'All Classes', link: '/all_classes' },
  { id: '03', title: 'Teach on EduHive', link: '/apply_teacher' },
];

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { darkTheme, setDarkTheme, user, signOutUser } = useAuthContext();
  const navigate = useNavigate();

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
              className={`sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none sm:text-sm lg:text-base font-medium sm:h-fit sm:py-0 rounded-b-xl shadow-lg sm:shadow-none overflow-hidden flex flex-col sm:flex-row items-center gap-4 sm:gap-2 lg:gap-4 xl:gap-8 absolute sm:static inset-x-0 top-16 sm:top-0 z-20 transition-all duration-300 ${
                darkTheme
                  ? 'text-light2 bg-[#212527f0]'
                  : 'text-[#24312e] bg-[#f4fbfff0]'
              } ${showNav ? 'h-44 py-8' : 'h-0'}
`}
            >
              {navLinks.map(nav => (
                <li
                  key={nav.id}
                  onClick={() => setShowNav(false)}
                  className="hover:text-skyBlue text-nowrap"
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
                className={`text-3xl ${darkTheme ? 'text-white' : 'text-dark'}`}
              >
                {darkTheme ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
              </button>
              {user ? (
                <>
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="bg-transparent w-12 h-12 p-0.5 border-2 border-lightBlue rounded-full"
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
                    className={`p-2 top-10 right-2 absolute z-20 ${
                      showProfile ? 'block' : 'hidden'
                    }`}
                  >
                    <div
                      className={`bg-white text-center p-4 pb-5 rounded-lg shadow-md shadow-[#7b7b7b] `}
                    >
                      <h2 className="font-semibold text-nowrap">
                        {user?.displayName || 'Name'}
                      </h2>
                      <button
                        onClick={() => {
                          navigate('/dashboard/profile');
                          setShowProfile(false);
                        }}
                        className="text-skyBlue hover:bg-[#b8d2e19a] w-full font-medium text-nowrap px-3 py-1 mt-3 rounded-md"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setShowProfile(false);
                        }}
                        className="text-skyBlue hover:bg-[#b8d2e19a] w-full font-medium text-nowrap px-3 py-1 rounded-md"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          signOutUser();
                          setShowProfile(false);
                        }}
                        className="text-skyBlue hover:text-orange-500 hover:bg-[#b8d2e19a] w-full font-medium text-nowrap px-3 py-1 rounded-md"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate('/signin')}
                  className="text-white bg-skyBlue hover:bg-green font-medium px-5 xl:px-9 py-2 rounded-full transition-all duration-300"
                >
                  Sign In
                </button>
              )}

              {/* Menubar */}
              <button
                onClick={() => setShowNav(!showNav)}
                className="p-2.5 border-2 border-lightBlue rounded-full sm:hidden"
              >
                <CgMenu className="text-skyBlue text-2xl" />
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
