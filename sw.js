/* Big Tic-Tac-Toe offline cache */
const CACHE = 'btt-v2';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './pwa-192x192.png',
  './pwa-512x512.png',
  './pwa-maskable-512x512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Navigations: network first so a new version shows up immediately,
     cache as the offline fallback. */
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (err) {
        return (await cache.match('./index.html')) ||
          (await cache.match('./')) ||
          new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }

  /* Assets: cache first, refresh in the background. */
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });

    if (cached) {
      fetch(req)
        .then((res) => { if (res && res.ok) cache.put(req, res.clone()); })
        .catch(() => {});
      return cached;
    }

    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) cache.put(req, fresh.clone());
      return fresh;
    } catch (err) {
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});
