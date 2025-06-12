// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import { tanstackRouter } from '@tanstack/router-plugin/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// @TODO: needs to replace during build
export default defineConfig({
  site: 'https://summit.caliman.org',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        verboseFileRoutes: false,
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routes/routeTree.gen.ts",
        routeFileIgnorePrefix: "-",
      }),
    ]
  }
});