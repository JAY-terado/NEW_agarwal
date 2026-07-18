export interface BlogPost {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
}

export const blogs: BlogPost[] = [
  {
    id: 'green-advantage',
    image: 'blog-green.jpg',
    category: 'Lifestyle · Townships',
    date: 'May 2026',
    title: 'The Green Advantage: Living Amid Landscaped Acres',
    excerpt: 'How thoughtfully planned open spaces and mature landscaping quietly shape healthier, happier communities across our townships.'
  },
  {
    id: 'club-one',
    image: 'blog-club.jpg',
    category: 'Amenities · Club One',
    date: 'Apr 2026',
    title: 'Inside Club One: A World of Leisure at Home',
    excerpt: 'From the swimming pool to the banquet hall — the curated amenities that make every Agarwal address feel like a private retreat.'
  },
  {
    id: 'crafting-homes',
    image: 'blog-interiors.jpg',
    category: 'Design · Interiors',
    date: 'Mar 2026',
    title: 'Crafting Homes Where Families Flourish',
    excerpt: 'The design thinking behind our intelligent floor plans, abundant natural light and timeless finishes built to last a lifetime.'
  },
  {
    id: 'smartest-address',
    image: 'blog-invest.jpg',
    category: 'Investment · Vasai–Virar',
    date: 'Feb 2026',
    title: 'Why Vasai–Virar Is Mumbai\'s Smartest Address',
    excerpt: 'Connectivity, infrastructure and value — the case for why the region is one of the metro\'s most promising places to own a home.'
  },
  {
    id: 'build-philosophy',
    image: 'blog-craft.jpg',
    category: 'Craftsmanship · Legacy',
    date: 'Jan 2026',
    title: 'From Blueprint to Belonging: Our Build Philosophy',
    excerpt: 'Forty-seven years of meticulous planning, clear titles and on-time delivery — the principles that turn a structure into a home.'
  },
  {
    id: 'festival-firsts',
    image: 'blog-festival.jpg',
    category: 'Community · Celebrations',
    date: 'Dec 2025',
    title: 'A Festival of Firsts: Celebrating New Beginnings',
    excerpt: 'Diwali, housewarmings and milestones — a look at the moments that make our communities feel like one extended family.'
  }
];
