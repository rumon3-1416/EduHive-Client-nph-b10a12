import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../Home/Shared/SectionHeading';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';

const StudentEnrolls = () => {
  const { darkTheme } = useAuthContext();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: studentEnrolls = [] } = useQuery({
    queryKey: ['studentEnrolls'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/student_classes');
      return data;
    },
  });

  useEffect(() => {
    document.title = 'My Enrolls | EduHive';
  }, []);

  return (
    <div className="">
      <div className="hidden md:block">
        <SectionHeading heading={['My Enrolls']} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {studentEnrolls.length > 0 ? (
          studentEnrolls.map(enroll => {
            const { _id, title, name, image } = enroll;

            return (
              <div
                className={`${
                  darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
                } rounded-2xl shadow-lg flex flex-col items-start`}
                key={_id}
              >
                <div className="w-full p-4">
                  <img
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                    src={image}
                    alt={title}
                  />
                </div>

                {/* Desc */}
                <div className="px-6 pb-8 grow flex flex-col items-start">
                  <div className="grow">
                    <h4 className="text-xl font-semibold">{title}</h4>

                    <p className="mb-2  mt-1 flex flex-wrap items-center">
                      <span className="text-dark-green font-medium">
                        Teacher :
                      </span>
                      <span className="font-medium ms-2">{name}</span>
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/dashboard/enroll_class_details/${_id}`)
                    }
                    className="bg-skyBlue text-white hover:bg-green font-medium px-6 py-2.5 rounded-full"
                  >
                    Continue
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2
              className={`${darkTheme && 'text-light2'} text-3xl font-semibold`}
            >
              No Data Found!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEnrolls;
