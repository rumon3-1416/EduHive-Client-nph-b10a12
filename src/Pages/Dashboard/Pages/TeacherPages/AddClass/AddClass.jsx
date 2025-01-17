import React from 'react';
import DashboardContainer from '../../../Components/Container/DashboardContainer';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';

const AddClass = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const handleAddClass = async details => {
    const { data } = await axiosSecure.post('/add_class', details);
    console.log(data);
  };

  return (
    <div>
      <DashboardContainer>
        <section>
          <h2 className="text-3xl font-semibold">Add Class</h2>

          <div>
            <form
              onSubmit={handleSubmit(handleAddClass)}
              className="flex flex-col gap-3"
            >
              <input
                {...register('title')}
                className="px-4 py-2 border-2 border-gray-300 rounded-md outline-none"
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
              />
              <div>
                <input
                  {...register('image')}
                  className="px-4 py-2 border-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Image"
                  required
                />
                <input
                  {...register('price')}
                  className="px-4 py-2 border-2 border-gray-300 rounded-md outline-none"
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  required
                />
              </div>
              <div>
                <input
                  {...register('name')}
                  className="px-4 py-2 border-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  name="name"
                  id="name"
                  value={user.displayName}
                  readOnly
                  required
                />
                <input
                  {...register('email')}
                  className="px-4 py-2 border-2 border-gray-300 rounded-md outline-none"
                  type="text"
                  name="email"
                  id="email"
                  value={user.email}
                  readOnly
                  required
                />
              </div>
              <textarea
                {...register('description')}
                className="px-4 py-2 border-2 border-gray-300 rounded-md outline-none resize-none"
                rows={4}
                name="description"
                id="description"
                placeholder="Description"
                required
              ></textarea>
              <button
                className="px-4 py-2 border-2 border-green-300 rounded-md"
                type="submit"
              >
                Add Class
              </button>
            </form>
          </div>
        </section>
      </DashboardContainer>
    </div>
  );
};

export default AddClass;
