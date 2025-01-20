import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import Rating from './Rating';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import SectionHeading from '../../../../Home/Shared/SectionHeading';

const EnrollClassDetails = () => {
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(totalPages).keys()];

  const { register, handleSubmit, reset } = useForm();
  const [assignClassId, setClassId] = useState(null);
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  const { user, notify } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  // Load Assignments
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

  // Handle submit assignment
  const handleAssignment = async assign => {
    const { data } = await axiosSecure.put('/submit_assignment', {
      id: assignClassId,
      assign,
    });

    data.acknowledged
      ? notify('success', 'Assignment Submitted Successfully')
      : notify('error', 'Assignment Submitted Failed!');

    reset();
    setClassId(null);
    document.getElementById('assignment_modal').close();
  };

  // Submit Feedback
  const feedbackMutation = useMutation({
    mutationFn: async feedback => {
      const { data } = await axiosSecure.post('/post_feedback', feedback);
      return data;
    },
  });
  // Handle submit assignment
  const handleFeedback = async feed => {
    const feedback = {
      ...feed,
      id,
      rating,
      name: user.displayName,
      image: user.photoURL,
    };

    const res = await feedbackMutation.mutateAsync(feedback);
    res.acknowledged
      ? notify('success', 'Feedback Submitted Successfully!')
      : notify('error', 'Feedback Submit Failed!');

    reset();
    setClassId(null);
    document.getElementById('feedback_modal').close();
  };

  useEffect(() => {
    document.title = 'Class Assignment | EduHive';
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['Class Details']} />
      </div>

      {/* Feedback Button */}
      <div className="mb-4">
        <button
          onClick={() => {
            document.getElementById('feedback_modal').showModal();
          }}
          className="bg-skyBlue text-white hover:bg-green font-medium px-6 py-2.5 rounded-full"
        >
          Teaching Evaluation Report
        </button>
      </div>

      {/* Assignments */}
      <div className="bg-[#fffcfc] overflow-x-auto mt-4">
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
                        className="text-green hover:text-hoverGreen"
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

              <button className="bg-skyBlue text-white hover:bg-green font-medium px-6 py-2.5 rounded-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box w-4/5 max-w-5xl bg-gray-200">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Feedback Us
          </h2>

          <div className="modal-action">
            <form
              onSubmit={handleSubmit(handleFeedback)}
              method="dialog"
              className="w-full flex flex-col items-center gap-4"
            >
              <textarea
                {...register('feedback')}
                className="w-full px-2 py-1 rounded-xl outline-none resize-none"
                rows={5}
                name="feedback"
                id="feedback"
                placeholder="Give feedback"
                required
              ></textarea>
              <div>
                <Rating setRating={setRating} />
              </div>

              <button className="bg-skyBlue text-white hover:bg-green font-medium px-6 py-2.5 rounded-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EnrollClassDetails;
