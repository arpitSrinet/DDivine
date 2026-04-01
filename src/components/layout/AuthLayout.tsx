/**
 * @file AuthLayout.tsx
 * @description Shared split-screen auth shell aligned to the supplied login and signup designs.
 * @module src/components/layout/AuthLayout
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';

import { OfflineBanner } from './OfflineBanner';

const defaultAuthImageSrc =
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1600&q=80';

const defaultAuthImageAlt = 'Children playing football during an outdoor coaching session';

const AuthBrandMark = () => (
  <Link
    aria-label={COMMON_COPY.brandName}
    className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ee4d2] focus-visible:ring-offset-2"
    to="/"
  >
    <svg aria-hidden="true" className="h-[60px] w-[120px] text-[#10295C]" fill="none" viewBox="0 0 120 60">
      <path d="M6 6H24C35.05 6 44 14.95 44 26V34C44 45.05 35.05 54 24 54H6V6Z" stroke="currentColor" strokeWidth="4" />
      <path d="M17 19L12.8 22L14.4 27L20 27.1L22 21.6L17 19Z" fill="currentColor" />
      <path d="M11.4 28.5L8.4 31.4L9.2 36.5L14.2 38.1L18.2 34.6L17.2 29.6L11.4 28.5Z" fill="currentColor" />
      <path d="M18.8 30.1L20.6 35L25.8 35.9L29.2 31.7L27.1 27L21.8 26.7L18.8 30.1Z" fill="currentColor" />
      <path d="M22.6 18.1L27.5 19.4L31.1 15.8L29.1 10.9L24.1 10.2L20.9 14.1L22.6 18.1Z" fill="currentColor" />
      <path d="M29.2 20.5L31.6 25.2L36.9 25.4L39.8 21L37.5 16.3L32.2 16.3L29.2 20.5Z" fill="currentColor" />
      <path d="M53 6H67C85.23 6 100 20.77 100 39V54H84V39C84 29.61 76.39 22 67 22H53V6Z" fill="currentColor" />
      <text fill="currentColor" fontFamily="Ubuntu, sans-serif" fontSize="12" fontWeight="500" letterSpacing="0.12em" x="55" y="53">
        DIVINE
      </text>
    </svg>
  </Link>
);

export interface IAuthLayoutProps {
  children: ReactNode;
  description: string;
  eyebrow?: string;
  imageAlt?: string;
  imageSrc?: string;
  title: string;
  wide?: boolean;
}

export const AuthLayout = ({
  children,
  description,
  eyebrow,
  imageAlt = defaultAuthImageAlt,
  imageSrc = defaultAuthImageSrc,
  title,
  wide = false,
}: IAuthLayoutProps) => {
  useScrollRestoration();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8 lg:px-12">
        <OfflineBanner />
      </div>

      <div className="mx-auto max-w-[90rem]">
        {/* Top navbar — identical on every auth page */}
        <header className="flex items-center px-4 py-6 sm:px-8 lg:px-12">
          <AuthBrandMark />
        </header>

        {/* Split layout — image panel is always the same position and size */}
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-108px)]">
          {/* Left: image — always 41% wide on desktop, flush below the navbar */}
          <aside className="order-2 overflow-hidden bg-[#EEF2F5] lg:order-1 lg:w-[41%] lg:flex-shrink-0">
            <img
              alt={imageAlt}
              className="h-[20rem] w-full object-cover object-center sm:h-[28rem] lg:h-full"
              src={imageSrc}
            />
          </aside>

          {/* Right: content — both modes vertically centred */}
          <main className="order-1 flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-8 lg:order-2 lg:px-10 lg:py-8">
            {wide ? (
              <div className="flex w-full flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-4 text-center">
                  {eyebrow ? (
                    <p className="font-copy text-[0.82rem] font-medium uppercase tracking-[0.22em] text-[#7A7A7A]">
                      {eyebrow}
                    </p>
                  ) : null}
                  <h1 className="font-display text-[3.5rem] font-medium leading-[1.2] text-[#121212] sm:text-[3.8rem] lg:text-[61px]">
                    {title}
                  </h1>
                  <p className="font-copy text-xl leading-7 text-[#414141]">{description}</p>
                </div>
                {children}
              </div>
            ) : (
              <section className="w-full max-w-[34rem]">
                {eyebrow ? (
                  <p className="font-copy text-[0.82rem] font-medium uppercase tracking-[0.22em] text-[#7A7A7A]">
                    {eyebrow}
                  </p>
                ) : null}
                <h1 className="mt-2 font-display text-[3.2rem] leading-[0.88] text-[#121212] sm:text-[4rem]">
                  {title}
                </h1>
                <p className="mt-3 font-copy text-[1rem] leading-8 text-[#5C5C5C] sm:text-[1.05rem]">
                  {description}
                </p>
                <div className="mt-8">
                  {children}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
