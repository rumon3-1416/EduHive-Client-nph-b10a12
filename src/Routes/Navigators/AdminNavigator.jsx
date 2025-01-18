import React from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const AdminNavigator = ({ children }) => {
  const { role } = useAuthContext();

  if (role === 'admin') {
    return children;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default AdminNavigator;
