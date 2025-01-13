import React, { useEffect } from 'react';
import Banner from './Banner/Banner';

const Home = () => {
  useEffect(() => {
    document.title = 'Home | EduHive';
  }, []);

  return (
    <>
      <Banner />
    </>
  );
};

export default Home;
