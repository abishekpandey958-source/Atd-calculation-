const cacheName = 'atd-calc-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com' // THIS IS CRITICAL
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
