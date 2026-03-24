/**
 * @file ServiceDetailHero.tsx
 * @description Service-specific hero with supporting copy and optional CTA actions.
 * @module src/components/sections/ServiceDetailHero
 */
import { ActionLink } from '../ActionLink';
import { PageHero } from '../PageHero';
import type { IActionLinkProps } from '../ActionLink';
import type { IPageHeroBreadcrumb } from '../PageHero';

export interface IServiceDetailHeroProps {
  backgroundImageSrc: string;
  body: string;
  breadcrumbs: readonly IPageHeroBreadcrumb[];
  imageAlt: string;
  primaryCta?: IActionLinkProps;
  secondaryCta?: IActionLinkProps;
  title: string;
}

export const ServiceDetailHero = ({
  backgroundImageSrc,
  body,
  breadcrumbs,
  imageAlt,
  primaryCta,
  secondaryCta,
  title,
}: IServiceDetailHeroProps) => (
  <div className="space-y-6">
    <PageHero
      backgroundImageSrc={backgroundImageSrc}
      breadcrumbs={breadcrumbs}
      description={body}
      imageAlt={imageAlt}
      title={title}
    />
    {(primaryCta || secondaryCta) && (
      <div className="flex flex-wrap gap-3">
        {primaryCta && <ActionLink {...primaryCta} />}
        {secondaryCta && <ActionLink {...secondaryCta} variant={secondaryCta.variant ?? 'ghost'} />}
      </div>
    )}
  </div>
);
