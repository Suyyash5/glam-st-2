import React from 'react';
import { ArrowLeft, MapPin, Sparkles } from 'lucide-react';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface BrandDetailProps {
  brandSlug: string;
  onBackToBrands: () => void;
  onSelectProduct: (slug: string) => void;
}

export const BrandDetail: React.FC<BrandDetailProps> = ({
  brandSlug,
  onBackToBrands,
  onSelectProduct
}) => {
  const brand = BRANDS.find(b => b.slug === brandSlug);
  const brandProducts = PRODUCTS.filter(p => p.brandSlug === brandSlug);

  if (!brand) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#171512] mb-3">Brand Not Found</h2>
        <p className="text-xs text-[#524C46] mb-6">The requested brand is not currently active in our catalogue.</p>
        <button
          onClick={onBackToBrands}
          className="px-6 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-wider"
        >
          View All Brands
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen pb-24">
      {/* Brand Hero Banner */}
      <div className="border-b border-[#E5DED4] bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBackToBrands}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#524C46] hover:text-[#171512] mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Brands</span>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Brand Logo & Info */}
            <div className="md:col-span-8 flex flex-col items-start">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#524C46] font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#C9B18A]" />
                <span>{brand.countryOfOrigin} · Founded {brand.founded}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#171512] mb-3">
                {brand.name}
              </h1>

              <p className="font-serif italic text-lg sm:text-xl text-[#C9B18A] mb-4">
                &quot;{brand.tagline}&quot;
              </p>

              <p className="text-xs sm:text-sm text-[#524C46] leading-relaxed max-w-2xl font-light mb-4">
                {brand.description}
              </p>

              <div className="p-4 bg-[#FAF8F5] border-l-2 border-[#171512] max-w-2xl">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#171512] block mb-1">
                  Brand Philosophy
                </span>
                <p className="text-xs text-[#524C46] leading-relaxed">
                  {brand.philosophy}
                </p>
              </div>
            </div>

            {/* Logo Card */}
            <div className="md:col-span-4 flex justify-center">
              <div className="p-8 bg-[#FAF8F5] border border-[#E5DED4] shadow-xs max-w-xs w-full flex items-center justify-center">
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="max-h-16 max-w-full object-contain mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between pb-6 border-b border-[#E5DED4] mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#524C46] block">
              Curated Catalogue
            </span>
            <h2 className="font-serif text-2xl text-[#171512]">
              All Formulations by {brand.name}
            </h2>
          </div>

          <span className="text-xs text-[#524C46]">
            {brandProducts.length} {brandProducts.length === 1 ? 'Product Available' : 'Products Available'}
          </span>
        </div>

        {brandProducts.length === 0 ? (
          <div className="bg-white border border-[#E5DED4] p-12 text-center">
            <p className="font-serif text-xl text-[#171512] mb-2">No active items for this brand</p>
            <p className="text-xs text-[#524C46]">Check back shortly as new shipments arrive.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {brandProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 2}
                onClick={() => onSelectProduct(product.slug)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
