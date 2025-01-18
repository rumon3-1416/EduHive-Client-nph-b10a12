import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

const StudentNavigator = ({ children }) => {
  const { role } = useAuthContext();

  if (role === 'student') {
    return children;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default StudentNavigator;
