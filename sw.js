// sw.js

// This event is fired when the service worker is first installed.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

// This event is fired for every network request.
// For this app, we just want it to fetch from the network as usual.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
