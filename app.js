/* Pip's Postcards: phone-first reading practice. Vanilla JS, no build step.
   Everything is stored on this device only (localStorage + IndexedDB). */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = gtext(txt); return e; };
  /* ---- the guide (picked + named by the child on the first screen; config in guide.js) ---- */
  const GUIDES = window.PIP_GUIDES || { kinds: {}, order: [], names: [], generic: { mishaps: [], landing: [], landBtn: [] }, voice: {} };
  const G = () => {
    let g = {}; try { g = (S && S.guide) || {}; } catch (_) {}
    const k = GUIDES.kinds[g.kind] || GUIDES.kinds.pigeon || {};
    return Object.assign({ kind: g.kind || 'pigeon', name: g.name || 'Pip' }, k, {
      mishaps: (k.mishaps || []).concat(GUIDES.generic.mishaps || []),
      landing: k.landing || GUIDES.generic.landing, landBtn: GUIDES.generic.landBtn });
  };
  function gtext(t) {
    if (typeof t !== 'string') return t;
    if (t.indexOf('Pip') < 0 && t.indexOf('{') < 0) return t;
    const g = G();
    return t.replace(/\bPip\b/g, g.name).replace(/\{species\}/g, g.species || 'bird').replace(/\{part\}/g, g.part || 'wing').replace(/\{nose\}/g, g.nose || 'nose').replace(/\{go\}/g, g.go || 'travel');
  }
  let mishapN = 0;
  const mishap = () => { const m = G().mishaps; return m.length ? m[(mishapN++) % m.length] : 'Hmm, I got mixed up!'; };
  /* Praise effort and strategy (never "smart"). */
  const PRAISE = {
    first: ['You looked at every letter! 👀', 'You took your time. That works! 🌟', 'You checked each sound! ✨'],
    retry: ['You kept going and got it! That is how readers grow. 🌱', 'You tried again. That is what great readers do! 💪', 'You did not give up. Yes! 🌟'],
    hint: ['You used the clue. Great readers use clues! 🔎', 'Clue used, word found! That is a great strategy. 🔎'],
    chunks: ['You split it into chunks. That is what great readers do! 🧩', 'Chunk by chunk. That is the reader way! 🧩'],
    listen: ['You listened to every sound! 👂', 'Great listening! 👂'],
    proof: ['You found the proof in the words! 🔎', 'You went back and looked. That is what readers do! 🔎'],
    brave: ['You tried a hard one. That is brave! 🦁', 'Challenge tried! That is how brains grow. 🌱']
  };
  const praiseN = {};
  const praise = (k) => { const l = PRAISE[k] || PRAISE.first; praiseN[k] = (praiseN[k] || 0) + 1; return l[praiseN[k] % l.length]; };
  const LEVELS = ['ground', 'sky', 'space'];
  const LEVEL_INFO = {
    ground: { icon: '🏕️', name: 'Ground', sub: 'this week' },
    sky: { icon: '☁️', name: 'Sky', sub: 'next week' },
    space: { icon: '🚀', name: 'Space', sub: '3rd-grade stretch' }
  };
  const levelLabel = (lv) => `${LEVEL_INFO[lv].icon} ${LEVEL_INFO[lv].name} · ${LEVEL_INFO[lv].sub}`;
  const WORD_TYPES = ['sort', 'build', 'pick', 'hear', 'rebel', 'fill', 'spell', 'type', 'says'];
  const TYPE_NAMES = { type: 'Type the word you hear', hear: 'Hear & tap (which word says it)', says: 'Which word says ___? (new words)', rebel: 'Find the sneaky word', fill: 'Fill the blank (word tiles)', sort: 'Sort', build: 'Build a word', pick: 'Pick the spelling', spell: 'Spell it',
    question: "Guide's question (evidence)", advisor: 'Advisor card', check: 'Picture checks', echo: 'Echo (review) words', warm: 'Warm-up (easy wins)',
    decode: 'Read new words (she self-checks)', teach: 'Teach the guide (she self-checks)', rpair: 'R or W? (listening)', rcatch: 'Catch the guide (R, listening)', sound: 'Which sound? (optional)', challenge: 'Challenge word (optional)' };
  /* The baby animal she raises (all art is Sue's: babies/<kind>/<stage>.webp). She picks one on first launch.
     Egg animals hatch (egg -> cracked -> peeking -> almost out, played in the reveal); the bat, fox and otter are
     born (snuggled up -> waking up). Then 5 growth stages. "Little baby" comes at the very first feed, so she always
     sees her baby change in session 1. Growth thresholds (food eaten) are shared. */
  const STAGE_KEYS = ['newborn', 'baby', 'growing', 'juvenile', 'adult'];
  const STAGE_NAMES = { newborn: 'Brand new', baby: 'Little baby', growing: 'Growing', juvenile: 'Big kid', adult: 'All grown up' };
  const PRE_NAMES = { egg: 'Egg', cracked: 'Crack!', peeking: 'Peek-a-boo', halfout: 'Almost out', snug: 'Snuggled up', waking: 'Waking up' };
  const STAGE_AT = [0, 1, 20, 42, 70];
  const STAGE_SCALE = [0.6, 0.7, 0.8, 0.9, 1];
  const ITEM_AT = [12, 26, 40, 55, 70, 88, 105];
  const EGG = ['egg', 'cracked', 'peeking', 'halfout'], BORN = ['snug', 'waking'];
  const PETS = {
    penguin: { kind: 'Penguin chick', nest: 'Snowy ice', icon: '🐧', food: '🐟', foodName: 'fish', how: 'egg', pre: EGG, scene: true, reveal: true,
      found: 'Pip found this baby emperor penguin on the ice.', sugs: ['Waddles', 'Snowy', 'Pebble', 'Flip'],
      items: [['Igloo', 'img/item_igloo.webp', [4, 38, 30]], ['Snow hill', 'img/item_hill.webp', [70, 44, 28]], ['Ice slide', 'img/item_slide.webp', [66, 12, 26]], ['Fish pond', 'img/item_pond.webp', [34, 2, 30]],
        ['Snowman', 'img/item_snowman.webp', [8, 6, 22]], ['Sled', 'img/item_sled.webp', [40, 50, 22]], ['Northern lights', 'img/item_aurora.webp', [4, 62, 26]]] },
    turtle: { kind: 'Sea turtle hatchling', nest: 'Sandy beach nest', icon: '🐢', food: '🦐', foodName: 'shrimp', how: 'egg', pre: ['egg', 'peeking', 'halfout'], scene: true, reveal: true,
      found: 'Pip watched this baby turtle dig out of its sandy nest on the beach.', sugs: ['Shelly', 'Coral', 'Splash', 'Kai'],
      items: [['Seashell', '🐚', [8, 6, 12]], ['Crab friend', '🦀', [74, 6, 12]], ['Sandcastle', '🏰', [4, 26, 20]], ['Coral', '🪸', [74, 40, 16]], ['Fish friends', '🐠', [10, 56, 14]], ['Sea grass', '🌿', [56, 44, 12]], ['Whale', '🐋', [36, 66, 18]]] },
    fox: { kind: 'Fennec fox kit', nest: 'Cozy desert den', icon: '🦊', food: '🫐', foodName: 'berries', how: 'born', pre: BORN, reveal: true,
      found: 'Pip found this baby fox snuggled in a cozy den in the desert.', sugs: ['Sandy', 'Ziggy', 'Dune', 'Pip Jr.'],
      items: [['Cactus', '🌵', [6, 10, 20]], ['Sun rock', '🪨', [72, 8, 16]], ['Date palm', '🌴', [74, 30, 22]], ['Beetle friend', '🪲', [34, 4, 10]], ['Oasis', '💧', [8, 42, 12]], ['Desert moon', '🌙', [72, 70, 14]], ['Tall dune', '🏜️', [30, 52, 20]]] },
    otter: { kind: 'Sea otter pup', nest: 'Kelp bed', icon: '🦦', food: '🦪', foodName: 'clams', how: 'born', pre: BORN, reveal: true,
      found: 'Pip found this baby otter floating safe and snug in the kelp.', sugs: ['Kelpie', 'Otto', 'Pebbles', 'Bubbles'],
      items: [['Kelp', '🌿', [6, 8, 16]], ['Smooth rock', '🪨', [72, 6, 16]], ['Clam snack', '🦪', [34, 4, 12]], ['Sea star', '⭐', [80, 30, 12]], ['Big wave', '🌊', [8, 42, 18]], ['Crab friend', '🦀', [60, 50, 12]], ['Sunset', '🌅', [30, 64, 20]]] },
    puffin: { kind: 'Puffin chick (puffling)', nest: 'Sea-cliff burrow', icon: '🐦', food: '🐟', foodName: 'fish', how: 'egg', pre: EGG, scene: true, reveal: true,
      found: 'Pip found this baby puffin in a cozy burrow on a sea cliff.', sugs: ['Puff', 'Nugget', 'Pebble', 'Clover'],
      items: [['Sea cliff', '⛰️', [4, 30, 22]], ['Flowers', '🌸', [74, 6, 12]], ['Fish snack', '🐟', [34, 4, 12]], ['Waves', '🌊', [70, 30, 18]], ['Little boat', '⛵', [12, 58, 14]], ['Lighthouse', '🗼', [78, 50, 16]], ['Rainbow', '🌈', [34, 62, 20]]] },
    pigeon: { kind: 'Pigeon chick (squab)', nest: 'Twig nest', icon: '🕊️', food: '🌾', foodName: 'seeds', how: 'egg', pre: EGG, scene: true, reveal: true,
      found: 'Pip found this baby pigeon in a twig nest on a sunny rooftop.', sugs: ['Coco', 'Dusty', 'Poppy', 'Skye'],
      items: [['Rooftop', '🏠', [4, 30, 22]], ['Flowers', '🌼', [74, 6, 12]], ['Seed snack', '🌾', [34, 4, 12]], ['Fountain', '⛲', [70, 30, 18]], ['Park bench', '🪑', [10, 6, 14]], ['Balloon', '🎈', [78, 56, 12]], ['Clock tower', '🕰️', [34, 60, 16]]] },
    bat: { kind: 'Bat pup', nest: 'Cozy cave', icon: '🦇', food: '🍑', foodName: 'fruit', how: 'born', pre: BORN,
      found: 'Pip found this baby bat snuggled on a rocky ledge in a cave.', sugs: ['Luna', 'Echo', 'Nibbles', 'Midnight'],
      items: [['Moon', '🌙', [74, 70, 14]], ['Cozy rock', '🪨', [6, 8, 18]], ['Saguaro cactus', '🌵', [72, 14, 20]], ['Fruit snack', '🍑', [30, 4, 12]], ['Fireflies', '✨', [12, 56, 14]], ['Bat house', '🏡', [4, 30, 20]], ['Starry sky', '🌌', [40, 64, 16]]] }
  };
  const PET_KINDS = ['penguin', 'turtle', 'fox', 'otter', 'puffin', 'pigeon', 'bat'];
  PET_KINDS.forEach((k) => { PETS[k].id = k; });
  const babyImg = (k, stage) => `babies/${k}/${stage}.webp`;
  const sceneOf = (pp) => (pp.scene ? babyImg(pp.id, 'scene') : '');
  const revealOf = (pp) => (pp.reveal ? babyImg(pp.id, 'reveal') : babyImg(pp.id, 'newborn'));
  /* The girl (Sue's art, img/girl/): where each picture shows. Several in one list take turns. Only full-body
     drawings are used bare; hello, hurray, question, dream, ciao and group_hug are drawn to the waist, so they come
     pre-framed as portraits (see art/sue2/export2.py). */
  const GIRL = {
    hello: ['hello'], home: ['fox_walk', 'penguin_binoculars', 'backpack'], picker: ['zoo_explorer_map', 'otter_point'],
    found: { penguin: 'penguin_find', puffin: 'puffin_hug', pigeon: 'pigeon_hug', turtle: 'turtle_find', bat: 'bat_find', fox: 'fox_find', otter: 'otter_find' },
    zoo: { penguin: 'penguin_hug', puffin: 'puffin_post', pigeon: 'pigeon_hug', turtle: 'turtle_pet', bat: 'bat_hold', fox: 'fox_hug', otter: 'otter_hug' },
    zooTop: ['group_hug'], zooEnd: ['walk_away'], grow: ['hurray', 'peace', 'roller'], grown: ['graduation'],
    boss: ['pirate_spyglass', 'pirate_map', 'pirate_flag'], bossWin: ['pirate_chest', 'pirate_cheer'], italia: ['ciao', 'italia_hat', 'pizza'],
    think: ['question', 'dream', 'writing_plan'], read: ['books'], spell: ['writing_books'], mail: ['special_message', 'puffin_post'],
    end: ['pillow_pj', 'pajamas_dog'], parent: ['bigger_dreams']
  };
  const STICKERS = ['heart', 'star', 'paw', 'book', 'globe', 'camera', 'compass', 'map', 'backpack', 'leaf', 'zoo_explorer', 'kindness', 'small_steps', 'heart_globe', 'postcard', 'backpack2', 'my_zoo'];
  const girlTurn = {};
  function girlSrc(slot, fixed) {
    const l = [].concat(GIRL[slot] || slot); const n = fixed ? 0 : (girlTurn[slot] = ((girlTurn[slot] == null ? -1 : girlTurn[slot]) + 1));
    return 'img/girl/' + l[n % l.length] + '.webp';
  }
  function girlEl(slot, cls, fixed) { const im = el('img', 'girl ' + (cls || '')); im.src = /\//.test(slot) ? slot : girlSrc(slot, fixed); im.alt = ''; im.setAttribute('aria-hidden', 'true'); im.decoding = 'async'; return im; }
  const kidName = () => (S.kid || '').trim();
  const oneName = (pp) => pp.one || pp.kind.replace(/ \(.*\)$/, '').toLowerCase();
  const bornWord = (pp) => (pp.how === 'born' ? 'was born' : 'hatched');
  const BASE_KINDS = PET_KINDS.slice();
  const pet = () => PETS[(S.chick && S.chick.kind) || 'penguin'] || PETS.penguin;
  const stagesOf = (pp) => STAGE_KEYS.map((key, i) => ({ at: STAGE_AT[i], key, name: STAGE_NAMES[key], img: babyImg(pp.id, key), scale: STAGE_SCALE[i] }));
  const itemsOf = (pp) => pp.items.map(([name, art, pos], i) => ({ at: ITEM_AT[i], name, pos, img: /\.webp$/.test(art) ? art : '', emoji: /\.webp$/.test(art) ? '' : art }));
  const AUTO_MS = 1300;
  const KEY = 'pipsPostcards.preview';

  /* ---------------- state ---------------- */
  const fresh = () => ({
    guide: null, kid: '', tryAgain: {}, soundLog: [], rOn: true, rWords: null, italiaOn: true, italiaDone: {}, bossDone: {}, vol: 1,
    chick: { name: '', kind: '', fish: 0 }, family: [], level: 'ground', levelLock: false, good: 0, roughStreak: 0,
    sessions: [], sessionsDone: 0, review: [], levelLog: [], routeEcho: null, progress: null,
    muted: false, hinted: false, weekId: null
  });
  let S = fresh();
  function load() { try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (_) {} }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_) {} }
  load();
  if (S.chick && S.chick.name && !S.chick.kind) S.chick.kind = 'penguin'; // saves from before the baby choice existed
  // Parrots were removed (v2.2): a saved parrot baby becomes a pigeon chick, same name and growth.
  const PARROTS = { grey: 1, senegal: 1 };
  if (S.chick && PARROTS[S.chick.kind]) S.chick.kind = 'pigeon';
  (S.family || []).forEach((f) => { if (PARROTS[f.kind]) f.kind = 'pigeon'; });
  delete S.showParrots;

  const weekList = () => (window.PIP_WEEK_LIST || Object.keys(window.PIP_WEEKS || {})).filter((id) => window.PIP_WEEKS && window.PIP_WEEKS[id]);
  const currentWeek = () => { const l = weekList(); const id = (S.weekId && l.includes(S.weekId)) ? S.weekId : l[l.length - 1]; return window.PIP_WEEKS[id]; };
  const chickName = () => S.chick.name || 'Baby';
  const shownDay = (d) => d;
  const fillName = (t) => gtext(String(t).replace(/\{chick\}/g, chickName()));

  /* ---------------- helpers ---------------- */
  function seeded(seed) { let s = 0; for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function shuffle(arr, seed) { const r = seeded(seed); const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const plain = (w) => String(w).replace(/[\[\]|]/g, '');
  /* Render word markup: "|" = syllable split (alternating colors), [..] = pattern highlight.
     With no [..], vowels are highlighted so open/closed syllables are visible. */
  function wordEl(markup, opts) {
    opts = opts || {};
    const wrap = el('span', 'w' + (opts.big ? ' w-big' : ''));
    const hasBr = /\[/.test(markup);
    String(markup).split('|').forEach((syl, si) => {
      if (si > 0 && opts.gaps !== false) wrap.appendChild(el('span', 'w-gap', opts.dots ? '·' : ''));
      const sp = el('span', 'syl syl-' + (si % 3));
      let inBr = false;
      for (const ch of syl) {
        if (ch === '[') { inBr = true; continue; }
        if (ch === ']') { inBr = false; continue; }
        const isV = !hasBr && /[aeiou]/i.test(ch);
        const c = el('span', inBr ? 'pat' : (isV ? 'vow' : null), ch);
        sp.appendChild(c);
      }
      wrap.appendChild(sp);
    });
    wrap.setAttribute('aria-label', plain(markup));
    return wrap;
  }
  function btn(cls, txt, onClick) { const b = el('button', cls, txt); b.type = 'button'; if (onClick) b.addEventListener('click', onClick); return b; }
  function toast(msg, ms) { const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => { t.hidden = true; }, ms || 1800); }
  const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  const fmtTime = (d) => new Date(d).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  /* ---------------- sound + speech ---------------- */
  let actx = null;
  function sound(kind) {
    if (S.muted) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = kind === 'ok' ? [660, 880] : kind === 'grow' ? [523, 659, 784, 1046] : kind === 'fish' ? [990] : [523, 494]; // "not yet": a soft, friendly boop (no buzzer)
      notes.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        const t = actx.currentTime + i * 0.11;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime((kind === 'wrong' ? 0.07 : 0.18) * (S.vol == null ? 1 : S.vol), t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.25);
      });
    } catch (_) {}
  }
  /* Voice. Guide lines: the device's best natural female en-US voice (same for every guide), slightly high
     pitch, rate ~0.85. Words, chunks and suggested names: pre-made audio files (audio/index.js) when available. */
  let voice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]US/i.test(v.lang));
    const pref = (GUIDES.voice && GUIDES.voice.prefer) || [];
    for (const name of pref) { const v = vs.find((x) => x.name.indexOf(name) >= 0 && !/male/i.test(x.name.replace(/female/i, ''))); if (v) { voice = v; return; } }
    voice = vs.find((v) => /female|woman|girl/i.test(v.name)) || vs[0] || speechSynthesis.getVoices().find((v) => /^en/.test(v.lang)) || null;
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  const canSpeak = () => 'speechSynthesis' in window;
  const vol = () => (S.muted ? 0 : (S.vol == null ? 1 : S.vol));
  const AUD = window.PIP_AUDIO || {};
  let curAudio = null, sayToken = 0;
  function stopVoice() { sayToken++; try { speechSynthesis.cancel(); } catch (_) {} if (curAudio) { try { curAudio.pause(); } catch (_) {} curAudio = null; } }
  /* Speak one thing. opts: {rate, slow, lang, word} ; returns a Promise that resolves when done (or after a safety timeout). */
  function say1(text, opts) {
    opts = opts || {};
    const t = plain(gtext(String(text || ''))).trim();
    return new Promise((res) => {
      if (!t || vol() === 0) return setTimeout(res, opts.word ? 350 : 60);
      let done = false; const fin = () => { if (!done) { done = true; res(); } };
      const guard = setTimeout(fin, 900 + t.length * (opts.slow ? 130 : 95));
      const src = AUD[(opts.lang ? opts.lang + ':' : '') + t.toLowerCase()];
      if (src && opts.word !== false) {
        try {
          const a = new Audio(src); a.volume = vol(); a.playbackRate = opts.slow ? 0.8 : 1; curAudio = a;
          a.onended = () => { clearTimeout(guard); fin(); }; a.onerror = () => { clearTimeout(guard); fin(); };
          const pr = a.play(); if (pr && pr.catch) pr.catch(() => { clearTimeout(guard); fin(); });
          return;
        } catch (_) {}
      }
      if (!canSpeak()) { clearTimeout(guard); return fin(); }
      try {
        const u = new SpeechSynthesisUtterance(t);
        u.lang = opts.lang === 'it' ? 'it-IT' : 'en-US';
        const V = GUIDES.voice || {};
        u.rate = opts.rate || (opts.slow ? 0.6 : (V.rate || 0.85)); u.pitch = V.pitch || 1.0; u.volume = vol();
        if (voice && opts.lang !== 'it') u.voice = voice;
        u.onend = () => { clearTimeout(guard); fin(); }; u.onerror = () => { clearTimeout(guard); fin(); };
        speechSynthesis.speak(u);
      } catch (_) { clearTimeout(guard); fin(); }
    });
  }
  /* Speak a list in order. items: [text | {text, ...opts, onStart}] */
  async function sayList(items) {
    stopVoice(); const my = sayToken;
    for (const it of items) {
      if (my !== sayToken) return false;
      const o = typeof it === 'string' ? { text: it } : it;
      if (o.onStart) o.onStart();
      await say1(o.text, o);
      if (o.pause) await new Promise((r) => setTimeout(r, o.pause));
    }
    return my === sayToken;
  }
  function speak(text, rate) { sayList([{ text, word: true, rate: rate }]); }
  function hearBtn(text, label) { const b = btn('hear-btn', label || '🔊', (e) => { e.stopPropagation(); speak(text); }); b.setAttribute('aria-label', 'Hear it: ' + plain(text)); return b; }

  /* ---------------- recordings: IndexedDB, on this device only ---------------- */
  const DB = { db: null };
  function dbOpen() {
    return new Promise((res, rej) => {
      if (DB.db) return res(DB.db);
      if (!('indexedDB' in window)) return rej(new Error('no-idb'));
      const r = indexedDB.open('pips-postcards', 1);
      r.onupgradeneeded = () => { const s = r.result.createObjectStore('recs', { keyPath: 'id' }); s.createIndex('date', 'date'); };
      r.onsuccess = () => { DB.db = r.result; res(DB.db); };
      r.onerror = () => rej(r.error);
    });
  }
  async function recPut(rec) { const db = await dbOpen(); return new Promise((res, rej) => { const t = db.transaction('recs', 'readwrite'); t.objectStore('recs').put(rec); t.oncomplete = () => res(rec); t.onerror = () => rej(t.error); }); }
  async function recAll() { const db = await dbOpen(); return new Promise((res, rej) => { const q = db.transaction('recs').objectStore('recs').getAll(); q.onsuccess = () => res(q.result || []); q.onerror = () => rej(q.error); }); }
  async function recDel(id) { const db = await dbOpen(); return new Promise((res) => { const t = db.transaction('recs', 'readwrite'); t.objectStore('recs').delete(id); t.oncomplete = () => res(); }); }
  async function recClear() { const db = await dbOpen(); return new Promise((res) => { const t = db.transaction('recs', 'readwrite'); t.objectStore('recs').clear(); t.oncomplete = () => res(); }); }

  /* A recorder widget. onSaved(rec) after a take is stored. If the mic is blocked or missing,
     it switches to a friendly "read it out loud to a grown-up" path so she can always continue. */
  function recorder(meta, onSaved, onFallback) {
    const box = el('div', 'rec');
    const main = btn('rec-btn', '🎙️ Record', null);
    const status = el('p', 'rec-status', '');
    box.append(main, status);
    let mr = null, chunks = [], stream = null, t0 = 0, stopT = null;
    const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    function fallback(reason) {
      box.classList.add('rec-off');
      main.remove();
      status.textContent = reason === 'denied'
        ? 'The microphone is turned off. That is OK! Read it out loud to your grown-up. 💛'
        : 'This device cannot record here. That is OK! Read it out loud to your grown-up. 💛';
      const ok = btn('big-btn soft', '✅ I read it out loud', () => { ok.disabled = true; onFallback && onFallback(); });
      box.appendChild(ok);
    }
    async function start() {
      if (!supported) return fallback('unsupported');
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) { return fallback(e && (e.name === 'NotAllowedError' || e.name === 'SecurityError') ? 'denied' : 'unsupported'); }
      const types = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus'];
      const mime = types.find((t) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || '';
      try { mr = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream); } catch (e) { return fallback('unsupported'); }
      chunks = [];
      mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: mr.mimeType || mime || 'audio/webm' });
        const rec = Object.assign({ id: 'r' + Date.now() + Math.random().toString(36).slice(2, 6), date: Date.now(), dur: Math.round((Date.now() - t0) / 1000), mime: blob.type, blob }, meta);
        try { await recPut(rec); } catch (_) {}
        main.disabled = false; main.textContent = '🎙️ Record again'; box.classList.remove('on');
        status.textContent = 'Saved on this device ✓';
        onSaved && onSaved(rec);
      };
      mr.start(); t0 = Date.now();
      box.classList.add('on'); main.textContent = '⏹️ Stop'; status.textContent = 'Recording... read like a radio star! 🌟';
      stopT = setTimeout(() => { if (mr && mr.state === 'recording') mr.stop(); }, 120000);
    }
    main.addEventListener('click', () => {
      if (mr && mr.state === 'recording') { clearTimeout(stopT); main.disabled = true; mr.stop(); return; }
      start();
    });
    box.stop = () => { try { if (mr && mr.state === 'recording') mr.stop(); } catch (_) {} };
    return box;
  }
  function audioFor(rec) { const a = el('audio'); a.controls = true; a.preload = 'metadata'; try { a.src = URL.createObjectURL(rec.blob); } catch (_) {} return a; }

  /* ---------------- session building ---------------- */
  function sentencesOf(L) { return L.chunks.flatMap((c) => c.s); }
  function dueReviews() { return S.review.filter((r) => r.due <= S.sessionsDone).slice(0, 2); }
  /* The session plan. Easy wins first, then she chooses the order (postcard first or word games first).
     Optional cards (challenge, which-sound) can be skipped at no cost. To shorten sessions, trim these lists. */
  function buildSpecs(week, day, lv, mode) {
    const L = day.levels[lv];
    if (mode === 'boss') return [{ k: 'mail' }].concat(L.chunks.map((c, i) => ({ k: 'chunk', i })), [{ k: 'question' }, { k: 'advisor' }, { k: 'feed' }]);
    if (mode === 'italia') return [{ k: 'italia' }, { k: 'feed' }];
    const head = [{ k: 'mail' }, { k: 'warm', n: 0 }, { k: 'warm', n: 1 }];
    dueReviews().slice(0, 1).forEach((r) => head.push({ k: 'echo', r }));
    const today = (L.preview || []).map((v) => v.w);
    const again = Object.values(S.tryAgain || {}).filter((t) => !today.includes(t.w)).sort((a, b) => b.n - a.n)[0];
    if (again) { const v = (week.vocab || {})[again.w]; if (v) head.push({ k: 'decode', v: Object.assign({ w: again.w }, v), again: true, n: 0 }); }
    head.push({ k: 'order' });
    return head;
  }
  function planFor(week, day, lv, order) {
    const L = day.levels[lv];
    const even = S.sessionsDone % 2 === 0;
    const pv = L.preview || [];
    const G_ = [{ k: 'model' }, { k: 'type', n: 0 }, { k: 'hear' }, { k: 'type', n: 1 }, { k: 'rebel' }];
    const V = pv.map((v, n) => ({ k: 'decode', v, n, of: pv.length })).concat(pv.length ? [even ? { k: 'teach', v: pv[S.sessionsDone % pv.length] } : { k: 'sneaky' }] : []);
    const R = L.chunks.map((c, i) => ({ k: 'chunk', i })).concat([{ k: 'question' }, { k: 'advisor' }]);
    const tail = [{ k: 'fill' }];
    if (pv.length) tail.push({ k: 'says', v: pv[(S.sessionsDone + 1) % pv.length] });
    tail.push({ k: 'type', n: 2 });
    if (S.rOn !== false) tail.push({ k: 'rpair' }, { k: 'rcatch' });
    tail.push(even ? { k: 'challenge' } : { k: 'sound' });
    tail.push({ k: day.radio ? 'radio' : 'broadcast' });
    if (THEN_NOW) tail.push({ k: 'thennow' });
    tail.push({ k: 'route' }, { k: 'feed' });
    const mid = order === 'postcard' ? V.concat(R, [{ k: 'wiggle' }], G_) : G_.concat([{ k: 'wiggle' }], V, R);
    return mid.concat(tail);
  }
  /* ---------------- play (feed) ---------------- */
  const P = { week: null, day: null, lv: null, L: null, specs: [], cards: [], idx: 0, res: {}, fish: 0, started: 0, key: '' };
  let advanceTimer = null, BUILDING = null, idleTimers = [];
  function sessionKey(week, day, lv) { return `${week.id}-${day.day}-${lv}`; }

  function startSession(dayIdx, resume, mode) {
    const week = currentWeek();
    let day = shownDay(week.days[dayIdx]);
    if (resume && S.progress && S.progress.mode) mode = S.progress.mode;
    if (!resume) S.progress = null;
    if (resume && S.progress && S.progress.alt && day.alt) day = day.alt;
    let lv = mode === 'boss' ? LEVELS[Math.min(LEVELS.indexOf(S.level) + 1, 2)] : (mode === 'italia' ? 'ground' : S.level);
    let res = {}, idx = 0, fish = 0, started = Date.now();
    if (resume && S.progress && S.progress.week === week.id && S.progress.day === day.day) {
      lv = S.progress.lv; res = S.progress.res || {}; idx = S.progress.idx || 0; fish = S.progress.fish || 0; started = S.progress.started || started;
    }
    Object.assign(P, { week, day, lv, L: day.levels[lv], res, fish, started, idx: 0, cards: [], key: sessionKey(week, day, lv) + (mode ? '-' + mode : ''), alt: !!(resume && S.progress && S.progress.alt), mode: mode || '', order: 'words' });
    P.plan = (order) => planFor(P.week, P.day, P.lv, order);
    P.specs = resume && S.progress && S.progress.specs ? S.progress.specs : buildSpecs(week, day, lv, mode);
    // Before she picks the order, the dots show the whole session (word games first by default).
    if (!(resume && S.progress && S.progress.specs) && !mode) P.specs = P.specs.concat(P.plan('words'));
    if (resume && S.progress && S.progress.order) P.order = S.progress.order;
    $('feed').replaceChildren();
    showScreen('screenPlay');
    renderDots();
    for (let i = 0; i <= idx; i++) appendCard(i, i < idx);
    requestAnimationFrame(() => { scrollToIndex(idx, false); });
    saveProgress();
    if (!S.hinted) { S.hinted = true; save(); const h = $('swipeHint'); h.hidden = false; setTimeout(() => { h.hidden = true; }, 5000); }
  }
  /* "Skip this postcard": swap in the other animal's postcard at the same level. No penalty: food earned so far
     is kept, and skipped cards are simply not scored. Word workout cards (shared) are kept as they are. */
  const SKIPPABLE = ['mail', 'decode', 'chunk', 'question', 'advisor', 'fill', 'says', 'broadcast'];
  function swapToAlt() {
    const alt = P.day.alt; if (!alt) return;
    clearTimeout(advanceTimer);
    const firstPost = P.specs.findIndex((x) => x.k === 'decode' || x.k === 'chunk');
    const j = P.idx < firstPost ? P.idx : firstPost;
    P.day = alt; P.L = alt.levels[P.lv]; P.alt = true; P.key = sessionKey(P.week, alt, P.lv);
    const oi = P.specs.findIndex((x) => x.k === 'order');
    const newPlan = P.plan(P.order);
    if (j <= oi) { const head = buildSpecs(P.week, alt, P.lv); P.specs = P.specs.slice(0, j).concat(head.slice(j), newPlan); }
    else P.specs = P.specs.slice(0, j).concat(newPlan.slice(j - (oi + 1)));
    for (let i = j; i < P.cards.length; i++) if (P.cards[i]) P.cards[i].el.remove();
    P.cards.length = j;
    Object.keys(P.res).forEach((i) => { if (/^\d+$/.test(i) && +i >= j) delete P.res[i]; });
    renderDots(); appendCard(j, false); scrollToIndex(j, false); saveProgress();
    toast(`Here is a new postcard: ${alt.place} ${alt.flag}`, 2600);
  }
  function saveProgress() {
    if (P.mode === 'italia') return; // the Italian bonus is tiny: no resume needed
    S.progress = { week: P.week.id, day: P.day.day, alt: !!P.alt, lv: P.lv, idx: Math.max(P.idx, P.cards.length - 1), res: P.res, fish: P.fish, started: P.started, specs: P.specs, mode: P.mode, order: P.order };
    save();
  }
  function appendCard(i, done) {
    if (P.cards[i] || i >= P.specs.length) return;
    const spec = P.specs[i];
    const card = { i, spec, done: !!done, el: null, onShow: null, onLeave: null };
    const sec = el('section', 'card card-' + spec.k);
    sec.setAttribute('aria-roledescription', 'card');
    card.el = sec;
    BUILDING = card;
    try { BUILD[spec.k](card, sec); } catch (e) { console.error(e); sec.appendChild(el('p', 'c-text', 'Oops, this card is missing. Swipe on!')); card.done = true; }
    BUILDING = null;
    if (P.day.alt && SKIPPABLE.includes(spec.k) && !card.done) {
      const body = sec.querySelector('.c-body');
      if (body) body.insertBefore(btn('skip-btn', '↪️ Skip this postcard', () => swapToAlt()), body.firstChild);
    }
    if (card.done) sec.classList.add('is-done');
    P.cards[i] = card;
    $('feed').appendChild(sec);
    updateNav();
  }
  /* Called by a card when its task is finished. result: {first:boolean, type?} */
  function complete(card, result, opts) {
    if (card.done) return;
    card.done = true;
    card.el.classList.add('is-done');
    if (result) P.res[card.i] = Object.assign({ k: card.spec.k }, result);
    if (card.pip && !(opts && opts.pose === false)) card.pip.pose((opts && opts.pose) || (result ? winPose() : card.pip.dataset.pose));
    const fish = opts && opts.fish != null ? opts.fish : 1;
    if (fish) { P.fish += fish; fishPop(card.el, fish); }
    appendCard(card.i + 1, false);
    saveProgress();
    updateNav();
    clearTimeout(advanceTimer);
    if (!(opts && opts.stay)) {
      const at = card.i;
      advanceTimer = setTimeout(() => { if (P.idx === at && $('screenPlay').classList.contains('active')) goNext(); }, (opts && opts.delay) || AUTO_MS);
    }
  }
  function fishPop(where, n) {
    sound('fish');
    const f = el('div', 'fish-pop', pet().food + ' +' + n);
    where.appendChild(f);
    setTimeout(() => f.remove(), 1400);
    $('fishCount').textContent = pet().food + ' ' + P.fish;
  }
  function renderDots() {
    const d = $('dots'); d.replaceChildren();
    P.specs.forEach(() => d.appendChild(el('i', 'dot')));
    $('fishCount').textContent = pet().food + ' ' + P.fish;
  }
  function updateNav() {
    const dots = $('dots').children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('done', !!(P.cards[i] && P.cards[i].done));
      dots[i].classList.toggle('here', i === P.idx);
    }
    $('topTitle').textContent = P.mode === 'italia' ? '🇮🇹 Italia' : P.mode === 'boss' ? `👑 ${P.day ? P.day.name : ''}` : `${P.day ? P.day.name : ''}`;
    $('btnPrev').disabled = P.idx <= 0;
    const cur = P.cards[P.idx];
    $('btnNext').disabled = !(cur && cur.done && P.cards[P.idx + 1]);
    $('btnNext').classList.toggle('ready', !$('btnNext').disabled);
  }
  let scrollLock = { target: -1, until: 0 };
  function scrollToIndex(i, smooth) {
    i = Math.max(0, Math.min(i, P.cards.length - 1));
    const c = P.cards[i] && P.cards[i].el;
    if (c) { scrollLock = { target: smooth ? i : -1, until: Date.now() + 900 }; $('feed').scrollTo({ top: c.offsetTop, behavior: smooth ? 'smooth' : 'auto' }); }
    setIndex(i);
  }
  function setIndex(i) {
    if (i === P.idx && P.cards[i] && P.cards[i]._shown) { updateNav(); return; }
    const prev = P.cards[P.idx];
    if (prev && prev !== P.cards[i]) { if (prev.onLeave) prev.onLeave(); stopVoice(); }
    idleTimers.forEach(clearTimeout); idleTimers = [];
    P.idx = i;
    const c = P.cards[i];
    if (c) {
      const first = !c._shown; c._shown = true;
      // The guide says her line out loud (captions are in the bubble). Cards with their own audio set noAutoSay.
      if (c.pip && !c.noAutoSay && first && !c.done) setTimeout(() => { if (P.cards[P.idx] === c) c.pip.speakNow(); }, 250);
      if (c.onShow) c.onShow();
      if (!c.done) (c.idle || []).forEach((x) => idleTimers.push(setTimeout(() => { if (P.cards[P.idx] === c && !c.done) { x.fn(); if (c.pip) c.pip.say('Here is a clue! 💡'); } }, x.ms)));
    }
    $('swipeHint').hidden = true;
    updateNav();
  }
  function onFeedScroll() {
    const feed = $('feed');
    if (scrollLock.target >= 0) {
      const t = P.cards[scrollLock.target] && P.cards[scrollLock.target].el;
      if (Date.now() > scrollLock.until || !t || Math.abs(feed.scrollTop - t.offsetTop) < 2) scrollLock.target = -1; else return;
    }
    const best = Math.round(feed.scrollTop / (feed.clientHeight || 1));
    if (best !== P.idx && best >= 0 && best < P.cards.length) setIndex(best);
  }
  function goNext() {
    const cur = P.cards[P.idx];
    if (!cur || !cur.done) { toast('Help Pip with this card first 💛'); return; }
    if (P.cards[P.idx + 1]) scrollToIndex(P.idx + 1, true);
  }
  function goPrev() { if (P.idx > 0) scrollToIndex(P.idx - 1, true); }

  /* ---------------- card building blocks ---------------- */
  function frame(sec, o) {
    const vis = el('div', 'c-visual' + (o.visCls ? ' ' + o.visCls : ''));
    const body = el('div', 'c-body');
    if (o.kicker) body.appendChild(el('p', 'c-kicker', o.kicker));
    if (o.title) body.appendChild(el('h2', 'c-title', o.title));
    sec.append(vis, body);
    if (o.tall) sec.classList.add('tall');
    return { vis, body };
  }
  function sceneImg(src, focus, zoom) {
    const d = el('div', 'scene');
    d.style.backgroundImage = `url(${src})`;
    if (focus) d.style.backgroundPosition = focus;
    // Zoom with a transform (not background-size) so the picture always covers the frame, portrait or landscape.
    if (zoom) { d.classList.add('zoom'); d.style.setProperty('--z', parseFloat(zoom) / 100); d.style.transformOrigin = focus || 'center'; }
    return d;
  }
  /* The guide + a speech bubble. The bubble is always the caption of what she says out loud; 🔁 replays it. */
  /* Guide poses (Sue's art). Config: PIP_GUIDES.poses in guide.js. A slot with several files takes turns. */
  const POSE = GUIDES.poses || { art: {}, fallback: {}, byCard: {}, screens: {} };
  const poseTurn = {};
  function poseFiles(kind, slot) {
    const art = (POSE.art || {})[kind] || {};
    const tried = [slot].concat((POSE.fallback || {})[slot] || []);
    for (const s of tried) if (art[s] && art[s].length) return art[s];
    return [];
  }
  function poseSrc(slot, kind, fixed) {
    const k = kind || G().kind, list = poseFiles(k, slot || 'talk');
    if (!list.length) return (GUIDES.kinds[k] || G()).img || 'img/pip_happy.webp';
    const key = k + ':' + slot; const n = fixed ? 0 : (poseTurn[key] = ((poseTurn[key] == null ? -1 : poseTurn[key]) + 1));
    const f = list[n % list.length];
    return 'guides/' + k + '/' + (f.indexOf('.') >= 0 ? f : f + '.webp');
  }
  function allPoseSrcs(kind) { const k = kind || G().kind, out = new Set([(GUIDES.kinds[k] || {}).img]); Object.values((POSE.art || {})[k] || {}).forEach((l) => l.forEach((f) => out.add('guides/' + k + '/' + (f.indexOf('.') >= 0 ? f : f + '.webp')))); return [...out].filter(Boolean); }
  function allGirlSrcs() { const out = new Set(); Object.values(GIRL).forEach((v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v : Object.values(v)).forEach((n) => out.add('img/girl/' + n + '.webp'))); STICKERS.forEach((n) => out.add('img/stickers/' + n + '.webp')); return [...out]; }
  function warmPoses() { if (navigator.onLine === false) return; const pp = S.chick && S.chick.kind ? pet() : null; allPoseSrcs().concat(pp ? stagesOf(pp).map((x) => x.img).concat(pp.pre.map((st) => babyImg(pp.id, st))) : [], allGirlSrcs()).forEach((u) => { const i = new Image(); i.src = u; }); }
  function guideImg(mood) { return poseSrc(mood || 'talk'); }
  let winTurn = 0;
  function winPose() { return (winTurn++ % 3 === 2) ? 'love' : 'cheer'; }
  /* The girl joins some cards (small, bottom-left of the picture): pirate on boss postcards, Italy on the Italian
     bonus, thinking on "your turn to think" cards, writing on spell/type cards, a postcard on the arrival card. */
  function sidekick(vis, card, base) {
    if (!vis || !vis.classList || !vis.classList.contains('c-visual') || vis.querySelector('.girl-side')) return;
    if (vis.parentElement && vis.parentElement.classList.contains('tall')) return;
    const k = card && card.spec && card.spec.k;
    const slot = P && P.mode === 'boss' ? (k === 'feed' ? 'bossWin' : 'boss') : k === 'italia' ? 'italia' : (k === 'spell' || k === 'type') ? 'spell' : base === 'think' ? 'think' : k === 'mail' ? 'mail' : '';
    if (slot) vis.appendChild(girlEl(slot, 'girl-side'));
  }
  function pipSay(vis, text, mood) {
    const card = BUILDING;
    const base = (card && card.spec && (POSE.byCard || {})[card.spec.k]) || 'talk';
    const w = el('div', 'pip-wrap guide-' + G().kind + (mood === 'oops' ? ' oops' : ''));
    const img = el('img', 'pip'); img.src = guideImg(mood || base); img.alt = `${G().name} the ${G().species}`;
    img.onerror = () => { const m = G().img; if (m && !img.src.endsWith(m)) img.src = m; };
    w.base = base;
    w.pose = (slot) => { const nx = guideImg(slot || w.base); if (!img.src.endsWith(nx)) img.src = nx; w.classList.toggle('oops', slot === 'oops'); w.dataset.pose = slot || w.base; };
    w.dataset.pose = mood || base;
    const b = el('div', 'bubble');
    const cap = el('span', 'cap', fillName(text || ''));
    const rp = btn('replay', '🔁', (e) => { e.stopPropagation(); w.speakNow(); }); rp.setAttribute('aria-label', 'Hear it again');
    b.append(cap, rp);
    if (!text) b.hidden = true;
    w.append(b, img); vis.appendChild(w);
    sidekick(vis, card, base);
    w.text = text || '';
    w.speakNow = () => { if (w.text) sayList([{ text: fillName(w.text), word: false }]); };
    w.say = (t, m) => {
      w.text = t || ''; b.hidden = !t; cap.textContent = fillName(t || ''); w.pose(m || w.base); w.classList.remove('pop'); void w.offsetWidth; w.classList.add('pop');
      if (t && card && P.cards[P.idx] === card) w.speakNow();
    };
    if (card) card.pip = w;
    return w;
  }
  function feedback(body) { const f = el('p', 'fb'); f.setAttribute('role', 'status'); f.setAttribute('aria-live', 'polite'); body.appendChild(f); return f; }
  function setFb(f, text, kind) { f.textContent = fillName(text); f.className = 'fb show ' + (kind || ''); }
  // "Not yet": a gentle wobble and a soft boop. No red, no X, no buzzer.
  function shake(b) { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); sound('wrong'); }
  /* Idle help: if she pauses, a clue appears by itself (before she can get stuck). */
  function onIdle(fn, ms) { const c = BUILDING; if (c) (c.idle = c.idle || []).push({ fn, ms: ms || 12000 }); }
  function sparkle(b) { b.classList.add('right'); sound('ok'); const s = el('span', 'spark', '✨'); b.appendChild(s); setTimeout(() => s.remove(), 900); }
  /* Multiple choice. opts: correct FIRST (shuffled here). onRight(first), onWrong(btn, tries).
     Never a dead end: after one miss the choices narrow to 2, after a second only the answer is left (glowing).
     If she pauses, one option quietly fades away as a clue. */
  function choices(parent, opts, seed, onRight, onWrong, cls) {
    const row = el('div', 'opts ' + (cls || ''));
    let tries = 0, over = false;
    const btns = [];
    const fadeWrong = (keep) => { const wrong = btns.filter((x) => x.i !== 0 && !x.b.classList.contains('gone')); shuffle(wrong, seed + tries).slice(0, Math.max(0, wrong.length - keep)).forEach((x) => { x.b.classList.add('gone'); x.b.disabled = true; }); };
    shuffle(opts.map((o, i) => ({ o, i })), seed).forEach(({ o, i }) => {
      const b = btn('opt', null, () => {
        if (over || b.disabled) return;
        if (i === 0) { over = true; sparkle(b); onRight(tries === 0, b); }
        else {
          tries++; shake(b); b.classList.add('gone'); b.disabled = true;
          if (tries === 1) fadeWrong(1); else { fadeWrong(0); btns[0] && btns.find((x) => x.i === 0).b.classList.add('glow'); }
          onWrong && onWrong(b, tries);
        }
      });
      if (o instanceof Node) b.appendChild(o); else b.textContent = o;
      btns.push({ b, i });
      row.appendChild(b);
    });
    onIdle(() => { if (!over) { fadeWrong(Math.max(1, btns.filter((x) => x.i !== 0 && !x.b.disabled).length - 1)); } });
    parent.appendChild(row);
    return row;
  }
  /* Tappable sentences of the whole postcard (evidence). isRight(idx, sentence) -> 'right' | 'near' | false */
  function sentenceList(parent, L, isRight, onDone, onMiss) {
    const box = el('div', 'evi');
    let tries = 0, over = false;
    let n = 0;
    const help = (lvl) => {
      box.querySelectorAll('.evi-p').forEach((p) => { if (![...p.querySelectorAll('.evi-s')].some((x) => x._right)) p.classList.add('dim'); });
      if (lvl >= 2) box.querySelectorAll('.evi-s').forEach((x) => { if (x._right) x.classList.add('glow'); });
    };
    onIdle(() => { if (!over) help(1); }, 20000);
    L.chunks.forEach((c) => {
      const p = el('p', 'evi-p');
      c.s.forEach((s) => {
        const i = n++;
        const b = btn('evi-s', fillName(s), () => {
          if (over) return;
          const r = isRight(i, s);
          if (r === 'right') { over = true; sparkle(b); onDone(tries === 0, i); }
          else if (r === 'near') { b.classList.add('near'); onMiss(b, 'near'); }
          else { tries++; shake(b); b.classList.add('nope'); setTimeout(() => b.classList.remove('nope'), 1200); help(tries); onMiss(b, tries); }
        });
        b._right = isRight(i, s) === 'right';
        p.append(b, document.createTextNode(' '));
      });
      box.appendChild(p);
    });
    parent.appendChild(box);
    return box;
  }
  const hasSub = (s, subs) => [].concat(subs || []).some((x) => s.includes(x));
  function hintBtn(parent, label, onHint) { const b = btn('hint-btn', label || '💡 Hint', () => { b.classList.add('used'); onHint(); }); parent.appendChild(b); return b; }
  const wordLevelLabel = () => `${P.day.name} · ${LEVEL_INFO[P.lv].name}`;
  function recordMiss(markup, type) {
    const w = plain(markup);
    if (!P.res.missed) P.res.missed = [];
    if (!P.res.missed.find((m) => m.w === w)) P.res.missed.push({ w, split: markup, type });
  }

  /* ---------------- the cards ---------------- */
  const BUILD = {};
  BUILD.model = (card, sec) => {
    const m = P.L.model;
    const { vis, body } = frame(sec, { kicker: '🧩 Pattern · Watch me', title: m.title });
    body.appendChild(el('p', 'c-note', '🇮🇹 Like Italian: when a word follows the pattern, the letters tell you the sounds.'));
    const big = el('div', 'model-hero'); big.appendChild(wordEl(m.ex[0].w, { big: true })); vis.appendChild(big);
    pipSay(vis, 'Watch me first! Tap each word.');
    m.lines.forEach((t) => body.appendChild(el('p', 'c-text sm', t)));
    const row = el('div', 'ex-row');
    let tapped = 0;
    const go = btn('big-btn', 'Got it! 👍', () => complete(card, null, { fish: 0, delay: 300 }));
    go.disabled = true;
    m.ex.forEach((x) => {
      const b = btn('ex', null, () => {
        big.replaceChildren(wordEl(x.w, { big: true })); big.classList.remove('pulse'); void big.offsetWidth; big.classList.add('pulse');
        if (!b.classList.contains('seen')) { b.classList.add('seen'); tapped++; }
        if (tapped >= Math.min(2, m.ex.length)) go.disabled = false;
        speak(plain(x.w));
      });
      b.append(wordEl(x.w), el('span', 'ex-tag', x.tag));
      row.appendChild(b);
    });
    body.append(row, go);
  };
  function wordCardVisual(vis, pic, clue, sayText) { const v = el('div', 'pic-hero', pic || '📝'); vis.appendChild(v); return pipSay(vis, sayText || clue); }
  function nearMisses(w) {
    const out = new Set(); const swaps = { a: 'e', e: 'i', i: 'e', o: 'u', u: 'o' };
    for (let i = 0; i < w.length && out.size < 6; i++) { const c = w[i]; if (swaps[c]) out.add(w.slice(0, i) + swaps[c] + w.slice(i + 1)); }
    if (w.length > 3) out.add(w.slice(0, -2) + w.slice(-1));
    for (let i = 1; i < w.length - 1; i++) if (!/[aeiou]/.test(w[i])) { out.add(w.slice(0, i) + w[i] + w.slice(i)); break; }
    out.delete(w);
    return shuffle([...out], w).slice(0, 2);
  }
  BUILD.echo = (card, sec) => {
    const r = card.spec.r;
    const { vis, body } = frame(sec, { kicker: '🔁 Echo word · you know this one!', title: 'Which one is right?' });
    wordCardVisual(vis, '🔁', null, 'This word came back to visit! Which spelling is right?');
    const fb = feedback(body);
    body.appendChild(hearBtn(r.w, '🔊 Hear it'));
    choices(body, [r.w, ...nearMisses(r.w)], r.w + P.key, (first) => {
      setFb(fb, first ? 'You remembered it! 🌟' : 'Yes! That is it.', 'good');
      const hit = S.review.find((x) => x.w === r.w);
      if (hit) { if (first) S.review = S.review.filter((x) => x !== hit); else hit.due = S.sessionsDone + 2; save(); }
      complete(card, { first, type: 'echo' });
    }, () => { setFb(fb, 'Not yet! Look closely at each letter.', 'soft'); const s = body.querySelector('.echo-split'); if (!s) { const d = el('div', 'echo-split'); d.appendChild(wordEl(r.split || r.w, { big: true })); body.insertBefore(d, fb); } });
  };
  BUILD.sort = (card, sec) => {
    const k = P.L.sort;
    const { vis, body } = frame(sec, { kicker: '🧺 Word workout · Let\'s do it together', title: 'Sort the word' });
    const pip = pipSay(vis, 'Where does this word go?');
    const stage = el('div', 'sort-word'); vis.appendChild(stage);
    const prog = el('p', 'c-sub', '');
    const fb = feedback(body);
    let n = 0, mistakes = 0, hinted = false;
    const show = () => {
      const [w] = k.items[n];
      stage.replaceChildren(wordEl((k.split && k.split[w]) && hinted ? k.split[w] : (hinted ? w : `${w}`), { big: true }));
      if (!hinted) stage.querySelectorAll('.vow').forEach((v) => v.classList.add('plain'));
      prog.textContent = `Word ${n + 1} of ${k.items.length}`;
      stage.classList.remove('pop'); void stage.offsetWidth; stage.classList.add('pop');
    };
    const bins = el('div', 'bins');
    [['a', k.a], ['b', k.b]].forEach(([id, label]) => {
      const b = btn('bin', label, () => {
        const [w, ans] = k.items[n];
        if (ans === id) {
          sparkle(b); setTimeout(() => b.classList.remove('right'), 500);
          n++;
          if (n >= k.items.length) { setFb(fb, mistakes ? 'All sorted! 🎉' : 'All sorted, no slips! 🌟', 'good'); complete(card, { first: mistakes === 0, type: 'sort' }); stage.replaceChildren(el('span', 'done-star', '⭐')); }
          else show();
        } else { mistakes++; shake(b); recordMiss((k.split && k.split[w]) || w, 'sort'); setFb(fb, 'Oops! Pip dropped that one in a puddle. 💦 It goes on the other side!', 'soft'); pip.say('Silly me! Look at the colors for a clue!', 'oops'); hinted = true; show(); }
      });
      bins.appendChild(b);
    });
    body.append(prog, bins);
    hintBtn(body, '💡 Hint', () => { hinted = true; show(); setFb(fb, k.hint, 'hint'); });
    onIdle(() => { hinted = true; show(); setFb(fb, k.hint, 'hint'); });
    body.appendChild(fb);
    show();
    card.onShow = () => speak(k.items[n] ? k.items[n][0] : '');
  };
  BUILD.build = (card, sec) => {
    const k = P.L.build;
    const parts = k.w.replace(/[\[\]]/g, '').split('|');
    const { vis, body } = frame(sec, { kicker: '🧱 Word workout · Let\'s do it together', title: 'Build the word' });
    wordCardVisual(vis, k.pic, k.clue);
    const slots = el('div', 'slots');
    parts.forEach(() => slots.appendChild(el('span', 'slot')));
    body.appendChild(slots);
    const fb = feedback(body);
    let n = 0, mistakes = 0;
    const tiles = el('div', 'tiles');
    shuffle(k.tiles, k.w + P.key).forEach((t) => {
      const b = btn('tile', t, () => {
        if (b.disabled) return;
        if (t === parts[n]) {
          b.disabled = true; b.classList.add('used');
          const s = slots.children[n]; s.textContent = t; s.className = 'slot filled syl-' + (n % 3);
          sound('ok'); n++;
          tiles.querySelectorAll('.glow').forEach((g) => g.classList.remove('glow'));
          if (n >= parts.length) {
            slots.replaceWith((() => { const d = el('div', 'slots done'); d.appendChild(wordEl(k.w, { big: true })); return d; })());
            setFb(fb, mistakes ? 'You built it! 🧱' : 'Built it on the first try! 🌟', 'good'); speak(plain(k.w));
            complete(card, { first: mistakes === 0, type: 'build' });
          }
        } else { mistakes++; shake(b); recordMiss(k.w, 'build'); [...tiles.children].forEach((x) => { if (!x.disabled && x.textContent === parts[n]) x.classList.add('glow'); }); setFb(fb, 'Wobble wobble! Pip mixed up the pieces. The glowing one comes next!', 'soft'); }
      });
      tiles.appendChild(b);
    });
    body.appendChild(tiles);
    const row = el('div', 'tool-row');
    hintBtn(row, '💡 Hint', () => { [...tiles.children].forEach((b) => { if (!b.disabled && b.textContent === parts[n]) b.classList.add('glow'); }); setFb(fb, 'The glowing piece comes next.', 'hint'); });
    row.appendChild(hearBtn(plain(k.w), '🔊 Hear it'));
    body.append(row, fb);
  };
  function spellPick(card, sec, k, type, audioFirst) {
    const { vis, body } = frame(sec, { kicker: audioFirst ? '👂 Word workout · Your turn' : '🔎 Word workout · Your turn', title: audioFirst ? 'Hear it, or peek, then tap it' : 'Which spelling is right?' });
    const pip = wordCardVisual(vis, k.pic, audioFirst ? 'Tap 🔊 to hear the word, or 👀 for a picture clue!' : k.clue);
    const fb = feedback(body);
    const tools = el('div', 'tool-row');
    const clueBox = el('div', 'clue-box');
    const showClue = () => {
      clueBox.replaceChildren(el('p', 'c-text sm', '🖼️ ' + k.clue));
      const pat = (k.split || k.w).match(/\[([^\]]+)\]/);
      const first = pat ? pat[1] : plain((k.split || k.w).split('|')[0]);
      const g = el('p', 'c-sub'); g.append('It has '); const s = el('span', 'pat-chip', first); g.append(s, ' in it.');
      clueBox.appendChild(g); clueBox.classList.add('show');
    };
    if (audioFirst) {
      tools.appendChild(hearBtn(k.w, '🔊 Hear it'));
      hintBtn(tools, '👀 Picture clue', showClue);
      card.onShow = () => { if (!S.muted) setTimeout(() => speak(k.w), 350); };
    } else {
      tools.appendChild(hearBtn(k.w, '🔊'));
    }
    body.append(tools, clueBox);
    choices(body, k.opts, k.w + type + P.key, (first) => {
      setFb(fb, first ? praise('first') : praise('retry'), 'good');
      clueBox.replaceChildren(wordEl(k.split || k.w, { big: true })); clueBox.classList.add('show');
      complete(card, { first, type });
    }, (b, tries) => {
      recordMiss(k.split || k.w, type);
      pip.say(mishap(), 'oops');
      setFb(fb, 'Not yet! Look at each letter.', 'soft');
      if (tries >= 1) { if (!audioFirst && !body.querySelector('.hint-btn')) hintBtn(tools, '💡 Need a clue?', () => { clueBox.replaceChildren(wordEl(k.split || k.w)); clueBox.firstChild.classList.add('ghost'); clueBox.classList.add('show'); }); }
    }, 'words');
    body.appendChild(fb);
  }
  BUILD.pick = (card, sec) => spellPick(card, sec, P.L.pick, 'pick', false);
  BUILD.hear = (card, sec) => spellPick(card, sec, P.L.hear, 'hear', true);
  BUILD.rebel = (card, sec) => {
    const k = P.L.rebel;
    const { vis, body } = frame(sec, { kicker: '🕵️ Word workout · Sneaky word hunt', title: 'Find the sneaky word!' });
    const pip = pipSay(vis, 'One word is sneaky: it does NOT follow the pattern. Can you catch it?');
    vis.appendChild(el('div', 'pic-hero', '🕵️'));
    const fb = feedback(body);
    choices(body, k.words, k.words.join() + P.key, (first) => {
      setFb(fb, k.why, 'good'); pip.say('You caught the sneaky word! 🕵️');
      complete(card, { first, type: 'rebel' }, { delay: 3200 });
    }, () => { recordMiss(k.words[0], 'rebel'); pip.say('Oops, that one follows the pattern! I got mixed up. 🙃', 'oops'); setFb(fb, 'Say each word in your head. Which one sounds different?', 'soft'); }, 'words grid2');
    body.appendChild(fb);
  };
  BUILD.wiggle = (card, sec) => {
    const w = P.day.wiggle;
    const { vis, body } = frame(sec, { kicker: '🎉 Wiggle break!', title: w.text });
    vis.appendChild(el('div', 'pic-hero bounce', w.emoji));
    body.appendChild(el('p', 'c-text', w.sub));
    const b = btn('big-btn', 'I did it! ✅', () => complete(card, null, { delay: 400 }));
    b.classList.add('later'); body.appendChild(b);
    card.onShow = () => { setTimeout(() => b.classList.add('now'), 3500); };
  };
  BUILD.preview = (card, sec) => {
    const { vis, body } = frame(sec, { kicker: '🔓 Postcard unlocked!', title: 'New words on the postcard' });
    vis.appendChild(sceneImg(P.day.scene));
    pipSay(vis, 'Here are 3 new words. Tap one to hear it!');
    const list = el('div', 'pv-list');
    P.L.preview.forEach((p) => {
      const b = btn('pv', null, () => speak(p.w + '. ' + p.means));
      b.append(el('span', 'pv-pic', p.pic), (() => { const d = el('span', 'pv-txt'); d.append(el('strong', null, p.w), el('span', null, p.means)); return d; })());
      list.appendChild(b);
    });
    body.append(list, btn('big-btn', 'Open the postcard ✉️', () => complete(card, null, { fish: 0, delay: 300 })));
  };
  BUILD.chunk = (card, sec) => {
    const L = P.L, i = card.spec.i, c = L.chunks[i], last = i === L.chunks.length - 1;
    const { vis, body } = frame(sec, { kicker: `✉️ ${fillName(L.title)} · part ${i + 1} of ${L.chunks.length}` });
    vis.appendChild(sceneImg(P.day.scene, c.focus, '160%'));
    vis.appendChild(el('div', 'sticker', c.pic));
    if (i === 0) body.appendChild(el('p', 'pc-greet', 'Dear Mission Control,'));
    const txt = el('div', 'pc-text');
    c.s.forEach((s) => txt.appendChild(el('p', null, fillName(s))));
    body.appendChild(txt);
    if (last) body.appendChild(el('p', 'pc-sign', 'Your pal, Pip 🐦'));
    const quiet = el('p', 'c-sub quiet', '🤫 Read it in your head.');
    body.appendChild(quiet);
    const fb = feedback(body);
    const read = btn('big-btn', 'I read it ✓', () => {
      read.remove(); quiet.remove();
      const q = el('p', 'c-q', 'Which picture shows what just happened?');
      body.insertBefore(q, fb);
      const row = choices(body, c.check, L.title + i, (first) => {
        setFb(fb, first ? 'Yes! You pictured it! 🖼️' : 'Yes! That is it!', 'good');
        complete(card, { first, type: 'check' });
      }, () => setFb(fb, 'Not yet! Peek at the words again. 👀', 'soft'), 'pics');
      // Only AFTER she has read it herself can she hear the guide read it.
      body.insertBefore(btn('hear-btn hear-read', `🔊 Hear ${G().name} read it`, () => sayList(c.s.map((x) => ({ text: fillName(x), word: false, pause: 150 })))), fb);
      body.insertBefore(row, fb);
      requestAnimationFrame(() => { body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' }); });
    });
    body.insertBefore(read, fb);
  };
  function compareVisual(vis) {
    const other = P.week.days.find((d) => d.day === P.day.compareWith);
    const w = el('div', 'compare');
    [[other, 'then'], [P.day, 'now']].forEach(([d]) => {
      const f = el('figure', 'cmp'); f.appendChild(sceneImg(d.scene)); f.appendChild(el('figcaption', null, `${d.name}: ${d.place}`)); w.appendChild(f);
    });
    vis.appendChild(w);
    return other;
  }
  function peekOther(body, other) {
    const L2 = other.levels[P.lv];
    const b = btn('hint-btn', `👀 Peek at ${other.name}'s postcard`, () => {
      b.remove();
      const d = el('div', 'peek'); d.appendChild(el('p', 'c-kicker', `${other.name}: ${fillName(L2.title)}`));
      sentencesOf(L2).forEach((s) => d.appendChild(el('p', 'peek-s', fillName(s))));
      body.insertBefore(d, body.querySelector('.evi') || null);
    });
    return b;
  }
  BUILD.question = (card, sec) => {
    const L = P.L, q = L.question;
    const pictureQ = q.pre && q.pre.picture;
    const { vis, body } = frame(sec, { kicker: `❓ Pip's question · ${P.day.qtype}`, tall: !pictureQ, visCls: pictureQ ? 'full-pic' : '' });
    let other = null;
    if (P.day.compareWith) other = compareVisual(vis); else { const s = sceneImg(P.day.scene); if (pictureQ) s.classList.add('contain'); vis.appendChild(s); }
    const pip = pipSay(vis, q.pre ? q.pre.q : q.q);
    const fb = feedback(body);
    const evidence = () => {
      pip.say(q.q);
      body.insertBefore(el('p', 'c-q', fillName(q.q)), fb);
      if (other) body.insertBefore(peekOther(body, other), fb);
      const list = sentenceList(body, L, (i, s) => hasSub(s, q.a) ? 'right' : (q.near && hasSub(s, q.near) ? 'near' : false), (first) => {
        pip.say('You saved me, Mission Control! 🎉'); setFb(fb, first ? 'That is the proof! First try! 🌟' : 'That is the proof! 🎉', 'good');
        complete(card, { first, type: 'question', pre: card._preFirst });
      }, (b, t) => {
        if (t === 'near') { setFb(fb, q.nearText || 'Close! Try a sentence that tells it exactly.', 'hint'); return; }
        pip.say(q.mishap, 'oops'); setFb(fb, q.mishap, 'soft');
      });
      body.insertBefore(list, fb);
    };
    if (q.pre) {
      body.appendChild(el('p', 'c-q', fillName(q.pre.q)));
      const row = choices(body, q.pre.opts, L.title + 'pre', (first) => {
        card._preFirst = first; setFb(fb, 'Yes! 👍', 'good');
        setTimeout(() => { row.classList.add('collapsed'); fb.className = 'fb'; evidence(); }, 700);
      }, () => { pip.say(q.pre.mishap, 'oops'); setFb(fb, q.pre.mishap, 'soft'); }, 'stack');
      body.appendChild(fb);
    } else { body.appendChild(fb); evidence(); }
  };
  BUILD.advisor = (card, sec) => {
    const L = P.L, a = L.advisor;
    const kick = { mistake: '🧐 Advisor · Pip made a mistake', odd: '🧐 Advisor · Odd one out', feel: '🧐 Advisor · How does Pip feel?', rather: '🧐 Advisor · Would you rather?', predict: '🧐 Advisor · Predict' }[a.type];
    const { vis, body } = frame(sec, { kicker: kick, tall: true });
    vis.appendChild(sceneImg(P.day.scene));
    const pip = pipSay(vis, a.type === 'mistake' ? '"' + a.pip + '"' : a.q);
    const fb = feedback(body);
    const done = (first) => { pip.say('Great advice! You are the best advisor! 🏅'); setFb(fb, 'Great thinking! 🏅', 'good'); complete(card, { first, type: 'advisor' }); };
    const evidence = (prompt, subs, first0) => {
      body.insertBefore(el('p', 'c-q', prompt), fb);
      const list = sentenceList(body, L, (i, s) => hasSub(s, subs) ? 'right' : false, (first) => done(first0 && first), () => { pip.say(a.mishap, 'oops'); setFb(fb, a.mishap, 'soft'); });
      body.insertBefore(list, fb);
    };
    if (a.type === 'mistake') {
      body.appendChild(el('p', 'c-quote', 'Pip says: "' + a.pip + '"'));
      body.appendChild(fb);
      evidence(a.q, a.a, true);
    } else if (a.type === 'odd') {
      body.appendChild(el('p', 'c-q', a.q));
      let first0 = true;
      const row = choices(body, a.opts, L.title + 'odd', (first) => {
        first0 = first;
        setTimeout(() => {
          row.classList.add('collapsed');
          body.insertBefore(el('p', 'c-q', a.whyQ), fb);
          const r2 = choices(body, a.whys, L.title + 'why', (f2) => done(first0 && f2), () => setFb(fb, a.mishap, 'soft'), 'stack');
          body.insertBefore(r2, fb);
        }, 600);
      }, () => { pip.say('Hmm, that one belongs! Look again.', 'oops'); }, 'stack');
      body.appendChild(fb);
    } else if (a.type === 'feel' || a.type === 'predict') {
      body.appendChild(el('p', 'c-q', a.q));
      const row = choices(body, a.opts, L.title + 'feel', (first) => {
        setTimeout(() => { row.classList.add('collapsed'); evidence(a.evQ, a.a, first); }, 600);
      }, () => { pip.say('Hmm, look at the postcard for clues!', 'oops'); }, 'stack');
      body.appendChild(fb);
    } else if (a.type === 'rather') {
      body.appendChild(el('p', 'c-q', a.q));
      const pickRow = el('div', 'opts stack');
      a.choices.forEach((c, ci) => {
        const b = btn('opt', c.label, () => {
          pickRow.classList.add('collapsed'); b.classList.add('right');
          body.insertBefore(el('p', 'c-q', 'Good choice! ' + c.q), fb);
          const r2 = choices(body, c.reasons, L.title + 'rather' + ci, (f2) => done(f2), () => { pip.say(a.mishap, 'oops'); setFb(fb, a.mishap, 'soft'); }, 'stack');
          body.insertBefore(r2, fb);
        });
        pickRow.appendChild(b);
      });
      body.append(pickRow, fb);
    }
  };
  BUILD.fill = (card, sec) => {
    const k = P.L.fill;
    const { vis, body } = frame(sec, { kicker: '🧠 Remember it · fill the blank', title: k.kind === 'letters' ? 'Finish the word' : 'Which word fits?' });
    const pip = pipSay(vis, 'A raindrop smudged a word on my postcard! 💧 Can you fix it?');
    vis.appendChild(el('div', 'pic-hero', '💧'));
    const sentence = el('p', 'fill-sent');
    const [before, after] = fillName(k.sent).split('___');
    const blank = el('span', 'blank', k.kind === 'letters' ? `${k.pre}__${k.post}` : '_____');
    sentence.append(before, blank, after);
    body.appendChild(sentence);
    const fb = feedback(body);
    choices(body, k.opts, k.sent, (first) => {
      blank.textContent = k.kind === 'letters' ? k.w : k.opts[0]; blank.classList.add('filled');
      setFb(fb, first ? 'Fixed! You remembered! 🌟' : 'Fixed! 🎉', 'good');
      complete(card, { first, type: 'fill' });
    }, () => {
      recordMiss(k.kind === 'letters' ? k.w : k.opts[0], 'fill');
      pip.say(mishap() + ' Which word makes sense?', 'oops');
      setFb(fb, k.kind === 'letters' ? 'Say the word slowly. Which letters make that sound?' : 'Which word makes sense in the sentence?', 'soft');
    }, k.kind === 'letters' ? 'tiles-row' : 'words');
    body.appendChild(fb);
  };
  BUILD.spell = (card, sec) => {
    const k = P.L.spell;
    const { vis, body } = frame(sec, { kicker: '✏️ Remember it · spell it', title: 'Spell the missing word' });
    const pip = wordCardVisual(vis, k.pic, null, 'Type the missing word. You can hear it or peek!');
    const sentence = el('p', 'fill-sent');
    const [before, after] = fillName(k.sent).split('___');
    const blank = el('span', 'blank', '_____');
    sentence.append(before, blank, after);
    body.appendChild(sentence);
    const form = el('form', 'spell-form');
    const inp = el('input', 'spell-in'); inp.type = 'text'; inp.autocomplete = 'off'; inp.setAttribute('autocapitalize', 'none'); inp.setAttribute('autocorrect', 'off'); inp.spellcheck = false; inp.setAttribute('aria-label', 'Type the word');
    const go = btn('big-btn', 'Check ✓'); go.type = 'submit';
    form.append(inp, go);
    body.appendChild(form);
    const tools = el('div', 'tool-row');
    tools.appendChild(hearBtn(k.w, '🔊 Hear it'));
    const peek = el('div', 'peek-word');
    let helped = false, tries = 0;
    hintBtn(tools, '👀 Peek', () => { helped = true; peek.replaceChildren(wordEl(k.split, { big: true })); peek.classList.add('show'); setTimeout(() => peek.classList.remove('show'), 2600); });
    body.append(tools, peek);
    const fb = feedback(body);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = inp.value.trim().toLowerCase();
      if (!v) return;
      if (v === k.w.toLowerCase()) {
        blank.textContent = k.w; blank.classList.add('filled'); inp.disabled = true; go.disabled = true; sound('ok');
        setFb(fb, tries === 0 && !helped ? 'Perfect spelling! 🌟' : 'You spelled it! 🎉', 'good');
        complete(card, { first: tries === 0 && !helped, type: 'spell' });
      } else {
        tries++; shake(inp); recordMiss(k.split, 'spell');
        pip.say('So close! Try again. 💪', 'oops');
        if (tries >= 2) { peek.replaceChildren(wordEl(k.split, { big: true })); peek.classList.add('show'); setFb(fb, 'Here it is. Copy it letter by letter!', 'hint'); }
        else setFb(fb, 'Almost! Check each sound.', 'soft');
      }
    });
  };
  function fullPostcard(parent) {
    const box = el('div', 'pc-full');
    box.appendChild(el('p', 'pc-greet', 'Dear Mission Control,'));
    P.L.chunks.forEach((c) => box.appendChild(el('p', null, c.s.map(fillName).join(' '))));
    box.appendChild(el('p', 'pc-sign', 'Your pal, Pip 🐦'));
    parent.appendChild(box);
  }
  function takesUI(body, kinds, onAll) {
    const got = {}; const players = el('div', 'takes');
    let doneCalled = false;
    const check = () => { if (!doneCalled && kinds.every((k) => got[k.id])) { doneCalled = true; onAll(got); } };
    kinds.forEach((kind, ki) => {
      const col = el('div', 'take');
      col.appendChild(el('p', 'take-h', kind.label));
      const slot = el('div', 'take-play');
      const r = recorder({ week: P.week.id, day: P.day.day, dayName: P.day.name, level: P.lv, kind: kind.id, title: fillName(P.L.title) }, (rec) => { got[kind.id] = rec; slot.replaceChildren(audioFor(rec)); check(); }, () => { got[kind.id] = 'spoken'; check(); });
      col.append(r, slot);
      players.appendChild(col);
    });
    body.appendChild(players);
    return players;
  }
  BUILD.broadcast = (card, sec) => {
    const { vis, body } = frame(sec, { kicker: '📻 Broadcast · read it out loud', tall: true });
    vis.appendChild(sceneImg('img/fri_radio.webp'));
    pipSay(vis, 'You figured it all out! Now read the whole postcard out loud, like a radio host! 🎙️');
    body.appendChild(el('p', 'c-sub', 'Take 1: read it out loud. Take 2: read it again like a radio star!'));
    const fb = feedback(body);
    let heard = false;
    const hearAfter = () => { if (heard) return; heard = true; body.insertBefore(btn('hear-btn hear-read', `🔊 Hear ${G().name} read it`, () => sayList(P.L.chunks.flatMap((c) => c.s).map((x) => ({ text: fillName(x), word: false, pause: 150 })))), fb); };
    const obs = new MutationObserver(() => { if (body.querySelector('.take-play audio') || body.querySelector('.rec-off')) { hearAfter(); obs.disconnect(); } });
    obs.observe(body, { childList: true, subtree: true });
    const takes = takesUI(body, [{ id: 'first', label: '🎙️ Take 1' }, { id: 'best', label: '🌟 Take 2 (radio star)' }], () => {
      setFb(fb, 'What a broadcast! Listen to Take 1 and Take 2 side by side. 🎧', 'good');
      complete(card, { first: true, type: 'broadcast' }, { fish: 2, stay: true });
    });
    body.appendChild(fb);
    fullPostcard(body);
  };
  BUILD.radio = (card, sec) => {
    const r = P.day.radio;
    const { vis, body } = frame(sec, { kicker: '📻 Friday Radio Show · read it with a grown-up', title: fillName(r.title), tall: true });
    vis.appendChild(sceneImg('img/fri_radio.webp'));
    pipSay(vis, 'Pick your part. Your grown-up reads the other parts. Record the whole show!');
    const parts = r.parts.map(fillName);
    const chooser = el('div', 'part-row');
    const script = el('div', 'script');
    const colors = ['p0', 'p1', 'p2'];
    const render = (mine) => {
      script.replaceChildren();
      r.lines.forEach(([who, line]) => {
        const w = fillName(who); const pi = parts.indexOf(w);
        const p = el('p', 'line ' + (pi >= 0 ? colors[pi] : 'pall') + (w === mine || who === 'ALL' ? ' mine' : ''));
        p.append(el('strong', null, w + ': '), fillName(line)); script.appendChild(p);
      });
    };
    parts.forEach((p) => chooser.appendChild(btn('part', p, (e) => { chooser.querySelectorAll('.part').forEach((b) => b.classList.remove('on')); e.currentTarget.classList.add('on'); render(p); })));
    body.append(chooser, script);
    render(null);
    const fb = feedback(body);
    takesUI(body, [{ id: 'radio', label: '🎙️ Record the show' }], () => {
      setFb(fb, 'That was a hit show! 🎉 Play it back for the family.', 'good');
      complete(card, { first: true, type: 'broadcast' }, { fish: 3, stay: true });
    });
    body.appendChild(fb);
  };
  BUILD.route = (card, sec) => {
    const R = P.day.route;
    const { vis, body } = frame(sec, { kicker: '🗺️ Reply & route', title: 'Where should Pip fly?', tall: true });
    pipSay(vis, R.q);
    vis.appendChild(el('div', 'pic-hero', '🗺️'));
    body.appendChild(el('p', 'c-quote', fillName(P.day.ps)));
    const rep = el('details', 'reply'); rep.appendChild(el('summary', null, '🎙️ Record a reply to Pip (optional)'));
    rep.appendChild(recorder({ week: P.week.id, day: P.day.day, dayName: P.day.name, level: P.lv, kind: 'reply', title: 'Reply to Pip' }, () => {}, () => {}));
    body.appendChild(rep);
    body.appendChild(el('p', 'c-q', R.q));
    const row = el('div', 'route-row');
    R.opts.forEach((o, oi) => {
      const b = btn('route', null, () => {
        row.querySelectorAll('.route').forEach((x) => { x.disabled = true; });
        b.classList.add('right'); sound('ok');
        S.routeEcho = { week: P.week.id, day: P.day.day, text: o.echo }; P.res.route = o.label; save();
        complete(card, null, { delay: 900 });
      });
      b.append(el('span', 'route-pic', o.pic), el('span', 'route-lbl', o.label));
      row.appendChild(b);
    });
    body.appendChild(row);
  };
  const stageFor = (fish) => { let s = 0; STAGE_AT.forEach((at, i) => { if (fish >= at) s = i; }); return s; };
  function chickEl(fish, cls, kind) {
    const pp = kind ? PETS[kind] : pet();
    const st = stagesOf(pp)[stageFor(fish)];
    const w = el('div', 'chick ' + (cls || ''));
    w.style.setProperty('--s', st.scale);
    const img = el('img', 'chick-img'); img.src = st.img; img.alt = kind ? pp.kind : chickName() + ', your ' + pp.kind.toLowerCase();
    w.appendChild(img);
    return w;
  }
  BUILD.feed = (card, sec) => {
    const pp = pet();
    const { vis, body } = frame(sec, { kicker: `${pp.food} Feed & grow`, title: `Feed ${chickName()}!` });
    vis.classList.add('hab-bg', 'pet-' + (S.chick.kind || 'penguin'));
    const before = S.chick.fish;
    let ch = chickEl(before, 'big');
    vis.appendChild(ch);
    const n = P.fish;
    body.appendChild(el('p', 'c-text', `You earned ${n} ${pp.foodName} today! ${pp.food}`));
    const fishRow = el('div', 'fish-row');
    for (let i = 0; i < Math.min(n, 24); i++) fishRow.appendChild(el('span', 'fishy', pp.food));
    body.appendChild(fishRow);
    const fb = feedback(body);
    const feedB = btn('big-btn', `Feed ${chickName()} ${pp.food}`, () => {
      feedB.disabled = true;
      [...fishRow.children].forEach((f, i) => setTimeout(() => { f.classList.add('eaten'); sound('fish'); }, i * 90));
      setTimeout(() => {
        const after = before + n;
        const sb = stageFor(before), sa = stageFor(after);
        S.chick.fish = after; save();
        const nc = chickEl(after, 'big grow'); ch.replaceWith(nc); ch = nc;
        const newItems = itemsOf(pp).filter((it) => it.at > before && it.at <= after);
        let msg = sa > sb ? (sa === STAGE_KEYS.length - 1 ? `${chickName()} is all grown up! 🎓🎉` : `${chickName()} grew! Now: ${stagesOf(pp)[sa].name}! 🎉`) : `Yum! ${chickName()} is getting bigger! 😋`;
        sound(sa > sb ? 'grow' : 'ok');
        if (sa > sb) { const cheer = girlEl(sa === STAGE_KEYS.length - 1 ? 'grown' : 'grow', 'girl-cheer'); vis.appendChild(cheer); }
        if (newItems.length) {
          msg += ` New for the habitat: ${newItems.map((i) => i.name).join(', ')}!`;
          const u = el('div', 'unlock'); newItems.forEach((it) => { if (it.img) { const im = el('img'); im.src = it.img; im.alt = it.name; u.appendChild(im); } else { const e = el('span', 'unlock-emoji', it.emoji); e.setAttribute('aria-label', it.name); u.appendChild(e); } }); body.insertBefore(u, fb);
        }
        setFb(fb, msg, 'good');
        const fin = btn('big-btn', 'Finish ✓', () => { finishSession(); });
        body.appendChild(fin);
        complete(card, null, { fish: 0, stay: true });
      }, Math.min(n, 24) * 90 + 400);
    });
    body.append(feedB, fb);
  };

  /* ================= new cards: warm-up, order, decoding, sneaky words, typing, sounds, R, bonus ================= */
  const W_ = () => P.week || currentWeek();
  function rMark(w) { return String(w).replace(/r+/gi, (m) => `[${m}]`); }
  function vocabOf(w) { const V = W_().vocab || {}; return V[w] ? Object.assign({ w }, V[w]) : null; }
  function markTry(v, ok) {
    S.tryAgain = S.tryAgain || {};
    const t = S.tryAgain[v.w];
    if (ok) { if (t) { t.right = (t.right || 0) + 1; if (t.right >= 2) delete S.tryAgain[v.w]; } }
    else S.tryAgain[v.w] = { w: v.w, split: v.split, n: ((t && t.n) || 0) + 1, right: 0, last: Date.now(), from: `${P.day.name} (${LEVEL_INFO[P.lv].name})` };
    save();
  }
  /* Colored chunks; Pip taps each one, says it slowly, then the whole word. */
  function chunkItems(v, box, slow) {
    const syls = box ? [...box.querySelectorAll('.syl')] : [];
    const parts = String(v.split || v.w).split('|');
    const says = v.say ? v.say.split('|') : parts.map(plain);
    const on = (i) => () => syls.forEach((s, j) => s.classList.toggle('on', i < 0 ? true : j === i));
    const items = parts.length > 1 ? says.map((c, i) => ({ text: c, word: true, slow: true, onStart: on(i), pause: 260 })) : [{ text: v.w, word: true, slow: true, onStart: on(-1), pause: 300 }];
    items.push({ text: v.w, word: true, slow: !!slow, onStart: on(-1) });
    return items;
  }
  function chunkWord(v) {
    const d = el('div', 'dec-word');
    const w = wordEl(v.split || v.w, { big: true });
    const parts = String(v.split || v.w).split('|'); const says = v.say ? v.say.split('|') : parts.map(plain);
    [...w.querySelectorAll('.syl')].forEach((s, i) => { s.classList.add('tap'); s.addEventListener('click', () => { sayList([{ text: says[i] || plain(parts[i]), word: true, slow: true }]); }); });
    d.appendChild(w); return d;
  }
  /* Optional record-and-compare for one word (saved on this device only). */
  function wordRec(v, kind) {
    const wrap = el('div', 'wrec');
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder)) return wrap;
    const b = btn('mini-btn', '🎙️ Record me', null);
    const out = el('span', 'wrec-out');
    let mr = null;
    b.addEventListener('click', async () => {
      if (mr && mr.state === 'recording') { mr.stop(); return; }
      let stream; try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (_) { b.remove(); out.textContent = 'Mic is off. That is OK!'; return; }
      const chunks = []; try { mr = new MediaRecorder(stream); } catch (_) { return; }
      mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
        const rec = { id: 'r' + Date.now() + Math.random().toString(36).slice(2, 6), date: Date.now(), dur: 3, mime: blob.type, blob, kind: kind || 'word', word: v.w, week: P.week.id, day: P.day.day, dayName: P.day.name, level: P.lv, title: v.w };
        try { await recPut(rec); } catch (_) {}
        b.textContent = '🎙️ Again';
        out.replaceChildren(btn('mini-btn', '▶️ Me', () => { const a = audioFor(rec); a.volume = vol(); a.play().catch(() => {}); }), btn('mini-btn', `🔊 ${G().name}`, () => sayList([{ text: v.w, word: true }])));
      };
      mr.start(); b.textContent = '⏹️ Stop'; setTimeout(() => { if (mr && mr.state === 'recording') mr.stop(); }, 4000);
    });
    wrap.append(b, out); return wrap;
  }
  function selfMark(row, onRight, onAgain) {
    row.replaceChildren(btn('big-btn good', '✅ I said it right', () => onRight()), btn('big-btn soft', '🔁 Try again', () => onAgain()));
  }

  BUILD.mail = (card, sec) => {
    const g = G();
    const { vis, body } = frame(sec, { kicker: `📬 Mail call · ${P.day.name}`, title: `${P.day.flag} ${P.day.place}` });
    vis.appendChild(sceneImg(P.day.scene));
    const pip = pipSay(vis, P.day.arrive);
    pip.classList.add('fly-in', 'landing');
    if (S.routeEcho && S.routeEcho.text) body.appendChild(el('p', 'c-note', '🗺️ ' + S.routeEcho.text));
    body.appendChild(el('p', 'c-text', `${g.name} has a postcard for you, Mission Control! She is trying to get here. Can you help?`));
    let n = 0;
    const land = btn('big-btn', g.landBtn[0], () => {
      const line = g.landing[Math.min(n, 2)];
      n++;
      pip.say(line, n < 3 ? 'oops' : 'carry');
      pip.classList.remove('bump'); void pip.offsetWidth; pip.classList.add(n < 3 ? 'bump' : 'landed');
      if (n < 3) land.textContent = g.landBtn[n];
      else { land.remove(); body.appendChild(el('p', 'c-sub', `${g.name} kept trying, and she made it! 🎉`)); complete(card, null, { fish: 0, delay: 1800 }); }
    });
    body.appendChild(land);
  };
  BUILD.warm = (card, sec) => {
    const list = W_().warmup || [];
    const it = list[(S.sessionsDone * 2 + card.spec.n) % Math.max(1, list.length)] || { w: 'cat', pic: '🐱', other: '🐶' };
    card.answer = it.pic;
    const { vis, body } = frame(sec, { kicker: `☀️ Warm-up ${card.spec.n + 1} of 2 · you know this one!`, title: 'Read it, then tap its picture' });
    pipSay(vis, 'Warm-up time! You know this word. Read it, then tap its picture!');
    vis.appendChild(el('div', 'pic-hero', '☀️'));
    body.appendChild((() => { const d = el('div', 'dec-word'); d.appendChild(el('span', 'w w-big plain-word', it.w)); return d; })());
    const fb = feedback(body);
    const row = choices(body, [el('span', 'pic-opt', it.pic), el('span', 'pic-opt', it.other)], it.w + P.key, (first) => {
      setFb(fb, praise('first'), 'good'); speak(it.w);
      complete(card, { first, type: 'warm' }, { delay: 1100 });
    }, () => { setFb(fb, 'Not yet! Say the word softly, sound by sound.', 'soft'); }, 'pics two');
    body.insertBefore(row, fb);
  };
  BUILD.order = (card, sec) => {
    const { vis, body } = frame(sec, { kicker: '🧭 You choose!', title: 'What do you want to do first?' });
    pipSay(vis, 'You are the boss today! What should we do first?');
    vis.appendChild(el('div', 'pic-hero', '🧭'));
    const row = el('div', 'order-row');
    [['postcard', '📬', 'The postcard first'], ['words', '🎮', 'Word games first']].forEach(([id, ic, lbl]) => {
      const b = btn('order-btn', null, () => {
        row.querySelectorAll('button').forEach((x) => { x.disabled = true; }); b.classList.add('right'); sound('ok');
        P.order = id; P.specs = P.specs.slice(0, card.i + 1).concat(P.plan(id)); renderDots();
        complete(card, null, { fish: 0, delay: 500 });
      });
      b.append(el('span', 'order-ic', ic), el('span', null, lbl));
      row.appendChild(b);
    });
    body.appendChild(row);
  };
  BUILD.decode = (card, sec) => {
    const v = card.spec.v, again = card.spec.again;
    const { vis, body } = frame(sec, { kicker: again ? '🔁 Practice word · this one came back' : `🔤 New word ${card.spec.n + 1} of ${card.spec.of || 3} · let's read it`, visCls: 'word-vis' });
    vis.appendChild(el('div', 'pic-hero', v.pic)); vis.appendChild(el('p', 'pic-cap', v.means));
    const pip = pipSay(vis, 'Watch me first! I tap each chunk and say it.');
    const stepLbl = el('p', 'step-lbl', '1 · Watch me');
    let wbox = chunkWord(v);
    const note = el('p', 'dec-note');
    if (v.tricky) { note.append('🕵️ Sneaky part: '); note.appendChild(wordEl(v.tricky.mark)); note.append(' ' + v.tricky.note); note.classList.add('sneaky'); }
    else note.textContent = '✅ Pattern word: each chunk says what it shows.';
    const row = el('div', 'dec-row');
    const fb = feedback(body);
    body.insertBefore(stepLbl, fb); body.insertBefore(wbox, fb); body.insertBefore(note, fb); body.insertBefore(row, fb);
    let weFirst = true, youFirst = true;
    const finish = () => {
      if (weFirst && youFirst) markTry(v, true);
      setFb(fb, praise('chunks'), 'good');
      complete(card, { first: weFirst && youFirst, type: 'decode', w: v.w }, { delay: 1800 });
    };
    const youDo = () => {
      stepLbl.textContent = '3 · All by yourself';
      const whole = el('div', 'dec-word'); whole.appendChild(el('span', 'w w-big plain-word', v.w)); wbox.replaceWith(whole); wbox = whole; note.hidden = true;
      pip.say('Now the whole word, no chunks! Read it out loud, then check.', 'think');
      let tries = 0;
      const check = () => { row.replaceChildren(); sayList([{ text: v.w, word: true }]).then(() => selfMark(row, () => finish(), () => {
        tries++; youFirst = false; markTry(v, false);
        if (tries >= 2) { pip.say('That is OK! We will practice this one again soon. You worked hard! 💪'); return finish(); }
        pip.say('Let me show the chunks again. Then you try!', 'talk');
        const ch = chunkWord(v); wbox.replaceWith(ch); wbox = ch;
        sayList(chunkItems(v, ch)).then(() => { const w2 = el('div', 'dec-word'); w2.appendChild(el('span', 'w w-big plain-word', v.w)); ch.replaceWith(w2); wbox = w2; row.replaceChildren(btn('big-btn', '🗣️ I read it · check 🔊', check), wordRec(v)); });
      })); };
      row.replaceChildren(btn('big-btn', '🗣️ I read it · check 🔊', check), wordRec(v));
    };
    const weDo = () => {
      stepLbl.textContent = '2 · Together';
      pip.say('Your turn! Read it out loud first. Then tap Check to hear me.', 'think');
      let tries = 0;
      const check = () => { row.replaceChildren(); sayList(chunkItems(v, wbox)).then(() => selfMark(row, () => { setFb(fb, praise('chunks'), 'good'); setTimeout(() => { fb.className = 'fb'; youDo(); }, 900); }, () => {
        tries++; weFirst = false; markTry(v, false);
        if (tries >= 2) { pip.say('Good trying! Let us keep going. You will see it again. 🌱'); return youDo(); }
        pip.say('No problem! Chunk by chunk, with me.');
        row.replaceChildren(btn('big-btn', '🗣️ I read it · check 🔊', check), wordRec(v));
      })); };
      row.replaceChildren(btn('big-btn', '🗣️ I read it · check 🔊', check), wordRec(v));
    };
    const go = btn('big-btn', `▶️ Read it, ${G().name}!`, () => {
      go.disabled = true;
      const next = btn('big-btn', 'My turn →', () => weDo()); next.disabled = true;
      const t = setTimeout(() => { next.disabled = false; }, 5000);
      sayList(chunkItems(v, wbox)).then(() => { clearTimeout(t); next.disabled = false; });
      row.replaceChildren(btn('mini-btn', '🔁 Again', () => sayList(chunkItems(v, wbox))), next);
    });
    row.appendChild(go);
  };
  BUILD.sneaky = (card, sec) => {
    const L = P.L, W = W_();
    const withTricky = (L.preview || []).filter((v) => v.tricky);
    const pool = (W.sneaky || []).concat(W.trickyExtra || []);
    const it = (S.sessionsDone % 2 === 0 && withTricky.length) ? Object.assign({ w: withTricky[0].w, pic: withTricky[0].pic }, withTricky[0].tricky) : pool[S.sessionsDone % Math.max(1, pool.length)];
    const { vis, body } = frame(sec, { kicker: '🕵️ Sneaky word!', title: 'This word is sneaky (not you!)' });
    vis.appendChild(el('div', 'pic-hero', it.pic || '🕵️'));
    pipSay(vis, 'Most English words follow patterns, just like Italian. But some words are sneaky! Let us catch the sneaky part.');
    const d = el('div', 'dec-word sneaky-word'); d.appendChild(wordEl(it.mark, { big: true })); body.appendChild(d);
    body.appendChild(el('p', 'c-text', `It says: “${it.says}”`));
    body.appendChild(el('p', 'dec-note sneaky', '🕵️ ' + it.note));
    const row = el('div', 'dec-row');
    row.append(hearBtn(it.w, '🔊 Hear it'), btn('big-btn', 'Caught it! ✓', () => { row.querySelectorAll('button').forEach((b) => { b.disabled = true; }); complete(card, null, { delay: 900 }); }));
    body.appendChild(row);
  };
  BUILD.teach = (card, sec) => {
    const v = card.spec.v;
    const oops = v.misread || v.look[0];
    const { vis, body } = frame(sec, { kicker: `🧑‍🏫 You are the teacher!`, title: `Help ${G().name} read this word` });
    const pip = pipSay(vis, `I will read this one! “${oops}!”`);
    card.noAutoSay = true;
    card.onShow = () => { if (!card.done) sayList([{ text: 'I will read this one!', word: false }, { text: oops, word: true }]); };
    vis.appendChild(el('div', 'pic-hero', '🧑‍🏫'));
    const wb = el('div', 'dec-word'); wb.appendChild(el('span', 'w w-big plain-word', v.w)); body.appendChild(wb);
    body.appendChild(el('p', 'c-q', `Did ${G().name} say it right?`));
    const row = el('div', 'dec-row');
    const fb = feedback(body);
    body.insertBefore(row, fb);
    const teachIt = (caught) => {
      const ch = chunkWord(v); wb.replaceWith(ch);
      row.replaceChildren(btn('big-btn', '🗣️ I read it to you · hear it', () => {
        row.replaceChildren();
        sayList(chunkItems(v, ch)).then(() => {
          pip.say(`${v.w}! Thank you, teacher! 🧑‍🏫`);
          setFb(fb, caught ? 'You caught the mistake and fixed it. That is what great readers do! 🔎' : praise('listen'), 'good');
          complete(card, { first: caught, type: 'teach' }, { delay: 2000 });
        });
      }));
    };
    row.append(btn('big-btn soft', '✅ Yes', () => { pip.say(`Hmm, let me look again... Oh! It is not “${oops}”! Silly me! 😅 Can you read it to me?`, 'oops'); teachIt(false); }),
      btn('big-btn', `🧑‍🏫 Not quite, ${G().name}!`, () => { pip.say('You caught my mistake! Please read it to me the right way.', 'oops'); teachIt(true); }));
  };
  BUILD.says = (card, sec) => {
    const v = card.spec.v; card.answer = v.w;
    const { vis, body } = frame(sec, { kicker: '👂 Which word says it?', title: 'Listen, then tap the word' });
    const pip = pipSay(vis, 'Listen! Which word did I say?');
    card.noAutoSay = true;
    card.onShow = () => { if (!card.done) sayList([{ text: 'Listen! Which word did I say?', word: false, pause: 200 }, { text: v.w, word: true }]); };
    vis.appendChild(el('div', 'pic-hero', '👂'));
    const tools = el('div', 'tool-row'); tools.append(hearBtn(v.w, '🔊 Hear it'), btn('hear-btn', '🐢 Slower', () => sayList([{ text: v.w, word: true, slow: true }])));
    body.appendChild(tools);
    const fb = feedback(body);
    const row = choices(body, [v.w].concat(v.look), v.w + 'says' + P.key, (first) => {
      setFb(fb, first ? praise('listen') : praise('retry'), 'good'); if (!first) markTry(v, false);
      complete(card, { first, type: 'says' });
    }, () => { pip.say(mishap() + ' Listen again!', 'oops'); setTimeout(() => sayList([{ text: v.w, word: true, slow: true }]), 900); }, 'words');
    body.insertBefore(row, fb);
  };

  /* ---- Type the word you hear (spelling is her strength; the sound-alike slips are just "what you heard") ---- */
  const SOUND_SWAPS = [['ow', 'aw', 'ow/aw', 'ow heard as aw'], ['aw', 'ow', 'ow/aw', 'aw heard as ow'], ['ou', 'aw', 'ow/aw', 'ou heard as aw'], ['ou', 'ow', 'ow/aw', 'ou written as ow'],
    ['th', 'd', 'th/d', 'th heard as d'], ['th', 'f', 'th/f', 'th heard as f'], ['th', 't', 'th/t', 'th heard as t'], ['e', 'i', 'e/i', 'short e heard as i'], ['i', 'e', 'e/i', 'short i heard as e'], ['r', 'w', 'r/w', 'r heard as w']];
  const MOUTH = { ow: ['😮➡️😗', 'Mouth opens, then lips make a circle (like "ouch!")'], ou: ['😮➡️😗', 'Mouth opens, then lips make a circle (like "ouch!")'], aw: ['😮', 'Mouth open wide and stays still (like "ahh")'],
    th: ['😛', 'Tongue peeks out between your teeth'], d: ['👅', 'Tongue taps behind your top teeth'], f: ['😬', 'Top teeth rest on your bottom lip'], t: ['👅', 'Tongue taps and lets out a puff'],
    e: ['😬', 'Mouth a little open, like "eh"'], i: ['🙂', 'Small smile, like "ih"'], r: ['🙂', 'Lips loose, tongue pulls back'], w: ['😗', 'Lips make a tight little circle'] };
  function soundAlike(target, typed) {
    for (const [a, b, pair, label] of SOUND_SWAPS) {
      let idx = target.indexOf(a);
      while (idx >= 0) { if (target.slice(0, idx) + b + target.slice(idx + a.length) === typed) return { a, b, pair, label, idx }; idx = target.indexOf(a, idx + 1); }
    }
    return null;
  }
  function diffMark(word, other) {
    let p = 0; while (p < word.length && p < other.length && word[p] === other[p]) p++;
    let q = 0; while (q < word.length - p && q < other.length - p && word[word.length - 1 - q] === other[other.length - 1 - q]) q++;
    const mid = word.slice(p, word.length - q);
    return mid ? word.slice(0, p) + '[' + mid + ']' + word.slice(word.length - q) : word;
  }
  BUILD.type = (card, sec) => {
    const list = (W_().typeWords || {})[P.lv] || [];
    const it = list[(S.sessionsDone * 3 + card.spec.n) % Math.max(1, list.length)] || { w: 'jump', pic: '🦘', sent: 'Frogs can jump.' };
    const shown = it.cap || it.w; card.answer = it.w;
    const blankSent = fillName(it.sent).replace(new RegExp('\\b' + shown + '\\b', 'i'), '___');
    const { vis, body } = frame(sec, { kicker: '⌨️ Type the word you hear', title: null });
    vis.appendChild(el('div', 'pic-hero', it.pic));
    const pip = pipSay(vis, `Type the word I say. “${blankSent}”`);
    card.noAutoSay = true;
    const hear = (slow) => sayList([{ text: 'Type the word', word: false, pause: 150 }, { text: it.w, word: true, slow, pause: 350 }, { text: fillName(it.sent), word: false, rate: slow ? 0.7 : undefined, pause: 300 }, { text: it.w, word: true, slow }]);
    const tools = el('div', 'tool-row');
    tools.append(btn('hear-btn', '🔁 Hear it again', () => hear(false)), btn('hear-btn', '🐢 Say it slower', () => hear(true)));
    const form = el('form', 'spell-form big');
    const inp = el('input', 'spell-in type-in'); inp.type = 'text'; inp.autocomplete = 'off'; inp.setAttribute('autocapitalize', 'none'); inp.setAttribute('autocorrect', 'off'); inp.spellcheck = false; inp.setAttribute('aria-label', 'Type the word you hear'); inp.placeholder = 'type it here';
    const go = btn('big-btn', 'Check ✓'); go.type = 'submit';
    form.append(inp, go);
    const help = el('div', 'type-help');
    const fb = feedback(body);
    body.insertBefore(tools, fb); body.insertBefore(form, fb); body.insertBefore(help, fb);
    card.onShow = () => { if (!card.done) { hear(false); setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (_) {} }, 300); } };
    let tries = 0, copy = false;
    const win = (first) => {
      form.remove(); help.replaceChildren(); tools.remove();
      const mini = el('div', 'mini-pc');
      mini.appendChild(el('p', 'mini-h', '✉️ Your mini-postcard'));
      const p = el('p', 'mini-s'); const parts = fillName(it.sent).split(new RegExp('(\\b' + shown + '\\b)', 'i'));
      parts.forEach((x) => { if (x.toLowerCase() === shown.toLowerCase()) p.appendChild(el('strong', 'mini-w', x)); else if (x) p.append(x); });
      mini.appendChild(p);
      body.insertBefore(mini, fb);
      setFb(fb, (first ? praise('listen') : praise('retry')) + ' Now read your postcard!', 'good');
      pip.say(first ? 'You spelled it! Now read the little postcard.' : 'You got it! Now read the little postcard.');
      const r = btn('big-btn', 'I read it ✓', () => {
        r.remove();
        body.insertBefore(btn('hear-btn', `🔊 Hear ${G().name} read it`, () => sayList([{ text: fillName(it.sent), word: false }])), fb);
        complete(card, { first, type: 'type', w: it.w }, { fish: 2, delay: 1600 });
      });
      body.insertBefore(r, fb);
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const typed = inp.value.trim().toLowerCase().replace(/\s+/g, ' ');
      if (!typed) return;
      if (typed === it.w.toLowerCase()) return win(tries === 0 && !copy);
      if (copy) { setFb(fb, 'Almost! Look at each letter and copy it. 👀', 'soft'); return; }
      tries++;
      const sa = soundAlike(it.w.toLowerCase(), typed);
      help.replaceChildren();
      if (sa) {
        S.soundLog = (S.soundLog || []).concat([{ pair: sa.pair, label: sa.label, w: it.w, typed, date: Date.now(), week: P.week.id }]); save();
        help.appendChild(el('p', 'c-text', 'You wrote what you heard! 👂'));
        const cmp = el('div', 'cmp-row');
        const mine = el('div', 'cmp-box'); mine.append(el('span', 'cmp-lbl', 'You heard'), wordEl(diffMark(typed, it.w.toLowerCase()), { big: true }));
        const real = el('div', 'cmp-box real'); real.append(el('span', 'cmp-lbl', 'The word'), wordEl(diffMark(it.w.toLowerCase(), typed), { big: true }));
        cmp.append(mine, real); help.appendChild(cmp);
        const m = MOUTH[sa.a];
        if (m) { const mc = el('p', 'mouth'); mc.append(el('span', 'mouth-ic', m[0]), el('span', null, `“${sa.a}” : ${m[1]}.`)); help.appendChild(mc); }
        pip.say(`You wrote what you heard! This word has “${sa.a}”. Type it again!`);
      } else {
        help.appendChild(el('p', 'c-text', 'So close! This part needs a fix:'));
        const d = el('div', 'cmp-box'); d.appendChild(wordEl(diffMark(typed, it.w.toLowerCase()), { big: true })); help.appendChild(d);
        pip.say(mishap() + ' Listen again, then type it!', 'oops');
        setTimeout(() => sayList([{ text: it.w, word: true, slow: true }]), 1200);
      }
      if (tries >= 2) {
        copy = true;
        help.replaceChildren(el('p', 'c-text', `Here it is! Copy it into the box. ✨`), (() => { const d = el('div', 'dec-word'); d.appendChild(wordEl(it.w, { big: true })); return d; })());
        pip.say('Here it is! Copy it, letter by letter.');
      }
      inp.value = ''; try { inp.focus({ preventScroll: true }); } catch (_) {}
    });
  };

  /* ---- Which sound? (optional contrast cards: ow/aw, th/d, short e/i) ---- */
  const SOUND_CARDS = {
    'ow/aw': { a: ['ow', '🐄', 'cow'], b: ['aw', '🐾', 'paw'], words: [['down', '⬇️', 'a'], ['saw', '🪚', 'b'], ['crown', '👑', 'a'], ['straw', '🥤', 'b'], ['how', '🤔', 'a'], ['yawn', '🥱', 'b']] },
    'th/d': { a: ['th', '👍', 'thumb'], b: ['d', '🐶', 'dog'], words: [['that', '👉', 'a'], ['dad', '👨', 'b'], ['this', '👇', 'a'], ['day', '☀️', 'b'], ['then', '➡️', 'a'], ['den', '🦊', 'b']] },
    'e/i': { a: ['e', '🛏️', 'bed'], b: ['i', '🐷', 'pig'], words: [['pen', '🖊️', 'a'], ['pin', '📌', 'b'], ['ten', '🔟', 'a'], ['tin', '🥫', 'b'], ['bell', '🔔', 'a'], ['bill', '💵', 'b']] }
  };
  function optionalGate(body, pip, title, onGo, card) {
    const row = el('div', 'dec-row');
    row.append(btn('big-btn', "Let's try! ⭐", () => { row.remove(); onGo(); }), btn('big-btn soft', 'Skip, no problem', () => { row.remove(); pip.say('No problem! Maybe next time. 😊'); complete(card, null, { fish: 0, delay: 700 }); }));
    body.appendChild(row);
  }
  BUILD.sound = (card, sec) => {
    const log = (S.soundLog || []).filter((x) => SOUND_CARDS[x.pair]);
    const counts = {}; log.forEach((x) => { counts[x.pair] = (counts[x.pair] || 0) + 1; });
    const keys = Object.keys(SOUND_CARDS);
    const pair = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || keys[S.sessionsDone % keys.length];
    const C = SOUND_CARDS[pair];
    const { vis, body } = frame(sec, { kicker: '⭐ Bonus (optional) · Which sound?', title: `“${C.a[0]}” or “${C.b[0]}”?` });
    const pip = pipSay(vis, `Want to play a listening game? “${C.a[0]}” like ${C.a[2]}, or “${C.b[0]}” like ${C.b[2]}. You can skip it!`);
    const pic = el('div', 'pic-hero', '👂'); vis.appendChild(pic);
    const fb = feedback(body);
    optionalGate(body, pip, '', () => {
      const words = shuffle(C.words, P.key + pair).slice(0, 3);
      let r = 0, firsts = 0;
      const round = () => {
        const [w, wp, ans] = words[r]; card.answer = (ans === 'a' ? C.a : C.b)[0];
        pic.textContent = wp;
        pip.say('Listen! Which sound is in this word?');
        setTimeout(() => sayList([{ text: w, word: true, slow: true }]), 1600);
        const mk = (s) => { const d = el('span', 'snd-opt'); d.append(el('span', 'snd-pic', s[1]), el('strong', null, s[0]), el('span', 'snd-mouth', (MOUTH[s[0]] || ['', ''])[0]), el('span', 'snd-key', 'like ' + s[2])); return d; };
        const right = ans === 'a' ? C.a : C.b, wrong = ans === 'a' ? C.b : C.a;
        const tools = hearBtn(w, '🔊 Hear it again');
        body.insertBefore(tools, fb);
        const row = choices(body, [mk(right), mk(wrong)], w + P.key, (first) => {
          if (first) firsts++;
          setFb(fb, `Yes! “${w}” has “${right[0]}”. ${praise('listen')}`, 'good');
          setTimeout(() => { row.remove(); tools.remove(); fb.className = 'fb'; r++; if (r < words.length) round(); else complete(card, { first: firsts === words.length, type: 'sound' }, { fish: 2, delay: 900 }); }, 1500);
        }, () => { pip.say(`${mishap()} Watch my mouth: ${(MOUTH[right[0]] || ['', ''])[1]}.`, 'oops'); }, 'snd two');
        body.insertBefore(row, fb);
      };
      round();
    }, card);
  };

  /* ---- R practice: listening only. Never grades her speech. ---- */
  function rWordList() {
    if (S.rWords && S.rWords.length) return S.rWords;
    return W_().rWords || [];
  }
  function autoOops(w) { return w.replace(/([bcdfgkpt])r/gi, '$1w').replace(/^r/i, 'w').replace(/\sr/gi, ' w').replace(/(er|ir|ur)\b/gi, 'uh').replace(/ar\b/gi, 'ah').replace(/or\b/gi, 'oh').replace(/r/gi, 'w'); }
  BUILD.rpair = (card, sec) => {
    const pairs = W_().rPairs || [];
    const picks = [0, 1, 2].map((i) => pairs[(S.sessionsDone * 3 + i) % pairs.length]).filter(Boolean);
    const { vis, body } = frame(sec, { kicker: '👂 R or W? · listening game', title: 'Which one did I say?' });
    const pip = pipSay(vis, 'Listen closely! Which one did I say?');
    card.noAutoSay = true;
    vis.appendChild(el('div', 'pic-hero', '👂'));
    const fb = feedback(body);
    let r = 0;
    const round = () => {
      const pr = picks[r]; const sayR = seeded(P.key + r)() < 0.5;
      const target = sayR ? pr.r : pr.w; card.answer = target;
      setTimeout(() => sayList([{ text: 'Listen closely! Which one did I say?', word: false, pause: 200 }, { text: target, word: true }]), r === 0 ? 400 : 200);
      const mk = (w, pic) => { const d = el('span', 'pic-word'); d.append(el('span', 'pic-opt', pic), wordEl(rMark(w))); return d; };
      const opts = sayR ? [mk(pr.r, pr.rp), mk(pr.w, pr.wp)] : [mk(pr.w, pr.wp), mk(pr.r, pr.rp)];
      const tools = hearBtn(target, '🔊 Hear it again'); body.insertBefore(tools, fb);
      const row = choices(body, opts, target + P.key, () => {
        setFb(fb, `Yes! I said “${target}”. ${praise('listen')}`, 'good');
        setTimeout(() => sayList([{ text: pr.r, word: true, pause: 300 }, { text: pr.w, word: true }]), 500);
        setTimeout(() => { row.remove(); tools.remove(); fb.className = 'fb'; r++; if (r < picks.length) round(); else complete(card, { first: true, type: 'rpair' }, { delay: 700 }); }, 2600);
      }, () => { pip.say('Hmm, let me say it again!', 'oops'); setTimeout(() => sayList([{ text: target, word: true, slow: true }]), 900); }, 'pics two');
      body.insertBefore(row, fb);
    };
    card.onShow = () => { if (!card._started) { card._started = true; round(); } };
  };
  BUILD.rcatch = (card, sec) => {
    const list = rWordList();
    const n = list.length || 1;
    const items = [0, 1].map((i) => list[(S.sessionsDone * 2 + i) % n]).filter(Boolean);
    const { vis, body } = frame(sec, { kicker: '🕵️ Catch the guide! · R words', title: `Did ${G().name} say it right?` });
    const pip = pipSay(vis, 'I love R words! Let me say one...');
    card.noAutoSay = true;
    const pic = el('div', 'pic-hero', '🕵️'); vis.appendChild(pic);
    const fb = feedback(body);
    let r = 0;
    const done = () => {
      pip.say('You are a great listener! Want to say some R words and save them? You can skip it.');
      const words = list.slice(0, 4).map((x) => x.w);
      const det = el('details', 'reply rsave'); det.appendChild(el('summary', null, '🎙️ Say it and save it (optional)'));
      const wl = el('div', 'r-list'); list.slice(0, 4).forEach((x) => { const d = el('span', 'pic-word'); d.append(el('span', 'pic-opt', x.pic || '🔴'), wordEl(rMark(x.w))); wl.appendChild(d); });
      det.append(wl, el('p', 'pa-small', 'Say these words any way you like. Saved only on this device for your grown-up.'), recorder({ week: P.week.id, day: P.day.day, dayName: P.day.name, level: P.lv, kind: 'rwords', title: 'R words: ' + words.join(', ') }, () => {}, () => {}));
      body.insertBefore(det, fb);
      complete(card, { first: true, type: 'rcatch' }, { stay: true });
    };
    const round = () => {
      const it = items[r]; const oops = it.oops || autoOops(it.w); card.answer = it.w;
      const other = list.find((x) => x.w !== it.w && x.pic !== it.pic) || { w: 'sun', pic: '☀️' };
      pic.textContent = '🗣️';
      pip.say(`Look! A “${oops}”!`, 'oops');
      sayList([{ text: 'Look! A', word: false }, { text: oops, word: true }]);
      const mk = (x) => { const d = el('span', 'pic-word'); d.append(el('span', 'pic-opt', x.pic || '🔴'), wordEl(rMark(x.w))); return d; };
      body.insertBefore(el('p', 'c-q r-q', `Which one did ${G().name} mean?`), fb);
      const fix = btn('big-btn soft', `Oops, say it right, ${G().name}! 🔁`, () => { fix.disabled = true; pip.say(`Oops! I meant “${it.w}”!`); sayList([{ text: 'Oops! I meant', word: false }, { text: it.w, word: true }]); });
      const row = choices(body, [mk(it), mk(other)], it.w + P.key, () => {
        pip.say(`Yes! I meant “${it.w}”! Thanks for catching me!`); sayList([{ text: 'Yes! I meant', word: false }, { text: it.w, word: true }]);
        setTimeout(() => { body.querySelectorAll('.r-q').forEach((q) => q.remove()); row.remove(); fix.remove(); r++; if (r < items.length) round(); else done(); }, 2400);
      }, () => { pip.say('Hmm, listen again!', 'oops'); }, 'pics two');
      body.insertBefore(row, fb); body.insertBefore(fix, fb);
    };
    card.onShow = () => { if (!card._started) { card._started = true; round(); } };
  };
  BUILD.challenge = (card, sec) => {
    const W = W_(); const plan = (W.vocabByDay || {})[P.day.day] || W.vocabByDay[P.alt ? 'koala' : 6] || {};
    const nextLv = LEVELS[Math.min(LEVELS.indexOf(P.lv) + 1, 2)];
    const pool = (plan[nextLv] || []).concat(P.lv === 'space' ? Object.keys(W.vocab || {}) : []).filter((w) => !(P.L.preview || []).find((v) => v.w === w));
    const w = pool.sort((a, b) => b.length - a.length)[0];
    const v = vocabOf(w) || { w: 'opportunity', split: 'op|por|tu|ni|ty', pic: '🚪✨', means: 'a good chance' };
    const { vis, body } = frame(sec, { kicker: '⭐ Challenge word (optional)', title: 'Want to try a big word?' });
    const pip = pipSay(vis, `Here is a big challenge word! Want to try it for bonus ${pet().foodName}? Skipping is totally fine.`);
    vis.appendChild(el('div', 'pic-hero', v.pic)); vis.appendChild(el('p', 'pic-cap', v.means));
    const fb = feedback(body);
    optionalGate(body, pip, '', () => {
      const ch = chunkWord(v); body.insertBefore(ch, fb);
      pip.say('Read it chunk by chunk, out loud. Then check!');
      const row = el('div', 'dec-row'); body.insertBefore(row, fb);
      row.append(btn('big-btn', '🗣️ I read it · check 🔊', () => {
        row.replaceChildren();
        sayList(chunkItems(v, ch)).then(() => { setFb(fb, praise('brave'), 'good'); complete(card, { first: true, type: 'challenge', w: v.w }, { fish: 3, delay: 1600 }); });
      }), wordRec(v));
    }, card);
  };
  let THEN_NOW = null;
  async function refreshThenNow() {
    THEN_NOW = null;
    let recs = []; try { recs = await recAll(); } catch (_) { return; }
    const day = (r) => new Date(r.date).toDateString();
    const byWord = {};
    recs.filter((r) => r.kind === 'word' && r.word).forEach((r) => { (byWord[r.word] = byWord[r.word] || []).push(r); });
    for (const [w, l] of Object.entries(byWord)) { l.sort((a, b) => a.date - b.date); if (day(l[0]) !== day(l[l.length - 1])) { THEN_NOW = { label: `the word “${w}”`, first: l[0], last: l[l.length - 1] }; return; } }
    const bc = recs.filter((r) => r.kind === 'first' || r.kind === 'best').sort((a, b) => a.date - b.date);
    if (bc.length > 1 && day(bc[0]) !== day(bc[bc.length - 1])) THEN_NOW = { label: 'your postcard broadcast', first: bc[0], last: bc[bc.length - 1] };
  }
  BUILD.thennow = (card, sec) => {
    const T = THEN_NOW;
    const { vis, body } = frame(sec, { kicker: '🌱 Then vs Now', title: 'Listen to you grow!' });
    pipSay(vis, 'Listen to how you read before, and how you read now! 🌱');
    vis.appendChild(el('div', 'pic-hero', '🌱'));
    if (!T) { body.appendChild(el('p', 'c-text', 'Keep recording, and soon you can hear yourself grow!')); complete(card, null, { fish: 0, stay: true }); return; }
    body.appendChild(el('p', 'c-sub', T.label));
    const row = el('div', 'takes');
    [['Then', T.first], ['Now', T.last]].forEach(([lbl, r]) => { const c = el('div', 'take'); c.append(el('p', 'take-h', `${lbl} · ${fmtDate(r.date)}`), audioFor(r)); row.appendChild(c); });
    body.appendChild(row);
    body.appendChild(btn('big-btn', 'Wow! ✓', () => complete(card, null, { fish: 0, delay: 300 })));
  };
  BUILD.italia = (card, sec) => {
    const I = W_().italia;
    sec.classList.add('italia');
    const { vis, body } = frame(sec, { kicker: '🇮🇹 Bonus Postcard from Italia!', title: `${I.place}` });
    vis.appendChild(el('div', 'pic-hero', I.scene));
    const pip = pipSay(vis, `Ciao! I am at the beach near Naples. Can you teach me 3 Italian words?`);
    body.appendChild(el('p', 'it-flag', '🇮🇹 ' + I.region));
    const pc = el('div', 'pc-full it-pc'); I.postcard.forEach((t) => pc.appendChild(el('p', null, t))); body.appendChild(pc);
    const fb = feedback(body);
    const skip = btn('link-btn', 'Skip, no problem', () => { goHome(); });
    body.appendChild(skip);
    const go = btn('big-btn', 'Teach me! 🇮🇹', () => {
      go.remove(); pc.remove();
      let r = 0;
      const round = () => {
        const wd = I.words[r]; card.answer = wd.pic;
        const big = el('div', 'it-word'); big.append(el('span', null, wd.it), hearBtn(wd.it, '🔊'));
        big.querySelector('.hear-btn').onclick = (e) => { e.stopPropagation(); sayList([{ text: wd.it, word: true, lang: 'it' }]); };
        body.insertBefore(big, fb);
        pip.say(`What does “${wd.it}” mean? Tap the picture!`);
        setTimeout(() => sayList([{ text: wd.it, word: true, lang: 'it' }]), 1400);
        const row = choices(body, [el('span', 'pic-opt', wd.pic)].concat(wd.others.map((o) => el('span', 'pic-opt', o))), wd.it + P.key, () => {
          pip.say(`Grazie! Now I know “${wd.it}”! 🇮🇹`);
          setTimeout(() => { big.remove(); row.remove(); fb.className = 'fb'; r++; if (r < I.words.length) round(); else { skip.remove(); S.italiaDone = Object.assign({}, S.italiaDone, { [P.week.id]: Date.now() }); save(); setFb(fb, 'Bravissima! You taught me 3 words! 🇮🇹', 'good'); complete(card, null, { fish: 3, delay: 1500 }); } }, 1600);
        }, () => { pip.say(mishap(), 'oops'); }, 'pics');
        body.insertBefore(row, fb);
      };
      round();
    });
    body.insertBefore(go, skip);
  };

  /* ---------------- end of session + level rules ----------------
     Level up: 3 "good" sessions at a level. Good = Pip's question (evidence) right on the first try
     AND at least 6 of the 7 word cards right on the first try (one slip allowed, like 7/8).
     Drop back (quietly) after 2 "rough" sessions in a row. Rough = 4 or fewer of 7 word cards first try,
     OR the evidence question missed AND 5 or fewer word cards. A parent can override / lock the level. */
  function scoreSession(res) {
    const vals = Object.values(res).filter((r) => r && r.type);
    const words = vals.filter((r) => WORD_TYPES.includes(r.type));
    const wordFirst = words.filter((r) => r.first).length;
    const q = vals.find((r) => r.type === 'question');
    const adv = vals.find((r) => r.type === 'advisor');
    const checks = vals.filter((r) => r.type === 'check');
    const byType = {};
    vals.forEach((r) => { byType[r.type] = byType[r.type] || [0, 0]; byType[r.type][1]++; if (r.first) byType[r.type][0]++; });
    return { wordFirst, wordTotal: words.length, evidence: !!(q && q.first), advisor: !!(adv && adv.first), checksFirst: checks.filter((c) => c.first).length, checksTotal: checks.length, byType };
  }
  function applyLevelRules(sc, lv) {
    const need = Math.max(1, sc.wordTotal - 1);
    const good = sc.evidence && sc.wordFirst >= need;
    const rough = sc.wordFirst <= sc.wordTotal - 3 || (!sc.evidence && sc.wordFirst <= sc.wordTotal - 2);
    let change = null;
    if (lv !== S.level) return { good, rough, change };
    if (good) { S.good++; S.roughStreak = 0; } else if (rough) { S.roughStreak++; } else { S.roughStreak = 0; }
    if (!S.levelLock) {
      const i = LEVELS.indexOf(S.level);
      if (S.good >= 3 && i < LEVELS.length - 1) { change = { from: S.level, to: LEVELS[i + 1], why: '3 strong sessions' }; }
      else if (S.roughStreak >= 2 && i > 0) { change = { from: S.level, to: LEVELS[i - 1], why: '2 tricky sessions in a row' }; }
      if (change) { S.level = change.to; S.good = 0; S.roughStreak = 0; S.levelLog.push(Object.assign({ date: Date.now() }, change)); }
    }
    return { good, rough, change };
  }
  function finishSession() {
    const sc = scoreSession(P.res);
    if (P.mode) {  // Boss postcard / Italian bonus: bonus only, never changes the level
      if (P.mode === 'boss') { S.chick.fish += 5; S.bossDone = Object.assign({}, S.bossDone, { [P.key]: Date.now() }); }
      S.sessions.push({ id: 's' + Date.now(), week: P.week.id, day: P.mode, dayName: P.mode === 'boss' ? `Boss postcard (${P.day.name})` : 'Bonus Postcard from Italia', level: P.lv, date: Date.now(), mins: Math.round((Date.now() - P.started) / 60000), fish: P.fish, bonus: P.mode,
        wordFirst: sc.wordFirst, wordTotal: sc.wordTotal, evidence: sc.evidence, advisor: sc.advisor, checksFirst: sc.checksFirst, checksTotal: sc.checksTotal, byType: sc.byType });
      S.progress = null; save(); refreshThenNow();
      return showEnd(sc, { change: null }, P.mode === 'boss' ? '👑 Boss postcard done! +5 bonus!' : '🇮🇹 Bravissima! Bonus done!');
    }
    const rule = applyLevelRules(sc, P.lv);
    S.sessionsDone++;
    (P.res.missed || []).forEach((m) => { if (!S.review.find((r) => r.w === m.w)) S.review.push({ w: m.w, split: m.split, due: S.sessionsDone + 2, from: `${P.day.name} (${LEVEL_INFO[P.lv].name})` }); });
    S.sessions.push({ id: 's' + Date.now(), week: P.week.id, day: P.day.day, dayName: P.day.name, level: P.lv, date: Date.now(), mins: Math.round((Date.now() - P.started) / 60000), fish: P.fish,
      wordFirst: sc.wordFirst, wordTotal: sc.wordTotal, evidence: sc.evidence, advisor: sc.advisor, checksFirst: sc.checksFirst, checksTotal: sc.checksTotal, byType: sc.byType,
      alt: !!P.alt, missed: (P.res.missed || []).map((m) => m.w), route: P.res.route || '', good: rule.good, rough: rule.rough });
    S.progress = null;
    save();
    refreshThenNow();
    showEnd(sc, rule);
  }
  function showEnd(sc, rule, extra) {
    const box = $('endBox'); box.replaceChildren();
    box.appendChild(chickEl(S.chick.fish, 'big'));
    box.appendChild(el('h2', 'end-h', `Mission complete! 🎉`));
    box.appendChild(el('p', 'c-text', `${chickName()} ate ${P.fish} ${pet().foodName}. Pip is safe and ready for the next stop!`));
    if (extra) box.appendChild(el('p', 'end-up', extra));
    const tried = Object.values(P.res).filter((r) => r && r.type).length;
    if (tried) box.appendChild(el('p', 'c-sub', `You worked through ${tried} challenges today. Every one makes your reading stronger! 💪`));
    if (rule.change && LEVELS.indexOf(rule.change.to) > LEVELS.indexOf(rule.change.from)) box.appendChild(el('p', 'end-up', `🚀 Pip can fly higher now! Next time: ${levelLabel(rule.change.to)}`));
    const bye = el('div', 'end-guide'); const bim = el('img', 'end-guide-img'); bim.src = poseSrc((POSE.screens || {}).end || 'sleep'); bim.alt = `${G().name} the ${G().species}`;
    bye.append(girlEl(P && P.mode === 'boss' ? 'bossWin' : 'end', 'girl-end'), bim, el('span', 'bubble end-bubble', 'See you tomorrow! 💤')); box.appendChild(bye);
    box.appendChild(btn('big-btn', `Back to ${chickName()} ${pet().icon}`, () => goHome()));
    showScreen('screenEnd');
    sound('grow');
  }

  /* ---------------- home + habitat ---------------- */
  function habitat(parent) {
    const h = el('div', 'habitat');
    itemsOf(pet()).forEach((it) => {
      if (S.chick.fish < it.at) return;
      const im = it.img ? el('img', 'hab-item') : el('span', 'hab-item hab-emoji', it.emoji);
      if (it.img) { im.src = it.img; im.alt = it.name; } else { im.setAttribute('role', 'img'); im.setAttribute('aria-label', it.name); im.style.setProperty('--w', it.pos[2]); }
      im.style.left = it.pos[0] + '%'; im.style.bottom = it.pos[1] + '%'; im.style.width = it.pos[2] + '%';
      h.appendChild(im);
    });
    (S.family || []).slice(-3).forEach((f, i) => { const c = chickEl(STAGE_AT[4], 'friend', f.kind); c.style.left = (14 + i * 12) + '%'; c.title = f.name; h.appendChild(c); });
    h.appendChild(chickEl(S.chick.fish, 'at-home'));
    parent.appendChild(h);
    return h;
  }
  function dayStatus(week) {
    const st = {};
    S.sessions.filter((s) => s.week === week.id).forEach((s) => { st[s.day] = s; });
    return st;
  }
  function renderHome() {
    const week = currentWeek();
    const box = $('homeBox'); box.replaceChildren();
    const top = el('div', 'home-top');
    habitat(top);
    const pp = pet();
    top.classList.add('hab-bg', 'pet-' + (S.chick.kind || 'penguin'));
    const st = stagesOf(pp)[stageFor(S.chick.fish)];
    const next = itemsOf(pp).find((it) => it.at > S.chick.fish);
    const info = el('p', 'home-chick', `${chickName()} · ${st.name} · ${pp.food} ${S.chick.fish}` + (next ? `  ·  next: ${next.name} at ${next.at}` : ''));
    top.appendChild(info);
    box.appendChild(top);
    const bot = el('div', 'home-bottom');
    const hh = el('div', 'home-head'); hh.appendChild(girlEl('home', 'girl-home'));
    const htx = el('div', 'home-htx');
    htx.appendChild(el('h1', 'home-h', `${G().name}'s Postcards`));
    htx.appendChild(el('p', 'home-sub', (kidName() ? `Hi, ${kidName()}! ` : '') + `${week.title}`));
    hh.appendChild(htx); bot.appendChild(hh);
    const days = el('div', 'days' + (week.days.length > 5 ? ' six' : ''));
    const ds = dayStatus(week);
    const firstOpen = week.days.find((d) => !ds[d.day]);
    week.days.forEach((d0, di) => {
      const d = shownDay(d0);
      const s = ds[d.day];
      const b = btn('day' + (s ? ' done' : '') + (firstOpen === d ? ' next' : ''), null, () => begin(di));
      b.append(el('span', 'day-n', d.short || d.name.slice(0, 3)), el('span', 'day-i', s ? '✅' : d.flag));
      b.setAttribute('aria-label', `${d.name}: ${d.place}${s ? ', done' : ''}`);
      days.appendChild(b);
    });
    bot.appendChild(days);
    const resume = S.progress && S.progress.week === week.id;
    const target = resume ? week.days.findIndex((d) => d.day === S.progress.day) : week.days.indexOf(firstOpen || week.days[0]);
    const label = resume ? `Keep going: ${week.days[target].name} ▶` : (firstOpen ? `Start ${firstOpen.name} ▶` : 'Play again ▶');
    bot.appendChild(btn('big-btn', label, () => begin(target, resume)));
    // Optional extras: never required, skipping costs nothing.
    const extras = el('div', 'extras');
    const lastDone = [...week.days].reverse().find((d) => ds[d.day]);
    if (lastDone && S.level !== 'space' && !resume) {
      const di = week.days.indexOf(lastDone);
      const bkey = sessionKey(week, shownDay(lastDone), LEVELS[LEVELS.indexOf(S.level) + 1]) + '-boss';
      if (!(S.bossDone || {})[bkey]) extras.appendChild(btn('extra-btn', `👑 Boss postcard (optional): ${shownDay(lastDone).place}`, () => startSession(di, false, 'boss')));
    }
    const fri = week.days.find((d) => d.day === 5);
    if (week.italia && S.italiaOn !== false && fri && ds[5] && !resume) extras.appendChild(btn('extra-btn italia-btn', (S.italiaDone || {})[week.id] ? '🇮🇹 Bonus Postcard from Italia! (again)' : '🇮🇹 Bonus Postcard from Italia!', () => startSession(week.days.indexOf(fri), false, 'italia')));
    if (extras.children.length) bot.appendChild(extras);
    if (S.chick.fish >= ITEM_AT[ITEM_AT.length - 1]) {
      bot.appendChild(el('p', 'home-soft', `🎉 ${chickName()} is all grown up and will live safely in your zoo forever!`));
      bot.appendChild(btn('big-btn soft', '🪺 A new nest appeared! Pick your next baby', () => { S.choosing = true; save(); renderName(); showScreen('screenName'); }));
    }
    bot.appendChild(zooEl());
    bot.appendChild(el('p', 'home-soft', firstOpen ? `${shownDay(firstOpen).flag} Today Pip is in: ${shownDay(firstOpen).place}` : 'You finished this week! 🎉 Replay any day.'));
    box.appendChild(bot);
  }
  /* Her little zoo: the girl, every grown-up baby (and the one she is raising), and the stickers she has earned
     (one per finished postcard day). The sign uses her name if a grown-up or she typed one. */
  function zooEl() {
    const z = el('section', 'zoo');
    const head = el('div', 'zoo-head');
    head.appendChild(girlEl((S.family || []).length ? 'zooTop' : 'img/girl/' + GIRL.zoo[pet().id] + '.webp', 'girl-zoo'));
    const sign = el('div', 'zoo-sign');
    sign.appendChild(el('h2', 'zoo-h', kidName() ? `${kidName()}'s Little Zoo` : 'My Little Zoo'));
    const n = (S.family || []).length;
    sign.appendChild(el('p', 'zoo-sub', n ? `${n} grown-up friend${n > 1 ? 's' : ''} live here safe and sound 💛` : `When ${chickName()} is all grown up, ${S.chick.name ? 'they' : 'your baby'} will live here forever 💛`));
    head.appendChild(sign); z.appendChild(head);
    const pals = el('div', 'zoo-pals');
    (S.family || []).forEach((f) => { const pp = PETS[f.kind] || PETS.penguin; const c = el('span', 'zoo-pal'); const im = el('img'); im.src = babyImg(pp.id, 'adult'); im.alt = ''; c.append(im, el('span', 'zoo-name', f.name)); c.setAttribute('aria-label', `${f.name} the ${oneName(pp)}`); pals.appendChild(c); });
    if (S.chick.kind) { const pp = pet(); const st = stagesOf(pp)[stageFor(S.chick.fish)]; const c = el('span', 'zoo-pal now'); const im = el('img'); im.src = st.img; im.alt = ''; c.append(im, el('span', 'zoo-name', `${chickName()} (${st.name.toLowerCase()})`)); pals.appendChild(c); }
    z.appendChild(pals);
    const got = Math.min(STICKERS.length, (S.sessions || []).length);
    const shelf = el('div', 'stickers'); shelf.setAttribute('aria-label', `${got} stickers`);
    STICKERS.forEach((nm, i) => { if (i < got) { const im = el('img', 'sticker'); im.src = `img/stickers/${nm}.webp`; im.alt = ''; shelf.appendChild(im); } });
    if (got < STICKERS.length) shelf.appendChild(el('span', 'sticker next', got ? '＋' : '⭐'));
    z.appendChild(el('p', 'zoo-sub small', got ? `Stickers: ${got}. Finish a postcard day to earn the next one!` : 'Finish a postcard day to earn your first sticker!'));
    z.appendChild(shelf);
    if (n) z.appendChild(girlEl('zooEnd', 'girl-zoo-end'));
    return z;
  }
  function begin(di, resume) {
    const week = currentWeek();
    const isResume = resume || (S.progress && S.progress.week === week.id && S.progress.day === week.days[di].day);
    startSession(di, isResume);
  }
  function goHome() {
    clearTimeout(advanceTimer);
    try { speechSynthesis.cancel(); } catch (_) {}
    document.querySelectorAll('.rec').forEach((r) => r.stop && r.stop());
    renderHome(); showScreen('screenHome');
  }
  function showScreen(id) {
    ['screenHome', 'screenPlay', 'screenEnd', 'screenParent', 'screenName'].forEach((s) => { const e = $(s); const on = s === id; e.hidden = !on; e.classList.toggle('active', on); });
    $('dots').hidden = id !== 'screenPlay'; $('fishCount').hidden = id !== 'screenPlay';
    $('btnHome').hidden = id === 'screenHome' || id === 'screenName';
    if (id !== 'screenPlay') $('topTitle').textContent = id === 'screenParent' ? 'Grown-ups' : (S.guide ? `${G().name}'s Postcards` : 'Postcards');
    document.title = S.guide ? `${G().name}'s Postcards` : "Pip's Postcards";
  }

  /* ---------------- first launch: pick a baby from 4 nests, then name it ---------------- */
  /* Very first screen: "What's your name?" (first name only, optional, stays on this device). */
  function renderKid(box) {
    box.classList.add('kid-step');
    const hd = el('div', 'kid-head'); hd.appendChild(girlEl('hello', 'girl-hello', true)); box.appendChild(hd);
    box.appendChild(el('h1', 'home-h', `Hi! What's your name?`));
    box.appendChild(el('p', 'c-text', 'Type your first name. Your zoo will have your name on it!'));
    const f = el('form', 'name-form kid-name');
    const inp = el('input', 'spell-in name-big'); inp.maxLength = 16; inp.placeholder = 'Your first name'; inp.setAttribute('aria-label', 'Your first name'); inp.autocomplete = 'off'; inp.setAttribute('autocapitalize', 'words'); inp.spellcheck = false;
    const go = btn('big-btn', "That's me! ✨"); go.type = 'submit';
    f.append(inp, go);
    const finish = (v) => { S.kid = v; S.kidAsked = true; save(); box.classList.remove('kid-step'); box.replaceChildren(); renderName(); };
    f.addEventListener('submit', (e) => { e.preventDefault(); const v = inp.value.trim().replace(/\s+/g, ' ').slice(0, 16); if (!v) { inp.focus(); return; } finish(v.charAt(0).toUpperCase() + v.slice(1)); });
    box.appendChild(f);
    box.appendChild(btn('link-btn', 'Skip for now', () => finish('')));
    setTimeout(() => { try { inp.focus(); } catch (_) {} }, 100);
    sayList([{ text: "Hi! What's your name? Type your first name.", word: false }]);
    showScreen('screenName');
  }
  /* First screen: she picks her guide (6 big picture cards, each said out loud) and types its name. */
  function renderGuide(box) {
    box.classList.add('choosing');
    const st = renderGuide.st = renderGuide.st || { kind: '' };
    if (!st.kind) {
      box.appendChild(el('h1', 'home-h', 'Pick your mail carrier friend!'));
      box.appendChild(el('p', 'c-text', 'She will bring you postcards from all over the world. Tap one!'));
      const grid = el('div', 'nests guides');
      GUIDES.order.forEach((k) => {
        const g = GUIDES.kinds[k];
        const b = btn('nest-btn guide-btn', null, () => {
          if (grid.classList.contains('picked')) return;
          grid.classList.add('picked'); b.classList.add('chosen'); sound('ok');
          sayList([{ text: g.label, word: false }]);
          st.kind = k; setTimeout(() => { box.replaceChildren(); renderGuide(box); }, 800);
        });
        const im = el('img', 'guide-img'); im.src = g.img; im.alt = '';
        b.append(el('span', 'nest-art'), el('span', 'nest-lbl', g.label), el('span', 'nest-sub', g.travel));
        b.firstChild.appendChild(im);
        b.addEventListener('pointerenter', () => {});
        b.setAttribute('aria-label', g.label);
        grid.appendChild(b);
      });
      box.appendChild(grid);
      setTimeout(() => sayList([{ text: 'Pick your mail carrier friend! Pigeon, puffin, penguin explorer, sea otter, fox mail carrier, or sea turtle.', word: false }]), 400);
      return;
    }
    const g = GUIDES.kinds[st.kind];
    if (!st.name) {
      const im = el('img', 'guide-hero'); im.src = g.img; im.alt = g.label; box.appendChild(im);
      box.appendChild(el('h1', 'home-h', `What is her name?`));
      box.appendChild(el('p', 'c-text', `Your ${g.label.toLowerCase()} is a girl. Type any name you like!`));
      const f = el('form', 'name-form guide-name');
      const inp = el('input', 'spell-in name-big'); inp.maxLength = 16; inp.placeholder = 'Type her name'; inp.setAttribute('aria-label', 'Type her name'); inp.autocomplete = 'off'; inp.setAttribute('autocapitalize', 'words'); inp.spellcheck = false;
      const go = btn('big-btn', 'That is her name! ✨'); go.type = 'submit';
      const sug = el('div', 'sugs small');
      sug.appendChild(el('span', 'sug-h', 'Ideas:'));
      GUIDES.names.forEach((n) => sug.appendChild(btn('sug', n, () => { inp.value = n; sayList([{ text: n, word: true }]); inp.focus(); })));
      f.append(inp, go, sug);
      f.addEventListener('submit', (e) => { e.preventDefault(); const v = inp.value.trim().replace(/\s+/g, ' ').slice(0, 16); if (!v) { inp.focus(); return; } st.name = v.charAt(0).toUpperCase() + v.slice(1); box.replaceChildren(); renderGuide(box); });
      box.appendChild(f);
      box.appendChild(btn('link-btn', '← Pick a different friend', () => { st.kind = ''; box.replaceChildren(); renderGuide(box); }));
      setTimeout(() => { try { inp.focus(); } catch (_) {} }, 100);
      sayList([{ text: 'What is her name? Type any name you like!', word: false }]);
      return;
    }
    // Intro: "Hi, I'm <name>!"
    S.guide = { kind: st.kind, name: st.name }; save(); warmPoses();
    const vis = el('div', 'guide-intro');
    const im = el('img', 'guide-hero'); im.src = poseSrc((POSE.screens || {}).intro || 'hello', st.kind, true); im.alt = g.label;
    const line = `Hi, I'm ${st.name}! I'm a ${g.species}, and I ${g.travel}. Let's find a baby animal for you to take care of!`;
    const bub = el('div', 'bubble intro-bubble'); const cap = el('span', 'cap', line); const rp = btn('replay', '🔁', () => sayList([{ text: line, word: false }]));
    bub.append(cap, rp); vis.append(bub, im); box.appendChild(vis);
    sayList([{ text: line, word: false }]);
    box.appendChild(btn('big-btn', `Hi, ${st.name}! 👋`, () => { renderGuide.st = null; stopVoice(); renderName(); }));
    showScreen('screenName');
  }
  function renderName() {
    const box = $('nameBox'); box.replaceChildren();
    box.classList.remove('choosing');
    if (!S.kidAsked) return renderKid(box);
    if (!S.guide) return renderGuide(box);
    const choosing = !S.chick.kind || S.choosing;
    box.classList.toggle('choosing', choosing);
    if (choosing) return renderChooser(box);
    const pp = pet();
    const h1 = el('h1', 'home-h', `Your baby is here!`);
    const intro = el('p', 'c-text', `Your ${oneName(pp)} ${bornWord(pp)}! ${pp.found} Will you take care of it? Give it a name!`);
    const f = el('form', 'name-form');
    const after = [h1, intro, f];
    after.forEach((x) => { x.hidden = true; });
    const rv = revealEl(pp, () => {
      after.forEach((x) => { x.hidden = false; });
      sayList([{ text: `Your baby is here! Your ${oneName(pp)} ${bornWord(pp)}!`, word: false }]);
      setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (_) {} }, 150);
    });
    box.append(rv, h1, intro);
    const inp = el('input', 'spell-in'); inp.maxLength = 16; inp.placeholder = 'Name'; inp.setAttribute('aria-label', 'Baby animal name'); inp.autocomplete = 'off';
    const sug = el('div', 'sugs');
    pp.sugs.forEach((n) => sug.appendChild(btn('sug', n, () => { inp.value = n; })));
    const go = btn('big-btn', `That is the name! ${pp.icon}`); go.type = 'submit';
    f.append(inp, sug, go);
    f.addEventListener('submit', (e) => { e.preventDefault(); const v = inp.value.trim().slice(0, 16); if (!v) { inp.focus(); return; } S.chick.name = v; save(); goHome(); });
    box.appendChild(f);
    const back = btn('link-btn', '← Pick a different baby', () => { S.chick.kind = ''; save(); renderName(); }); back.hidden = true; after.push(back); box.appendChild(back);
  }
  /* The hatch / birth reveal: her drawings of the hidden stages play in order (egg, crack, peek, almost out;
     or snuggled up, waking up), then the "Hatched!" / "Born!" card pops in with the girl meeting the baby. Tap = skip. */
  function revealEl(pp, onDone) {
    const born = pp.how === 'born';
    const wrap = el('div', 'reveal ' + (born ? 'born' : 'egg'));
    const hid = el('div', 'reveal-hidden');
    const pic = el('img', 'reveal-img'); pic.src = babyImg(pp.id, pp.pre[0]); pic.alt = ''; hid.appendChild(pic);
    const cap = el('p', 'reveal-cap', born ? 'Shh... someone small is waking up! 💤' : 'Something is wiggling... 🥚');
    wrap.append(hid, cap);
    let done = false; const timers = [];
    const open = () => {
      if (done) return; done = true; timers.forEach(clearTimeout);
      hid.classList.add('out'); cap.classList.add('out'); sound('grow');
      setTimeout(() => {
        hid.remove(); cap.remove();
        const card = el('div', 'scene-card');
        const im = el('img', 'scene-img'); im.src = revealOf(pp); im.alt = `Your ${oneName(pp)}`; card.appendChild(im);
        card.appendChild(el('span', 'reveal-badge', born ? 'Born! 💛' : 'Hatched! 🐣'));
        ['✨', '💛', '✨'].forEach((t, i) => { const sp = el('span', 'reveal-spark s' + i, t); card.appendChild(sp); });
        wrap.appendChild(card);
        wrap.appendChild(girlEl('img/girl/' + GIRL.found[pp.id] + '.webp', 'girl-found'));
        wrap.classList.add('open');
        onDone && onDone();
      }, 420);
    };
    pp.pre.slice(1).forEach((st, i) => timers.push(setTimeout(() => { pic.src = babyImg(pp.id, st); cap.textContent = PRE_NAMES[st] + (born ? ' 💤' : ' 🥚'); pic.classList.remove('bump'); void pic.offsetWidth; pic.classList.add('bump'); sound('ok'); }, 900 * (i + 1))));
    timers.push(setTimeout(open, 900 * pp.pre.length + 300));
    pp.pre.forEach((st) => { const i = new Image(); i.src = babyImg(pp.id, st); });
    const pre2 = new Image(); pre2.src = revealOf(pp);
    wrap.addEventListener('click', open);
    return wrap;
  }
  /* Which babies she can pick right now. Always several choices (repeats allowed once she has raised them all). */
  function nestOptions() {
    const zoo = (S.family || []).concat(S.choosing && S.chick.kind ? [{ kind: S.chick.kind }] : []);
    if (!zoo.length) return { open: BASE_KINDS.slice(), soon: [] };
    const raised = new Set(zoo.map((f) => f.kind));
    let base = BASE_KINDS.filter((k) => !raised.has(k));
    if (base.length < 3) base = base.concat(BASE_KINDS.filter((k) => !base.includes(k))).slice(0, 3); // repeats are fine: a second penguin!
    return { open: base, soon: [] };
  }
  function renderChooser(box) {
    const again = (S.family || []).length > 0 || !!S.choosing;
    const { open, soon } = nestOptions();
    const hd = el('div', 'pick-head'); hd.appendChild(girlEl(again ? 'img/girl/otter_point.webp' : 'img/girl/zoo_explorer_map.webp', 'girl-pick'));
    const ht = el('div', 'pick-txt');
    ht.appendChild(el('h1', 'home-h', again ? 'A new nest! Pick your next baby' : `Pip found ${open.length} baby animals!`));
    ht.appendChild(el('p', 'c-text', (kidName() ? kidName() + ', which' : 'Which') + ' baby animal will you take care of? Tap one!'));
    hd.appendChild(ht); box.appendChild(hd);
    const grid = el('div', 'nests');
    const card = (k, locked) => {
      const pp = PETS[k];
      const b = btn('nest-btn' + (locked ? ' locked' : ''), null, () => {
        if (locked) { toast('This one opens when your first baby is all grown up 🌟'); return; }
        if (grid.classList.contains('picked')) return;
        grid.classList.add('picked'); b.classList.add('chosen'); sound('grow');
        if (S.choosing && S.chick.kind && S.chick.name) S.family = (S.family || []).concat([{ name: S.chick.name, kind: S.chick.kind, fish: S.chick.fish, date: Date.now() }]);
        S.choosing = false;
        S.chick = { name: '', kind: k, fish: 0 }; save();
        setTimeout(() => renderName(), 900);
      });
      const art = el('span', 'nest-art');
      const sc = el('img', 'nest-scene' + (pp.scene ? '' : ' cut')); sc.src = sceneOf(pp) || (pp.reveal ? revealOf(pp) : babyImg(k, 'newborn')); sc.alt = ''; art.appendChild(sc);
      b.dataset.kind = k;
      b.append(art, el('span', 'nest-lbl', pp.kind), el('span', 'nest-sub', locked ? '🔒 Coming later' : pp.nest));
      b.setAttribute('aria-label', pp.kind + (locked ? ', coming later' : ''));
      grid.appendChild(b);
    };
    open.forEach((k) => card(k, false));
    soon.forEach((k) => card(k, true));
    box.appendChild(grid);
    if (S.choosing) box.appendChild(btn('link-btn', 'Not now, go back', () => { S.choosing = false; save(); goHome(); }));
  }

  /* ---------------- grown-up gate: hold 3 seconds, then a multiplication ---------------- */
  function setupGate() {
    const b = $('btnGrown');
    let t = null;
    const startHold = (e) => { e.preventDefault(); b.classList.add('holding'); t = setTimeout(() => { b.classList.remove('holding'); askMath(); }, 3000); };
    const endHold = () => { clearTimeout(t); b.classList.remove('holding'); };
    b.addEventListener('pointerdown', startHold);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => b.addEventListener(ev, endHold));
    b.addEventListener('click', (e) => { e.preventDefault(); toast('Grown-ups: press and hold for 3 seconds'); });
    b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); askMath(); } });
  }
  function askMath() {
    const a = 6 + Math.floor(Math.random() * 4), c = 3 + Math.floor(Math.random() * 7);
    const dlg = $('gate');
    $('gateQ').textContent = `${a} × ${c} = ?`;
    const inp = $('gateIn'); inp.value = '';
    dlg.hidden = false; setTimeout(() => inp.focus(), 50);
    $('gateForm').onsubmit = (e) => { e.preventDefault(); if (parseInt(inp.value, 10) === a * c) { dlg.hidden = true; openParent(); } else { inp.value = ''; $('gateQ').textContent = `Not quite. ${a} × ${c} = ?`; } };
    $('gateCancel').onclick = () => { dlg.hidden = true; };
  }

  /* ---------------- parent area ---------------- */
  async function openParent() {
    const box = $('parentBox'); box.replaceChildren();
    const week = currentWeek();
    const sec = (title) => { const s = el('section', 'pa-sec'); s.appendChild(el('h2', null, title)); box.appendChild(s); return s; };
    box.appendChild(el('p', 'pa-note', '🔒 Everything here stays on this device. No accounts. Nothing is sent anywhere.'));

    const lv = sec('Reading level ("altitude")');
    lv.appendChild(el('p', null, `Current: ${levelLabel(S.level)}${S.levelLock ? ' (locked)' : ''}`));
    lv.appendChild(el('p', 'pa-small', `Ground = this week's district words (${week.school.phonics}). Sky = next week's district words (${week.school.nextPhonics}). Space = 3rd-grade stretch (prefixes, suffixes, long words, figurative language, why/cause-and-effect).`));
    lv.appendChild(el('p', 'pa-small', `Moves up after 3 strong sessions (evidence right on the first try + at least 6 of 7 word cards). Moves down quietly after 2 tricky sessions in a row. Strong sessions at this level so far: ${S.good} of 3. Tricky in a row: ${S.roughStreak}.`));
    const row = el('div', 'pa-row');
    const selL = el('select'); selL.setAttribute('aria-label', 'Set level');
    LEVELS.forEach((l) => { const o = el('option', null, levelLabel(l)); o.value = l; if (l === S.level) o.selected = true; selL.appendChild(o); });
    const lock = el('label', 'pa-check'); const cb = el('input'); cb.type = 'checkbox'; cb.checked = !!S.levelLock; lock.append(cb, ' Lock this level');
    row.append(selL, lock, btn('pa-btn', 'Save level', () => {
      if (selL.value !== S.level) { S.levelLog.push({ date: Date.now(), from: S.level, to: selL.value, why: 'grown-up override' }); S.level = selL.value; S.good = 0; S.roughStreak = 0; }
      S.levelLock = cb.checked; save(); toast('Level saved ✓'); openParent();
    }));
    lv.appendChild(row);
    if (S.levelLog.length) { const ul = el('ul', 'pa-small'); S.levelLog.slice(-6).forEach((l) => ul.appendChild(el('li', null, `${fmtDate(l.date)}: ${LEVEL_INFO[l.from].name} → ${LEVEL_INFO[l.to].name} (${l.why})`))); lv.appendChild(ul); }

    const wk = sec(`This week: ${week.title}`);
    wk.appendChild(el('p', 'pa-small', `Spelling: ${week.school.spelling.join(', ')}`));
    wk.appendChild(el('p', 'pa-small', `Heart (high-frequency) words: ${week.school.hf.join(', ')}`));
    wk.appendChild(el('p', 'pa-small', `Next week (Sky preview): ${week.school.nextSpelling.join(', ')}`));
    const tbl = el('table', 'pa-tbl');
    tbl.innerHTML = '<thead><tr><th>Day</th><th>Place</th><th>Level</th><th>Words 1st try</th><th>Evidence</th><th>Advisor</th><th>Pictures</th><th>When</th></tr></thead>';
    const tb = el('tbody');
    const ds = dayStatus(week);
    week.days.forEach((d0) => {
      const s = ds[d0.day]; const tr = el('tr');
      const d = (s && s.alt && d0.alt) ? d0.alt : shownDay(d0);
      const cells = s ? [d.name, d.place, LEVEL_INFO[s.level].icon + ' ' + LEVEL_INFO[s.level].name, `${s.wordFirst}/${s.wordTotal}`, s.evidence ? '✅ 1st try' : '🔁 retry', s.advisor ? '✅' : '🔁', `${s.checksFirst}/${s.checksTotal}`, `${fmtDate(s.date)} · ${s.mins} min`]
        : [d.name, d.place, '·', '·', '·', '·', '·', 'not yet'];
      cells.forEach((c) => tr.appendChild(el('td', null, c)));
      tb.appendChild(tr);
    });
    tbl.appendChild(tb); wk.appendChild(tbl);

    const ft = sec('First-try results by card type (all sessions)');
    const agg = {};
    S.sessions.forEach((s) => Object.entries(s.byType || {}).forEach(([t, [a, b]]) => { agg[t] = agg[t] || [0, 0]; agg[t][0] += a; agg[t][1] += b; }));
    if (!Object.keys(agg).length) ft.appendChild(el('p', 'pa-small', 'No sessions yet.'));
    const ul = el('ul', 'pa-bars');
    Object.keys(TYPE_NAMES).forEach((t) => {
      if (!agg[t]) return; const [a, b] = agg[t]; const pct = Math.round((a / b) * 100);
      const li = el('li'); li.append(el('span', 'pa-bl', TYPE_NAMES[t]), (() => { const bar = el('span', 'pa-bar'); const f = el('i'); f.style.width = pct + '%'; bar.appendChild(f); return bar; })(), el('span', 'pa-bn', `${a}/${b}`));
      ul.appendChild(li);
    });
    ft.appendChild(ul);

    const mw = sec('Missed words (they come back 2 sessions later)');
    if (!S.review.length) mw.appendChild(el('p', 'pa-small', 'None waiting. 🎉'));
    S.review.forEach((r) => { const p = el('p', 'pa-word'); p.append(wordEl(r.split || r.w), el('span', 'pa-small', `  from ${r.from || ''} · ${r.due <= S.sessionsDone ? 'comes back next session' : 'comes back in ' + (r.due - S.sessionsDone) + ' session(s)'}`)); mw.appendChild(p); });
    const allMissed = [...new Set(S.sessions.flatMap((s) => s.missed || []))];
    if (allMissed.length) mw.appendChild(el('p', 'pa-small', 'All words missed at least once: ' + allMissed.join(', ')));

    const ta = sec('Reading practice: words she tapped "Try again" on');
    ta.appendChild(el('p', 'pa-small', 'She reads a new word, then checks herself against the model. Words she marks "Try again" come back in later sessions until she marks them right twice. Her word recordings (if she taps 🎙️) are in Recordings below.'));
    const tw = Object.values(S.tryAgain || {}).sort((a, b) => b.n - a.n);
    if (!tw.length) ta.appendChild(el('p', 'pa-small', 'None right now. 🎉'));
    tw.forEach((t) => { const p = el('p', 'pa-word'); p.append(wordEl(t.split || t.w), el('span', 'pa-small', `  "try again" ${t.n}× · from ${t.from || ''} · last ${fmtDate(t.last)}`)); ta.appendChild(p); });

    const sl = sec('Spelling: sounds she hears differently');
    sl.appendChild(el('p', 'pa-small', 'When a typed word matches a sound swap (like "dat" for "that"), she sees "You wrote what you heard!" with a mouth cue. Counts:'));
    const logs = S.soundLog || []; const weekAgo = Date.now() - 7 * 864e5;
    if (!logs.length) sl.appendChild(el('p', 'pa-small', 'None logged yet.'));
    const byL = {}; logs.forEach((x) => { (byL[x.label] = byL[x.label] || []).push(x); });
    Object.entries(byL).sort((a, b) => b[1].length - a[1].length).forEach(([lab, l]) => {
      const wk = l.filter((x) => x.date >= weekAgo).length;
      sl.appendChild(el('p', 'pa-small', `• ${lab}: ${wk} time${wk === 1 ? '' : 's'} this week (${l.length} total). Examples: ${l.slice(-4).map((x) => `${x.w} → "${x.typed}"`).join(', ')}`));
    });

    const rp = sec('R practice (listening only)');
    rp.appendChild(el('p', 'pa-small', 'The app never scores or judges how she says R. She listens (R vs W pictures) and catches the guide\'s silly R mistakes. The optional "Say it and save it" recordings are in Recordings below, to share with her speech therapist if you like.'));
    const rrow = el('label', 'pa-row pa-check'); const rc0 = el('input'); rc0.type = 'checkbox'; rc0.checked = S.rOn !== false;
    rc0.addEventListener('change', () => { S.rOn = rc0.checked; save(); toast(rc0.checked ? 'R cards on ✓' : 'R cards off ✓'); });
    rrow.append(rc0, document.createTextNode(' Show R cards (about 2 per session)')); rp.appendChild(rrow);
    rp.appendChild(el('p', 'pa-small', 'R practice words (one per line: word, then an optional emoji picture, e.g. "rabbit 🐰"). Paste the therapist\'s target words here: initial R, vocalic R (-er, -ar, -or), R blends. Leave empty to use the built-in list.'));
    const rta = el('textarea', 'pa-ta'); rta.rows = 6; rta.value = (S.rWords || []).map((x) => x.w + (x.pic ? ' ' + x.pic : '')).join('\n'); rta.placeholder = rWordList().map((x) => x.w + ' ' + (x.pic || '')).join('\n');
    rp.append(rta, btn('pa-btn', 'Save R words', () => {
      const lines = rta.value.split(/\n+/).map((l) => l.trim()).filter(Boolean);
      S.rWords = lines.map((l) => { const m = l.match(/^([A-Za-z' -]+?)\s*([^A-Za-z' -].*)?$/); return m ? { w: m[1].trim().toLowerCase(), pic: (m[2] || '').trim() || '🔴' } : null; }).filter((x) => x && /r/i.test(x.w));
      if (!S.rWords.length) S.rWords = null; save(); toast('R words saved ✓'); openParent();
    }));

    const rc = sec('Recordings (saved only on this device)');
    let recs = [];
    try { recs = await recAll(); } catch (_) { rc.appendChild(el('p', 'pa-small', 'Recordings are not available in this browser.')); }
    if (!recs.length) rc.appendChild(el('p', 'pa-small', 'No recordings yet.'));
    const byDay = {};
    recs.sort((a, b) => b.date - a.date).forEach((r) => { const k = new Date(r.date).toDateString(); (byDay[k] = byDay[k] || []).push(r); });
    const KIND = { first: 'Take 1 (first read)', best: 'Take 2 (best read)', reply: 'Reply to the guide', radio: 'Radio show', word: 'Word practice', rwords: 'R words (say it and save it)' };
    Object.entries(byDay).forEach(([k, list]) => {
      rc.appendChild(el('h3', null, fmtDate(list[0].date)));
      list.forEach((r) => {
        const d = el('div', 'pa-rec');
        d.append(el('span', 'pa-small', `${fmtTime(r.date)} · ${r.dayName || ''} ${r.level ? LEVEL_INFO[r.level].name : ''} · ${KIND[r.kind] || r.kind}${r.word ? ': ' + r.word : ''}${r.kind === 'rwords' ? ' (' + (r.title || '') + ')' : ''} · ${r.dur || '?'}s`), audioFor(r),
          btn('pa-btn ghost', '🗑️', async () => { if (confirm('Delete this recording?')) { await recDel(r.id); openParent(); } }));
        rc.appendChild(d);
      });
    });

    const st = sec('Settings');
    const grow = el('div', 'pa-row'); const gsel = el('select'); gsel.setAttribute('aria-label', 'Guide animal');
    GUIDES.order.forEach((k) => { const o = el('option', null, GUIDES.kinds[k].label); o.value = k; if (S.guide && S.guide.kind === k) o.selected = true; gsel.appendChild(o); });
    const gname = el('input'); gname.value = (S.guide && S.guide.name) || ''; gname.maxLength = 16; gname.setAttribute('aria-label', 'Guide name');
    const gth = el('img', 'pa-guide-thumb'); gth.src = (GUIDES.kinds[(S.guide && S.guide.kind) || 'pigeon'] || {}).img || ''; gth.alt = '';
    gsel.addEventListener('change', () => { gth.src = (GUIDES.kinds[gsel.value] || {}).img || ''; });
    grow.append(gth, el('span', 'pa-small', 'Guide (she/her):'), gsel, gname, btn('pa-btn', 'Save guide', () => { const n = gname.value.trim(); if (!n) return; S.guide = { kind: gsel.value, name: n }; save(); toast('Guide saved ✓'); openParent(); }));
    st.appendChild(grow);
    const irow = el('label', 'pa-row pa-check'); const ic = el('input'); ic.type = 'checkbox'; ic.checked = S.italiaOn !== false;
    ic.addEventListener('change', () => { S.italiaOn = ic.checked; save(); toast(ic.checked ? 'Italian bonus on ✓' : 'Italian bonus off ✓'); });
    irow.append(ic, document.createTextNode(' Italian bonus postcard (one per week, unlocks after Friday, optional)')); st.appendChild(irow);
    const nrow = el('div', 'pa-row'); const nin = el('input'); nin.value = S.chick.name; nin.maxLength = 16; nin.setAttribute('aria-label', 'Baby animal name');
    nrow.append(nin, btn('pa-btn', 'Rename', () => { if (nin.value.trim()) { S.chick.name = nin.value.trim(); save(); toast('Saved ✓'); } }));
    st.appendChild(nrow);
    const kprow = el('div', 'pa-row'); const kin = el('input'); kin.value = S.kid || ''; kin.maxLength = 16; kin.setAttribute('aria-label', "Child's first name"); kin.placeholder = 'First name (optional)';
    kprow.append(el('span', 'pa-small', 'Her name (zoo sign):'), kin, btn('pa-btn', 'Save', () => { S.kid = kin.value.trim().slice(0, 16); save(); toast('Saved ✓'); }));
    st.appendChild(kprow);
    const krow = el('div', 'pa-row'); const ks = el('select'); ks.setAttribute('aria-label', 'Baby animal');
    PET_KINDS.forEach((k) => { const o = el('option', null, PETS[k].icon + ' ' + PETS[k].kind); o.value = k; if (k === (S.chick.kind || 'penguin')) o.selected = true; ks.appendChild(o); });
    krow.append(ks, btn('pa-btn', 'Switch animal (keeps growth)', () => { S.chick.kind = ks.value; save(); toast('Switched ✓'); }));
    st.appendChild(krow);
    if ((S.family || []).length) st.appendChild(el('p', 'pa-note', 'In the zoo (safe forever): ' + S.family.map((f) => `${PETS[f.kind] ? PETS[f.kind].icon : ''} ${f.name}`).join(', ')));
    if (weekList().length > 1) {
      const wrow = el('div', 'pa-row'); const ws = el('select');
      weekList().forEach((id) => { const o = el('option', null, window.PIP_WEEKS[id].title); o.value = id; if (id === week.id) o.selected = true; ws.appendChild(o); });
      wrow.append(ws, btn('pa-btn', 'Use this week', () => { S.weekId = ws.value; S.progress = null; save(); toast('Week changed ✓'); openParent(); }));
      st.appendChild(wrow);
    }
    st.appendChild(btn('pa-btn danger', 'Reset everything', async () => {
      if (!confirm('Erase all progress, the baby animal, and all recordings on this device?')) return;
      if (!confirm('Are you sure? This cannot be undone.')) return;
      try { await recClear(); } catch (_) {}
      S = fresh(); save(); renderName(); showScreen('screenName');
    }));
    showScreen('screenParent');
    $('screenParent').scrollTop = 0;
  }

  /* ---------------- start up ---------------- */
  function init() {
    $('feed').addEventListener('scroll', onFeedScroll, { passive: true });
    $('btnNext').addEventListener('click', goNext);
    $('btnPrev').addEventListener('click', goPrev);
    $('btnHome').addEventListener('click', goHome);
    // Volume: loud → soft → off → loud
    const volIcon = () => { $('muteIcon').textContent = S.muted ? '🔇' : (S.vol != null && S.vol < 1 ? '🔉' : '🔊'); $('btnMute').setAttribute('aria-pressed', String(!!S.muted)); $('btnMute').setAttribute('aria-label', S.muted ? 'Sound is off' : (S.vol < 1 ? 'Sound is soft' : 'Sound is on')); };
    $('btnMute').addEventListener('click', () => {
      if (S.muted) { S.muted = false; S.vol = 1; } else if (S.vol == null || S.vol >= 1) S.vol = 0.45; else { S.muted = true; stopVoice(); }
      save(); volIcon(); if (!S.muted) toast(S.vol < 1 ? '🔉 Soft voice' : '🔊 Voice on');
    });
    volIcon();
    document.addEventListener('keydown', (e) => {
      if (!$('screenPlay').classList.contains('active')) return;
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); goNext(); }
      else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); goPrev(); }
    });
    // Sideways swipes also work (handy in landscape on an iPad): swipe left = next, swipe right = back.
    let t0 = null;
    $('feed').addEventListener('touchstart', (e) => { const t = e.touches[0]; t0 = e.touches.length === 1 ? { x: t.clientX, y: t.clientY, at: Date.now() } : null; }, { passive: true });
    $('feed').addEventListener('touchend', (e) => {
      if (!t0) return; const t = e.changedTouches[0]; const dx = t.clientX - t0.x, dy = t.clientY - t0.y; const quick = Date.now() - t0.at < 700; t0 = null;
      if (quick && Math.abs(dx) > 60 && Math.abs(dx) > 1.6 * Math.abs(dy)) { if (dx < 0) goNext(); else goPrev(); }
    }, { passive: true });
    const wideQ = window.matchMedia('(orientation: landscape) and (min-width: 700px)');
    const hintText = () => { $('swipeHint').textContent = wideQ.matches ? 'swipe ↑ or ←  ·  arrow keys work too' : 'swipe up ↑'; };
    hintText(); if (wideQ.addEventListener) wideQ.addEventListener('change', hintText);
    let resizeT = null;
    window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(() => { if ($('screenPlay').classList.contains('active')) scrollToIndex(P.idx, false); }, 150); });
    setupGate();
    if (!S.guide || !S.chick.name) { renderName(); showScreen('screenName'); } else goHome();
    refreshThenNow();
    if (S.guide) setTimeout(warmPoses, 4000);
    // Warm the offline cache with the word audio (small files) once per version, a few at a time.
    setTimeout(async () => {
      if (!navigator.onLine || localStorage.getItem('pipsAudioWarm') === 'v2.3') return;
      const list = [...new Set(Object.values(AUD))];
      for (let i = 0; i < list.length; i += 6) { try { await Promise.all(list.slice(i, i + 6).map((u) => fetch(u).catch(() => {}))); } catch (_) {} }
      try { localStorage.setItem('pipsAudioWarm', 'v2.3'); } catch (_) {}
    }, 8000);
    if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  // Small hook for automated tests (no effect on the child's experience).
  window.PipApp = { soundAlike, get state() { return S; }, scoreSession, applyLevelRules, save, reload: () => { load(); }, goHome, openParent, get P() { return P; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
