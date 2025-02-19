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

const Overview = () => {
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
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="bg-successGreen w-12 p-2.5 rounded-full">
            <img
              className="w-full aspect-square object-cover"
              src={classesIcon}
              alt=""
            />
          </div>
          <p className="text-3xl font-bold mt-2">{totalClass}</p>
          <h2 className="text-lg font-medium">Total Classes</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="bg-skyBlue w-12 p-2.5 rounded-full">
            <img
              className="w-full aspect-square object-cover"
              src={enrollsIcon}
              alt=""
            />
          </div>
          <p className="text-3xl font-bold mt-2">{totalEnrolled}</p>
          <h2 className="text-lg font-medium">Total Enrolls</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="bg-orange-400 w-12 p-2.5 rounded-full">
            <img
              className="w-full aspect-square object-cover"
              src={teacherIcon}
              alt=""
            />
          </div>
          <p className="text-3xl font-bold mt-2">{totalTeachers}</p>
          <h2 className="text-lg font-medium">Total Teachers</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="bg-pink-500 w-12 p-2.5 rounded-full">
            <img
              className="w-full aspect-square object-cover"
              src={studentsIcon}
              alt=""
            />
          </div>
          <p className="text-3xl font-bold mt-2">{totalStudents}</p>
          <h2 className="text-lg font-medium">Total Students</h2>
        </div>
      </section>

      {/* Graph */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Classes Enrolled</h2>

        <div className="bg-white py-4 sm:px-4 sm:py-6 rounded-2xl shadow-lg">
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
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Overview;
