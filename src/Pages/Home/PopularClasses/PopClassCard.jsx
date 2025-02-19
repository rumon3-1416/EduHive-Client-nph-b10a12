import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../Hooks/useAuthContext.js';

const PopClassCard = ({ popClass }) => {
  const { _id, title, image, description } = popClass;

  const { darkTheme } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-[27.5rem] rounded-2xl flex flex-col items-start ${
        darkTheme ? 'bg-dark5' : 'bg-white'
      }`}
    >
      <img
        className="w-full aspect-[4/3] object-cover rounded-2xl mb-4"
        src={image}
        alt={title}
      />

      {/* Desc */}
      <div className="w-full px-6 pb-6 grow flex flex-col items-start gap-3">
        <div className="grow">
          <h4
            className={`text-xl font-semibold mt-3 mb-1 ${
              darkTheme && 'text-light2'
            }`}
          >
            {title}
          </h4>
          <p
            className={`${
              darkTheme ? 'text-lightGray' : 'text-mutedGray'
            } text-justify mt-3`}
          >
            {description}
          </p>
        </div>

        <button
          onClick={() => navigate(`/class_details/${_id}`)}
          className="bg-skyBlue text-white hover:bg-green font-medium w-full px-6 py-2.5 rounded-full transition-all duration-300"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default PopClassCard;
