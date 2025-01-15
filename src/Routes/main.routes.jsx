import MainLayout from '../Layouts/MainLayout';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import AllClasses from '../Pages/AllClasses/AllClasses';
import ApplyTeacher from '../Pages/ApplyTeacher/ApplyTeacher';
import ClassDetails from '../Pages/ClassDetails/ClassDetails';
import PrivateNavigator from './PrivateNavigator';
import Payment from '../Pages/Payment/Payment';

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
      element: (
        <PrivateNavigator>
          <ClassDetails />
        </PrivateNavigator>
      ),
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
