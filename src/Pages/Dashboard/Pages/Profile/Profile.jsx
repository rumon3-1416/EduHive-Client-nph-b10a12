import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import SectionHeading from '../../../Home/Shared/SectionHeading';

const Profile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: profileInfo = {} } = useQuery({
    queryKey: ['profileInfo'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/user_profile');
      return data;
    },
  });

  const { _id, email, displayName, role, photoURL } = profileInfo;

  useEffect(() => {
    document.title = 'Profile | EduHive';
  }, []);

  return (
    <div className="">
      <div className="hidden md:block">
        <SectionHeading heading={['My Profile']} />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="bg-white p-10 rounded-xl shadow-xl flex flex-col justify-center items-center">
          <img
            className="bg-white max-w-44 p-1 aspect-square object-cover border-4 border-lightBlue rounded-full"
            src={photoURL}
            alt=""
          />
          <p className="text-skyBlue text-center text-xl font-semibold my-2">
            {role?.charAt(0)?.toUpperCase() + role?.slice(1) + ''}
          </p>
          <div className="text-left">
            <p className="text-lg font-medium">Name : {displayName}</p>
            <p className="text-lg font-medium">Email : {email}</p>
            <p className="text-lg font-medium">Number : {_id?.slice(0, 15)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
