import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import Collaborators from './Collaborators/Collaborators';
import PopularClasses from './PopularClasses/PopularClasses';
import Feedbacks from './Feedback/Feedbacks';
import Overview from './OverView/Overview';
import BecomeTeacher from './BecomeTeacher/BecomeTeacher';
import Extra from './Extra';

const Home = () => {
  useEffect(() => {
    document.title = 'Home | EduHive';
  }, []);

  return (
    <>
      <Banner />
      <Collaborators />
      <PopularClasses />
      <Feedbacks />
      <Overview />
      <BecomeTeacher />
      <Extra />
    </>
  );
};

export default Home;
