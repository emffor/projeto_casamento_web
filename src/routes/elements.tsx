import { ElementType, Suspense, lazy } from 'react';
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

// COMMON
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));

// Novas páginas de checkout
export const SuccessPage = Loadable(lazy(() => import('../pages/SuccessPage')));
export const FailurePage = Loadable(lazy(() => import('../pages/FailurePage')));
