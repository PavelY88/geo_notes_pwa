const CACHE_NAME = 'geo-notes-v6';
const ASSETS = [
  '/geo_notes_pwa/',
  '/geo_notes_pwa/index.html',
  '/geo_notes_pwa/manifest.json',
  '/geo_notes_pwa/icon-192.png',
  '/geo_notes_pwa/icon-512.png',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование ресурсов');
        return cache.addAll(ASSETS);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
