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
  SupportPage,
  Pricing01Page,
  Pricing02Page,
  ComingSoonPage,
  MaintenancePage,
  // Components
  DemoIconsPage,
  DemoImagePage,
  DemoLabelPage,
  ComponentsPage,
  DemoPlayerPage,
  DemoAnimatePage,
  DemoCountUpPage,
  DemoLightboxPage,
  DemoMarkdownPage,
  DemoMegaMenuPage,
  DemoCarouselsPage,
  DemoScrollbarPage,
  DemoTextMaxLinePage,
  DemoNavigationBarPage,
  DemoFormValidationPage,
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
      children: [
        { element: <HomePage />, index: true },
        { path: 'support', element: <SupportPage /> },

        // Demo Components
        {
          path: 'components',
          children: [
            { element: <ComponentsPage />, index: true },
            { path: 'animate', element: <DemoAnimatePage /> },
            { path: 'carousel', element: <DemoCarouselsPage /> },
            { path: 'count-up', element: <DemoCountUpPage /> },
            { path: 'form-validation', element: <DemoFormValidationPage /> },
            { path: 'icons', element: <DemoIconsPage /> },
            { path: 'image', element: <DemoImagePage /> },
            { path: 'label', element: <DemoLabelPage /> },
            { path: 'lightbox', element: <DemoLightboxPage /> },
            { path: 'markdown', element: <DemoMarkdownPage /> },
            { path: 'mega-menu', element: <DemoMegaMenuPage /> },
            { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
            { path: 'scroll', element: <DemoScrollbarPage /> },
            { path: 'player', element: <DemoPlayerPage /> },
            { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
          ],
        },
      ],
    },
    // Simple layout
    {
      element: <SimpleLayout />,
      children: [
        { path: 'payment', element: <PaymentPage /> },
        { path: 'pricing-01', element: <Pricing01Page /> },
        { path: 'pricing-02', element: <Pricing02Page /> },
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
