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
import Button from '../../../../../components/Button';

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
  const { user, notify, darkTheme } = useAuthContext();
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
        <Button
          onClick={() => {
            document.getElementById('feedback_modal').showModal();
          }}
        >
          Teaching Evaluation Report
        </Button>
      </div>

      {/* Assignments */}
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
              <td
                colSpan={5}
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

      {/* Assignment Modal */}
      <dialog id="assignment_modal" className="modal">
        <div
          className={`modal-box w-4/5 max-w-5xl rounded-md ${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-gray-100'
          }`}
        >
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
                  className={`w-full px-2 py-1 rounded-md border-[1.5px] focus:border-skyBlue outline-none resize-none ${
                    darkTheme && 'bg-dark3 text-light2'
                  }`}
                  rows={5}
                  name="assignment"
                  id="assignment"
                  placeholder="Write assignment"
                  required
                ></textarea>
              )}

              <div className="text-center flex gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('assignment_modal').close();
                  }}
                  className="bg-orange-500 text-white hover:bg-orange-600 font-medium px-6 py-2 rounded-md transition-all duration-200"
                  type="button"
                >
                  cancel
                </button>
                <Button className="">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div
          className={`modal-box w-4/5 max-w-5xl rounded-md ${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-gray-100'
          }`}
        >
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
                className={`w-full px-2 py-1 rounded-md border-[1.5px] focus:border-skyBlue outline-none resize-none ${
                  darkTheme && 'bg-dark3 text-light2'
                }`}
                rows={5}
                name="feedback"
                id="feedback"
                placeholder="Give feedback"
                required
              ></textarea>
              <div>
                <Rating setRating={setRating} />
              </div>

              <div className="text-center flex gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('feedback_modal').close();
                  }}
                  className="bg-orange-500 text-white hover:bg-orange-600 font-medium px-6 py-2 rounded-md transition-all duration-200"
                  type="button"
                >
                  cancel
                </button>
                <Button>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EnrollClassDetails;
