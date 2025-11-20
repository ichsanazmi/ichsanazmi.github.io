const CACHE_NAME = 'bento-cache-v1';
const URLs_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://fonts.googleapis.com/css2?family=Micro+5&display=swap',
  'https://img.icons8.com/doodle/192/checklist--v1.png'
];

// 1. INSTALL: Cache aset utama
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Gunakan addAll, tapi jika satu gagal (misal font cors), jangan gagalkan semua
        return Promise.all(
            URLs_TO_CACHE.map(url => {
                return cache.add(url).catch(err => console.log('Gagal cache:', url, err));
            })
        );
      })
  );
});

// 2. ACTIVATE: Hapus cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. FETCH: Network First untuk API, Cache First untuk Aset
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // A. Jika request ke Google Script (API), gunakan Network Only (jangan cache)
  if (url.href.includes('script.google.com')) {
    return; // Biarkan browser menangani request normal (network only)
  }

  // B. Untuk aset lainnya (HTML, JS, CSS, Gambar), gunakan Cache First, Fallback Network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika ada di cache, kembalikan
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari network
        return fetch(event.request).then(
            (networkResponse) => {
                // Cek validitas respon
                if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                // Clone respon untuk disimpan di cache
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            }
        );
      })
  );
});