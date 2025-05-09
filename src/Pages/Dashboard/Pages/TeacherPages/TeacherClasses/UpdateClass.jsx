import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import Button from '../../../../../components/Button';

const UpdateClass = ({ classData, handleUpdate, setUpdateModal }) => {
  const { _id, title, image, price, description } = classData;

  const { darkTheme } = useAuthContext();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const { register, handleSubmit } = useForm();

  const updateClass = async data => {
    await handleUpdate({ _id, ...data });
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
          Update Class
        </h3>

        <form onSubmit={handleSubmit(updateClass)}>
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
              defaultValue={title}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* Image */}
            <div className="flex flex-col">
              <label htmlFor="image" className={labelClasses}>
                Image
              </label>
              <input
                {...register('image')}
                className={inputClasses}
                id="image"
                type="text"
                name="image"
                placeholder="Image"
                defaultValue={image}
                required
              />
            </div>
            {/* Price */}
            <div className="flex flex-col">
              <label htmlFor="price" className={labelClasses}>
                Price
              </label>
              <input
                {...register('price')}
                className={inputClasses}
                id="price"
                type="number"
                name="price"
                placeholder="Price"
                defaultValue={price}
                required
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
              className={`${inputClasses} resize-none`}
              id="description"
              name="description"
              placeholder="Write a short description"
              defaultValue={description}
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center flex gap-4 justify-center">
            <button
              onClick={() => {
                setUpdateModal({ show: false, classData: {} });
              }}
              className="bg-orange-500 text-white hover:bg-orange-600 font-medium px-6 py-2 rounded-md transition-all duration-200"
              type="button"
            >
              cancel
            </button>
            <Button type="submit" text="text-base">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
