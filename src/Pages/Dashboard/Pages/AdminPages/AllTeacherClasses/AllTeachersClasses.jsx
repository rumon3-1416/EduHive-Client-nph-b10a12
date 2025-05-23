import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import ClassProgress from '../../../Components/ClassProgress';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import SectionHeading from '../../../../Home/Shared/SectionHeading';
import Button from '../../../../../components/Button';

const AllTeacherClasses = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [progressId, setProgressId] = useState(null);

  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const { notify, darkTheme } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  // Load all Classes
  const {
    data: allClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allClasses', currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/all_classes?page=${currentPage}&data=${dataPerPage}`
      );
      setTotalData(data.count);
      return data.classes;
    },
  });

  // Handle Class Status
  const handleClassStatus = async (id, status) => {
    const { data } = await axiosSecure.put('/update_class', {
      id,
      updatedStatus: status,
    });
    data.acknowledged && notify('success', 'Class Status Updated');
    refetch();
  };

  useEffect(() => {
    document.title = 'All Classes | EduHive';
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['All Classes']} />
      </div>

      {/* Table */}
      <div
        className={`${
          darkTheme ? 'bg-dark5 text-light2' : 'bg-[#fffcfc]'
        } overflow-x-auto mt-4`}
      >
        <table className="table">
          {/* head */}
          <thead>
            <tr
              className={`border-none ${
                darkTheme ? 'text-light2 bg-dark5' : 'bg-[#e6e6e6]'
              }`}
            >
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Email</th>
              <th>Description</th>
              <th className="text-center">Action</th>
              <th>Progress</th>
            </tr>
          </thead>

          {/* body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7}>
                  <h2 className="text-2xl font-semibold">Loading...</h2>
                </td>
              </tr>
            ) : (
              allClasses.length > 0 &&
              allClasses.map((request, index) => {
                const { _id, email, image, title, status, description } =
                  request;

                return (
                  <tr
                    className={`${
                      index % 2 !== 0
                        ? darkTheme
                          ? 'bg-[#595959]'
                          : 'bg-[#f1f1f1]'
                        : darkTheme
                        ? 'bg-[#616161]'
                        : ''
                    } ${
                      darkTheme
                        ? 'text-gray-100 hover:bg-[#4f4f4f]'
                        : 'hover:bg-[#e6e6e6]'
                    } border-none`}
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
                    <td className="text-nowrap">{title}</td>
                    <td className="text-nowrap">{email}</td>
                    <td className="text-nowrap">
                      {description?.slice(0, 20) +
                        (description?.length > 20 && '...') +
                        ''}
                    </td>
                    {/* Buttons */}
                    <td>
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() => handleClassStatus(_id, 'approved')}
                          className={`text-green hover:bg-gray-300 text-nowrap px-2 py-1 rounded-md ${
                            status === 'approved' && 'cursor-not-allowed'
                          }`}
                          disabled={status !== 'pending'}
                        >
                          Approve{status === 'approved' ? 'd' : ''}
                        </button>
                        <button
                          onClick={() => handleClassStatus(_id, 'rejected')}
                          className={`text-[#ff8629] hover:text-[#ff0000] hover:bg-gray-300 text-nowrap px-2 py-1 rounded-md ${
                            status !== 'pending' && 'cursor-not-allowed'
                          }`}
                          disabled={status !== 'pending'}
                        >
                          Reject{status === 'rejected' ? 'ed' : ''}
                        </button>
                      </div>
                    </td>
                    <td className="text-nowrap">
                      <button
                        onClick={() => {
                          setProgressId(_id);
                          document.getElementById('progress_modal').showModal();
                        }}
                        className={`text-blue-400 hover:bg-gray-300 text-nowrap px-2 py-1 rounded-md ${
                          status !== 'approved' && 'cursor-not-allowed'
                        }`}
                        disabled={status !== 'approved'}
                      >
                        Progress
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* foot */}
          <tfoot>
            <tr>
              <td
                colSpan={7}
                className={`${darkTheme ? '' : 'bg-[#d3d3d3]'} text-base`}
              >
                <div className="flex justify-end items-center gap-4">
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
                      currentPage < totalPages &&
                        setCurrentPage(currentPage + 1);
                    }}
                    className="text-black hover:text-white bg-white hover:bg-skyBlue text-lg px-2 py-[7px] rounded-md border-2 border-lightBlue hover:border-skyBlue"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Progress Modal */}
      <dialog id="progress_modal" className="modal">
        <div
          className={`modal-box w-11/12 max-w-5xl rounded-md ${
            darkTheme ? 'bg-[#4e4e4e] text-light2' : 'bg-gray-100'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-6">Progress</h2>
          {progressId && <ClassProgress id={progressId} />}

          <div className="modal-action">
            <form method="dialog">
              <Button onClick={() => setProgressId(null)} text="text-base">
                Close
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllTeacherClasses;
