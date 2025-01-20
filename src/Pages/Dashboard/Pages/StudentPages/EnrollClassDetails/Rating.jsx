import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Rating = ({ setRating }) => {
  return (
    <ReactStars
      count={5}
      onChange={rate => setRating(rate)}
      size={28}
      activeColor="#ffd700"
    />
  );
};

export default Rating;
