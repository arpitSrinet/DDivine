/**
 * @file main.tsx
 * @description React entry point for the Phase 4 DDivine Training application shell.
 * @module src/main
 */
import { MotionConfig } from 'framer-motion';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { App } from '@/App';
import '@/styles/globals.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </HelmetProvider>
  </React.StrictMode>,
);
