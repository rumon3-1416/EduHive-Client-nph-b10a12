import React from 'react';
import Lottie from 'lottie-react';
import loadingHand from './loadingHand.json';
import MainLayout from '../../Layouts/MainLayout';

const Loading = () => {
  return (
    <MainLayout>
      <Lottie className="h-[70vh]" animationData={loadingHand} />
    </MainLayout>
  );
};

export default Loading;
