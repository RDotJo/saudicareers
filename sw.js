const CACHE_NAME = 'saudicareers-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/auth.js',
  '/logo.webp',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});