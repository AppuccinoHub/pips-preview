/* Pip's Postcards offline helper. HTML = network-first; everything else = cache-first with a background refresh.
   When you publish changes, bump VERSION and the ?v= numbers in index.html.
   CORE is the offline starter set; every other picture (guide poses, baby stages, the girl, stickers) is cached the
   first time it loads, and the app pre-loads the chosen guide's poses, the baby's stages and the girl art. */
const VERSION = 'pvw-09260506';
const CORE = [
  './', 'index.html', 'styles.css?v=2.3', 'app.js?v=2.3p1', 'guide.js?v=2.3p1', 'audio/index.js?v=2.3', 'weeks/index.js?v=2.3', 'weeks/u1w2.js?v=2.3', 'manifest.webmanifest', 'favicon.png',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'fonts/andika-regular.woff2', 'fonts/andika-bold.woff2', 'fonts/fredoka.woff2', 'img/bonus_koala.webp', 'img/fri_barn.webp',
  'img/fri_radio.webp', 'img/item_aurora.webp', 'img/item_hill.webp', 'img/item_igloo.webp', 'img/item_pond.webp', 'img/item_sled.webp', 'img/item_slide.webp', 'img/item_snowman.webp',
  'img/koala.webp', 'img/mon_antarctica.webp', 'img/pip_happy.webp', 'img/thu_rainforest.webp', 'img/tue_batcave.webp', 'img/wed_desert.webp', 'guides/fox/main.webp', 'guides/otter/main.webp',
  'guides/penguin/main.webp', 'guides/pigeon/main.webp', 'guides/puffin/main.webp', 'guides/turtle/main.webp', 'babies/penguin/scene.webp', 'babies/penguin/reveal.webp',
  'babies/penguin/newborn.webp', 'babies/turtle/scene.webp', 'babies/turtle/reveal.webp', 'babies/turtle/newborn.webp', 'babies/fox/reveal.webp', 'babies/fox/newborn.webp',
  'babies/otter/reveal.webp', 'babies/otter/newborn.webp', 'babies/puffin/scene.webp', 'babies/puffin/reveal.webp', 'babies/puffin/newborn.webp', 'babies/pigeon/scene.webp',
  'babies/pigeon/reveal.webp', 'babies/pigeon/newborn.webp', 'babies/bat/newborn.webp', 'img/girl/hello.webp', 'img/girl/zoo_explorer_map.webp', 'img/girl/fox_walk.webp'
];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('pvw-') && k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('index.html', copy)); } return res; })
      .catch(() => caches.match('index.html').then((r) => r || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; });
    if (hit) { net.catch(() => {}); return hit; }
    return net;
  }));
});
