import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../Container/Container';

import logo from '../../assets/icons/logo.png';
import fbIcon from '../../assets/icons/facebook.png';
import twitterIcon from '../../assets/icons/twitter.png';
import instIcon from '../../assets/icons/instagram.png';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Footer = () => {
  const { darkTheme } = useAuthContext();
  const navigate = useNavigate();

  return (
    <footer
      className={`bg-gradient-to-tr ${
        darkTheme
          ? 'from-[#303030] to-[#5f5f5f]'
          : 'from-[#3498db33] to-[#2ecc7027]'
      }`}
    >
      <Container>
        <div className="pt-16 pb-10 grid grid-cols-1 md:grid-cols-[2fr,_3fr] gap-8">
          {/* Intro */}
          <div>
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-1"
            >
              <h2 className="text-darkBlue text-xl font-bold">EduHive</h2>
              <img className="h-8" src={logo} alt="" />
            </div>

            <p
              className={`max-w-80 text-sm font-medium text-justify
                ${darkTheme ? 'text-[#b0b0b0]' : 'text-[#09080F99]'}`}
            >
              EduHive is a digital platform for enroll, adding classes and
              seeing details of classes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[2fr,_2fr,_3fr] gap-4">
            {/* Menu */}
            <div>
              <p
                className={`text-lg font-semibold mb-4 ${
                  darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
                }`}
              >
                Menu
              </p>
              <ul
                className={`cursor-pointer ${
                  darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
                }`}
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/all_classes">Classes</Link>
                </li>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <p
                className={`text-lg font-semibold mb-4 ${
                  darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
                }`}
              >
                About Us
              </p>
              <ul
                className={`cursor-pointer ${
                  darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
                }`}
              >
                <li>About Us</li>
                <li>FAQ</li>
                <li>Help</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p
                className={`text-lg font-semibold mb-4 ${
                  darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
                }`}
              >
                Contact Us
              </p>
              <p
                className={`mb-2 ${
                  darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
                }`}
              >
                House 12, Road 5, Dhanmondi, Dhaka
              </p>
              <p
                className={`mb-1 ${
                  darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
                }`}
              >
                edu@hive.com
              </p>

              {/* Social links */}
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => window.open('https://facebook.com')}
                  className="rounded-md"
                >
                  <img className="w-6" src={fbIcon} alt="fb" />
                </button>
                <button
                  onClick={() => window.open('https://x.com')}
                  className="rounded-md"
                >
                  <img className="w-6" src={twitterIcon} alt="x" />
                </button>
                <button
                  onClick={() => window.open('https://instagram.com')}
                  className="rounded-md"
                >
                  <img className="w-6" src={instIcon} alt="instagram" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Border */}
      <div
        className={`border ${darkTheme ? 'border-[#252525]' : 'border-white'}`}
      ></div>

      {/* Copyright */}
      <Container>
        <div
          className={`w-[95%] max-w-[1280px] mx-auto py-6 flex justify-between ${
            darkTheme ? 'text-[#bfbfbf]' : 'text-[#0e151399]'
          }`}
        >
          <p>
            Copyright &copy; {new Date().getFullYear()}. All Right Reserved.
          </p>

          <ul className="flex gap-6">
            <li>TErms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
