import React from 'react';

const SectionHeading = ({ heading }) => {
  return (
    <>
      <h1
        className={`poppins-font text-3xl leading-[44px] font-bold mb-2 text-dark4`}
      >
        {heading[0] || ''}
      </h1>
      <p className={`text-lg max-w-[480px] mb-10 text-[#32443f]`}>
        {heading[1] || ''}
      </p>
    </>
  );
};

export default SectionHeading;
