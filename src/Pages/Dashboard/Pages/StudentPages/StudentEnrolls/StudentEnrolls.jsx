import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const StudentEnrolls = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: studentEnrolls = [] } = useQuery({
    queryKey: ['studentEnrolls'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/student_classes');
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold">My Enrolls</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studentEnrolls.length > 0 ? (
          studentEnrolls.map(enroll => {
            const { _id, title, name, image } = enroll;

            return (
              <div className="bg-gray-200 p-4 rounded-xl shadow-xl" key={_id}>
                <img
                  className="aspect-video object-cover rounded-lg"
                  src={image}
                  alt={title}
                />
                <p>{title}</p>
                <p>Teacher : {name}</p>
                <button
                  onClick={() =>
                    navigate(`/dashboard/enroll_class_details/${_id}`)
                  }
                  className="btn btn-primary text-white"
                >
                  Continue
                </button>
              </div>
            );
          })
        ) : (
          <div>
            <h2 className="text-3xl font-semibold">No Data Found!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEnrolls;
