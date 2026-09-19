const CACHE_NAME = 'hangul-pwa-shell-v1';
const STATIC_ASSETS = [
  '/', '/index.html', '/styles.css', '/app.js', '/manifest.webmanifest',
  '/icons/icon-192.svg', '/icons/icon-512.svg',
  '/audio/consonants/ㄱ_g.mp3', '/audio/consonants/ㄲ_gg.mp3', '/audio/consonants/ㄴ_n.mp3',
  '/audio/consonants/ㄷ_d.mp3', '/audio/consonants/ㄸ_dd.mp3', '/audio/consonants/ㄹ_l.mp3',
  '/audio/consonants/ㅁ_m.mp3', '/audio/consonants/ㅂ_b.mp3', '/audio/consonants/ㅃ_bb.mp3',
  '/audio/consonants/ㅅ_s.mp3', '/audio/consonants/ㅆ_ss.mp3', '/audio/consonants/ㅈ_j.mp3',
  '/audio/consonants/ㅉ_jj.mp3', '/audio/consonants/ㅊ_ch.mp3', '/audio/consonants/ㅋ_k.mp3',
  '/audio/consonants/ㅌ_t.mp3', '/audio/consonants/ㅍ_p.mp3', '/audio/consonants/ㅎ_h.mp3'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/functions/')) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => { if (response.ok && response.type === 'basic') { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)); } return response; }).catch(() => caches.match('/index.html'))));
});
