import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';
import googleIcon from '../../assets/icons/google.png';
import Container from '../../components/Container/Container';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [passErr, setPassErr] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    notify,
    setLoading,
    emailPassSignUp,
    googleSignIn,
    updateUserProfile,
  } = useAuthContext();

  // Form Submit handler
  const handleSignup = async data => {
    const { displayName, email, password, photoURL, terms } = data;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])/;

    if (password.length < 6 || !regex.test(password) || !terms) {
      // Password check
      if (password.length < 6) {
        setPassErr('Password must have at least 6 characters!');
      } else if (!regex.test(password)) {
        setPassErr(
          'Password must have at least one Uppercase & Lowercase letter!'
        );
      } else {
        setPassErr(null);
      }
      // Terms check
      if (!terms) {
        setErrMessage('Please accept term & conditions!');
      } else {
        setErrMessage(null);
      }
    } else {
      try {
        setErrMessage(null);
        // Create & Update user
        const res = await emailPassSignUp(email, password);
        await updateUserProfile(res.user, { displayName, photoURL });

        await axiosPublic.post('/users', {
          email: res.user.email,
          displayName,
          photoURL,
        });

        setLoading(false);
        setErrMessage(null);
        notify('success', 'Registration Successful');
        navigate('/');
      } catch (err) {
        setErrMessage(err.message);
        notify('error', 'Registration Failed!');
      }
    }
  };

  // Popup Log In Handler
  const handlePopup = () => {
    googleSignIn()
      .then(() => {
        setErrMessage(null);
        notify('success', 'Registration Successful');
        navigate('/');
      })
      .catch(err => {
        setErrMessage(err.message);
        notify('error', 'Registration Failed!');
      });
  };

  useEffect(() => {
    document.title = 'Register | EduHive';
  }, []);

  return (
    <div className="bg-blueBg pb-24">
      <Container>
        <section className="min-h-[80vh] p-6 md:p-10 flex justify-center items-center">
          <div className="text-[#403F3F bg-[#fffcfc] w-full md:w-4/5 lg:w-3/5 px-6 md:px-14 pt-12 md:pt-16 pb-16 rounded-2xl shadow-lg">
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold">
              Register Your Account
            </h3>
            {/* border */}
            <div className="border border-[#E7E7E7] my-8"></div>

            <form
              onSubmit={handleSubmit(handleSignup)}
              className="md:px-6 flex flex-col gap-6"
            >
              {/* Name */}
              <div>
                <p className="text-xl font-semibold mb-4">Name</p>
                <input
                  {...register('displayName')}
                  className="bg-[#F3F3F3] w-full p-5 outline-none rounded-md"
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <p className="text-xl font-semibold mb-4">Email</p>
                <input
                  {...register('email')}
                  className="bg-[#F3F3F3] w-full p-5 outline-none rounded-md"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {/* Photo */}
              <div>
                <p className="text-xl font-semibold mb-4">Photo URL</p>
                <input
                  {...register('photoURL')}
                  className="bg-[#F3F3F3] w-full p-5 outline-none rounded-md"
                  id="photoURL"
                  name="photoURL"
                  type="text"
                  placeholder="Enter your photo url"
                  required
                />
              </div>
              {/* Password */}
              <div className="relative">
                <p className="text-xl font-semibold mb-4">Password</p>
                <input
                  {...register('password')}
                  className="bg-[#F3F3F3] w-full p-5 outline-none rounded-md"
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
                {passErr && <p className="text-red-500 mt-3">{passErr}</p>}
              </div>
              {/* Terms */}
              <div className="flex items-center gap-2.5">
                <input
                  {...register('terms')}
                  className="w-6 h-6 outline-none accent-skyBlue"
                  type="checkbox"
                  name="terms"
                  id="terms"
                />
                <p>
                  Accept our{' '}
                  <span className="font-semibold">Terms & Conditions.</span>
                </p>
              </div>
              {/* Error message */}
              {errMessage && <p className="text-red-500">{errMessage}</p>}
              {/* Submit */}
              <button
                className="bg-skyBlue hover:bg-green text-white text-xl font-semibold px-5 py-4 mt-6 rounded-full"
                type="submit"
              >
                Register
              </button>
            </form>

            <p className="text-[#706F6F] text-center font-semibold mt-7">
              Already Have An Account ?{' '}
              <Link className="text-green whitespace-nowrap" to="/signin">
                Log In
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

export default SignUp;
