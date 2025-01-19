import React from 'react';
import Container from '../../../components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

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

  return (
    <div>
      <h2 className="text-3xl font-semibold">My Request</h2>

      <div>
        <p>Title : {title}</p>
        <p>Category : {category}</p>
        <p>Experience : {experience}</p>
        <p>
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
  );
};

export default MyRequest;
