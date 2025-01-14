import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from '../../../components/Container/Container';
import PopClassCard from './PopClassCard';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const PopularClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: popularClasses = [] } = useQuery({
    queryKey: ['popular-classes'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/classes?popular=true&limit=6`);

      return data;
    },
  });

  return (
    <div className="bg-greenBg pt-16 pb-10">
      <Container>
        <section id="marathons">
          <h1
            className={`text-4xl leading-[44px] font-semibold mb-4 text-dark`}
          >
            Popular Classes
          </h1>
          <p className={`text-lg max-w-[480px] mb-10text-[#32443f]`}>
            Write something about popular classess
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularClasses.map(popClass => (
              <PopClassCard key={popClass._id} popClass={popClass} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default PopularClasses;
