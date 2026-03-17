/**
 * @file SignUpParentPage.tsx
 * @description Phase 4 stub for the parent signup route.
 * @module src/pages/auth/SignUpParentPage
 */
import { AuthLayout } from '@/components/layout';
import { AUTH_COPY, COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const SignUpParentPage = () => (
  <>
    <PageSEO description={SEO_META.signup.description} title={SEO_META.signup.title} />
    <AuthLayout
      description={COMMON_COPY.layout.stubDescriptions.auth}
      title={AUTH_COPY.signUp.parentCta}
    >
      <p className="font-body text-base text-muted">
        {COMMON_COPY.layout.stubDescriptions.auth}
      </p>
    </AuthLayout>
  </>
);

export default SignUpParentPage;
