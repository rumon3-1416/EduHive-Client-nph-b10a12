import React, { useEffect } from 'react';
import Container from '../../components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useAuthContext } from '../../Hooks/useAuthContext';
import Button from '../../components/Button';

const ClassDetails = () => {
  const { darkTheme } = useAuthContext();

  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: classDetails = {} } = useQuery({
    queryKey: ['classDetails', id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/class_details/${id}`);
      return data;
    },
  });

  const { _id, title, name, image, price, description, total_enrolment } =
    classDetails;

  useEffect(() => {
    document.title = 'Details Class | EduHive';
  }, []);

  return (
    <div className="bg-blueBg pt-12 pb-24">
      <Container>
        <div
          className={`${
            darkTheme ? 'bg-dark5' : 'bg-white'
          } p-5 shadow-lg rounded-md grid grid-cols-1 md:grid-cols-2 gap-8`}
        >
          <img
            className="
        w-full aspect-video object-cover rounded-md"
            src={image}
            alt=""
          />

          <div className="py-3 flex flex-col">
            <div className="flex-grow">
              <p
                className={`${
                  darkTheme ? 'text-light2' : 'text-gray-800'
                } text-2xl font-bold mb-4`}
              >
                {title}
              </p>
              <p className={`${darkTheme ? 'text-gray-200' : 'text-gray-600'}`}>
                Teacher : <span className="font-semibold">{name}</span>
              </p>
              <p className={`${darkTheme ? 'text-gray-200' : 'text-gray-600'}`}>
                Enrolled :{' '}
                <span className="font-semibold">{total_enrolment}</span>
              </p>
              <p
                className={`${
                  darkTheme ? 'text-gray-200' : 'text-gray-600'
                } mb-2`}
              >
                Price : <span className="font-semibold">{price}</span>
              </p>
              <p className={`mb-6 ${darkTheme && 'text-lightGray'}`}>
                {description}
              </p>
            </div>

            <Button
              onClick={() => navigate(`/payment/${_id}`)}
              className="w-full"
              text="text-lg"
            >
              Pay Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClassDetails;
