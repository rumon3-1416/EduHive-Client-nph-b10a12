import React, { useEffect, useState } from 'react';
import DashboardContainer from '../../../Components/Container/DashboardContainer';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';

const TeacherRequests = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const axiosSecure = useAxiosSecure();

  // Get Total Requests
  useEffect(() => {
    axiosSecure
      .get('/teacher_requests_count')
      .then(res => setTotalData(res.data.count));
  }, [axiosSecure]);

  // Load Teacher Requests
  const {
    data: teacherRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['teacherRequests', currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/teacher_requests?page=${currentPage}&data=${dataPerPage}`
      );
      return data;
    },
  });

  // Handle Request Action
  const handleReqAction = async (id, email, action) => {
    await axiosSecure.put('/update_teach_req', {
      updatedStatus: action,
      id,
      email,
    });
    refetch();
  };

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
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8}>
                      <h2 className="text-2xl font-semibold">Loading...</h2>
                    </td>
                  </tr>
                ) : (
                  teacherRequests.length > 0 &&
                  teacherRequests.map((request, index) => {
                    const {
                      _id,
                      name,
                      email,
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
                        <td className="text-nowrap">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </td>
                        <td className="text-nowrap">
                          {experience.charAt(0).toUpperCase() +
                            experience.slice(1)}
                        </td>
                        <td
                          className={`text-nowrap ${
                            status === 'approved'
                              ? 'text-green-500'
                              : status === 'rejected'
                              ? 'text-red-500'
                              : 'text-yellow-500'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </td>
                        <td>
                          <div className="flex justify-center items-center gap-4">
                            <button
                              onClick={() =>
                                handleReqAction(_id, email, 'approved')
                              }
                              className="text-green-300 hover:text-green-500"
                              disabled={status !== 'pending'}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleReqAction(_id, email, 'rejected')
                              }
                              className="text-[#ff8629] hover:text-[#ff0000] px-2 rounded-md"
                              disabled={status !== 'pending'}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
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
