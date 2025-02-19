import React from 'react';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const SectionHeading = ({ heading }) => {
  const { darkTheme } = useAuthContext();

  return (
    <>
      <h1
        className={`poppins-font text-3xl leading-[44px] font-bold mb-2 ${
          darkTheme ? 'text-light2' : 'text-dark4'
        }`}
      >
        {heading[0] || ''}
      </h1>
      <p
        className={`text-lg mb-10 ${
          darkTheme ? 'text-lightGray' : 'text-[#32443f]'
        }`}
      >
        {heading[1] || ''}
      </p>
    </>
  );
};

export default SectionHeading;
