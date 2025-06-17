import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import { tanstackRouter } from '@tanstack/router-plugin/vite';

import sitemap from '@astrojs/sitemap';

import { loadEnv } from "vite";

const { PUBLIC_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  site: PUBLIC_URL || 'https://summit.caliman.org',
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
