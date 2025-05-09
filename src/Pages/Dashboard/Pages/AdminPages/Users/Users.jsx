import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import SearchUsers from './SearchUsers';
import SectionHeading from '../../../../Home/Shared/SectionHeading';

const Users = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const { notify, darkTheme } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  // Load Teacher Requests
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', currentPage, search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?page=${currentPage}&data=${dataPerPage}&search=${search}`
      );
      setTotalData(data.count);
      return data.users;
    },
  });

  // Handle Admin Action
  const handleAdmin = async email => {
    const { data } = await axiosSecure.put('/users_admin', { email });
    data.acknowledged && notify('success', 'User is Now Admin');
    refetch();
  };

  useEffect(() => {
    document.title = 'Users | EduHive';
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['All Users']} />
      </div>

      {/* Search */}
      <SearchUsers setSearch={setSearch} />

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
                <td colSpan={6}>
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
                        referrerPolicy="no-referrer"
                        src={photoURL}
                        alt="img"
                      />
                    </td>
                    <td className="text-nowrap">{displayName}</td>
                    <td className="text-nowrap">{email}</td>
                    <td
                      className={`text-nowrap ${
                        role === 'admin'
                          ? 'text-green'
                          : role === 'teacher'
                          ? 'text-skyBlue'
                          : 'text-orange-500'
                      }`}
                    >
                      {role.charAt(0)?.toUpperCase() + role?.slice(1) + ''}
                    </td>
                    <td>
                      <button
                        onClick={() => handleAdmin(email)}
                        className={`text-green hover:bg-gray-300 text-nowrap px-2 py-1 rounded-md ${
                          role === 'admin' ? 'cursor-not-allowed' : ''
                        }`}
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
              <td
                colSpan={6}
                className={`${darkTheme ? '' : 'bg-[#d3d3d3]'} text-base`}
              >
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

export default Users;
