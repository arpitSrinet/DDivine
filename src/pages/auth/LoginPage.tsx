/**
 * @file LoginPage.tsx
 * @description Parent and school login flow. Submits credentials directly to the
 *   API — no intermediate OTP step on login.
 * @module src/pages/auth/LoginPage
 */
import { useMemo, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { AuthLayout } from '@/components/layout';
import { RateLimitMessage } from '@/components/ui';
import { ROUTES } from '@/constants';
import { AUTH_COPY } from '@/copy';
import { authService } from '@/services';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';
import { useAuthStore } from '@/store';
import { isApiError } from '@/types';
import { emailSchema } from '@/utils';

import {
  AuthPrimaryButton,
  AuthStatusMessage,
  AuthTextField,
  authTextLinkClassName,
  getAuthErrorMessage,
  getAuthRoleFromPathname,
  getZodFieldErrors,
  type TFieldErrors,
} from './auth.shared';

const credentialSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, 'Enter password'),
});

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = useMemo(() => getAuthRoleFromPathname(location.pathname), [location.pathname]);
  const locationState = location.state as { email?: string; notice?: string } | null;
  const setAuth = useAuthStore((state) => state.setAuth);

  const returnUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const raw = params.get('returnUrl');
    return raw ? decodeURIComponent(raw) : null;
  }, [location.search]);

  const [email, setEmail] = useState(locationState?.email ?? '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<TFieldErrors>({});
  const [notice] = useState(locationState?.notice ?? '');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = (field: string) => {
    if (!fieldErrors[field]) {
      return;
    }

    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    const parsed = credentialSchema.safeParse({ email, password });

    if (!parsed.success) {
      setFieldErrors(getZodFieldErrors(parsed.error));
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const session = await authService.login({ email, password, role });
      setAuth(session);
      navigate(
        returnUrl ?? (role === 'school' ? ROUTES.DASHBOARD_SCHOOL : ROUTES.DASHBOARD_PROFILE),
        { replace: true },
      );
    } catch (error) {
      if (isApiError(error) && error.status === 429) {
        setSubmitError(`__rate_limit__:${error.retryAfter ?? 60}`);
      } else {
        setSubmitError(getAuthErrorMessage(error, 'Login failed. Please try again.'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageSEO description={SEO_META.login.description} title={SEO_META.login.title} />
      <AuthLayout
        description={AUTH_COPY.roles[role].loginDescription}
        title={AUTH_COPY.login.title}
      >
        <form className="space-y-6" noValidate onSubmit={(e) => { void handleSubmit(e); }}>
          <AuthTextField
            autoComplete="email"
            error={fieldErrors.email}
            label="Enter email address"
            onChange={(event) => {
              setEmail(event.target.value);
              clearFieldError('email');
            }}
            placeholder="Email"
            type="email"
            value={email}
          />

          <AuthTextField
            autoComplete="current-password"
            error={fieldErrors.password}
            label="Enter password"
            onChange={(event) => {
              setPassword(event.target.value);
              clearFieldError('password');
            }}
            placeholder="Password"
            rightElement={(
              <button
                className="text-[#9B9B9B] transition hover:text-[#10295C]"
                onClick={() => setShowPassword((current) => !current)}
                type="button"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 10C4.2 6.75 6.85 5 10 5C13.15 5 15.8 6.75 17.5 10C15.8 13.25 13.15 15 10 15C6.85 15 4.2 13.25 2.5 10Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="10" cy="10" fill="currentColor" r="2.2" />
                </svg>
              </button>
            )}
            type={showPassword ? 'text' : 'password'}
            value={password}
          />

          {notice ? <AuthStatusMessage message={notice} tone="success" /> : null}

          {submitError && submitError.startsWith('__rate_limit__:') ? (
            <RateLimitMessage retryAfter={Number(submitError.split(':')[1])} />
          ) : submitError ? (
            <AuthStatusMessage message={submitError} tone="error" />
          ) : null}

          <AuthPrimaryButton isLoading={isSubmitting} type="submit">
            {AUTH_COPY.login.submitLabel}
          </AuthPrimaryButton>

          <p className="font-copy text-[1rem] leading-7 text-[#5C5C5C]">
            {AUTH_COPY.shared.noAccount}{' '}
            <Link
              className={authTextLinkClassName}
              to={role === 'school' ? ROUTES.SIGNUP_SCHOOL : ROUTES.SIGNUP_PARENT}
            >
              {AUTH_COPY.shared.createAccount}
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default LoginPage;
