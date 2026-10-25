// Cambia la versión cada vez que actualices los archivos para que el celular descargue lo nuevo.
const VERSION = "mis-gastos-v17";
const CORE = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png",
  "./icons/banamex.png", "./icons/bancoppel.png",
  "./icons/sec-semana.svg", "./icons/sec-mes.svg", "./icons/sec-tarjetas.svg", "./icons/sec-hygiene.svg", "./icons/sec-ajustes.svg", "./icons/sec-fijos.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Página: intenta red primero (para recibir actualizaciones) y usa caché sin internet.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return r;
    }).catch(() => caches.match("./index.html")));
    return;
  }

  // Archivos propios y fuentes de Google: caché primero.
  if (url.origin === location.origin || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r;
    })));
  }
});
