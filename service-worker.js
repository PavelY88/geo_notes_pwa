const CACHE_NAME = 'geo-notes-v9';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(keys.map(key => 
                key !== CACHE_NAME ? caches.delete(key) : null
            ))
    );
});
