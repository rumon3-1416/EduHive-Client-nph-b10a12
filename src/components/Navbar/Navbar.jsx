import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { useAuthContext } from '../../Hooks/useAuthContext';
import Container from '../Container/Container';

import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.png';
import menuIcon from '../../assets/icons/menu.png';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { darkTheme, user, signOutUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 inset-x-0 z-10">
      <div
        className={`w-full backdrop-blur-md ${
          darkTheme ? 'bg-dark5Trans' : 'bg-[#f0fffeb7]'
        }`}
      >
        <Container>
          <nav
            className={`py-6 flex justify-between items-center gap-2 relative`}
          >
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-1"
            >
              <h2 className="text-green text-xl font-bold">EduHive</h2>
              <img className="h-8" src={logo} alt="" />
            </div>

            {/* Nav Links */}
            <ul
              className={`text-white bg-tealTrans md:bg-transparent backdrop-blur-md md:backdrop-blur-none md:text-sm lg:text-base font-medium py-8 md:py-0 rounded-xl overflow-hidden md:flex flex-col md:flex-row items-center gap-4 md:gap-2 lg:gap-4 xl:gap-8 absolute md:static inset-x-0 top-24 md:top-0 z-20 ${
                showNav ? 'flex' : 'hidden'
              }
            ${darkTheme ? 'md:text-lightTrans' : 'md:text-[#32443f]'}`}
            >
              <li
                onClick={() => setShowNav(false)}
                className="hover:text-coral2"
              >
                <NavLink to="/">Home</NavLink>
              </li>
              <li
                onClick={() => setShowNav(false)}
                className="hover:text-coral2"
              >
                <NavLink to="/all_classes">All Classes</NavLink>
              </li>
              <li
                onClick={() => setShowNav(false)}
                className="hover:text-coral2 text-nowrap"
              >
                <NavLink to="/apply_teacher">Teach on EduHive</NavLink>
              </li>
            </ul>

            <div className="flex items-center gap-2 lg:gap-3 relative">
              {!user ? (
                <>
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="bg-transparent w-12 h-12 p-0.5 border-2 border-teal rounded-full"
                  >
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={user?.photoURL || userIcon}
                      alt=""
                    />
                  </button>

                  {/* Profile Info */}
                  <div
                    className={`p-2 top-10 right-2 absolute ${
                      showProfile ? 'block' : 'hidden'
                    }`}
                  >
                    <div
                      className={`bg-white text-center p-4 pb-5 rounded-lg shadow-md shadow-[#7b7b7b] `}
                    >
                      <h2 className="font-semibold text-nowrap">
                        {user?.displayName || 'Display Name'}
                      </h2>
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setShowProfile(false);
                        }}
                        className="text-teal hover:text-coral2 font-medium text-nowrap px-3 py-1 mt-3 border-2 border-teal hover:border-coral2 rounded-full"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          signOutUser();
                          setShowProfile(false);
                        }}
                        className="text-teal hover:text-coral2 font-medium text-nowrap px-3 py-1 mt-3 border-2 border-teal hover:border-coral2 rounded-full"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate('/signin')}
                  className="bg-teal text-lg font-medium ps-1.5 xl:ps-5 pe-5 xl:pe-9 py-2  border-2 border-teal hover:border-coral3 rounded-e-full"
                >
                  Sign In
                </button>
              )}

              {/* Menubar */}
              <button
                onClick={() => setShowNav(!showNav)}
                className="p-2.5 border-2 border-teal rounded-full md:hidden"
              >
                <img className="w-6" src={menuIcon} alt="menu" />
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
