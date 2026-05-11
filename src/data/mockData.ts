import { Product, Review } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Logo Tech Futurista',
    description: 'Diseño de bordado con efectos de hilo metalizado y relieve 3D.',
    price: 15.99,
    category: 'Logos',
    image: 'https://picsum.photos/seed/emb1/400/400',
    formats: ['DST', 'PES', 'JEF', 'EMB'],
    stitchCount: 12500,
    dimensions: '10x10 cm',
    isPremium: true
  },
  {
    id: '2',
    name: 'Stitch Kawaii Edition',
    description: 'Personaje Stitch con acabados en tatami de alta densidad.',
    price: 12.50,
    category: 'Stitch',
    image: 'https://picsum.photos/seed/emb2/400/400',
    formats: ['DST', 'PES', 'EXP'],
    stitchCount: 8900,
    dimensions: '8x8 cm'
  },
  {
    id: '3',
    name: 'Escudo Institucional Pro',
    description: 'Bordado formal para uniformes colegiales con bordes reforzados.',
    price: 9.99,
    category: 'Colegios',
    image: 'https://picsum.photos/seed/emb3/400/400',
    formats: ['DST', 'PES', 'XXX'],
    stitchCount: 5600,
    dimensions: '7x7 cm'
  },
  {
    id: '4',
    name: 'Bandera Realista 3D',
    description: 'Simulación de bandera con texturas de hilo direccionales.',
    price: 0,
    category: 'Banderas',
    image: 'https://picsum.photos/seed/emb4/400/400',
    formats: ['DST', 'PES', 'EMB'],
    stitchCount: 4200,
    dimensions: '5x3 cm',
    isFree: true
  },
  {
    id: '5',
    name: 'Cyber Tiger Head',
    description: 'Diseño complejo con degradados de color simulados en Wilcom.',
    price: 19.99,
    category: 'Premium',
    image: 'https://picsum.photos/seed/emb5/400/400',
    formats: ['DST', 'PES', 'EMB'],
    stitchCount: 22000,
    dimensions: '15x15 cm',
    isPremium: true
  },
   {
    id: '6',
    name: 'Mascota Bulldog Francés',
    description: 'Detalle increíble en pelaje simulado con puntadas running.',
    price: 14.00,
    category: 'Perros',
    image: 'https://picsum.photos/seed/emb6/400/400',
    formats: ['DST', 'PES'],
    stitchCount: 15400,
    dimensions: '10x12 cm'
  }
];

export const MICK_REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Carlos R.',
    userAvatar: 'https://i.pravatar.cc/150?u=carlos',
    rating: 5,
    comment: 'La calidad de la digitalización es impresionante. Wilcom E4.2 se nota en cada puntada. ¡Mi máquina industrial lo bordó perfecto!',
    imageUrl: 'https://picsum.photos/seed/rev1/400/400',
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: '2',
    userName: 'Elena M.',
    userAvatar: 'https://i.pravatar.cc/150?u=elena',
    rating: 5,
    comment: 'El servicio de IA para bordados es magia pura. Transformó mi dibujo en un patrón de puntadas listo para usar.',
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: '3',
    userName: 'Juan P.',
    userAvatar: 'https://i.pravatar.cc/150?u=juan',
    rating: 4,
    comment: 'Muy buenos diseños gratis. Compré el premium de los países y la densidad de hilo es la correcta.',
    imageUrl: 'https://picsum.photos/seed/rev2/400/400',
    createdAt: Date.now() - 86400000 * 10
  }
];

export const CATEGORIES = [
  'Perros', 'Gatos', 'Familia', 'Logos', 'Carros', 'Motos', 'Stitch',
  'Personalizados', 'Institucionales', 'Siluetas', 'Dibujos', 'Infantiles',
  'Colegios', 'Países', 'Banderas', 'Retratos', 'Personas', 'Premium', 'Gratis'
];
