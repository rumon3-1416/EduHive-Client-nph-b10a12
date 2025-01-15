import React, { useEffect } from 'react';
import Container from '../../components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ClassDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: classDetails = {} } = useQuery({
    queryKey: ['classDetails', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class_details/${id}`);
      return data;
    },
  });

  const { _id, title, name, image, price, description, total_enrolment } =
    classDetails;

  useEffect(() => {
    document.title = 'Details Class | EduHive';
  }, []);

  return (
    <div>
      <Container>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src={image} alt="" />

            <div>
              <p>{title}</p>
              <p>Teacher : {name}</p>
              <p>Enrolled : {total_enrolment}</p>
              <p>Price : {price}</p>
              <p>{description}</p>
              <button
                onClick={() => navigate(`/payment/${_id}`)}
                className="btn"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClassDetails;
