// sw.js — minimal service worker to satisfy PWA install criteria
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("adix-shell-v1").then((c) => c.addAll(["./", "./manifest.json", "./icon.png"])).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request)).catch(() => fetch(event.request))
  );
});
