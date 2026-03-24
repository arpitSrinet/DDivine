/**
 * @file CTABanner.tsx
 * @description Shared closing CTA banner used across public marketing pages.
 * @module src/components/sections/CTABanner
 */
import { ActionLink } from '../ActionLink';
import type { IActionLinkProps } from '../ActionLink';

export interface ICTABannerProps {
  body: string;
  imageAlt: string;
  imageSrc: string;
  primaryCta: IActionLinkProps;
  secondaryCta: IActionLinkProps;
  title: string;
}

export const CTABanner = ({
  body,
  imageAlt,
  imageSrc,
  primaryCta,
  secondaryCta,
  title,
}: ICTABannerProps) => (
  <section className="overflow-hidden rounded-[2rem] bg-dark text-white shadow-xl">
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="space-y-5 px-6 py-10 md:px-8 md:py-12">
        <h2 className="font-heading text-3xl uppercase tracking-wide md:text-4xl">{title}</h2>
        <p className="max-w-2xl font-body text-base text-surface">{body}</p>
        <div className="flex flex-wrap gap-3">
          <ActionLink {...primaryCta} />
          <ActionLink {...secondaryCta} />
        </div>
      </div>
      <div className="h-full">
        <img
          alt={imageAlt}
          className="h-full min-h-[18rem] w-full object-cover"
          height={720}
          loading="lazy"
          src={imageSrc}
          width={960}
        />
      </div>
    </div>
  </section>
);
