import React, { useEffect } from 'react';
import Container from '../../components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../Hooks/useAuthContext';

const ClassDetails = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: classDetails = {} } = useQuery({
    queryKey: ['classDetails', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class_details/${id}`, {
        headers: {
          user_email: user.email,
        },
      });
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
              <button className="btn">Pay Now</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClassDetails;
