const CACHE_NAME = 'vgr-event-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  //'/assets/css/styles.css',
  '/assets/js/app.js',
  '/assets/images/favicon.ico',
  '/assets/images/icon-192x192.png',
  '/assets/images/icon-512x512.png',
  '/offline.html',
  '/programa_curso_bootstrap.html'
];

console.log('Service Worker cargado correctamente');

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Instalando Service Worker y cacheando archivos...');
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        console.log('Cache abierto: ', CACHE_NAME);
        await cache.addAll(urlsToCache);
        console.log('Archivos cacheados con éxito');
      } catch (error) {
        console.error('Error durante la instalación del Service Worker: ', error);
        throw error; // Re-lanzar el error para no silenciarlo
      }
    })()
  );
});


// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Activando Service Worker...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eliminando caché antigua: ', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .catch((error) => {
      console.error('Error durante la activación del Service Worker: ', error);
    })
  );
});

// Interceptar solicitudes de red
self.addEventListener('fetch', (event) => {
  console.log('Interceptando solicitud: ', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Sirviendo desde la caché: ', event.request.url);
          return response;
        }
        console.log('Recuperando de la red: ', event.request.url);
        return fetch(event.request);
      })
      .catch((error) => {
        console.error('Error durante la solicitud de red: ', error);
      })
  );
});
