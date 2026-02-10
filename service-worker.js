const cacheName = 'atd-final-v1';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.map((k) => k !== cacheName ? caches.delete(k) : null));
  }));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
