import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../Home/Shared/SectionHeading';

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, notify } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async details => {
      const { data } = await axiosSecure.post('/add_class', details);
      return data;
    },
  });

  const handleAddClass = async details => {
    const res = await mutation.mutateAsync(details);
    res.acknowledged
      ? (notify('success', 'Class added Successfully'),
        reset(),
        navigate('/dashboard/my_classes'))
      : notify('error', 'Class add Failed!');
  };

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['Add Class']} />
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleAddClass)}
          className="bg-white px-8 py-10 mt-8 rounded-xl shadow-xl grid grid-cols-1"
        >
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              {...register('title')}
              className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-2.5 mb-8 rounded-lg outline-none"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
            />
          </div>

          {/* Image & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                className="text-gray-700 font-semibold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                {...register('image')}
                className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-2.5 mb-8 rounded-lg outline-none"
                type="text"
                name="image"
                id="image"
                placeholder="Image"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-gray-700 font-semibold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                {...register('price')}
                className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-2.5 mb-8 rounded-lg outline-none"
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                required
              />
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                className="text-gray-700 font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                {...register('name')}
                className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-2.5 mb-8 rounded-lg outline-none"
                type="text"
                name="name"
                id="name"
                value={user.displayName}
                readOnly
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register('email')}
                className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-2.5 mb-8 rounded-lg outline-none"
                type="text"
                name="email"
                id="email"
                value={user.email}
                readOnly
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label
              className="text-gray-700 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              {...register('description')}
              className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-2.5 mb-8 rounded-lg outline-none resize-none"
              rows={4}
              name="description"
              id="description"
              placeholder="Description"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              className="bg-skyBlue text-white hover:bg-green text-xl font-semibold px-12 py-2.5 rounded-full"
              type="submit"
            >
              {mutation.isPending ? 'Adding...' : 'Add Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
