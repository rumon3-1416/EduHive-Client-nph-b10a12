import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../../components/Container/Container';
import useImgUrl from '../../Hooks/useImgUrl';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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
    <div>
      <Container>
        <section>
          <h1 className="text-4xl font-semibold">Teach on EduHive</h1>
          {status && <Link to="/dashboard/my_request">My Request</Link>}

          {role === 'admin' ? (
            <div>
              <h2 className="text-4xl font-semibold">
                You are already a Admin.
              </h2>
              <h3 className="text-3xl font-semibold">{`You Can't be a Teacher.`}</h3>
            </div>
          ) : status === 'pending' && role === 'student' ? (
            <div>
              <h2 className="text-4xl font-semibold">
                Your Request is Pending.
              </h2>
              <h3 className="text-3xl font-semibold">
                Wait for admin response.
              </h3>
            </div>
          ) : status === 'approved' || role === 'teacher' ? (
            <div>
              <h2 className="text-3xl font-semibold">
                You are already a Teacher
              </h2>
              <h1 className="text-4xl font-medium">Good Luck!</h1>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleTeacher)}
              className="grid grid-cols-1"
            >
              <input
                {...register('name')}
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                required
              />
              <label htmlFor="image">
                <input
                  {...register('image')}
                  name="image"
                  id="image"
                  type="file"
                  accept="image/*"
                  required
                />
              </label>
              <input
                {...register('email')}
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                value={user.email}
                readOnly
                required
              />
              <input
                {...register('title')}
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                required
              />
              <select
                {...register('experience')}
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
              <select
                {...register('category')}
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
                <option value="digital-marketing">Digital-Marketing</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="data-science">Data Science</option>
              </select>
              <button disabled={isLoading} type="submit">
                {status === 'rejected'
                  ? 'Request to Another'
                  : 'Submit For Review'}
              </button>
            </form>
          )}
        </section>
      </Container>
    </div>
  );
};

export default ApplyTeacher;
