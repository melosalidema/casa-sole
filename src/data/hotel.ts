function unsplash(photoId: string, width = 1600): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`
}

export interface Room {
  slug: string
  name: string
  eyebrow: string
  description: string
  longDescription: string
  size: number
  guests: number
  bed: string
  price: number
  features: string[]
  images: string[]
  gallery: string[]
  unavailableDates: string[]
}

export interface Experience {
  slug: string
  title: string
  eyebrow: string
  description: string
  longDescription: string
  duration: string
  price: number
  highlights: string[]
  image: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  image: string
}

export interface RestaurantMenu {
  name: string
  tagline: string
  description: string
  categories: string[]
  items: MenuItem[]
}

export const hotel = {
  name: 'Casa Sole',
  tagline: 'A sunlit retreat on the Mediterranean coast',
  location: 'Costa Serena, Mediterranean Coast',
  currency: 'EUR',
}

export const rooms: Room[] = [
  {
    slug: 'classic',
    name: 'Classic Room',
    eyebrow: 'Comfort in the Mediterranean light',
    description:
      'A serene hideaway wrapped in warm neutrals, with a plush king bed, a rain shower and soft sea air drifting through the windows.',
    longDescription:
      'The Classic Room is designed for slow mornings and restful nights. Sunlight filters through linen curtains across a hand-finished kingsize bed, while the bathroom pairs locally sourced stone with a generous rain shower. A small seating nook by the window invites you to linger over coffee or a good book before heading out to the terrace.',
    size: 32,
    guests: 2,
    bed: 'King',
    price: 290,
    features: [
      'Kingsize bed',
      'Rain shower',
      'Free Wi-Fi',
      'Air conditioning',
      'Mini bar',
      'Daily breakfast',
    ],
    images: [
      unsplash('photo-1776763018972-588e27bf6511'),
      unsplash('photo-1747133608846-ac16fb165862'),
    ],
    gallery: [
      unsplash('photo-1760573776062-7d2a7baeb49d'),
      unsplash('photo-1753535542754-b7a8f847259a'),
      unsplash('photo-1689729738817-fb1f4256769d'),
    ],
    unavailableDates: [
      '2026-10-15',
      '2026-10-16',
      '2026-10-17',
      '2026-12-24',
      '2026-12-25',
      '2026-12-26',
    ],
  },
  {
    slug: 'deluxe',
    name: 'Deluxe Room',
    eyebrow: 'More space, more light',
    description:
      'A generous retreat with a sitting area, a kingsize bed and a marble bathroom, framed by tall windows overlooking the gardens.',
    longDescription:
      'The Deluxe Room expands on the Classic with a bright sitting corner, a dedicated work desk and a marble bathroom with both a rain shower and a soaking tub. Tall windows open onto the citrus gardens, and the extra floor space makes it effortless to unwind, or to turn the room into your office for the afternoon.',
    size: 42,
    guests: 3,
    bed: 'King',
    price: 380,
    features: [
      'Kingsize bed',
      'Sitting area',
      'Marble bathroom',
      'Soaking tub',
      'Free Wi-Fi',
      'Daily breakfast',
    ],
    images: [
      unsplash('photo-1578683010236-d716f9a3f461'),
      unsplash('photo-1590490360182-c33d57733427'),
    ],
    gallery: [
      unsplash('photo-1618221195710-dd6b41faaea6'),
      unsplash('photo-1616594039964-ae9021a400a0'),
      unsplash('photo-1600607687939-ce8a6c25118c'),
    ],
    unavailableDates: [
      '2026-10-20',
      '2026-10-21',
      '2026-10-22',
      '2026-12-31',
      '2027-01-01',
      '2027-01-02',
    ],
  },
  {
    slug: 'sea-view-suite',
    name: 'Sea View Suite',
    eyebrow: 'The horizon is the headline',
    description:
      'Our most requested room: a corner suite with a private terrace, a kingsize bed and uninterrupted views over the bay.',
    longDescription:
      'The Sea View Suite occupies the quietest corner of the property, where the only soundtrack is the tide. A private terrace wraps the suite, the kingsize bed faces the water and the lounge opens fully onto the breeze. In-room espresso, a curated minibar and an oversized bathtub complete the picture, this is the room that makes you cancel your plans.',
    size: 58,
    guests: 4,
    bed: 'King',
    price: 520,
    features: [
      'Private terrace',
      'Sea view',
      'Kingsize bed',
      'Lounge area',
      'Oversized bathtub',
      'In-room espresso',
    ],
    images: [
      unsplash('photo-1749375593527-496f6c3a7836'),
      unsplash('photo-1712939702875-ce8ff53c5e4a'),
    ],
    gallery: [
      unsplash('photo-1690991966399-9758fdbe5794'),
      unsplash('photo-1679694100239-b97f31462bf7'),
      unsplash('photo-1600210492486-724fe5c67fb0'),
    ],
    unavailableDates: [
      '2026-11-01',
      '2026-11-02',
      '2026-11-03',
      '2027-02-14',
      '2027-02-15',
      '2027-02-16',
    ],
  },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug)
}

export const experiences: Experience[] = [
  {
    slug: 'sunset-cruise',
    title: 'Sunset Cruise',
    eyebrow: 'On the water',
    description: 'Sail the bay aboard a private catamaran as the sun drops behind the headland.',
    longDescription:
      'Step aboard a private catamaran for a slow sail around the bay at golden hour. Your skipper knows every cove and the best angle for the sunset, while chilled prosecco and light bites keep things easy. There is time for a swim stop if the water calls to you.',
    duration: '3 hours',
    price: 180,
    highlights: ['Private skipper', 'Chilled prosecco', 'Swim stop', 'Towels and snorkels'],
    image: unsplash('photo-1748808562758-390d6d2d160c'),
  },
  {
    slug: 'wine-tasting',
    title: 'Wine Tasting',
    eyebrow: 'Estates and cellars',
    description: 'Walk the terraced vineyards and taste five local vintages with the winemaker.',
    longDescription:
      'A family-run estate just inland from the coast hosts this tasting. You will wander the terraced vines, step into the cellar and taste five local vintages alongside a board of aged cheeses and cured meats. The winemaker answers every question you bring.',
    duration: '2.5 hours',
    price: 90,
    highlights: ['Five local wines', 'Cellar tour', 'Cheese board', 'Meet the winemaker'],
    image: unsplash('photo-1547573854-74d2a71d0826'),
  },
  {
    slug: 'private-chef-dinner',
    title: 'Private Chef Dinner',
    eyebrow: 'At your table',
    description: 'A seven-course tasting menu cooked in your room by our resident chef.',
    longDescription:
      'Our resident chef sets up in your room and cooks a seven-course Mediterranean tasting menu, course by course, with a wine pairing chosen to match. Everything is seasonal, and dietary preferences are tailored before the evening begins.',
    duration: 'Evening',
    price: 220,
    highlights: ['Seven courses', 'Wine pairing', 'Cooked in-room', 'Dietary menus available'],
    image: unsplash('photo-1749767138465-0e8595ebb969'),
  },
  {
    slug: 'yoga-terrace',
    title: 'Sunrise Yoga',
    eyebrow: 'Body and mind',
    description: 'Morning vinyasa on the sea-facing terrace with a resident instructor.',
    longDescription:
      'Begin the day with a vinyasa flow on the sea-facing terrace as the light changes over the water. The class welcomes every level, with mats and props provided, and finishes with herbal tea and a view that stays with you all day.',
    duration: '75 minutes',
    price: 45,
    highlights: ['Sea-facing terrace', 'All levels welcome', 'Mats and props', 'Herbal tea'],
    image: unsplash('photo-1573590330099-d6c7355ec595'),
  },
  {
    slug: 'spa-ritual',
    title: 'Sea View Spa Ritual',
    eyebrow: 'Slow down',
    description: 'A ninety-minute massage and scrub ritual using oils pressed from the grove.',
    longDescription:
      'The spa ritual begins with a citrus salt scrub, followed by a deep tissue massage using oils pressed from the estate grove. Steam room time is included, and you leave with a small vial of the aftercare oil to take home.',
    duration: '90 minutes',
    price: 150,
    highlights: ['Deep tissue massage', 'Citrus salt scrub', 'Steam room', 'Aftercare oils'],
    image: unsplash('photo-1544551763-46a013bb70d5'),
  },
  {
    slug: 'kayak-paddle',
    title: 'Kayak Paddle',
    eyebrow: 'Coastal mornings',
    description: 'Glide along the cliffs at dawn and into hidden coves only reachable by water.',
    longDescription:
      'A guided paddle along the cliffs before the breeze picks up. You will trace the coast into coves that are only reachable by water, stopping for a swim and a snack on a quiet pebble beach before heading back.',
    duration: '2 hours',
    price: 60,
    highlights: ['Guided route', 'Hidden coves', 'Single or double kayaks', 'Dry bags'],
    image: unsplash('photo-1476514525535-07fb3b4ae5f1'),
  },
]

export const restaurantMenu: RestaurantMenu = {
  name: 'Sole',
  tagline: 'Mediterranean kitchen and terrace',
  description:
    'A sun-soaked dining room and terrace serving seasonal Mediterranean plates, wood-fired fish and citrus-scented desserts.',
  categories: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drinks'],
  items: [
    {
      id: 'sole-breakfast',
      name: 'Sole Breakfast',
      description: 'Seasonal fruit, house granola, Greek yogurt and wildflower honey.',
      price: 18,
      category: 'Breakfast',
      tags: ['Vegetarian'],
      image: unsplash('photo-1565958011703-44f9829ba187'),
    },
    {
      id: 'eggs-benedict',
      name: 'Eggs Benedict',
      description: 'Poached eggs on toasted brioche with smoked ham and lemon hollandaise.',
      price: 16,
      category: 'Breakfast',
      tags: ['Contains gluten'],
      image: unsplash('photo-1600891964092-4316c288032e'),
    },
    {
      id: 'lemon-pancakes',
      name: 'Lemon Ricotta Pancakes',
      description: 'Fluffy pancakes with mascarpone and a blueberry compote.',
      price: 15,
      category: 'Breakfast',
      tags: ['Vegetarian'],
      image: unsplash('photo-1504674900247-0877df9cc836'),
    },
    {
      id: 'caprese-salad',
      name: 'Caprese Salad',
      description: 'Burrata, heirloom tomatoes, basil oil and aged balsamic.',
      price: 19,
      category: 'Lunch',
      tags: ['Vegetarian'],
      image: unsplash('photo-1504674900247-0877df9cc836'),
    },
    {
      id: 'grilled-octopus',
      name: 'Grilled Octopus',
      description: 'Charred octopus with lemon, oregano and olive oil.',
      price: 24,
      category: 'Lunch',
      tags: ['Gluten free'],
      image: unsplash('photo-1600891964092-4316c288032e'),
    },
    {
      id: 'catch-of-the-day',
      name: 'Catch of the Day',
      description: 'Grilled local fish with citrus butter and greens.',
      price: 26,
      category: 'Lunch',
      tags: ['Gluten free'],
      image: unsplash('photo-1547573854-74d2a71d0826'),
    },
    {
      id: 'truffle-risotto',
      name: 'Truffle Risotto',
      description: 'Carnaroli rice, parmesan and wild mushrooms.',
      price: 28,
      category: 'Dinner',
      tags: ['Vegetarian'],
      image: unsplash('photo-1504674900247-0877df9cc836'),
    },
    {
      id: 'ribeye-alla-fiorentina',
      name: 'Ribeye alla Fiorentina',
      description: '600g aged ribeye with rosemary and sea salt.',
      price: 46,
      category: 'Dinner',
      tags: ['Contains gluten'],
      image: unsplash('photo-1600891964092-4316c288032e'),
    },
    {
      id: 'seafood-linguine',
      name: 'Seafood Linguine',
      description: 'Prawns, clams and white wine over fresh pasta.',
      price: 32,
      category: 'Dinner',
      tags: ['Contains gluten'],
      image: unsplash('photo-1547573854-74d2a71d0826'),
    },
    {
      id: 'tiramisu',
      name: 'Tiramisu',
      description: 'Espresso-soaked savoiardi with mascarpone and cocoa.',
      price: 12,
      category: 'Dessert',
      tags: ['Contains gluten'],
      image: unsplash('photo-1565958011703-44f9829ba187'),
    },
    {
      id: 'citrus-panna-cotta',
      name: 'Citrus Panna Cotta',
      description: 'Blood orange gelée with crushed pistachio.',
      price: 11,
      category: 'Dessert',
      tags: ['Vegetarian'],
      image: unsplash('photo-1414235077428-338989a2e8c0'),
    },
    {
      id: 'sicilian-lemon-spritz',
      name: 'Sicilian Lemon Spritz',
      description: 'Local lemon liqueur, prosecco and soda over ice.',
      price: 14,
      category: 'Drinks',
      tags: ['Alcohol'],
      image: unsplash('photo-1414235077428-338989a2e8c0'),
    },
    {
      id: 'house-aperitivo',
      name: 'House Aperitivo',
      description: 'Vermouth and bitter orange with a twist.',
      price: 12,
      category: 'Drinks',
      tags: ['Alcohol'],
      image: unsplash('photo-1547573854-74d2a71d0826'),
    },
  ],
}