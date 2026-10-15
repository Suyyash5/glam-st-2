import React from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';

interface BrandsProps {
  onSelectBrand: (brandSlug: string) => void;
}

export const Brands: React.FC<BrandsProps> = ({ onSelectBrand }) => {
  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E5DED4] bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-2">
            The Curated Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#171512] mb-3">
            Discover Your Brands
          </h1>
          <p className="text-xs sm:text-sm text-[#524C46] font-light leading-relaxed">
            Explore the names behind your beauty routine. GLAM STUDIO partners directly with verified Korean, Indian, and international beauty laboratories to bring you authentic formulations.
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <h2 className="sr-only">Verified Brand Partners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BRANDS.map(brand => {
            const productCount = PRODUCTS.filter(p => p.brandSlug === brand.slug).length;

            return (
              <div
                key={brand.id}
                onClick={() => onSelectBrand(brand.slug)}
                className="group relative flex flex-col bg-white border border-[#E5DED4] p-4 sm:p-6 transition-all duration-300 hover:border-[#171512] hover:shadow-lg cursor-pointer"
              >
                {/* Brand Logo Container */}
                <div className="h-24 w-full bg-[#FAF8F5] border border-[#E5DED4]/60 p-3 mb-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} logo`}
                    loading="lazy"
                    className="max-h-full max-w-[160px] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Country of Origin Tag */}
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#524C46] mb-2 font-semibold">
                  <MapPin className="w-3 h-3 text-[#C9B18A]" />
                  <span>{brand.countryOfOrigin} · Est. {brand.founded}</span>
                </div>

                {/* Brand Name & Tagline */}
                <h3 className="font-serif text-2xl font-normal text-[#171512] group-hover:text-[#C9B18A] transition-colors mb-2">
                  {brand.name}
                </h3>
                <span className="text-xs font-semibold text-[#171512] italic mb-3">
                  &quot;{brand.tagline}&quot;
                </span>

                {/* Description */}
                <p className="text-xs text-[#524C46] leading-relaxed mb-6 font-light">
                  {brand.description}
                </p>

                {/* Bottom Row */}
                <div className="mt-auto pt-4 border-t border-[#E5DED4] flex items-center justify-between text-xs font-semibold text-[#171512]">
                  <span className="text-[11px] text-[#524C46]">
                    {productCount} {productCount === 1 ? 'Curated Formula' : 'Curated Formulas'}
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Brand</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
