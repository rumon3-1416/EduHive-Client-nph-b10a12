import React from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../components/Container/Container';

const AllClasses = () => {
  const { serverUrl } = useAuthContext();

  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async (req, res) => {
      const { data } = await axios.get(`${serverUrl}/classes`);
      return data;
    },
  });

  return (
    <div>
      <Container>
        <div>
          <h1 className="text-4xl font-semibold">All Classes</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {classes.map(cl => {
              const {
                _id,
                title,
                name,
                image,
                price,
                description,
                total_enrolment,
              } = cl;

              return (
                <div className="bg-gray-200 p-4 rounded-lg" key={_id}>
                  <img src={image} alt="" />
                  <p>{title}</p>
                  <p>Teacher : {name}</p>
                  <p>Enrolled : {total_enrolment}</p>
                  <p>Price : {price}</p>
                  <p>{description}</p>
                  <button className="btn btn-success text-white">Enroll</button>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllClasses;
