import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginBackgroundPage = Loadable(
  lazy(() => import('../pages/auth/LoginBackgroundPage'))
);
export const LoginCoverPage = Loadable(lazy(() => import('../pages/auth/LoginCoverPage')));
export const LoginIllustrationPage = Loadable(
  lazy(() => import('../pages/auth/LoginIllustrationPage'))
);
export const RegisterBackgroundPage = Loadable(
  lazy(() => import('../pages/auth/RegisterBackgroundPage'))
);
export const RegisterCoverPage = Loadable(lazy(() => import('../pages/auth/RegisterCoverPage')));
export const RegisterIllustrationPage = Loadable(
  lazy(() => import('../pages/auth/RegisterIllustrationPage'))
);
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));

// COMMON
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
