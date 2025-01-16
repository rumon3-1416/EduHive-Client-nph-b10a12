import Profile from '../Pages/Dashboard/Pages/Profile/Profile';
import DashboardLayout from '../Layouts/DashboardLayout';
import PrivateNavigator from './PrivateNavigator';
import TeacherNavigator from './TeacherNavigator';
import TeacherClasses from '../Pages/Dashboard/Pages/TeacherPages/TeacherClasses/TeacherClasses';
import AdminNavigator from './AdminNavigator';
import Users from '../Pages/Dashboard/Pages/AdminPages/Users/Users';
import AllTeacherClasses from '../Pages/Dashboard/Pages/AdminPages/AllTeacherClasses/AllTeachersClasses';
import DashboardDefault from './dashboardDefault';

const dashboardRouter = {
  path: '/dashboard',
  element: (
    <PrivateNavigator>
      <DashboardLayout />
    </PrivateNavigator>
  ),
  children: [
    {
      index: true,
      element: <DashboardDefault />,
    },
    {
      path: 'my_classes',
      element: (
        <TeacherNavigator>
          <TeacherClasses />
        </TeacherNavigator>
      ),
    },
    {
      path: 'users',
      element: (
        <AdminNavigator>
          <Users />
        </AdminNavigator>
      ),
    },
    {
      path: 'all_classes',
      element: (
        <AdminNavigator>
          <AllTeacherClasses />
        </AdminNavigator>
      ),
    },
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
};

export default dashboardRouter;
