import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductDetailProps {
  productSlug: string;
  onBack: () => void;
  onSelectBrand: (brandSlug: string) => void;
  onSelectProduct: (slug: string) => void;
  onCheckoutDirect: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productSlug,
  onBack,
  onSelectBrand,
  onSelectProduct,
  onCheckoutDirect
}) => {
  const product = PRODUCTS.find(p => p.slug === productSlug);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'usage' | 'ingredients' | 'shipping'>('details');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#171512] mb-3">Product Not Found</h2>
        <p className="text-xs text-[#77716B] mb-6">The requested product could not be located in our catalogue.</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onCheckoutDirect();
  };

  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen pb-32 lg:pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E5DED4] bg-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#524C46]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-medium text-[#171512] hover:text-[#C9B18A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to The Edit</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span>Shop</span>
            <span>/</span>
            <button
              onClick={() => onSelectBrand(product.brandSlug)}
              className="hover:text-[#171512]"
            >
              {product.brand}
            </button>
            <span>/</span>
            <span className="text-[#171512] font-semibold truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Product Imagery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-4/5 w-full bg-white border border-[#E5DED4] p-4 sm:p-8 lg:p-12 shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                fetchPriority="high"
                loading="eager"
                className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex flex-col gap-1.5">
                {product.isBestseller && (
                  <span className="bg-[#171512] text-[#F8F5F0] text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-bold px-2 sm:px-3 py-0.5 sm:py-1">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-[#C9B18A] text-white text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-bold px-2 sm:px-3 py-0.5 sm:py-1">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full bg-[#F8F5F0] hover:bg-white border border-[#E5DED4] text-[#171512] transition-colors shadow-xs cursor-pointer"
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-[#171512]' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery / Guarantee strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-3 bg-white border border-[#171512] flex items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#171512]">
                  Authentic Bottle
                </span>
              </div>
              <div className="p-3 bg-white border border-[#E5DED4] flex items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#524C46]">
                  Batch Tested
                </span>
              </div>
              <div className="p-3 bg-white border border-[#E5DED4] flex items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#524C46]">
                  Official Import
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchasing & Details */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Brand Link */}
            <button
              onClick={() => onSelectBrand(product.brandSlug)}
              className="text-left text-xs uppercase tracking-[0.25em] font-bold text-[#524C46] hover:text-[#171512] transition-colors mb-2 inline-block cursor-pointer"
            >
              {product.brand}
            </button>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171512] font-normal leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating & Volume Row */}
            <div className="flex items-center gap-4 text-xs text-[#524C46] mb-6 pb-4 border-b border-[#E5DED4]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#C9B18A]">★★★★★</span>
                <span className="font-semibold text-[#171512]">{product.rating}</span>
                <span>({product.reviewCount} verified reviews)</span>
              </div>
              <span>·</span>
              <span className="font-semibold text-[#171512]">{product.volume}</span>
              <span>·</span>
              <span className="text-[#00805A] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00805A]" />
                In Stock ({product.stockCount} left)
              </span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl font-semibold text-[#171512]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-sm text-[#77716B] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#00805A] bg-[#00805A]/10 px-2 py-0.5">
                    Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed font-light mb-8">
              {product.shortDescription}
            </p>

            {/* Key Concerns Addressed */}
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#171512] block mb-2">
                Targeted For:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.skinHairConcern.map(c => (
                  <span
                    key={c}
                    className="px-3 py-1 bg-white border border-[#E5DED4] text-xs text-[#171512]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchasing Controls */}
            <div className="p-6 bg-white border border-[#E5DED4] space-y-4 mb-8">
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#E5DED4] bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 text-[#171512] hover:bg-white transition-colors disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-[#171512]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                    className="p-3 text-[#171512] hover:bg-white transition-colors disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag Primary Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedSuccess ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 border border-[#171512] text-[#171512] hover:bg-[#171512] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
              >
                Instant Checkout →
              </button>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E5DED4] text-[11px] text-[#77716B]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C9B18A]" />
                  <span>Free Express Delivery &gt; ₹999</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00805A]" />
                  <span>100% Genuine Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Expandable Tabs / Accordions */}
            <div className="border border-[#E5DED4] bg-white divide-y divide-[#E5DED4]">
              {/* Product Details Tab */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'details' ? ('' as any) : 'details')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-bold text-[#171512]"
                >
                  <span>Full Product Description</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'details' && (
                  <div className="p-4 pt-0 text-xs text-[#77716B] leading-relaxed space-y-2">
                    <p>{product.fullDescription}</p>
                    {product.texture && (
                      <p className="font-semibold text-[#171512]">Texture: {product.texture}</p>
                    )}
                    {product.origin && (
                      <p className="font-semibold text-[#171512]">Country of Origin: {product.origin}</p>
                    )}
                  </div>
                )}
              </div>

              {/* How to Use Tab */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'usage' ? ('' as any) : 'usage')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-bold text-[#171512]"
                >
                  <span>How to Use In Your Routine</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'usage' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'usage' && (
                  <div className="p-4 pt-0 text-xs text-[#77716B] leading-relaxed">
                    <p>{product.howToUse}</p>
                  </div>
                )}
              </div>

              {/* Key Ingredients Tab */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'ingredients' ? ('' as any) : 'ingredients')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-bold text-[#171512]"
                >
                  <span>Key Ingredients &amp; Formulation</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'ingredients' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'ingredients' && (
                  <div className="p-4 pt-0 text-xs text-[#77716B] leading-relaxed space-y-1.5">
                    {product.keyIngredients.map(ing => (
                      <div key={ing} className="flex items-center gap-2 text-[#171512]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9B18A]" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shipping & Returns Tab */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'shipping' ? ('' as any) : 'shipping')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-bold text-[#171512]"
                >
                  <span>Shipping, Authenticity &amp; Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'shipping' && (
                  <div className="p-4 pt-0 text-xs text-[#77716B] leading-relaxed space-y-2">
                    <p>Dispatch occurs within 24-48 business hours from our temperature-regulated luxury distribution center.</p>
                    <p>Complimentary shipping applies on all orders above ₹999. Easy 7-day return guarantee on unopened sealed items.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pairs Well With Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-[#E5DED4]">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#524C46] block">
                  Curated Pairings
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#171512]">
                  Complete The Ritual
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {relatedProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p.slug)}
                  className="bg-white border border-[#E5DED4] p-3 sm:p-4 flex gap-3 sm:gap-4 hover:border-[#171512] transition-colors cursor-pointer group"
                >
                  <div className="w-18 sm:w-20 h-22 sm:h-24 bg-[#FAF8F5] p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#524C46] block">
                        {p.brand}
                      </span>
                      <h3 className="text-xs font-semibold text-[#171512] line-clamp-2 group-hover:text-[#C9B18A]">
                        {p.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-[#171512]">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Add to Bag Bar (Visible on mobile & tablet) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5DED4] p-3 px-4 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[9px] uppercase tracking-wider font-bold text-[#77716B] block">
            {product.volume}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#171512]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#77716B] line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="flex-1 max-w-[200px] py-3 bg-[#171512] hover:bg-[#C9B18A] active:scale-95 text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{addedSuccess ? 'Added ✓' : 'Add to Bag'}</span>
        </button>
      </div>
    </div>
  );
};
