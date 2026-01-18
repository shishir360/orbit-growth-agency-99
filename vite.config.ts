import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';
import Prerender from 'vite-plugin-prerender';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All routes to prerender for SEO/OG tags
const routesToPrerender = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/portfolio',
  '/blog',
  '/reviews',
  '/sitemap',
  '/privacy',
  '/terms',
  '/founder',
  '/founder-farhan',
  '/tutorials',
  '/services',
  '/website-design',
  '/ai-automation',
  '/ads-management',
  '/portfolio/website-design',
  '/portfolio/ai-automation',
  '/portfolio/ads-management',
  '/services/website-design',
  '/services/ai-automation',
  '/services/ads-management',
  '/services/ai-chatbots',
  '/services/voice-agents',
  '/services/workflow-automation',
  '/services/email-automation',
  '/services/seo-friendly',
  '/services/mobile-optimized',
  '/services/fast-loading',
  '/services/conversion-focused',
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'app-icon.png', 'user-logo-optimized.webp'],
      manifest: {
        name: 'Lunexo Media Admin',
        short_name: 'Lunexo Admin',
        description: 'Admin Panel for Lunexo Media',
        theme_color: '#0F172A',
        background_color: '#0F172A',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/admin-dashboard',
        scope: '/',
        icons: [
          {
            src: '/app-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/app-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    // Prerender static pages for SEO/OG tags
    mode === 'production' && Prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: routesToPrerender,
      renderer: new Prerender.PuppeteerRenderer({
        renderAfterTime: 5000,
        headless: true,
      }),
      postProcess(renderedRoute) {
        // Ensure proper HTML structure
        renderedRoute.html = renderedRoute.html
          .replace(/<script[^>]*type="module"[^>]*crossorigin[^>]*><\/script>/gi, '')
          .replace(/<!--.*?-->/gs, '');
        return renderedRoute;
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
}));
