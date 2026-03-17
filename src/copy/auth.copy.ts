/**
 * @file auth.copy.ts
 * @description Authentication copy placeholders for role selection and forms.
 * @module src/copy/auth
 */
export const AUTH_COPY = {
  login: {
    roleSelectorTitle: "Who's logging in?",
    roleSelectorBody: 'Choose your role to continue.',
    parentCta: 'Continue as parent',
    schoolCta: 'Continue as school/academy',
  },
  signUp: {
    roleSelectorTitle: "Who's signing up?",
    roleSelectorBody: 'Choose your role to begin account setup.',
    parentCta: 'Sign up as parent',
    schoolCta: 'Sign up as school/academy',
  },
} as const;
