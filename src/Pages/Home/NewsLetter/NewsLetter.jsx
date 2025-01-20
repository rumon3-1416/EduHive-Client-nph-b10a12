import React from 'react';
import Container from '../../../components/Container/Container';

const NewsLetter = () => {
  return (
    <div className="bg-greenBg py-20">
      <Container>
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-darkGray poppins-font text-3xl leading-[44px] font-bold mb-2">
              Join Our Newsletter
            </h2>
            <p className="text-gray font-medium max-w-[440px]">
              Push your email and be part of a vibrant community of runners.
              Subscribe now for an unforgettable journey.
            </p>
          </div>

          <div className="flex items-center">
            <input
              className="w-[10rem] sm:w-[15rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem] px-6 py-3 border-2 border-skyBlue outline-none rounded-s-full"
              type="text"
              name="subscribe"
              id="subscribe"
              placeholder="Email"
            />
            <button className="bg-skyBlue text-white font-semibold px-6 py-3 border-2 border-skyBlue rounded-e-full">
              Subscribe
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsLetter;
