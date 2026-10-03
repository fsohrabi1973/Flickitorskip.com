// Review data. To add a movie, copy one object in MOVIES and fill it in.
// rating is out of 5 (half stars allowed). color is the banner background behind the poster.
// Posters come from the TMDB image CDN (image.tmdb.org). TMDB's terms ask for attribution somewhere on the site.

var SITE = {
  updated: 'October 3, 2026',
  boxOfficeWeekend: 'Oct. 2-4'
};

var MOVIES = [
  {
    id: 'verity',
    title: 'Verity',
    status: '#1 at the box office',
    poster: 'https://image.tmdb.org/t/p/w500/Lr0Ng7Gg02RW1AyfYEL6P0WUvd.jpg',
    tmdbId: 1283515,
    director: 'Michael Showalter',
    cast: ['Dakota Johnson', 'Anne Hathaway', 'Josh Hartnett'],
    studio: 'Amazon MGM Studios',
    mpaa: 'R',
    runtime: '1h 55m',
    genres: ['Mystery', 'Thriller', 'Drama'],
    color: 'linear-gradient(135deg, #2a1a1a 0%, #5c2a2a 55%, #1a1a1a 100%)',
    rating: 2.5,
    headline: "A pulpy, tangled web of a thriller that's more about the game than the truth.",
    review: [
      "If you're looking for a high-brow psychological study, keep walking. But if you want a movie that feels like a glossy, high-stakes page-turner from a Colleen Hoover novel, Verity delivers exactly that. It's a guilty pleasure in the truest sense: vaguely illogical, highly dramatic, and completely absorbing.",
      "Dakota Johnson is great as Lowen, the struggling writer who finds herself in the middle of a domestic nightmare. She plays the uncertainty well, making you feel the creeping dread as she reads Verity's hidden autobiography. And then there's Anne Hathaway. Even when she's barely moving, she commands the screen, bringing a chilling presence to Verity that keeps you guessing about who the real monster is in the house.",
      "The movie leans hard into the 'erotic thriller' vibe of the 90s, which works for the most part. The tension between Lowen and Jeremy is palpable, and the twists come fast enough to keep you from questioning the plot holes too deeply. It's the kind of movie where you stop asking 'would this actually happen?' and just start asking 'what happens next?'",
      "Where it falters is in its third act. The resolution feels a bit rushed and simplifies some of the more interesting psychological threads the movie spent an hour building. It chooses a satisfying ending over a complex one, which might frustrate some, but for most, it'll be enough.",
      "It's not a masterpiece, and it's certainly not Gone Girl, but it's a blast of a ride. If you love pulpy mysteries and powerhouse performances, this is your kind of movie."
    ],
    bottomLine: "Vapid at times, but addictive throughout. A perfect 'guilty pleasure' watch.",
    scores: { rt: '34%', audience: '69%', metacritic: '45' },
    boxOffice: '$33M opening weekend'
  },
  {
    id: 'digger',
    title: 'Digger',
    status: '#2 at the box office',
    poster: 'https://image.tmdb.org/t/p/w500/1ATXKrIPJyKNwnJ6lcG088Sa6zi.jpg',
    tmdbId: 1248832,
    director: 'Alejandro G. Iñárritu',
    cast: ['Tom Cruise', 'John Goodman', 'Riz Ahmed', 'Sandra Hüller'],
    studio: 'Warner Bros.',
    mpaa: 'R',
    runtime: '2h 9m',
    genres: ['Satire', 'Comedy', 'Drama'],
    color: 'linear-gradient(135deg, #4a3a2a 0%, #8b6b4a 55%, #1a1a1a 100%)',
    rating: 3,
    headline: "Tom Cruise gives a career-best performance in a movie that's too loud for its own good.",
    review: [
      "I'll be honest: I went into Digger expecting a disaster movie. What I got was a movie about a disaster—both environmental and ego-driven. Alejandro G. Iñárritu has taken a massive swing here, attempting a Dr. Strangelove for the climate crisis, and while it doesn't always land, the effort is staggering.",
      "Tom Cruise is absolutely electric as Digger Rockwell. It's a performance of pure, unadulterated arrogance. He plays Digger not as a villain, but as a man who genuinely believes his own lies, and watching that delusion collide with a global catastrophe is the most entertaining part of the film. It's a transformative role that reminds you why Cruise is the biggest star in the world.",
      "The problem is that the movie is exhausting. It's loud, it's frantic, and the satire is often delivered with a sledgehammer rather than a scalpel. There are sequences that feel like they're trying too hard to be 'important,' and the meta-narrative with the play within the movie adds a layer of complexity that occasionally just feels like clutter.",
      "Still, the visual scale is immense. The imagery of the ice shelf collision is haunting and beautifully shot, providing a stark contrast to the frantic, claustrophobic energy of the political rooms. It's a movie that demands to be seen on a big screen, even if you spend half the time wanting to turn the volume down.",
      "Digger is a flawed, overstuffed, and frequently annoying movie, but it's also the most ambitious thing we've seen from Cruise in years. It's a bold misfire that's far more interesting than a safe success."
    ],
    bottomLine: "A chaotic, heavy-handed satire saved by a powerhouse lead performance.",
    scores: { rt: '52%', audience: '72%', metacritic: '45' },
    boxOffice: '$8.5M opening weekend'
  },
  {
    id: 'resident-evil',
    title: 'Resident Evil',
    status: '#3 at the box office',
    poster: 'https://image.tmdb.org/t/p/w500/i7UyjfPio0VFHB9rBUZSFyhOoM8.jpg',
    tmdbId: 1423191,
    director: 'Zach Cregger',
    cast: ['Austin Abrams', 'Zach Cherry', 'Kali Reis', 'Paul Walter Hauser', 'Sara Paxton'],
    studio: 'Columbia Pictures',
    mpaa: 'R',
    runtime: '1h 30m',
    genres: ['Horror', 'Action'],
    color: 'linear-gradient(135deg, #3a0d0d 0%, #8b1a1a 60%, #1a1a1a 100%)',
    rating: 4.5,
    headline: "Twenty-plus years of bad Resident Evil movies, and this is the one that finally gets it.",
    review: [
      "Let me be real with you. I did not expect to be writing a rave for a Resident Evil movie in 2026. This franchise has been rebooted so many times that the name alone used to make people groan. And yet here we are, with the best-reviewed movie in the whole series sitting at number one.",
      "Zach Cregger, the guy behind Barbarian, keeps it small and mean. Austin Abrams plays Bryan, a medical courier who just needs to drop a package at Raccoon City General, up in the snowy Colorado mountains. On the way in he hits someone with his car, and from there the night falls apart. There's an outbreak. There are things in the halls that used to be patients. And that package he's carrying turns out to be the one thing the doctors need to stop it. That's the whole movie: one guy, one hospital, one very bad night, done in about ninety minutes.",
      "What makes it work is that Cregger isn't trying to cram twenty years of game lore onto the screen. He's going after how those games feel. The dread before you open a door. Running low on ammo. Laughing because you're scared. Most of the monsters are practical effects, not CGI, and the creature work goes to some seriously gross places. You don't need to have played a single game to get it.",
      "Abrams plays a regular guy who is completely out of his depth. He talks to himself the whole way through, which is exactly what any of us would do, and it makes him easy to root for. Sara Paxton only shows up as a voice on the phone, and she still manages to rattle you.",
      "My one knock: the last stretch piles on so much action that it starts to wear you out, and if you want slow-burn scares, this leans more fun than frightening. But honestly? I'll take fun. After all these years, this series finally has a movie worth defending."
    ],
    bottomLine: "Fast, gross and a total blast. Grab some friends and see it loud.",
    scores: { rt: '96%', metacritic: '79', cinemascore: 'B+', audience: '91%' },
    boxOffice: '$120M total'
  },
  {
    id: 'primetime',
    title: 'Primetime',
    status: '#4 at the box office',
    poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
    tmdbId: 1375441,
    director: 'Lance Oppenheim',
    cast: ['Robert Pattinson', 'Merritt Wever', 'Skyler Gisondo'],
    studio: 'A24',
    mpaa: 'R',
    runtime: '1h 50m',
    genres: ['Crime', 'Psychological Thriller', 'Drama'],
    color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)',
    rating: 4,
    headline: "A skin-crawling look at the intersection of justice and entertainment.",
    review: [
      "Primetime is one of those movies that makes you feel like you need a shower after you leave the theater. It's a satirical dive into the production of 'To Catch a Predator,' and it doesn't hold back on how uncomfortable that entire cultural moment actually was.",
      "Robert Pattinson as Chris Hansen is a revelation. He captures that specific, predatory politeness—the soft-spoken tone and the slow, calculated delivery—that made the original show so terrifying for the people being caught. He doesn't play Hansen as a simple hero; he plays him as a man who has discovered a very lucrative way to weaponize public shame.",
      "The film is structured as a fever dream of 2006, with a visual style that mirrors the frantic, low-res energy of early reality TV. It brilliantly explores the ethics of the 'sting,' questioning where the line is between legitimate protection and a twisted form of entertainment. It's not always easy to watch, and at times it feels like it's trying too hard to be an 'important' critique.",
      "Merritt Wever and Skyler Gisondo provide great supporting turns, filling out the machinery of the production. They represent the banality of the process—the producers and decoys who treat these life-altering moments like just another day at the office.",
      "It's a disturbing, focused character study that manages to be both a critique of the media and a gripping thriller. It's not for everyone, but if you're in the mood for something that challenges your stomach and your ethics, this is it."
    ],
    bottomLine: "Intense, uncomfortable and brilliantly acted. A fascinating look at the dark side of reality TV.",
    scores: { rt: '96%', metacritic: '67' },
    boxOffice: '$30M total'
  },
  {
    id: 'forgotten-island',
    title: 'Forgotten Island',
    status: '#5 at the box office',
    poster: 'https://image.tmdb.org/t/p/w500/dGSsPovyUW5XVekXcy7F2GyhTEh.jpg',
    tmdbId: 1465063,
    director: 'Joel Crawford, Januel Mercado',
    cast: ['H.E.R.', 'Liza Soberano', 'Dave Franco', 'Lea Salonga'],
    studio: 'DreamWorks Animation',
    mpaa: 'PG',
    runtime: '1h 49m',
    genres: ['Animation', 'Fantasy', 'Adventure'],
    color: 'linear-gradient(135deg, #2e5a3e 0%, #7ba87b 55%, #d4e8d4 100%)',
    rating: 4,
    headline: "A candy-colored love letter to Filipino folklore and the bonds of friendship.",
    review: [
      "Every now and then, an animated movie comes along that feels truly fresh, and Forgotten Island is exactly that. It's a visually stunning, emotionally resonant journey that manages to be both a grand adventure and an intimate story about two best friends.",
      "The premise is simple but effective: Jo and Raissa are transported to Nakali, a world inspired by Filipino mythology, and they have to find a way home before they forget each other. The representation of Filipino culture here isn't just window dressing; it's woven into the very fabric of the world, from the creatures to the values of the characters. It's a beautiful, respectful, and imaginative execution.",
      "The voice cast is fantastic, with H.E.R. and Liza Soberano bringing a genuine chemistry to the lead roles. Dave Franco as a weredog is a highlight, providing much of the movie's comedic energy. The animation is vibrant and fluid, capturing the magical chaos of the island with a level of detail that's genuinely impressive.",
      "My only real complaint is the pacing. The middle section drags a bit as the characters move from one encounter to the next, and some of the emotional beats are played a little too heavily. It feels a bit too 'controlled' at times, as if the filmmakers were too worried about hitting every emotional mark perfectly.",
      "Despite that, the heart of the movie is undeniable. It's a story about the fear of growing apart and the effort it takes to hold onto the people who define you. It's a movie that will make you want to call your best friend the second the credits roll."
    ],
    bottomLine: "Imaginative, heartfelt and visually gorgeous. A must-watch for families and animation fans.",
    scores: { rt: '95%', audience: '96%', metacritic: '73' },
    boxOffice: '$20M total'
  }
];
