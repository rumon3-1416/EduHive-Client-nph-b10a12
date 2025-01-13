import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../Layouts/MainLayout';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import SignIn from '../Pages/Authentication/SignIn';
import SignUp from '../Pages/Authentication/SignUp';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Profile from '../Pages/Dashboard/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
]);

export default router;
