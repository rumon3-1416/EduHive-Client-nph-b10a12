import React, { useEffect } from 'react';
import successIcon from '../../assets/icons/success.png';
import warnIcon from '../../assets/icons/warning.png';
import errorIcon from '../../assets/icons/error.png';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Modal = ({ property, children }) => {
  const { show } = property;

  const modalIcon =
    property.res === 'success'
      ? successIcon
      : property.res === 'warn'
      ? warnIcon
      : property.res === 'error' && errorIcon;

  const { darkTheme } = useAuthContext();

  useEffect(() => {
    show && (document.body.style.overflow = 'hidden');
    !show && (document.body.style.overflow = 'auto');

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  return show ? (
    <div className="bg-[#00000053] w-full min-h-screen backdrop-blur-sm p-12 fixed inset-x-0 top-0 z-20 flex justify-center items-center">
      <div
        className={`animate__animated animate__bounceIn min-w-[18rem] shadow-lg p-8 rounded-xl flex flex-col items-center ${
          darkTheme ? 'bg-dark5' : 'bg-[#fffcfc]'
        }`}
      >
        <img className="w-16" src={modalIcon || successIcon} alt="" />
        <h2
          className={`text-2xl md:text-3xl font-bold text-center my-6 ${
            darkTheme ? 'text-gray-200' : 'text-dark3'
          }`}
        >
          {property.title || 'Success'}
        </h2>

        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
