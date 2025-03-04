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
    <div className="bg-blueBg">
      <Container>
        <section className="min-h-[calc(100vh-1.5rem)] py-6 flex justify-center items-center">
          <div className="text-[#403F3F bg-[#fffcfc] w-full sm:w-4/5 max-w-md px-6 md:px-8 py-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl text-center font-semibold">
              Signin to Continue
            </h3>
            {/* border */}
            <div className="border border-[#E7E7E7] my-3"></div>

            {/* Credentials */}
            <p className="text-gray-600 text-center font-semibold mb-1">
              Users Credentials
            </p>
            <div className="mb-6 flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={() => {
                  handleCredentials('student@gmail.com', 'A12Student');
                }}
                className="bg-skyBlue text-white hover:bg-green text-lg font-medium px-4 py-1 rounded-full transition-all duration-300"
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
                className="bg-skyBlue text-white hover:bg-green text-lg font-medium px-4 py-1 rounded-full transition-all duration-300"
              >
                Teacher
              </button>
              <button
                onClick={() => {
                  handleCredentials('admin@gmail.com', 'A12Admin');
                }}
                className="bg-skyBlue text-white hover:bg-green text-lg font-medium px-4 py-1 rounded-full transition-all duration-300"
              >
                Admin
              </button>
            </div>

            {/* Email Password Sign In */}
            <form
              id="signin-form"
              onSubmit={handleSignin}
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <input
                className="bg-[#F3F3F3] w-full px-3 py-2 outline-none focus:border border-skyBlue rounded-md"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  className="bg-[#F3F3F3] w-full px-3 py-2 outline-none focus:border border-skyBlue rounded-md mb-3"
                  id="password"
                  name="password"
                  type={showPass ? `text` : `password`}
                  placeholder="Enter password"
                  required
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-2 right-4 rounded-full"
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
              {errMessage && <p className="text-red-500">{errMessage}</p>}

              {/* Submit */}
              <button
                className="bg-skyBlue hover:bg-green text-white text-xl font-semibold px-5 py-2 rounded-full transition-all duration-300"
                type="submit"
              >
                Signin
              </button>
            </form>

            <p className="text-[#706F6F] text-center font-semibold mt-5">
              Don’t Have An Account ?{' '}
              <Link className="text-green whitespace-nowrap" to="/signup">
                Register
              </Link>
            </p>

            {/* or border */}
            <div className="my-3 grid grid-cols-[1fr,_40px,_1fr] items-center">
              <div className="border border-[#8d8b8b]"></div>
              <p className="text-[#403F3F] text-xl font-medium text-center">
                or
              </p>
              <div className="border border-[#8d8b8b]"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={() => handlePopup('google')}
              className="w-full font-semibold px-4 py-2 border-[1.5px] border-skyBlue hover:border-green rounded-full flex justify-center items-center gap-2 sm:gap-4"
            >
              <img className="w-6" src={googleIcon} alt="G" />
              <span>Continue With Google</span>
            </button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default SignIn;
