import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../Layouts/MainLayout';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import SignIn from '../Pages/Authentication/SignIn';
import SignUp from '../Pages/Authentication/SignUp';
import Profile from '../Pages/Dashboard/Profile/Profile';
import AllClasses from '../Pages/AllClasses/AllClasses';
import ApplyTeacher from '../Pages/ApplyTeacher/ApplyTeacher';
import DashboardLayout from '../Layouts/DashboardLayout';

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
      {
        path: '/all_classes',
        element: <AllClasses />,
      },
      {
        path: '/apply_teacher',
        element: <ApplyTeacher />,
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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
]);

export default router;
