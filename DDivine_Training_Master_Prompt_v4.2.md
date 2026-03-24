# DDivine Training — Complete Master Prompt for Antigravity AI
> **v4.2 FINAL — Execution-Safe, Phase-Locked, Zod-First**
> Paste this entire document as the system/context prompt before issuing build commands.
> Then say **"Start Phase 1"** to begin. Never skip phases.

---

## 1. RULE PRIORITY LEGEND

| Tag | Meaning | Consequence of Breaking |
|---|---|---|
| 🔴 **HARD RULE** | Must never be broken | Reject and rewrite the output |
| 🟡 **SOFT RULE** | Strong default; can bend only with written justification | Flag the deviation |
| 🔵 **GUIDELINE** | Recommended approach | Use judgement |

**When in doubt, treat it as a HARD RULE.**

---

## 2. EXECUTION MODE

### 2.1 The One Rule That Overrides Everything

```text
🔴 HARD RULE:

ASK BEFORE ADDING.

Before adding any feature, pattern, or abstraction, ask:
"Is this required for THIS phase checkpoint to pass?"

If YES  -> build it.
If NO   -> do not build it, do not stub it, do not mention it.
```

### 2.2 Phase Priority

```text
Phases 1-5  -> Working beats Perfect
Phases 6-8  -> Correct beats Fast
Phases 9-11 -> Robust beats Done
```

### 2.3 Phase Precedence Rule

```text
🔴 HARD RULE:
If a global rule references a concern, folder, abstraction, or pattern
that is not unlocked in the current phase, defer that rule until its
phase is unlocked.

Do not invent an alternative unless the current phase explicitly allows it.
```

### 2.4 Folder Usage Rule

```text
🔴 HARD RULE:
A folder is unavailable until its phase is unlocked.

Treat a locked folder as if it does not exist.

Examples:
- Do not import from monitoring/ before Phase 6
- Do not import from errors/ before Phase 6
- Do not import from security/ before Phase 7
- Do not import from feature flag config before Phase 7
```

### 2.5 Completion Report Rule

After every phase, output:

- Files created
- Files modified
- Dependencies added and why
- Checkpoint results: pass/fail per item
- Explicitly deferred work

---

## 3. NON-NEGOTIABLE ARCHITECTURE DECISIONS

### 3.1 Single Type System

```text
🔴 HARD RULE:
Domain and API data types come ONLY from Zod schemas.

- No duplicate domain interfaces in src/types for API data
- All API/domain types use z.infer<typeof Schema>
- src/types is optional and reserved for UI-only or generic shared types
```

### 3.2 Auth Strategy

```text
🔴 HARD RULE:
Use sessionStorage for auth persistence.

- accessToken is stored in Zustand and persisted to sessionStorage
- No localStorage for auth
- No httpOnly cookie flow in this version
- No refresh-token system in this version
```

### 3.3 Service Timing

```text
🔴 HARD RULE:
No service layer before Phase 6.

From Phase 6 onward:
- every service response must be validated by Zod
- components never parse raw API responses
- hooks consume services, not axios directly
```

### 3.4 Error Boundary Exception

```text
🔴 HARD RULE:
Functional components are the default.

Exception:
Error boundaries may use class components or a boundary library wrapper
when React requires it.
```

---

## 4. PRODUCT SUMMARY

**Product Name:** DDivine Training  
**Branding:** DDivine / stylised "DD" with football icon  
**Purpose:** Full-stack web app for sports coaching and wrap around childcare for children aged 5-14  
**User Roles:** Parent, School/Academy  
**Core Modules:** Public website, Authentication, User Dashboard, School Football League, Knowledge Hub, Admin later

---

## 5. TECHNOLOGY STACK

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript strict mode |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Client State | Zustand |
| Server State | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Icons | Lucide React |
| HTTP | Axios |
| Validation | Zod |
| Testing | Vitest + React Testing Library |
| Linting | ESLint + Prettier, using a TypeScript-first ruleset focused on correctness and accessibility |
| Error Monitoring | Sentry from Phase 8 |
| Logging | Custom logger from Phase 6 |
| SEO | react-helmet-async |
| Bundle Analysis | rollup-plugin-visualizer from Phase 9 |
| Sanitisation | DOMPurify from Phase 7 if needed |

---

## 6. DESIGN SYSTEM

All values live in `tailwind.config.ts` and `src/styles/tokens.css`. Never hardcode hex values in components.

### 6.1 Color Tokens

```css
--color-primary:       #1B3A2D;
--color-primary-light: #2A5C47;
--color-accent:        #4DBFAA;
--color-accent-hover:  #3DA898;
--color-dark:          #111827;
--color-surface:       #F9F7F4;
--color-surface-alt:   #F0EFEC;
--color-muted:         #6B7280;
--color-danger:        #DC2626;
--color-warning:       #F59E0B;
--color-success:       #16A34A;
--color-white:         #FFFFFF;
--color-border:        #E5E7EB;
```

### 6.2 Typography

```text
Headings: Oswald
Body/UI: DM Sans
Mono: JetBrains Mono
```

### 6.3 Layout

- Base spacing unit: 4px
- Max width: `max-w-7xl`
- Section spacing: `py-16 md:py-24`
- Card radius: `rounded-2xl`
- Button radius: `rounded-lg` or `rounded-full`

---

## 7. FOLDER STRUCTURE

This is the current source of truth. Do not create files outside this shape without explicitly updating this section.

```text
ddivine-training/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── site.webmanifest
│   └── assets/
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   │
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   │
│   ├── types/
│   │   ├── index.ts
│   │   └── ui.types.ts
│   │
│   ├── constants/
│   │   ├── index.ts
│   │   ├── routes.constants.ts
│   │   ├── api.constants.ts
│   │   ├── queryKeys.constants.ts
│   │   ├── nav.constants.ts
│   │   ├── services.constants.ts
│   │   ├── stats.constants.ts
│   │   └── faq.constants.ts
│   │
│   ├── config/
│   │   ├── env.config.ts
│   │   ├── axios.config.ts
│   │   ├── queryClient.config.ts
│   │   └── featureFlags.ts
│   │
│   ├── copy/
│   │   ├── index.ts
│   │   ├── common.copy.ts
│   │   ├── home.copy.ts
│   │   ├── about.copy.ts
│   │   ├── services.copy.ts
│   │   ├── league.copy.ts
│   │   ├── knowledge.copy.ts
│   │   ├── auth.copy.ts
│   │   └── dashboard.copy.ts
│   │
│   ├── services/
│   │   ├── schemas/
│   │   │   ├── common.schema.ts
│   │   │   ├── auth.schema.ts
│   │   │   ├── user.schema.ts
│   │   │   ├── booking.schema.ts
│   │   │   ├── service.schema.ts
│   │   │   ├── league.schema.ts
│   │   │   └── knowledge.schema.ts
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── booking.service.ts
│   │   ├── services.service.ts
│   │   ├── league.service.ts
│   │   ├── knowledge.service.ts
│   │   └── upload.service.ts
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── auth.store.ts
│   │   ├── ui.store.ts
│   │   └── league.store.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useModal.ts
│   │   ├── useToast.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts
│   │   ├── useScrollRestoration.ts
│   │   ├── useScrollAnimation.ts
│   │   ├── useOnlineStatus.ts
│   │   ├── useFormPersistence.ts
│   │   └── useFeatureFlag.ts
│   │
│   ├── seo/
│   │   ├── PageSEO.tsx
│   │   └── seo.constants.ts
│   │
│   ├── errors/
│   │   ├── GlobalErrorBoundary.tsx
│   │   ├── PageErrorBoundary.tsx
│   │   ├── SectionErrorBoundary.tsx
│   │   ├── ErrorFallback.tsx
│   │   └── errorBoundary.utils.ts
│   │
│   ├── monitoring/
│   │   ├── logger.ts
│   │   ├── sentry.config.ts
│   │   ├── analytics.ts
│   │   └── performance.ts
│   │
│   ├── security/
│   │   └── sanitize.utils.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── index.ts
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Modal/
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   ├── Avatar/
│   │   │   ├── Spinner/
│   │   │   ├── Accordion/
│   │   │   ├── AnimatedCounter/
│   │   │   ├── ImageGallery/
│   │   │   ├── Tooltip/
│   │   │   └── RateLimitMessage/
│   │   │
│   │   ├── layout/
│   │   │   ├── index.ts
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── PageWrapper.tsx
│   │   │   ├── SectionWrapper.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── OfflineBanner.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection/
│   │   │   ├── StatsBar/
│   │   │   ├── ServicesGrid/
│   │   │   ├── TestimonialsCarousel/
│   │   │   ├── PartnerLogos/
│   │   │   ├── CTABanner/
│   │   │   ├── PhotoStrip/
│   │   │   ├── ServiceDetailHero/
│   │   │   └── SupportSection/
│   │   │
│   │   └── features/
│   │       ├── auth/
│   │       ├── dashboard/
│   │       ├── league/
│   │       └── knowledge/
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutUsPage.tsx
│   │   │   ├── OurServicesPage.tsx
│   │   │   ├── PoliciesPage.tsx
│   │   │   ├── UpcomingEventsPage.tsx
│   │   │   ├── SchoolFootballLeaguePage.tsx
│   │   │   ├── services/
│   │   │   └── knowledge/
│   │   ├── auth/
│   │   │   ├── LoginAskPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignUpAskPage.tsx
│   │   │   ├── SignUpParentPage.tsx
│   │   │   └── SignUpSchoolPage.tsx
│   │   └── dashboard/
│   │       ├── ProfilePage.tsx
│   │       ├── MyBookingsPage.tsx
│   │       ├── ChildrenPage.tsx
│   │       └── SchoolProfilePage.tsx
│   │
│   ├── router/
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RoleRoute.tsx
│   │   └── PublicOnlyRoute.tsx
│   │
│   └── tests/
│       ├── setup.ts
│       └── mocks/
│           ├── handlers.ts
│           └── server.ts
│
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── package.json
```

---

## 8. ROUTING TABLE

All route strings live in `src/constants/routes.constants.ts`.

```ts
const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  POLICIES: '/policies',
  UPCOMING_EVENTS: '/upcoming-events',
  SERVICES_CURRICULAR: '/services/curricular',
  SERVICES_EXTRA: '/services/extra-curricular',
  SERVICES_HOLIDAY: '/services/holiday-camps',
  SERVICES_WRAPAROUND: '/services/wraparound-childcare',
  KNOWLEDGE_HUB: '/knowledge-hub',
  KNOWLEDGE_CASE_STUDIES: '/knowledge-hub/case-studies',
  KNOWLEDGE_FREE: '/knowledge-hub/free-activities',
  KNOWLEDGE_FAQS: '/knowledge-hub/faqs',
  LEAGUE: '/school-football-league',

  LOGIN: '/login',
  LOGIN_PARENT: '/login/parent',
  LOGIN_SCHOOL: '/login/school',
  SIGNUP: '/signup',
  SIGNUP_PARENT: '/signup/parent',
  SIGNUP_SCHOOL: '/signup/school',

  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_BOOKINGS: '/dashboard/bookings',
  DASHBOARD_CHILDREN: '/dashboard/children',
  DASHBOARD_SCHOOL: '/dashboard/school',
} as const;
```

```text
🔴 HARD RULE:
/signup is the role selector page.
Do not skip it. Do not redirect around it by default.
```

---

## 9. CODING STANDARDS

### 9.1 TypeScript

- `strict: true`
- No `any`
- No `@ts-ignore` without a written justification
- Use `interface` for object shapes and `type` for unions/intersections
- Domain/API types must come from Zod schemas only

### 9.2 Components

- Functional components only, except error boundaries
- One component per file
- Named exports from components
- Default exports from pages only
- No business logic in pages
- No API calls in components or pages
- No direct axios usage outside `src/services/`

### 9.3 JSDoc Header Rule

```text
🔴 HARD RULE:
Every .ts and .tsx file must include a file header.

This rule does NOT apply to CSS, JSON, YAML, Markdown, env files, or workflow files.
```

Template:

```ts
/**
 * @file FileName.tsx
 * @description One-line description.
 * @module path/to/module
 */
```

### 9.4 Import Rules

- Use absolute imports via `@/`
- Import from folder barrels, not deep file paths
- Barrel exports are required for reusable source folders with a public import surface
- Barrel exports are not required for non-imported support folders such as `src/tests/` or `src/styles/`
- No cross-feature imports
- Features may only share via `@/components/ui`, `@/components/sections`, `@/hooks`, `@/utils`, `@/types`

### 9.5 Copy Rules

```text
🔴 HARD RULE:
No hardcoded user-facing strings in components after Phase 2.
All user-facing strings must come from src/copy/.
```

### 9.6 State Rules

- Local UI state: `useState`
- Shared client-only state: Zustand
- Server data: TanStack Query only
- Form state: React Hook Form
- Never store server collections in Zustand

### 9.7 Accessibility

- All images have meaningful `alt`
- Icon-only buttons have `aria-label`
- Inputs have associated labels
- Inline validation errors use `role="alert"`
- Modals trap focus and close on Escape
- Skip-to-content link exists in the page wrapper
- Framer Motion respects reduced motion

### 9.8 Performance

- Lazy-load page-level routes
- Use explicit image dimensions
- Use `loading="lazy"` where appropriate
- No anonymous event handlers in JSX when the handler is reused or non-trivial

### 9.9 Linting Standards

```text
🔴 HARD RULE:
Linting must be strict on correctness, accessibility, imports, and hooks.
Linting must NOT force legacy React patterns or low-signal style rules.
```

Use a TypeScript-first ESLint config. Do not make Airbnb a required preset.

Strict areas:

- unused variables
- import resolution and hygiene
- React hooks rules
- accessibility rules
- TypeScript correctness rules

Rules that may be relaxed when TypeScript already guarantees correctness:

- default props requirements for optional TS props
- prop spreading bans for reusable form primitives
- button type rules when the prop is already constrained by a TS union
- test-file dependency import restrictions, when scoped correctly

---

## 10. DATA, VALIDATION, AND ERROR RULES

### 10.1 Zod-First Domain Model

```text
🔴 HARD RULE:
Each service file must have paired schemas in src/services/schemas/.
```

Example:

```ts
export const BookingSchema = z.object({
  id: z.string(),
  serviceName: z.string(),
  date: z.string().datetime(),
  status: z.enum(['confirmed', 'pending', 'cancelled']),
});

export type IBooking = z.infer<typeof BookingSchema>;
```

### 10.2 API Error Normalisation

Raw Axios errors must never leave `axios.config.ts`. Normalize all service errors into a typed app error shape.

### 10.3 Query Key Rule

```text
🔴 HARD RULE:
All query keys live in src/constants/queryKeys.constants.ts.
Never inline query keys.
```

### 10.4 Four-State Rule

Every data-driven screen must handle:

1. Loading
2. Error
3. Empty
4. Success

No blank loading states.

---

## 11. AUTH RULES

### 11.1 Session Model

```text
🔴 HARD RULE:
Auth is persisted in sessionStorage only.

- auth.store persists to sessionStorage
- accessToken is restored from sessionStorage on reload
- 401 means clear auth and redirect to /login
- no refresh token, no cookie-based recovery in this version
```

### 11.2 Route Guards

- `ProtectedRoute`: requires authenticated user
- `RoleRoute`: requires correct authenticated role
- `PublicOnlyRoute`: blocks authenticated users from auth pages
- Support `?returnUrl=` on redirects from protected routes

---

## 12. PUBLIC PAGE INVENTORY

### 12.1 Main Public Pages

- Home
- About Us
- Our Services
- Policies
- Upcoming Events
- School Football League
- Knowledge Hub
- Case Studies
- Free Activities
- FAQs

### 12.2 Service Sub-Pages

- Curricular Activities
- Extra Curricular Activities
- Holiday Football Camps
- Wraparound Childcare

### 12.3 Auth Pages

- `/login` = role selector
- `/login/parent`
- `/login/school`
- `/signup` = role selector
- `/signup/parent`
- `/signup/school`

### 12.4 Dashboard Pages

- Parent Profile
- My Bookings
- Children
- School Profile

---

## 13. REUSABLE COMPONENT RULES

Build atomic UI first. Every reusable component folder must have an `index.ts` barrel.

### 13.1 Required Atomic Components

- Button
- Input
- Select
- Modal
- Card
- Badge
- Avatar
- Spinner
- Accordion
- AnimatedCounter
- ImageGallery
- Tooltip

### 13.2 Later-Unlocked UI Component

- `RateLimitMessage` unlocks in Phase 7 with auth and rate-limit handling

### 13.3 Button Contract

```ts
interface IButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}
```

### 13.4 Input Contract

```ts
interface IInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'time';
  placeholder?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  required?: boolean;
}
```

### 13.5 Size Guardrail

```text
🔴 HARD RULE:
If a component exceeds 150 lines, split it.
If a hook exceeds 80 lines, split it.
If a service function exceeds 30 lines, split it.
```

---

## 14. PHASE LOCK TABLE

Only build what is unlocked.

| Feature | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Project setup + tokens | ✅ |  |  |  |  |  |  |  |  |  |  |
| Copy files |  | ✅ |  |  |  |  |  |  |  |  |  |
| Constants + routes + query keys |  | ✅ |  |  |  |  |  |  |  |  |  |
| Pure utilities |  | ✅ |  |  |  |  |  |  |  |  |  |
| UI-only shared types |  | ✅ |  |  |  |  |  |  |  |  |  |
| Atomic UI components |  |  | ✅ |  |  |  |  |  |  |  |  |
| Component unit tests |  |  | ✅ |  |  |  |  |  |  |  |  |
| Navbar + Footer + layouts |  |  |  | ✅ |  |  |  |  |  |  |  |
| All routes stubbed |  |  |  | ✅ |  |  |  |  |  |  |  |
| SEO wrapper |  |  |  | ✅ |  |  |  |  |  |  |  |
| Scroll restoration |  |  |  | ✅ |  |  |  |  |  |  |  |
| Public pages static |  |  |  |  | ✅ |  |  |  |  |  |  |
| Public sections |  |  |  |  | ✅ |  |  |  |  |  |  |
| Mock data in pages |  |  |  |  | ✅ |  |  |  |  |  |  |
| Env config |  |  |  |  |  | ✅ |  |  |  |  |  |
| Axios config |  |  |  |  |  | ✅ |  |  |  |  |  |
| Query client |  |  |  |  |  | ✅ |  |  |  |  |  |
| Logger |  |  |  |  |  | ✅ |  |  |  |  |  |
| Service schemas + services |  |  |  |  |  | ✅ |  |  |  |  |  |
| Query hooks |  |  |  |  |  | ✅ |  |  |  |  |  |
| Empty states + skeletons |  |  |  |  |  | ✅ |  |  |  |  |  |
| Basic section/page error boundaries |  |  |  |  |  | ✅ |  |  |  |  |  |
| Offline banner + online status |  |  |  |  |  | ✅ |  |  |  |  |  |
| Auth store |  |  |  |  |  |  | ✅ |  |  |  |  |
| Auth pages + forms |  |  |  |  |  |  | ✅ |  |  |  |  |
| Form persistence |  |  |  |  |  |  | ✅ |  |  |  |  |
| Feature flags |  |  |  |  |  |  | ✅ |  |  |  |  |
| Rate limit UI |  |  |  |  |  |  | ✅ |  |  |  |  |
| Real route guards |  |  |  |  |  |  | ✅ |  |  |  |  |
| Sanitisation utilities |  |  |  |  |  |  | ✅ |  |  |  |  |
| Dashboard features |  |  |  |  |  |  |  | ✅ |  |  |  |
| League feature components |  |  |  |  |  |  |  | ✅ |  |  |  |
| Sentry + analytics |  |  |  |  |  |  |  | ✅ |  |  |  |
| Optimistic updates |  |  |  |  |  |  |  | ✅ |  |  |  |
| CI/CD + Husky |  |  |  |  |  |  |  |  | ✅ |  |  |
| Bundle checks |  |  |  |  |  |  |  |  | ✅ |  |  |
| Pagination / infinite scroll |  |  |  |  |  |  |  |  |  | ✅ |  |
| Accessibility / performance / security audit |  |  |  |  |  |  |  |  |  | ✅ |  |
| MSW + integration tests |  |  |  |  |  |  |  |  |  |  | ✅ |

---

## 15. WHAT AI MUST NEVER DO EARLY

### Phases 1-5

Do not add:

- Sentry
- Analytics
- Feature flags
- Error boundaries
- Services
- Axios
- React Query
- Zustand auth
- Auth logic
- Offline detection
- Rate limit UI
- Pagination
- Optimistic updates

### General

Never:

- Deep-import around barrel files
- Put API calls in components or pages
- Put server lists in Zustand
- Hardcode route strings
- Hardcode query keys
- Hardcode user-facing strings after Phase 2
- Use `console.log` only before Phase 6; from Phase 6 onward, use `logger.*` only

---

## 16. PHASED BUILD ORDER

### Phase 1 — Project Skeleton

Build:

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `src/styles/tokens.css`
- `src/styles/globals.css`
- `src/main.tsx`
- `src/App.tsx`
- `.env.example` with `VITE_API_BASE_URL`
- `.eslintrc.cjs` with a TypeScript-first ruleset
- `.prettierrc`

Do not build:

- Services
- Stores
- Error boundaries
- Monitoring
- Auth

Checkpoint:

- `npm run dev` loads
- `npm run lint` passes
- `npm run typecheck` passes
- Tokens visible in browser

### Phase 2 — Copy, Constants, Pure Utilities

Build:

- `src/copy/*`
- `src/constants/*`
- `src/types/ui.types.ts`
- Pure utilities only

Do not build:

- Domain/API types in `src/types`
- Services
- Zod service schemas

Checkpoint:

- `ROUTES.HOME` resolves correctly
- query key factory exists
- copy files are importable
- pure utils are typed and tested if added

### Phase 3 — Atomic UI Library

Build:

- All unlocked atomic UI components
- One unit test per atomic component
- Temporary component preview route if useful

Do not build:

- Feature components
- Skeleton/empty states
- Auth-specific UI flows
- `RateLimitMessage`

Checkpoint:

- Components render in isolation
- Tests pass

### Phase 4 — App Shell and Routing

Build:

- Navbar
- Footer
- wrappers and layouts
- `PageSEO`
- stub routes and pages
- `useScrollRestoration`
- `useMediaQuery`
- `useReducedMotion`

Checkpoint:

- All routes navigate
- `/login` and `/signup` role-selector stubs exist
- titles change by route

### Phase 5 — Public Static Pages

Build:

- Public page sections
- Public pages with static/mock data
- Reusable CTA and content sections

Do not build:

- Services
- API hooks
- Auth flows

Checkpoint:

- Public pages are visually reviewable
- Responsive at mobile, tablet, desktop
- no API dependency yet

### Phase 6 — Data Layer and Runtime Basics

Build:

- `env.config.ts`
- `axios.config.ts`
- `queryClient.config.ts`
- `monitoring/logger.ts`
- `services/schemas/*`
- `services/*`
- query hooks
- `ui.store.ts`
- `league.store.ts`
- skeletons and empty states
- basic `SectionErrorBoundary` and `PageErrorBoundary`
- `useOnlineStatus`
- `OfflineBanner`

Do not build:

- Auth persistence logic
- Feature flags
- Rate limit UI
- Sentry

Checkpoint:

- Public data loads through React Query
- all responses are parsed by Zod
- loading/error/empty states exist
- no raw axios usage outside services

### Phase 7 — Authentication

Build:

- `auth.store.ts`
- auth forms and pages
- `useFormPersistence`
- `featureFlags.ts`
- `useFeatureFlag`
- `RateLimitMessage`
- `sanitize.utils.ts`
- real route guards

Auth behavior:

- persist auth to `sessionStorage`
- on app boot, restore auth from `sessionStorage`
- on `401`, clear auth and redirect to `/login`

Checkpoint:

- `/signup` works as role selector
- parent and school login work
- parent and school signup work
- protected routes redirect correctly

### Phase 8 — Dashboard and Monitoring

Build:

- dashboard features
- league logged-in features
- knowledge feature components
- `GlobalErrorBoundary`
- `sentry.config.ts`
- `analytics.ts`
- `performance.ts`
- optimistic mutations

Checkpoint:

- parent dashboard works
- school dashboard works
- Sentry captures runtime errors
- analytics events fire

### Phase 9 — DevOps

Build:

- Husky
- lint-staged
- CI workflow
- deploy workflow
- bundle-size check

### Phase 10 — Hardening

Build:

- pagination / infinite scroll
- accessibility audit fixes
- performance audit fixes
- security review fixes
- memory leak audit fixes

### Phase 11 — Test Suite Completion

Build:

- MSW handlers
- integration tests
- coverage enforcement

---

## 17. LOADING, EMPTY, ERROR, SUCCESS STATES

```text
🔴 HARD RULE:
Every data-driven component must handle:
Loading, Error, Empty, Success.
```

Rules:

- Initial section/page loading uses skeletons, not blank screens
- Inline actions may use spinners
- Empty states must be explicit
- Error states must provide retry where appropriate

---

## 18. DATE AND TIME STANDARD

```text
🔴 HARD RULE:
API dates must be ISO 8601 strings validated by Zod.
Never store formatted date strings in state.
Never call new Date() directly inside components.
```

All display formatting goes through `src/utils/format.utils.ts`.

---

## 19. FEATURE FLAG RULES

Feature flags unlock in Phase 7.

- Values come from environment variables
- Do not remove a production flag until stable
- Do not hardcode production flags to true in source

---

## 20. ANALYTICS RULES

Analytics unlock in Phase 8.

- Components never import analytics vendors directly
- All tracking goes through `trackEvent()`
- Analytics must never break rendering

Mandatory tracked events from Phase 8:

- CTA clicks
- login success/failure
- signup completion
- booking cancellation
- game submission
- page view

---

## 21. SECURITY RULES

### 21.1 Current Auth Security Model

- Session-scoped persistence only
- No `localStorage` auth storage
- Clear auth on `401`

### 21.2 Sanitisation

If rendering backend or CMS HTML:

- sanitise first with `sanitizeHTML`
- never use `dangerouslySetInnerHTML` on unsanitised content

### 21.3 Forms

- Client validation uses Zod
- Password rules enforced in schema
- Emails normalised before submission
- Sensitive data must never be logged

---

## 22. TESTING STRATEGY

### Unit Tests

- utils
- atomic UI
- stores
- schemas

### Integration Tests

- login success/failure/rate limit
- parent signup flow
- school signup flow
- booking cancel optimistic flow
- role-based routing
- game submission

```text
🔴 HARD RULE:
Test user behaviour, not implementation details.
```

---

## 23. PRODUCTION READINESS CHECKLIST

Before calling anything production-ready:

- `npm run validate` passes
- no `any`
- no hardcoded route strings
- no hardcoded query keys
- no hardcoded user-facing strings after Phase 2
- no API calls outside services
- no server data in Zustand
- all service responses parsed through Zod
- auth persisted only to `sessionStorage`
- no auth in `localStorage`
- all data-driven components handle loading/error/empty/success
- dashboard routes guarded
- public pages have SEO metadata
- all page routes lazy-loaded
- `console.log` used only before Phase 6; `logger.*` only from Phase 6 onward
- no deep imports bypassing barrels

---

## 24. GENERATION RULES

When instructed to build a module, component, page, or phase:

1. Create files only at the paths defined in this document
2. Add the JSDoc file header to every `.ts` and `.tsx` file
3. Use design tokens only
4. Use absolute imports with `@/`
5. Keep pages orchestration-only
6. Keep services isolated to `src/services/`
7. Use Zod-inferred types for domain/API data
8. Use `ROUTES` constants, never raw route strings
9. Use `queryKeys` constants, never inline keys
10. Use `src/copy/` for user-facing strings after Phase 2
11. Respect folder activation and phase locks
12. Do not mention deferred work unless it is listed in the phase completion report

---

*End of DDivine Training Master Prompt — v4.2 FINAL*
*Supersedes v4.1 where conflicts existed.*
*Resolved in v4.2: Zod-first domain types, sessionStorage auth, /signup role selector, phase-safe folder activation, consistent service timing, corrected route/page inventory, corrected file ownership rules.*
