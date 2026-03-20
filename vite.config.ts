import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';


export default defineConfig(({ mode, isSsrBuild }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        Sitemap({
          hostname: 'https://welli.my.id',
          dynamicRoutes: [
            '/work',
            '/projects'
          ],
          changefreq: 'monthly',
          priority: 0.7
        }),
        VitePWA({
          disable: true,
          registerType: 'autoUpdate',
          injectRegister: null,
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'robots.txt', 'sitemap.xml'],
          manifest: {
            name: 'WELLI Portfolio',
            short_name: 'WELLI',
            description: 'Business Analyst & Web Developer Portfolio - Turning business ideas into simple and useful web experiences.',
            theme_color: '#050505',
            background_color: '#050505',
            display: 'standalone',
            scope: '/',
            start_url: '/',
            orientation: 'portrait',
            icons: [
              {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
              },
              {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
              },
              {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              }
            ],
            categories: ['portfolio', 'business', 'developer'],
            lang: 'en',
            dir: 'ltr',
            shortcuts: [
              {
                name: 'Contact',
                short_name: 'Contact',
                description: 'Get in touch with WELLI',
                url: '/#contact',
                icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }]
              },
              {
                name: 'Projects',
                short_name: 'Projects',
                description: 'View my projects',
                url: '/#work',
                icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }]
              }
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
            runtimeCaching: [
              {
                urlPattern: ({ url }: { url: URL }) => url.origin === 'https://fonts.googleapis.com',
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
              },
              {
                urlPattern: ({ url }: { url: URL }) => url.origin === 'https://cdnjs.cloudflare.com',
                handler: 'CacheFirst',
                options: {
                  cacheName: 'cdnjs-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: ({ url }: { url: URL }) => url.origin === 'https://esm.sh',
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'esm-sh-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 7
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              }
            ]
          },
          devOptions: {
            enabled: true,
            type: 'module'
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      ssgOptions: {
        formatting: 'prettify',
        includedRoutes() {
          return ['/', '/work', '/projects'];
        }
      }
    };
});
