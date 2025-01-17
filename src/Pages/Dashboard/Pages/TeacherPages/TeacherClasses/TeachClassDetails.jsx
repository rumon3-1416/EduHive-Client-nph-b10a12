import React from 'react';
import { useParams } from 'react-router-dom';
import ClassProgress from '../../../Components/ClassProgress';

const TeachClassDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-3xl font-semibold">Class Details</h2>

      <ClassProgress id={id} />
    </div>
  );
};

export default TeachClassDetails;
