import React, { useEffect, useState } from 'react';
import DashboardContainer from '../../../Components/Container/DashboardContainer';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';

const Users = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const axiosSecure = useAxiosSecure();

  // Get Total Requests
  useEffect(() => {
    axiosSecure.get('/users_count').then(res => setTotalData(res.data.count));
  }, [axiosSecure]);

  // Load Teacher Requests
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?page=${currentPage}&data=${dataPerPage}`
      );
      return data;
    },
  });

  // Handle Admin Action
  const handleAdmin = async email => {
    await axiosSecure.put('/users_admin', { email });
    refetch();
  };

  return (
    <div>
      <DashboardContainer>
        <section>
          <h2 className="text-3xl font-semibold">All Users</h2>

          {/* Table */}
          <div className="bg-[#fffcfc] overflow-x-auto mt-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr className={`bg-[#cccccc] text-slate-700`}>
                  <th>No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
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
                  users.length > 0 &&
                  users.map((user, index) => {
                    const { _id, displayName, email, photoURL, role } = user;

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
                            referrerPolicy="no-referrer"
                            src={photoURL}
                            alt="img"
                          />
                        </td>
                        <td className="text-nowrap">{displayName}</td>
                        <td className="text-nowrap">{email}</td>
                        <td className="text-nowrap">
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </td>
                        <td>
                          <button
                            onClick={() => handleAdmin(email)}
                            className="text-green-300 hover:text-green-500 text-nowrap"
                            disabled={role === 'admin'}
                          >
                            Make Admin
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

export default Users;
