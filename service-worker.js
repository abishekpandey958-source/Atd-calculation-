const CACHE_NAME = "trd-atd-calculator-v2.2";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://cdn-icons-png.flaticon.com/512/1085/1085769.png"
];

// Install: Cache all essential files
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching assets for offline use");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Clean up old versions of the cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Strategy - Cache First, then Update in Background
// This ensures the app works instantly even with NO signal.
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Update the cache with the new version from network
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });

      // Return cached response immediately if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
