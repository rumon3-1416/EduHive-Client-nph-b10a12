import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SectionHeading from '../Home/Shared/SectionHeading';
import SortClasses from './SortClasses';
import Loading from '../../components/Loading/Loading';
import { useAuthContext } from '../../Hooks/useAuthContext';
import Button from '../../components/Button';

const AllClasses = () => {
  const [totalData, setTotalData] = useState(0);
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 12;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const { darkTheme } = useAuthContext();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: classes = [] } = useQuery({
    queryKey: ['classes', currentPage, sort],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/classes?page=${currentPage}&limit=${dataPerPage}&sort=${sort}`
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
        {classes.length > 0 ? (
          <div className="py-10">
            {/* <SectionHeading
              heading={['All Classes', 'Explore Our All Classes']}
            /> */}

            <SortClasses setSort={setSort} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {classes.map(cl => {
                const { _id, title, name, image, description } = cl;

                return (
                  <div
                    className={`${
                      darkTheme ? 'bg-dark5' : 'bg-white'
                    } rounded-md shadow-lg flex flex-col items-start`}
                    key={_id}
                  >
                    <div className="w-full p-2">
                      <img
                        className="w-full aspect-[4/3] object-cover rounded-md"
                        src={image}
                        alt={title}
                      />
                    </div>

                    {/* Desc */}
                    <div className="px-4 pb-6 grow flex flex-col items-start">
                      <div className="grow">
                        <h4
                          className={`text-lg font-semibold mb-2 ${
                            darkTheme && 'text-light2'
                          }`}
                        >
                          {title}
                        </h4>

                        <p
                          className={`font-medium ${
                            darkTheme && 'text-gray-200'
                          }`}
                        >
                          Teacher {name}
                        </p>
                        <p
                          className={`text-sm mt-1 mb-3 ${
                            darkTheme && 'text-lightGray'
                          }`}
                        >
                          {description}
                        </p>
                      </div>

                      <Button
                        onClick={() => navigate(`/class_details/${_id}`)}
                        className="w-full"
                      >
                        Enroll Now
                      </Button>
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
                className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-[7px] rounded-md border-2 border-lightBlue hover:border-skyBlue"
              >
                <IoIosArrowBack />
              </button>
              {pagesArray.map(num => (
                <button
                  onClick={() => setCurrentPage(num + 1)}
                  className={`px-3 py-1 rounded-md border-2 border-lightBlue ${
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
                className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-[7px] rounded-md border-2 border-lightBlue hover:border-skyBlue"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </div>
  );
};

export default AllClasses;
