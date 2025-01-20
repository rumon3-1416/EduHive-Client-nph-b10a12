import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import Collaborators from './Collaborators/Collaborators';
import PopularClasses from './PopularClasses/PopularClasses';
import Feedbacks from './Feedback/Feedbacks';
import Overview from './OverView/Overview';
import BecomeTeacher from './BecomeTeacher/BecomeTeacher';
import QuesAns from './QuesAns/QuesAns';
import NewsLetter from './NewsLetter/NewsLetter';
import Categories from './Categories/Categories';

const Home = () => {
  useEffect(() => {
    document.title = 'Home | EduHive';
  }, []);

  return (
    <>
      <Banner />
      <Collaborators />
      <PopularClasses />
      <Overview />
      <Categories />
      <Feedbacks />
      <BecomeTeacher />
      <QuesAns />
      <NewsLetter />
    </>
  );
};

export default Home;
