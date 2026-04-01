/**
 * @file index.tsx
 * @description Browser router configuration for the public, auth, and dashboard shells.
 * @module src/router
 */
import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { ErrorFallback, PageErrorBoundary } from '@/errors';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { RoleRoute } from './RoleRoute';

const HomePage = lazy(() => import('@/pages/public/HomePage'));
const AboutUsPage = lazy(() => import('@/pages/public/AboutUsPage'));
const OurServicesPage = lazy(() => import('@/pages/public/OurServicesPage'));
const PoliciesPage = lazy(() => import('@/pages/public/PoliciesPage'));
const ContactUsPage = lazy(() => import('@/pages/public/ContactUsPage'));
const UpcomingEventsPage = lazy(() => import('@/pages/public/UpcomingEventsPage'));
const CurricularPage = lazy(() => import('@/pages/public/services/CurricularPage'));
const ExtraCurricularPage = lazy(() => import('@/pages/public/services/ExtraCurricularPage'));
const HolidayCampsPage = lazy(() => import('@/pages/public/services/HolidayCampsPage'));
const WraparoundChildcarePage = lazy(() => import('@/pages/public/services/WraparoundChildcarePage'));
const KnowledgeHubPage = lazy(() => import('@/pages/public/knowledge/KnowledgeHubPage'));
const CaseStudiesPage = lazy(() => import('@/pages/public/knowledge/CaseStudiesPage'));
const FreeActivitiesPage = lazy(() => import('@/pages/public/knowledge/FreeActivitiesPage'));
const FAQsPage = lazy(() => import('@/pages/public/knowledge/FAQsPage'));
const SchoolFootballLeaguePage = lazy(() => import('@/pages/public/SchoolFootballLeaguePage'));
const LoginAskPage = lazy(() => import('@/pages/auth/LoginAskPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const SignUpParentPage = lazy(() => import('@/pages/auth/SignUpParentPage'));
const SignUpSchoolPage = lazy(() => import('@/pages/auth/SignUpSchoolPage'));
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage'));
const MyBookingsPage = lazy(() => import('@/pages/dashboard/MyBookingsPage'));
const ChildrenPage = lazy(() => import('@/pages/dashboard/ChildrenPage'));
const SchoolProfilePage = lazy(() => import('@/pages/dashboard/SchoolProfilePage'));

const routeErrorElement = <ErrorFallback level="page" />;

const renderLazyPage = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <PageErrorBoundary>
    <Suspense
      fallback={(
        <div className="p-8 font-body text-base text-muted">
          {COMMON_COPY.status.loadingPage}
        </div>
      )}
    >
      <Component />
    </Suspense>
  </PageErrorBoundary>
);

export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: renderLazyPage(HomePage), errorElement: routeErrorElement },
  { path: ROUTES.ABOUT, element: renderLazyPage(AboutUsPage), errorElement: routeErrorElement },
  { path: ROUTES.SERVICES, element: renderLazyPage(OurServicesPage), errorElement: routeErrorElement },
  { path: ROUTES.POLICIES, element: renderLazyPage(PoliciesPage), errorElement: routeErrorElement },
  { path: ROUTES.CONTACT, element: renderLazyPage(ContactUsPage), errorElement: routeErrorElement },
  {
    path: ROUTES.UPCOMING_EVENTS,
    element: renderLazyPage(UpcomingEventsPage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_CURRICULAR,
    element: renderLazyPage(CurricularPage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_EXTRA,
    element: renderLazyPage(ExtraCurricularPage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_HOLIDAY,
    element: renderLazyPage(HolidayCampsPage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_WRAPAROUND,
    element: renderLazyPage(WraparoundChildcarePage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_HUB,
    element: renderLazyPage(KnowledgeHubPage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_CASE_STUDIES,
    element: renderLazyPage(CaseStudiesPage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_FREE,
    element: renderLazyPage(FreeActivitiesPage),
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_FAQS,
    element: renderLazyPage(FAQsPage),
    errorElement: routeErrorElement,
  },
  { path: ROUTES.LEAGUE, element: renderLazyPage(SchoolFootballLeaguePage), errorElement: routeErrorElement },
  {
    element: <PublicOnlyRoute />,
    errorElement: routeErrorElement,
    children: [
      { path: ROUTES.LOGIN, element: renderLazyPage(LoginAskPage) },
      { path: ROUTES.LOGIN_PARENT, element: renderLazyPage(LoginPage) },
      { path: ROUTES.LOGIN_SCHOOL, element: renderLazyPage(LoginPage) },
      { path: ROUTES.SIGNUP, element: <Navigate replace to={ROUTES.LOGIN} /> },
      { path: ROUTES.SIGNUP_PARENT, element: renderLazyPage(SignUpParentPage) },
      { path: ROUTES.SIGNUP_SCHOOL, element: renderLazyPage(SignUpSchoolPage) },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: routeErrorElement,
    children: [
      {
        element: <RoleRoute allowedRoles={['parent']} />,
        children: [
          { path: ROUTES.DASHBOARD_PROFILE, element: renderLazyPage(ProfilePage) },
          { path: ROUTES.DASHBOARD_BOOKINGS, element: renderLazyPage(MyBookingsPage) },
          { path: ROUTES.DASHBOARD_CHILDREN, element: renderLazyPage(ChildrenPage) },
        ],
      },
      {
        element: <RoleRoute allowedRoles={['school']} />,
        children: [{ path: ROUTES.DASHBOARD_SCHOOL, element: renderLazyPage(SchoolProfilePage) }],
      },
    ],
  },
]);
