import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

const AddAssignment = ({ addAssignment }) => {
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAdd = async data => {
    await addAssignment({ ...data, deadline: startDate });
  };

  return (
    <div className="bg-[#00000053] w-full min-h-screen max-h-screen backdrop-blur-sm p-8 sm:p-10 md:p-12 fixed inset-0 overflow-hidden flex flex-col justify-center items-center z-50">
      <div
        className={`animate__animated animate__zoomIn px-8 bg-white py-10 max-h-full w-full max-w-[1232px] mx-auto shadow-lg overflow-y-auto rounded-xl`}
      >
        <h3 className={`text-3xl font-bold text-center mb-12text-gray-800`}>
          Add Assignment
        </h3>

        <form onSubmit={handleSubmit(handleAdd)} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="mb-6 flex flex-col">
              <label htmlFor="title" className={`font-semibold mb-2`}>
                Title
              </label>
              <input
                {...register('title')}
                className={`bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 rounded-lg outline-none`}
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                required
              />
            </div>

            {/* Deadline */}
            <div className="mb-6 flex flex-col">
              <label htmlFor="deadline" className={`font-semibold mb-2`}>
                Deadline
              </label>
              <DatePicker
                className={`bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 rounded-lg outline-none`}
                id="deadline"
                name="deadline"
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
          </div>

          {/* description */}
          <div className="mb-6 flex flex-col">
            <label htmlFor="description" className={`font-semibold mb-2`}>
              Description
            </label>
            <textarea
              {...register('description')}
              className={`bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 rounded-lg outline-none resize-none`}
              id="description"
              name="description"
              placeholder="Write a short description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-skyBlue text-white hover:bg-green font-medium px-6 py-2.5 rounded-full"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
