import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
//
import {
  // Auth
  LoginCoverPage,
  VerifyCodePage,
  RegisterCoverPage,
  ResetPasswordPage,
  LoginBackgroundPage,
  LoginIllustrationPage,
  RegisterBackgroundPage,
  RegisterIllustrationPage,
  // Common
  Page404,
  Page500,
  HomePage,
  PaymentPage,
  ComingSoonPage,
  MaintenancePage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Non layout
    {
      path: 'auth',
      children: [
        { path: 'login-cover', element: <LoginCoverPage /> },
        { path: 'register-cover', element: <RegisterCoverPage /> },
      ],
    },
    // Main layout
    {
      element: <MainLayout />,
      children: [{ element: <HomePage />, index: true }],
    },
    // Simple layout
    {
      element: <SimpleLayout />,
      children: [
        { path: 'payment', element: <PaymentPage /> },
        {
          path: 'auth',
          children: [
            { path: 'login-background', element: <LoginBackgroundPage /> },
            { path: 'login-illustration', element: <LoginIllustrationPage /> },
            { path: 'register-background', element: <RegisterBackgroundPage /> },
            { path: 'register-illustration', element: <RegisterIllustrationPage /> },
          ],
        },
      ],
    },
    // Compact layout
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: 'reset-code', element: <ResetPasswordPage /> },
        { path: 'verify-code', element: <VerifyCodePage /> },
        {
          path: 'auth',
          children: [
            { path: 'reset-code', element: <ResetPasswordPage /> },
            { path: 'verify-code', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
