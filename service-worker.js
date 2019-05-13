const CACHE_NAME = 'firstpwa';
var urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/home.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/css/materialize.min.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/icon.png',
  '/assets/deadpool.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }

        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function() {
        console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(function() {
        console.log('Pendaftaran ServiceWorker gagal');
      });
  });
} else {
  console.log('ServiceWorker belum didukung browser ini.');
}

/* Pada kode di atas kita mengecek terlebih dahulu apakah object navigator sudah ada di browser. Artinya bila object tersebut tidak ada, tandanya browser yang digunakan belum mendukung fitur service worker, karena service worker berjalan di dalam object navigator. */
