const CACHE_NAME = 'geo-notes-v4';
const ASSETS = [
  '/geo_notes_pwa/',
  '/geo_notes_pwa/index.html',
  '/geo_notes_pwa/manifest.json',
  '/geo_notes_pwa/icon-192.png',
  '/geo_notes_pwa/icon-512.png',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
});