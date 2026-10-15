import React, { useState, useMemo } from 'react';
import { Filter, X, Search, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

interface ShopProps {
  initialCategory?: string;
  initialBrand?: string;
  initialFilter?: string;
  onSelectProduct: (slug: string) => void;
  onSelectBrand: (brandSlug: string) => void;
}

export const Shop: React.FC<ShopProps> = ({
  initialCategory,
  initialBrand,
  initialFilter,
  onSelectProduct,
  onSelectBrand
}) => {
  const { wishlistIds } = useWishlist();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand || 'All');
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(initialFilter === 'bestseller');
  const [wishlistOnly, setWishlistOnly] = useState(initialFilter === 'wishlist');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available concerns derived from catalog
  const allConcerns = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach(p => p.skinHairConcern.forEach(c => set.add(c)));
    return Array.from(set);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTags) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'All' && p.brandSlug !== selectedBrand && p.brand !== selectedBrand) {
        return false;
      }

      // Concern
      if (selectedConcern !== 'All' && !p.skinHairConcern.includes(selectedConcern)) {
        return false;
      }

      // In stock
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // Bestseller filter
      if (bestsellerOnly && !p.isBestseller) {
        return false;
      }

      // Wishlist filter
      if (wishlistOnly && !wishlistIds.includes(p.id)) {
        return false;
      }

      // Price limit
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedConcern,
    inStockOnly,
    bestsellerOnly,
    wishlistOnly,
    maxPrice,
    sortBy,
    wishlistIds
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedBrand !== 'All' ? 1 : 0) +
    (selectedConcern !== 'All' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (bestsellerOnly ? 1 : 0) +
    (wishlistOnly ? 1 : 0) +
    (maxPrice < 3000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedConcern('All');
    setInStockOnly(false);
    setBestsellerOnly(false);
    setWishlistOnly(false);
    setMaxPrice(3000);
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen pb-24">
      {/* Editorial Page Header */}
      <div className="border-b border-[#E5DED4] bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-2">
            The Curated Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#171512] mb-3">
            The Beauty Edit
          </h1>
          <p className="text-xs sm:text-sm text-[#524C46] font-light leading-relaxed">
            Explore thoughtfully selected skincare, haircare, treatments, and everyday essentials from global dermatological and herbal houses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Sort Controls Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#E5DED4]">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#524C46] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <label htmlFor="shop-search-input" className="sr-only">
              Search products, brands, ingredients
            </label>
            <input
              id="shop-search-input"
              type="search"
              aria-label="Search by product, brand, ingredient"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by product, brand, ingredient..."
              className="w-full bg-white border border-[#E5DED4] pl-10 pr-4 py-2.5 text-xs text-[#171512] placeholder:text-[#524C46]/70 focus:outline-none focus:border-[#171512]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#524C46] hover:text-[#171512]"
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Toolbar: Mobile Filter Trigger + Sort dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-white border border-[#E5DED4] text-xs font-semibold uppercase tracking-wider text-[#171512] flex items-center gap-2"
              aria-label="Open filter options"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Product Counter */}
            <span className="text-xs text-[#524C46] hidden sm:inline">
              Showing <span className="font-semibold text-[#171512]">{filteredProducts.length}</span> results
            </span>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort-select" className="text-[11px] uppercase tracking-wider text-[#524C46] hidden sm:inline">
                Sort:
              </label>
              <select
                id="shop-sort-select"
                aria-label="Sort products by"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E5DED4] px-3 py-2 text-xs text-[#171512] focus:outline-none focus:border-[#171512] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-4 border-b border-[#E5DED4]">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#524C46]">
              Active Filters:
            </span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DED4] text-xs text-[#171512]">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="text-[#524C46] hover:text-[#171512]" aria-label="Remove category filter">✕</button>
              </span>
            )}

            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DED4] text-xs text-[#171512]">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('All')} className="text-[#524C46] hover:text-[#171512]" aria-label="Remove brand filter">✕</button>
              </span>
            )}

            {selectedConcern !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DED4] text-xs text-[#171512]">
                Concern: {selectedConcern}
                <button onClick={() => setSelectedConcern('All')} className="text-[#524C46] hover:text-[#171512]" aria-label="Remove concern filter">✕</button>
              </span>
            )}

            {bestsellerOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#171512] text-white text-xs">
                Bestsellers Only
                <button onClick={() => setBestsellerOnly(false)} className="text-[#C9B18A] hover:text-white" aria-label="Remove bestseller filter">✕</button>
              </span>
            )}

            {wishlistOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#171512] text-white text-xs">
                Wishlist Items
                <button onClick={() => setWishlistOnly(false)} className="text-[#C9B18A] hover:text-white" aria-label="Remove wishlist filter">✕</button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DED4] text-xs text-[#171512]">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="text-[#524C46] hover:text-[#171512]" aria-label="Remove in stock filter">✕</button>
              </span>
            )}

            {maxPrice < 3000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5DED4] text-xs text-[#171512]">
                Under ₹{maxPrice}
                <button onClick={() => setMaxPrice(3000)} className="text-[#524C46] hover:text-[#171512]" aria-label="Remove price filter">✕</button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs uppercase tracking-wider font-semibold text-[#9E3B33] hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 pr-4 border-r border-[#E5DED4]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DED4]">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#171512]">
                Refine Edit
              </h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#524C46] hover:text-[#171512] flex items-center gap-1 cursor-pointer"
                  aria-label="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#171512] block mb-3">
                Category
              </h3>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left py-1.5 px-2.5 transition-colors cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-[#171512] text-white font-semibold'
                      : 'text-[#524C46] hover:text-[#171512] hover:bg-[#EFE7DC]/50'
                  }`}
                >
                  All Categories ({PRODUCTS.length})
                </button>
                {CATEGORIES.map(cat => {
                  const count = PRODUCTS.filter(p => p.category === cat.name).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left py-1.5 px-2.5 transition-colors cursor-pointer flex justify-between items-center ${
                        selectedCategory === cat.name
                          ? 'bg-[#171512] text-white font-semibold'
                          : 'text-[#524C46] hover:text-[#171512] hover:bg-[#EFE7DC]/50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#171512] block mb-3">
                Curated Brand
              </h3>
              <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedBrand('All')}
                  className={`w-full text-left py-1.5 px-2.5 transition-colors cursor-pointer ${
                    selectedBrand === 'All'
                      ? 'bg-[#171512] text-white font-semibold'
                      : 'text-[#524C46] hover:text-[#171512] hover:bg-[#EFE7DC]/50'
                  }`}
                >
                  All Brands
                </button>
                {BRANDS.map(brand => {
                  const count = PRODUCTS.filter(p => p.brandSlug === brand.slug).length;
                  return (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.slug)}
                      className={`w-full text-left py-1.5 px-2.5 transition-colors cursor-pointer flex justify-between items-center ${
                        selectedBrand === brand.slug
                          ? 'bg-[#171512] text-white font-semibold'
                          : 'text-[#524C46] hover:text-[#171512] hover:bg-[#EFE7DC]/50'
                      }`}
                    >
                      <span>{brand.name}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skin / Hair Concern Filter */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#171512] block mb-3">
                Targeted Concern
              </h3>
              <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedConcern('All')}
                  className={`w-full text-left py-1.5 px-2.5 transition-colors cursor-pointer ${
                    selectedConcern === 'All'
                      ? 'bg-[#171512] text-white font-semibold'
                      : 'text-[#524C46] hover:text-[#171512] hover:bg-[#EFE7DC]/50'
                  }`}
                >
                  All Concerns
                </button>
                {allConcerns.map(concern => (
                  <button
                    key={concern}
                    onClick={() => setSelectedConcern(concern)}
                    className={`w-full text-left py-1.5 px-2.5 transition-colors cursor-pointer text-xs ${
                      selectedConcern === concern
                        ? 'bg-[#171512] text-white font-semibold'
                        : 'text-[#524C46] hover:text-[#171512] hover:bg-[#EFE7DC]/50'
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="desktop-max-price" className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#171512] cursor-pointer">
                  Max Price
                </label>
                <span className="text-xs font-semibold text-[#171512]">
                  Up to ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="desktop-max-price"
                aria-label="Maximum price in rupees"
                type="range"
                min="499"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#171512] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#524C46] mt-1">
                <span>₹499</span>
                <span>₹3,000</span>
              </div>
            </div>

            {/* Checkbox toggles */}
            <div className="pt-4 border-t border-[#E5DED4] space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-[#171512] cursor-pointer">
                <input
                  type="checkbox"
                  checked={bestsellerOnly}
                  onChange={e => setBestsellerOnly(e.target.checked)}
                  className="accent-[#171512] w-4 h-4 rounded-none"
                />
                <span>Bestsellers Only</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[#171512] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="accent-[#171512] w-4 h-4 rounded-none"
                />
                <span>In Stock Only</span>
              </label>

              {wishlistIds.length > 0 && (
                <label className="flex items-center gap-2.5 text-xs text-[#171512] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wishlistOnly}
                    onChange={e => setWishlistOnly(e.target.checked)}
                    className="accent-[#171512] w-4 h-4 rounded-none"
                  />
                  <span>My Wishlist ({wishlistIds.length})</span>
                </label>
              )}
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            <h2 className="sr-only">Curated Products Catalog</h2>
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white border border-[#E5DED4] p-8">
                <h3 className="font-serif text-2xl text-[#171512] mb-2">No products match your criteria</h3>
                <p className="text-xs text-[#524C46] max-w-sm mx-auto mb-6">
                  Try clearing some filters or searching for broader terms like &quot;serum&quot; or &quot;Anua&quot;.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C9B18A] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 2}
                    onClick={() => onSelectProduct(product.slug)}
                    onBrandClick={onSelectBrand}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#F8F5F0] h-full shadow-2xl flex flex-col justify-between ml-auto z-10">
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 bg-white border-b border-[#E5DED4] flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-serif text-xl text-[#171512]">Filter The Edit</h2>
                <span className="text-[10px] text-[#524C46] uppercase tracking-wider">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} available
                </span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[#524C46] hover:text-[#171512] transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* Category */}
              <div>
                <label htmlFor="mobile-category-select" className="text-xs uppercase tracking-wider font-bold text-[#171512] block mb-2 cursor-pointer">
                  Category
                </label>
                <select
                  id="mobile-category-select"
                  aria-label="Filter products by category"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-[#E5DED4] p-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#171512]"
                >
                  <option value="All">All Categories ({PRODUCTS.length})</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="mobile-brand-select" className="text-xs uppercase tracking-wider font-bold text-[#171512] block mb-2 cursor-pointer">
                  Brand
                </label>
                <select
                  id="mobile-brand-select"
                  aria-label="Filter products by brand"
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="w-full bg-white border border-[#E5DED4] p-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#171512]"
                >
                  <option value="All">All Brands ({BRANDS.length})</option>
                  {BRANDS.map(b => (
                    <option key={b.id} value={b.slug}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Targeted Concern */}
              <div>
                <label htmlFor="mobile-concern-select" className="text-xs uppercase tracking-wider font-bold text-[#171512] block mb-2 cursor-pointer">
                  Targeted Concern
                </label>
                <select
                  id="mobile-concern-select"
                  aria-label="Filter products by targeted concern"
                  value={selectedConcern}
                  onChange={e => setSelectedConcern(e.target.value)}
                  className="w-full bg-white border border-[#E5DED4] p-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#171512]"
                >
                  <option value="All">All Concerns</option>
                  {allConcerns.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Max Price */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="mobile-max-price" className="text-xs uppercase tracking-wider font-bold text-[#171512] cursor-pointer">
                    Max Price
                  </label>
                  <span className="text-xs font-semibold text-[#171512]">
                    Up to ₹{maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  id="mobile-max-price"
                  aria-label="Maximum price in rupees"
                  type="range"
                  min="499"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#171512] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#524C46] mt-1">
                  <span>₹499</span>
                  <span>₹3,000</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-[#E5DED4] space-y-3">
                <label className="flex items-center gap-2.5 text-xs text-[#171512] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bestsellerOnly}
                    onChange={e => setBestsellerOnly(e.target.checked)}
                    className="accent-[#171512] w-4 h-4 rounded-none"
                  />
                  <span>Bestsellers Only</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[#171512] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                    className="accent-[#171512] w-4 h-4 rounded-none"
                  />
                  <span>In Stock Only</span>
                </label>

                {wishlistIds.length > 0 && (
                  <label className="flex items-center gap-2.5 text-xs text-[#171512] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wishlistOnly}
                      onChange={e => setWishlistOnly(e.target.checked)}
                      className="accent-[#171512] w-4 h-4 rounded-none"
                    />
                    <span>My Wishlist ({wishlistIds.length})</span>
                  </label>
                )}
              </div>
            </div>

            {/* Sticky Bottom Action Buttons */}
            <div className="p-4 bg-white border-t border-[#E5DED4] flex gap-3 shrink-0">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-[#E5DED4] bg-[#F8F5F0] text-xs font-semibold uppercase tracking-wider text-[#524C46] hover:text-[#171512] transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C9B18A] transition-colors cursor-pointer"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
