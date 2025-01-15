import React from 'react';
import Lottie from 'lottie-react';
import loadingHand from './loadingHand.json';
import Container from '../Container/Container';

const Loading = () => {
  return (
    <Container>
      <Lottie className="h-[70vh]" animationData={loadingHand} />
    </Container>
  );
};

export default Loading;
