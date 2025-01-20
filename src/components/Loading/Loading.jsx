import React from 'react';
import Lottie from 'lottie-react';
import loading from './loading.json';
import Container from '../Container/Container';

const Loading = () => {
  return (
    <Container>
      <Lottie className="h-[70vh]" animationData={loading} />
    </Container>
  );
};

export default Loading;
