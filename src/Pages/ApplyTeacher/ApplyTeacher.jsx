import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../../components/Container/Container';
import useImgUrl from '../../Hooks/useImgUrl';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SectionHeading from '../Home/Shared/SectionHeading';

const ApplyTeacher = () => {
  const { register, handleSubmit } = useForm();
  const { user, role, notify } = useAuthContext();
  const generateImgUrl = useImgUrl();
  const axiosSecure = useAxiosSecure();

  // Load Status
  const {
    data: status = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['requested'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/check_request');
      return data.status || null;
    },
  });

  // Post Request
  const mutation = useMutation({
    mutationFn: async data => {
      const res = await axiosSecure.post('/teacher_request', data);
      return res.data;
    },
  });
  // Handle Request
  const handleTeacher = async data => {
    const imageUrl = await generateImgUrl(data.image[0]);

    const res = await mutation.mutateAsync({
      ...data,
      image: imageUrl,
    });

    res.acknowledged && notify('success', 'Request Submitted Successfully');
    refetch();
  };

  useEffect(() => {
    document.title = 'Teach on | EduHive';
  }, []);

  return (
    <div className="bg-blueBg min-h-[80vh]">
      <Container>
        <section className="py-8">
          <SectionHeading heading={['Teach on EduHive']} />

          <div className="">
            {(status === 'pending' || status === 'rejected') && (
              <div className="mb-2">
                <Link to="/dashboard/my_request">
                  <button className="text-white bg-skyBlue hover:bg-green px-4 py-2 rounded-full shadow-lg">
                    My Request
                  </button>
                </Link>
              </div>
            )}

            {role === 'admin' ? (
              <div className="text-center">
                <h2 className="text-infoBlue text-2xl font-semibold">
                  You are already an Admin.
                </h2>
                <h3 className="text-errorRed text-xl font-semibold mt-2">{`You Can't be a Teacher.`}</h3>
              </div>
            ) : status === 'pending' && role === 'student' ? (
              <div className="text-center">
                <h2 className="text-yellow-400 text-2xl font-semibold">
                  Your Request is Pending.
                </h2>
                <h3 className="text-infoBlue text-xl font-semibold mt-2">
                  Wait for admin response.
                </h3>
              </div>
            ) : status === 'approved' || role === 'teacher' ? (
              <div className="text-center">
                <h2 className="text-infoBlue text-2xl font-semibold">
                  You are already a Teacher
                </h2>
                <h3 className="text-successGreen text-xl font-semibold mt-2">
                  Good Luck!
                </h3>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(handleTeacher)}
                className="bg-white px-8 py-10 mt-8 rounded-xl shadow-xl grid grid-cols-1"
              >
                {/* Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Name
                  </label>
                  <input
                    {...register('name')}
                    className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 mb-8 rounded-lg outline-none"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                  />
                </div>

                {/* Title */}
                <div className="flex flex-col">
                  <label
                    className="text-gray-700 font-semibold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    {...register('title')}
                    className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 mb-8 rounded-lg outline-none"
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Title"
                    required
                  />
                </div>

                {/* Image & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image */}
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
                      name="image"
                      id="image"
                      type="file"
                      accept="image/*"
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      {...register('email')}
                      className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 mb-8 rounded-lg outline-none"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={user.email}
                      readOnly
                      required
                    />
                  </div>
                </div>

                {/* Experience & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Experience */}
                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold mb-2"
                      htmlFor="experience"
                    >
                      Experience
                    </label>
                    <select
                      {...register('experience')}
                      className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 mb-8 rounded-lg outline-none"
                      defaultValue=""
                      name="experience"
                      id="experience"
                      required
                    >
                      <option value="" disabled>
                        Select Experience
                      </option>
                      <option value="beginner">Beginner</option>
                      <option value="mid-level">Mid Level</option>
                      <option value="experienced">Experienced</option>
                    </select>
                  </div>
                  {/* Category */}
                  <div className="flex flex-col">
                    <label
                      className="text-gray-700 font-semibold mb-2"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <select
                      {...register('category')}
                      className="bg-[#f1f1f1] text-gray-800 w-full px-4 py-3 mb-8 rounded-lg outline-none"
                      defaultValue=""
                      name="category"
                      id="category"
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="web-development">Web Development</option>
                      <option value="app-development">App Development</option>
                      <option value="digital-marketing">
                        Digital-Marketing
                      </option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="data-science">Data Science</option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button
                    className="bg-skyBlue text-white hover:bg-green text-xl font-semibold px-12 py-2.5 rounded-full"
                    disabled={isLoading}
                    type="submit"
                  >
                    {status === 'rejected'
                      ? 'Request to Another'
                      : 'Submit For Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ApplyTeacher;
