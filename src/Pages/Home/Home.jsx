import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <>
      <p className="text-4xl font-semibold">Home</p>
    </>
  );
};

export default Home;
