import React from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const TeacherNavigator = ({ children }) => {
  const { role } = useAuthContext();

  if (role === 'teacher') {
    return children;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default TeacherNavigator;
