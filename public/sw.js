const CACHE_NAME = 'nihayatu-zayn-v3';
const STATIC_CACHE = 'static-v3';

// Core assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/og-image.jpg',
  '/192x192.jpg',
  '/512x512.jpg',
];

// Install: precache core static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches from previous versions
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First strategy
// Tries network first; falls back to cache if offline.
// Caches successful network responses for future offline use.
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and same-origin + CDN requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip non-http(s) requests (e.g. chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  // For Cloudinary images: Cache-First (they are immutable with version IDs)
  if (url.hostname === 'res.cloudinary.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;

        try {
          const response = await fetch(event.request);
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        } catch {
          return cached || new Response('', { status: 503 });
        }
      })
    );
    return;
  }

  // For everything else: Network-First
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses for HTML pages and static assets
        if (
          response.ok &&
          (event.request.headers.get('accept')?.includes('text/html') ||
            url.pathname.match(/\.(js|css|woff2|jpg|png|svg|webp)$/))
        ) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline fallback: serve from cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;

          // For navigation requests, serve the cached homepage
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/');
          }

          return new Response('', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});
