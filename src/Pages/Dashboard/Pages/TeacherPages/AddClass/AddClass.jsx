import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../Home/Shared/SectionHeading';
import Button from '../../../../../components/Button';

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, notify, darkTheme } = useAuthContext();
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

  useEffect(() => {
    document.title = 'Add Class | EduHive';
  }, []);

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
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['Add Class']} />
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleAddClass)}
          className={`${
            darkTheme ? 'bg-dark5' : 'bg-white'
          } px-8 py-10 mt-8 rounded-md shadow-xl grid grid-cols-1`}
        >
          {/* Title */}
          <div className="flex flex-col">
            <label className={labelClasses} htmlFor="title">
              Title
            </label>
            <input
              {...register('title')}
              className={inputClasses}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
            />
          </div>

          {/* Image & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
            <div className="flex flex-col">
              <label className={labelClasses} htmlFor="image">
                Image
              </label>
              <input
                {...register('image')}
                className={inputClasses}
                type="text"
                name="image"
                id="image"
                placeholder="Image"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClasses} htmlFor="price">
                Price
              </label>
              <input
                {...register('price')}
                className={inputClasses}
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                required
              />
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
            <div className="flex flex-col">
              <label className={labelClasses} htmlFor="name">
                Name
              </label>
              <input
                {...register('name')}
                className={`${inputClasses} cursor-not-allowed`}
                type="text"
                name="name"
                id="name"
                value={user.displayName}
                readOnly
                required
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClasses} htmlFor="email">
                Email
              </label>
              <input
                {...register('email')}
                className={`${inputClasses} cursor-not-allowed`}
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
            <label className={labelClasses} htmlFor="description">
              Description
            </label>
            <textarea
              {...register('description')}
              className={`${inputClasses} resize-none`}
              rows={4}
              name="description"
              id="description"
              placeholder="Description"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button text="text-base" type="submit">
              {mutation.isPending ? 'Adding...' : 'Add Class'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
