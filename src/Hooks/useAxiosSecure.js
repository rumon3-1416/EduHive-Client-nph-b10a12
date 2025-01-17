import axios from 'axios';
import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ServerUrl,
});

const useAxiosSecure = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    // Request Interceptor
    const reqInterceptor = axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('access_token');
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['user_email'] = user.email;

        return config;
      },
      error => {
        console.log('ReqIntError --> ', error.message);
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    const resInterceptor = axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log('ResIntError --> ', error.message);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;
