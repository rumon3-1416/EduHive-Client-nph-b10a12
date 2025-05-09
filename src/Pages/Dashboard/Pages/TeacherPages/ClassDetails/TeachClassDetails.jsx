import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import AddAssignment from './AddAssignment';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import SectionHeading from '../../../../Home/Shared/SectionHeading';
import Button from '../../../../../components/Button';

const TeachClassDetails = () => {
  const [showForm, setShowForm] = useState(false);

  const { notify, darkTheme } = useAuthContext();
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
    const res = await mutation.mutateAsync({
      ...assignment,
      classId: id,
    });

    res.acknowledged
      ? notify('success', 'Assignment Added')
      : notify('error', 'Assignment add Failed!');
    refetch();
    setShowForm(false);
  };

  useEffect(() => {
    document.title = 'Class Details | EduHive';
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['Class Details']} />
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <div
          className={`${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
          } text-center px-3 py-6 rounded-md shadow-lg flex flex-col justify-center items-center gap-1`}
        >
          <p className="text-3xl font-bold">{total_enrolment}</p>
          <h3 className="text-xl font-semibold">Total Enrollment</h3>
        </div>

        <div
          className={`${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
          } text-center px-3 py-6 rounded-md shadow-lg flex flex-col justify-center items-center gap-1`}
        >
          <p className="text-3xl font-bold">{total_assignment}</p>
          <h3 className="text-xl font-semibold">Total Assignment</h3>
        </div>

        <div
          className={`${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
          } text-center px-3 py-6 rounded-md shadow-lg flex flex-col justify-center items-center gap-1`}
        >
          <p className="text-3xl font-bold">{total_submission}</p>
          <h3 className="text-xl font-semibold">Total Submission</h3>
        </div>
      </div>

      {/* Create Assignment */}
      <div className="mt-6">
        <Button onClick={() => setShowForm(true)} text="text-base">
          Create Assignment
        </Button>
      </div>

      {/* Add Assignment Form */}
      {showForm && (
        <AddAssignment
          addAssignment={addAssignment}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default TeachClassDetails;
