import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Build static HTML into dist/ so Cloudflare Pages can serve assets directly
// while routing /api/* requests to the Functions folder.
export default defineConfig({
  site: 'https://mauricio-portfolio-z11.pages.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
