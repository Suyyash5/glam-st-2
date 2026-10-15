import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { Product, Brand } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productSlug: string) => void;
  onSelectBrand: (brandSlug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectBrand
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchingProducts: Product[] = normalizedQuery
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.brand.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.tags.some(t => t.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const matchingBrands: Brand[] = normalizedQuery
    ? BRANDS.filter(
        b =>
          b.name.toLowerCase().includes(normalizedQuery) ||
          b.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start items-center p-2.5 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171512]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-3xl bg-[#F8F5F0] border border-[#E5DED4] shadow-2xl z-10 flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden mt-2 sm:mt-0">
        {/* Search Header */}
        <div className="p-3.5 sm:p-6 border-b border-[#E5DED4] flex items-center gap-2.5 sm:gap-4 bg-white">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#524C46] shrink-0" />
          <label htmlFor="search-modal-input" className="sr-only">
            Search skincare, haircare, brands, concerns
          </label>
          <input
            id="search-modal-input"
            ref={inputRef}
            type="search"
            aria-label="Search skincare, hair, brands, concerns"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skincare, hair, brands, concerns..."
            className="flex-1 bg-transparent text-sm sm:text-lg text-[#171512] placeholder:text-[#524C46]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[10px] sm:text-xs uppercase font-medium text-[#524C46] hover:text-[#171512] px-1.5 sm:px-2 py-1 cursor-pointer"
              aria-label="Clear search input"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 text-[#524C46] hover:text-[#171512] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!normalizedQuery ? (
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#524C46] block mb-3">
                Trending In The Edit
              </span>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  'Anua Cleansing Oil',
                  'Bare Anatomy Hair Growth',
                  'Medicube PDRN Pink Serum',
                  'Purito Bamboo Panthenol',
                  'Beauty of Joseon Sunscreen',
                  'Double Cleansing'
                ].map(item => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E5DED4] text-xs text-[#171512] hover:border-[#171512] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#524C46] block mb-3">
                Featured Brands
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BRANDS.slice(0, 4).map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      onSelectBrand(brand.slug);
                      onClose();
                    }}
                    className="p-3 bg-white border border-[#E5DED4] text-left hover:border-[#171512] transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-semibold text-[#171512] group-hover:text-[#C9B18A] block">
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-[#524C46] block mt-0.5">
                      {brand.countryOfOrigin}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : matchingProducts.length === 0 && matchingBrands.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-xl text-[#171512] mb-2">No results found</p>
              <p className="text-xs text-[#524C46]">
                We couldn’t find anything matching &quot;{query}&quot;. Try searching for &quot;serum&quot;, &quot;sunscreen&quot;, or &quot;Minimalist&quot;.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Brand Matches */}
              {matchingBrands.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#524C46] block mb-3">
                    Matching Brands ({matchingBrands.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingBrands.map(brand => (
                      <button
                        key={brand.id}
                        onClick={() => {
                          onSelectBrand(brand.slug);
                          onClose();
                        }}
                        className="p-3 bg-white border border-[#E5DED4] flex items-center justify-between hover:border-[#171512] transition-colors text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="w-10 h-10 object-contain mix-blend-multiply border border-[#E5DED4] p-1 bg-[#FAF8F5]"
                          />
                          <div>
                            <span className="text-sm font-semibold text-[#171512] group-hover:text-[#C9B18A] block">
                              {brand.name}
                            </span>
                            <span className="text-[10px] text-[#524C46] block">
                              {brand.countryOfOrigin} · {brand.tagline}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#524C46] group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Matches */}
              {matchingProducts.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#524C46] block mb-3">
                    Matching Products ({matchingProducts.length})
                  </span>
                  <div className="divide-y divide-[#E5DED4] bg-white border border-[#E5DED4]">
                    {matchingProducts.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product.slug);
                          onClose();
                        }}
                        className="p-4 flex items-center gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer group"
                      >
                        <div className="w-14 h-14 bg-[#F8F5F0] p-1 shrink-0 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[#524C46] block">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-medium text-[#171512] truncate group-hover:text-[#C9B18A] transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-xs text-[#524C46] block mt-0.5">
                            {product.volume}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-semibold text-[#171512]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
