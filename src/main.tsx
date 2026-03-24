/**
 * @file main.tsx
 * @description React entry point for the Phase 4 DDivine Training application shell.
 * @module src/main
 */
import { QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { App } from '@/App';
import { queryClient } from '@/config';
import '@/styles/globals.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
