/**
 * @file LoginAskPage.tsx
 * @description Login role selector matching the supplied auth design.
 * @module src/pages/auth/LoginAskPage
 */
import { AuthLayout } from '@/components/layout';
import { ROUTES } from '@/constants';
import { AUTH_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

import { AuthRoleCard } from './auth.shared';

const LoginAskPage = () => (
  <>
    <PageSEO description={SEO_META.login.description} title={SEO_META.login.title} />
    <AuthLayout
      wide
      description={AUTH_COPY.loginAsk.description}
      title={AUTH_COPY.loginAsk.title}
    >
      <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-start">
        <AuthRoleCard
          accountType="parent"
          body={AUTH_COPY.roles.parent.roleDescription}
          cta={AUTH_COPY.loginAsk.parentCta}
          title={AUTH_COPY.roles.parent.label}
          to={ROUTES.LOGIN_PARENT}
        />
        <AuthRoleCard
          accountType="school"
          body={AUTH_COPY.roles.school.roleDescription}
          cta={AUTH_COPY.loginAsk.schoolCta}
          title={AUTH_COPY.roles.school.label}
          to={ROUTES.LOGIN_SCHOOL}
        />
      </div>
    </AuthLayout>
  </>
);

export default LoginAskPage;
