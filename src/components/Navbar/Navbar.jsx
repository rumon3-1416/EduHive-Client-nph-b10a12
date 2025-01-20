import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';

import { useAuthContext } from '../../Hooks/useAuthContext';
import Container from '../Container/Container';

import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.png';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, signOutUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 inset-x-0 z-10">
      <div className={`w-full backdrop-blur-md bg-[#f4fbff8e]`}>
        <Container>
          <nav
            className={`py-4 flex justify-between items-center gap-2 relative`}
          >
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-1"
            >
              <h2 className="text-darkBlue text-xl font-bold">EduHive</h2>
              <img className="h-8" src={logo} alt="" />
            </div>

            {/* Nav Links */}
            <ul
              className={`text-white sm:text-[#32443f] bg-[#3498dbf8] sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none sm:text-sm lg:text-base font-medium py-8 sm:py-0 rounded-xl overflow-hidden sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-2 lg:gap-4 xl:gap-8 absolute sm:static inset-x-0 top-20 sm:top-0 z-20 ${
                showNav ? 'flex' : 'hidden'
              }
`}
            >
              <li
                onClick={() => setShowNav(false)}
                className="hover:text-green"
              >
                <NavLink to="/">Home</NavLink>
              </li>
              <li
                onClick={() => setShowNav(false)}
                className="hover:text-green"
              >
                <NavLink to="/all_classes">All Classes</NavLink>
              </li>
              <li
                onClick={() => setShowNav(false)}
                className="hover:text-green text-nowrap"
              >
                <NavLink to="/apply_teacher">Teach on EduHive</NavLink>
              </li>
            </ul>

            <div className="flex items-center gap-2 lg:gap-3 relative">
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
                          navigate('/dashboard');
                          setShowProfile(false);
                        }}
                        className="text-skyBlue hover:text-green font-medium text-nowrap px-3 py-1 mt-3 border-2 border-skyBlue hover:border-green rounded-full"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          signOutUser();
                          setShowProfile(false);
                        }}
                        className="text-skyBlue hover:text-warnYellow font-medium text-nowrap px-3 py-1 mt-3 border-2 border-skyBlue hover:border-warnYellow rounded-full"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate('/signin')}
                  className="text-skyBlue hover:text-green font-medium px-5 xl:px-9 py-2  border-2 border-skyBlue hover:border-green rounded-full"
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
