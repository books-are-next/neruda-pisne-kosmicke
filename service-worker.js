/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-08ff9db';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./pisne_kosmicke_002.html","./pisne_kosmicke_005.html","./pisne_kosmicke_006.html","./pisne_kosmicke_007.html","./pisne_kosmicke_008.html","./pisne_kosmicke_009.html","./pisne_kosmicke_010.html","./pisne_kosmicke_011.html","./pisne_kosmicke_012.html","./pisne_kosmicke_013.html","./pisne_kosmicke_014.html","./pisne_kosmicke_015.html","./pisne_kosmicke_016.html","./pisne_kosmicke_017.html","./pisne_kosmicke_018.html","./pisne_kosmicke_019.html","./pisne_kosmicke_020.html","./pisne_kosmicke_021.html","./pisne_kosmicke_022.html","./pisne_kosmicke_023.html","./pisne_kosmicke_024.html","./pisne_kosmicke_025.html","./pisne_kosmicke_026.html","./pisne_kosmicke_027.html","./pisne_kosmicke_028.html","./pisne_kosmicke_029.html","./pisne_kosmicke_030.html","./pisne_kosmicke_031.html","./pisne_kosmicke_032.html","./pisne_kosmicke_033.html","./pisne_kosmicke_034.html","./pisne_kosmicke_035.html","./pisne_kosmicke_036.html","./pisne_kosmicke_037.html","./pisne_kosmicke_038.html","./pisne_kosmicke_039.html","./pisne_kosmicke_040.html","./pisne_kosmicke_041.html","./pisne_kosmicke_042.html","./pisne_kosmicke_043.html","./pisne_kosmicke_044.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image003.jpg","./resources/image004.jpg","./resources/obalka01-0004625022.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
