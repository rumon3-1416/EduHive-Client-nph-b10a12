import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import Loading from '../../../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';

const EnrollClassDetails = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const { register, handleSubmit, reset } = useForm();
  const [assignClassId, setClassId] = useState(null);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: assignments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['assignments', currentPage, id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/class_assignments/${id}?page=${currentPage}&data=${dataPerPage}`
      );
      setTotalData(data.count);
      return data.assignments;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, assign }) => {
      const { data } = await axiosSecure.put('/submit_assignment', {
        id,
        assign,
      });
      return data;
    },
  });

  const handleAssignment = async assign => {
    const res = await mutation.mutateAsync({ id: assignClassId, assign });
    console.log(res);
    reset();
    setClassId(null);
    document.getElementById('assignment_modal').close();
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Class Details</h2>

      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr className={`bg-[#cccccc] text-slate-700`}>
              <th>No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Start</th>
            </tr>
          </thead>

          {/* body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <h2 className="text-2xl font-semibold">Loading...</h2>
                </td>
              </tr>
            ) : (
              assignments.length > 0 &&
              assignments.map((assignment, index) => {
                const { _id, title, description, deadline, classId } =
                  assignment;

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
                    <td className="text-nowrap">{title}</td>
                    <td className="text-nowrap">
                      {description.slice(0, 20) +
                        (description.length > 20 && '...')}
                    </td>
                    <td className="text-nowrap">
                      {new Date(deadline).toISOString().split('T')[0]}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setClassId(classId);
                          document
                            .getElementById('assignment_modal')
                            .showModal();
                        }}
                        className="text-green-300 hover:text-green-500"
                      >
                        Start
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
              <td colSpan={5} className="bg-[#d3d3d3] text-base">
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

      {/* Assignment Modal */}
      <dialog id="assignment_modal" className="modal">
        <div className="modal-box w-4/5 max-w-5xl bg-gray-200">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Assignment
          </h2>

          <div className="modal-action">
            <form
              onSubmit={handleSubmit(handleAssignment)}
              method="dialog"
              className="w-full flex flex-col items-center gap-4"
            >
              {assignClassId && (
                <textarea
                  {...register('assignment')}
                  className="w-full px-2 py-1 rounded-xl outline-none resize-none"
                  rows={5}
                  name="assignment"
                  id="assignment"
                  placeholder="Write assignment"
                  required
                ></textarea>
              )}

              <button className="btn">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EnrollClassDetails;
