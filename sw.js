const CACHE_NAME = 'terminal-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png'
];

// تثبيت Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('فتح الكاش');
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب الملفات
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});