import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aura-01',
    name: 'AURA Horizon One',
    tagline: 'Titanium Spatial Holographic Earwear',
    price: 1850,
    comparePrice: 2100,
    category: 'Spatial Audio',
    rating: 4.95,
    reviewCount: 142,
    stock: 24,
    isFeatured: true,
    material: 'Aerospace Grade 5 Titanium & Sapphire Glass',
    warranty: '3-Year Global Platinum Warranty',
    colors: ['Obsidian Black', 'Titanium Silver', 'Champagne Gold'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Engineered with dual 40mm planar magnetic acoustic drivers and active liquid crystal noise isolation, the AURA Horizon One delivers 3D acoustic clarity with zero harmonic distortion.'
  },
  {
    id: 'aura-02',
    name: 'AURA Chrono Kinetic V',
    tagline: 'Precision Mechanical Smart Timepiece',
    price: 3400,
    comparePrice: 3800,
    category: 'Kinetic Timepieces',
    rating: 4.98,
    reviewCount: 89,
    stock: 12,
    isFeatured: true,
    material: 'Forged Carbon Fiber & Ceramic Bezel',
    warranty: '5-Year Mechanical Warranty',
    colors: ['Carbon Black', 'Starlight Gold'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Hybrid tourbillon mechanical movement powered by kinetic micro-rotors and linked seamlessly with neural biometric health diagnostics.'
  },
  {
    id: 'aura-03',
    name: 'AURA Acoustic Sphere 360',
    tagline: 'Liquid Aluminum Sculptural Sound System',
    price: 2900,
    comparePrice: 3200,
    category: 'Spatial Audio',
    rating: 4.90,
    reviewCount: 64,
    stock: 18,
    isFeatured: true,
    material: 'Seamless Polished Liquid Aluminum',
    warranty: '3-Year Warranty',
    colors: ['Liquid Platinum', 'Deep Space Gray'],
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'An omnidirectional acoustic sculpture featuring tri-axial neodymium transducers that adapt dynamically to room architecture.'
  },
  {
    id: 'aura-04',
    name: 'AURA Vision Glass Pro',
    tagline: 'Neural Spatial AR Headset',
    price: 4200,
    comparePrice: 4600,
    category: 'Vision Tech',
    rating: 4.99,
    reviewCount: 215,
    stock: 8,
    isFeatured: true,
    material: 'Ultralight Magnesium Alloy & Micro-OLED',
    warranty: '2-Year Hardware Warranty',
    colors: ['Obsidian Black'],
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Dual 8K Micro-OLED displays with sub-millimeter eye-tracking precision. Seamlessly blend physical reality with high-fidelity spatial computing.'
  },
  {
    id: 'aura-05',
    name: 'AURA Ambient Light Node',
    tagline: 'Dynamic Kinetic Diffuser & Light Sculpture',
    price: 980,
    comparePrice: 1150,
    category: 'Ambient Light',
    rating: 4.88,
    reviewCount: 51,
    stock: 35,
    isFeatured: false,
    material: 'Hand-blown Frosted Crystal & Brushed Brass',
    warranty: '2-Year Warranty',
    colors: ['Brushed Brass', 'Black Anodized Aluminum'],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Emits reactive ambient circadian light sweeps synchronized with music acoustics or biometric heart rate flow.'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    userName: 'Alexander Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'July 14, 2026',
    title: 'An Engineering Masterpiece',
    comment: 'The acoustic staging and micro-finish titanium feel unreal. Unquestionably the Apple of high-end spatial audio.',
    verified: true
  },
  {
    id: 'rev-02',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'June 28, 2026',
    title: 'Exceeds Billion Dollar Brand Expectations',
    comment: 'The packaging, weight distribution, and real-time noise cancellation feel futuristic. Worth every single dollar.',
    verified: true
  }
];
