// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';


import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  // // Image optimization configuration
  // image: {
  //   // Domains yang diizinkan untuk remote images
  //   domains: ['res.cloudinary.com'],
  //   // Format output yang disupport
  //   formats: ['avif', 'webp'],
  // },

  // Output configuration
  output: 'static', // Static Site Generation (SSG)

  // Build configuration
  build: {
    // Inline small CSS/JS
    inlineStylesheets: 'auto',
  },
});