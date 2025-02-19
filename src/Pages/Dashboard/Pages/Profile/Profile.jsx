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
            className="bg-white max-w-40 p-1 aspect-square object-cover border-4 border-lightBlue rounded-full"
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
          } p-10 mt-10 rounded-2xl shadow-xl`}
        >
          <div className="text-left text-lg font-medium w-fit grid grid-cols-[1fr,_auto] gap-x-8 gap-y-1">
            <p>Name :</p>
            <p>{displayName}</p>
            <p>Role : </p>
            <p>{role?.charAt(0)?.toUpperCase() + role?.slice(1) + ''}</p>
            <p>Email :</p>
            <p>{email}</p>
            <p>Number :</p>
            <p>{_id?.slice(0, 15)}</p>
            <p>Joined At :</p>
            <p>{new Date(joined).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
