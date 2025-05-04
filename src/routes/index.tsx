import { Navigate, useRoutes } from 'react-router-dom';
import CompactLayout from '../layouts/compact';
import MainLayout from '../layouts/main';
import {
  FailurePage,
  HomePage,
  Page404,
  Page500,
  SuccessPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'success', element: <SuccessPage /> },
        { path: 'failure', element: <FailurePage /> },
        { path: 'canceled', element: <Navigate to="/" replace /> }, 
      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
