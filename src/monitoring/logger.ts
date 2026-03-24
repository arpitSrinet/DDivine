/**
 * @file logger.ts
 * @description Structured logger wrapper used instead of raw console calls from Phase 6 onward.
 * @module src/monitoring/logger
 */
import { env } from '@/config/env.config';

type TLogContext = Record<string, unknown>;
type TLogLevel = 'debug' | 'error' | 'info' | 'warn';

const isDevelopment = env.appEnv === 'development';

const formatContext = (context?: TLogContext): string => {
  if (!context || Object.keys(context).length === 0) {
    return '';
  }

  return ` ${JSON.stringify(context)}`;
};

const writeLog = (level: TLogLevel, message: string, context?: TLogContext): void => {
  if (!isDevelopment && level !== 'error' && level !== 'warn') {
    return;
  }

  const formattedMessage = `[${level.toUpperCase()}] ${message}${formatContext(context)}`;

  if (level === 'error') {
    console.error(formattedMessage);
    return;
  }

  if (level === 'warn') {
    console.warn(formattedMessage);
    return;
  }

  if (level === 'info') {
    console.info(formattedMessage);
    return;
  }

  console.debug(formattedMessage);
};

export const logger = {
  debug: (message: string, context?: TLogContext): void => {
    writeLog('debug', message, context);
  },
  error: (message: string, error?: Error, context?: TLogContext): void => {
    writeLog('error', message, {
      ...context,
      errorMessage: error?.message,
      stack: error?.stack,
    });
  },
  info: (message: string, context?: TLogContext): void => {
    writeLog('info', message, context);
  },
  warn: (message: string, context?: TLogContext): void => {
    writeLog('warn', message, context);
  },
};
