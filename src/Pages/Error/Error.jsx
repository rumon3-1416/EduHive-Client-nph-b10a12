import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 Not Found';
  }, []);

  return (
    <div className="bg-[#cbcbcb] min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-[#242424] text-6xl font-bold">404</h2>
      <h2 className="text-[#4f4f4f] text-lg font-medium mt-2">
        {`Oops! The Page you requested doesn't exists.`}
      </h2>

      <button
        onClick={() => navigate('/')}
        className="text-white bg-skyBlue hover:bg-successGreen font-semibold px-5 py-2 mt-4 rounded-full transition-all duration-200"
      >
        Go Home
      </button>
    </div>
  );
};

export default Error;
