import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import DashboardContainer from '../../../Components/Container/DashboardContainer';

const TeacherClasses = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 12;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const axiosSecure = useAxiosSecure();

  // Load My Total Classes
  useEffect(() => {
    axiosSecure
      .get('/my_class_count')
      .then(res => setTotalData(res.data.count));
  }, [axiosSecure]);

  const { data: myClasses = [] } = useQuery({
    queryKey: ['myClasses', currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my_classes?page=${currentPage}&data=${dataPerPage}`
      );
      return data;
    },
  });

  return (
    <div>
      <DashboardContainer>
        <section>
          <h2 className="text-3xl font-semibold">My Classes</h2>

          <div>
            {/* Display Classes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {myClasses.map(cls => {
                const {
                  _id,
                  title,
                  image,
                  price,
                  name,
                  email,
                  description,
                  status,
                  total_enrolment,
                } = cls;

                return (
                  <div className="border border-black rounded-lg" key={_id}>
                    <img src={image} alt={title} />
                    <p>Total Enroll : {total_enrolment}</p>
                    <p>Price : {price}</p>
                    <p>Status : {status}</p>
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
                    <p>Description : {description}</p>
                    <button className="btn ms-2">Update</button>
                    <button className="btn ms-2">Delete</button>
                    <button className="btn ms-2">Details</button>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-4">
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
        </section>
      </DashboardContainer>
    </div>
  );
};

export default TeacherClasses;
