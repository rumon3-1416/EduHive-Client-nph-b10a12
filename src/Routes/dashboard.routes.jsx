import Profile from '../Pages/Dashboard/Pages/Profile/Profile';
import DashboardLayout from '../Layouts/DashboardLayout';
import PrivateNavigator from './PrivateNavigator';
import StudentEnrolls from '../Pages/Dashboard/Pages/StudentPages/StudentEnrolls/StudentEnrolls';
import AddClass from '../Pages/Dashboard/Pages/TeacherPages/AddClass/AddClass';
import TeacherNavigator from './TeacherNavigator';
import TeacherClasses from '../Pages/Dashboard/Pages/TeacherPages/TeacherClasses/TeacherClasses';
import TeacherRequests from '../Pages/Dashboard/Pages/AdminPages/TeacherRequests/TeacherRequests';
import AdminNavigator from './AdminNavigator';
import Users from '../Pages/Dashboard/Pages/AdminPages/Users/Users';
import AllTeacherClasses from '../Pages/Dashboard/Pages/AdminPages/AllTeacherClasses/AllTeachersClasses';

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
      element: <Profile />,
    },
    {
      path: 'my_enroll_class',
      element: <StudentEnrolls />,
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
  ],
};

export default dashboardRouter;
