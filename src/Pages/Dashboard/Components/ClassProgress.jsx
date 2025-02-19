import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const ClassProgress = ({ id }) => {
  const { darkTheme } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const { data: progress = {} } = useQuery({
    queryKey: ['progress', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class_progress/${id}`);
      return data;
    },
  });

  const { total_enrolment, total_assignment, total_submission } = progress;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
      <div
        className={`${
          darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
        } text-center px-3 py-6 rounded-lg shadow-lg flex flex-col justify-center items-center gap-1`}
      >
        <p className="text-3xl font-bold">{total_enrolment}</p>
        <h3 className="text-xl font-semibold">Total Enrollment</h3>
      </div>

      <div
        className={`${
          darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
        } text-center px-3 py-6 rounded-lg shadow-lg flex flex-col justify-center items-center gap-1`}
      >
        <p className="text-3xl font-bold">{total_assignment}</p>
        <h3 className="text-xl font-semibold">Total Assignment</h3>
      </div>

      <div
        className={`${
          darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
        } text-center px-3 py-6 rounded-lg shadow-lg flex flex-col justify-center items-center gap-1`}
      >
        <p className="text-3xl font-bold">{total_submission}</p>
        <h3 className="text-xl font-semibold">Total Submission</h3>
      </div>
    </div>
  );
};

export default ClassProgress;
