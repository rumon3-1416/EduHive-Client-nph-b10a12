import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from '../../../components/Container/Container';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Overview = () => {
  const axiosPublic = useAxiosPublic();

  const { data: overview = {} } = useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/overview`);
      return data;
    },
  });

  return (
    <div>
      <Container>
        <section>
          <h2 className="text-4xl font-semibold">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <div className="order-2 md:order-1 grid grid-cols-1 grid-rows-3 gap-4">
              <div className="text-center p-4 border border-black rounded-xl">
                <h2 className="text-2xl font-semibold">Total Users</h2>
                <p className="text-3xl font-semibold">{overview.totalUsers}</p>
              </div>

              <div className="text-center p-4 border border-black rounded-xl">
                <h2 className="text-2xl font-semibold">Total Classes</h2>
                <p className="text-3xl font-semibold">{overview.totalClass}</p>
              </div>

              <div className="text-center p-4 border border-black rounded-xl">
                <h2 className="text-2xl font-semibold">Total Enrollment</h2>
                <p className="text-3xl font-semibold">
                  {overview.totalEnrolled}
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <img
                className="w-full"
                src="https://p1.hiclipart.com/preview/543/37/169/blackboard-learning-management-system-education-moodle-blended-learning-student-elearning-distance-education-png-clipart.jpg"
                alt=""
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Overview;
