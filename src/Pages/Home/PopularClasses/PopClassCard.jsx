import React from 'react';

const PopClassCard = ({ popClass }) => {
  const { _id, title, name, image, price, description, total_enrolment } =
    popClass;

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col items-start">
      <img
        className="w-full aspect-[4/3] object-cover rounded-2xl mb-4"
        src={image}
        alt={title}
      />

      {/* Desc */}
      <div className="px-6 pb-8 grow flex flex-col items-start">
        <div className="grow">
          <h4 className="text-xl font-semibold mt-3 mb-1">{title}</h4>
          <p className="font-medium">
            Teacher :{' '}
            <span className="text-dark-green font-semibold">{name}</span>
          </p>
          <p className="font-medium">
            Enrolled :{' '}
            <span className="text-dark-green font-semibold">
              {total_enrolment}
            </span>
          </p>
          <p className="text-gray-600 text-justify">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PopClassCard;
