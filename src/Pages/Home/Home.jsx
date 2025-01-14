import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import Collaborators from './Collaborators/Collaborators';
import PopularClasses from './PopularClasses/PopularClasses';

const Home = () => {
  useEffect(() => {
    document.title = 'Home | EduHive';
  }, []);

  return (
    <>
      <Banner />
      <Collaborators />
      <PopularClasses />
    </>
  );
};

export default Home;
