export interface RoomInspiration {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  products: string[];
  tags: string[];
}

export interface BeforeAfter {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  room: string;
  productsUsed: string[];
}

export interface CustomerShowcase {
  id: string;
  customerName: string;
  location: string;
  image: string;
  caption: string;
  products: string[];
  likes: number;
}

export const roomInspirations: RoomInspiration[] = [
  {
    id: 'ri-001',
    title: 'The Royal Salon',
    description: 'A masterclass in Moroccan luxury living. Deep charcoal walls provide the perfect backdrop for gold accents, plush velvet, and intricate metalwork.',
    image: '/images/room-inspiration-1.jpg',
    category: 'Living Room',
    products: ['ml-002', 'wd-001', 'lr-001', 'lr-002'],
    tags: ['luxury', 'gold', 'velvet', 'dark'],
  },
  {
    id: 'ri-002',
    title: 'Serene Sanctuary',
    description: 'Transform your bedroom into a peaceful retreat with soft ivory silks, warm brass lighting, and natural textures inspired by Moroccan riads.',
    image: '/images/room-inspiration-2.jpg',
    category: 'Bedroom',
    products: ['br-001', 'br-002', 'br-003', 'br-004'],
    tags: ['serene', 'ivory', 'silk', 'peaceful'],
  },
  {
    id: 'ri-003',
    title: 'Modern Medina',
    description: 'Contemporary Moroccan design meets urban sophistication. Clean lines, geometric patterns, and a neutral palette with strategic gold pops.',
    image: '/images/room-inspiration-1.jpg',
    category: 'Living Room',
    products: ['mm-002', 'mm-004', 'wd-003', 'ml-003'],
    tags: ['modern', 'geometric', 'neutral', 'urban'],
  },
  {
    id: 'ri-004',
    title: 'Golden Hour Dining',
    description: 'Entertain in style with a dining space that captures the warm glow of Moroccan sunsets. Brass fixtures, rich textiles, and artisan ceramics.',
    image: '/images/room-inspiration-2.jpg',
    category: 'Dining Room',
    products: ['ml-005', 'mm-003', 'lr-003', 'mm-001'],
    tags: ['dining', 'brass', 'entertaining', 'warm'],
  },
];

export const beforeAfters: BeforeAfter[] = [
  {
    id: 'ba-001',
    title: 'From Plain to Palace',
    description: 'See how we transformed a basic living room into a Moroccan-inspired luxury space using carefully curated pieces from Maison Aura.',
    beforeImage: '/images/customer-showcase.jpg',
    afterImage: '/images/room-inspiration-1.jpg',
    room: 'Living Room',
    productsUsed: ['ml-002', 'wd-001', 'lr-002', 'mm-002'],
  },
  {
    id: 'ba-002',
    title: 'Bedroom Bliss',
    description: 'A complete bedroom makeover featuring our silk bedding collection, brass lighting, and hand-woven textiles.',
    beforeImage: '/images/customer-showcase.jpg',
    afterImage: '/images/room-inspiration-2.jpg',
    room: 'Bedroom',
    productsUsed: ['br-001', 'br-002', 'br-004', 'mm-004'],
  },
];

export const customerShowcases: CustomerShowcase[] = [
  {
    id: 'cs-001',
    customerName: 'Layla M.',
    location: 'Casablanca, Morocco',
    image: '/images/customer-showcase.jpg',
    caption: 'My living room has never felt more luxurious. The Atlas floor lamp is the perfect statement piece!',
    products: ['ml-002', 'lr-002', 'wd-001'],
    likes: 1247,
  },
  {
    id: 'cs-002',
    customerName: 'Thomas B.',
    location: 'Paris, France',
    image: '/images/room-inspiration-1.jpg',
    caption: 'The quality of these pieces is unmatched. Every guest asks where I got them.',
    products: ['lm-001', 'ml-001', 'lr-001'],
    likes: 892,
  },
  {
    id: 'cs-003',
    customerName: 'Aisha K.',
    location: 'Dubai, UAE',
    image: '/images/room-inspiration-2.jpg',
    caption: 'Created my dream bedroom with Maison Aura. The silk bedding is absolutely divine.',
    products: ['br-001', 'br-003', 'br-004'],
    likes: 2156,
  },
  {
    id: 'cs-004',
    customerName: 'Marcus J.',
    location: 'London, UK',
    image: '/images/customer-showcase.jpg',
    caption: 'The Beni Ourain rug anchors my entire living space. Worth every dirham.',
    products: ['mm-002', 'ml-003', 'lr-003'],
    likes: 743,
  },
  {
    id: 'cs-005',
    customerName: 'Sofia R.',
    location: 'New York, USA',
    image: '/images/room-inspiration-1.jpg',
    caption: 'Obsessed with my new Moroccan tea set. It makes every gathering feel special.',
    products: ['mm-003', 'mm-001', 'lr-001'],
    likes: 1567,
  },
  {
    id: 'cs-006',
    customerName: 'Karim H.',
    location: 'Marrakech, Morocco',
    image: '/images/room-inspiration-2.jpg',
    caption: 'Proud to support authentic Moroccan craftsmanship. These pieces are heirlooms in the making.',
    products: ['mm-004', 'wd-003', 'ml-001'],
    likes: 2034,
  },
];
