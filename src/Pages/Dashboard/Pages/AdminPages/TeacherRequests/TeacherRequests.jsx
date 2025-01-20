import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import SectionHeading from '../../../../Home/Shared/SectionHeading';

const TeacherRequests = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const { notify } = useAuthContext();
  const axiosSecure = useAxiosSecure();

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
      setTotalData(data.count);

      return data.requests;
    },
  });

  // Handle Request Action
  const handleReqAction = async (id, email, action) => {
    const { data } = await axiosSecure.put('/update_teach_req', {
      updatedStatus: action,
      id,
      email,
    });
    data.acknowledged && notify('success', 'Request Updated Successfully');
    refetch();
  };

  useEffect(() => {
    document.title = 'Teacher Requests | EduHive';
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['Teacher Requests']} />
      </div>

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
                    <td className="text-nowrap">
                      {index + 1 + (currentPage - 1) * 10}
                    </td>
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
                      {experience.charAt(0).toUpperCase() + experience.slice(1)}
                    </td>
                    <td
                      className={`text-nowrap ${
                        status === 'approved'
                          ? 'text-green'
                          : status === 'rejected'
                          ? 'text-red-500'
                          : 'text-orange-500'
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
                          className="text-green hover:text-hoverGreen"
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
                    className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-1.5 rounded-lg border-2 border-lightBlue hover:border-skyBlue"
                  >
                    <IoIosArrowBack />
                  </button>
                  {pagesArray.map(num => (
                    <button
                      onClick={() => setCurrentPage(num + 1)}
                      className={`px-2 sm:px-3.5 sm:py-1 rounded-lg border-2 border-lightBlue ${
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
                      currentPage < totalPages &&
                        setCurrentPage(currentPage + 1);
                    }}
                    className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-1.5 rounded-lg border-2 border-lightBlue hover:border-skyBlue"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequests;
