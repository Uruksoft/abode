const CACHE_NAME = 'daggan-app-v9';
const assetsToCache = [
  './',
  './index.html',
  './login.html',
  './supabase-config.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

const CACHEABLE_EXTERNAL_HOSTS = [
  'cdn.tailwindcss.com',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(assetsToCache.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isCacheableCdn = CACHEABLE_EXTERNAL_HOSTS.some((host) => url.hostname.includes(host));

  if (!isSameOrigin && !isCacheableCdn) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone)).catch(() => {});
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});