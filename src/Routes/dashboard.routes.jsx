import PrivateNavigator from './Navigators/PrivateNavigator';
import StudentNavigator from './Navigators/StudentNavigator';
import TeacherNavigator from './Navigators/TeacherNavigator';
import AdminNavigator from './Navigators/AdminNavigator';

import DashboardLayout from '../Layouts/DashboardLayout';
import Profile from '../Pages/Dashboard/Pages/Profile/Profile';
import Users from '../Pages/Dashboard/Pages/AdminPages/Users/Users';
import TeacherClasses from '../Pages/Dashboard/Pages/TeacherPages/TeacherClasses/TeacherClasses';
import TeachClassDetails from '../Pages/Dashboard/Pages/TeacherPages/ClassDetails/TeachClassDetails';
import AllTeacherClasses from '../Pages/Dashboard/Pages/AdminPages/AllTeacherClasses/AllTeachersClasses';
import EnrollClassDetails from '../Pages/Dashboard/Pages/StudentPages/EnrollClassDetails/EnrollClassDetails';
import MyRequest from '../Pages/Dashboard/Pages/StudentPages/MyRequest';
import Overview from '../Pages/Dashboard/Pages/OverView/Overview';

import AddClass from '../Pages/Dashboard/Pages/TeacherPages/AddClass/AddClass';
import TeacherRequests from '../Pages/Dashboard/Pages/AdminPages/TeacherRequests/TeacherRequests';
import StudentEnrolls from '../Pages/Dashboard/Pages/StudentPages/StudentEnrolls/StudentEnrolls';

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
      element: <Overview />,
    },
    {
      path: 'my_enrolls',
      element: <StudentEnrolls />,
    },
    {
      path: 'my_request',
      element: <MyRequest />,
    },
    {
      path: 'add_class',
      element: (
        <TeacherNavigator>
          <AddClass />
        </TeacherNavigator>
      ),
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
      path: 'teacher_requests',
      element: (
        <AdminNavigator>
          <TeacherRequests />
        </AdminNavigator>
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
      path: 'enroll_class_details/:id',
      element: (
        <StudentNavigator>
          <EnrollClassDetails />
        </StudentNavigator>
      ),
    },
    {
      path: 'teach_class_details/:id',
      element: (
        <TeacherNavigator>
          <TeachClassDetails />
        </TeacherNavigator>
      ),
    },
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
};

export default dashboardRouter;
