import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import CompactLayout from '../layouts/compact';
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
// elementos importados
import {
  FailurePage,
  // Common
  HomePage,
  LoginBackgroundPage,
  // Auth
  LoginCoverPage,
  LoginIllustrationPage,
  Page404,
  Page500,
  RegisterBackgroundPage,
  RegisterCoverPage,
  RegisterIllustrationPage,
  ResetPasswordPage,
  // Checkout
  SuccessPage,
  VerifyCodePage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // rotas sem layout
    {
      path: 'auth',
      children: [
        { path: 'login-cover', element: <LoginCoverPage /> },
        { path: 'register-cover', element: <RegisterCoverPage /> },
      ],
    },
    // Main layout (página principal e as novas /success e /failure)
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'success', element: <SuccessPage /> },
        { path: 'failure', element: <FailurePage /> },
      ],
    },
    // Simple layout (outras auth pages)
    {
      element: <SimpleLayout />,
      children: [
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
    // Compact layout (erros e reset)
    {
      element: <CompactLayout />,
      children: [
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
    // fallback
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
