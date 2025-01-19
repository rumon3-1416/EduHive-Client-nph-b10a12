import React from 'react';

const PopClassCard = ({ popClass }) => {
  const { title, name, image, description, total_enrolment } = popClass;

  return (
    <div className="bg-white min-h-[27.5rem] grow rounded-2xl flex flex-col items-start">
      <img
        className="w-full aspect-[4/3] object-cover rounded-2xl mb-4"
        src={image}
        alt={title}
      />

      {/* Desc */}
      <div className="px-6 pb-6 flex flex-col items-start">
        <div className="w-full grow">
          <h4 className="text-xl font-semibold mt-3 mb-1">{title}</h4>
          <p className="font-medium">
            Teacher :{' '}
            <span className="text-darkGray font-semibold">{name}</span>
          </p>
          <p className="font-medium">
            Enrolled :{' '}
            <span className="text-darkGray font-semibold">
              {total_enrolment}
            </span>
          </p>
          <p className="text-mutedGray text-justify mt-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PopClassCard;
