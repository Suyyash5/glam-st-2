import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  navigate,
  onOpenSearch
}) => {
  const { totalItems, openCart, notificationMessage } = useCart();
  const { totalWishlistItems } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', route: '/shop' },
    { label: 'Brands', route: '/brands' },
    { label: 'Bestsellers', route: '/shop?filter=bestseller' },
    { label: 'Skincare', route: '/shop?category=Skincare' },
    { label: 'Nutrition', route: '/shop?category=Nutrition' },
    { label: 'Journal', route: '/journal' }
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#171512] text-[#F8F5F0] text-[11px] py-2 px-4 text-center font-medium tracking-[0.18em] uppercase flex items-center justify-center gap-3">
        <Sparkles className="w-3 h-3 text-[#C9B18A] animate-pulse" />
        <span>Complimentary Express Delivery on all orders above ₹999</span>
        <span className="hidden md:inline text-[#C9B18A]">·</span>
        <span className="hidden md:inline">100% Guaranteed Authentic Brands</span>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-xs border-b border-[#E5DED4]'
            : 'bg-[#F8F5F0] border-b border-[#E5DED4]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile Hamburger & Logo Aligned */}
          <div className="flex items-center gap-3 lg:gap-8">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#171512] hover:text-[#C9B18A] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo Wordmark */}
            <button
              onClick={() => navigate('/')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.24em] text-[#171512] group-hover:text-[#C9B18A] transition-colors">
                  GLAM STUDIO
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.38em] text-[#524C46] font-medium -mt-0.5">
                  SKINCARE · NUTRITION
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[12.5px] uppercase font-medium tracking-[0.18em]">
            {navLinks.map(link => {
              const isActive =
                currentRoute === link.route ||
                (link.route.startsWith('/shop') && currentRoute.startsWith('/shop'));
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.route)}
                  className={`relative py-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#171512] font-semibold'
                      : 'text-[#524C46] hover:text-[#171512]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#171512]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#171512] hover:text-[#C9B18A] transition-colors rounded-full hover:bg-[#EFE7DC]/50 cursor-pointer"
              aria-label="Search products and brands"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigate('/shop?filter=wishlist')}
              className="p-2 text-[#171512] hover:text-[#C9B18A] transition-colors rounded-full hover:bg-[#EFE7DC]/50 relative cursor-pointer"
              aria-label="View saved wishlist items"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9B18A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon with Live Badge */}
            <button
              onClick={openCart}
              className="p-2 text-[#171512] hover:text-[#C9B18A] transition-colors rounded-full hover:bg-[#EFE7DC]/50 relative cursor-pointer group"
              aria-label={`Shopping bag, ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#171512] text-[#F8F5F0] text-[9px] font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Add to Bag Notification Toast */}
      {notificationMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#171512] text-[#F8F5F0] px-5 py-3 rounded-none shadow-2xl text-xs uppercase tracking-wider flex items-center gap-3 border border-[#C9B18A]/50 animate-bounce-in">
          <span className="w-2 h-2 rounded-full bg-[#C9B18A] animate-ping" />
          <span>{notificationMessage}</span>
          <button
            onClick={openCart}
            className="ml-2 text-[#C9B18A] underline font-semibold hover:text-white cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#F8F5F0] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5DED4]">
                <div>
                  <span className="font-serif text-xl tracking-[0.2em] font-medium text-[#171512]">
                    GLAM STUDIO
                  </span>
                  <p className="text-[8px] uppercase tracking-widest text-[#524C46]">
                    SKINCARE · NUTRITION
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#524C46] hover:text-[#171512]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 flex flex-col gap-4">
                {navLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => {
                      navigate(link.route);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-sm uppercase tracking-[0.2em] font-medium text-[#171512] hover:text-[#C9B18A] py-2 border-b border-[#E5DED4]/40"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Quick Categories */}
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#524C46]">
                  Categories
                </span>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-[#171512]">
                  {['Cleansers', 'Moisturisers', 'Treatments', 'Haircare', 'Sun Protection'].map(
                    cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          navigate(`/shop?category=${cat}`);
                          setMobileMenuOpen(false);
                        }}
                        className="text-left py-1.5 hover:text-[#C9B18A]"
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5DED4]">
              <p className="text-[10px] text-center text-[#524C46]">
                Curated Luxury Beauty Retailer
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
