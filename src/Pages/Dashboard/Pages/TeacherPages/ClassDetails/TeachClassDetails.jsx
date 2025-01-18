import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import AddAssignment from './AddAssignment';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';

const TeachClassDetails = () => {
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Load Progress
  const { data: progress = {}, refetch } = useQuery({
    queryKey: ['progress', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class_progress/${id}`);
      return data;
    },
  });
  const { total_enrolment, total_assignment, total_submission } = progress;

  // Post Assignment
  const mutation = useMutation({
    mutationFn: async assignment => {
      const { data } = await axiosSecure.post('/add_assignment', assignment);
      return data;
    },
  });
  // Handle Add Assignment
  const addAssignment = async assignment => {
    await mutation.mutateAsync({
      ...assignment,
      classId: id,
    });
    refetch();
    setShowForm(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Class Details</h2>
      {/* Progress */}
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

      {/* Create Assignment */}
      <div className="mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-success text-white"
        >
          Create Assignment
        </button>
      </div>

      {/* Add Assignment Form */}
      {showForm && <AddAssignment addAssignment={addAssignment} />}
    </div>
  );
};

export default TeachClassDetails;
