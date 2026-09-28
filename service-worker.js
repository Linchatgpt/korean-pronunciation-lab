const CACHE_NAME = 'hangul-pwa-shell-v18-category-controls-row';
const WORD_LISTS_DATA = '/data/word-lists.json';
const STATIC_ASSETS = [
  '/', '/index.html', '/soundlab.css?v=badge-larger-2', '/lab-overrides.css?v=category-controls-row-1', '/app.js?v=category-controls-row-1', '/pwa.js',
  '/manifest.webmanifest', '/icons/icon-192.svg', '/icons/icon-512.svg', '/icons/korean-taegeuk-badge.png', WORD_LISTS_DATA,
  '/audio/vowels/ㅏ_ a.mp3', '/audio/vowels/ㅐ_ ae.mp3', '/audio/vowels/ㅓ_ eo.mp3',
  '/audio/vowels/ㅔ_ e.mp3', '/audio/vowels/ㅗ_ o.mp3', '/audio/vowels/ㅜ_u.mp3',
  '/audio/vowels/ㅡ_ eu.mp3', '/audio/vowels/ㅣ_ i.mp3', '/audio/vowels/ㅘ wa.mp3',
  '/audio/vowels/ㅙ wae.mp3', '/audio/vowels/ㅚ oe.mp3', '/audio/vowels/ㅝ wo.mp3',
  '/audio/vowels/ㅞ we.mp3', '/audio/vowels/ㅟ wi.mp3', '/audio/vowels/ㅢ ui.mp3',
  '/audio/vowels/ㅑ ya.mp3', '/audio/vowels/ㅒ yae.mp3', '/audio/vowels/ㅕ yeo.mp3',
  '/audio/vowels/ㅖ ye.mp3', '/audio/vowels/ㅛ yo.mp3', '/audio/vowels/ㅠ yu.mp3',
  '/audio/consonants/ㄱ_g.mp3', '/audio/consonants/ㄲ_gg.mp3', '/audio/consonants/ㄴ_n.mp3',
  '/audio/consonants/ㄷ_d.mp3', '/audio/consonants/ㄸ_dd.mp3', '/audio/consonants/ㄹ_l.mp3',
  '/audio/consonants/ㅁ_m.mp3', '/audio/consonants/ㅂ_b.mp3', '/audio/consonants/ㅃ_bb.mp3',
  '/audio/consonants/ㅅ_s.mp3', '/audio/consonants/ㅆ_ss.mp3', '/audio/consonants/ㅈ_j.mp3',
  '/audio/consonants/ㅉ_jj.mp3', '/audio/consonants/ㅊ_ch.mp3', '/audio/consonants/ㅋ_k.mp3',
  '/audio/consonants/ㅌ_t.mp3', '/audio/consonants/ㅍ_p.mp3', '/audio/consonants/ㅎ_h.mp3',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_ASSETS);
    const wordData = await (await fetch(WORD_LISTS_DATA)).json();
    await cache.addAll(wordData.words.map(word => `/${word.audio}`));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/functions/')) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request)
    .then(response => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.match('/index.html'))));
});
