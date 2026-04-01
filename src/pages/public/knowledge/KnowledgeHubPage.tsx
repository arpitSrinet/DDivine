/**
 * @file KnowledgeHubPage.tsx
 * @description Bespoke public knowledge hub page aligned closely to the supplied marketing design.
 * @module src/pages/public/knowledge/KnowledgeHubPage
 */
import { Link } from 'react-router-dom';

import { MarketingHeader, marketingShellClassName } from '@/components/layout';
import { MarketingBottomSection } from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, KNOWLEDGE_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

type TKnowledgeHubCard = {
  body: string;
  href: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

type TGalleryImage = {
  alt: string;
  desktopClassName: string;
  src: string;
};

const shellClassName = marketingShellClassName;

const heroImageSrc =
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1800&q=80';

const knowledgeHubIntro =
  'Explore our knowledge hub to find case studies so you can discover how we deliver inclusive, safe, and fun football services to our current clients and can do the same for you. Access free activities and resources in our dedicated section and find answers to your questions in our FAQs.';

const knowledgeHubCards: readonly TKnowledgeHubCard[] = [
  {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus.',
    href: ROUTES.KNOWLEDGE_CASE_STUDIES,
    imageAlt: 'Football coaching equipment laid out around a small board on a grass surface',
    imageSrc:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80',
    title: 'Case studies',
  },
  {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus.',
    href: ROUTES.KNOWLEDGE_FREE,
    imageAlt: 'Coach kneeling with children on a football pitch at sunset',
    imageSrc:
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80',
    title: 'Free activities',
  },
  {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus.',
    href: ROUTES.KNOWLEDGE_FAQS,
    imageAlt: 'Family sitting together during an advice session',
    imageSrc:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    title: 'Frequently asked questions',
  },
] as const;

const galleryImages: readonly TGalleryImage[] = [
  {
    alt: 'Children running during a football session',
    desktopClassName: 'left-[-39px] top-[50px]',
    src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
  },
  {
    alt: 'Coach speaking with a group of young players',
    desktopClassName: 'left-[280px] top-0',
    src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80',
  },
  {
    alt: 'Cone drill on a football pitch',
    desktopClassName: 'left-[609px] top-[50px]',
    src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
  },
  {
    alt: 'Coach showing tactics to children in a football session',
    desktopClassName: 'left-[938px] top-0',
    src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
  },
  {
    alt: 'Child working through an agility ladder drill',
    desktopClassName: 'left-[1267px] top-[50px]',
    src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80',
  },
] as const;

const ctaBody =
  "Our expert team provides fun, inclusive curricular and extra curricular activities and flexible care before and after school. Book your child's place online, or if you're a school, contact us today to get started!";

const KnowledgeHubCard = ({
  item,
}: {
  item: TKnowledgeHubCard;
}) => (
  <Link
    className="group block transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08193A] focus-visible:ring-offset-4"
    to={item.href}
  >
    <article className="overflow-hidden rounded-[2px] lg:w-[432px]">
      <img
        alt={item.imageAlt}
        className="h-[15rem] w-full rounded-t-[2px] object-cover sm:h-[18rem] lg:h-[284px] lg:w-[432px]"
        loading="lazy"
        src={item.imageSrc}
      />
      <div className="min-h-[132px] bg-[#90D4C1] px-4 py-4 lg:min-h-[111px]">
        <h2 className="font-copy text-[1.45rem] font-bold leading-[1.1] text-[#121212] lg:text-[25px] lg:leading-[35px]">
          {item.title}
        </h2>
        <p className="mt-1 font-copy text-[0.95rem] leading-5 text-[#121212] lg:text-[16px] lg:leading-[19.2px]">
          {item.body}
        </p>
      </div>
    </article>
  </Link>
);

const KnowledgeHubPage = () => {
  useScrollRestoration();

  return (
    <>
      <PageSEO description={SEO_META.knowledgeHub.description} title={SEO_META.knowledgeHub.title} />
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[2px] focus:bg-[#9ee4d2] focus:px-4 focus:py-2 focus:font-copy focus:font-medium focus:text-[#09131d]"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>

      <main className="bg-white text-[#09131d]" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#08193A] text-white">
          <img
            alt={KNOWLEDGE_COPY.hubTitle}
            className="absolute inset-0 h-full w-full object-cover object-[center_34%] opacity-60"
            src={heroImageSrc}
          />
          <div className="absolute inset-0 bg-[#08193A]/78" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08193A]/62 via-[#08193A]/34 to-[#08193A]/42" />

          <div className={`relative z-10 min-h-[30rem] ${shellClassName} lg:h-[760px]`}>
            <MarketingHeader contactHref={ROUTES.CONTACT} />

            <div className="pb-12 pt-12 md:pb-16 md:pt-24 lg:min-h-[655px] lg:pb-[80px] lg:pt-[304px]">
              <div className="max-w-[379px] space-y-2">
                <h1 className="font-display text-[3rem] leading-[0.88] text-white sm:text-[4.4rem] lg:text-[76px] lg:leading-[91.2px]">
                  Knowledge Hub
                </h1>
                <p className="font-copy text-[0.95rem] leading-6 text-white sm:text-[1rem] lg:text-[20px] lg:leading-[24px]">
                  Providing access to valuable services and resources to enhance your child&apos;s or students&apos; life experiences is a priority of ours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} pt-12 md:pt-14 lg:pt-[64px]`}>
          <p className="max-w-[1350px] font-copy text-[1rem] leading-7 text-[#121212] lg:text-[20px] lg:leading-[28px]">
            {knowledgeHubIntro}
          </p>

          <div className="mt-10 grid gap-6 lg:mt-[48px] lg:grid-cols-[repeat(3,432px)] lg:gap-[24px]">
            {knowledgeHubCards.map((item) => (
              <KnowledgeHubCard item={item} key={item.title} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden pb-16 pt-16 md:pb-20 md:pt-20 lg:pb-[358px] lg:pt-[193px]">
          <div className={`${shellClassName} grid gap-6 sm:grid-cols-2 lg:hidden`}>
            {galleryImages.map((image) => (
              <img
                alt={image.alt}
                className="h-[16rem] w-full rounded-[2px] object-cover sm:h-[20rem]"
                key={image.alt}
                loading="lazy"
                src={image.src}
              />
            ))}
          </div>

          <div className="relative mx-auto hidden h-[402px] max-w-[1440px] lg:block">
            {galleryImages.map((image) => (
              <img
                alt={image.alt}
                className={`absolute h-[352px] w-[276px] rounded-[2px] object-cover ${image.desktopClassName}`}
                key={image.alt}
                loading="lazy"
                src={image.src}
              />
            ))}
          </div>
        </section>

        <MarketingBottomSection
          body={ctaBody}
          id="knowledge-hub-cta"
          imageAlt="Child holding a football"
          imageSrc="/assets/policy-cta-boy.png"
          title={COMMON_COPY.ctaBanner.title}
        />
      </main>
    </>
  );
};

export default KnowledgeHubPage;
