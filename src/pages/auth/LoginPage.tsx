/**
 * @file LoginPage.tsx
 * @description Phase 4 stub for the login form route.
 * @module src/pages/auth/LoginPage
 */
import { AuthLayout } from '@/components/layout';
import { COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const LoginPage = () => (
  <>
    <PageSEO description={SEO_META.login.description} title={SEO_META.login.title} />
    <AuthLayout
      description={COMMON_COPY.layout.stubDescriptions.auth}
      title={COMMON_COPY.actions.logIn}
    >
      <p className="font-body text-base text-muted">
        {COMMON_COPY.layout.stubDescriptions.auth}
      </p>
    </AuthLayout>
  </>
);

export default LoginPage;
