/**
 * @file SignUpAskPage.tsx
 * @description Phase 4 stub for the signup role selector route.
 * @module src/pages/auth/SignUpAskPage
 */
import { AuthLayout } from '@/components/layout';
import { AUTH_COPY, COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const SignUpAskPage = () => (
  <>
    <PageSEO description={SEO_META.signup.description} title={SEO_META.signup.title} />
    <AuthLayout
      description={COMMON_COPY.layout.stubDescriptions.auth}
      title={AUTH_COPY.signUp.roleSelectorTitle}
    >
      <p className="font-body text-base text-muted">
        {AUTH_COPY.signUp.roleSelectorBody}
      </p>
    </AuthLayout>
  </>
);

export default SignUpAskPage;
