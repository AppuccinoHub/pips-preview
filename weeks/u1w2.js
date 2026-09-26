/* Pip's Postcards · Unit 1 Week 2 · Plants and Animals in Their Habitats
   Content only. The app (app.js) turns this into cards.
   Authoring rules (see README "Adding a new week"):
   - In EVERY option list, write the correct answer FIRST. The app shuffles them.
   - Evidence answers ("a") are a short piece of text that appears in exactly ONE sentence of the postcard.
   - Word markup: "|" splits syllables (nap|kin), [ ] highlights the pattern letters (m[ai]l).
   - The Friday radio show has a penguin character (Pebble the Penguin) so it works whichever baby animal she adopted.
   All passages are original (written for this app), not copied from Benchmark Advance. */
(window.PIP_WEEKS = window.PIP_WEEKS || {})['u1w2'] = {
  id: 'u1w2',
  unit: 1, week: 2,
  title: 'Habitats · Week 2',
  unitTitle: 'Plants and Animals in Their Habitats',
  school: {
    spelling: ['go', 'we', 'den', 'no', 'she', 'napkin', 'dentist', 'problem', 'open', 'silent'],
    hf: ['have', 'is', 'jump', 'my', 'one', 'put', 'the', 'want', 'what', 'you'],
    phonics: 'Closed and open syllables · three-letter blends (spr, str, scr, spl, thr, shr, squ) · short vowel review',
    nextSpelling: ['April', 'play', 'blame', 'stay', 'cake', 'mail', 'chain', 'paint', 'break', 'great'],
    nextHf: ['he', 'like', 'little', 'no', 'of', 'saw', 'this', 'to', 'we', 'with'],
    nextPhonics: 'Long a (ai, ay, a_e, ea as in great)',
    comprehension: 'Ask questions · main topic and key details · context clues · how pictures help · compare two texts'
  },
  levels: {
    ground: { focus: 'This week: open & closed syllables, 3-letter blends, short vowels' },
    sky: { focus: 'Next week: long a (ai, ay, a_e, break/great) mixed with this week' },
    space: { focus: '3rd-grade stretch: prefixes, suffixes (-ful, -less, -tion, -able), long words, figurative language, why/cause-and-effect' }
  },
  days: [
  /* ======================= MONDAY ======================= */
  {
    day: 1, name: 'Monday', place: 'Antarctica', flag: '🇦🇶', scene: 'img/mon_antarctica.webp',
    qtype: 'Key details & main topic', atype: 'Pip made a mistake',
    arrive: 'Pip landed on the ice in Antarctica!',
    wiggle: { emoji: '🐧', text: 'Waddle like a penguin to the door and back!', sub: 'Tiny steps. Flippers out. Go!' },
    route: {
      q: 'Help me pick! How should I fly to my next stop, a giant bat cave?',
      opts: [
        { pic: '🌊', label: 'Over the ocean', echo: 'I took the ocean way, like you said. A whale sprayed me! 🐋' },
        { pic: '🏔️', label: 'Over the mountains', echo: 'I flew over the mountains, like you said. Brrr, snowy peaks! 🏔️' }
      ]
    },
    ps: 'P.S. Would you want to slide on your belly like a penguin? Tell me why!',
    levels: {
      /* Penguins are a class topic too, so each postcard starts from what she already knows
         (huddles, dads keeping eggs warm) and then adds NEW, deeper facts. */
      ground: {
        title: 'Brrr! Hello from Antarctica',
        targets: ['strong', 'squeeze', 'silent', 'go', 'problem', 'splat', 'one', 'jump', 'what', 'is'],
        model: {
          title: 'Open door, closed door',
          lines: ['Closed syllable: a consonant closes the door. The vowel is short.', 'Open syllable: the door is open. The vowel says its name!'],
          ex: [{ w: 'den', tag: 'closed 🔒' }, { w: 'go', tag: 'open 🚪' }, { w: 'she', tag: 'open 🚪' }, { w: 'nap|kin', tag: 'closed + closed' }]
        },
        sort: { a: 'Closed 🔒', b: 'Open 🚪', items: [['den', 'a'], ['we', 'b'], ['no', 'b'], ['jump', 'a']], hint: 'Is there a consonant AFTER the vowel? Then the door is closed.' },
        build: { w: 'nap|kin', tiles: ['nap', 'kin', 'pen'], pic: '🧻', clue: 'You wipe your mouth with it.' },
        pick: { w: 'dentist', opts: ['dentist', 'dentest', 'dintist'], pic: '🦷', clue: 'This helper keeps your teeth healthy.', split: 'den|tist' },
        hear: { w: 'open', opts: ['open', 'opin', 'oppen'], pic: '📖', clue: 'The opposite of shut.', split: 'o|pen' },
        rebel: { words: ['one', 'go', 'no', 'we'], why: '"one" breaks the rule! It sounds like "wun." Go, no and we all end with a vowel that says its name.' },
        preview: [
          { w: 'huddle', pic: '🐧🐧🐧', means: 'a tight, cozy group' },
          { w: 'waterproof', pic: '💧🚫', means: 'keeps water out' },
          { w: 'bellies', pic: '🐧⬇️', means: 'tummies' }
        ],
        chunks: [
          { s: ['I landed on the ice in Antarctica, and the wind is so strong!', 'You know that emperor penguins squeeze close in a huddle to keep warm.'], pic: '💨', focus: '20% 30%', check: ['🐧🐧🐧🐧', '🐧  ·  ·  🐧', '🐦🏖️☀️'] },
          { s: ['Here is a new fact: each chick has its own call, like a song.', 'A mom can find her one chick in a crowd of thousands just by its call!'], pic: '🎵', focus: '50% 50%', check: ['🐧🎵🐣', '🐧📱', '🐧🎈'] },
          { s: ['The chicks have soft gray fluff, but it is not waterproof.', 'So they must not go in the sea until they grow slick new feathers.'], pic: '🐣', focus: '50% 80%', check: ['🐣🚫🌊', '🐣🏊🌊', '🐣🍦'] },
          { s: ['The big penguins slide on their bellies to go fast.', 'I tried to jump and slide too, but I landed in the snow with a splat.', 'What a problem! The penguins stayed silent.'], pic: '💥', focus: '80% 60%', check: ['🐦💥❄️', '🐦🍰🎉', '🐦😴🛏️'] }
        ],
        question: { q: 'How does a mom find her chick in the crowd? Tap the sentence that tells me.', a: 'just by its call', mishap: 'Oops! I tried to find a chick by looking. They ALL look the same! 😵 Try again!' },
        advisor: { type: 'mistake', pip: 'I think baby penguin chicks can swim in the sea right away.', q: 'Pip made a mistake! Tap the sentence that proves Pip is wrong.', a: ['not waterproof', 'must not go in the sea'], mishap: 'Hmm, that sentence does not tell about chicks and the sea. Try another, advisor!' },
        fill: { kind: 'word', sent: 'You know that emperor penguins ___ close in a huddle to keep warm.', opts: ['squeeze', 'sprint', 'scrub'] },
        spell: { w: 'jump', sent: 'I tried to ___ and slide too.', split: 'jump', pic: '🦘' }
      },
      sky: {
        title: 'What Happens After the Egg?',
        targets: ['made', 'mail', 'chase', 'today', 'take', 'lays', 'stays', 'waits', 'complain', 'brave', 'cake'],
        model: {
          title: 'ai in the middle',
          lines: ['When a and i team up in the MIDDLE of a word, they say /ā/.', 'The a says its name. The i is silent!'],
          ex: [{ w: 'm[ai]l', tag: 'ai = /ā/' }, { w: 'ch[ai]n', tag: 'ai = /ā/' }, { w: 'p[ai]nt', tag: 'ai = /ā/' }, { w: 'w[ai]ts', tag: 'ai = /ā/' }]
        },
        sort: { a: 'ai (middle) 🟡', b: 'ay (end) 🔵', items: [['mail', 'a'], ['play', 'b'], ['chain', 'a'], ['stay', 'b']], hint: 'Where is the /ā/ sound? In the middle = ai. At the very end = ay.' },
        build: { w: 'p|[ai]|nt', tiles: ['p', 'ai', 'nt', 'ay'], pic: '🎨', clue: 'You use it to make art on paper.' },
        pick: { w: 'chain', opts: ['chain', 'chane', 'chayn'], pic: '⛓️', clue: 'Metal rings hooked together.', split: 'ch[ai]n' },
        hear: { w: 'complain', opts: ['complain', 'complane', 'compleign'], pic: '😤', clue: 'Say that you are not happy about something.', split: 'com|pl[ai]n' },
        rebel: { words: ['said', 'mail', 'rain', 'paint'], why: '"said" has ai, but it says /e/, not /ā/! It is a heart word ❤️.' },
        preview: [
          { w: 'hatches', pic: '🐣', means: 'breaks out of its egg' },
          { w: 'daycare', pic: '🧸', means: 'a place where little ones stay safe together' },
          { w: 'breath', pic: '🫧', means: 'the air you take in' }
        ],
        chunks: [
          { s: ['I made it to Antarctica, the coldest place on Earth!', 'The wind is so strong that it blew my mail bag away, and I had to chase it.'], pic: '💨', focus: '20% 30%', check: ['🐦💨✉️', '🐦🏖️☀️', '🐦🎂🎉'] },
          { s: ['You already know that each mom lays one egg and the dad stays to keep it warm.', 'Today I found out what happens after the chick hatches!'], pic: '🐣', focus: '50% 85%', check: ['🐧🥚🐣', '🐧🏀', '🐧🚗'] },
          { s: ['The fluffy chick waits on its dad\'s feet, where it is safe from the ice.', 'When it gets bigger, it huddles with other chicks in a group that is like a penguin daycare.'], pic: '🦶', focus: '50% 80%', check: ['🐣🦶🐧', '🐣🏊🌊', '🐣🛏️'] },
          { s: ['The parents take turns making long trips to the sea to catch fish.', 'An emperor penguin can dive deeper than any other bird and hold its breath for about twenty minutes!'], pic: '🌊', focus: '10% 60%', check: ['🐧🌊🐟', '🐧🌵☀️', '🐧✈️'] },
          { s: ['I would complain if I had to hold my breath that long, but penguins are brave.', 'I made the chicks a snow cake, but they only wanted fish.'], pic: '🎂', focus: '70% 60%', check: ['🐦🎂🐣', '🐦🍕', '🐦🎈'] }
        ],
        question: { pre: { q: 'What is this postcard MOSTLY about?', opts: ['🐣 How penguin chicks grow up', '🎂 Making snow cakes', '✉️ Chasing a mail bag'], mishap: 'That is just one small part. What is MOST of the postcard about?' },
          q: 'Key detail: Where does the chick wait when it is little? Tap the sentence that tells me.', a: 'waits on its dad', mishap: 'Oops! I looked for the chick in a nest. Penguins do not have nests! 🪹 Try again!' },
        advisor: { type: 'mistake', pip: 'Penguins can only hold their breath for one second.', q: 'Pip made a mistake! Tap the sentence that proves Pip is wrong.', a: 'twenty minutes', mishap: 'Hmm, that one does not tell about holding a breath. Try another, advisor!' },
        fill: { kind: 'word', sent: 'The wind is so strong that it blew my ___ bag away.', opts: ['mail', 'male', 'meal'] },
        spell: { w: 'today', sent: '___ I found out what happens after the chick hatches!', split: 'to|d[ay]', pic: '📅' }
      },
      space: {
        title: 'Secrets of the Emperor Penguins',
        targets: ['endless', 'discovered', 'motionless', 'carefully', 'returns', 'fearless', 'restless', 'temperature', 'windiest'],
        model: {
          title: 'Suffixes: -ful and -less',
          lines: ['A suffix is a word part stuck on the END of a word. It changes the meaning.', '-ful means "full of."  -less means "without."'],
          ex: [{ w: 'care|[ful]', tag: 'full of care' }, { w: 'fear|[less]', tag: 'without fear' }, { w: 'end|[less]', tag: 'without an end' }, { w: 'help|[ful]', tag: 'full of help' }]
        },
        sort: { a: '-ful = full of 🫙', b: '-less = without 🚫', items: [['careful', 'a'], ['endless', 'b'], ['helpful', 'a'], ['motionless', 'b']], hint: 'Cover the base word. Is the ending -ful or -less?' },
        build: { w: 'mo|tion|less', tiles: ['mo', 'tion', 'less', 'shun'], pic: '🗿', clue: 'Not moving at all.' },
        pick: { w: 'fearless', opts: ['fearless', 'fearles', 'feerless'], pic: '🦁', clue: 'Without any fear.', split: 'fear|[less]' },
        hear: { w: 'carefully', opts: ['carefully', 'carefuly', 'carefoolly'], pic: '👂', clue: 'In a way that is full of care.', split: 'care|[ful]|ly' },
        rebel: { words: ['bless', 'fearless', 'endless', 'helpless'], why: '"bless" is not "without b"! There is no base word, so -less is not a suffix here.' },
        preview: [
          { w: 'continent', pic: '🌍', means: 'one of the seven huge pieces of land on Earth' },
          { w: 'waterproof', pic: '💧🚫', means: 'keeps water out' },
          { w: 'got cold feet', pic: '🦶❄️', means: 'felt too nervous to do something (it is an expression!)' }
        ],
        chunks: [
          { s: ['Greetings from Antarctica, the coldest, windiest continent on Earth!', 'In winter, the temperature can drop to forty degrees below zero, and the wind howls like an endless freight train.'], pic: '🌬️', focus: '20% 30%', check: ['🌬️❄️🥶', '☀️🏖️😎', '🌧️🌈'] },
          { s: ['You probably know that emperor penguins survive the winter by standing in tight, motionless huddles.', 'Today I discovered some remarkable facts that most visitors never learn.'], pic: '🔍', focus: '50% 40%', check: ['🐧🐧🐧🐧', '🐧  ·  ·  🐧', '🐦🐦🐦'] },
          { s: ['Emperor penguins are powerful divers that can plunge more than fifteen hundred feet below the surface.', 'They can hold their breath for about twenty minutes while they hunt fish and squid in the dark water.'], pic: '🌊', focus: '10% 60%', check: ['🐧⬇️🌊🐟', '🐧☁️✈️', '🐧🏜️'] },
          { s: ['Their chicks are covered in fluffy gray down, which is warm but not waterproof.', 'As a result, a chick cannot swim until its sleek adult feathers grow in.'], pic: '🐣', focus: '50% 80%', check: ['🐣🚫🌊', '🐣🏊🌊', '🐣🍦'] },
          { s: ['Whenever a parent returns from the sea, it calls out, and its chick answers.', 'Out of thousands of voices, the parent carefully listens for that one special call!'], pic: '📣', focus: '60% 70%', check: ['🐧📣🐣', '🐧📺', '🐧🎸'] },
          { s: ['When I first saw the icy, restless sea, I got cold feet and almost hid in my mail bag.', 'Then I remembered that you are counting on me, so I stayed, fearless and proud, to finish my report.'], pic: '🦶', focus: '85% 60%', check: ['🐦😬➡️😊', '🐦😴', '🐦🍰'] }
        ],
        question: { q: 'Cause and effect: What happens BECAUSE a chick\'s down is not waterproof? Tap the sentence that tells the effect.', a: 'cannot swim until', near: ['which is warm but not waterproof'], nearText: 'That sentence tells the CAUSE. Now find the EFFECT. Look for "As a result"!', mishap: 'Oops! I tried to teach a chick to swim and we both got soggy. 💦 Look for "As a result"!' },
        advisor: { type: 'mistake', pip: 'Emperor penguins only swim near the top of the water.', q: 'Pip made a mistake! Tap the sentence that proves Pip is wrong.', a: 'fifteen hundred feet', mishap: 'That sentence does not tell how deep they go. Try another, advisor!' },
        fill: { kind: 'word', sent: 'You probably know that emperor penguins survive the winter by standing in tight, ___ huddles.', opts: ['motionless', 'careful', 'hopeful'] },
        spell: { w: 'fearless', sent: 'So I stayed, ___ and proud, to finish my report.', split: 'fear|[less]', pic: '🦁' }
      }
    }
  },
  /* ======================= TUESDAY ======================= */
  {
    day: 2, name: 'Tuesday', place: 'Bracken Cave, Texas', flag: '🇺🇸', scene: 'img/tue_batcave.webp',
    qtype: 'Word meaning from context', atype: 'Odd one out, and why',
    arrive: 'Pip found a giant bat cave in Texas!',
    wiggle: { emoji: '🦇', text: 'Flap like a bat 5 times!', sub: 'Big wings... 1, 2, 3, 4, 5!' },
    route: {
      q: 'Where should I fly next? I want to see a hot, dry desert!',
      opts: [
        { pic: '🚂', label: 'Follow the train tracks', echo: 'I followed the train tracks, like you said. Choo choo! 🚂' },
        { pic: '🏞️', label: 'Follow the river', echo: 'I followed the river, like you said. A fish waved at me! 🐟' }
      ]
    },
    ps: 'P.S. Would you rather sleep upside down or right side up? Why?',
    levels: {
      ground: {
        title: 'Bats, Bats, and More Bats!',
        targets: ['silent', 'stream', 'spread', 'squeaks', 'go', 'dentist', 'is', 'you', 'have'],
        model: {
          title: 'Two consonants in the middle',
          lines: ['See two consonants in the middle? Split between them!', 'Now each part is a closed syllable, so the vowels are short.'],
          ex: [{ w: 'den|tist', tag: 'closed + closed' }, { w: 'prob|lem', tag: 'closed + closed' }, { w: 'nap|kin', tag: 'closed + closed' }]
        },
        sort: { a: 'Short vowel 🔒', b: 'Long vowel 🚪', items: [['prob', 'a'], ['she', 'b'], ['den', 'a'], ['no', 'b']], hint: 'Door closed by a consonant = short vowel. Open door = the vowel says its name.' },
        build: { w: 'den|tist', tiles: ['den', 'tist', 'dan'], pic: '🦷', clue: 'This helper cleans your teeth.' },
        pick: { w: 'problem', opts: ['problem', 'probelm', 'prablem'], pic: '🤔', clue: 'Something that goes wrong.', split: 'prob|lem' },
        hear: { w: 'squeak', opts: ['squeak', 'sqeak', 'sweak'], pic: '🐭', clue: 'A tiny, high sound.', split: '[squ]eak' },
        rebel: { words: ['want', 'napkin', 'dentist', 'problem'], why: '"want" breaks the rule! The a sounds like /o/, not /a/ like in "nap." Heart word ❤️.' },
        preview: [
          { w: 'mammal', pic: '🐻', means: 'an animal with fur or hair that feeds its babies milk' },
          { w: 'nocturnal', pic: '🌙', means: 'awake at night' },
          { w: 'echo', pic: '🗣️↩️', means: 'a sound that bounces back' }
        ],
        chunks: [
          { s: ['I flew to a big cave in Texas, and it is not silent at all!', 'Millions of bats live in this cave.'], pic: '🔊', focus: '45% 70%', check: ['🦇🦇🦇🕳️', '🐧🐧❄️', '🐟🐟🌊'] },
          { s: ['Bats are mammals, just like you, and they have soft fur.', 'In the day, they hang upside down and sleep.'], pic: '🙃', focus: '30% 40%', check: ['🦇🙃😴', '🦇🏊', '🦇🍦'] },
          { s: ['Bats are nocturnal, so they wake up at night.', 'At dusk, they stream out of the cave and spread across the sky.', 'They all come home to the cave before the sun comes up.'], pic: '🌆', focus: '50% 20%', check: ['🕳️➡️🦇🦇🦇🌆', '🦇🛏️☀️', '🦇🚗'] },
          { s: ['Each bat squeaks and listens for the echo to find bugs.', 'Bats have tiny, sharp teeth, but they never go to the dentist!'], pic: '🦷', focus: '20% 45%', check: ['🦇🔊🦟', '🦇🎸', '🦇📺'] }
        ],
        question: { pre: { q: 'Pip does not know the word "nocturnal." What does it mean?', opts: ['🌙 Awake at night', '☀️ Awake in the day', '🏊 Good at swimming'], mishap: 'Hmm, look at what the bats do! Try again.' },
          q: 'Word detective: Tap the sentence with the clue for "nocturnal."', a: 'wake up at night', near: ['In the day'], nearText: 'Good thinking! That helps, but find the sentence that uses the word "nocturnal."', mishap: 'Oops! I tried to be nocturnal and fell asleep in a sock drawer. 🧦 Try again!' },
        advisor: { type: 'odd', q: 'Which one does NOT match bats?', opts: ['🥚 Hatch from eggs', '🦇 Have soft fur', '🌙 Wake up at night', '👂 Listen for echoes'],
          whyQ: 'Why not? Pick the reason from the postcard.', whys: ['Bats are mammals, like you.', 'Bats are too big for eggs.'], mishap: 'Look back at the postcard. What does it say about bats?' },
        fill: { kind: 'word', sent: 'Bats have tiny, sharp teeth, but they never go to the ___!', opts: ['dentist', 'den', 'desk'] },
        spell: { w: 'go', sent: 'Bats never ___ to the dentist!', split: 'go', pic: '🚶' }
      },
      sky: {
        title: 'A Great Gray River of Bats',
        targets: ['today', 'day', 'gray', 'trail', 'spray', 'great', 'stay', 'play', 'mail', 'maybe'],
        model: {
          title: 'ay at the end',
          lines: ['When you hear /ā/ at the END of a word, use ay.', 'Middle = ai (rain). End = ay (play).'],
          ex: [{ w: 'pl[ay]', tag: 'ay = /ā/' }, { w: 'st[ay]', tag: 'ay = /ā/' }, { w: 'gr[ay]', tag: 'ay = /ā/' }, { w: 'to|d[ay]', tag: 'ay = /ā/' }]
        },
        sort: { a: 'ai (middle) 🟡', b: 'ay (end) 🔵', items: [['trail', 'a'], ['day', 'b'], ['paint', 'a'], ['gray', 'b']], hint: 'Say it slowly. Is /ā/ at the very end? Then it is ay.' },
        build: { w: 'to|d[ay]', tiles: ['to', 'day', 'dai'], pic: '📅', clue: 'This day, right now.' },
        pick: { w: 'stay', opts: ['stay', 'stai', 'staye'], pic: '🏠', clue: 'Remain in one place.', split: 'st[ay]' },
        hear: { w: 'spray', opts: ['spray', 'sprai', 'spay'], pic: '💦', clue: 'Tiny drops of water flying out.', split: '[spr][ay]' },
        rebel: { words: ['says', 'play', 'stay', 'day'], why: '"says" has ay, but it sounds like "sez"! Heart word ❤️.' },
        preview: [
          { w: 'mammal', pic: '🐻', means: 'an animal with fur or hair that feeds its babies milk' },
          { w: 'nocturnal', pic: '🌙', means: 'awake at night' },
          { w: 'echo', pic: '🗣️↩️', means: 'a sound that bounces back' }
        ],
        chunks: [
          { s: ['Today I flew to a huge cave in Texas.', 'At the end of the day, millions of bats poured out in a long gray trail.'], pic: '🌆', focus: '50% 30%', check: ['🕳️➡️🦇🦇🦇', '🐧🐧❄️', '🚂🚂'] },
          { s: ['They swirled up like smoke and seemed to spray across the pink sky.', 'What a great show!', 'Before sunrise, they all fly home to the cave to rest.'], pic: '🌪️', focus: '50% 10%', check: ['🦇🌀🌇', '🦇🏊🌊', '🦇🛏️'] },
          { s: ['Bats are mammals, so they have fur and feed their babies milk.', 'In the day, they stay in the cave and hang upside down to rest.'], pic: '🙃', focus: '40% 70%', check: ['🦇🙃😴', '🦇⚽', '🦇🎂'] },
          { s: ['Bats are nocturnal, which means they sleep in the day and hunt at night.', 'To find bugs in the dark, a bat squeaks and listens for the echo.'], pic: '🔊', focus: '20% 40%', check: ['🦇🔊🦟', '🦇🎸', '🦇🔦'] },
          { s: ['The echo tells the bat where a moth is, so it can snatch it.', 'I tried to play the echo game, but I just bumped into a wall.', 'Maybe I will stick to mail!'], pic: '💥', focus: '80% 50%', check: ['🐦💥🧱', '🐦🏆', '🐦🍕'] }
        ],
        question: { q: 'Word detective: What does "nocturnal" mean? Tap the sentence with the clue.', a: 'which means they sleep', near: ['they stay in the cave'], nearText: 'Good thinking! That helps, but find the sentence that uses the word "nocturnal."', mishap: 'Oops! I tried to be nocturnal and fell asleep in a sock drawer. 🧦 Try again!' },
        advisor: { type: 'odd', q: 'Which one is NOT true about bats?', opts: ['🪶 They have feathers', '🦇 They have fur', '🥛 They feed babies milk', '🌙 They hunt at night'],
          whyQ: 'Why not? Pick the reason from the postcard.', whys: ['Bats are mammals, so they have fur.', 'Feathers are too heavy to fly.'], mishap: 'Look back at the postcard. What does it say bats have?' },
        fill: { kind: 'word', sent: 'At the end of the day, millions of bats poured out in a long ___ trail.', opts: ['gray', 'grape', 'great'] },
        spell: { w: 'play', sent: 'I tried to ___ the echo game.', split: 'pl[ay]', pic: '🎮' }
      },
      space: {
        title: 'Fifteen Million Bats at Sunset',
        targets: ['unbelievable', 'unusual', 'echolocation', 'returns', 'thankful', 'retell', 'enormous', 'nocturnal'],
        model: {
          title: 'Prefixes: un- and re-',
          lines: ['A prefix is a word part at the START of a word.', 'un- means "not."  re- means "again" or "back."'],
          ex: [{ w: '[un]|safe', tag: 'not safe' }, { w: '[un]|u|su|al', tag: 'not usual' }, { w: '[re]|turn', tag: 'come back' }, { w: '[re]|tell', tag: 'tell again' }]
        },
        sort: { a: 'un- = not 🚫', b: 're- = again/back 🔁', items: [['unusual', 'a'], ['return', 'b'], ['unable', 'a'], ['retell', 'b']], hint: 'Look at the first two letters.' },
        build: { w: '[re]|ap|pear', tiles: ['re', 'ap', 'pear', 'rep'], pic: '🎩🐇', clue: 'Show up again.' },
        pick: { w: 'unusual', opts: ['unusual', 'unusal', 'unusuall'], pic: '🦄', clue: 'Not usual; strange.', split: '[un]|u|su|al' },
        hear: { w: 'return', opts: ['return', 'retern', 'ritern'], pic: '🔁', clue: 'Come back.', split: '[re]|turn' },
        rebel: { words: ['read', 'redo', 'reread', 'retell'], why: 'In "read," re is NOT a prefix. Take it off and "ad" is not the base word!' },
        preview: [
          { w: 'colony', pic: '🦇🦇🦇', means: 'a big group of animals living together' },
          { w: 'echolocation', pic: '🔊↩️', means: 'finding things by listening to echoes' },
          { w: 'night owl', pic: '🦉🌙', means: 'a person who likes to stay up late (an expression!)' }
        ],
        chunks: [
          { s: ['Tonight I perched near Bracken Cave in Texas, the summer home of about fifteen million Mexican free-tailed bats.', 'It is the largest bat colony in the world, which is unbelievable!'], pic: '🕳️', focus: '45% 75%', check: ['🦇🦇🦇🕳️', '🐧🐧❄️', '🐝🐝🌻'] },
          { s: ['As the sun set, a dark ribbon of bats poured out of the cave and twisted into the sky.', 'The swirling cloud was so enormous that it looked like a tornado made of wings.', 'By sunrise, every bat will be back home, snug in the cave.'], pic: '🌪️', focus: '50% 10%', check: ['🦇🌀🌇', '🌪️🏠', '☁️🌧️'] },
          { s: ['Bats are mammals, so they have fur and feed their pups milk.', 'They are also the only mammals that can truly fly, because their wings are made of thin skin stretched over long finger bones.'], pic: '🖐️', focus: '20% 40%', check: ['🦇🖐️🪽', '🦇🪶', '🦇🏊'] },
          { s: ['Bats are nocturnal, which means they are active at night and rest during the day.', 'It might seem unusual, but at night there are fewer hungry birds and plenty of insects.'], pic: '🌙', focus: '70% 20%', check: ['🦇🌙🦟', '🦇☀️😎', '🦇🛁'] },
          { s: ['To hunt in the dark, a bat uses echolocation.', 'It sends out high squeaks, and when the sound bounces off a moth and returns, the bat knows exactly where its dinner is.'], pic: '🔊', focus: '25% 45%', check: ['🦇🔊↩️🦋', '🦇🔦', '🦇🗺️'] },
          { s: ['These bats eat so many moths that farmers are thankful for them.', 'I stayed up way past my bedtime to watch them.', 'I guess I am a night owl now, and tomorrow I will retell the whole story!'], pic: '🦉', focus: '85% 40%', check: ['🐦🌙👀', '🐦☀️🏖️', '🐦🛒'] }
        ],
        question: { pre: { q: 'Pip says, "I guess I am a night owl now." What does "night owl" mean here?', opts: ['🌙 Someone who stays up late', '🦉 Pip turned into a real owl', '🍗 An owl\'s dinner'], mishap: 'Pip is still a {species}! 🐦 It is an expression. Try again.' },
          q: 'Tap the sentence with the clue that helped you.', a: 'past my bedtime', mishap: 'Oops! I tried to hoot like an owl and got the hiccups. 🦉 Look for what Pip did late at night!' },
        advisor: { type: 'odd', q: 'Which animal does NOT belong with the others?', opts: ['🐦 Robin', '🦇 Bat', '🐋 Whale', '🐻 Bear'],
          whyQ: 'Why? Pick the reason that matches the postcard.', whys: ['It is not a mammal. Mammals have fur and feed babies milk.', 'It cannot fly.'], mishap: 'Think about the word "mammal" in the postcard.' },
        fill: { kind: 'word', sent: 'It might seem ___, but at night there are fewer hungry birds.', opts: ['unusual', 'useful', 'untied'] },
        spell: { w: 'return', sent: 'The sound bounces off a moth and will ___ to the bat.', split: '[re]|turn', pic: '🔁' }
      }
    }
  },
  /* ======================= WEDNESDAY ======================= */
  {
    day: 3, name: 'Wednesday', place: 'Sonoran Desert, Arizona', flag: '🇺🇸', scene: 'img/wed_desert.webp',
    qtype: 'What the picture shows', atype: 'How does Pip feel?',
    arrive: 'Pip landed in a hot, dry desert!',
    wiggle: { emoji: '🐇', text: 'Hop like a jackrabbit 5 times!', sub: 'Big ears up... hop, hop, hop, hop, hop!' },
    route: {
      q: 'Tomorrow I fly to a rainy rainforest. How should I find it?',
      opts: [
        { pic: '🌈', label: 'Chase a rainbow', echo: 'I chased a rainbow, like you said. It led me to the rain! 🌈' },
        { pic: '🦋', label: 'Follow a butterfly', echo: 'I followed a butterfly, like you said. She fluttered the whole way! 🦋' }
      ]
    },
    ps: 'P.S. Which desert animal would you want to be? Why?',
    levels: {
      ground: {
        title: 'Hot Feet in the Desert',
        targets: ['no', 'stretch', 'open', 'silent', 'shrub', 'she', 'hop', 'is'],
        model: {
          title: 'One consonant in the middle',
          lines: ['See ONE consonant in the middle? Try splitting after the vowel.', 'The first part is open, so the vowel says its name: o|pen, si|lent.'],
          ex: [{ w: 'o|pen', tag: 'open + closed' }, { w: 'si|lent', tag: 'open + closed' }, { w: 'ro|bot', tag: 'open + closed' }]
        },
        sort: { a: 'Starts open 🚪', b: 'Starts closed 🔒', items: [['open', 'a'], ['dentist', 'b'], ['silent', 'a'], ['problem', 'b']], hint: 'Split the word. Does the first part end with a vowel (open) or a consonant (closed)?', split: { open: 'o|pen', dentist: 'den|tist', silent: 'si|lent', problem: 'prob|lem' } },
        build: { w: 'si|lent', tiles: ['si', 'lent', 'sil'], pic: '🤫', clue: 'No sound at all.' },
        pick: { w: 'what', opts: ['what', 'wut', 'whut'], pic: '❓', clue: '___ is that? (a heart word)', split: 'wh[a]t' },
        hear: { w: 'shrub', opts: ['shrub', 'srub', 'chrub'], pic: '🌳', clue: 'A small, low bush.', split: '[shr]ub' },
        rebel: { words: ['have', 'open', 'silent', 'we'], why: '"have" ends in e, but the a is short! Heart word ❤️.' },
        preview: [
          { w: 'desert', pic: '🏜️', means: 'a dry place with very little rain' },
          { w: 'cactus', pic: '🌵', means: 'a spiky plant that stores water' },
          { w: 'nectar', pic: '🌼💧', means: 'sweet juice inside a flower' }
        ],
        chunks: [
          { s: ['Now I am in a hot, dry desert in Arizona, and there is no rain for weeks.', 'The sand is so hot that I hop from foot to foot!'], pic: '🔥', focus: '30% 85%', check: ['🐦🔥🦶', '🐦❄️🧤', '🐦🌧️☔'] },
          { s: ['A giant saguaro cactus is as tall as a house, and its arms stretch up to the sky.', 'It stores water inside so it does not dry up.'], pic: '🌵', focus: '62% 40%', check: ['🌵💧', '🌳🍎', '🌻🐝'] },
          { s: ['At night, its white flowers open wide.', 'A bat sips sweet nectar from the flowers.'], pic: '🌼', focus: '70% 20%', check: ['🦇🌼🌙', '🦇🍕', '🐝🌻☀️'] },
          { s: ['When the bat flies to the next cactus, it helps the plant make seeds.', 'A jackrabbit sits silent under a shrub.', 'She has big ears to help her stay cool.'], pic: '🐇', focus: '20% 75%', check: ['🐇👂😎', '🐇🥕🏠', '🐇🎩'] }
        ],
        question: { pre: { q: 'Look at the picture. What does the PICTURE show that the words do NOT say?', opts: ['🟡 Yellow dust on the bat\'s nose', '🌵 A tall cactus', '❄️ Snow on the sand'], picture: true, mishap: 'Hmm, the words already tell that, or it is not in the picture. Look closely at the bat!' },
          q: 'That yellow dust is pollen! Tap the sentence that tells how the bat helps the cactus.', a: 'helps the plant make seeds', mishap: 'Oops! I tried to sip nectar and got a flower stuck on my head like a hat. 🌼 Try again!' },
        advisor: { type: 'feel', q: 'How does Pip feel in the desert?', opts: ['🥵 Too hot', '🥶 Too cold', '😴 Sleepy'], evQ: 'How do you know? Tap the sentence that shows it.', a: ['hop from foot to foot'], mishap: 'Think about Pip\'s feet on the sand!' },
        fill: { kind: 'word', sent: 'At night, its white flowers ___ wide.', opts: ['open', 'often', 'oven'] },
        spell: { w: 'she', sent: '___ has big ears to help her stay cool.', split: 'sh[e]', pic: '🐇' }
      },
      sky: {
        title: 'Cake-Hot Sand and Night Flowers',
        targets: ['today', 'baked', 'plate', 'made', 'face', 'wait', 'saves', 'rain', 'came', 'stay', 'escape', 'waved'],
        model: {
          title: 'Magic e: a_e',
          lines: ['An e at the end is silent, but it has magic!', 'It jumps over one letter and makes the a say its name: cap → cape.'],
          ex: [{ w: 'c[a]k[e]', tag: 'a_e = /ā/' }, { w: 'bl[a]m[e]', tag: 'a_e = /ā/' }, { w: 'pl[a]t[e]', tag: 'a_e = /ā/' }, { w: 'es|c[a]p[e]', tag: 'a_e = /ā/' }]
        },
        sort: { a: 'a_e 🪄', b: 'ai 🟡', items: [['cake', 'a'], ['rain', 'b'], ['blame', 'a'], ['wait', 'b']], hint: 'Is there an e at the very end? That is magic e (a_e).' },
        build: { w: 'es|c[a]p[e]', tiles: ['es', 'cape', 'cap'], pic: '🏃', clue: 'Get away or get out.' },
        pick: { w: 'blame', opts: ['blame', 'blaim', 'blam'], pic: '👉', clue: 'Say something is someone\'s fault.', split: 'bl[a]m[e]' },
        hear: { w: 'plate', opts: ['plate', 'plait', 'plat'], pic: '🍽️', clue: 'You eat dinner on it.', split: 'pl[a]t[e]' },
        rebel: { words: ['have', 'cake', 'game', 'make'], why: '"have" has a magic e, but the a is short! Heart word ❤️.' },
        preview: [
          { w: 'saguaro', pic: '🌵', means: 'a giant cactus (say it: suh-WAR-oh)' },
          { w: 'nectar', pic: '🌼💧', means: 'sweet juice inside a flower' },
          { w: 'escape', pic: '🏃', means: 'get out' }
        ],
        chunks: [
          { s: ['Today I landed in the Sonoran Desert in Arizona.', 'The sun baked the sand until it was as hot as a plate on a stove!'], pic: '🔥', focus: '30% 85%', check: ['🐦🔥🦶', '🐦❄️🧤', '🐦🌧️☔'] },
          { s: ['I hopped from foot to foot and made a silly face.', 'I could not wait for the sun to go down.'], pic: '😝', focus: '20% 70%', check: ['🐦🦶🦶😝', '🐦😴🛏️', '🐦🍦😋'] },
          { s: ['A giant saguaro cactus stood nearby, as tall as a two-story house.', 'It saves rain inside its thick green stem, so it can last a long time with no rain.'], pic: '💧', focus: '62% 45%', check: ['🌵💧', '🌳🍎', '🌻🐝'] },
          { s: ['When night came, big white flowers opened at the top of the cactus.', 'A bat came to drink the sweet nectar.'], pic: '🌼', focus: '70% 20%', check: ['🦇🌼🌙', '🦇🍕', '🐝🌻☀️'] },
          { s: ['Then it flew to the next cactus to drink again, and that helps the cactus make seeds.', 'Under a bush, a jackrabbit waved its giant ears.', 'Big ears let heat escape, so the rabbit can stay cool.'], pic: '🐇', focus: '20% 75%', check: ['🐇👂😎', '🐇🥕🏠', '🐇🎩'] }
        ],
        question: { pre: { q: 'Look at the picture. What does the PICTURE show that the words do NOT say?', opts: ['🟡 Yellow dust on the bat\'s face', '🌼 White flowers on the cactus', '🐇 A jackrabbit'], picture: true, mishap: 'The words already tell about that. Look closely at the bat\'s face!' },
          q: 'That yellow dust is pollen! Tap the sentence that tells how the bat helps the cactus.', a: 'helps the cactus make seeds', mishap: 'Oops! I tried to sip nectar and got a flower stuck on my head like a hat. 🌼 Try again!' },
        advisor: { type: 'feel', q: 'How did Pip feel in the hot sun?', opts: ['🥵 Too hot', '🥶 Freezing', '😢 Lonely'], evQ: 'How do you know? Tap a sentence that shows it.', a: ['hopped from foot to foot', 'could not wait for the sun'], mishap: 'Look for what Pip did or wanted.' },
        fill: { kind: 'word', sent: 'The sun ___ the sand until it was as hot as a plate on a stove!', opts: ['baked', 'barked', 'boiled'] },
        spell: { w: 'came', sent: 'When night ___, big white flowers opened.', split: 'c[a]m[e]', pic: '🌙' }
      },
      space: {
        title: 'Surviving the Merciless Sun',
        targets: ['merciless', 'prepared', 'disappear', 'remarkable', 'unbothered', 'misjudged', 'enormous'],
        model: {
          title: 'Prefixes: pre-, mis-, dis-',
          lines: ['pre- means "before."  mis- means "wrongly."', 'dis- means "not" or "the opposite of."'],
          ex: [{ w: '[pre]|pare', tag: 'get ready before' }, { w: '[mis]|judge', tag: 'judge wrongly' }, { w: '[dis]|ap|pear', tag: 'opposite of appear' }]
        },
        sort: { a: 'pre- = before ⏪', b: 'mis- = wrongly ❌', items: [['preview', 'a'], ['mistake', 'b'], ['preheat', 'a'], ['misplace', 'b']], hint: 'Look at the first three letters.' },
        build: { w: '[dis]|ap|pear', tiles: ['dis', 'ap', 'pear', 'dys'], pic: '🫥', clue: 'Go out of sight.' },
        pick: { w: 'misjudged', opts: ['misjudged', 'missjuged', 'misjuged'], pic: '🤦', clue: 'Guessed wrong about something.', split: '[mis]|judged' },
        hear: { w: 'prepare', opts: ['prepare', 'perpare', 'prepair'], pic: '🎒', clue: 'Get ready ahead of time.', split: '[pre]|pare' },
        rebel: { words: ['dish', 'dislike', 'disagree', 'disappear'], why: 'In "dish," dis is not a prefix. There is no base word "h"!' },
        preview: [
          { w: 'merciless', pic: '☀️😖', means: 'without mercy; very harsh' },
          { w: 'prepared', pic: '🎒', means: 'ready ahead of time' },
          { w: 'release', pic: '🎈', means: 'let go' }
        ],
        chunks: [
          { s: ['Greetings from the Sonoran Desert in Arizona, where the afternoon sun is merciless.', 'The ground was so hot that I had to hop across it like it was a frying pan.'], pic: '🍳', focus: '30% 85%', check: ['🐦🔥🍳', '🐦❄️⛸️', '🐦🌊🏄'] },
          { s: ['Luckily, desert animals are prepared for the heat.', 'Many of them rest underground or in the shade during the day, and they disappear from sight until it cools off.'], pic: '🕳️', focus: '40% 80%', check: ['🦎🕳️😌', '🦎☀️🏖️', '🦎🎢'] },
          { s: ['The giant saguaro cactus is remarkable, because it can grow taller than a two-story house and live for more than one hundred fifty years.', 'When it rains, its pleated trunk swells like an accordion to store water for the dry months ahead.'], pic: '🪗', focus: '62% 45%', check: ['🌵💧🪗', '🌵🔥', '🌵❄️'] },
          { s: ['At night, its creamy white flowers open, and a lesser long-nosed bat arrives for a drink of sweet nectar.', 'Then the bat zooms off to the next cactus, and that visit helps the cactus make seeds and fruit.'], pic: '🌼', focus: '72% 20%', check: ['🦇🌼🌵', '🦇🍕', '🐝🌻☀️'] },
          { s: ['Nearby, a jackrabbit rested in the shade, looking completely unbothered by the heat.', 'Its enormous ears release extra body heat, so they work like built-in air conditioners.'], pic: '🐇', focus: '20% 75%', check: ['🐇👂❄️', '🐇🥕', '🐇🎩'] },
          { s: ['I misjudged how hot the rocks would be, so next time I will wear shoes!'], pic: '👟', focus: '85% 85%', check: ['🐦👟', '🐦🎩', '🐦🧤'] }
        ],
        question: { pre: { q: 'Look at the picture. What does the PICTURE show that the words do NOT say?', opts: ['🟡 Yellow pollen on the bat\'s face', '🌼 White flowers on the cactus', '🐇 A jackrabbit resting'], picture: true, mishap: 'The words already tell about that. Look closely at the bat\'s face!' },
          q: 'That dust is pollen, and it rides to the next flower. WHY does the bat\'s visit matter to the cactus? Tap the sentence.', a: 'that visit helps the cactus', mishap: 'Oops! I tried to carry pollen and sneezed so hard I flew backward. 🤧 Try again!' },
        advisor: { type: 'feel', q: 'How did Pip feel on the hot ground?', opts: ['🥵 Uncomfortable and too hot', '😌 Calm and cool', '😴 Sleepy'], evQ: 'How do you know? Tap a sentence that shows it.', a: ['like it was a frying pan', 'wear shoes'], mishap: 'Look for what Pip did with those feet!' },
        fill: { kind: 'word', sent: 'Luckily, desert animals are ___ for the heat.', opts: ['prepared', 'repaired', 'misplaced'] },
        spell: { w: 'release', sent: 'Its enormous ears ___ extra body heat.', split: '[re]|lease', pic: '🎈' }
      }
    }
  },
  /* ======================= THURSDAY ======================= */
  {
    day: 4, name: 'Thursday', place: 'Rainforest, Costa Rica', flag: '🇨🇷', scene: 'img/thu_rainforest.webp',
    qtype: 'Ask a question', atype: 'Would you rather...?',
    arrive: 'Pip is dripping wet in a rainforest!',
    wiggle: { emoji: '🐸', text: 'Freeze like a sleepy tree frog...', sub: 'Count to 5 without moving. Then POP your eyes open and leap!' },
    route: {
      q: 'Tomorrow I fly home to New Jersey. How should I travel?',
      opts: [
        { pic: '🌬️', label: 'Ride the wind', echo: 'I rode the wind, like you said. Whoosh! 🌬️' },
        { pic: '🚢', label: 'Hop on a ship', echo: 'I rode on a ship, like you said. The captain gave me a cracker! 🚢' }
      ]
    },
    ps: 'P.S. If you could make a tent out of anything, what would you use?',
    levels: {
      ground: {
        title: 'Tiny Bats in a Leaf Tent',
        targets: ['splashed', 'three', 'silent', 'opened', 'strong', 'squeaky', 'what'],
        model: {
          title: 'Three-letter blends',
          lines: ['Some words start with THREE consonants. Blend them fast!', 's + t + r = str.  s + p + l = spl.  t + h + r = thr.'],
          ex: [{ w: '[str]ong', tag: 'str' }, { w: '[spl]ash', tag: 'spl' }, { w: '[thr]ee', tag: 'thr' }, { w: '[squ]eak', tag: 'squ' }]
        },
        sort: { a: 'str 🧵', b: 'spl 💦', items: [['strong', 'a'], ['splash', 'b'], ['string', 'a'], ['split', 'b']], hint: 'Look at the first three letters.' },
        build: { w: '[thr]|ee', tiles: ['thr', 'ee', 'shr'], pic: '3️⃣', clue: 'The number after two.' },
        pick: { w: 'strong', opts: ['strong', 'stong', 'srong'], pic: '💪', clue: 'Very powerful.', split: '[str]ong' },
        hear: { w: 'splash', opts: ['splash', 'spash', 'slpash'], pic: '💦', clue: 'What water does when you jump in.', split: '[spl]ash' },
        rebel: { words: ['put', 'jump', 'up', 'fun'], why: 'In "put," the u does not sound like the u in "jump." Heart word ❤️.' },
        preview: [
          { w: 'rainforest', pic: '🌳🌧️', means: 'a warm forest with lots and lots of rain' },
          { w: 'tent', pic: '⛺', means: 'a little shelter you can sleep under' },
          { w: 'hide', pic: '🙈', means: 'stay where no one can see you' }
        ],
        chunks: [
          { s: ['I am in a green rainforest in Costa Rica.', 'It rains so much that I got splashed three times!'], pic: '🌧️', focus: '15% 30%', check: ['🐦🌧️💦', '🐦☀️🏜️', '🐦❄️'] },
          { s: ['I spotted a big leaf that was bent down like a tent.', 'Under it, I saw tiny white bats with yellow noses!'], pic: '⛺', focus: '50% 40%', check: ['🍃⛺🦇', '🌵🦇', '🏠🐶'] },
          { s: ['These bats bite the leaf so it bends.', 'The leaf tent keeps the rain off and hides them.', 'They stay silent all day.'], pic: '🍃', focus: '50% 30%', check: ['🦇🍃☔', '🦇🍕', '🦇🏊'] },
          { s: ['Next to me, a green frog opened its bright red eyes.', 'What a strong stare!', 'It startled me so much that I let out a squeaky peep.'], pic: '🐸', focus: '78% 72%', check: ['🐸👀🐦😲', '🐸🎤', '🐸🛁'] }
        ],
        question: { pre: { q: 'Pip wants to ask a question that the postcard CAN answer. Which one?', opts: ['❓ Why do the bats bend the leaf?', '❓ What are the bats\' names?', '❓ How old is the frog?'], mishap: 'The postcard does not tell us that. Pick a question the postcard can answer!' },
          q: 'Great question! Tap the sentence that answers it.', a: 'keeps the rain off', mishap: 'Oops! I tried to make a leaf tent and it fell on my head. 🍃 Try again!' },
        advisor: { type: 'rather', q: 'Would you rather be a tiny white bat or a red-eyed frog?', choices: [
          { label: '🦇 Tiny white bat', q: 'Pick a reason from the postcard:', reasons: ['I could hide in a leaf tent.', 'I could swim in the ocean.'] },
          { label: '🐸 Red-eyed frog', q: 'Pick a reason from the postcard:', reasons: ['I could open bright red eyes.', 'I could fly to the moon.'] }
        ], mishap: 'That is fun, but the postcard does not say it! Pick a reason from the postcard.' },
        fill: { kind: 'word', sent: 'It rains so much that I got splashed ___ times!', opts: ['three', 'throw', 'shrub'] },
        spell: { w: 'open', sent: 'A green frog will ___ its bright red eyes.', split: 'o|pen', pic: '👀' }
      },
      sky: {
        title: 'A Great Place to Take a Break',
        targets: ['today', 'rains', 'day', 'great', 'break', 'place', 'away', 'makes', 'stayed'],
        model: {
          title: 'Open a, and a sneaky ea',
          lines: ['A|pril: the first part is open, so the A says its name.', 'Usually ea says /ē/ (eat). But in break and great, ea says /ā/!'],
          ex: [{ w: '[A]|pril', tag: 'open a' }, { w: 'br[ea]k', tag: 'ea = /ā/' }, { w: 'gr[ea]t', tag: 'ea = /ā/' }]
        },
        sort: { a: 'Long a 🅰️', b: 'Short a 🍎', items: [['great', 'a'], ['nap', 'b'], ['April', 'a'], ['flag', 'b']], hint: 'Does the a say its name (long) or /a/ like apple (short)?' },
        build: { w: '[A]|pril', tiles: ['A', 'pril', 'Ap'], pic: '🌷', clue: 'The month after March.' },
        pick: { w: 'great', opts: ['great', 'grate', 'grait'], pic: '🌟', clue: 'Super good!', split: 'gr[ea]t' },
        hear: { w: 'break', opts: ['break', 'brake', 'braik'], pic: '☕', clue: 'A short rest.', split: 'br[ea]k' },
        rebel: { words: ['great', 'eat', 'bean', 'seat'], why: 'In "great," ea says /ā/. In eat, bean and seat, ea says /ē/!' },
        preview: [
          { w: 'rainforest', pic: '🌳🌧️', means: 'a warm forest with lots of rain' },
          { w: 'surprised', pic: '😮', means: 'shocked by something you did not expect' },
          { w: 'hungry animals', pic: '🦉🐍', means: 'animals that might want to eat you' }
        ],
        chunks: [
          { s: ['Today I am in a rainforest in Costa Rica, and it rains every day.', 'Drip, drop, splash, the rain makes a great big puddle on every leaf!'], pic: '🌧️', focus: '15% 30%', check: ['🐦🌧️💦', '🐦☀️🏜️', '🐦❄️'] },
          { s: ['I needed a break from the rain, so I looked for a dry place.', 'I found a big green leaf bent down like a little tent.'], pic: '⛺', focus: '50% 30%', check: ['🍃⛺', '🏠🚪', '🚗☔'] },
          { s: ['Under the tent were six tiny white bats with yellow noses!', 'These bats chew along the middle of the leaf until it folds down.'], pic: '🦇', focus: '50% 50%', check: ['🦇🦇🦇🍃', '🐧🐧🐧', '🐝🐝🌻'] },
          { s: ['The leaf tent keeps the rain away and hides them from hungry animals.', 'Sunlight shines through the leaf, so their white fur looks green.'], pic: '💚', focus: '50% 45%', check: ['🦇💚🍃', '🦇❤️🎈', '🦇⬛🌙'] },
          { s: ['Next to me, a tree frog opened its bright red eyes and stared at me.', 'I was so surprised that I fell off my branch.', 'Luckily, I landed on a soft plant and stayed there!'], pic: '🐸', focus: '78% 72%', check: ['🐸👀🐦😲', '🐸🎤', '🐸🛁'] }
        ],
        question: { pre: { q: 'Which question can this postcard answer?', opts: ['❓ Why does the bats\' white fur look green?', '❓ How many teeth does a bat have?', '❓ What is the frog\'s name?'], mishap: 'The postcard does not tell us that. Pick a question it CAN answer!' },
          q: 'Great question! Tap the sentence that answers it.', a: 'Sunlight shines through', mishap: 'Oops! I tried to turn green like the bats and just turned soggy. 💦 Try again!' },
        advisor: { type: 'rather', q: 'Would you rather be a tiny white bat or a red-eyed tree frog?', choices: [
          { label: '🦇 Tiny white bat', q: 'Pick a reason from the postcard:', reasons: ['A leaf tent would keep the rain away.', 'I could live in the snow.'] },
          { label: '🐸 Red-eyed tree frog', q: 'Pick a reason from the postcard:', reasons: ['I could open bright red eyes.', 'I could bake a cake.'] }
        ], mishap: 'That is silly fun, but the postcard does not say it! Pick a reason from the postcard.' },
        fill: { kind: 'word', sent: 'I needed a break from the rain, so I looked for a dry ___.', opts: ['place', 'plate', 'plane'] },
        spell: { w: 'rain', sent: 'I needed a break from the ___.', split: 'r[ai]n', pic: '🌧️' }
      },
      space: {
        title: 'Camouflage Under a Leaf',
        targets: ['imaginable', 'protection', 'discovered', 'remarkable', 'location', 'comfortable', 'incredible', 'camouflage'],
        model: {
          title: 'Suffixes: -tion and -able',
          lines: ['-tion sounds like "shun." It often turns an action into a thing: protect → protection.', '-able means "can be": comfort → comfortable.'],
          ex: [{ w: 'pro|tec|[tion]', tag: '/shun/' }, { w: 'lo|ca|[tion]', tag: '/shun/' }, { w: 'com|fort|[a]|[ble]', tag: 'can be' }]
        },
        sort: { a: '-tion 🏷️', b: '-able ✅', items: [['protection', 'a'], ['comfortable', 'b'], ['location', 'a'], ['imaginable', 'b']], hint: 'Look at the last letters.' },
        build: { w: 'lo|ca|[tion]', tiles: ['lo', 'ca', 'tion', 'shun'], pic: '📍', clue: 'A place or spot.' },
        pick: { w: 'protection', opts: ['protection', 'protecshun', 'protektion'], pic: '🛡️', clue: 'Something that keeps you safe.', split: 'pro|tec|[tion]' },
        hear: { w: 'comfortable', opts: ['comfortable', 'comfterble', 'comfortible'], pic: '🛋️', clue: 'Cozy and relaxed.', split: 'com|fort|[a]|[ble]' },
        rebel: { words: ['onion', 'station', 'nation', 'motion'], why: '"onion" ends in -ion, but not -tion. It does not say "shun"!' },
        preview: [
          { w: 'camouflage', pic: '🦎🌿', means: 'colors that help an animal blend in (say it: CAM-uh-flahzh)' },
          { w: 'predator', pic: '🦅', means: 'an animal that hunts other animals' },
          { w: 'downpour', pic: '🌧️', means: 'a lot of rain all at once' }
        ],
        chunks: [
          { s: ['Today I explored a rainforest in Costa Rica, where it rains so often that the air feels like a warm, wet towel.', 'The trees are covered with vines, moss, and flowers of every color imaginable.'], pic: '🌺', focus: '15% 50%', check: ['🌳🌺🌧️', '🏜️🌵', '❄️🐧'] },
          { s: ['When a sudden downpour started, I searched for protection.', 'Under a large leaf folded like a tent, I discovered a remarkable surprise.'], pic: '⛺', focus: '50% 30%', check: ['🐦🍃⛺', '🐦🏠', '🐦☂️'] },
          { s: ['Six tiny Honduran white bats were clinging to the underside of the leaf, and each one was smaller than my {part}.', 'Their fluffy white fur and bright yellow noses made them look like cotton balls wearing party hats.'], pic: '🥳', focus: '50% 50%', check: ['🦇🦇🦇🍃', '🐧🐧🐧', '🐑🐑🐑'] },
          { s: ['These bats nibble along the middle vein of the leaf until it droops down into a tent.', 'The tent gives them protection from the rain and keeps them hidden from predators.'], pic: '🍃', focus: '50% 30%', check: ['🦇🍃☔', '🦇🍕', '🦇🏊'] },
          { s: ['When sunlight shines through the leaf, their white fur glows green, which is incredible camouflage.', 'It is the perfect, comfortable location for a nap.'], pic: '💚', focus: '50% 45%', check: ['🦇💚🍃', '🦇❤️🎈', '🦇⬛🌙'] },
          { s: ['Next to me, a red-eyed tree frog suddenly opened its eyes, and I was so startled that I lost my balance.', 'Scientists think the frog flashes its red eyes to surprise hungry animals, which gives it time to leap away.'], pic: '🐸', focus: '78% 72%', check: ['🐸👀💨', '🐸🎤', '🐸🛁'] }
        ],
        question: { pre: { q: 'Which WHY question can this postcard answer?', opts: ['❓ Why does the frog flash its red eyes?', '❓ Why do bats like cake?', '❓ Why is the rainforest cold?'], mishap: 'The postcard does not answer that one. Try again!' },
          q: 'Great question! Tap the sentence that answers it.', a: 'flashes its red eyes', mishap: 'Oops! I tried to flash MY eyes and my goggles fogged up. 🥽 Try again!' },
        advisor: { type: 'rather', q: 'Would you rather have a leaf tent or a frog\'s red-eye trick?', choices: [
          { label: '🍃 A leaf tent', q: 'Pick a reason from the postcard:', reasons: ['It gives protection from rain and hides you.', 'It has a comfy bed and a TV.'] },
          { label: '🐸 The red-eye trick', q: 'Pick a reason from the postcard:', reasons: ['It surprises hungry animals so you can leap away.', 'It helps you see in outer space.'] }
        ], mishap: 'Fun idea, but the postcard does not say it! Pick a reason from the postcard.' },
        fill: { kind: 'word', sent: 'Under a large leaf folded like a tent, I discovered a ___ surprise.', opts: ['remarkable', 'removable', 'remember'] },
        spell: { w: 'location', sent: 'It is the perfect, comfortable ___ for a nap.', split: 'lo|ca|[tion]', pic: '📍' }
      }
    }
  },
  /* ======================= FRIDAY ======================= */
  {
    day: 5, name: 'Friday', place: 'A barn in New Jersey', flag: '🏠', scene: 'img/fri_barn.webp',
    qtype: 'Compare two postcards', atype: 'Predict: what will Pip see next?',
    arrive: 'Pip flew home to New Jersey!',
    compareWith: 1,
    wiggle: { emoji: '🤗', text: 'Penguin huddle!', sub: 'Give your grown-up a big, warm hug (or squeeze a pillow).' },
    route: {
      q: 'Next week I go to a green valley! How should I get there?',
      opts: [
        { pic: '🎈', label: 'Hot air balloon', echo: 'I rode in a hot air balloon, like you said. What a view! 🎈' },
        { pic: '🚲', label: 'Pedal a bike', echo: 'I pedaled a tiny bike, like you said. My legs are tired! 🚲' }
      ]
    },
    ps: 'P.S. Penguins or bats: which home would you pick? Why?',
    radio: {
      title: 'Pip\'s Radio Hour: The Great Huddle',
      parts: ['Pip', 'Pebble the Penguin', 'Luna the Bat'],
      lines: [
        ['Pip', 'Beep beep! This is Pip, live from an old red barn in New Jersey!'],
        ['Pebble the Penguin', 'And this is Pebble, live from my snow hill! Brrr!'],
        ['Pip', 'Today we have a special guest. She is a little brown bat. Say hi, Luna!'],
        ['Luna the Bat', 'Hi! Um, can you talk softer? I am upside down, and I just woke up.'],
        ['Pebble the Penguin', 'Upside down? Is that a problem?'],
        ['Luna the Bat', 'No! Bats hang upside down all the time. It is how we rest.'],
        ['Pip', 'Pebble, you live on the ice. Luna lives in a barn. What is the same?'],
        ['Pebble the Penguin', 'Hmm. We penguins squeeze close in a huddle to stay warm.'],
        ['Luna the Bat', 'We bats do that too! We hang close in a big group.'],
        ['Pip', 'And what is different?'],
        ['Luna the Bat', 'I can fly, and I hunt bugs at night. I listen for echoes to find them.'],
        ['Pebble the Penguin', 'I cannot fly. But I can swim, and I love to eat fish!'],
        ['Pip', 'Luna, where will you go when it gets cold?'],
        ['Luna the Bat', 'When the bugs are gone, I will go to a cave and sleep until spring.'],
        ['Pebble the Penguin', 'Can I come? I like caves!'],
        ['Luna the Bat', 'A cave is too warm for you, Pebble. You need the ice!'],
        ['Pip', 'That is all for today. This is Pip...'],
        ['ALL', '...signing off! Over and out!']
      ]
    },
    levels: {
      ground: {
        title: 'Home Sweet Barn',
        targets: ['no', 'problem', 'go', 'spring', 'napkin', 'silent', 'want', 'is'],
        model: {
          title: 'Heart words ❤️',
          lines: ['Some words do not follow the rules.', 'We learn the tricky part by heart!'],
          ex: [{ w: 'h[a]ve', tag: 'a is short' }, { w: '[o]ne', tag: 'sounds like "wun"' }, { w: 'wh[a]t', tag: 'a says /u/' }, { w: 'p[u]t', tag: 'u says /oo/' }]
        },
        sort: { a: 'Open 🚪', b: 'Closed 🔒', items: [['she', 'a'], ['prob', 'b'], ['go', 'a'], ['nap', 'b']], hint: 'Is there a consonant after the vowel? Then the door is closed.' },
        build: { w: 'prob|lem', tiles: ['prob', 'lem', 'prod'], pic: '🤔', clue: 'Something that goes wrong.' },
        pick: { w: 'napkin', opts: ['napkin', 'napkim', 'nepkin'], pic: '🧻', clue: 'You wipe your mouth with it.', split: 'nap|kin' },
        hear: { w: 'want', opts: ['want', 'wont', 'whant'], pic: '🙏', clue: 'I ___ a snack! (a heart word)', split: 'w[a]nt' },
        rebel: { words: ['what', 'cat', 'hat', 'bat'], why: '"what" breaks the rule! The a does not say /a/ like in cat. Heart word ❤️.' },
        preview: [
          { w: 'barn', pic: '🏚️', means: 'a big farm building' },
          { w: 'mine', pic: '⛏️', means: 'a deep tunnel dug into the ground' },
          { w: 'valley', pic: '🏞️', means: 'low land between hills' }
        ],
        chunks: [
          { s: ['I flew all the way home to New Jersey.', 'In an old red barn, I found little brown bats!'], pic: '🏚️', focus: '50% 50%', check: ['🏚️🦇', '🏖️🦀', '🏔️🐐'] },
          { s: ['The bats hang close together in a big, silent group.', 'Staying close keeps them warm, just like the penguins in their huddle.'], pic: '🤗', focus: '50% 35%', check: ['🦇🦇🦇🤗', '🦇  ·  ·  🦇', '🦇🏊'] },
          { s: ['In the winter, there are no bugs to eat, and that is a big problem.', 'So they go to a cave or an old mine and sleep until spring.'], pic: '😴', focus: '30% 60%', check: ['🦇😴🕳️', '🦇🍕', '🦇🏖️'] },
          { s: ['Penguins stay on the ice, but these bats move to a cozy winter home and come back to the barn in spring.', 'Next week, I will {go} to a green valley, and I smell cake!', 'But first I want a nap in my napkin.'], pic: '🍰', focus: '80% 40%', check: ['🐦😴🧻', '🐦🏃', '🐦🎸'] }
        ],
        question: { pre: { q: 'Think about Monday\'s penguins and today\'s bats. What is the SAME?', opts: ['🤗 They stay close to keep warm', '✈️ They both fly', '🧊 They both live on ice'], mishap: 'Hmm, is that true for BOTH? Penguins cannot fly, and bats do not live on ice!' },
          q: 'Tap the sentence in today\'s postcard that tells WHY the bats stay close.', a: 'Staying close keeps them warm', mishap: 'Oops! I tried to hang upside down like a bat and my goggles fell off. 🥽 Try again!' },
        advisor: { type: 'predict', q: 'What will Pip see next week?', opts: ['🍰 A green valley with cake', '🧊 More ice', '🌋 A volcano'], evQ: 'Tap the clue in the postcard.', a: ['green valley'], mishap: 'Look for a clue about next week!' },
        fill: { kind: 'word', sent: 'In the winter, there are ___ bugs to eat.', opts: ['no', 'on', 'now'] },
        spell: { w: 'problem', sent: 'No bugs to eat is a big ___.', split: 'prob|lem', pic: '🤔' }
      },
      sky: {
        title: 'Same and Different',
        targets: ['today', 'grapes', 'same', 'stay', 'gray', 'place', 'great', 'cake', 'wait', 'plate'],
        model: {
          title: 'Long a team-up review',
          lines: ['ai in the middle, ay at the end, a_e with magic e.', 'They ALL say /ā/!'],
          ex: [{ w: 'r[ai]n', tag: 'ai' }, { w: 'gr[ay]', tag: 'ay' }, { w: 'c[a]k[e]', tag: 'a_e' }, { w: 'gr[ea]t', tag: 'sneaky ea' }]
        },
        sort: { a: 'Long a 🅰️', b: 'Short vowel 🔒', items: [['plate', 'a'], ['napkin', 'b'], ['gray', 'a'], ['dentist', 'b']], hint: 'Listen for /ā/. Do you see ai, ay, or a_e?' },
        build: { w: 'hi|ber|nate', tiles: ['hi', 'ber', 'nate', 'nat'], pic: '😴', clue: 'Sleep deeply all winter.' },
        pick: { w: 'paint', opts: ['paint', 'pante', 'paynt'], pic: '🎨', clue: 'You use it to color a picture.', split: 'p[ai]nt' },
        hear: { w: 'chain', opts: ['chain', 'chane', 'cain'], pic: '⛓️', clue: 'Metal rings hooked together.', split: 'ch[ai]n' },
        rebel: { words: ['said', 'April', 'play', 'great'], why: '"said" does not say /ā/. It says /sed/! Heart word ❤️.' },
        preview: [
          { w: 'hibernate', pic: '😴❄️', means: 'sleep very deeply all winter' },
          { w: 'rafters', pic: '🏚️', means: 'the wood beams under a roof' },
          { w: 'travel', pic: '🧳', means: 'go from one place to another' }
        ],
        chunks: [
          { s: ['I flew all the way back to New Jersey today.', 'Inside an old red barn, I found a group of little brown bats.'], pic: '🏚️', focus: '50% 50%', check: ['🏚️🦇', '🏖️🦀', '🏔️🐐'] },
          { s: ['They hang close together in the rafters, snug as a bunch of grapes.', 'Staying close keeps them warm, the same way the penguins stay warm in their huddle.'], pic: '🍇', focus: '50% 35%', check: ['🦇🦇🦇🍇', '🦇  ·  ·  🦇', '🦇🏊'] },
          { s: ['In the fall, it gets too cold for bugs, so soon the bats will have nothing to eat.', 'They will fly to a cave or an old mine and hibernate until spring.'], pic: '🕳️', focus: '30% 60%', check: ['🦇😴🕳️', '🦇🍕', '🦇🏖️'] },
          { s: ['When a bat hibernates, its body gets cold and its heart beats very slowly.', 'The bats hang in tight groups there, too, like a gray blanket on the wall.'], pic: '💤', focus: '40% 50%', check: ['🦇🦇💤', '🦇🎉', '🦇🏃'] },
          { s: ['Penguins stay on the ice all winter, but these bats travel to a new place for the winter and come back to the barn in spring.', 'Next week, I will visit a green valley, and I heard there is a great big cake!', 'I will wait by the door with a plate.'], pic: '🍰', focus: '80% 40%', check: ['🐦🍽️🍰', '🐦🏃', '🐦🎸'] }
        ],
        question: { pre: { q: 'Think about Monday\'s penguins and today\'s bats. What is DIFFERENT?', opts: ['🧳 Bats travel to a new place for winter, but penguins stay', '🤗 Both stay close to keep warm', '🐣 Both are babies'], mishap: 'That is the SAME for both, or not true! Look for a difference.' },
          q: 'Tap the sentence in today\'s postcard that shows the difference.', a: 'these bats travel to a new place', mishap: 'Oops! I tried to travel with the bats and got lost in a hay pile. 🌾 Try again!' },
        advisor: { type: 'predict', q: 'What will Pip see next week?', opts: ['🍰 A green valley with a cake', '❄️ More penguins', '🏖️ A beach'], evQ: 'Tap the clue in the postcard.', a: ['great big cake'], mishap: 'Look for a clue about next week!' },
        fill: { kind: 'word', sent: 'Staying close keeps them warm, the ___ way the penguins stay warm.', opts: ['same', 'some', 'sale'] },
        spell: { w: 'great', sent: 'I heard there is a ___ big cake!', split: 'gr[ea]t', pic: '🌟' }
      },
      space: {
        title: 'Two Habitats, One Smart Trick',
        targets: ['returned', 'discovered', 'disappear', 'hibernation', 'unbelievably', 'completely', 'clustering'],
        model: {
          title: 'Chunking long words',
          lines: ['Long word? Break it into chunks. Find the prefix, the suffix, and the vowels.', 'Read each chunk, then glue them together!'],
          ex: [{ w: 'hi|ber|na|[tion]', tag: '4 chunks' }, { w: 'e|cho|lo|ca|[tion]', tag: '5 chunks' }, { w: '[un]|be|liev|a|bly', tag: '5 chunks' }]
        },
        sort: { a: 'Has a prefix ⬅️', b: 'Has a suffix ➡️', items: [['return', 'a'], ['careful', 'b'], ['misjudge', 'a'], ['location', 'b']], hint: 'Is the extra part at the START (prefix) or the END (suffix)?' },
        build: { w: 'e|cho|lo|ca|[tion]', tiles: ['e', 'cho', 'lo', 'ca', 'tion'], pic: '🔊', clue: 'How bats find bugs in the dark.' },
        pick: { w: 'hibernation', opts: ['hibernation', 'hibernasion', 'hybernation'], pic: '😴', clue: 'A long, deep winter sleep.', split: 'hi|ber|na|[tion]' },
        hear: { w: 'completely', opts: ['completely', 'completly', 'compleatly'], pic: '✅', clue: 'Totally, all the way.', split: 'com|plete|[ly]' },
        rebel: { words: ['uncle', 'unhappy', 'unsafe', 'unkind'], why: 'In "uncle," un is not a prefix. "Cle" is not a word!' },
        preview: [
          { w: 'hibernation', pic: '😴❄️', means: 'a long, deep winter sleep' },
          { w: 'cluster', pic: '🍇', means: 'a tight bunch' },
          { w: 'migrate', pic: '🦢✈️', means: 'move far away when the season changes' }
        ],
        chunks: [
          { s: ['After a long flight, I returned to New Jersey, where the maple leaves are turning red and gold.', 'In the rafters of an old barn, I discovered a colony of little brown bats.'], pic: '🍁', focus: '50% 50%', check: ['🍁🏚️🦇', '🏖️🦀', '❄️🐧'] },
          { s: ['They were packed together in a fuzzy cluster, hanging upside down and sound asleep.', 'Clustering helps them share body heat, just like the emperor penguins in their huddle.'], pic: '🍇', focus: '50% 35%', check: ['🦇🦇🦇🍇', '🦇  ·  ·  🦇', '🦇🏊'] },
          { s: ['Soon, cold weather will make the insects disappear, and the bats will have nothing to eat.', 'Instead of taking a long trip like some birds, these bats will fly to a nearby cave or an old mine to hibernate.'], pic: '🕳️', focus: '30% 60%', check: ['🦇➡️🕳️', '🦇✈️🌴', '🦇🏠'] },
          { s: ['During hibernation, a bat\'s heartbeat slows down, and its body becomes almost as cold as the cave.', 'It lives on stored fat until spring, when the insects return and the bats come home to their barn.'], pic: '💤', focus: '40% 50%', check: ['🦇💤❄️', '🦇🎉', '🦇🏃'] },
          { s: ['Penguins and bats both stay close together to keep warm, but their habitats are completely different.', 'Emperor penguins spend their whole lives on the ice and in the icy ocean around Antarctica, while these bats move from barns in summer to caves in winter.'], pic: '⚖️', focus: '60% 40%', check: ['🐧🧊 ≠ 🦇🕳️', '🐧 = 🦇', '🐧🏜️'] },
          { s: ['I am unbelievably proud of this research, and I hope you are, too.', 'Next week I am heading to a green valley, and my {nose} is telling me that someone is baking a cake!'], pic: '🍰', focus: '80% 40%', check: ['🐦👃🍰', '🐦🌋', '🐦🚀'] }
        ],
        question: { pre: { q: 'How are the penguin and bat habitats DIFFERENT?', opts: ['🧊 Penguins stay on the ice and in the ocean; bats move from barns to caves', '🤗 Both stay close to keep warm', '🍰 Both eat cake'], mishap: 'That is the same for both, or not true! Look for a difference.' },
          q: 'Tap the sentence that explains the difference.', a: 'spend their whole lives', near: ['completely different'], nearText: 'Close! That sentence SAYS they are different. Find the one that explains HOW.', mishap: 'Oops! I tried to hibernate and snored so loud I woke up the bats. 😴 Try again!' },
        advisor: { type: 'predict', q: 'Where is Pip going next, and what might Pip find there?', opts: ['🏞️ A green valley with a cake', '🌋 A volcano', '🚀 The moon'], evQ: 'Tap the clue in the postcard.', a: ['heading to a green valley'], mishap: 'Look for a clue about next week!' },
        fill: { kind: 'word', sent: 'Soon, cold weather will make the insects ___.', opts: ['disappear', 'reappear', 'appear'] },
        spell: { w: 'hibernate', sent: 'These bats will fly to a cave to ___.', split: 'hi|ber|nate', pic: '😴' }
      }
    }
  }
  ]
};

/* ======================= BONUS: koalas (optional) =======================
   A bonus day. Its word work reuses Monday's (spaced review). (The parrot postcard was removed in v2.2.) */
(function () {
  const W = window.PIP_WEEKS['u1w2'];
  const mon = W.days[0].levels;
  const words = (lv) => { const m = mon[lv]; return { model: m.model, sort: m.sort, build: m.build, pick: m.pick, hear: m.hear, rebel: m.rebel }; };
  const koala = {
    day: 6, name: 'Bonus', short: 'Bonus', place: 'Eucalyptus forest, Australia', flag: '🇦🇺', scene: 'img/bonus_koala.webp',
    qtype: 'Key details', atype: 'Advisor', arrive: 'Pip landed in a eucalyptus forest in Australia!',
    wiggle: { emoji: '🐨', text: 'Hug a pretend tree like a koala and count to 10!', sub: 'Then stretch up tall!' },
    route: { q: 'Help me pick! Which way should I fly next?', opts: [
      { pic: '⛰️', label: 'Over the mountains', echo: 'I took the mountain way, like you said. So many fluffy clouds! ☁️' },
      { pic: '🌊', label: 'Along the coast', echo: 'I flew along the coast, like you said. I saw dolphins playing! 🐬' }] },
    ps: 'P.S. Would you like to nap 20 hours a day like a koala? Tell me why!',
    levels: {
      ground: Object.assign(words('ground'), {
        title: 'Sleepy Koalas in the Trees',
        targets: ['is', 'one', 'what', 'want', 'have', 'the'],
        preview: [{ w: 'eucalyptus', pic: '🌳🍃', means: 'a tree with minty leaves that koalas eat' }, { w: 'joey', pic: '🐨👶', means: 'a baby koala' }, { w: 'snug', pic: '🤗', means: 'cozy and warm' }],
        chunks: [
          { s: ['I landed in a eucalyptus forest in Australia.', 'The leaves smell fresh, like cough drops!'], pic: '🍃', focus: '20% 30%', check: ['🐦🌳🍃', '🐦❄️🐧', '🐦🏜️🌵'] },
          { s: ['Up in a tree, I met a koala with fuzzy gray fur and big round ears.', 'A koala is not a bear, but it is just as cute.'], pic: '🐨', focus: '50% 40%', check: ['🐨🌳', '🐻🍯', '🐧❄️'] },
          { s: ['Koalas eat the leaves of the eucalyptus tree.', 'The leaves have water in them, so koalas do not have to drink much.'], pic: '💧', focus: '50% 60%', check: ['🐨🍃', '🐨🍕', '🐨🍦'] },
          { s: ['Koalas nap for most of the day, up to twenty hours!', 'One mom had a baby, called a joey, snug on her back.', 'What a cozy ride! I want a nap too.'], pic: '😴', focus: '50% 50%', check: ['🐨😴💤', '🐨🏃💨', '🐨🎸'] }
        ],
        question: { q: 'Why do koalas not have to drink much? Tap the sentence that tells me.', a: 'have water in them', mishap: 'Oops! I offered a koala a glass of lemonade. It just kept snoozing! 😴 Try again!' },
        advisor: { type: 'mistake', pip: 'I think koalas are bears.', q: 'Pip made a mistake! Tap the sentence that proves Pip is wrong.', a: 'not a bear', mishap: 'Hmm, that sentence does not tell what a koala is. Try another, advisor!' },
        fill: { kind: 'word', sent: 'Koalas eat the ___ of the eucalyptus tree.', opts: ['leaves', 'loaves', 'lives'] },
        spell: { w: 'want', sent: 'I ___ a nap too.', split: 'want', pic: '😴' }
      }),
      sky: Object.assign(words('sky'), {
        title: 'Safe and Snug in the Gum Trees',
        targets: ['today', 'came', 'gray', 'stays', 'safe', 'day', 'awake', 'save', 'stay', 'great'],
        preview: [{ w: 'pouch', pic: '👜', means: 'a pocket of skin where a baby rides' }, { w: 'rarely', pic: '🤏', means: 'almost never' }, { w: 'energy', pic: '⚡', means: 'the power to move and do things' }],
        chunks: [
          { s: ['Today I came to a eucalyptus forest in eastern Australia.', 'The air smells fresh and minty, and the tall trees have smooth gray bark.'], pic: '🌳', focus: '20% 30%', check: ['🐦🌳🍃', '🐦🏖️☀️', '🐦❄️🐧'] },
          { s: ['High on a branch, I met a sleepy koala hugging the trunk.', 'Koalas are not bears at all, because a mother koala carries her baby in a pouch.'], pic: '🐨', focus: '50% 40%', check: ['🐨🌳🤗', '🐻🍯', '🐨🚗'] },
          { s: ['A koala baby is called a joey.', 'It stays safe in the pouch for about six months, and then it rides on its mom\'s back.'], pic: '👜', focus: '50% 50%', check: ['🐨👶👜', '🐨⚽', '🐨🍕'] },
          { s: ['Koalas munch eucalyptus leaves whenever they are awake.', 'The leaves give them most of the water they need, so they rarely drink.'], pic: '🍃', focus: '50% 30%', check: ['🐨🍃🍃', '🐨🍔', '🐨🍦'] },
          { s: ['Koalas sleep up to twenty hours a day to save energy.', 'I tried to stay up with them, but I took a great big nap on a branch instead!'], pic: '😴', focus: '60% 50%', check: ['🐦😴🌳', '🐦🏊', '🐦🎂'] }
        ],
        question: { pre: { q: 'What is this postcard MOSTLY about?', opts: ['🐨 How koalas live in the eucalyptus forest', '😴 Pip takes a nap', '🌬️ Minty air'], mishap: 'That is just one small part. What is MOST of the postcard about?' },
          q: 'Key detail: Where does a joey stay safe? Tap the sentence that tells me.', a: 'safe in the pouch', mishap: 'Oops! I looked for the joey in a bird nest. Koalas do not have nests! 🪹 Try again!' },
        advisor: { type: 'mistake', pip: 'Koalas drink lots of water every day.', q: 'Pip made a mistake! Tap the sentence that proves Pip is wrong.', a: 'rarely drink', mishap: 'Hmm, that one does not tell about drinking. Try another, advisor!' },
        fill: { kind: 'word', sent: 'The air smells fresh and minty, and the tall trees have smooth ___ bark.', opts: ['gray', 'grain', 'gate'] },
        spell: { w: 'today', sent: '___ I came to a eucalyptus forest in eastern Australia.', split: 'to|d[ay]', pic: '📅' }
      }),
      space: Object.assign(words('space'), {
        title: 'The Remarkable Koala',
        targets: ['location', 'discovered', 'powerful', 'incorrect', 'unusual', 'remarkably', 'careful', 'peaceful', 'thankful'],
        preview: [{ w: 'marsupial', pic: '🦘', means: 'an animal whose mom carries her baby in a pouch' }, { w: 'diet', pic: '🍽️', means: 'the food an animal usually eats' }, { w: 'disturb', pic: '🤫', means: 'bother or interrupt' }],
        chunks: [
          { s: ['Greetings from a eucalyptus forest in eastern Australia, my newest location!', 'The air smells so fresh and minty that it feels like breathing in a cough drop.'], pic: '🌿', focus: '20% 30%', check: ['🐦🌳🍃', '🐦🏖️☀️', '🐦❄️🐧'] },
          { s: ['High in a tree, I discovered a koala hugging a branch with its powerful arms and sharp claws.', 'Many people call it a koala bear, but that is incorrect, because koalas are marsupials, not bears.'], pic: '🐨', focus: '50% 40%', check: ['🐨💪🌳', '🐻🍯', '🐨🚲'] },
          { s: ['A marsupial mother carries her baby, called a joey, in a pouch.', 'After about six months, the joey grows big enough to ride on its mother\'s back, where it stays snug and safe.'], pic: '👜', focus: '50% 50%', check: ['🐨👶👜', '🐨🎈', '🐨🍕'] },
          { s: ['Koalas have an unusual diet: they eat almost nothing except eucalyptus leaves.', 'Because these leaves are tough and hold very little energy, koalas rest for up to twenty hours a day.'], pic: '🍃', focus: '50% 30%', check: ['🐨🍃😴', '🐨🍔🏃', '🐨🍦'] },
          { s: ['Surprisingly, the juicy leaves also supply most of the water a koala needs, so it rarely drinks.', 'Koalas even have fingerprints that look remarkably like yours!'], pic: '🖐️', focus: '60% 50%', check: ['🐨💧🍃', '🐨🥤', '🐨🚿'] },
          { s: ['I tried to be careful and quiet so I would not disturb their peaceful nap.', 'I felt thankful to watch them, and then I stayed on my branch to finish my report.'], pic: '🤫', focus: '70% 50%', check: ['🐦🤫😊', '🐦📣', '🐦🎺'] }
        ],
        question: { q: 'Cause and effect: WHY do koalas rest for up to twenty hours a day? Tap the sentence that tells the cause.', a: 'hold very little energy', mishap: 'Oops! I tried to wake a koala for a game of tag. It just yawned! 🥱 Look for "Because"!' },
        advisor: { type: 'feel', q: 'How did Pip feel watching the koalas?', opts: ['😊 Thankful and happy', '😡 Grumpy', '😱 Scared'], evQ: 'Tap the sentence that proves it.', a: ['felt thankful'], mishap: 'Look for a feeling word in the postcard!' },
        fill: { kind: 'word', sent: 'Koalas have an ___ diet: they eat almost nothing except eucalyptus leaves.', opts: ['unusual', 'unused', 'usual'] },
        spell: { w: 'careful', sent: 'I tried to be ___ and quiet.', split: 'care|[ful]', pic: '🤫' }
      })
    }
  };
  W.days.push(koala);
})();

/* ======================= VOCABULARY WORDS (focus: READING them) =======================
   Swap this block for the teacher's list any time. Meaning is easy for her, so each word gets ONE quick
   picture + a tiny caption; the practice is DECODING (reading the printed word and saying it right):
     1 "I do": Pip taps each colored chunk and says it slowly, then the whole word.
     2 "We do": chunks shown; she reads it aloud first, then taps Check to hear it and marks herself.
     3 "You do": the whole word, no chunks; she reads it, then checks.
   plus "Which word says ___?" (hear it, pick the print from look-alikes) and "Tricky part" cards.
   Vocab words are never spelled or typed.
   Fields:
     split  chunks with "|" between syllables; [..] = vowel pattern to highlight
     say    how Pip pronounces each chunk (same number of chunks as split). Leave out for one-chunk words.
     look   2 look-alike words for "Which word says ___?"
     tricky (optional) a part that doesn't sound like it looks: mark = word with the tricky part in [..],
            says = how it sounds, note = one short tip
     pic, means  one picture + a caption under 8 words */
(function () {
  const W = window.PIP_WEEKS['u1w2'];
  W.vocab = {
    // Ground: concrete Week 2 words
    flat: { misread: 'float', split: 'fl[a]t', look: ['float', 'flap'], pic: '📄', means: 'smooth, with no bumps' },
    forest: { misread: 'for-EEST', split: 'f[o]r|[e]st', say: 'for|est', look: ['frost', 'first'], pic: '🌲🌳', means: 'lots of trees' },
    shallow: { misread: 'shay-low', split: 'sh[a]l|l[ow]', say: 'shal|lo', look: ['swallow', 'shadow'], pic: '🦶💧', means: 'not deep' },
    beneath: { misread: 'ben-eeth', split: 'b[e]|n[ea]th', say: 'bee|neeth', look: ['between', 'breath'], pic: '⬇️📦', means: 'under' },
    explore: { misread: 'ex-plor-ee', split: '[e]x|pl[ore]', say: 'ex|plor', look: ['explode', 'expert'], pic: '🧭🔍', means: 'look around a new place' },
    season: { misread: 'see-sun', split: 's[ea]|s[o]n', say: 'see|zun', look: ['reason', 'seaside'], pic: '❄️🌸☀️🍂', means: 'winter, spring, summer, fall',
      tricky: { mark: 'sea[s]on', says: 'SEE-zun', note: 'The middle s sounds like z.' } },
    nature: { misread: 'nat-urr', split: 'n[a]|t[ure]', say: 'nay|cher', look: ['natural', 'mature'], pic: '🌿🐞', means: 'plants, animals, outdoors',
      tricky: { mark: 'na[ture]', says: 'NAY-cher', note: '"ture" says cher.' } },
    world: { misread: 'wor-led', split: 'w[or]ld', look: ['word', 'would'], pic: '🌍', means: 'the whole Earth',
      tricky: { mark: 'w[or]ld', says: 'wurld', note: 'After w, "or" says ur.' } },
    kinds: { misread: 'kins', split: 'k[i]nds', look: ['kids', 'kings'], pic: '🍎🍌🍇', means: 'types',
      tricky: { mark: 'k[i]nds', says: 'kynds', note: 'The i says its name.' } },
    grassland: { misread: 'grass-lend', split: 'gr[a]ss|l[a]nd', say: 'grass|land', look: ['grassy', 'garland'], pic: '🌾', means: 'land covered in grass' },
    // Sky: harder Week 2 words + Week 3 preview (concrete)
    allow: { misread: 'al-oh', split: '[a]l|l[ow]', say: 'uh|lau', look: ['alley', 'below'], pic: '👍✅', means: 'let someone do it',
      tricky: { mark: 'all[ow]', says: 'uh-LOU', note: '"ow" here says ow, like cow.' } },
    unique: { misread: 'un-ick-way', split: '[u]|n[ique]', say: 'you|neek', look: ['unite', 'antique'], pic: '🦄⭐', means: 'one of a kind',
      tricky: { mark: 'un[ique]', says: 'you-NEEK', note: '"ique" says eek.' } },
    tropical: { misread: 'troh-pee-cal', split: 'tr[o]p|[i]|c[al]', say: 'trop|ih|cull', look: ['topical', 'typical'], pic: '🌴☀️', means: 'hot and rainy' },
    'coral reef': { misread: 'core-al riff', split: 'c[o]r|[a]l |r[ee]f', say: 'kor|ul|reef', look: ['carol reef', 'coral beef'], pic: '🪸🐠', means: 'ocean home made of coral' },
    savannas: { misread: 'sav-an-nas', split: 's[a]|v[a]n|n[a]s', say: 'suh|van|uhz', look: ['bananas', 'savings'], pic: '🌾🌳🦒', means: 'grassy land, few trees' },
    cave: { misread: 'cav', split: 'c[a]v[e]', look: ['carve', 'have'], pic: '⛰️🕳️', means: 'a hole in a rocky hill' },
    valley: { misread: 'val-eye', split: 'v[a]l|l[ey]', say: 'val|lee', look: ['volley', 'alley'], pic: '🏞️', means: 'low land between hills',
      tricky: { mark: 'vall[ey]', says: 'VAL-ee', note: '"ey" at the end says ee.' } },
    stream: { misread: 'strim', split: 'str[ea]m', look: ['steam', 'scream'], pic: '💧〰️', means: 'a small river' },
    cage: { misread: 'cag', split: 'c[a]g[e]', look: ['cake', 'cape'], pic: '🔲', means: 'a box made of bars',
      tricky: { mark: 'ca[g]e', says: 'kayj', note: 'g before e says j.' } },
    attic: { misread: 'at-ike', split: '[a]t|t[i]c', say: 'at|tick', look: ['attack', 'antic'], pic: '🏠⬆️', means: 'room under the roof' },
    palms: { misread: 'pal-ems', split: 'p[al]ms', look: ['plums', 'palace'], pic: '🌴', means: 'tall trees, big leaves',
      tricky: { mark: 'pa[l]ms', says: 'pahmz', note: 'The l is quiet.' } },
    escaped: { misread: 'es-cap-ed', split: '[e]s|c[a]p[ed]', say: 'es|capt', look: ['escape', 'scraped'], pic: '🚪🏃', means: 'got out',
      tricky: { mark: 'escap[ed]', says: 'es-KAYPT', note: '"ed" says t here.' } },
    traveled: { misread: 'tra-veld', split: 'tr[a]v|[e]l[ed]', say: 'trav|eld', look: ['travels', 'tunneled'], pic: '🧳✈️', means: 'went on a trip',
      tricky: { mark: 'travel[ed]', says: 'TRAV-eld', note: '"ed" says d here.' } },
    // Space: long district words = great multisyllable decoding practice
    harshest: { misread: 'hairs-est', split: 'h[ar]sh|[e]st', say: 'harsh|est', look: ['harvest', 'hardest'], pic: '🥶🌬️', means: 'the most rough and hard' },
    averages: { misread: 'av-er-age-es', split: '[a]v|[er]|[a]g[es]', say: 'av|er|idges', look: ['average', 'advantages'], pic: '⚖️', means: 'is about, usually',
      tricky: { mark: 'avera[ge]s', says: 'AV-er-ij-iz', note: '"ge" says j.' } },
    advantage: { misread: 'ad-van-tag', split: '[a]d|v[a]n|t[age]', say: 'ad|van|tidge', look: ['adventure', 'advertise'], pic: '🏆', means: 'something that helps you',
      tricky: { mark: 'advant[age]', says: 'ad-VAN-tij', note: '"age" at the end says ij.' } },
    opportunity: { misread: 'op-por-tune-it', split: '[o]p|p[or]|t[u]|n[i]|t[y]', say: 'op|er|tune|ih|tee', look: ['opportunities', 'importantly'], pic: '🚪✨', means: 'a good chance' },
    domestic: { misread: 'dome-stick', split: 'd[o]|m[e]s|t[i]c', say: 'duh|mess|tick', look: ['dramatic', 'domino'], pic: '🐄🏡', means: 'tame, lives with people' },
    presence: { misread: 'pre-sence', split: 'pr[e]s|[e]n[ce]', say: 'prez|ence', look: ['present', 'prince'], pic: '👋', means: 'being there',
      tricky: { mark: 'pre[s]en[ce]', says: 'PREZ-ens', note: 's says z, and ce says s.' } },
    swayed: { misread: 'sway-ed', split: 'sw[ay][ed]', look: ['stayed', 'sprayed'], pic: '🌴↔️', means: 'moved side to side',
      tricky: { mark: 'sway[ed]', says: 'swayd', note: '"ed" just says d.' } },
    adapt: { misread: 'a-dap', split: '[a]|d[a]pt', say: 'uh|dapt', look: ['adopt', 'adult'], pic: '🦎🎨', means: 'change to fit in' },
    habitat: { misread: 'hab-it', split: 'h[a]b|[i]|t[a]t', say: 'hab|ih|tat', look: ['habit', 'hobbit'], pic: '🏡🌳', means: 'an animal\'s natural home' },
    shelter: { misread: 'shell-tur', split: 'sh[e]l|t[er]', say: 'shel|ter', look: ['shelf', 'shatter'], pic: '⛺', means: 'a safe, covered place' }
  };
  // Warm-up (easy wins first!): words she already knows from last week. Read the word, tap its picture.
  // Swap in a new list any time: w = word, pic = its picture, other = a clearly different picture.
  W.warmup = [  // Week 1 spelling list from her teacher
    { w: 'box', pic: '📦', other: '🌸' }, { w: 'this', pic: '👉', other: '🍕' }, { w: 'chest', pic: '🧰', other: '🐸' },
    { w: 'wet', pic: '💦', other: '🔥' }, { w: 'flag', pic: '🚩', other: '🍪' }, { w: 'him', pic: '👦', other: '🌳' },
    { w: 'jump', pic: '🦘', other: '🛏️' }, { w: 'run', pic: '🏃', other: '🪑' }, { w: 'shop', pic: '🏪', other: '🐟' },
    { w: 'stand', pic: '🧍', other: '🛌' }
  ];
  // "Type the word you hear": this week's spelling words + sight words. Pip says the word, then the sentence.
  // The caption shows the sentence with a blank (never the word), plus the picture, so it never depends on audio alone.
  W.typeWords = {
    ground: [
      { w: 'open', pic: '📖', sent: 'Open the book.' }, { w: 'that', pic: '👉', sent: 'I like that one.' }, { w: 'napkin', pic: '🧻', sent: 'Wipe your mouth with a napkin.' },
      { w: 'want', pic: '🍦', sent: 'I want ice cream.' }, { w: 'dentist', pic: '🦷', sent: 'The dentist checks my teeth.' }, { w: 'how', pic: '🤔', sent: 'How old are you?' },
      { w: 'have', pic: '🎒', sent: 'I have a bag.' }, { w: 'problem', pic: '🧩', sent: 'We can fix the problem.' }, { w: 'then', pic: '➡️', sent: 'First we eat, then we play.' },
      { w: 'down', pic: '⬇️', sent: 'Sit down, please.' }, { w: 'jump', pic: '🦘', sent: 'Frogs can jump.' }, { w: 'silent', pic: '🤫', sent: 'The room is silent.' },
      { w: 'one', pic: '1️⃣', sent: 'I have one nose.' }, { w: 'with', pic: '🤝', sent: 'Come with me.' }, { w: 'she', pic: '👧', sent: 'She has a red hat.' },
      { w: 'put', pic: '📥', sent: 'Put it in the box.' }, { w: 'den', pic: '🦊', sent: 'The fox naps in its den.' }, { w: 'what', pic: '❓', sent: 'What is that?' }
    ],
    sky: [
      { w: 'play', pic: '⚽', sent: "Let's play outside." }, { w: 'that', pic: '👉', sent: 'I like that one.' }, { w: 'paint', pic: '🎨', sent: 'I paint a sun.' },
      { w: 'great', pic: '👍', sent: 'You did a great job!' }, { w: 'mail', pic: '✉️', sent: 'Pip brings the mail.' }, { w: 'how', pic: '🤔', sent: 'How old are you?' },
      { w: 'break', pic: '🍪', sent: 'Break the cookie in half.' }, { w: 'cake', pic: '🎂', sent: 'We ate cake.' }, { w: 'then', pic: '➡️', sent: 'First we eat, then we play.' },
      { w: 'down', pic: '⬇️', sent: 'Sit down, please.' }, { w: 'chain', pic: '⛓️', sent: 'The bike has a chain.' }, { w: 'stay', pic: '🏠', sent: 'Stay with me.' },
      { w: 'blame', pic: '🐶', sent: 'Do not blame the dog.' }, { w: 'with', pic: '🤝', sent: 'Come with me.' }, { w: 'april', pic: '🌷', sent: 'Flowers bloom in April.', cap: 'April' }
    ],
    space: [
      { w: 'careful', pic: '⚠️', sent: 'Be careful on the ice.' }, { w: 'thought', pic: '💭', sent: 'I thought about it.' }, { w: 'fearless', pic: '🦁', sent: 'The lion is fearless.' },
      { w: 'mistake', pic: '✏️', sent: 'Everyone makes a mistake.' }, { w: 'crowd', pic: '👥', sent: 'The crowd cheered.' }, { w: 'return', pic: '↩️', sent: 'Return the book on Monday.' },
      { w: 'helpful', pic: '🤝', sent: 'Thanks for being so helpful.' }, { w: 'throw', pic: '⚾', sent: 'Throw the ball to me.' }, { w: 'disappear', pic: '🎩', sent: 'The bunny will disappear.' },
      { w: 'unusual', pic: '🦓', sent: 'A pink zebra is unusual.' }, { w: 'thankful', pic: '🙏', sent: 'I am thankful for you.' }, { w: 'preview', pic: '🎬', sent: 'We saw a preview of the movie.' }
    ]
  };
  // R practice (listening only; never grades her speech). Grown-ups can replace rWords in the grown-up area.
  // rPairs: R vs W picture pairs. rWords: R words with the guide's silly "oops" way of saying them.
  W.rPairs = [
    { r: 'ring', rp: '💍', w: 'wing', wp: '🪽' }, { r: 'rock', rp: '🪨', w: 'walk', wp: '🚶' }, { r: 'red', rp: '🟥', w: 'wed', wp: '💒' },
    { r: 'rake', rp: '🍂', w: 'wake', wp: '⏰' }, { r: 'right', rp: '➡️', w: 'white', wp: '⬜' }, { r: 'read', rp: '📖', w: 'weed', wp: '🌱' }
  ];
  W.rWords = [
    { w: 'forest', pic: '🌲', oops: 'fowest' }, { w: 'rabbit', pic: '🐰', oops: 'wabbit' }, { w: 'grassland', pic: '🌾', oops: 'gwassland' },
    { w: 'tree', pic: '🌳', oops: 'twee' }, { w: 'coral reef', pic: '🪸', oops: 'cowal weef' }, { w: 'red', pic: '🟥', oops: 'wed' },
    { w: 'world', pic: '🌍', oops: 'wuhld' }, { w: 'rain', pic: '🌧️', oops: 'wain' }, { w: 'tropical', pic: '🌴', oops: 'twopical' },
    { w: 'frog', pic: '🐸', oops: 'fwog' }, { w: 'problem', pic: '🧩', oops: 'pwoblem' }, { w: 'car', pic: '🚗', oops: 'cah' }
  ];
  // Sneaky words: sight words that don't follow the pattern. The WORD is sneaky, not her. [..] = the sneaky part.
  W.sneaky = [
    { w: 'said', mark: 's[ai]d', says: 'sed', note: 'Sneaky! "ai" says e here.', pic: '💬' },
    { w: 'one', mark: '[o]n[e]', says: 'wun', note: 'Sneaky! It starts with a w sound.', pic: '1️⃣' },
    { w: 'what', mark: 'wh[a]t', says: 'wut', note: 'Sneaky! "a" says u here.', pic: '❓' },
    { w: 'put', mark: 'p[u]t', says: 'poot (short, like book)', note: 'Sneaky! "u" says oo, like in book.', pic: '📥' },
    { w: 'want', mark: 'w[a]nt', says: 'wont', note: 'Sneaky! "a" says o here.', pic: '🍦' },
    { w: 'great', mark: 'gr[ea]t', says: 'grayt', note: 'Sneaky! "ea" says ay here.', pic: '👍' },
    { w: 'break', mark: 'br[ea]k', says: 'brayk', note: 'Sneaky! "ea" says ay here.', pic: '🍪' }
  ];
  // ONE optional Italian bonus postcard per week (unlocks after Friday). Kept completely separate from English:
  // its own card style, pick-the-picture only, no Italian spelling or typing. A grown-up can turn it off.
  W.italia = {
    place: 'Bacoli, a beach near Naples', region: 'Campania, Italy', scene: '🏖️🌋',
    postcard: ['Ciao from Italy!', 'I am at a sunny beach near Naples.', 'I can see boats, blue water, and a big volcano far away.', 'Can you teach me some Italian words?'],
    words: [
      { it: 'ciao', pic: '👋', en: 'hi / bye', others: ['🍕', '🌙'] },
      { it: 'mare', pic: '🌊', en: 'sea', others: ['🐴', '⛰️'] },
      { it: 'grazie', pic: '🙏', en: 'thank you', others: ['😴', '🚗'] }
    ]
  };
  // Extra "tricky part" words used on days when none of the day's words has a tricky part.
  W.trickyExtra = [
    { w: 'ocean', mark: 'o[ce]an', says: 'OH-shun', note: '"ce" says sh!', pic: '🌊' },
    { w: 'world', mark: 'w[or]ld', says: 'wurld', note: 'After w, "or" says ur.', pic: '🌍' }
  ];
  W.vocabByDay = {
    1: { ground: ['world', 'flat', 'kinds'], sky: ['unique', 'allow', 'traveled'], space: ['harshest', 'advantage', 'averages'] },
    2: { ground: ['explore', 'nature', 'beneath'], sky: ['cave', 'stream', 'attic'], space: ['presence', 'opportunity', 'adapt'] },
    3: { ground: ['season', 'grassland', 'flat'], sky: ['palms', 'valley', 'savannas'], space: ['shelter', 'adapt', 'averages'] },
    4: { ground: ['forest', 'shallow', 'beneath'], sky: ['tropical', 'coral reef', 'cage'], space: ['swayed', 'habitat', 'shelter'] },
    5: { ground: ['season', 'world', 'explore'], sky: ['escaped', 'traveled', 'valley'], space: ['domestic', 'advantage', 'presence'] },
    6: { ground: ['forest', 'explore', 'nature'], sky: ['tropical', 'unique', 'palms'], space: ['habitat', 'adapt', 'shelter'] }, // koala bonus day
    koala: { ground: ['forest', 'explore', 'nature'], sky: ['tropical', 'unique', 'palms'], space: ['habitat', 'adapt', 'shelter'] }
  };
  // Apply the plan: each level's "preview" becomes the 3 vocab words for that day.
  const apply = (day, plan) => ['ground', 'sky', 'space'].forEach((lv) => {
    day.levels[lv].preview = plan[lv].map((w) => Object.assign({ w }, W.vocab[w]));
  });
  W.days.forEach((d) => { if (W.vocabByDay[d.day]) apply(d, W.vocabByDay[d.day]); if (d.alt) apply(d.alt, W.vocabByDay.koala); });
  // Recall uses whole-word tiles only (no letter spelling): turn any letter-tile blank into whole-word tiles.
  const allLevels = W.days.flatMap((d) => [d, d.alt].filter(Boolean)).flatMap((d) => ['ground', 'sky', 'space'].map((lv) => d.levels[lv]));
  allLevels.forEach((L) => { const f = L.fill; if (f && f.kind === 'letters') L.fill = { kind: 'word', sent: f.sent, opts: f.opts.map((o) => f.pre + o + f.post) }; });
})();
