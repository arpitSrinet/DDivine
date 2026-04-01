/**
 * @file PoliciesPage.tsx
 * @description Bespoke public policies page aligned to the supplied document-style design.
 * @module src/pages/public/PoliciesPage
 */
import { useState } from 'react';

import { OfflineBanner, MarketingHeader, marketingShellClassName } from '@/components/layout';
import { MarketingBottomSection } from '@/components/sections';
import { ROUTES } from '@/constants';
import { ABOUT_COPY, COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

type TPolicySectionProps = {
  id?: string;
  paragraphs: readonly string[];
  summaryParagraphs: readonly string[];
  summaryTitle: string;
  title: string;
};

type TPolicyDetailSectionProps = {
  id: string;
  paragraphs: readonly string[];
  title: string;
};

const getPolicyAnchorId = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const PolicySection = ({
  id,
  paragraphs,
  summaryParagraphs,
  summaryTitle,
  title,
}: TPolicySectionProps) => (
  <section className="scroll-mt-24 space-y-10" id={id}>
    <div className="space-y-6">
      <h2 className="font-copy text-xl font-medium uppercase leading-7 text-[#121212]">
        {title}
      </h2>
      <div className="space-y-7">
        {paragraphs.map((paragraph, index) => (
          <p className="font-copy text-lg leading-8 text-[#414141]" key={`${title}-paragraph-${index}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
    <div className="space-y-6">
      <h3 className="font-copy text-xl font-medium uppercase leading-7 text-[#121212]">
        {summaryTitle}
      </h3>
      <div className="space-y-7">
        {summaryParagraphs.map((paragraph, index) => (
          <p className="font-copy text-lg leading-8 text-[#414141]" key={`${summaryTitle}-paragraph-${index}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </section>
);

const PolicyDetailSection = ({
  id,
  paragraphs,
  title,
}: TPolicyDetailSectionProps) => (
  <section className="scroll-mt-24 space-y-6" id={id}>
    <h3 className="font-copy text-xl font-medium uppercase leading-7 text-[#121212]">
      {title}
    </h3>
    <div className="space-y-7">
      {paragraphs.map((paragraph, index) => (
        <p className="font-copy text-lg leading-8 text-[#414141]" key={`${id}-paragraph-${index}`}>
          {paragraph}
        </p>
      ))}
    </div>
  </section>
);

const PoliciesPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  useScrollRestoration();

  const activeTabLabel = COMMON_COPY.policiesPage.tabs[activeTabIndex];
  const activeTabId = getPolicyAnchorId(activeTabLabel);
  const introSection = COMMON_COPY.policiesPage.sections[0];
  const detailParagraphs = COMMON_COPY.policiesPage.sections[1].paragraphs;
  const activePolicyDetails = COMMON_COPY.policiesPage.tableOfContents.items.map((item, index) => ({
    id: `${activeTabId}-topic-${index + 1}`,
    paragraphs: detailParagraphs,
    title: item,
  }));

  return (
    <>
      <PageSEO description={SEO_META.policies.description} title={SEO_META.policies.title} />
      <div className="bg-white text-[#121212]">
        <section className="bg-[#08193A] text-white">
          <div className={marketingShellClassName}>
            <MarketingHeader compact contactHref={ROUTES.CONTACT} />
          </div>
        </section>

        <div className={`${marketingShellClassName} pt-4`}>
          <OfflineBanner />
        </div>

        <main className={`${marketingShellClassName} pb-24 pt-12`} id="main-content">
          <section className="max-w-[84rem] space-y-4">
            <h1 className="font-display text-[4.5rem] font-medium leading-[0.92] text-[#121212] sm:text-[5rem] lg:text-[5.25rem]">
              {COMMON_COPY.policiesPage.title}
            </h1>
            <p className="max-w-[84rem] font-copy text-lg leading-7 text-[#121212] lg:text-xl lg:leading-7">
              {COMMON_COPY.policiesPage.description}
            </p>
          </section>

          <section className="mt-14 border-b border-[#b6b6b6]">
            <div aria-label="Policy categories" className="flex flex-wrap gap-x-10 gap-y-3" role="tablist">
              {COMMON_COPY.policiesPage.tabs.map((tab, index) => {
                const isSelected = index === activeTabIndex;

                return (
                  <button
                    aria-controls="policy-document-panel"
                    aria-selected={isSelected}
                    className={`border-b-2 pb-3 font-copy text-sm leading-5 transition-colors sm:text-base ${
                      isSelected
                        ? 'border-[#08193A] font-medium text-[#08193A]'
                        : 'border-transparent text-[#b6b6b6]'
                    }`}
                    id={`${getPolicyAnchorId(tab)}-tab`}
                    key={tab}
                    onClick={() => setActiveTabIndex(index)}
                    role="tab"
                    type="button"
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </section>

          <div aria-labelledby={`${activeTabId}-tab`} className="space-y-16 pt-10 lg:space-y-20" id="policy-document-panel" role="tabpanel">
            <PolicySection
              id={`${activeTabId}-overview`}
              paragraphs={introSection.paragraphs}
              summaryParagraphs={introSection.summaryParagraphs}
              summaryTitle={introSection.summaryTitle}
              title={activeTabLabel}
            />

            <section className="space-y-6">
              <h2 className="font-copy text-xl font-medium uppercase leading-7 text-[#121212]">
                {COMMON_COPY.policiesPage.tableOfContents.title}
              </h2>
              <ol className="space-y-1 font-copy text-lg uppercase leading-8 text-[#08193A]">
                {activePolicyDetails.map((section, index) => (
                  <li key={section.id}>
                    <a
                      className="transition hover:text-[#030B18] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08193A] focus-visible:ring-offset-2"
                      href={`#${section.id}`}
                    >
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-12">
              {activePolicyDetails.map((section) => (
                <PolicyDetailSection
                  id={section.id}
                  key={section.id}
                  paragraphs={section.paragraphs}
                  title={section.title}
                />
              ))}
            </section>
          </div>
        </main>

        <MarketingBottomSection
          body={ABOUT_COPY.ctaBody}
          id="policy-cta"
          imageAlt="Child holding a football"
          imageSrc="/assets/policy-cta-boy.png"
          title={COMMON_COPY.ctaBanner.title}
        />
      </div>
    </>
  );
};

export default PoliciesPage;
