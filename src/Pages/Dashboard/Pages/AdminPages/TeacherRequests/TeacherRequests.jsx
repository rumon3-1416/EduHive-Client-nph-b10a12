import React, { useEffect, useState } from 'react';
import DashboardContainer from '../../../Components/Container/DashboardContainer';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';

const TeacherRequests = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get('/teacher_requests_count')
      .then(res => setTotalData(res.data.count));
  }, [axiosSecure]);

  const { data: teacherRequests = [] } = useQuery({
    queryKey: ['teacherRequests', currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/teacher_requests?page=${currentPage}&data=${dataPerPage}`
      );
      return data;
    },
  });

  return (
    <div>
      <DashboardContainer>
        <section>
          <h2 className="text-3xl font-semibold">Teacher Requests</h2>

          {/* Table */}
          <div className="bg-[#fffcfc] overflow-x-auto mt-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr className={`bg-[#cccccc] text-slate-700`}>
                  <th>No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {teacherRequests.length > 0 &&
                  teacherRequests.map((request, index) => {
                    const {
                      _id,
                      name,
                      image,
                      title,
                      experience,
                      category,
                      status,
                    } = request;

                    return (
                      <tr
                        className={`${
                          index % 2 !== 0 && 'bg-[#f1f1f1]'
                        } hover:bg-[#e6e6e6]`}
                        key={_id}
                      >
                        <td className="text-nowrap">{index + 1}</td>
                        <td className="text-nowrap">
                          <img
                            className="max-w-10 aspect-square object-cover rounded-lg"
                            src={image}
                            alt=""
                          />
                        </td>
                        <td className="text-nowrap">{name}</td>
                        <td className="text-nowrap">{title}</td>
                        <td className="text-nowrap">{category}</td>
                        <td className="text-nowrap">{experience}</td>
                        <td
                          className={`text-nowrap ${
                            status === 'approved'
                              ? 'text-green-500'
                              : status === 'rejected'
                              ? 'text-red-500'
                              : 'text-orange-500'
                          }`}
                        >
                          {status}
                        </td>
                        <td>
                          <div className="flex justify-center items-center gap-4">
                            <p className="text-green-300 hover:text-green-500 cursor-pointer">
                              Approve
                            </p>
                            <p className="text-[#ff8629] hover:text-[#ff0000] px-2 rounded-md cursor-pointer">
                              Reject
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

              {/* foot */}
              <tfoot>
                <tr>
                  <td colSpan={8} className="bg-[#d3d3d3] text-base">
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
                          currentPage < totalPages &&
                            setCurrentPage(currentPage + 1);
                        }}
                        className="bg-slate-50 px-3 py-1 rounded-md"
                      >{`>`}</button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </DashboardContainer>
    </div>
  );
};

export default TeacherRequests;
