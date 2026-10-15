export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: 'Skincare' | 'Haircare' | 'Nutrition' | 'Treatments' | 'Moisturisers' | 'Cleansers' | 'Sun Protection';
  productType: string;
  skinHairConcern: string[];
  price: number;
  compareAtPrice?: number;
  volume: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockCount: number;
  image: string;
  altImage?: string;
  shortDescription: string;
  fullDescription: string;
  howToUse: string;
  keyIngredients: string[];
  tags: string[];
  texture?: string;
  origin?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  tagline: string;
  description: string;
  countryOfOrigin: string;
  founded: string;
  philosophy: string;
  heroColor: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customerDetails: CustomerDetails;
  paymentMethod: string;
  deliveryMethod: string;
  status: 'demo_submitted' | 'processing';
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
  author: string;
  authorRole: string;
}
