/**
 * @file PageSEO.tsx
 * @description Helmet wrapper for per-page metadata and optional noindex handling.
 * @module src/seo/PageSEO
 */
import { Helmet } from 'react-helmet-async';

export interface IPageSEOProps {
  description: string;
  noIndex?: boolean;
  title: string;
}

const siteName = 'DDivine Training';

export const PageSEO = ({
  description,
  noIndex = false,
  title,
}: IPageSEOProps) => (
  <Helmet>
    <title>{`${title} | ${siteName}`}</title>
    <meta content={description} name="description" />
    {noIndex && <meta content="noindex, nofollow" name="robots" />}
    <meta content={`${title} | ${siteName}`} property="og:title" />
    <meta content={description} property="og:description" />
    <meta content="website" property="og:type" />
  </Helmet>
);
