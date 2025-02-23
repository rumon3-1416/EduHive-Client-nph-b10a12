import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/Container/Container';

import instructorImg from '../../../assets/images/instructor.png';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const BecomeTeacher = () => {
  const { darkTheme } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="bg-blueBg">
      <Container>
        <section className="pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-[3fr,_4fr] lg:grid-cols-2 items-center gap-6">
            <div>
              <img
                className="w-4/5 md:w-full max-w-[30rem] mx-auto"
                src={instructorImg}
                alt=""
              />
            </div>

            <div className="">
              <h2
                className={`poppins-font text-3xl leading-[44px] font-bold mb-2 ${
                  darkTheme ? 'text-light2' : 'text-dark4'
                }`}
              >
                Share Your Knowledge, Shape Futures
              </h2>
              <p
                className={`${
                  darkTheme ? 'text-lightGray' : 'text-gray-600'
                } text-lg mb-6`}
              >
                Become a part of our growing community of educators. Join us to
                teach, inspire, and make a difference in students lives around
                the globe. Your expertise matters!
              </p>

              <ul
                className={`${
                  darkTheme ? 'text-lightGray' : 'text-gray-600'
                } space-y-4 mb-6`}
              >
                <li className="flex items-center">
                  <span className="bg-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                    ✓
                  </span>
                  Flexible teaching schedules.
                </li>
                <li className="flex items-center">
                  <span className="bg-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                    ✓
                  </span>
                  Access to thousands of eager learners.
                </li>
                <li className="flex items-center">
                  <span className="bg-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                    ✓
                  </span>
                  Earn and grow as you teach.
                </li>
              </ul>

              <button
                onClick={() => navigate('/apply_teacher')}
                className="bg-skyBlue hover:bg-green text-white px-6 py-2 rounded-full shadow-lg"
              >
                Join as a Teacher
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default BecomeTeacher;
