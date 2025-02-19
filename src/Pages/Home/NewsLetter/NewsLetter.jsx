import React from 'react';
import Container from '../../../components/Container/Container';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const NewsLetter = () => {
  const { notify, darkTheme } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();
    notify('success', 'Subscription Successful!');
    e.target.reset();
  };

  return (
    <div className="bg-blueBg py-20">
      <Container>
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="text-center md:text-left">
            <h2
              className={`${
                darkTheme ? 'text-light2' : 'text-darkGray'
              } poppins-font text-3xl leading-[44px] font-bold mb-2`}
            >
              Join Our Newsletter
            </h2>
            <p
              className={`${
                darkTheme ? 'text-lightGray' : 'text-gray-500'
              } font-medium max-w-[440px] mx-auto md:mx-0`}
            >
              Push your email and be part of a vibrant community of runners.
              Subscribe now for an unforgettable journey.
            </p>
          </div>

          <div className="text-center">
            <form
              onSubmit={handleSubmit}
              className=" flex justify-center items-center"
            >
              <input
                className={`w-[10rem] sm:w-[15rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem] px-6 py-3 border-2 border-skyBlue focus:border-successGreen outline-none rounded-s-full ${
                  darkTheme && 'bg-dark4'
                }`}
                type="email"
                name="subscribe"
                id="subscribe"
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="bg-skyBlue hover:bg-successGreen text-white font-semibold px-6 py-3 border-2 border-skyBlue rounded-e-full transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsLetter;
