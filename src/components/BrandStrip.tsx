import React from 'react';
import { BRANDS } from '../data/brands';

interface BrandStripProps {
  onSelectBrand: (brandSlug: string) => void;
}

export const BrandStrip: React.FC<BrandStripProps> = ({ onSelectBrand }) => {
  return (
    <section className="w-full bg-[#FFFFFF] border-y border-[#E5DED4] py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4 sm:mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-[#77716B]">
            Official Partner Brands
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#77716B]">
            100% Authentic · Science-Backed Formulations
          </span>
        </div>

        {/* Partner Brands Grid: 4 columns on mobile (2 rows of 4), 8 on desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
          {BRANDS.map(brand => (
            <button
              key={brand.id}
              onClick={() => onSelectBrand(brand.slug)}
              className="group h-13 sm:h-16 flex items-center justify-center p-2 sm:px-3 sm:py-2 bg-[#FAF8F5] hover:bg-white border border-[#E5DED4] hover:border-[#171512] transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer rounded-xs"
              title={`View ${brand.name} collection`}
            >
              <img
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                className="max-h-7 sm:max-h-9 max-w-full w-auto h-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
