const CACHE_NAME = 'vgr-event-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/styles.css',
  '/assets/js/app.js',
  '/assets/images/favicon.ico',
  '/assets/images/icon-192x192.png',
  '/assets/images/icon-512x512.png',
  '/offline.html'
  // Aquí otros archivos o rutas que se requiera almacenar en caché
];

// Instalación del Service Worker y almacenamiento en caché de los recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes de red y responder desde la caché cuando sea posible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, devolverlo. Si no, hacer la solicitud a la red.
      return response || fetch(event.request);
    })
  );
});

