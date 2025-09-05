// sw.js — minimal, versioned cache to flush old content
const CACHE_NAME = "adix-shell-v2";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Cache-first for app shell; network for cross-origin (your Apps Script URL)
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((resp) => resp || fetch(event.request))
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
