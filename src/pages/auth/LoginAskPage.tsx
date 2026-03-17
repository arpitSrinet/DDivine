/**
 * @file LoginAskPage.tsx
 * @description Phase 4 stub for the login role selector route.
 * @module src/pages/auth/LoginAskPage
 */
import { AuthLayout } from '@/components/layout';
import { AUTH_COPY, COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const LoginAskPage = () => (
  <>
    <PageSEO description={SEO_META.login.description} title={SEO_META.login.title} />
    <AuthLayout
      description={COMMON_COPY.layout.stubDescriptions.auth}
      title={AUTH_COPY.login.roleSelectorTitle}
    >
      <p className="font-body text-base text-muted">
        {AUTH_COPY.login.roleSelectorBody}
      </p>
    </AuthLayout>
  </>
);

export default LoginAskPage;
