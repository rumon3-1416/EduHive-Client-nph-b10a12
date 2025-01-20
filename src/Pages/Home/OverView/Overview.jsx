import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from '../../../components/Container/Container';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import socialImg from '../../../assets/images/student.png';

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
    <div className="bg-blueBg">
      <Container>
        <section className="pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-[4fr,_3fr] lg:grid-cols-2 items-center gap-2 lg:gap-6">
            <div className="w-full p-6">
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h2 className="poppins-font text-3xl leading-[44px] font-bold mb-2 text-dark4">
                  Our Growing Community
                </h2>
                <p className="text-gray-600 mb-6">
                  Discover the numbers behind our success.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-successGreen text-4xl font-extrabold">
                      {overview.totalUsers}+
                    </h3>
                    <p className="text-gray-500">Total Users</p>
                  </div>
                  <div>
                    <h3 className="text-successGreen text-4xl font-extrabold">
                      {overview.totalClass}+
                    </h3>
                    <p className="text-gray-500">Classes Offered</p>
                  </div>
                  <div>
                    <h3 className="text-successGreen text-4xl font-extrabold">
                      {overview.totalEnrolled}+
                    </h3>
                    <p className="text-gray-500">Enrollments</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <img
                className="w-4/5 md:w-full max-w-[30rem] mx-auto md:mx-0"
                src={socialImg}
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
