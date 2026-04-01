/**
 * @file auth.copy.ts
 * @description Authentication copy matching the supplied login and signup flows.
 * @module src/copy/auth
 */
export const AUTH_COPY = {
  shared: {
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create Account',
    edit: 'Edit',
    loginInstead: 'Login',
    noAccount: 'No account ? Create one !',
    otpSent: 'The code has been sent',
    otpSendingPrefix: 'The code will be sent in',
    resendCode: 'Send new code',
    termsAndPrivacyParent:
      'By creating an account, I agree to the Terms & Conditions and Privacy Policy, and confirm that I am the parent or legal guardian.',
    termsAndPrivacySchool:
      'By creating an account, I agree to the Terms & Conditions and Privacy Policy.',
  },
  roles: {
    parent: {
      label: 'Parent',
      roleDescription: 'Log in to manage your child’s profile and book sessions accordingly.',
      loginDescription: 'Log in to manage your child’s profile and book sessions accordingly.',
      signupPrompt: 'Sign up to get started with managing your child’s profile and scheduling sessions.',
    },
    school: {
      label: 'School/Academy',
      roleDescription: 'Create and manage your school account, fixtures, and programme details.',
      loginDescription: 'Login to view your school’s position in football league and create matches.',
      signupPrompt: 'Enter your school or academy details to create an account.',
    },
  },
  loginAsk: {
    title: "Who's logging in?",
    description: 'Choose your role to continue',
    parentCta: 'Continue as parent',
    schoolCta: 'Continue as school/academy',
  },
  signupAsk: {
    title: "Who's signing up?",
    description: 'Choose your role to continue',
    parentCta: 'Sign up as parent',
    schoolCta: 'Sign up as school/academy',
  },
  login: {
    title: 'Login',
    otpTitle: 'Enter the code you received:',
    otpDescription: 'Enter the 6-digit verification code sent by email to:',
    submitLabel: 'Login',
    otpSubmitLabel: 'Next',
  },
  parentSignup: {
    account: {
      title: "Let's Get Started",
      description: 'Sign up to get started with managing your child’s profile and scheduling sessions.',
      submitLabel: 'Next',
    },
    profile: {
      title: 'Set up your profile',
      description: 'Tell us more about you',
      submitLabel: 'Continue',
    },
    child: {
      title: "Set up your child's profile",
      description: 'Tell us more about your child to personalise their experience',
      submitLabel: 'Continue',
      skipLabel: 'Add another child later',
    },
  },
  schoolSignup: {
    title: 'Sign up as school/Academy',
    description: 'Enter your school or academy details to create an account.',
    steps: ['School info', 'School Additional information', 'Admin information'],
    schoolInfo: {
      submitLabel: 'Next',
    },
    schoolAdditional: {
      submitLabel: 'Continue',
    },
    admin: {
      submitLabel: 'Continue',
    },
  },
} as const;
