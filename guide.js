/* The guide: the child's mail-carrier friend. She picks one and types its name on the first screen.
   Everything about each guide lives here so a swap or a new guide is quick. Every guide is a girl
   (she/her) and uses the same friendly voice. "Pip" in any text is replaced with the guide's name,
   and {species} {part} {nose} {go} fill in species words. No parrots among guides (on purpose). */
window.PIP_GUIDES = {
  names: ['Pip', 'Penny', 'Coco', 'Luna', 'Bea', 'Skipper'],   // optional name ideas under the type box
  pronouns: { she: 'she', her: 'her', hers: 'hers' },
  // Pip's speaking voice: the device's best natural female en-US voice. Same for every guide.
  voice: { prefer: ['Samantha', 'Google US English', 'Ava', 'Allison', 'Aria', 'Jenny', 'Zira', 'Karen', 'Female'], pitch: 1.0, rate: 0.95 },
  // Fallback lines that work for any guide.
  generic: {
    mishaps: ['Oops, I read that one upside down! 🙃', 'Silly me, I was looking at a cloud! ☁️', 'Whoops, I sneezed and mixed them up! 🤧', 'Hmm, I think my glasses are foggy! 👓'],
    landing: ['Whoa, a big gust of wind! Let me try again. 🌬️', 'Oops, a little bump! I will try again. 💫', 'I did it! I kept trying, and I made it! 🎉'],
    landBtn: ['Help Pip arrive! 🛬', 'Try again, Pip! 💪', 'One more try! 🌟']
  },
  kinds: {
    pigeon: { label: 'Pigeon', species: 'pigeon', img: 'guides/pigeon/main.webp', icon: '🐦', part: 'wing', nose: 'beak', go: 'fly', travel: 'flies the mail across the sky',
      mishaps: ['Oops, a feather got in my eye! 🪶', 'Coo! I was counting my toes instead! 🐾', 'Silly me, I was chasing a crumb! 🍞'],
      landing: ['Whoa! A big gust blew me back up! 🌬️', 'Oops! I slid on my tail feathers! 🪶', 'I did it! I kept trying, and I landed! 🎉'] },
    puffin: { label: 'Puffin', species: 'puffin', img: 'guides/puffin/main.webp', icon: '🐧', part: 'wing', nose: 'beak', go: 'fly', travel: 'flaps fast over the sea (and crash-lands a lot!)',
      mishaps: ['Oops, I was looking at a fish! 🐟', 'Whoops, my beak bumped the page! 🧡', 'Silly me, sea spray on my eyes! 🌊'],
      landing: ['Flap flap... BOING! I bounced off a rock! 🪨', 'Flap flap... SPLASH! I landed in a puddle! 💦', 'Flap flap... I did it! Crash-landers never give up! 🎉'] },
    penguin: { label: 'Penguin explorer', species: 'penguin', img: 'guides/penguin/main.webp', icon: '🐧', part: 'flipper', nose: 'beak', go: 'travel', travel: 'can\'t fly, so she rides icebergs, boats and sleds',
      mishaps: ['Oops, my explorer hat slid over my eyes! 🎩', 'Whoops, I slipped on the ice! 🧊', 'Silly me, I was counting snowflakes! ❄️'],
      landing: ['Wheee! My sled went too fast and I zoomed past! 🛷', 'Oops! My iceberg boat bumped the shore! 🧊', 'I did it! I kept trying, and I made it here! 🎉'] },
    otter: { label: 'Sea otter', species: 'sea otter', img: 'guides/otter/main.webp', icon: '🦦', part: 'paw', nose: 'whiskers', go: 'float', travel: 'floats on her back with a backpack full of mail',
      mishaps: ['Oops, I was cracking a shell! 🐚', 'Whoops, my whiskers tickled my nose! 😆', 'Silly me, I floated the wrong way! 🌊'],
      landing: ['Oops! A wave rolled me the wrong way! 🌊', 'Whoops! I floated in a circle! 🔄', 'I did it! I kept paddling, and I made it! 🎉'] },
    fox: { label: 'Fox mail carrier', species: 'fox', img: 'guides/fox/main.webp', icon: '🦊', part: 'paw', nose: 'nose', go: 'ride', travel: 'rides her bike with a big mailbag',
      mishaps: ['Oops, my big ears flopped over my eyes! 👂', 'Whoops, I rang my bike bell by mistake! 🔔', 'Silly me, I was sniffing a flower! 🌼'],
      landing: ['Oops! My bike hit a bump! 🚲', 'Whoops! My mailbag tipped over! ✉️', 'I did it! I kept pedaling, and I made it! 🎉'] },
    turtle: { label: 'Sea turtle', species: 'sea turtle', img: 'guides/turtle/main.webp', icon: '🐢', part: 'flipper', nose: 'nose', go: 'swim', travel: 'swims slowly and never gives up',
      mishaps: ['Oops, I got sleepy for a second! 😴', 'Whoops, a little fish tickled me! 🐠', 'Silly me, I was hiding in my shell! 🐢'],
      landing: ['Paddle, paddle... a wave pushed me back! 🌊', 'Paddle, paddle... still going! Slow is OK! 🐢', 'I did it! Slow and steady, and I never gave up! 🎉'] }
  },
  order: ['pigeon', 'puffin', 'penguin', 'otter', 'fox', 'turtle'],
  /* POSES (Sue's artwork). Files live in site/guides/<kind>/, e.g. guides/puffin/cheer-1.webp.
     `art` lists the files for each pose slot (".webp" is added when a name has no extension, so
     "cheer-2.png" also works). Several files in one slot take turns so it never feels repetitive.
     A slot with no art uses `fallback` (in order), and finally the guide's main picture (`img`).
     Pattern for new art: one pose sheet row per guide, crop each figure, name it <slot>-<n>.webp by what she
     is doing: waving = hello, holding a letter/package = carry (or talk), arms up / flying = cheer, hearts = love,
     tumble / belly-slide = oops, map / dreamy = think, bike / swimming / floating with mail = ride, Zzz = sleep.
     'main' (the portrait) is reused in the talk rotation. Missing art right now: stretch (all, uses cheer),
     pigeon oops/think, puffin think, fox think, turtle oops, penguin/pigeon love (fallbacks cover them). */
  poses: {
    slots: ['hello', 'talk', 'cheer', 'oops', 'think', 'stretch', 'love', 'carry', 'sleep', 'ride'],
    fallback: {
      hello: ['cheer', 'talk'], talk: [], cheer: ['hello', 'love', 'talk'], oops: ['talk'], think: ['talk'],
      stretch: ['cheer', 'hello', 'talk'], love: ['cheer', 'talk'], carry: ['talk'], sleep: ['think', 'talk'], ride: ['carry', 'talk']
    },
    // Which pose each card starts in. Events also change it: a miss = oops, a win = cheer/love (taking turns),
    // "your turn to read" = think, the arrival card = ride, then carry when the postcard is delivered.
    byCard: {
      mail: 'ride', warm: 'talk', order: 'talk', model: 'talk', teach: 'talk', sneaky: 'talk', rebel: 'talk', preview: 'talk',
      decode: 'talk', chunk: 'think', question: 'talk', advisor: 'think', fill: 'think', says: 'think', hear: 'talk', type: 'think',
      sound: 'talk', rpair: 'think', rcatch: 'talk', challenge: 'talk', broadcast: 'think', radio: 'think', wiggle: 'stretch',
      route: 'ride', feed: 'love', thennow: 'love', italia: 'hello', sort: 'talk', build: 'talk', pick: 'talk', spell: 'think'
    },
    screens: { intro: 'hello', home: 'hello', end: 'sleep', parent: 'talk' },
    art: {
      pigeon: { hello: ['hello-1'], talk: ['talk-1', 'talk-2', 'main'], cheer: ['cheer-1'], carry: ['carry-1', 'carry-2'], sleep: ['sleep-1'], ride: ['cheer-1'], love: ['hello-1'] },
      puffin: { hello: ['talk-2'], talk: ['talk-1', 'talk-2', 'main'], cheer: ['cheer-1'], oops: ['oops-1'], love: ['love-1'], carry: ['carry-1'], sleep: ['sleep-1'], ride: ['ride-1'] },
      penguin: { hello: ['hello-1'], talk: ['talk-1', 'main'], cheer: ['cheer-1'], oops: ['oops-1'], think: ['think-1'], carry: ['carry-1'], sleep: ['sleep-1'], ride: ['ride-1'] },
      otter: { hello: ['hello-1'], talk: ['main', 'carry-1'], cheer: ['cheer-1'], oops: ['oops-1'], think: ['think-1'], love: ['love-1'], carry: ['carry-1'], sleep: ['sleep-1'], ride: ['ride-1'] },
      fox: { hello: ['hello-1'], talk: ['talk-1', 'main'], cheer: ['cheer-1'], oops: ['oops-1'], love: ['love-1'], carry: ['carry-1'], sleep: ['sleep-1'], ride: ['ride-1'] },
      turtle: { hello: ['hello-1'], talk: ['talk-1', 'main'], cheer: ['cheer-1'], think: ['think-1'], love: ['love-1'], carry: ['carry-1'], sleep: ['sleep-1'], ride: ['ride-1'] }
    }
  }
};
