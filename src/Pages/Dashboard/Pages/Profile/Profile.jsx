import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import DashboardContainer from '../../Components/Container/DashboardContainer';

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
    <div>
      <DashboardContainer>
        <section>
          <p className="text-3xl font-semibold">Profile</p>

          <div>
            <img
              className="max-w-48 aspect-square object-cover rounded-full"
              src={photoURL}
              alt=""
            />
            <p>Role : {role}</p>
            <p>Name : {displayName}</p>
            <p>Email : {email}</p>
            <p>Number : {_id?.slice(0, 15)}</p>
          </div>
        </section>
      </DashboardContainer>
    </div>
  );
};

export default Profile;
