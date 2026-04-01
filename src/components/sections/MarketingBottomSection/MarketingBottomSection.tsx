/**
 * @file MarketingBottomSection.tsx
 * @description Shared bottom CTA + footer section for public marketing pages.
 * @module src/components/sections/MarketingBottomSection
 */
import { MarketingButton, MarketingFooter, marketingShellClassName } from '@/components/layout';
import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';

export interface IMarketingBottomSectionProps {
  body: string;
  contactHref?: string;
  id?: string;
  imageAlt: string;
  imageSrc: string;
  primaryActionLabel?: string;
  primaryActionTo?: string;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
  title: string;
}

export const MarketingBottomSection = ({
  body,
  contactHref = ROUTES.CONTACT,
  id,
  imageAlt,
  imageSrc,
  primaryActionLabel = COMMON_COPY.actions.learnMore,
  primaryActionTo = ROUTES.SERVICES,
  secondaryActionLabel = COMMON_COPY.actions.contactUs,
  secondaryActionTo = ROUTES.CONTACT,
  title,
}: IMarketingBottomSectionProps) => (
  <>
    <section className="mt-12 bg-[#030B18] text-white lg:mt-44" id={id}>
      <div className={marketingShellClassName}>
        <div className="relative py-12 lg:h-[464px] lg:py-0">
          <div className="relative z-10 max-w-[638px] space-y-8 lg:pt-[64px] lg:space-y-[48px]">
            <div className="space-y-4">
              <h2 className="font-display text-[2.7rem] font-medium uppercase leading-[0.95] text-[#FBFAF2] sm:text-[3.4rem] lg:text-[61px] lg:leading-[73.2px]">
                {title}
              </h2>
              <p className="max-w-[638px] font-copy text-[0.95rem] leading-6 text-white md:text-[1rem] lg:text-[20px] lg:leading-[24px]">
                {body}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <MarketingButton label={primaryActionLabel} to={primaryActionTo} />
              <MarketingButton label={secondaryActionLabel} to={secondaryActionTo} variant="outline-light" />
            </div>
          </div>

          <div className="pointer-events-none mt-10 block lg:absolute lg:right-0 lg:top-[40px] lg:mt-0 lg:h-[418px] lg:w-[841px]">
            <div className="relative h-[16rem] overflow-hidden rounded-[28px] bg-[#112651] sm:h-[20rem] lg:h-full lg:rounded-[34px]">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full opacity-[0.42] mix-blend-soft-light"
                fill="none"
                viewBox="0 0 841 418"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="118.5" y="139.5" width="489" height="170" rx="26.5" stroke="rgba(214,224,244,0.88)" strokeWidth="7" />
                <rect x="118.5" y="187.5" width="111" height="93" stroke="rgba(214,224,244,0.88)" strokeWidth="7" />
                <rect x="496.5" y="187.5" width="111" height="93" stroke="rgba(214,224,244,0.88)" strokeWidth="7" />
                <circle cx="363" cy="224.5" r="60" stroke="rgba(214,224,244,0.88)" strokeWidth="7" />
              </svg>
            </div>
          </div>

          <img
            alt={imageAlt}
           className="pointer-events-none relative z-10 ml-auto mt-[-5rem] h-[18rem] w-[14rem] object-contain sm:h-[25rem] sm:w-[19rem] lg:absolute lg:bottom-[-55px] lg:right-[20px] lg:mt-0 lg:h-[720px] lg:w-[600px]"
            src={imageSrc}
          />
        </div>
      </div>
    </section>

    <MarketingFooter contactHref={contactHref} />
  </>
);
