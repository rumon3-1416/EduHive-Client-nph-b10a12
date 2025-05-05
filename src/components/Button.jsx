import React from 'react';

const Button = ({ onClick, className = '', children, text = 'text-sm' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-skyBlue text-white hover:bg-darkBlue font-medium px-6 py-2 rounded-md transition-all duration-200 ${text} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
