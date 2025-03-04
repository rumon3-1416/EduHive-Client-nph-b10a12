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
    <div className="bg-blueBg">
      <Container>
        <section className="min-h-[calc(100vh-1.5rem)] py-6 flex justify-center items-center">
          <div className="text-[#403F3F bg-[#fffcfc] w-full sm:w-4/5 max-w-md px-6 md:px-8 py-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl text-center font-semibold">
              Register Your Account
            </h3>
            {/* border */}
            <div className="border border-[#E7E7E7] my-3"></div>

            <form
              onSubmit={handleSubmit(handleSignup)}
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <input
                {...register('displayName')}
                className="bg-[#F3F3F3] w-full px-3 py-2 outline-none focus:border border-skyBlue rounded-md"
                id="displayName"
                name="displayName"
                type="text"
                placeholder="Your name"
                required
              />
              {/* Email */}
              <input
                {...register('email')}
                className="bg-[#F3F3F3] w-full px-3 py-2 outline-none focus:border border-skyBlue rounded-md"
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                required
              />
              {/* Photo */}
              <input
                {...register('photoURL')}
                className="bg-[#F3F3F3] w-full px-3 py-2 outline-none focus:border border-skyBlue rounded-md"
                id="photoURL"
                name="photoURL"
                type="text"
                placeholder="Your photo url"
                required
              />
              {/* Password */}
              <div className="relative">
                <input
                  {...register('password')}
                  className="bg-[#F3F3F3] w-full px-3 py-2 outline-none focus:border border-skyBlue rounded-md"
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
                    <IoEyeOutline className="text-xl" />
                  ) : (
                    <FaRegEyeSlash className="text-xl" />
                  )}
                </button>
                {passErr && <p className="text-red-500 mt-3">{passErr}</p>}
              </div>
              {/* Terms */}
              <div className="text-sm flex items-center gap-2.5">
                <input
                  {...register('terms')}
                  className="w-4 h-4 outline-none accent-skyBlue"
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
                className="bg-skyBlue hover:bg-green text-white text-xl font-semibold px-5 py-2 rounded-full transition-all duration-300"
                type="submit"
              >
                Register
              </button>
            </form>

            <p className="text-[#706F6F] text-center font-semibold mt-5">
              Already Have An Account ?{' '}
              <Link className="text-green whitespace-nowrap" to="/signin">
                Log In
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

export default SignUp;
