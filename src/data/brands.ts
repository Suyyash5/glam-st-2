import { Brand } from '../types';
import { BRAND_LOGOS } from '../assets/assetData';

export const BRANDS: Brand[] = [
  {
    id: 'anua',
    name: 'Anua',
    slug: 'anua',
    logoUrl: BRAND_LOGOS.anua,
    tagline: 'Pure Heartleaf for Soothing Calm',
    description: 'A Seoul-based minimalist skincare house focused on gentle natural ingredients like Heartleaf to bring true relaxation and clear balance to tired, stressed skin.',
    countryOfOrigin: 'South Korea',
    founded: '2019',
    philosophy: 'Clean, simple formulations that respect the skin barrier and deliver calming clarity with zero irritation.',
    heroColor: '#FAF7F2'
  },
  {
    id: 'bare-anatomy',
    name: 'Bare Anatomy',
    slug: 'bare-anatomy',
    logoUrl: BRAND_LOGOS.bareAnatomy,
    tagline: 'Nature × Science Haircare & Scalp Solutions',
    description: 'Pioneering scientific hair-wellness powered by clean botanicals and advanced peptide complexes engineered to reverse damage and stimulate vigorous growth.',
    countryOfOrigin: 'India',
    founded: '2019',
    philosophy: 'Targeted scalp science and precision biomolecules delivering clinically noticeable hair transformation.',
    heroColor: '#F6F2FA'
  },
  {
    id: 'medicube',
    name: 'Medicube',
    slug: 'medicube',
    logoUrl: BRAND_LOGOS.medicube,
    tagline: 'Clinical Dermatological Care',
    description: 'Renowned derma-cosmetic innovator bringing professional clinic-grade treatments, PDRN salmon DNA, and multi-peptide complexes directly to your daily beauty routine.',
    countryOfOrigin: 'South Korea',
    founded: '2016',
    philosophy: 'Evidence-backed clinical actives formulated for visible pore reduction, elasticity, and dermal recovery.',
    heroColor: '#FAF0F5'
  },
  {
    id: 'purito',
    name: 'Purito Seoul',
    slug: 'purito',
    logoUrl: BRAND_LOGOS.purito,
    tagline: 'Honest, Sustainable K-Beauty Rituals',
    description: 'Formulating barrier-strengthening skincare rich in Fermented Bamboo and Panthenol, crafted with complete transparency and eco-conscious values.',
    countryOfOrigin: 'South Korea',
    founded: '2014',
    philosophy: 'Empowering skin resilience through clean, vegan, and kind formulations that protect both skin and earth.',
    heroColor: '#F0F7F4'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    slug: 'minimalist',
    logoUrl: BRAND_LOGOS.minimalist,
    tagline: 'Hide Nothing. Transparent Active Science.',
    description: 'Revolutionizing everyday skincare with raw transparency, disclosing exact concentrations of proven actives like Niacinamide, Salicylic Acid, and Multi-Peptides.',
    countryOfOrigin: 'India',
    founded: '2020',
    philosophy: 'No marketing fluff. High-purity, proven actives in non-irritating soothing bases for measurable skin health.',
    heroColor: '#F5F5F3'
  },
  {
    id: 'the-derma-co',
    name: 'The Derma Co',
    slug: 'the-derma-co',
    logoUrl: BRAND_LOGOS.dermaCo,
    tagline: 'Designed by Dermatologists',
    description: 'Formulations engineered with potent active ingredients to treat persistent skin challenges like acne scars, pigmentation, open pores, and UV exposure.',
    countryOfOrigin: 'India',
    founded: '2020',
    philosophy: 'Filtered out fluff to focus on high-potency actives backed by rigorous dermatological testing.',
    heroColor: '#F0FAF8'
  },
  {
    id: 'pilgrim',
    name: 'Pilgrim',
    slug: 'pilgrim',
    logoUrl: BRAND_LOGOS.pilgrim,
    tagline: "Discover World's Best Beauty Secrets",
    description: 'Journeying across continents to unearth revered global beauty traditions—from Jeju Island volcanic ash to French Red Vine—for modern wellness rituals.',
    countryOfOrigin: 'India',
    founded: '2019',
    philosophy: 'Curating authentic global beauty secrets free from toxins, parabens, and sulfates.',
    heroColor: '#F7F6F1'
  },
  {
    id: 'mamaearth',
    name: 'Mamaearth',
    slug: 'mamaearth',
    logoUrl: BRAND_LOGOS.mamaearth,
    tagline: 'Goodness Inside. Safe & Toxin-Free.',
    description: 'Certified toxin-free care blending traditional natural ingredients like Onion, Turmeric, and Aloe with modern dermatological safety.',
    countryOfOrigin: 'India',
    founded: '2016',
    philosophy: 'Plant-powered nourishment committed to cruelty-free standards and environmental tree-planting initiatives.',
    heroColor: '#F2F8EE'
  }
];
