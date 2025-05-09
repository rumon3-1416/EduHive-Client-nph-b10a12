import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import SectionHeading from '../../../Home/Shared/SectionHeading';

const MyRequest = () => {
  const axiosSecure = useAxiosSecure();

  // Load Status
  const { data: requestData = {} } = useQuery({
    queryKey: ['requested'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/check_request');
      return data;
    },
  });
  const { title, experience, category, status } = requestData;

  useEffect(() => {
    document.title = 'My Request | EduHive';
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <SectionHeading heading={['My Request']} />
      </div>

      <div className="bg-white w-fit p-10 rounded-md shadow-xl flex flex-col justify-center items-center">
        <div className="text-left">
          <p className="text-lg font-medium">Title : {title}</p>
          <p className="text-lg font-medium">Category : {category}</p>
          <p className="text-lg font-medium">Experience : {experience}</p>
          <p className="text-lg font-medium">
            Status :{' '}
            <span
              className={
                status === 'pending'
                  ? 'text-yellow-500'
                  : status === 'approved'
                  ? 'text-green-500'
                  : status === 'rejected'
                  ? 'text-red-500'
                  : ''
              }
            >
              {status?.charAt(0)?.toUpperCase() + status?.slice(1) + ''}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
