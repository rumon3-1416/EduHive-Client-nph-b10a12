import axios from 'axios';
import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ServerUrl,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const authContext = useAuthContext();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        if (err.status === 401 || err.status === 403) {
          authContext?.signOutUser();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [authContext]);

  return axiosInstance;
};

export default useAxiosSecure;
