const cacheName = 'v1';
const cachedAssets = [
  '/',
  '/index.html',
  '/css/bootstrap.min.css',
  '/js/bootstrap.bundle.min.js',
  '/js/jquery-3.7.1.min.js',
  '/js/app.js',
  '/js/audio.js',
  '/js/timer.js',
  '/js/window.js',
  '/audio/alarm.mp3',
  '/audio/backtick.mp3',
  '/audio/backtick2.mp3',
  '/audio/ding-hotel.mp3',
  '/audio/stop.mp3',
  '/images/alarm-128.png',
  '/images/alarm-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(cachedAssets);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activated.');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
