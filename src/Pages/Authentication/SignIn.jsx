import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';
import googleIcon from '../../assets/icons/google.png';
import Container from '../../components/Container/Container';

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { notify, emailPassSignIn, googleSignIn } = useAuthContext();

  const desired = location.state?.pathname || '/';

  // Email Password Log In Handler
  const handleSignin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    emailPassSignIn(email, password)
      .then(() => {
        setErrMessage(null);
        notify('success', 'Login Successful');
        navigate(desired);
      })
      .catch(err => {
        setErrMessage(err.message);
        notify('error', 'Login Failed!');
      });
  };

  // Popup Log In Handler
  const handlePopup = () => {
    googleSignIn()
      .then(() => {
        setErrMessage(null);
        notify('success', 'Login Successful');
        navigate(desired);
      })
      .catch(err => {
        setErrMessage(err.message);
        notify('error', 'Login Failed!');
      });
  };

  // handleCredentials
  const handleCredentials = (email, password) => {
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');

    emailInput.value = email;
    passInput.value = password;
  };

  useEffect(() => {
    document.title = 'Signin | EduHive';
  }, []);

  return (
    <div className="bg-blueBg pb-24">
      <Container>
        <section className="min-h-[80vh] p-6 md:p-10 flex justify-center items-center">
          <div className="text-[#403F3F bg-[#fffcfc] w-full md:w-4/5 lg:w-3/5 px-6 md:px-14 pt-12 md:pt-16 pb-16 rounded-2xl shadow-lg">
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold">
              Signin to Continue
            </h3>
            {/* border */}
            <div className="border border-[#E7E7E7] my-8"></div>

            {/* Credentials */}
            <p className="text-gray-600 text-xl font-semibold mb-1">
              Users Credentials
            </p>
            <div className="mb-8 flex items-center gap-4">
              <button
                onClick={() => {
                  handleCredentials('student@gmail.com', 'A12Student');
                }}
                className="bg-skyBlue text-white hover:bg-green text-lg font-medium px-6 py-2 rounded-full transition-all duration-300"
              >
                Student
              </button>
              <button
                onClick={() => {
                  handleCredentials(
                    'shahidhasanruman3@gmail.com',
                    'A12Teacher'
                  );
                }}
                className="bg-skyBlue text-white hover:bg-green text-lg font-medium px-6 py-2 rounded-full transition-all duration-300"
              >
                Teacher
              </button>
              <button
                onClick={() => {
                  handleCredentials('admin@gmail.com', 'A12Admin');
                }}
                className="bg-skyBlue text-white hover:bg-green text-lg font-medium px-6 py-2 rounded-full transition-all duration-300"
              >
                Admin
              </button>
            </div>

            {/* Email Password Sign In */}
            <form
              id="signin-form"
              onSubmit={handleSignin}
              className="md:px-6 flex flex-col gap-6"
            >
              {/* Email */}
              <div>
                <p className="text-xl font-semibold mb-4">Email</p>
                <input
                  className="bg-[#F3F3F3] w-full p-5 outline-none rounded-md"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <p className="text-xl font-semibold mb-4">Password</p>
                <input
                  className="bg-[#F3F3F3] w-full p-5 outline-none rounded-md mb-3"
                  id="password"
                  name="password"
                  type={showPass ? `text` : `password`}
                  placeholder="Enter password"
                  required
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-16 right-4 rounded-full"
                  type="button"
                >
                  {showPass ? (
                    <IoEyeOutline className="text-2xl" />
                  ) : (
                    <FaRegEyeSlash className="text-2xl" />
                  )}
                </button>
              </div>

              {/* Error message */}
              <p className="text-red-500">{errMessage || ''}</p>

              {/* Submit */}
              <button
                className="bg-skyBlue hover:bg-green text-white text-xl font-semibold px-5 py-4 rounded-full"
                type="submit"
              >
                Signin
              </button>
            </form>

            <p className="text-[#706F6F] text-center font-semibold mt-7">
              Don’t Have An Account ?{' '}
              <Link className="text-green whitespace-nowrap" to="/signup">
                Register
              </Link>
            </p>

            {/* or border */}
            <div className="my-6 grid grid-cols-[1fr,_40px,_1fr] items-center">
              <div className="border border-[#8d8b8b]"></div>
              <p className="text-[#403F3F] text-2xl font-medium text-center">
                or
              </p>
              <div className="border border-[#8d8b8b]"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={() => handlePopup('google')}
              className="w-full sm:text-xl font-semibold p-4 border-2 border-dark-green hover:border-gold rounded-full flex justify-center items-center gap-2 sm:gap-4"
            >
              <img className="w-6 sm:w-8" src={googleIcon} alt="G" />
              <span>Continue With Google</span>
            </button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default SignIn;
