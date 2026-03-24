/**
 * @file PageHero.tsx
 * @description Shared hero section for public marketing and support pages with breadcrumb context.
 * @module src/components/sections/PageHero
 */
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { cn } from '@/utils';

export interface IPageHeroBreadcrumb {
  href?: string;
  label: string;
}

export interface IPageHeroProps {
  backgroundImageSrc: string;
  breadcrumbs: readonly IPageHeroBreadcrumb[];
  description: string;
  eyebrow?: string;
  imageAlt: string;
  title: string;
}

export const PageHero = ({
  backgroundImageSrc,
  breadcrumbs,
  description,
  eyebrow,
  imageAlt,
  title,
}: IPageHeroProps) => (
  <section className="relative overflow-hidden rounded-[2rem] bg-dark text-white shadow-xl">
    <img
      alt={imageAlt}
      className="absolute inset-0 h-full w-full object-cover"
      height={720}
      src={backgroundImageSrc}
      width={1280}
    />
    <div className="absolute inset-0 bg-dark/70" />
    <div className="relative z-10 mx-auto flex min-h-[22rem] max-w-content flex-col justify-end gap-4 px-6 py-12 md:px-8 md:py-16">
      <nav aria-label="Breadcrumb" className="font-body text-sm text-surface">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="transition-colors duration-200 hover:text-white" to={ROUTES.HOME}>
              {COMMON_COPY.navigation.home}
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li className="flex items-center gap-2" key={`${breadcrumb.label}-${index + 1}`}>
              <span aria-hidden="true">/</span>
              {breadcrumb.href ? (
                <Link className="transition-colors duration-200 hover:text-white" to={breadcrumb.href}>
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="text-white">{breadcrumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {eyebrow && <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>}
      <div className="max-w-3xl space-y-4">
        <h1 className={cn('font-heading text-4xl uppercase tracking-wide md:text-5xl lg:text-6xl')}>
          {title}
        </h1>
        <p className="max-w-2xl font-body text-base text-surface md:text-lg">
          {description}
        </p>
      </div>
    </div>
  </section>
);
