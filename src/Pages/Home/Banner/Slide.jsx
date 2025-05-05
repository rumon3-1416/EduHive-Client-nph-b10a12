import React from 'react';
import { useNavigate } from 'react-router-dom';

const Slide = ({ data }) => {
  const { title, description, imageUrl, buttonText } = data;

  const navigate = useNavigate();

  return (
    <div className="relative">
      <img
        className="w-full aspect-[1/1] sm:aspect-[4/3] md:aspect-[2/1] lg:aspect-[5/2] object-cover"
        src={imageUrl}
        alt=""
      />

      <div className="bg-[#000000a5] w-full text-white text-center flex flex-col items-center justify-center absolute inset-0">
        <h2 className="max-w-[80%] text-3xl sm:text-4xl md:text-5xl font-semibold lg:font-bold">
          {title}
        </h2>
        <p className="w-[80%] max-w-[796px] text-sm sm:text-md md:text-lg font-medium mt-4 mb-0 lg:mb-4">
          {description}
        </p>
        <button
          onClick={() => {
            if (buttonText === 'Browse Courses') {
              navigate('/all_classes');
            } else if (buttonText === 'Become a Teacher') {
              navigate('/apply_teacher');
            } else {
              document
                .getElementById('popular_classes')
                ?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-skyBlue text-white hover:bg-darkBlue text-lg font-medium px-8 py-3 mt-6 shadow-lg shadow-lightBlue rounded-md transition-all duration-300"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Slide;
