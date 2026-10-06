// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages user site: https://bertie-simmons.github.io/
  site: 'https://bertie-simmons.github.io',

  integrations: [react()],

  // Single-file JS/CSS is small here — inline critical CSS to cut requests.
  build: {
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    build: {
      // GSAP / three ship modern syntax; skip needless legacy transpilation.
      target: 'es2022',
      cssTarget: 'chrome111',
    },
  },
});
