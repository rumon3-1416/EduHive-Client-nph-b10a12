import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import SectionHeading from '../../../Home/Shared/SectionHeading';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import classesIcon from '../../../../assets/icons/classes.png';
import enrollsIcon from '../../../../assets/icons/enrolls.png';
import teacherIcon from '../../../../assets/icons/teachers.png';
import studentsIcon from '../../../../assets/icons/student.png';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

const Overview = () => {
  const { darkTheme } = useAuthContext();
  const axiosPublic = useAxiosPublic();

  // Overview
  const { data: overview = {} } = useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/overview`);
      return data;
    },
  });

  // Chart
  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/classes`);
      return data.classes;
    },
  });

  const { totalClass, totalEnrolled, totalTeachers, totalStudents } = overview;

  return (
    <div className="">
      <div className="hidden md:block">
        <SectionHeading heading={['Overview']} />
      </div>

      {/* Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div
          className={`${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
          } p-6 rounded-md shadow-lg`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-successGreen w-12 p-2.5 rounded-full">
              <img
                className="w-full aspect-square object-cover"
                src={classesIcon}
                alt=""
              />
            </div>
            <p className="text-3xl font-bold">{totalClass}</p>
          </div>
          <h2 className="text-lg font-medium mt-2">Total Classes</h2>
        </div>
        <div
          className={`${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
          } p-6 rounded-md shadow-lg`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-skyBlue w-12 p-2.5 rounded-full">
              <img
                className="w-full aspect-square object-cover"
                src={enrollsIcon}
                alt=""
              />
            </div>
            <p className="text-3xl font-bold">{totalEnrolled}</p>
          </div>
          <h2 className="text-lg font-medium mt-2">Total Enrolls</h2>
        </div>
        <div
          className={`${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
          } p-6 rounded-md shadow-lg`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-orange-400 w-12 p-2.5 rounded-full">
              <img
                className="w-full aspect-square object-cover"
                src={teacherIcon}
                alt=""
              />
            </div>
            <p className="text-3xl font-bold">{totalTeachers}</p>
          </div>
          <h2 className="text-lg font-medium mt-2">Total Teachers</h2>
        </div>
        <div
          className={`${
            darkTheme ? 'bg-dark5 text-light2' : 'bg-white'
          } p-6 rounded-md shadow-lg`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-pink-500 w-12 p-2.5 rounded-full">
              <img
                className="w-full aspect-square object-cover"
                src={studentsIcon}
                alt=""
              />
            </div>
            <p className="text-3xl font-bold">{totalStudents}</p>
          </div>
          <h2 className="text-lg font-medium mt-2">Total Students</h2>
        </div>
      </section>

      {/* Graph */}
      <section>
        <h2
          className={`text-2xl font-semibold mb-4 ${
            darkTheme && 'text-gray-200'
          }`}
        >
          Classes Enrolled
        </h2>

        <div
          className={`${
            darkTheme ? 'bg-dark5' : 'bg-white'
          } py-4 sm:px-4 sm:py-6 rounded-md shadow-lg`}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={classes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar
                dataKey="total_enrolment"
                fill="#3498db"
                barSize={30}
                name="Enrolment"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Overview;
