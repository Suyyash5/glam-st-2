import React from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onClick: () => void;
  onBrandClick?: (brandSlug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
  onClick,
  onBrandClick
}) => {
  const { addToCart, items } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const cartItem = items.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBrandClick) {
      onBrandClick(product.brandSlug);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col bg-[#FFFFFF] border border-[#E5DED4] p-2.5 sm:p-4 transition-all duration-300 hover:border-[#171512]/60 hover:shadow-md cursor-pointer"
    >
      {/* Badges / Wishlist Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3 z-10">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {product.isBestseller && (
            <span className="bg-[#171512] text-[#F8F5F0] text-[8px] sm:text-[9px] uppercase tracking-[0.14em] font-bold px-1.5 sm:px-2 py-0.5">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#C9B18A] text-[#FFFFFF] text-[8px] sm:text-[9px] uppercase tracking-[0.14em] font-bold px-1.5 sm:px-2 py-0.5">
              New
            </span>
          )}
        </div>

        <button
          onClick={handleWishlistToggle}
          className="p-1 sm:p-1.5 text-[#524C46] hover:text-[#171512] rounded-full hover:bg-[#F8F5F0] transition-colors"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all ${
              isFavorited ? 'fill-[#171512] text-[#171512] scale-110' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Image Container with object-fit: contain */}
      <div className="relative aspect-4/5 w-full bg-[#FAF8F5] mb-2.5 sm:mb-4 flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Desktop Quick Add Overlay on Hover */}
        <div className="hidden md:block absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#171512]/90 hover:bg-[#171512] text-white text-[10px] uppercase font-bold tracking-[0.2em] shadow-md flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
            aria-label={`Quick add ${product.name} to bag`}
          >
            {inCartQty > 0 ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C9B18A]" />
                <span>In Bag ({inCartQty}) · Add More</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile / Tablet Touch Quick-Add Action Button */}
        <button
          onClick={handleQuickAdd}
          className="md:hidden absolute bottom-1.5 right-1.5 p-2 bg-[#171512]/90 active:bg-[#171512] text-white rounded-full shadow-md z-10 flex items-center justify-center backdrop-blur-xs active:scale-95 transition-transform"
          aria-label={`Quick add ${product.name} to bag`}
          title="Quick add to bag"
        >
          {inCartQty > 0 ? (
            <Check className="w-3.5 h-3.5 text-[#C9B18A]" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white" />
          )}
        </button>
      </div>

      {/* Product Metadata */}
      <div className="flex flex-col flex-1">
        {/* Brand Name */}
        <button
          onClick={handleBrandClick}
          className="text-left text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-bold text-[#524C46] hover:text-[#171512] transition-colors mb-0.5 sm:mb-1 truncate"
        >
          {product.brand}
        </button>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-medium text-[#171512] line-clamp-2 leading-snug group-hover:text-[#C9B18A] transition-colors mb-1 sm:mb-2 min-h-[2rem] sm:min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Size / Volume */}
        <span className="text-[10px] sm:text-[11px] text-[#524C46] mb-2 sm:mb-3 block truncate">
          {product.volume}
        </span>

        {/* Price & Rating Row */}
        <div className="mt-auto pt-2 border-t border-[#E5DED4]/50 flex items-center justify-between gap-1 flex-wrap">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-semibold text-[#171512]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-[#524C46] line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="text-[10px] sm:text-[11px] text-[#524C46] flex items-center gap-0.5 sm:gap-1 shrink-0">
            <span className="text-[#C9B18A]">★</span>
            <span className="font-medium text-[#171512]">{product.rating}</span>
            <span className="text-[9px] sm:text-[10px]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
