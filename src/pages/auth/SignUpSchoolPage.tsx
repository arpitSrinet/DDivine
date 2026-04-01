/**
 * @file SignUpSchoolPage.tsx
 * @description Multi-step school and academy signup flow aligned to the supplied auth designs.
 * @module src/pages/auth/SignUpSchoolPage
 */
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { AuthLayout } from '@/components/layout';
import { RateLimitMessage } from '@/components/ui';
import { ROUTES } from '@/constants';
import { AUTH_COPY } from '@/copy';
import { authService } from '@/services';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';
import { isApiError } from '@/types';
import { emailSchema, passwordSchema } from '@/utils';

import {
  AuthBackButton,
  AuthPrimaryButton,
  AuthSelectField,
  AuthStatusMessage,
  AuthStepIndicator,
  AuthTextField,
  getApiFieldErrors,
  getAuthErrorMessage,
  getZodFieldErrors,
  type TFieldErrors,
} from './auth.shared';

const schoolInfoSchema = z.object({
  registrationNumber: z.string().trim().min(1, 'Enter registration number'),
  schoolName: z.string().trim().min(1, 'Enter school name'),
  schoolType: z.string().trim().min(1, 'Select school type'),
  website: z.string().trim().min(1, 'Enter website URL'),
});

const adminInfoSchema = z
  .object({
    confirmPassword: z.string().trim().min(1, 'Confirm password'),
    email: emailSchema,
    fullName: z.string().trim().min(1, 'Enter your full name'),
    password: passwordSchema,
    termsAccepted: z.boolean().refine((value) => value, 'You must agree to the terms and privacy policy'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

const schoolTypes = [
  { label: 'Primary school', value: 'primary-school' },
  { label: 'Secondary school', value: 'secondary-school' },
  { label: 'Academy trust', value: 'academy-trust' },
  { label: 'Independent school', value: 'independent-school' },
] as const;

const initialValues = {
  confirmPassword: '',
  email: '',
  fullName: '',
  password: '',
  registrationNumber: '',
  schoolName: '',
  schoolType: '',
  termsAccepted: false,
  website: '',
};

const SignUpSchoolPage = () => {
  const navigate = useNavigate();
  const schoolLogoInputRef = useRef<HTMLInputElement | null>(null);
  const verificationDocumentInputRef = useRef<HTMLInputElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<TFieldErrors>({});
  const [formValues, setFormValues] = useState(initialValues);
  const [schoolLogoFile, setSchoolLogoFile] = useState<File | null>(null);
  const [verificationDocumentFile, setVerificationDocumentFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleInputChange =
    (field: keyof typeof initialValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextValue =
        event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value;

      setFormValues((current) => ({
        ...current,
        [field]: nextValue,
      }));
      clearFieldError(field);
      setSubmitError('');
    };

  const validateCurrentStep = (): boolean => {
    if (currentStep === 0) {
      const parsed = schoolInfoSchema.safeParse({
        registrationNumber: formValues.registrationNumber,
        schoolName: formValues.schoolName,
        schoolType: formValues.schoolType,
        website: formValues.website,
      });

      if (!parsed.success) {
        setFieldErrors(getZodFieldErrors(parsed.error));
        return false;
      }

      return true;
    }

    if (currentStep === 1) {
      const nextErrors: TFieldErrors = {};

      if (!schoolLogoFile) {
        nextErrors.schoolLogoFile = 'Upload a school logo';
      }

      if (!verificationDocumentFile) {
        nextErrors.verificationDocumentFile = 'Upload a verification document';
      }

      if (Object.keys(nextErrors).length > 0) {
        setFieldErrors(nextErrors);
        return false;
      }

      return true;
    }

    const parsed = adminInfoSchema.safeParse({
      confirmPassword: formValues.confirmPassword,
      email: formValues.email,
      fullName: formValues.fullName,
      password: formValues.password,
      termsAccepted: formValues.termsAccepted,
    });

    if (!parsed.success) {
      setFieldErrors(getZodFieldErrors(parsed.error));
      return false;
    }

    return true;
  };

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    if (!validateCurrentStep()) {
      return;
    }

    setFieldErrors({});
    setCurrentStep((current) => current + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    if (!validateCurrentStep()) {
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await authService.signUpSchool({
        adminEmail: formValues.email,
        adminFullName: formValues.fullName,
        password: formValues.password,
        registrationNumber: formValues.registrationNumber,
        schoolLogoFileName: schoolLogoFile?.name,
        schoolName: formValues.schoolName,
        schoolType: formValues.schoolType,
        verificationDocumentFileName: verificationDocumentFile?.name,
        website: formValues.website,
      });

      navigate(ROUTES.LOGIN_SCHOOL, {
        state: {
          email: formValues.email,
          notice: 'School account created. Log in to continue.',
        },
      });
    } catch (error) {
      const apiFieldErrors = getApiFieldErrors(error);

      if (Object.keys(apiFieldErrors).length > 0) {
        setFieldErrors(apiFieldErrors);
      } else if (isApiError(error) && error.status === 429) {
        setSubmitError(`__rate_limit__:${error.retryAfter ?? 60}`);
      } else {
        setSubmitError(getAuthErrorMessage(error, 'School signup failed. Please try again.'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileRow = ({
    file,
    onClear,
  }: {
    file: File;
    onClear: () => void;
  }) => (
    <div className="flex items-center justify-between border border-[#CFCFCF] px-3 py-3">
      <div className="flex items-center gap-3">
        <span className="bg-[#4B72F2] px-2 py-1 font-copy text-[0.85rem] font-medium text-white">
          {file.name.split('.').pop()?.toUpperCase() ?? 'FILE'}
        </span>
        <span className="font-copy text-[0.98rem] text-[#3C3C3C]">
          {file.name}
        </span>
      </div>
      <button className="text-[#7A7A7A] transition hover:text-[#10295C]" onClick={onClear} type="button">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 6H15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M8 6V4.8C8 4.36 8.36 4 8.8 4H11.2C11.64 4 12 4.36 12 4.8V6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M6.2 6.8L6.8 15.2C6.84 15.66 7.22 16 7.68 16H12.32C12.78 16 13.16 15.66 13.2 15.2L13.8 6.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <PageSEO description={SEO_META.signup.description} title={SEO_META.signup.title} />
      <AuthLayout description={AUTH_COPY.schoolSignup.description} title={AUTH_COPY.schoolSignup.title}>
        {currentStep > 0 ? (
          <AuthBackButton
            onClick={() => {
              setFieldErrors({});
              setSubmitError('');
              setCurrentStep((current) => current - 1);
            }}
          />
        ) : null}

        <AuthStepIndicator currentStep={currentStep} steps={AUTH_COPY.schoolSignup.steps} />

        {currentStep === 0 ? (
          <form className="space-y-5" noValidate onSubmit={handleNext}>
            <AuthTextField
              error={fieldErrors.schoolName}
              label="School Name"
              onChange={handleInputChange('schoolName')}
              placeholder="Enter school name"
              value={formValues.schoolName}
            />

            <AuthSelectField
              error={fieldErrors.schoolType}
              label="Type"
              onChange={handleInputChange('schoolType')}
              options={schoolTypes}
              placeholder="School type"
              value={formValues.schoolType}
            />

            <AuthTextField
              error={fieldErrors.registrationNumber}
              label="Registration number"
              onChange={handleInputChange('registrationNumber')}
              placeholder="Enter registration number"
              value={formValues.registrationNumber}
            />

            <AuthTextField
              error={fieldErrors.website}
              label="Website"
              onChange={handleInputChange('website')}
              placeholder="Enter website URL"
              value={formValues.website}
            />

            {submitError && submitError.startsWith('__rate_limit__:') ? (
              <RateLimitMessage retryAfter={Number(submitError.split(':')[1])} />
            ) : submitError ? (
              <AuthStatusMessage message={submitError} tone="error" />
            ) : null}

            <AuthPrimaryButton type="submit">
              {AUTH_COPY.schoolSignup.schoolInfo.submitLabel}
            </AuthPrimaryButton>
          </form>
        ) : null}

        {currentStep === 1 ? (
          <form className="space-y-6" noValidate onSubmit={handleNext}>
            <div>
              <span className="mb-2 block font-copy text-[0.98rem] leading-6 text-[#3C3C3C]">
                School logo
              </span>
              {schoolLogoFile ? (
                <FileRow
                  file={schoolLogoFile}
                  onClear={() => {
                    setSchoolLogoFile(null);
                    clearFieldError('schoolLogoFile');
                  }}
                />
              ) : (
                <div className="flex items-center justify-between border border-[#CFCFCF] px-4 py-3">
                  <span className="font-copy text-[1rem] text-[#B5B5B5]">Add file</span>
                  <button
                    className="bg-[#9EDFD0] px-4 py-2 font-copy text-[0.98rem] font-medium text-[#10295C]"
                    onClick={() => schoolLogoInputRef.current?.click()}
                    type="button"
                  >
                    Upload
                  </button>
                </div>
              )}
              <input
                className="hidden"
                onChange={(event) => {
                  const nextFile = event.target.files?.[0] ?? null;
                  setSchoolLogoFile(nextFile);
                  clearFieldError('schoolLogoFile');
                }}
                ref={schoolLogoInputRef}
                type="file"
              />
              {fieldErrors.schoolLogoFile ? (
                <div className="mt-2">
                  <AuthStatusMessage message={fieldErrors.schoolLogoFile} tone="error" />
                </div>
              ) : null}
            </div>

            <div>
              <span className="mb-2 block font-copy text-[0.98rem] leading-6 text-[#3C3C3C]">
                Verification document
              </span>
              {verificationDocumentFile ? (
                <FileRow
                  file={verificationDocumentFile}
                  onClear={() => {
                    setVerificationDocumentFile(null);
                    clearFieldError('verificationDocumentFile');
                  }}
                />
              ) : (
                <button
                  className="flex min-h-[9rem] w-full flex-col items-center justify-center gap-3 border border-dashed border-[#CFCFCF] px-6 py-8 text-center"
                  onClick={() => verificationDocumentInputRef.current?.click()}
                  type="button"
                >
                  <svg className="h-7 w-7 text-[#55667E]" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L14 13L19 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    <path d="M14 13V22" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                    <path d="M8.4 10.6C8.88 7.46 11.58 5 14.84 5C18.34 5 21.2 7.86 21.2 11.36C23.21 11.48 24.8 13.14 24.8 15.2C24.8 17.34 23.04 19.1 20.9 19.1H19.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    <path d="M8.2 19.1H7.3C4.92 19.1 3 17.18 3 14.8C3 12.52 4.78 10.66 7.02 10.52" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  </svg>
                  <span className="font-copy text-[0.98rem] leading-7 text-[#5C5C5C]">
                    Browse and chose the files you want to upload from your computer
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center bg-[#9EDFD0] font-copy text-[1.5rem] text-[#10295C]">
                    +
                  </span>
                </button>
              )}
              <input
                className="hidden"
                onChange={(event) => {
                  const nextFile = event.target.files?.[0] ?? null;
                  setVerificationDocumentFile(nextFile);
                  clearFieldError('verificationDocumentFile');
                }}
                ref={verificationDocumentInputRef}
                type="file"
              />
              {fieldErrors.verificationDocumentFile ? (
                <div className="mt-2">
                  <AuthStatusMessage message={fieldErrors.verificationDocumentFile} tone="error" />
                </div>
              ) : null}
            </div>

            {submitError && submitError.startsWith('__rate_limit__:') ? (
              <RateLimitMessage retryAfter={Number(submitError.split(':')[1])} />
            ) : submitError ? (
              <AuthStatusMessage message={submitError} tone="error" />
            ) : null}

            <AuthPrimaryButton type="submit">
              {AUTH_COPY.schoolSignup.schoolAdditional.submitLabel}
            </AuthPrimaryButton>
          </form>
        ) : null}

        {currentStep === 2 ? (
          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            <AuthTextField
              error={fieldErrors.fullName}
              label="Full name"
              onChange={handleInputChange('fullName')}
              placeholder="Enter school name"
              value={formValues.fullName}
            />

            <AuthTextField
              autoComplete="email"
              error={fieldErrors.email}
              label="Enter email address"
              onChange={handleInputChange('email')}
              placeholder="Email"
              type="email"
              value={formValues.email}
            />

            <AuthTextField
              autoComplete="new-password"
              error={fieldErrors.password}
              label="Enter password"
              onChange={handleInputChange('password')}
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
              value={formValues.password}
            />

            <AuthTextField
              autoComplete="new-password"
              error={fieldErrors.confirmPassword}
              label="Confirm password"
              onChange={handleInputChange('confirmPassword')}
              placeholder="Confirm password"
              type={showPassword ? 'text' : 'password'}
              value={formValues.confirmPassword}
            />

            <label className="block">
              <input
                checked={formValues.termsAccepted}
                className="mr-3 h-4 w-4 border-[#CFCFCF] text-[#10295C] focus:ring-[#9EDFD0]"
                onChange={handleInputChange('termsAccepted')}
                type="checkbox"
              />
              <span className="font-copy text-[1rem] leading-7 text-[#5C5C5C]">
                {AUTH_COPY.shared.termsAndPrivacySchool}
              </span>
              {fieldErrors.termsAccepted ? (
                <div className="mt-2">
                  <AuthStatusMessage message={fieldErrors.termsAccepted} tone="error" />
                </div>
              ) : null}
            </label>

            {submitError && submitError.startsWith('__rate_limit__:') ? (
              <RateLimitMessage retryAfter={Number(submitError.split(':')[1])} />
            ) : submitError ? (
              <AuthStatusMessage message={submitError} tone="error" />
            ) : null}

            <AuthPrimaryButton isLoading={isSubmitting} type="submit">
              {AUTH_COPY.schoolSignup.admin.submitLabel}
            </AuthPrimaryButton>
          </form>
        ) : null}
      </AuthLayout>
    </>
  );
};

export default SignUpSchoolPage;
