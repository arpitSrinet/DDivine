/**
 * @file format.utils.ts
 * @description Shared date and time formatting utilities using native Intl APIs only.
 * @module src/utils/format
 */
const buildDate = (isoString: string): Date => new Date(isoString);

export const formatDate = (isoString: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(buildDate(isoString));

export const formatTime = (isoString: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(buildDate(isoString));

export const formatDateShort = (isoString: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(buildDate(isoString));

export const formatDateTimeRelative = (isoString: string): string => {
  const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });
  const differenceInSeconds = (buildDate(isoString).getTime() - Date.now()) / 1000;

  if (Math.abs(differenceInSeconds) < 3600) {
    return relativeTimeFormatter.format(Math.round(differenceInSeconds / 60), 'minute');
  }

  if (Math.abs(differenceInSeconds) < 86400) {
    return relativeTimeFormatter.format(Math.round(differenceInSeconds / 3600), 'hour');
  }

  return relativeTimeFormatter.format(Math.round(differenceInSeconds / 86400), 'day');
};

export const toISODateString = (date: Date): string => date.toISOString();
