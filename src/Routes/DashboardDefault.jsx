import React from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import TeacherRequests from '../Pages/Dashboard/Pages/AdminPages/TeacherRequests/TeacherRequests';
import StudentEnrolls from '../Pages/Dashboard/Pages/StudentPages/StudentEnrolls/StudentEnrolls';
import AddClass from '../Pages/Dashboard/Pages/TeacherPages/AddClass/AddClass';

const DashboardDefault = () => {
  const { role } = useAuthContext();

  if (role === 'teacher') {
    return <AddClass />;
  } else if (role === 'admin') {
    return <TeacherRequests />;
  } else {
    return <StudentEnrolls />;
  }
};

export default DashboardDefault;
