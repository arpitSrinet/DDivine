/**
 * @file HeroSection.tsx
 * @description Home page hero with image backdrop, copy, and CTA actions.
 * @module src/components/sections/HeroSection
 */
import { ActionLink } from '../ActionLink';
import type { IActionLinkProps } from '../ActionLink';

export interface IHeroSectionProps {
  backgroundImageSrc: string;
  body: string;
  imageAlt: string;
  primaryCta: IActionLinkProps;
  secondaryCta: IActionLinkProps;
  title: string;
}

export const HeroSection = ({
  backgroundImageSrc,
  body,
  imageAlt,
  primaryCta,
  secondaryCta,
  title,
}: IHeroSectionProps) => (
  <section className="relative overflow-hidden rounded-[2rem] bg-dark text-white shadow-xl">
    <img
      alt={imageAlt}
      className="absolute inset-0 h-full w-full object-cover"
      height={900}
      src={backgroundImageSrc}
      width={1280}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/50" />
    <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-content items-end px-6 py-12 md:px-8 md:py-16">
      <div className="max-w-3xl space-y-6">
        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          DDivine Training
        </span>
        <h1 className="font-heading text-4xl uppercase tracking-wide md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl font-body text-base text-surface md:text-lg">
          {body}
        </p>
        <div className="flex flex-wrap gap-3">
          <ActionLink {...primaryCta} />
          <ActionLink {...secondaryCta} />
        </div>
      </div>
    </div>
  </section>
);
