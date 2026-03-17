/**
 * @file index.tsx
 * @description Browser router configuration for all Phase 4 public, auth, and dashboard route stubs.
 * @module src/router
 */
import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/constants';
import LoginAskPage from '@/pages/auth/LoginAskPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpAskPage from '@/pages/auth/SignUpAskPage';
import SignUpParentPage from '@/pages/auth/SignUpParentPage';
import SignUpSchoolPage from '@/pages/auth/SignUpSchoolPage';
import ChildrenPage from '@/pages/dashboard/ChildrenPage';
import MyBookingsPage from '@/pages/dashboard/MyBookingsPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import SchoolProfilePage from '@/pages/dashboard/SchoolProfilePage';
import AboutUsPage from '@/pages/public/AboutUsPage';
import HomePage from '@/pages/public/HomePage';
import OurServicesPage from '@/pages/public/OurServicesPage';
import PoliciesPage from '@/pages/public/PoliciesPage';
import SchoolFootballLeaguePage from '@/pages/public/SchoolFootballLeaguePage';
import UpcomingEventsPage from '@/pages/public/UpcomingEventsPage';
import CurricularPage from '@/pages/public/services/CurricularPage';
import ExtraCurricularPage from '@/pages/public/services/ExtraCurricularPage';
import HolidayCampsPage from '@/pages/public/services/HolidayCampsPage';
import WraparoundChildcarePage from '@/pages/public/services/WraparoundChildcarePage';
import CaseStudiesPage from '@/pages/public/knowledge/CaseStudiesPage';
import FAQsPage from '@/pages/public/knowledge/FAQsPage';
import FreeActivitiesPage from '@/pages/public/knowledge/FreeActivitiesPage';
import KnowledgeHubPage from '@/pages/public/knowledge/KnowledgeHubPage';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { RoleRoute } from './RoleRoute';

const routeErrorElement = (
  <div className="p-8 font-body text-base text-danger">
    Route failed to load.
  </div>
);

export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <HomePage />, errorElement: routeErrorElement },
  { path: ROUTES.ABOUT, element: <AboutUsPage />, errorElement: routeErrorElement },
  { path: ROUTES.SERVICES, element: <OurServicesPage />, errorElement: routeErrorElement },
  { path: ROUTES.POLICIES, element: <PoliciesPage />, errorElement: routeErrorElement },
  {
    path: ROUTES.UPCOMING_EVENTS,
    element: <UpcomingEventsPage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_CURRICULAR,
    element: <CurricularPage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_EXTRA,
    element: <ExtraCurricularPage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_HOLIDAY,
    element: <HolidayCampsPage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.SERVICES_WRAPAROUND,
    element: <WraparoundChildcarePage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_HUB,
    element: <KnowledgeHubPage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_CASE_STUDIES,
    element: <CaseStudiesPage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_FREE,
    element: <FreeActivitiesPage />,
    errorElement: routeErrorElement,
  },
  {
    path: ROUTES.KNOWLEDGE_FAQS,
    element: <FAQsPage />,
    errorElement: routeErrorElement,
  },
  { path: ROUTES.LEAGUE, element: <SchoolFootballLeaguePage />, errorElement: routeErrorElement },
  {
    element: <PublicOnlyRoute />,
    errorElement: routeErrorElement,
    children: [
      { path: ROUTES.LOGIN, element: <LoginAskPage /> },
      { path: ROUTES.LOGIN_PARENT, element: <LoginPage /> },
      { path: ROUTES.LOGIN_SCHOOL, element: <LoginPage /> },
      { path: ROUTES.SIGNUP, element: <SignUpAskPage /> },
      { path: ROUTES.SIGNUP_PARENT, element: <SignUpParentPage /> },
      { path: ROUTES.SIGNUP_SCHOOL, element: <SignUpSchoolPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: routeErrorElement,
    children: [
      {
        element: <RoleRoute allowedRoles={['parent']} />,
        children: [
          { path: ROUTES.DASHBOARD_PROFILE, element: <ProfilePage /> },
          { path: ROUTES.DASHBOARD_BOOKINGS, element: <MyBookingsPage /> },
          { path: ROUTES.DASHBOARD_CHILDREN, element: <ChildrenPage /> },
        ],
      },
      {
        element: <RoleRoute allowedRoles={['school']} />,
        children: [{ path: ROUTES.DASHBOARD_SCHOOL, element: <SchoolProfilePage /> }],
      },
    ],
  },
]);
