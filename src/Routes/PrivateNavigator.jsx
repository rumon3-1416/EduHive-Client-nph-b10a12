import React from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const PrivateNavigator = ({ children }) => {
  const { loading, user } = useAuthContext();
  const { pathname } = useLocation();

  if (loading) {
    return <Loading />;
  } else if (user) {
    return children;
  } else {
    return <Navigate to="/signin" state={{ pathname }} replace={true} />;
  }
};

export default PrivateNavigator;
