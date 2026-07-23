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
  overviewFeatures: { title: string; desc: string; icon: string; }[];
  whyChoseUs: { title: string; desc: string; icon: string; }[];
  amenities: string[];
  pricing: PricingRow[];
  specifications: SpecificationRow[];
  connectivity: ConnectivityRow[];
  gallery: string[];
  mapEmbedUrl: string;
}

export const projects: Project[] = [
  {
    slug: 'infinity',
    name: 'Agarwal Infinity',
    location: 'Opp. D-Mart, Virar(W), MMR Mumbai',
    status: 'Ready to Move',
    rera: 'P9900052695',
    config: '2, 3 & 4 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-infinity-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Infinity brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Virar West. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Infinity is built to hold its value and grow with your family for generations.',
    overviewFeatures: [
      { title: "Landscaped Gardens", desc: "Lush green spaces to unwind in", icon: "Leaf" },
      { title: "Fitness Zones", desc: "State-of-the-art equipment", icon: "Dumbbell" },
      { title: "Podium Parking", desc: "Dedicated covered parking spaces", icon: "Car" },
      { title: "Sky Deck Views", desc: "Panoramic vistas from the rooftop", icon: "Sun" }
    ],
    whyChoseUs: [
      { title: "Prime Locations", desc: "Nestled in thriving neighbourhoods with excellent connectivity", icon: "Car" },
      { title: "Premium Amenities", desc: "Thoughtfully curated lifestyle amenities for every age", icon: "Dumbbell" },
      { title: "Quality Craftsmanship", desc: "Built with trust and attention to detail, ensuring lasting value", icon: "Leaf" },
      { title: "Hassle-Free Living", desc: "Ready-to-move-in homes with OC received, making your transition seamless", icon: "Sun" }
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
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.8917781719983!2d72.7994673760003!3d19.46023223979633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ab000fb32b41%3A0x7641e67f26411fa3!2sAgarwal%20Infinity!5e0!3m2!1sen!2sin!4v1784611645839!5m2!1sen!2sin'
  },
  {
    slug: 'sky-heights',
    name: 'Agarwal Sky Heights',
    location: 'Gokhiware, Vasai(E), MMR Mumbai',
    status: 'OC Received',
    rera: 'P99000004474',
    config: '1, 2 & 3 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-sky-heights-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Sky Heights brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Virar West. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Sky Heights is built to hold its value and grow with your family for generations.',
    overviewFeatures: [
      { title: "Landscaped Gardens", desc: "Lush green spaces to unwind in", icon: "Leaf" },
      { title: "Fitness Zones", desc: "State-of-the-art equipment", icon: "Dumbbell" },
      { title: "Podium Parking", desc: "Dedicated covered parking spaces", icon: "Car" },
      { title: "Sky Deck Views", desc: "Panoramic vistas from the rooftop", icon: "Sun" }
    ],
    whyChoseUs: [
      { title: "Prime Locations", desc: "Nestled in thriving neighbourhoods with excellent connectivity", icon: "Car" },
      { title: "Premium Amenities", desc: "Thoughtfully curated lifestyle amenities for every age", icon: "Dumbbell" },
      { title: "Quality Craftsmanship", desc: "Built with trust and attention to detail, ensuring lasting value", icon: "Leaf" },
      { title: "Hassle-Free Living", desc: "Ready-to-move-in homes with OC received, making your transition seamless", icon: "Sun" }
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
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.463647118351!2d72.8469149759992!3d19.392363241963135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7afe1180f68cd%3A0xcc8573a1e7dd76ab!2sAgarwal%20Sky%20Heights!5e0!3m2!1sen!2sin!4v1784611689586!5m2!1sen!2sin'
  },
  {
    slug: 'skyrise',
    name: 'Agarwal Skyrise',
    location: 'Y.K Nagar, Virar(W), MMR Mumbai',
    status: 'OC Received',
    rera: 'P99000006929',
    config: '1, 2 & 3 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-skyrise-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Skyrise brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Vasai East. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Skyrise is built to hold its value and grow with your family for generations.',
    overviewFeatures: [
      { title: "Landscaped Gardens", desc: "Lush green spaces to unwind in", icon: "Leaf" },
      { title: "Fitness Zones", desc: "State-of-the-art equipment", icon: "Dumbbell" },
      { title: "Podium Parking", desc: "Dedicated covered parking spaces", icon: "Car" },
      { title: "Sky Deck Views", desc: "Panoramic vistas from the rooftop", icon: "Sun" }
    ],
    whyChoseUs: [
      { title: "Prime Locations", desc: "Nestled in thriving neighbourhoods with excellent connectivity", icon: "Car" },
      { title: "Premium Amenities", desc: "Thoughtfully curated lifestyle amenities for every age", icon: "Dumbbell" },
      { title: "Quality Craftsmanship", desc: "Built with trust and attention to detail, ensuring lasting value", icon: "Leaf" },
      { title: "Hassle-Free Living", desc: "Ready-to-move-in homes with OC received, making your transition seamless", icon: "Sun" }
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
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.7471885210675!2d72.8020161!3d19.4664638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ab98fe48e75f%3A0x3677f404d52a5136!2sAgarwal%20skyrise!5e0!3m2!1sen!2sin!4v1784611565341!5m2!1sen!2sin'
  },
  {
    slug: 'horizon',
    name: 'Agarwal Horizon',
    location: 'Virar-Nsp Link Road, Virar(W), MMR Mumbai',
    status: 'Ready to Move',
    rera: 'P99000024516',
    config: '1, 2 & 3 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-horizon-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Horizon brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Virar West. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas — wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Horizon is built to hold its value and grow with your family for generations.',
    overviewFeatures: [
      { title: "Landscaped Gardens", desc: "Lush green spaces to unwind in", icon: "Leaf" },
      { title: "Fitness Zones", desc: "State-of-the-art equipment", icon: "Dumbbell" },
      { title: "Podium Parking", desc: "Dedicated covered parking spaces", icon: "Car" },
      { title: "Sky Deck Views", desc: "Panoramic vistas from the rooftop", icon: "Sun" }
    ],
    whyChoseUs: [
      { title: "Prime Locations", desc: "Nestled in thriving neighbourhoods with excellent connectivity", icon: "Car" },
      { title: "Premium Amenities", desc: "Thoughtfully curated lifestyle amenities for every age", icon: "Dumbbell" },
      { title: "Quality Craftsmanship", desc: "Built with trust and attention to detail, ensuring lasting value", icon: "Leaf" },
      { title: "Hassle-Free Living", desc: "Ready-to-move-in homes with OC received, making your transition seamless", icon: "Sun" }
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
      'gallery-aerial.jpg'
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.176013521966!2d72.79982009999999!3d19.4479766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7aa2b7336c9df%3A0xa20ede8f1d00bbf2!2sGlory%20-%20Agarwal%20Group!5e0!3m2!1sen!2sin!4v1784611810538!5m2!1sen!2sin'
  }
];
