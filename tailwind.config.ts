/**
 * @file tailwind.config.ts
 * @description Tailwind configuration with Phase 1 design tokens for DDivine Training.
 * @module tailwind.config
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        dark: 'var(--color-dark)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        muted: 'var(--color-muted)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        white: 'var(--color-white)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '80rem',
      },
    },
  },
  plugins: [],
};

export default config;
