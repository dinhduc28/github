import { dbStore } from './config/database.js';

export const seedData = () => {
  dbStore.categories = [
    { id: 1, name: 'Spatial Audio', slug: 'spatial-audio', description: 'Bespoke Holographic Headwear & Acoustic Sculptures' },
    { id: 2, name: 'Kinetic Timepieces', slug: 'kinetic-timepieces', description: 'Mechanical Smart Timepieces & Ceramic Crafts' },
    { id: 3, name: 'Vision Tech', slug: 'vision-tech', description: 'Neural Spatial Glasses & Holographic Display Systems' },
    { id: 4, name: 'Ambient Light', slug: 'ambient-light', description: 'Dynamic Diffusers & Kinetic Lighting Nodes' }
  ];

  dbStore.products = [
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
      description: 'Engineered with custom dual 40mm planar magnetic drivers and active liquid crystal noise isolation, the AURA Horizon One delivers unprecedented 3D acoustic clarity with zero harmonic distortion.'
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
      description: 'The world’s first hybrid tourbillon mechanical movement powered by kinetic micro-rotors and linked seamlessly with neural health diagnostics.'
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
      description: 'A 360-degree omnidirectional acoustic sculpture featuring custom tri-axial neodymium transducers that adapt acoustically to the exact architecture of your spatial surroundings.'
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

  console.log('🌱 Seeded 4 Categories and 5 Ultra-Luxury Tech Products into AURA Data Store.');
};

seedData();
