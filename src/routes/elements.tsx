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
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const PaymentPage = Loadable(lazy(() => import('../pages/PaymentPage')));
export const Pricing01Page = Loadable(lazy(() => import('../pages/Pricing01Page')));
export const Pricing02Page = Loadable(lazy(() => import('../pages/Pricing02Page')));
export const SupportPage = Loadable(lazy(() => import('../pages/SupportPage')));

// COMPONENTS
export const ComponentsPage = Loadable(lazy(() => import('../pages/components/ComponentsPage')));
export const DemoAnimatePage = Loadable(lazy(() => import('../pages/components/DemoAnimatePage')));
export const DemoCarouselsPage = Loadable(
  lazy(() => import('../pages/components/DemoCarouselsPage'))
);
export const DemoCountUpPage = Loadable(lazy(() => import('../pages/components/DemoCountUpPage')));
export const DemoFormValidationPage = Loadable(
  lazy(() => import('../pages/components/DemoFormValidationPage'))
);
export const DemoIconsPage = Loadable(lazy(() => import('../pages/components/DemoIconsPage')));
export const DemoImagePage = Loadable(lazy(() => import('../pages/components/DemoImagePage')));
export const DemoLabelPage = Loadable(lazy(() => import('../pages/components/DemoLabelPage')));
export const DemoLightboxPage = Loadable(
  lazy(() => import('../pages/components/DemoLightboxPage'))
);
export const DemoMarkdownPage = Loadable(
  lazy(() => import('../pages/components/DemoMarkdownPage'))
);
export const DemoMegaMenuPage = Loadable(
  lazy(() => import('../pages/components/DemoMegaMenuPage'))
);
export const DemoNavigationBarPage = Loadable(
  lazy(() => import('../pages/components/DemoNavigationBarPage'))
);
export const DemoPlayerPage = Loadable(lazy(() => import('../pages/components/DemoPlayerPage')));
export const DemoScrollbarPage = Loadable(
  lazy(() => import('../pages/components/DemoScrollbarPage'))
);
export const DemoTextMaxLinePage = Loadable(
  lazy(() => import('../pages/components/DemoTextMaxLinePage'))
);
