const cacheName = 'atd-calc-v2'; // Incremented version
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com' // Caching the external Tailwind script for offline use
];

// Install: Saving files to the phone's memory
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Activate: Cleaning up old cache versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch: Serving files from memory when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
