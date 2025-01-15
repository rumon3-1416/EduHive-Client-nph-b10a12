import { createBrowserRouter } from 'react-router-dom';

import mainRouter from './main.routes';
import dashboardRouter from './dashboard.routes';

import SignIn from '../Pages/Authentication/SignIn';
import SignUp from '../Pages/Authentication/SignUp';

const router = createBrowserRouter([
  mainRouter,
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  dashboardRouter,
]);

export default router;
