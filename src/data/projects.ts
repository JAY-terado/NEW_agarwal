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
  faqs?: { q: string; a: string; }[];
}

export const projects: Project[] = [
  {
    slug: 'infinity',
    name: 'Agarwal Infinity',
    location: 'Opp. D-Mart, Virar (W), MMR Mumbai',
    status: 'Under Construction',
    rera: 'P9900052695',
    config: '2, 3 & 4 BHK',
    startingPrice: 'Price on Request',
    carpetAreaRange: '395 – 720 sq.ft',
    heroImage: 'agarwal-infinity-hero.jpg',
    overviewTitle: 'A landmark address where everyday life feels elevated.',
    overviewText1: 'Agarwal Infinity brings thoughtfully designed 1, 2 & 3 BHK homes to the heart of Virar West. Every residence is planned for abundant natural light, cross-ventilation and efficient carpet areas, wrapped in a gated community with resort-grade amenities and seamless connectivity to Mumbai.',
    overviewText2: 'Backed by four decades of Agarwal Group craftsmanship, Infinity is built to hold its value and grow with your family for generations.',
    overviewFeatures: [
      { title: "Landscaped Gardens", desc: "Lush green spaces to unwind in", icon: "Leaf" },
      { title: "Fitness Zones", desc: "State-of-the-art equipment", icon: "Dumbbell" },
      { title: "Podium Parking", desc: "Dedicated covered parking spaces", icon: "Car" },
      { title: "Sky Deck Views", desc: "Panoramic vistas from the rooftop", icon: "Sun" }
    ],
    whyChoseUs: [
      { title: "Luxury Residences with Deck", desc: "Spacious homes with private decks for panoramic views", icon: "Home" },
      { title: "Exclusive Jodi Flats", desc: "Flexible layouts perfect for growing families", icon: "Building2" },
      { title: "Grand Lifestyle Amenities", desc: "Premium facilities for recreation and relaxation", icon: "Coffee" },
      { title: "Prime Location", desc: "Excellent connectivity to essential destinations", icon: "MapPin" }
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
      { key: 'Western Express Highway', value: '19 mins' },
      { key: 'Schools & Colleges', value: '1 mins' },
      { key: 'Hospitals', value: '2 mins' },
      { key: 'Shopping & Malls', value: '2 mins' },
      { key: 'Restaurants & Cafes', value: '1 mins' },
      { key: 'Daily Essentials', value: '1 mins' }
    ],
    faqs: [
      {
        q: "Where is Agarwal Infinity located in Virar?",
        a: "Agarwal Infinity is located on New Viva College Road, Opp. D-Mart, Bolinj, Virar (West), offering convenient access to schools, colleges, shopping, healthcare facilities and everyday essentials."
      },
      {
        q: "What configurations are available at Agarwal Infinity?",
        a: "Agarwal Infinity offers thoughtfully premium designed 2 BHK, 3 BHK and 4 BHK luxury residences with deck, along with exclusive Jodi Flat options for buyers looking for larger living spaces."
      },
      {
        q: "Does Agarwal Infinity offer Jodi Flats?",
        a: "Yes. Agarwal Infinity offers exclusive Jodi Flat options, allowing buyers to combine adjacent apartments to create a larger customized home."
      },
      {
        q: "Why should I buy a 2 BHK flat at Agarwal Infinity?",
        a: "The 2 BHK residences at Agarwal Infinity are designed for modern families, offering specious and efficient layouts, premium specifications, private decks and access to lifestyle amenities in Virar West."
      },
      {
        q: "Is Agarwal Infinity a good choice for 3 BHK luxury homes in Virar West?",
        a: "Yes. The spacious 3 BHK residences with deck are ideal for growing families seeking premium living, excellent connectivity and modern amenities in Virar West."
      },
      {
        q: "Are 4 BHK luxury apartments available at Agarwal Infinity?",
        a: "Yes. Agarwal Infinity offers 4 BHK luxury residences with deck, designed for buyers looking for spacious homes with premium lifestyle features."
      },
      {
        q: "What amenities are available at Agarwal Infinity?",
        a: "Agarwal infinity offers a range of morden lifestyle amenities designed for comfort, recreation and wellness. Residents can enjoy a huge podium garden, grand clubhouse, fitness center, mini theatre, party hall and multi-purpose turf creating a comfortable and community-focused lifestyle."
      },
      {
        q: "What podium amenities are available?",
        a: "The podium level includes amenities like children’s play area, jogging track, landscaped sit-out areas and a multipurpose lawn designed for recreation and family gatherings."
      },
      {
        q: "Are home loans available for Agarwal Infinity projects?",
        a: "Yes, Agarwal Infinity project is approved by all leading banks and financial institutions, making it easier for eligible buyers to avail home loan assistance with a smooth financing process."
      },
      {
        q: "What is the starting price of homes at Agarwal Infinity?",
        a: "Pricing of homes at Agarwal Infinity varies depending on the apartment Configuration and floor selection. Kindly contact our sales team on +91 73910 06061 / + 91 73910 06062 / + 91 73910 06063 for the latest price list, payment plans, and exclusive offers."
      },
      {
        q: "Is Agarwal Infinity a RERA-registered project?",
        a: "Yes. Agarwal Infinity is a RERA-registered project. The MahaRERA Registration Number is PR1240002502497, ensuring transparency and compliance with regulatory guidelines, details of the same are available at http://maharera.mahaonline.gov.in"
      },
      {
        q: "How well connected is Agarwal Infinity to important locations?",
        a: "Agarwal Infinity enjoys excellent connectivity:<br/><br/><ul><li>D-Mart – 1 minute</li><li>McDonald’s – 2 minutes</li><li>Rustomjee Cambridge International School – 3 minutes</li><li>Star Bazaar – 3 minutes</li><li>Virar Railway Station – 7 minutes</li><li>Prakriti Hospital – 8 minutes</li><li>Viva College – 1 minute</li><li>Grand 36 Turner Road Mall - 1 minute</li></ul>"
      },
      {
        q: "Why should I invest in Agarwal Infinity, Virar West?",
        a: "Agarwal Infinity combines a prime location, premium deck homes, quality construction by Agarwal Group, and proximity to major upcoming infrastructure projects. These factors make it an attractive option for homebuyers looking for long-term value, lifestyle, and future appreciation."
      },
      {
        q: "Are flexible payment plans and booking offers available?",
        a: "Yes. Agarwal Infinity offers easy payment plans, spot booking offers, and exclusive early buyer benefits for a limited period. Our sales team can help you choose the most suitable payment option based on your requirements."
      },
      {
        q: "Who is the developer of Agarwal Infinity?",
        a: "Agarwal Infinity is developed by Agarwal Group, a trusted real estate developer with decades of experience in the Vasai–Virar, MMR Mumbai region. The group is known for quality construction, timely delivery, transparent business practices, and customer-centric developments."
      },
      {
        q: "How can I book a home or schedule a site visit at Agarwal Infinity?",
        a: "You can fill out the enquiry form on our website to pre-register, request the latest pricing, download the brochure, or schedule a guided site visit. Our sales consultants will assist you with apartment availability, floor plans, home loan guidance, and the complete booking process or alternatively you can call at +91 73910 06061 / +91 73910 06062 / +91 73910 06063."
      },
      {
        q: "Is Agarwal Infinity close to Virar Railway Station?",
        a: "Yes, the project Agarwal Infinity enjoys convenient connectivity to Virar Railway Station, making daily commuting across the Mumbai Metropolitan Region very easy and convenient."
      }
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
    location: 'Gokhiware, Vasai (E), MMR Mumbai',
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
      { title: "Iconic High-Rise Living", desc: "Elevated lifestyle with stunning cityscapes", icon: "Building2" },
      { title: "Grand Clubhouse Experience", desc: "A luxurious retreat for leisure and gatherings", icon: "Coffee" },
      { title: "Exclusive Rooftop Amenities", desc: "Stargazing and recreation atop the city", icon: "Sun" },
      { title: "Grand Podium Amenities", desc: "Thoughtfully designed spaces for every age", icon: "Trees" }
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
      { key: 'Restaurants & Cafes', value: '2 mins' },
      { key: 'Upcoming Metro', value: 'Nearby' }
    ],
    faqs: [
      {
        q: "Where is Agarwal Sky Heights located?",
        a: "Agarwal Sky Heights is located near I-Global School, Yashwant Smart City, behind Madhuvan Complex, Gokhivare, Vasai East, offering excellent connectivity to schools, colleges, hospitals, Shopping Malls, highways and daily conveniences."
      },
      {
        q: "Which configurations are available at Agarwal Sky Heights?",
        a: "Agarwal Sky Heights offers beautifully designed 1 BHK, 2 BHK and 3 BHK premium residences, thoughtfully planned for modern families."
      },
      {
        q: "Why should I buy a flat in Vasai East?",
        a: "Vasai East is one of the fastest-growing residential destinations in the Mumbai Metropolitan Region, known for improving infrastructure, educational institutions, healthcare facilities and excellent connectivity."
      },
      {
        q: "Is Agarwal Sky Heights a MahaRERA registered project?",
        a: "Yes. Agarwal Sky Heights is a MahaRERA-registered project having MahaRERA Registration No.: P99000054026, ensuring transparency and compliance with regulatory guidelines, details of the same are available at http://maharera.mahaonline.gov.in"
      },
      {
        q: "What lifestyle amenities are available at Agarwal Sky Heights?",
        a: "Residents can enjoy premium lifestyle amenities including a clubhouse, fitness centre, indoor games, rooftop amenities, podium amenities, jogging track, yoga deck, kid’s play area, multipurpose lawn, cabana seating and sit-out spaces."
      },
      {
        q: "Does Agarwal Sky Heights have rooftop amenities?",
        a: "Yes. The project Agarwal Sky Heights features thoughtfully designed rooftop amenities including yoga deck, jogging track, open gym, sit-out areas, stargazing point and cabana seating for an elevated lifestyle experience."
      },
      {
        q: "What podium amenities are available?",
        a: "The podium level includes children’s play area, jogging track, landscaped sit-out areas and a multipurpose lawn designed for recreation and family gatherings."
      },
      {
        q: "What Club House amenities are available?",
        a: "The Club House amenities includes Club House with Snooker Table, Indoor Gymnasium, Indoor Games, & Café."
      },
      {
        q: "Is Agarwal Sky Heights close to schools?",
        a: "Yes. The project Agarwal Sky Heights is located near several reputed educational institutions including I-Global School (IGS), Holy Family Convent High School, J.B. Ludhani High School, Seth Vidya Mandir English High School And Junior College of Science And Commerce, Vidya Vikasini School (ICSE) & Junior College and Vartak College of Arts, Commerce, Science"
      },
      {
        q: "How far is Agarwal Sky Heights from the highway and railway station?",
        a: "The project Agarwal Sky Heights is very close to National Highway (10 minutes), Vasai Railway Station (13minutes) making daily commuting very convenient."
      },
      {
        q: "How far is Agarwal Sky Heights from Malls and Cinemas?",
        a: "Agarwal Sky Heights offers excellent connectivity to some of the area’s most popular shopping and entertainment destinations. Broadway Cinema is just 3 minutes away, while Capital Mall is only 8 minutes away, allowing residents to enjoy movies, shopping, dining, and leisure activities just a short drive from home. This prime location ensures that entertainment and everyday conveniences are always within easy reach."
      },
      {
        q: "Which hospitals are located near Agarwal Sky Heights Project?",
        a: "Major healthcare facilities near Agarwal Sky Heights includes IASIS Hospital, Ozone Multispeciality Hospital, and Platinum Hospital"
      },
      {
        q: "Is Agarwal Sky Heights suitable for families?",
        a: "Yes. With spacious homes, children’s play areas, landscaped podium spaces, clubhouse, fitness facilities and proximity to schools and hospitals, the project is designed for comfortable family living."
      },
      {
        q: "Does Agarwal Sky Heights provide parking?",
        a: "Yes. The project offers 3 Podium levels of car parking, ensuring convenient parking for residents."
      },
      {
        q: "Why is Agarwal Sky Heights one of the best residential projects in Vasai East?",
        a: "Agarwal Sky Heights combines modern luxurious 1, 2 & 3 BHK residences with rooftop lifestyle amenities, podium recreation, premium construction, excellent connectivity and a strategic location in Yashwant Smart City in Vasai East. So, Agarwal Sky Heights is one of the best residential project in Vasai East."
      },
      {
        q: "How can I book or schedule a site visit to Agarwal Sky Heights?",
        a: "You can contact our sales team through the enquiry form or call us to schedule a personalised site visit and explore available residences. You can directly reach out to us at + 91 86699 13333."
      },
      {
        q: "Is Agarwal Sky Heights a good investment in Vasai East?",
        a: "With its strategic location in Yashwant Smart City, proximity to schools, colleges, hospitals, Shopping Malls and major roads, along with premium lifestyle amenities and modern residences, Agarwal Sky Heights offers strong appeal for both homebuyers and long-term investors and is best for investment in Vasai East."
      },
      {
        q: "Are home loans available for Agarwal Sky Heights projects?",
        a: "Yes. Agarwal Sky Heights projects is approved by leading banks and financial institutions, making it easier for eligible buyers to avail home loan assistance with a smooth financing process."
      },
      {
        q: "What configurations are available at Agarwal Sky Heights?",
        a: "Agarwal Sky Heights offers premium 1 BHK, 2 BHK and 3 BHK luxury residences for buyers looking for larger living spaces."
      },
      {
        q: "Why should I buy a 1 BHK flat at Agarwal Sky Heights?",
        a: "The 1 BHK residences at Agarwal Sky Heights are designed for modern families, offering specious and efficient layouts, premium specifications, and access to lifestyle amenities in Vasai East."
      },
      {
        q: "Why should I buy a 2 BHK flat at Agarwal Sky Heights?",
        a: "The spacious 2 BHK residences at Agarwal Sky Heights are ideal for growing families seeking premium living, excellent connectivity and modern amenities in Vasai East."
      },
      {
        q: "Is Agarwal Sky Heights a good choice for 3 BHK luxury homes in Virar West?",
        a: "Yes. The spacious 3 BHK residences at Agarwal Sky Heights offers luxury residences, designed for buyers looking for spacious homes with premium lifestyle features in Vasai East."
      },
      {
        q: "What is the starting price of homes at Agarwal Sky Heights ?",
        a: "Pricing of homes at Agarwal Sky Heights varies depending on the apartment configuration and floor selection. Kindly contact our sales team for the latest price list, payment plans, and exclusive offers."
      },
      {
        q: "How well connected is Agarwal Sky Heights to important locations?",
        a: "Agarwal Sky Heights enjoys excellent connectivity:<br/><br/><strong>Schools & Colleges</strong><ul><li>I-Global School (IGS) (1 minutes)</li><li>Holy Family Convent High School (4 minutes)</li><li>J.B. Ludhani High School (5 minutes)</li><li>Seth Vidya Mandir English High School And Junior College of Science And Commerce (7 minutes)</li><li>Vidya Vikasini School (ICSE) & Junior College (9 minutes)</li><li>Vartak College of Arts, Commerce, Science (12 minutes)</li></ul><br/><strong>Important Roads and Transportation</strong><ul><li>Highway (10 minutes)</li><li>Railway Station (13 minutes)</li></ul><br/><strong>Nearest Corporate Hubs</strong><ul><li>Infinity Square (10 minutes)</li></ul><br/><strong>Healthcare</strong><ul><li>IASIS Hospital (3 minutes)</li><li>Ozone Multispeciality Hospital (8 minutes)</li><li>Platinum Hospital (9 minutes)</li></ul><br/><strong>Entertainment</strong><ul><li>Broadway Cinema (3 minutes)</li><li>Capital Mall (8 minutes)</li><li>Box Street Vasai (8 minutes)</li></ul>"
      },
      {
        q: "Are flexible payment Plans available?",
        a: "Yes. Agarwal Sky Heights offers easy payment plans, spot booking offers, and exclusive early buyer benefits for a limited period. Our sales team can help you choose the most suitable payment option based on your requirements."
      }
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
    location: 'Y.K Nagar, Virar (W), MMR Mumbai',
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
      { title: "Grand Clubhouse", desc: "State-of-the-art facility for social and wellness activities", icon: "Coffee" },
      { title: "Sky-High Rooftop Amenities", desc: "Experience unmatched leisure high above the ground", icon: "Sun" },
      { title: "Multipurpose Turf", desc: "Dedicated sporting areas for active lifestyles", icon: "Trophy" },
      { title: "Excellent Connectivity", desc: "Seamless travel with nearby transit hubs", icon: "Train" }
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
      { key: 'Restaurants & Cafes', value: '2 mins' },
      { key: 'Upcoming Metro', value: 'Nearby' }
    ],
    faqs: [
      {
        q: "Where is Agarwal Skyrise located in Virar?",
        a: "Agarwal Skyrise is located in Y. K. Nagar (NX), Near Agarwal Lifestyle, Global City, Virar West, with excellent connectivity to Virar Railway Station, Shopping Centres, Schools, Colleges, Hospitals, and major roads."
      },
      {
        q: "What configurations are available at Agarwal Skyrise?",
        a: "Agarwal Skyrise offers thoughtfully designed premium 1 BHK, 2 BHK, and 3 BHK apartments to suit individuals, families, and investors."
      },
      {
        q: "What amenities does Agarwal Skyrise offer?",
        a: "The project Agarwal Skyrise features modern lifestyle amenities, including Club House, fitness Centre, recreation, landscaped spaces, children’s play areas, Multi-purpose court, and community zones for all age groups."
      },
      {
        q: "Why should I buy a flat in Agarwal Skyrise?",
        a: "Agarwal Skyrise is one of Virar’s most sought-after residential destinations due to its premium location with planned infrastructure, wide roads, excellent connectivity, nearby reputed schools, nearby healthcare facilities, and growing social infrastructure."
      },
      {
        q: "Is Agarwal Skyrise close to Virar Railway Station?",
        a: "Yes, the project enjoys convenient connectivity to Virar Railway Station, making daily commuting across the Mumbai Metropolitan Region very easy and convenient."
      },
      {
        q: "Which schools are near Agarwal Skyrise?",
        a: "The project is located near Gurukul Excellence International School and several other reputed educational institutions, like Rustomjee Cambridge International School, Expert’s international High School And Junior College, Samarth International School, John XXIII CBSE School making it an ideal choice for families with children."
      },
      {
        q: "Which hospitals are located near Agarwal Skyrise?",
        a: "Residents have easy access to leading healthcare facilities, including Wellcare Multispecialty Hospital, Sahyadri Multispecialty Hospital, Parkview Hospital, New Global Hospital, Global Hospital and other nearby medical centers."
      },
      {
        q: "Is Agarwal Skyrise close to shopping and entertainment?",
        a: "Yes. D-Mart, Smart Bazar, Shopping Centers, Restaurants, and entertainment destinations are all located within easy reach of the project."
      },
      {
        q: "Are 1 BHK flats available at Agarwal Skyrise?",
        a: "Yes. The project Agarwal Skyrise offers efficiently planned 1 BHK homes that are designed for modern families, offering specious and efficient layouts, premium specifications, and access to lifestyle amenities in Virar West."
      },
      {
        q: "Are 2 BHK flats available at Agarwal Skyrise?",
        a: "Yes. The project Agarwal Skyrise offers spacious 2 BHK apartments are ideal for growing families seeking premium living, excellent connectivity and modern amenities in Virar West."
      },
      {
        q: "Are 3 BHK apartments available at Agarwal Skyrise?",
        a: "Yes. The project Agarwal Skyrise offers premium 3 BHK luxury residences designed for buyers looking for spacious homes with premium lifestyle features."
      },
      {
        q: "Is Agarwal Skyrise a MahaRERA registered project?",
        a: "Yes, Agarwal Skyrise is a MahaRERA-registered project. The MahaRERA Registration Number is P99000053167, ensuring transparency and compliance with regulatory guidelines, details of the same are available at http://maharera.mahaonline.gov.in"
      },
      {
        q: "What documents are required to buy a flat in Agarwal Skyrise?",
        a: "You typically need basic documents such as identity proof (Aadhaar/PAN), address proof, passport-size photographs to buy a flat in Agarwal Skyrise."
      },
      {
        q: "Why choose Agarwal Skyrise over other projects in Virar?",
        a: "Agarwal Skyrise combines a prime location, spacious residences, premium amenities, quality construction, and excellent connectivity, offering exceptional value for homebuyers."
      },
      {
        q: "Is Agarwal Skyrise suitable for first-time homebuyers?",
        a: "Yes, with multiple apartment configurations, competitive pricing, and a well-connected location, the project is an excellent option for first-time homebuyers, working professionals, and investors."
      },
      {
        q: "Is Agarwal Skyrise suitable for families?",
        a: "Absolutely. Nearby schools, hospitals, shopping destinations, landscaped spaces, and family-friendly amenities make it an ideal residential choice."
      },
      {
        q: "Does Agarwal Skyrise have rooftop amenities?",
        a: "Yes. The project Agarwal Skyrise features thoughtfully designed rooftop amenities including yoga deck, jogging track, open gym, sit-out areas, and cabana seating for an elevated lifestyle experience."
      },
      {
        q: "What is the starting price of homes at Agarwal Skyrise?",
        a: "Pricing of homes at Agarwal Skyrise varies depending on the apartment configuration and floor selection. Kindly contact our sales team at +91 89561 98281 / + 91 89561 98282 / + 91 89561 98283 for the latest price list, payment plans, and exclusive offers."
      },
      {
        q: "Can I book a site visit to Agarwal Skyrise?",
        a: "Yes. You can schedule a personalized site visit to explore the apartments, amenities, floor plans, and available inventory. Kindly contact our sales team at +91 89561 98281 / + 91 89561 98282 / + 91 89561 98283 for the latest price list, payment plans, and exclusive offers."
      },
      {
        q: "Why should I invest in Virar West real estate?",
        a: "Virar West is one of the fastest-growing residential markets in the Mumbai Metropolitan Region, offering affordable homes, improving infrastructure, and strong future growth prospects, making it ideal for investment."
      },
      {
        q: "How can I book a home or schedule a site visit at Agarwal Skyrise?",
        a: "You can fill out the enquiry form on our website to pre-register, request the latest pricing, download the brochure, or schedule a guided site visit. Our sales consultants will assist you with apartment availability, floor plans, home loan guidance, and the complete booking process or alternatively you can call at + 91 89561 98281 / + 91 89561 98282 / + 91 89561 98283."
      },
      {
        q: "How well connected is Agarwal Skyrise to important locations?",
        a: "Agarwal Skyrise enjoys excellent connectivity:<br/><br/><ul><li>D-Mart – 1 minute</li><li>McDonald’s – 2 minutes</li><li>Rustomjee Cambridge International School – 3 minutes</li><li>Star Bazaar – 3 minutes</li><li>Virar Railway Station – 7 minutes</li><li>Prakriti Hospital – 8 minutes</li><li>Viva College – 1 minute</li><li>Grand 36 Turner Road Mall - 1 minute</li></ul>"
      },
      {
        q: "Who is the developer of Agarwal Skyrise?",
        a: "Agarwal Skyrise is developed by Agarwal Group, a trusted real estate developer with decades of experience in the Vasai–Virar, MMR Mumbai region. The group is known for quality construction, timely delivery, transparent business practices, and customer-centric developments."
      },
      {
        q: "What amenities are available at Agarwal Skyrise?",
        a: "Agarwal Skyrise offers a range of modern lifestyle amenities designed for comfort, recreation and wellness. Residents can enjoy a huge podium garden, grand clubhouse, fitness center, and multi-purpose turf creating a comfortable and community-focused lifestyle."
      },
      {
        q: "Does Agarwal Skyrise have rooftop amenities?",
        a: "Yes. The project Agarwal Skyrise features thoughtfully designed rooftop amenities including yoga deck, jogging track, open gym, sit-out areas, and cabana seating for an elevated lifestyle experience."
      },
      {
        q: "Are flexible payment plans and booking offers available at Agarwal Skyrise?",
        a: "Yes. Agarwal Skyrise offers easy payment plans, spot booking offers, and exclusive early buyer benefits for a limited period. Our sales team can help you choose the most suitable payment option based on your requirements."
      }
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
    location: 'Virar-Nsp Link Road, Virar (W), MMR Mumbai',
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
      { key: 'Restaurants & Cafes', value: '2 mins' },
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
