import React from 'react';

const SectionHeading = ({ heading }) => {
  return (
    <>
      <h1 className={`text-4xl leading-[44px] font-semibold mb-2 text-dark`}>
        {heading[0] || ''}
      </h1>
      <p className={`text-lg max-w-[480px] mb-10 text-[#32443f]`}>
        {heading[1] || ''}
      </p>
    </>
  );
};

export default SectionHeading;
