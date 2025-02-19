import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';

const UpdateClass = ({ classData, handleUpdate }) => {
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

  return (
    <div className="bg-[#00000053] w-full min-h-screen max-h-screen backdrop-blur-sm p-4 sm:p-10 md:p-12 fixed inset-0 overflow-hidden flex flex-col justify-center items-center z-50">
      <div
        className={`animate__animated animate__zoomIn px-8 py-10 max-h-full w-full max-w-[1232px] mx-auto shadow-lg overflow-y-auto rounded-xl ${
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
          <div className="mb-6 flex flex-col">
            <label htmlFor="title" className={`font-semibold mb-2`}>
              Title
            </label>
            <input
              {...register('title')}
              className={`${
                darkTheme
                  ? 'bg-dark3 text-gray-200'
                  : 'bg-[#f1f1f1] text-gray-800'
              } w-full px-4 py-3 rounded-lg outline-none`}
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              defaultValue={title}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="mb-6 flex flex-col">
              <label htmlFor="image" className={`font-semibold mb-2`}>
                Image
              </label>
              <input
                {...register('image')}
                className={`${
                  darkTheme
                    ? 'bg-dark3 text-gray-200'
                    : 'bg-[#f1f1f1] text-gray-800'
                } w-full px-4 py-3 rounded-lg outline-none`}
                id="image"
                type="text"
                name="image"
                placeholder="Image"
                defaultValue={image}
                required
              />
            </div>
            {/* Price */}
            <div className="mb-6 flex flex-col">
              <label htmlFor="price" className={`font-semibold mb-2`}>
                Price
              </label>
              <input
                {...register('price')}
                className={`${
                  darkTheme
                    ? 'bg-dark3 text-gray-200'
                    : 'bg-[#f1f1f1] text-gray-800'
                } w-full px-4 py-3 rounded-lg outline-none`}
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
          <div className="mb-6 flex flex-col">
            <label htmlFor="description" className={`font-semibold mb-2`}>
              Description
            </label>
            <textarea
              {...register('description')}
              className={`${
                darkTheme
                  ? 'bg-dark3 text-gray-200'
                  : 'bg-[#f1f1f1] text-gray-800'
              } w-full px-4 py-3 rounded-lg outline-none resize-none`}
              id="description"
              name="description"
              placeholder="Write a short description"
              defaultValue={description}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
