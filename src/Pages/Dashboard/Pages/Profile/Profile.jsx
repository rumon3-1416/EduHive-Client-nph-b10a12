import React, { useEffect } from 'react';

const Profile = () => {
  useEffect(() => {
    document.title = 'Profile | EduHive';
  }, []);

  return (
    <div>
      <p className="text-3xl font-semibold">Profile</p>
    </div>
  );
};

export default Profile;
