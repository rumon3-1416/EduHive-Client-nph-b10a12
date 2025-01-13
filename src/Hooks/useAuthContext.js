import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
