/**
 * @file ContactUsPage.tsx
 * @description Bespoke public contact page aligned closely to the supplied marketing design.
 * @module src/pages/public/ContactUsPage
 */
import { useState, type ReactNode } from 'react';

import { MarketingFooter, MarketingHeader, marketingShellClassName } from '@/components/layout';
import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const shellClassName = marketingShellClassName;

const heroImageSrc =
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1800&q=80';

const profileAvatarSrc =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';

const mapEmbedSrc =
  'https://www.google.com/maps?q=14%20Viking%20Road%20Wouldham%20Kent%20United%20Kingdom%20ME1%203GJ&z=15&output=embed';

type TContactAudience = 'parent' | 'school';

const ContactCardIcon = ({
  children,
}: {
  children: ReactNode;
}) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B2B8C2] text-[#08193A]">
    {children}
  </div>
);

const ContactInfoRow = ({
  details,
  icon,
  title,
}: {
  details: ReactNode;
  icon: ReactNode;
  title: string;
}) => (
  <div className="flex items-start gap-5">
    <ContactCardIcon>{icon}</ContactCardIcon>
    <div className="space-y-1">
      <h3 className="font-copy text-[1.2rem] font-medium leading-6 text-[#0F172A] lg:text-[20px]">
        {title}
      </h3>
      <div className="font-copy text-[16px] leading-[19.2px] text-[#475569]">
        {details}
      </div>
    </div>
  </div>
);

const ContactSubmitButton = () => (
  <button
    className="inline-flex h-[60px] w-full items-center justify-center rounded-[2px] bg-[#90D4C1] px-[18px] py-[12px] font-display text-[1.45rem] leading-[30px] text-[#030B18] transition hover:bg-[#7fcdb8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08193A] focus-visible:ring-offset-2 sm:w-[244px] lg:text-[25px]"
    type="submit"
  >
    Send us a message
  </button>
);

const ContactUsPage = () => {
  useScrollRestoration();
  const [audience, setAudience] = useState<TContactAudience>('parent');
  const isSchoolAudience = audience === 'school';

  return (
    <>
      <PageSEO description={SEO_META.contact.description} title={SEO_META.contact.title} />
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[2px] focus:bg-[#9ee4d2] focus:px-4 focus:py-2 focus:font-copy focus:font-medium focus:text-[#09131d]"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>

      <main className="bg-white text-[#121212]" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#08193A] text-white min-h-[30rem] lg:h-[760px]">
          <img
            alt="Coach standing with a child during a sports session"
            className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
            src={heroImageSrc}
          />
          <div className="absolute inset-0 bg-[#08193A]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08193A]/82 via-[#08193A]/58 to-[#08193A]/42" />

          <div className={`relative z-10 ${shellClassName}`}>
            <MarketingHeader
              avatarAlt="Signed-in user avatar"
              avatarSrc={profileAvatarSrc}
              contactHref={ROUTES.CONTACT}
              variant="logged-in"
            />

            <div className="pb-12 pt-12 md:pb-16 md:pt-24 lg:min-h-[579px] lg:pb-[104px] lg:pt-[344px]">
              <div className="max-w-[990px] space-y-2">
                <h1 className="font-display text-[3rem] leading-[0.88] text-white sm:text-[4.4rem] lg:text-[76px] lg:leading-[91.2px]">
                  Get in touch
                </h1>
                <p className="max-w-[939px] font-copy text-[0.98rem] leading-6 text-white md:text-[1rem] lg:text-[20px] lg:leading-[24px]">
                  Whether you&apos;re a parent or school, we&apos;d love to hear how we can help make sports inclusive, fun and safe for your children or pupils and develop their talents. Complete a quick enquiry form below and one of our friendly coaches will get in touch to chat about your query.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} pb-20 pt-12 md:pt-16 lg:pb-[96px] lg:pt-[64px]`}>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[48px]">
            <div className="flex flex-col gap-8 lg:w-[438.66px] lg:shrink-0">
              <article className="rounded-[2px] bg-white p-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-[#B6B6B6] lg:w-[438.66px]">
                <div className="space-y-8">
                  <h2 className="font-display text-[1.55rem] leading-[30px] text-[#08193A] lg:text-[25px]">
                    Contact Information
                  </h2>

                  <div className="space-y-8">
                    <ContactInfoRow
                      icon={(
                        <svg aria-hidden="true" className="h-5 w-4" fill="none" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 19C11.5 14.8 14 11.64 14 8.5A6 6 0 1 0 2 8.5C2 11.64 4.5 14.8 8 19Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
                          <circle cx="8" cy="8" fill="currentColor" r="2.2" />
                        </svg>
                      )}
                      title="Office Address"
                      details={(
                        <address className="not-italic">
                          DDivine Training
                          <br />
                          14 Viking Road Wouldham, Kent
                          <br />
                          United Kingdom ME1 3GJ
                        </address>
                      )}
                    />

                    <ContactInfoRow
                      icon={(
                        <svg aria-hidden="true" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.29 1.5H2.3C1.86 1.5 1.5 1.86 1.5 2.3C1.5 10.42 7.58 16.5 15.7 16.5C16.14 16.5 16.5 16.14 16.5 15.7V12.71C16.5 12.35 16.25 12.04 15.89 11.96L12.75 11.2C12.44 11.12 12.11 11.22 11.89 11.45L10.15 13.19C7.83 12 6 10.17 4.81 7.85L6.55 6.11C6.78 5.89 6.88 5.56 6.8 5.25L6.04 2.11C5.96 1.75 5.65 1.5 5.29 1.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                        </svg>
                      )}
                      title="Phone Number"
                      details={(
                        <div>
                          <a className="transition hover:text-[#08193A]" href="tel:+4407456460793">
                            +44 07456 460 793
                          </a>
                          <br />
                          Mon-Fri, 9am - 6pm EST
                        </div>
                      )}
                    />

                    <ContactInfoRow
                      icon={(
                        <svg aria-hidden="true" className="h-4 w-5" fill="none" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 2H18V14H2V2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
                          <path d="M2.75 3L10 8.5L17.25 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                        </svg>
                      )}
                      title="Support Email"
                      details={(
                        <a className="transition hover:text-[#08193A]" href="mailto:info@ddivinetraining.com">
                          info@ddivinetraining.com
                        </a>
                      )}
                    />
                  </div>
                </div>
              </article>

              <div className={`relative overflow-hidden rounded-[2px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-[#E2E8F0] lg:w-[438.66px] ${isSchoolAudience ? 'h-[240px]' : 'h-[360px]'}`}>
                <iframe
                  className="absolute inset-[1px] h-[calc(100%-2px)] w-[calc(100%-2px)] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedSrc}
                  title="DDivine Training office map"
                />
              </div>
            </div>

            <section className={`rounded-[2px] bg-white px-6 py-8 outline outline-1 outline-offset-[-1px] outline-[#B6B6B6] sm:px-8 lg:w-[857px] lg:px-10 lg:pt-10 ${isSchoolAudience ? 'lg:min-h-[1486px] lg:pb-14' : 'lg:min-h-[793px] lg:pb-14'}`}>
              <form
                className="flex h-full flex-col gap-8"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="space-y-2">
                  <h2 className="font-display text-[1.55rem] leading-[30px] text-[#0F172A] lg:text-[25px]">
                    Send us a Message
                  </h2>
                  <p className="font-copy text-[16px] leading-[19.2px] text-[#475569]">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <div className="grid gap-6 lg:w-[776px] lg:grid-cols-[351px_400px]">
                  <label className="space-y-2 lg:w-[351px]">
                    <span className="block font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                      Full Name
                    </span>
                    <input
                      className="h-[54px] w-full rounded-[2px] border border-[#929292] px-4 py-2.5 font-copy text-[13px] leading-[15.6px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                      placeholder="Enter full name"
                      type="text"
                    />
                  </label>

                  <label className="space-y-2 lg:w-[400px]">
                    <span className="block font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                      Email Address
                    </span>
                    <input
                      className="h-[54px] w-full rounded-[2px] border border-[#929292] px-4 py-2.5 font-copy text-[13px] leading-[15.6px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                      placeholder="Enter email address"
                      type="email"
                    />
                  </label>
                </div>

                <label className="space-y-2 lg:w-[777px]">
                  <span className="block font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                    Are you a school or parent?
                  </span>
                  <div className="relative">
                    <select
                      className="h-[60px] w-full appearance-none rounded-[2px] border border-[#929292] bg-white px-4 py-2.5 font-copy text-[16px] leading-[19.2px] text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                      onChange={(event) => setAudience(event.target.value as TContactAudience)}
                      value={audience}
                    >
                      <option value="parent">Parent</option>
                      <option value="school">School</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#929292]" aria-hidden="true">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                      </svg>
                    </span>
                  </div>
                </label>

                {isSchoolAudience ? (
                  <>
                    <label className="space-y-2 lg:w-[777px]">
                      <span className="block font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                        School name
                      </span>
                      <input
                        className="h-[60px] w-full rounded-[2px] border border-[#929292] px-4 py-5 font-copy text-[16px] leading-[19.2px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                        placeholder="Enter school name"
                        type="text"
                      />
                    </label>

                    <label className="space-y-2 lg:w-[777px]">
                      <span className="block font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                        Your job title
                      </span>
                      <input
                        className="h-[60px] w-full rounded-[2px] border border-[#929292] px-4 py-5 font-copy text-[16px] leading-[19.2px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                        placeholder="Enter job title"
                        type="text"
                      />
                    </label>

                    <div className="space-y-3 lg:w-[777px]">
                      <span className="block font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                        School address
                      </span>

                      <label className="space-y-3 lg:w-[777px]">
                        <span className="block font-copy text-[16px] leading-[19.2px] text-[#121212]">
                          Street address
                        </span>
                        <input
                          className="h-[60px] w-full rounded-[2px] border border-[#929292] px-4 py-5 font-copy text-[16px] leading-[19.2px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                          placeholder="10 church street"
                          type="text"
                        />
                      </label>

                      <label className="space-y-3 lg:w-[777px]">
                        <span className="block font-copy text-[16px] leading-[19.2px] text-[#121212]">
                          Address line 2
                        </span>
                        <input
                          className="h-[60px] w-full rounded-[2px] border border-[#929292] px-4 py-5 font-copy text-[16px] leading-[19.2px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                          placeholder="Woodside"
                          type="text"
                        />
                      </label>

                      <div className="grid gap-8 lg:w-[777px] lg:grid-cols-[396px_347px]">
                        <label className="space-y-3 lg:w-[396px]">
                          <span className="block font-copy text-[16px] leading-[19.2px] text-[#121212]">
                            City
                          </span>
                          <input
                            className="h-[60px] w-full rounded-[2px] border border-[#929292] px-4 py-5 font-copy text-[16px] leading-[19.2px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                            placeholder="Woodside"
                            type="text"
                          />
                        </label>

                        <label className="space-y-3 lg:w-[347px]">
                          <span className="block font-copy text-[16px] leading-[19.2px] text-[#121212]">
                            Post code
                          </span>
                          <input
                            className="h-[60px] w-full rounded-[2px] border border-[#929292] px-4 py-5 font-copy text-[16px] leading-[19.2px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                            placeholder="Woodside"
                            type="text"
                          />
                        </label>
                      </div>

                      <label className="space-y-3 lg:w-[777px]">
                        <span className="block font-copy text-[16px] leading-[19.2px] text-[#121212]">
                          Country
                        </span>
                        <div className="relative">
                          <select
                            className="h-[60px] w-full appearance-none rounded-[2px] border border-[#929292] bg-white px-4 py-5 font-copy text-[16px] leading-[19.2px] text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                            defaultValue="United Kingdom"
                          >
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Canada</option>
                          </select>
                          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#929292]" aria-hidden="true">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                            </svg>
                          </span>
                        </div>
                      </label>
                    </div>
                  </>
                ) : null}

                <label className="space-y-2 lg:w-[775px]">
                  <span className="block font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                    How can we help?
                  </span>
                  <textarea
                    className="h-[136px] w-full resize-none rounded-[2px] border border-[#929292] px-4 py-4 font-copy text-[16px] leading-[19.2px] text-[#121212] placeholder:text-[#B6B6B6] focus:border-[#08193A] focus:outline-none focus:ring-2 focus:ring-[#08193A]/15"
                    placeholder="Send us a message........."
                  />
                </label>

                <div className="flex h-[76px] w-full max-w-[302px] items-center justify-between rounded-[3px] border border-[#D3D3D3] bg-[#F9F9F9] px-3">
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-[2px] border border-[#B6B6B6] bg-white" aria-hidden="true" />
                    <span className="font-copy text-[16px] leading-[19.2px] text-[#121212]">
                      I&apos;m not a robot
                    </span>
                  </div>

                  <div className="space-y-1 text-right">
                    <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-[6px] bg-[linear-gradient(135deg,#4285F4,#1C3AA9)] text-[10px] font-bold text-white">
                      R
                    </div>
                    <div className="font-copy text-[11px] leading-[1] text-[#4B5563]">reCAPTCHA</div>
                    <div className="font-copy text-[9px] leading-[1] text-[#6B7280]">Privacy - Terms</div>
                  </div>
                </div>

                <ContactSubmitButton />
              </form>
            </section>
          </div>
        </section>

        <MarketingFooter contactHref={ROUTES.CONTACT} />
      </main>
    </>
  );
};

export default ContactUsPage;
