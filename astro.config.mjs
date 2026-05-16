// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';


import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nihayatu-zayn-24.vercel.app',
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  // // Image optimization configuration
  image: {
    // remotePatterns untuk remote images
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },

  // Output configuration
  output: 'static', // Static Site Generation (SSG)

  // Build configuration
  build: {
    // Inline small CSS/JS
    inlineStylesheets: 'auto',
  },
});