/**
 * @file MarketingCtaSection.tsx
 * @description Shared CTA section for bespoke marketing pages.
 * @module src/components/sections/MarketingCtaSection
 */
import { MarketingButton, marketingShellClassName } from '@/components/layout';
import { ROUTES } from '@/constants';

export interface IMarketingCtaSectionProps {
  body: string;
  childImageAlt?: string;
  childImageSrc?: string;
  id?: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
}

export const MarketingCtaSection = ({
  body,
  childImageAlt,
  childImageSrc,
  id,
  imageAlt,
  imageSrc,
  title,
}: IMarketingCtaSectionProps) => (
  <section className={`${marketingShellClassName} py-12 md:py-16 lg:py-20`} id={id}>
    <div className="relative overflow-hidden bg-[#09131d] text-white">
      <div className="absolute inset-0">
        <img
          alt={imageAlt}
          className="h-full w-full object-cover opacity-18 mix-blend-soft-light"
          loading="lazy"
          src={imageSrc}
        />
      </div>
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
        <div className="px-6 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
          <h2 className="max-w-[34rem] font-display text-[2.15rem] uppercase leading-[0.9] tracking-[0.008em] text-white sm:text-[3.15rem] lg:text-[4rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-[34rem] font-copy text-[0.98rem] leading-7 text-white/80 md:text-[1.02rem]">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MarketingButton label="Learn more" to={ROUTES.SERVICES} />
            <MarketingButton label="Contact us" to={ROUTES.CONTACT} variant="outline-light" />
          </div>
        </div>
        <div className="relative h-full overflow-hidden lg:min-h-[25rem]">
          <img
            alt={imageAlt}
            className="h-full min-h-[18rem] w-full object-cover opacity-35 mix-blend-soft-light lg:min-h-[24rem]"
            loading="lazy"
            src={imageSrc}
          />
          {childImageSrc ? (
            <img
              alt={childImageAlt ?? imageAlt}
              className="absolute bottom-0 right-6 hidden h-[29rem] w-[20.5rem] object-cover lg:block"
              loading="lazy"
              src={childImageSrc}
            />
          ) : null}
        </div>
      </div>
    </div>
  </section>
);
