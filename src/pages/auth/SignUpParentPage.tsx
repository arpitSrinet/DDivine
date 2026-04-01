/**
 * @file SignUpParentPage.tsx
 * @description Multi-step parent signup flow aligned to the supplied auth designs.
 * @module src/pages/auth/SignUpParentPage
 */
import { useState, type ChangeEvent, type FormEvent } from 'react';
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
import { emailSchema, passwordSchema, phoneSchema, postcodeSchema } from '@/utils';

import {
  AuthBackButton,
  AuthPrimaryButton,
  AuthRadioGroup,
  AuthSelectField,
  AuthStatusMessage,
  AuthTextAreaField,
  AuthTextField,
  getApiFieldErrors,
  getAuthErrorMessage,
  getZodFieldErrors,
  type TFieldErrors,
} from './auth.shared';

const accountSchema = z
  .object({
    confirmPassword: z.string().trim().min(1, 'Confirm password'),
    email: emailSchema,
    password: passwordSchema,
    termsAccepted: z.boolean().refine((value) => value, 'You must agree to the terms and privacy policy'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

const parentProfileSchema = z.object({
  addressLine1: z.string().trim().min(1, 'Enter address line 1'),
  emergencyPhoneNumber: phoneSchema,
  fullName: z.string().trim().min(1, 'Enter your full name'),
  phoneNumber: phoneSchema,
  postCode: postcodeSchema,
  town: z.string().trim().min(1, 'Enter your town'),
});

const childProfileSchema = z.object({
  childDateOfBirth: z.string().trim().min(1, "Enter your child's date of birth"),
  childFullName: z.string().trim().min(1, "Enter your child's full name"),
  childSchoolName: z.string().trim().min(1, "Select your child's school"),
  firstAidPermission: z.string().trim().min(1, 'Choose if first aid can be provided'),
  gender: z.string().trim().min(1, 'Select gender'),
});

const initialValues = {
  addressLine1: '',
  addressLine2: '',
  childDateOfBirth: '',
  childFullName: '',
  childSchoolName: '',
  confirmPassword: '',
  email: '',
  emergencyPhoneNumber: '',
  firstAidPermission: '',
  fullName: '',
  gender: '',
  medicalNotes: '',
  password: '',
  phoneNumber: '',
  postCode: '',
  termsAccepted: false,
  town: '',
};

const childSchoolOptions = [
  { label: 'Bligh Primary', value: 'bligh-primary' },
  { label: 'Woodlands Academy', value: 'woodlands-academy' },
  { label: 'Southfield School', value: 'southfield-school' },
  { label: 'Other', value: 'other' },
] as const;

const SignUpParentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<TFieldErrors>({});
  const [formValues, setFormValues] = useState(initialValues);
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
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const validateCurrentStep = (skipChild = false): boolean => {
    if (currentStep === 0) {
      const parsed = accountSchema.safeParse({
        confirmPassword: formValues.confirmPassword,
        email: formValues.email,
        password: formValues.password,
        termsAccepted: formValues.termsAccepted,
      });

      if (!parsed.success) {
        setFieldErrors(getZodFieldErrors(parsed.error));
        return false;
      }

      return true;
    }

    if (currentStep === 1) {
      const parsed = parentProfileSchema.safeParse({
        addressLine1: formValues.addressLine1,
        emergencyPhoneNumber: formValues.emergencyPhoneNumber,
        fullName: formValues.fullName,
        phoneNumber: formValues.phoneNumber,
        postCode: formValues.postCode,
        town: formValues.town,
      });

      if (!parsed.success) {
        setFieldErrors(getZodFieldErrors(parsed.error));
        return false;
      }

      return true;
    }

    if (skipChild) {
      return true;
    }

    const parsed = childProfileSchema.safeParse({
      childDateOfBirth: formValues.childDateOfBirth,
      childFullName: formValues.childFullName,
      childSchoolName: formValues.childSchoolName,
      firstAidPermission: formValues.firstAidPermission,
      gender: formValues.gender,
    });

    if (!parsed.success) {
      setFieldErrors(getZodFieldErrors(parsed.error));
      return false;
    }

    return true;
  };

  const goToNextStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    if (!validateCurrentStep()) {
      return;
    }

    setFieldErrors({});
    setCurrentStep((current) => current + 1);
  };

  const completeSignup = async (skipChild: boolean) => {
    setSubmitError('');

    if (!validateCurrentStep(skipChild)) {
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await authService.signUpParent({
        addressLine1: formValues.addressLine1,
        addressLine2: formValues.addressLine2,
        childProfile: skipChild
          ? null
          : {
              childDateOfBirth: formValues.childDateOfBirth,
              childFullName: formValues.childFullName,
              childSchoolName: formValues.childSchoolName,
              firstAidPermission: formValues.firstAidPermission,
              gender: formValues.gender,
              medicalNotes: formValues.medicalNotes,
            },
        email: formValues.email,
        emergencyPhoneNumber: formValues.emergencyPhoneNumber,
        fullName: formValues.fullName,
        password: formValues.password,
        phoneNumber: formValues.phoneNumber,
        postCode: formValues.postCode,
        town: formValues.town,
      });

      navigate(ROUTES.LOGIN_PARENT, {
        state: {
          email: formValues.email,
          notice: 'Parent account created. Log in to continue.',
        },
      });
    } catch (error) {
      const apiFieldErrors = getApiFieldErrors(error);

      if (Object.keys(apiFieldErrors).length > 0) {
        setFieldErrors(apiFieldErrors);
      } else if (isApiError(error) && error.status === 429) {
        setSubmitError(`__rate_limit__:${error.retryAfter ?? 60}`);
      } else {
        setSubmitError(getAuthErrorMessage(error, 'Parent signup failed. Please try again.'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepContent = [
    {
      description: AUTH_COPY.parentSignup.account.description,
      title: AUTH_COPY.parentSignup.account.title,
    },
    {
      description: AUTH_COPY.parentSignup.profile.description,
      title: AUTH_COPY.parentSignup.profile.title,
    },
    {
      description: AUTH_COPY.parentSignup.child.description,
      title: AUTH_COPY.parentSignup.child.title,
    },
  ][currentStep];

  return (
    <>
      <PageSEO description={SEO_META.signup.description} title={SEO_META.signup.title} />
      <AuthLayout description={stepContent.description} title={stepContent.title}>
        {currentStep > 0 ? (
          <AuthBackButton
            onClick={() => {
              setFieldErrors({});
              setSubmitError('');
              setCurrentStep((current) => current - 1);
            }}
          />
        ) : null}

        {currentStep === 0 ? (
          <form className="space-y-6" noValidate onSubmit={goToNextStep}>
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
                {AUTH_COPY.shared.termsAndPrivacyParent}
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

            <AuthPrimaryButton type="submit">
              {AUTH_COPY.parentSignup.account.submitLabel}
            </AuthPrimaryButton>
          </form>
        ) : null}

        {currentStep === 1 ? (
          <form className="space-y-5" noValidate onSubmit={goToNextStep}>
            <AuthTextField
              error={fieldErrors.fullName}
              label="Enter your full name"
              onChange={handleInputChange('fullName')}
              placeholder="Enter full name"
              value={formValues.fullName}
            />

            <AuthTextField
              error={fieldErrors.phoneNumber}
              label="Phone number"
              onChange={handleInputChange('phoneNumber')}
              placeholder="+44 7000777700"
              type="tel"
              value={formValues.phoneNumber}
            />

            <AuthTextField
              error={fieldErrors.emergencyPhoneNumber}
              label="Emergency phone number"
              onChange={handleInputChange('emergencyPhoneNumber')}
              placeholder="+44 7000007777"
              type="tel"
              value={formValues.emergencyPhoneNumber}
            />

            <AuthTextField
              error={fieldErrors.addressLine1}
              label="Address line 1"
              onChange={handleInputChange('addressLine1')}
              placeholder="10 church street"
              value={formValues.addressLine1}
            />

            <AuthTextField
              label="Address line 2"
              onChange={handleInputChange('addressLine2')}
              placeholder="Woodside"
              value={formValues.addressLine2}
            />

            <AuthTextField
              error={fieldErrors.town}
              label="Town"
              onChange={handleInputChange('town')}
              placeholder="Woodside"
              value={formValues.town}
            />

            <AuthTextField
              error={fieldErrors.postCode}
              label="Post code"
              onChange={handleInputChange('postCode')}
              placeholder="ME1 3GJ"
              value={formValues.postCode}
            />

            {submitError && submitError.startsWith('__rate_limit__:') ? (
              <RateLimitMessage retryAfter={Number(submitError.split(':')[1])} />
            ) : submitError ? (
              <AuthStatusMessage message={submitError} tone="error" />
            ) : null}

            <AuthPrimaryButton type="submit">
              {AUTH_COPY.parentSignup.profile.submitLabel}
            </AuthPrimaryButton>
          </form>
        ) : null}

        {currentStep === 2 ? (
          <form
            className="space-y-5"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              void completeSignup(false);
            }}
          >
            <AuthTextField
              error={fieldErrors.childFullName}
              label="Enter Child's full name"
              onChange={handleInputChange('childFullName')}
              placeholder="Enter full name"
              value={formValues.childFullName}
            />

            <AuthTextField
              error={fieldErrors.childDateOfBirth}
              label="Enter Child's date of birth"
              onChange={handleInputChange('childDateOfBirth')}
              type="date"
              value={formValues.childDateOfBirth}
            />

            <AuthSelectField
              error={fieldErrors.childSchoolName}
              label="Enter Child's school name"
              onChange={handleInputChange('childSchoolName')}
              options={childSchoolOptions}
              placeholder="Enter school name"
              value={formValues.childSchoolName}
            />

            <AuthRadioGroup
              error={fieldErrors.gender}
              label="Gender"
              name="gender"
              onChange={handleInputChange('gender')}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Prefer not to say', value: 'prefer-not-to-say' },
              ]}
              value={formValues.gender}
            />

            <AuthRadioGroup
              error={fieldErrors.firstAidPermission}
              label="Permission to provide first aid if required:"
              name="firstAidPermission"
              onChange={handleInputChange('firstAidPermission')}
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              value={formValues.firstAidPermission}
            />

            <AuthTextAreaField
              label="Enter medical notes"
              onChange={handleInputChange('medicalNotes')}
              placeholder="Allergies, injuries, additional support needs.................."
              value={formValues.medicalNotes}
            />

            {submitError && submitError.startsWith('__rate_limit__:') ? (
              <RateLimitMessage retryAfter={Number(submitError.split(':')[1])} />
            ) : submitError ? (
              <AuthStatusMessage message={submitError} tone="error" />
            ) : null}

            <AuthPrimaryButton isLoading={isSubmitting} type="submit">
              {AUTH_COPY.parentSignup.child.submitLabel}
            </AuthPrimaryButton>

            <button
              className="mx-auto block font-copy text-[1rem] leading-7 text-[#415372] underline underline-offset-4 transition hover:text-[#10295C]"
              onClick={() => {
                void completeSignup(true);
              }}
              type="button"
            >
              {AUTH_COPY.parentSignup.child.skipLabel}
            </button>
          </form>
        ) : null}
      </AuthLayout>
    </>
  );
};

export default SignUpParentPage;
