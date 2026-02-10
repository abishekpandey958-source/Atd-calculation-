const cacheName = 'atd-calc-v6'; // Incremented version
const assets = [
  './',
  './index.html',
  './style.css',        /* Added your external CSS to the cache */
  './manifest.json',
  './app-icon.png',     /* Added icons so the home screen looks right offline */
  './splash-icon.png',
  'https://cdn.tailwindcss.com' 
];

// Install Event: Saving files to the browser cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Activate Event: Deleting old cache versions
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

// Fetch Event: Serving cached content when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // Return cached file if found, otherwise fetch from network
      return res || fetch(e.request);
    })
  );
});
