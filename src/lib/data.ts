export interface Planet {
  id: string;
  name: string;
  type: string;
  distanceFromSun: string;
  diameter: string;
  moons: number;
  orbitalPeriod: string;
  description: string;
  funFact: string;
  emoji: string;
  color: string;
  temperature: string;
}

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial",
    distanceFromSun: "57.9 million km",
    diameter: "4,879 km",
    moons: 0,
    orbitalPeriod: "88 days",
    description:
      "Mercury is the smallest planet in our solar system and the closest to the Sun. Its surface resembles our Moon with countless craters from billions of years of impacts.",
    funFact: "A day on Mercury (sunrise to sunrise) lasts 176 Earth days!",
    emoji: "☿️",
    color: "from-gray-400 to-gray-600",
    temperature: "-180°C to 430°C",
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial",
    distanceFromSun: "108.2 million km",
    diameter: "12,104 km",
    moons: 0,
    orbitalPeriod: "225 days",
    description:
      "Venus is the hottest planet in our solar system, with a thick atmosphere of carbon dioxide that traps heat in a runaway greenhouse effect.",
    funFact:
      "Venus rotates backwards compared to most planets — the Sun rises in the west and sets in the east.",
    emoji: "♀️",
    color: "from-orange-300 to-yellow-500",
    temperature: "462°C average",
  },
  {
    id: "earth",
    name: "Earth",
    type: "Terrestrial",
    distanceFromSun: "149.6 million km",
    diameter: "12,742 km",
    moons: 1,
    orbitalPeriod: "365.25 days",
    description:
      "Earth is the only planet known to support life. Its liquid water, moderate temperatures, and protective atmosphere make it a cosmic oasis.",
    funFact: "Earth is the only planet not named after a Greek or Roman god.",
    emoji: "🌍",
    color: "from-blue-400 to-green-400",
    temperature: "-88°C to 58°C",
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial",
    distanceFromSun: "227.9 million km",
    diameter: "6,779 km",
    moons: 2,
    orbitalPeriod: "687 days",
    description:
      "Mars, the Red Planet, has the largest volcano and canyon in the solar system — Olympus Mons and Valles Marineris.",
    funFact: "Olympus Mons on Mars is nearly 3 times the height of Mount Everest.",
    emoji: "🔴",
    color: "from-red-400 to-orange-600",
    temperature: "-87°C to -5°C",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gas Giant",
    distanceFromSun: "778.5 million km",
    diameter: "139,820 km",
    moons: 95,
    orbitalPeriod: "11.86 years",
    description:
      "Jupiter is the largest planet in our solar system, a massive gas giant with a Great Red Spot — a storm raging for over 350 years.",
    funFact: "Jupiter's Great Red Spot is so large that Earth could fit inside it.",
    emoji: "🟤",
    color: "from-amber-600 to-orange-800",
    temperature: "-145°C average",
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas Giant",
    distanceFromSun: "1.43 billion km",
    diameter: "116,460 km",
    moons: 146,
    orbitalPeriod: "29.46 years",
    description:
      "Saturn is famous for its spectacular ring system, made up of ice particles, rocky debris, and dust.",
    funFact: "Saturn has a hexagonal storm pattern at its north pole.",
    emoji: "🪐",
    color: "from-yellow-400 to-amber-600",
    temperature: "-178°C average",
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Ice Giant",
    distanceFromSun: "2.87 billion km",
    diameter: "50,724 km",
    moons: 28,
    orbitalPeriod: "84 years",
    description:
      "Uranus is an ice giant that rotates on its side, likely due to a massive ancient collision.",
    funFact: "Uranus rotates at a nearly 90-degree angle, rolling around the Sun on its side.",
    emoji: "🔵",
    color: "from-cyan-300 to-teal-500",
    temperature: "-224°C average",
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice Giant",
    distanceFromSun: "4.5 billion km",
    diameter: "49,244 km",
    moons: 16,
    orbitalPeriod: "164.8 years",
    description:
      "Neptune is the windiest planet, with gusts reaching 2,100 km/h. This deep blue ice giant is the most distant planet from the Sun.",
    funFact: "Neptune's moon Triton orbits in the opposite direction of the planet's rotation.",
    emoji: "💙",
    color: "from-blue-500 to-indigo-700",
    temperature: "-214°C average",
  },
];

export interface Mission {
  id: string;
  name: string;
  agency: string;
  launchDate: string;
  status: "active" | "completed" | "upcoming" | "lost";
  type: string;
  destination: string;
  description: string;
  highlight: string;
  emoji: string;
}

export const missions: Mission[] = [
  {
    id: "voyager-1",
    name: "Voyager 1",
    agency: "NASA",
    launchDate: "1977-09-05",
    status: "active",
    type: "Interstellar Probe",
    destination: "Outer Solar System / Interstellar Space",
    description:
      "The farthest human-made object from Earth, now traveling through interstellar space beyond the heliosphere.",
    highlight:
      "Carries the Golden Record — a message to the cosmos with sounds and images of Earth.",
    emoji: "🛸",
  },
  {
    id: "james-webb",
    name: "James Webb Space Telescope",
    agency: "NASA / ESA / CSA",
    launchDate: "2021-12-25",
    status: "active",
    type: "Space Observatory",
    destination: "L2 Lagrange Point",
    description:
      "The most powerful space telescope ever built, observing the universe in infrared from 1.5 million km away.",
    highlight:
      "Revealed the deepest infrared image of the universe ever taken, showing galaxies over 13 billion years old.",
    emoji: "🔭",
  },
  {
    id: "perseverance",
    name: "Perseverance Rover",
    agency: "NASA",
    launchDate: "2020-07-30",
    status: "active",
    type: "Mars Rover",
    destination: "Mars — Jezero Crater",
    description:
      "Exploring an ancient river delta on Mars, searching for signs of past microbial life and collecting samples for future return.",
    highlight:
      "Deployed Ingenuity, the first helicopter to fly on another planet.",
    emoji: "🤖",
  },
  {
    id: "artemis-1",
    name: "Artemis I",
    agency: "NASA",
    launchDate: "2022-11-16",
    status: "completed",
    type: "Lunar Mission",
    destination: "Moon (Orbital)",
    description:
      "Uncrewed test flight of the Space Launch System and Orion spacecraft, traveling further than any human-rated spacecraft before.",
    highlight:
      "Orion traveled 268,563 miles from Earth — the farthest any spacecraft designed for humans has ever flown.",
    emoji: "🌙",
  },
  {
    id: "cassini-huygens",
    name: "Cassini-Huygens",
    agency: "NASA / ESA / ASI",
    launchDate: "1997-10-15",
    status: "completed",
    type: "Saturn Orbiter",
    destination: "Saturn System",
    description:
      "Spent 13 years orbiting Saturn, transforming our understanding of the ringed planet and its moons.",
    highlight:
      "Discovered geysers on Enceladus and liquid methane lakes on Titan, ending with a Grand Finale dive into Saturn.",
    emoji: "🪐",
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    agency: "NASA",
    launchDate: "2024-10-14",
    status: "active",
    type: "Planetary Science",
    destination: "Jupiter's Moon Europa",
    description:
      "On a journey to investigate whether Europa's subsurface ocean could harbor conditions suitable for life.",
    highlight:
      "Will perform nearly 50 close flybys of Europa, getting as close as 25 km from the surface.",
    emoji: "🧊",
  },
  {
    id: "new-horizons",
    name: "New Horizons",
    agency: "NASA",
    launchDate: "2006-01-19",
    status: "active",
    type: "Flyby Probe",
    destination: "Pluto / Kuiper Belt",
    description:
      "Provided humanity's first close-up look at Pluto and later explored Arrokoth, the most distant object ever visited.",
    highlight:
      "Revealed Pluto's heart-shaped nitrogen glacier, Tombaugh Regio, reshaping our view of dwarf planets.",
    emoji: "💫",
  },
  {
    id: "mars-sample-return",
    name: "Mars Sample Return",
    agency: "NASA / ESA",
    launchDate: "2030",
    status: "upcoming",
    type: "Sample Return",
    destination: "Mars",
    description:
      "An ambitious multi-mission campaign to bring Martian rock and soil samples collected by Perseverance back to Earth.",
    highlight:
      "Will be the first mission to bring samples from another planet back to Earth for laboratory analysis.",
    emoji: "📦",
  },
  {
    id: "dragonfly",
    name: "Dragonfly",
    agency: "NASA",
    launchDate: "2028",
    status: "upcoming",
    type: "Rotorcraft Lander",
    destination: "Titan (Saturn's Moon)",
    description:
      "A nuclear-powered drone that will fly through Titan's thick atmosphere, hopping between locations on the organic-rich moon.",
    highlight:
      "Will be the first multi-rotor vehicle to fly on another world, exploring prebiotic chemistry.",
    emoji: "🚁",
  },
  {
    id: "mars-polar-lander",
    name: "Mars Polar Lander",
    agency: "NASA",
    launchDate: "1999-01-03",
    status: "lost",
    type: "Lander",
    destination: "Mars — South Pole",
    description:
      "Designed to study Martian climate and soil near the south pole. Contact was lost during descent and never recovered.",
    highlight:
      "Its loss led to sweeping reforms in NASA's Mars program and improved future mission reliability.",
    emoji: "📡",
  },
];

export interface StarSystem {
  id: string;
  name: string;
  type: string;
  distance: string;
  stars: number;
  knownPlanets: number;
  emoji: string;
}

export const starSystems: StarSystem[] = [
  { id: "alpha-centauri", name: "Alpha Centauri", type: "Triple Star System", distance: "4.37 ly", stars: 3, knownPlanets: 1, emoji: "⭐" },
  { id: "trappist-1", name: "TRAPPIST-1", type: "Red Dwarf", distance: "39.6 ly", stars: 1, knownPlanets: 7, emoji: "🔴" },
  { id: "kepler-442", name: "Kepler-442", type: "Orange Dwarf", distance: "1,206 ly", stars: 1, knownPlanets: 1, emoji: "🟠" },
  { id: "tau-ceti", name: "Tau Ceti", type: "G-type Star", distance: "11.9 ly", stars: 1, knownPlanets: 4, emoji: "🌟" },
  { id: "sirius", name: "Sirius", type: "Binary Star System", distance: "8.6 ly", stars: 2, knownPlanets: 0, emoji: "✨" },
  { id: "proxima-centauri", name: "Proxima Centauri", type: "Red Dwarf", distance: "4.24 ly", stars: 1, knownPlanets: 2, emoji: "🔵" },
];

export interface Nebula {
  id: string;
  name: string;
  type: string;
  distance: string;
  constellation: string;
  emoji: string;
}

export const nebulae: Nebula[] = [
  { id: "orion", name: "Orion Nebula", type: "Diffuse / Emission", distance: "1,344 ly", constellation: "Orion", emoji: "🌌" },
  { id: "crab", name: "Crab Nebula", type: "Supernova Remnant", distance: "6,500 ly", constellation: "Taurus", emoji: "🦀" },
  { id: "eagle", name: "Eagle Nebula", type: "Emission / Star-forming", distance: "7,000 ly", constellation: "Serpens", emoji: "🦅" },
  { id: "ring", name: "Ring Nebula", type: "Planetary Nebula", distance: "2,283 ly", constellation: "Lyra", emoji: "💍" },
  { id: "horsehead", name: "Horsehead Nebula", type: "Dark Nebula", distance: "1,500 ly", constellation: "Orion", emoji: "🐴" },
];

export interface CosmicEvent {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  source: string;
  description: string;
  emoji: string;
}

export const spaceFacts = [
  "A teaspoon of neutron star material would weigh about 6 billion tons.",
  "There are more stars in the universe than grains of sand on all of Earth's beaches.",
  "The footprints on the Moon will remain there for at least 100 million years.",
  "One million Earths could fit inside the Sun.",
  "A year on Venus is shorter than a day on Venus.",
  "Neutron stars can spin 600 times per second.",
  "The Milky Way galaxy is about 100,000 light-years across.",
  "Space is completely silent — there's no medium for sound waves to travel.",
  "The largest known star, UY Scuti, could fit almost 5 billion Suns inside it.",
  "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
  "There are more trees on Earth than stars in the Milky Way.",
  "The Voyager 1 spacecraft is the most distant human-made object from Earth.",
  "Jupiter's moon Europa likely has a liquid ocean beneath its icy surface.",
  "The observable universe is about 93 billion light-years in diameter.",
  "Astronauts grow up to 2 inches taller in space due to spinal decompression.",
  "Saturn's density is so low it would float in a bathtub — if you could find one big enough.",
  "A day on Mercury lasts 59 Earth days, but a year is only 88 Earth days.",
  "The International Space Station orbits Earth about 16 times every day.",
  "Mars has the tallest mountain in the solar system — Olympus Mons at 72,000 feet.",
  "There could be up to 40 billion Earth-sized planets in habitable zones of stars in our galaxy.",
];
