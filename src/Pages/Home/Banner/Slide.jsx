import React from 'react';
import { useNavigate } from 'react-router-dom';

const Slide = ({ data }) => {
  const { title, description, imageUrl, buttonText } = data;

  const navigate = useNavigate();

  return (
    <div className="relative">
      <img
        className="w-full aspect-[1/1] sm:aspect-[4/3] md:aspect-[2/1] object-cover"
        src={imageUrl}
        alt=""
      />

      <div className="bg-[#0000006f] w-full text-white text-center flex flex-col items-center justify-center absolute inset-0">
        <h2 className="max-w-[80%] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold lg:font-bold">
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
          className="bg-green hover:bg-hoverGreen text-lg px-6 py-3 mt-6 rounded-full font-medium"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Slide;
