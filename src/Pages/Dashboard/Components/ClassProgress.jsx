import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ClassProgress = ({ id }) => {
  const axiosSecure = useAxiosSecure();

  const { data: progress = {} } = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class_progress/${id}`);
      return data;
    },
  });

  const { total_enrolment, total_assignment, total_submission } = progress;

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-6">
      <div className="text-center p-3 border-[3px] border-gray-700 rounded-lg">
        <h3 className="text-3xl font-semibold">Total Enrollment</h3>
        <p className="text-3xl font-bold">{total_enrolment}</p>
      </div>

      <div className="text-center p-3 border-[3px] border-gray-700 rounded-lg">
        <h3 className="text-3xl font-semibold">Total Assignment</h3>
        <p className="text-3xl font-bold">{total_assignment}</p>
      </div>

      <div className="text-center p-3 border-[3px] border-gray-700 rounded-lg">
        <h3 className="text-3xl font-semibold">Total Submission</h3>
        <p className="text-3xl font-bold">{total_submission}</p>
      </div>
    </div>
  );
};

export default ClassProgress;
