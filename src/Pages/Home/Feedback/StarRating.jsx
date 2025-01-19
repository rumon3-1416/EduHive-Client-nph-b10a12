import React, { useState } from 'react';

import fullStarIcon from '../../../assets/icons/full-star.png';
import halfStarIcon from '../../../assets/icons/half-star.png';
import emptyStarIcon from '../../../assets/icons/empty-star.png';

const StarRating = ({ rating }) => {
  const rate = Number(rating);

  const halfStar = rate % 1 !== 0;

  const [full, setFull] = useState([]);
  const [empty, setEmpty] = useState([]);

  useState(() => {
    const fullStars = Math.floor(rate);
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let fullArray = [];
    let emptyArray = [];

    for (let i = 1; i <= fullStars; i++) {
      fullArray.push(i);
    }
    for (let i = 1; i <= emptyStars; i++) {
      emptyArray.push(i);
    }

    setFull(fullArray);
    setEmpty(emptyArray);
  }, []);

  return (
    <div className="flex gap-1">
      {[...full].map((f, i) => (
        <img key={i} className="w-4" src={fullStarIcon} alt="" />
      ))}

      {halfStar && <img className="w-4" src={halfStarIcon} alt="" />}

      {[...empty].map((f, i) => (
        <img key={i} className="w-4" src={emptyStarIcon} alt="" />
      ))}
    </div>
  );
};

export default StarRating;
