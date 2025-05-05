import React from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/icons/google.png';
import { useAuthContext } from '../../Hooks/useAuthContext';

const GoogleSignIn = ({ setErrMessage, desired = '/' }) => {
  const { notify, googleSignIn } = useAuthContext();
  const navigate = useNavigate();

  // Popup Log In Handler
  const handleGoogleSignIn = () => {
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

  return (
    <button
      onClick={() => handleGoogleSignIn()}
      className="hover:bg-skyBlue/20 w-full font-semibold px-4 py-2 border-[1.5px] border-skyBlue rounded-md flex justify-center items-center gap-2 sm:gap-4 transition-colors duration-300"
    >
      <img className="w-6" src={googleIcon} alt="G" />
      <span>Continue With Google</span>
    </button>
  );
};

export default GoogleSignIn;
