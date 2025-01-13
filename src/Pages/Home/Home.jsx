import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <>
      <p>This is Home</p>
    </>
  );
};

export default Home;
