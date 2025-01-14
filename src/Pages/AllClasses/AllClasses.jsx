import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async (req, res) => {
      const { data } = await axiosPublic.get(`/classes`);
      return data;
    },
  });

  useEffect(() => {
    document.title = 'All Classes | EduHive';
  }, []);

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
                  <button
                    onClick={() => navigate(`/class_details/${_id}`)}
                    className="btn btn-success text-white"
                  >
                    Enroll
                  </button>
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
