self.addEventListener('install', function(event) {
  // Kode proses instalasi
});

self.addEventListener('activate', function(event) {
  // Kode proses aktivasi
});

self.addEventListener('fetch', function (event) {
   event.respondWith(
      caches.match(event.request);
      );
    });