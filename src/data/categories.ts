import { Category } from '../types';
import { CATEGORY_IMAGES } from '../assets/assetData';

export const CATEGORIES: Category[] = [
  {
    id: 'skincare',
    name: 'Skincare',
    slug: 'skincare',
    description: 'Targeted serums, ampoules, and essences for luminous vitality and refined texture.',
    image: CATEGORY_IMAGES.skincare,
    itemCount: 14
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    slug: 'nutrition',
    description: 'Oral beauty elixirs, marine collagen, and cellular antioxidants for internal radiance.',
    image: CATEGORY_IMAGES.nutrition,
    itemCount: 8
  },
  {
    id: 'treatments',
    name: 'Treatments',
    slug: 'treatments',
    description: 'High-potency clinical solutions including PDRN, peptide complexes, and scalp treatments.',
    image: CATEGORY_IMAGES.treatments,
    itemCount: 11
  },
  {
    id: 'moisturisers',
    name: 'Moisturisers',
    slug: 'moisturisers',
    description: 'Deeply comforting barrier creams, bamboo panthenol gels, and lipid replenishing lotions.',
    image: CATEGORY_IMAGES.moisturisers,
    itemCount: 9
  },
  {
    id: 'cleansers',
    name: 'Cleansers',
    slug: 'cleansers',
    description: 'Pore-refining cleansing oils, micro-foams, and gentle water balms for a fresh canvas.',
    image: CATEGORY_IMAGES.cleansers,
    itemCount: 10
  }
];
