import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import DashboardContainer from '../../../Components/Container/DashboardContainer';

const AllTeacherClasses = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const axiosSecure = useAxiosSecure();

  // Load Total Classes
  useEffect(() => {
    axiosSecure.get('/classes_count').then(res => setTotalData(res.data.count));
  }, [axiosSecure]);

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
      return data;
    },
  });

  // Handle Class Status
  const handleClassStatus = async (id, status) => {
    await axiosSecure.put('/update_class', { id, updatedStatus: status });
    refetch();
  };

  useEffect(() => {
    document.title = 'All Classes | EduHive';
  }, []);

  return (
    <div>
      <DashboardContainer>
        <section>
          <h2 className="text-3xl font-semibold">All Classes</h2>

          {/* Table */}
          <div className="bg-[#fffcfc] overflow-x-auto mt-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr className={`bg-[#cccccc] text-slate-700`}>
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
                    <td colSpan={8}>
                      <h2 className="text-2xl font-semibold">Loading...</h2>
                    </td>
                  </tr>
                ) : (
                  allClasses.length > 0 &&
                  allClasses.map((request, index) => {
                    const {
                      _id,
                      name,
                      email,
                      image,
                      title,
                      price,
                      status,
                      total_enrolment,
                      description,
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
                        <td className="text-nowrap">{title}</td>
                        <td className="text-nowrap">{email}</td>
                        <td className="text-nowrap">
                          {description.slice(0, 20)}...
                        </td>
                        <td>
                          <div className="flex justify-center items-center gap-4">
                            <button
                              onClick={() => handleClassStatus(_id, 'approved')}
                              className="text-green-300 hover:text-green-500"
                              disabled={status !== 'pending'}
                            >
                              Approve{status === 'approved' ? 'd' : ''}
                            </button>
                            <button
                              onClick={() => handleClassStatus(_id, 'rejected')}
                              className="text-[#ff8629] hover:text-[#ff0000] px-2 rounded-md"
                              disabled={status !== 'pending'}
                            >
                              Reject{status === 'rejected' ? 'ed' : ''}
                            </button>
                          </div>
                        </td>
                        <td className="text-nowrap">
                          <button
                            className="text-blue-300 hover:text-blue-500 px-2 rounded-md"
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

export default AllTeacherClasses;
