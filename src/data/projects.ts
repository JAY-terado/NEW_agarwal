export interface PricingRow {
  type: string;
  carpetArea: string;
  price: string;
  status: string;
}

export interface SpecificationRow {
  key: string;
  value: string;
}

export interface ConnectivityRow {
  key: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  status: string;
  rera: string;
  config: string;
  startingPrice: string;
  carpetAreaRange: string;
  heroImage: string;
  overviewTitle: string;
  overviewText1: string;
  overviewText2: string;
  whyUs: string[];
  amenities: string[];
  pricing: PricingRow[];
  specifications: SpecificationRow[];
  connectivity: ConnectivityRow[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: 'skyrise',
    name: 'Agarwal Skyrise',
    location: 'Vasai East, Vasai–Virar & Mumbai',
    status: 'OC Received',
    rera: 'P99000006929',
    config: '1, 2 & 3 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-skyrise-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Skyrise brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Vasai East. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Skyrise is built to hold its value and grow with your family for generations.',
    whyUs: [
      'Prime Vasai East location with quick access to the Western Line & highways',
      'Vaastu-compliant 1, 2 & 3 BHK layouts with efficient carpet areas',
      'Gated community with 24×7 security & CCTV surveillance',
      'Resort-style amenities across landscaped podium & rooftop decks',
      'RERA-registered · clear title · bank-approved for home loans'
    ],
    amenities: [
      'Grand Entrance Lobby',
      'Swimming Pool & Deck',
      'Fully-Equipped Gymnasium',
      'Landscaped Podium Garden',
      'Children\'s Play Area',
      'Multipurpose Community Hall',
      'Indoor Games & Library',
      'Rooftop Sky Lounge'
    ],
    pricing: [
      { type: '1 BHK', carpetArea: '395 sq.ft', price: '₹35.45 L*', status: 'Available' },
      { type: '2 BHK', carpetArea: '560 sq.ft', price: '₹52.90 L*', status: 'Available' },
      { type: '3 BHK', carpetArea: '720 sq.ft', price: '₹68.50 L*', status: 'Few Left' }
    ],
    specifications: [
      { key: 'Structure', value: 'Earthquake-resistant RCC framed' },
      { key: 'Flooring', value: 'Vitrified tiles in all rooms' },
      { key: 'Kitchen', value: 'Granite platform · SS sink' },
      { key: 'Bathrooms', value: 'Designer tiles · branded CP fittings' },
      { key: 'Doors', value: 'Laminated flush doors' },
      { key: 'Windows', value: 'Powder-coated aluminium sliding' },
      { key: 'Electrical', value: 'Concealed copper wiring · modular' },
      { key: 'Lifts', value: 'Branded automatic elevators' }
    ],
    connectivity: [
      { key: 'Railway Station', value: '5 mins' },
      { key: 'Western Express Highway', value: '12 mins' },
      { key: 'Schools & Colleges', value: '5–10 mins' },
      { key: 'Hospitals', value: '8 mins' },
      { key: 'Shopping & Malls', value: '10 mins' },
      { key: 'Upcoming Metro', value: 'Nearby' }
    ],
    gallery: [
      'gallery-exterior.jpg',
      'gallery-lobby.jpg',
      'gallery-living.jpg',
      'gallery-bedroom.jpg',
      'gallery-pool.jpg',
      'gallery-aerial.jpg'
    ]
  },
  {
    slug: 'infinity',
    name: 'Agarwal Infinity',
    location: 'Virar West, Vasai–Virar & Mumbai',
    status: 'Ready to Move',
    rera: 'P9900052695',
    config: '2, 3 & 4 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-infinity-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Infinity brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Virar West. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Infinity is built to hold its value and grow with your family for generations.',
    whyUs: [
      'Prime Virar West location with quick access to the Western Line & highways',
      'Vaastu-compliant 1, 2 & 3 BHK layouts with efficient carpet areas',
      'Gated community with 24×7 security & CCTV surveillance',
      'Resort-style amenities across landscaped podium & rooftop decks',
      'RERA-registered · clear title · bank-approved for home loans'
    ],
    amenities: [
      'Grand Entrance Lobby',
      'Swimming Pool & Deck',
      'Fully-Equipped Gymnasium',
      'Landscaped Podium Garden',
      'Children\'s Play Area',
      'Multipurpose Community Hall',
      'Indoor Games & Library',
      'Rooftop Sky Lounge'
    ],
    pricing: [
      { type: '1 BHK', carpetArea: '395 sq.ft', price: '₹35.99 L*', status: 'Available' },
      { type: '2 BHK', carpetArea: '560 sq.ft', price: '₹52.90 L*', status: 'Available' },
      { type: '3 BHK', carpetArea: '720 sq.ft', price: '₹68.50 L*', status: 'Few Left' }
    ],
    specifications: [
      { key: 'Structure', value: 'Earthquake-resistant RCC framed' },
      { key: 'Flooring', value: 'Vitrified tiles in all rooms' },
      { key: 'Kitchen', value: 'Granite platform · SS sink' },
      { key: 'Bathrooms', value: 'Designer tiles · branded CP fittings' },
      { key: 'Doors', value: 'Laminated flush doors' },
      { key: 'Windows', value: 'Powder-coated aluminium sliding' },
      { key: 'Electrical', value: 'Concealed copper wiring · modular' },
      { key: 'Lifts', value: 'Branded automatic elevators' }
    ],
    connectivity: [
      { key: 'Railway Station', value: '5 mins' },
      { key: 'Western Express Highway', value: '12 mins' },
      { key: 'Schools & Colleges', value: '5–10 mins' },
      { key: 'Hospitals', value: '8 mins' },
      { key: 'Shopping & Malls', value: '10 mins' },
      { key: 'Upcoming Metro', value: 'Nearby' }
    ],
    gallery: [
      'gallery-exterior.jpg',
      'gallery-lobby.jpg',
      'gallery-living.jpg',
      'gallery-bedroom.jpg',
      'gallery-pool.jpg',
      'gallery-aerial.jpg'
    ]
  },
  {
    slug: 'sky-heights',
    name: 'Agarwal Sky Heights',
    location: 'Virar West, Vasai–Virar & Mumbai',
    status: 'OC Received',
    rera: 'P99000004474',
    config: '1, 2 & 3 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-sky-heights-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Sky Heights brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Virar West. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Sky Heights is built to hold its value and grow with your family for generations.',
    whyUs: [
      'Prime Virar West location with quick access to the Western Line & highways',
      'Vaastu-compliant 1, 2 & 3 BHK layouts with efficient carpet areas',
      'Gated community with 24×7 security & CCTV surveillance',
      'Resort-style amenities across landscaped podium & rooftop decks',
      'RERA-registered · clear title · bank-approved for home loans'
    ],
    amenities: [
      'Grand Entrance Lobby',
      'Swimming Pool & Deck',
      'Fully-Equipped Gymnasium',
      'Landscaped Podium Garden',
      'Children\'s Play Area',
      'Multipurpose Community Hall',
      'Indoor Games & Library',
      'Rooftop Sky Lounge'
    ],
    pricing: [
      { type: '1 BHK', carpetArea: '395 sq.ft', price: '₹33.59 L*', status: 'Available' },
      { type: '2 BHK', carpetArea: '560 sq.ft', price: '₹52.90 L*', status: 'Available' },
      { type: '3 BHK', carpetArea: '720 sq.ft', price: '₹68.50 L*', status: 'Few Left' }
    ],
    specifications: [
      { key: 'Structure', value: 'Earthquake-resistant RCC framed' },
      { key: 'Flooring', value: 'Vitrified tiles in all rooms' },
      { key: 'Kitchen', value: 'Granite platform · SS sink' },
      { key: 'Bathrooms', value: 'Designer tiles · branded CP fittings' },
      { key: 'Doors', value: 'Laminated flush doors' },
      { key: 'Windows', value: 'Powder-coated aluminium sliding' },
      { key: 'Electrical', value: 'Concealed copper wiring · modular' },
      { key: 'Lifts', value: 'Branded automatic elevators' }
    ],
    connectivity: [
      { key: 'Railway Station', value: '5 mins' },
      { key: 'Western Express Highway', value: '12 mins' },
      { key: 'Schools & Colleges', value: '5–10 mins' },
      { key: 'Hospitals', value: '8 mins' },
      { key: 'Shopping & Malls', value: '10 mins' },
      { key: 'Upcoming Metro', value: 'Nearby' }
    ],
    gallery: [
      'gallery-exterior.jpg',
      'gallery-lobby.jpg',
      'gallery-living.jpg',
      'gallery-bedroom.jpg',
      'gallery-pool.jpg',
      'gallery-aerial.jpg'
    ]
  },
  {
    slug: 'horizon',
    name: 'Agarwal Horizon',
    location: 'Virar West, Vasai–Virar & Mumbai',
    status: 'Ready to Move',
    rera: 'P99000024516',
    config: '1, 2 & 3 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-horizon-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Horizon brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Virar West. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Horizon is built to hold its value and grow with your family for generations.',
    whyUs: [
      'Prime Virar West location with quick access to the Western Line & highways',
      'Vaastu-compliant 1, 2 & 3 BHK layouts with efficient carpet areas',
      'Gated community with 24×7 security & CCTV surveillance',
      'Resort-style amenities across landscaped podium & rooftop decks',
      'RERA-registered · clear title · bank-approved for home loans'
    ],
    amenities: [
      'Grand Entrance Lobby',
      'Swimming Pool & Deck',
      'Fully-Equipped Gymnasium',
      'Landscaped Podium Garden',
      'Children\'s Play Area',
      'Multipurpose Community Hall',
      'Indoor Games & Library',
      'Rooftop Sky Lounge'
    ],
    pricing: [
      { type: '1 BHK', carpetArea: '395 sq.ft', price: '₹35.49 L*', status: 'Available' },
      { type: '2 BHK', carpetArea: '560 sq.ft', price: '₹52.90 L*', status: 'Available' },
      { type: '3 BHK', carpetArea: '720 sq.ft', price: '₹68.50 L*', status: 'Few Left' }
    ],
    specifications: [
      { key: 'Structure', value: 'Earthquake-resistant RCC framed' },
      { key: 'Flooring', value: 'Vitrified tiles in all rooms' },
      { key: 'Kitchen', value: 'Granite platform · SS sink' },
      { key: 'Bathrooms', value: 'Designer tiles · branded CP fittings' },
      { key: 'Doors', value: 'Laminated flush doors' },
      { key: 'Windows', value: 'Powder-coated aluminium sliding' },
      { key: 'Electrical', value: 'Concealed copper wiring · modular' },
      { key: 'Lifts', value: 'Branded automatic elevators' }
    ],
    connectivity: [
      { key: 'Railway Station', value: '5 mins' },
      { key: 'Western Express Highway', value: '12 mins' },
      { key: 'Schools & Colleges', value: '5–10 mins' },
      { key: 'Hospitals', value: '8 mins' },
      { key: 'Shopping & Malls', value: '10 mins' },
      { key: 'Upcoming Metro', value: 'Nearby' }
    ],
    gallery: [
      'gallery-exterior.jpg',
      'gallery-lobby.jpg',
      'gallery-living.jpg',
      'gallery-bedroom.jpg',
      'gallery-pool.jpg',
      'gallery-aerial.jpg'
    ]
  }
];
