// sw.js — versioned cache to avoid stale "links" app
const CACHE = "adix-shell-v3";
const ASSETS = ["./", "./index.html", "./app-launcher.html", "./manifest.json", "./icon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request)));
  } else {
    // external (Apps Script) — always go to network
    event.respondWith(fetch(event.request));
  }
});
