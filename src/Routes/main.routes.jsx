import PrivateNavigator from './Navigators/PrivateNavigator';

import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Error from '../Pages/Error/Error';
import Payment from '../Pages/Payment/Payment';
import AllClasses from '../Pages/AllClasses/AllClasses';
import ClassDetails from '../Pages/ClassDetails/ClassDetails';
import ApplyTeacher from '../Pages/ApplyTeacher/ApplyTeacher';

const mainRouter = {
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
      element: (
        <PrivateNavigator>
          <ApplyTeacher />
        </PrivateNavigator>
      ),
    },
    {
      path: '/class_details/:id',
      element: <ClassDetails />,
    },
    {
      path: '/payment/:id',
      element: (
        <PrivateNavigator>
          <Payment />
        </PrivateNavigator>
      ),
    },
  ],
};
export default mainRouter;
