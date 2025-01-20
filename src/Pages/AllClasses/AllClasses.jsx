import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SectionHeading from '../Home/Shared/SectionHeading';

const AllClasses = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 12;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: classes = [] } = useQuery({
    queryKey: ['classes', currentPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/classes?page=${currentPage}&limit=${dataPerPage}`
      );
      setTotalData(data.count);
      return data.classes;
    },
  });

  useEffect(() => {
    document.title = 'All Classes | EduHive';
  }, []);

  return (
    <div className="bg-blueBg">
      <Container>
        <div className="py-10">
          <SectionHeading
            heading={['All Classes', 'Explore Our All Classes']}
          />

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
                <div
                  className="bg-white rounded-2xl shadow-lg flex flex-col items-start"
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
                      <h4 className="text-lg font-semibold mb-3">{title}</h4>

                      <p className="flex flex-wrap items-center">
                        <span className="font-medium">Teacher :</span>
                        <span className="text-darkBlue font-medium ms-2">
                          {name}
                        </span>
                      </p>
                      <p className="flex flex-wrap items-center">
                        <span className="font-medium">Enrolled :</span>
                        <span className="text-darkBlue font-medium ms-2">
                          {total_enrolment}
                        </span>
                      </p>
                      <p className="flex flex-wrap items-center">
                        <span className="font-medium">Price :</span>
                        <span className="text-darkBlue font-medium ms-2">
                          {price}
                        </span>
                      </p>
                      <p className="mt-1 mb-3">{description}</p>
                    </div>

                    <button
                      onClick={() => navigate(`/class_details/${_id}`)}
                      className="bg-skyBlue text-white hover:bg-green font-medium px-6 py-2.5 rounded-full"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-end items-center gap-4">
            <button
              onClick={() => {
                currentPage > 1 && setCurrentPage(currentPage - 1);
              }}
              className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-1.5 rounded-lg border-2 border-lightBlue hover:border-skyBlue"
            >
              <IoIosArrowBack />
            </button>
            {pagesArray.map(num => (
              <button
                onClick={() => setCurrentPage(num + 1)}
                className={`px-3 py-1 rounded-lg border-2 border-lightBlue ${
                  currentPage === num + 1
                    ? 'bg-lightBlue text-white cursor-default'
                    : 'text-black hover:text-white bg-white hover:bg-skyBlue hover:border-skyBlue'
                }`}
                key={num}
              >
                {num + 1}
              </button>
            ))}
            <button
              onClick={() => {
                currentPage < totalPages && setCurrentPage(currentPage + 1);
              }}
              className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-1.5 rounded-lg border-2 border-lightBlue hover:border-skyBlue"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllClasses;
