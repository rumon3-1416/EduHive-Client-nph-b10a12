import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Container from '../../../components/Container/Container';

const Collaborators = () => {
  const axiosPublic = useAxiosPublic();

  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/partners');
      return data;
    },
  });

  return (
    <div className="bg-blueBg">
      <Container>
        <section className="w-4/5 mx-auto pt-6 pb-10">
          <p className="text-center mb-6">Our Partners & Collaborators</p>

          <div
            className="w-[90%] mx-auto flex flex-wrap justify-center gap-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {partners.map((data, index) => (
              <img className="max-h-8" src={data.img} alt="" key={index} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Collaborators;
