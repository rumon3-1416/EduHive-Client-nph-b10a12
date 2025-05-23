import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import SectionHeading from '../../../Home/Shared/SectionHeading';
import { useAuthContext } from '../../../../Hooks/useAuthContext';

const Profile = () => {
  const { darkTheme } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const { data: profileInfo = {} } = useQuery({
    queryKey: ['profileInfo'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/user_profile');
      return data;
    },
  });

  const { _id, email, displayName, role, photoURL, joined } = profileInfo;

  useEffect(() => {
    document.title = 'Profile | EduHive';
  }, []);

  return (
    <div className="">
      <div className="hidden md:block">
        <SectionHeading heading={['My Profile']} />
      </div>

      <div className="">
        <div className="flex items-center gap-8">
          <img
            className="bg-white w-40 max-w-40 p-1 aspect-square object-cover border-4 border-lightBlue rounded-full"
            src={photoURL}
            alt=""
          />

          <div className="">
            <p className="text-skyBlue text-4xl font-bold">{displayName}</p>
            <p
              className={`text-lg font-semibold mt-2 ${
                darkTheme && 'text-gray-200'
              }`}
            >
              {role?.charAt(0)?.toUpperCase() + role?.slice(1) + ''} of EduHive
            </p>
          </div>
        </div>

        <div
          className={`${
            darkTheme ? 'bg-dark5 text-gray-100' : 'bg-white'
          } p-10 mt-10 rounded-md shadow-xl`}
        >
          <div className="text-left text-lg font-medium w-fit grid grid-cols-[1fr,_auto] gap-x-8 gap-y-1">
            <p className="text-nowrap">Name :</p>
            <p className="break-all">{displayName}</p>
            <p className="text-nowrap">Role : </p>
            <p className="break-all">
              {role?.charAt(0)?.toUpperCase() + role?.slice(1) + ''}
            </p>
            <p className="text-nowrap">Email :</p>
            <p className="break-all">{email}</p>
            <p className="text-nowrap">Number :</p>
            <p className="break-all">{_id?.slice(0, 15)}</p>
            <p className="text-nowrap">Joined At :</p>
            <p className="break-all">{new Date(joined).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
