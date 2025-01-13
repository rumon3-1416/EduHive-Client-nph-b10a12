import React, { useEffect } from 'react';

const Error = () => {
  useEffect(() => {
    document.title = '404 Not Found';
  }, []);

  return (
    <div className="bg-[#f4f4f4] min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-red-500 text-3xl font-bold">Error 404</h2>
      <h2 className="text-red-500 text-3xl font-bold mt-4">Page Not Found</h2>
    </div>
  );
};

export default Error;
