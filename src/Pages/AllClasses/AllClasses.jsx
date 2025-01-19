import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

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
    queryFn: async (req, res) => {
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

          {/* Pagination */}
          <div className="mt-6 flex justify-end items-center gap-4">
            <button
              onClick={() => {
                currentPage > 1 && setCurrentPage(currentPage - 1);
              }}
              className="bg-slate-50 px-3 py-1 rounded-md"
            >{`<`}</button>
            {pagesArray.map(num => (
              <button
                onClick={() => setCurrentPage(num + 1)}
                className={`px-2 sm:px-3.5 sm:py-1 rounded-lg border-2 border-light-green ${
                  currentPage === num + 1
                    ? 'bg-green-200 text-green-500'
                    : 'bg-white'
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
              className="bg-slate-50 px-3 py-1 rounded-md"
            >{`>`}</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllClasses;
