import React from 'react';
import { useForm } from 'react-hook-form';
import Container from '../../components/Container/Container';
import useImgUrl from '../../Hooks/useImgUrl';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuthContext } from '../../Hooks/useAuthContext';

const ApplyTeacher = () => {
  const { register, handleSubmit } = useForm();

  const { user } = useAuthContext();
  const generateImgUrl = useImgUrl();
  const axiosSecure = useAxiosSecure();

  const handleTeacher = async data => {
    const imageUrl = await generateImgUrl(data.image[0]);

    const res = await axiosSecure.post('/teacher_request', {
      ...data,
      image: imageUrl,
    });
  };

  return (
    <div>
      <Container>
        <section>
          <h1 className="text-4xl font-semibold">Teach on EduHive</h1>

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
            <button type="submit">Submit For Review</button>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default ApplyTeacher;
