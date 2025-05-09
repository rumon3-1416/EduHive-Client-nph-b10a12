import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import Button from '../../../../../components/Button';

const AddAssignment = ({ addAssignment, setShowForm }) => {
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm();
  const { darkTheme } = useAuthContext();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAdd = async data => {
    await addAssignment({ ...data, deadline: startDate });
  };

  // Input Fields and label classes
  const labelClasses = `font-semibold mb-2 ${
    darkTheme ? 'text-gray-100' : 'text-gray-700'
  }`;
  const inputClasses = `w-full px-4 py-2 mb-4 border-[1.5px] focus:border-skyBlue rounded-md outline-none transition-colors duration-300 ${
    darkTheme
      ? 'bg-dark3 text-gray-200 border-gray-500'
      : 'bg-[#f1f1f1] text-gray-800'
  }`;

  return (
    <div className="bg-[#00000053] w-full min-h-screen max-h-screen backdrop-blur-sm p-4 sm:p-10 md:p-12 fixed inset-0 overflow-hidden flex flex-col justify-center items-center z-50">
      <div
        className={`animate__animated animate__zoomIn px-8 py-10 max-h-full w-full max-w-[1232px] mx-auto shadow-lg overflow-y-auto rounded-md ${
          darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
        }`}
      >
        <h3
          className={`text-3xl font-bold text-center mb-12 ${
            darkTheme ? 'text-light2' : 'text-gray-800'
          }`}
        >
          Add Assignment
        </h3>

        <form onSubmit={handleSubmit(handleAdd)} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className={labelClasses}>
                Title
              </label>
              <input
                {...register('title')}
                className={inputClasses}
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                required
              />
            </div>

            {/* Deadline */}
            <div className="flex flex-col">
              <label htmlFor="deadline" className={labelClasses}>
                Deadline
              </label>
              <DatePicker
                className={inputClasses}
                id="deadline"
                name="deadline"
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
          </div>

          {/* description */}
          <div className="flex flex-col">
            <label htmlFor="description" className={labelClasses}>
              Description
            </label>
            <textarea
              {...register('description')}
              className={`${inputClasses} rounded-lg outline-none resize-none`}
              id="description"
              name="description"
              placeholder="Write a short description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center flex gap-4 justify-center">
            <button
              onClick={() => setShowForm(false)}
              type="button"
              className="bg-orange-500 text-white hover:bg-orange-600 font-medium px-6 py-2 rounded-md transition-all duration-200"
            >
              Cancel
            </button>
            <Button type="submit" text="text-base">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
