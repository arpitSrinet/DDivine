/**
 * @file vite-env.d.ts
 * @description Vite client type definitions for the DDivine Training frontend.
 * @module src/vite-env
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_ENV?: 'development' | 'staging' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
