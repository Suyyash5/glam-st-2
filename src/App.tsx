import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OpeningFilm } from './components/OpeningFilm';
import { OfferModal } from './components/OfferModal';
import { SearchModal } from './components/SearchModal';
import { AskGlamDrawer } from './components/AskGlamDrawer';
import { CartDrawer } from './components/CartDrawer';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Brands } from './pages/Brands';
import { BrandDetail } from './pages/BrandDetail';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { JournalPage } from './pages/JournalPage';
import { Order } from './types';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  // Opening film appears whenever the page refreshes, then transitions into the web page
  const [showIntro, setShowIntro] = useState(true);

  // Clear any legacy session storage key
  useEffect(() => {
    try {
      sessionStorage.removeItem('glam_intro_seen');
      sessionStorage.removeItem('glam_offer_seen');
    } catch {
      // ignore
    }
  }, []);

  // Client routing state
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname + window.location.search || '/';
  });

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAskGlamOpen, setIsAskGlamOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [hasShownOffer, setHasShownOffer] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Sync route changes with browser history
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname + window.location.search || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleEnterIntro = () => {
    setShowIntro(false);
  };

  // Route parsing
  const pathname = currentRoute.split('?')[0];
  const searchParams = new URLSearchParams(currentRoute.includes('?') ? currentRoute.split('?')[1] : '');

  // Offer Popup on the landing page (smooth entrance after opening film)
  useEffect(() => {
    // Only show on the landing page
    if (pathname !== '/' && pathname !== '') return;
    // Don't show while opening film is active
    if (showIntro) return;
    // Only trigger once per landing visit
    if (hasShownOffer) return;

    const timer = setTimeout(() => {
      setIsOfferOpen(true);
      setHasShownOffer(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [showIntro, pathname, hasShownOffer]);

  // Render view depending on route
  const renderCurrentView = () => {
    if (pathname === '/' || pathname === '') {
      return (
        <Home
          navigate={navigate}
          onSelectProduct={slug => navigate(`/products/${slug}`)}
          onSelectBrand={slug => navigate(`/brands/${slug}`)}
        />
      );
    }

    if (pathname === '/shop') {
      return (
        <Shop
          initialCategory={searchParams.get('category') || undefined}
          initialBrand={searchParams.get('brand') || undefined}
          initialFilter={searchParams.get('filter') || undefined}
          onSelectProduct={slug => navigate(`/products/${slug}`)}
          onSelectBrand={slug => navigate(`/brands/${slug}`)}
        />
      );
    }

    if (pathname === '/brands') {
      return (
        <Brands
          onSelectBrand={slug => navigate(`/brands/${slug}`)}
        />
      );
    }

    if (pathname.startsWith('/brands/')) {
      const brandSlug = pathname.replace('/brands/', '');
      return (
        <BrandDetail
          brandSlug={brandSlug}
          onBackToBrands={() => navigate('/brands')}
          onSelectProduct={slug => navigate(`/products/${slug}`)}
        />
      );
    }

    if (pathname.startsWith('/products/')) {
      const productSlug = pathname.replace('/products/', '');
      return (
        <ProductDetail
          productSlug={productSlug}
          onBack={() => navigate('/shop')}
          onSelectBrand={slug => navigate(`/brands/${slug}`)}
          onSelectProduct={slug => navigate(`/products/${slug}`)}
          onCheckoutDirect={() => navigate('/checkout')}
        />
      );
    }

    if (pathname === '/cart') {
      return (
        <CartPage
          navigate={navigate}
          onSelectProduct={slug => navigate(`/products/${slug}`)}
        />
      );
    }

    if (pathname === '/checkout') {
      return (
        <CheckoutPage
          navigate={navigate}
          onOrderComplete={(order: Order) => {
            setCompletedOrder(order);
            navigate(`/order-confirmation/${order.orderNumber}`);
          }}
        />
      );
    }

    if (pathname.startsWith('/order-confirmation')) {
      const orderId = pathname.replace('/order-confirmation/', '').replace('/order-confirmation', '');
      return (
        <OrderConfirmationPage
          orderId={orderId}
          currentOrder={completedOrder}
          navigate={navigate}
        />
      );
    }

    if (pathname.startsWith('/journal')) {
      const articleSlug = pathname.replace('/journal/', '').replace('/journal', '');
      return (
        <JournalPage
          articleSlug={articleSlug || undefined}
          onBack={() => navigate('/journal')}
          onSelectArticle={slug => navigate(`/journal/${slug}`)}
          navigate={navigate}
        />
      );
    }

    // Default Not-Found fallback
    return (
      <div className="w-full bg-[#F8F5F0] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-4xl text-[#171512] mb-3">404 — Page Not Found</h2>
        <p className="text-xs text-[#77716B] max-w-sm mb-6">
          The requested beauty page does not exist or has been relocated in our edit.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to GLAM STUDIO Home
        </button>
      </div>
    );
  };

  return (
    <CartProvider>
      <WishlistProvider>
        {/* Fullscreen Opening Film (First-entry session experience) */}
        {showIntro && <OpeningFilm onEnter={handleEnterIntro} />}

        <div className="min-h-screen flex flex-col bg-[#F8F5F0] text-[#171512] selection:bg-[#C9B18A]/30">
          {/* Main Website Header */}
          <Header
            currentRoute={currentRoute}
            navigate={navigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Page View Body */}
          <main className="flex-1">
            {renderCurrentView()}
          </main>

          {/* Luxury Website Footer */}
          <Footer
            navigate={navigate}
          />

          {/* Floating "Ask Glam" Support Pill (as visible in reference screenshot) */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsAskGlamOpen(true)}
              className="flex items-center gap-2.5 px-4 py-3 bg-[#171512] text-white hover:bg-[#C9B18A] text-xs font-semibold uppercase tracking-[0.16em] shadow-xl hover:shadow-2xl transition-all duration-300 rounded-none border border-[#C9B18A]/40 cursor-pointer group"
              aria-label="Open Ask Glam consultation assistant"
            >
              <Sparkles className="w-4 h-4 text-[#C9B18A] group-hover:rotate-12 transition-transform" />
              <span>Ask Glam</span>
            </button>
          </div>

          {/* Live Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={slug => navigate(`/products/${slug}`)}
            onSelectBrand={slug => navigate(`/brands/${slug}`)}
          />

          {/* Ask Glam Concierge Consultation Drawer */}
          <AskGlamDrawer
            isOpen={isAskGlamOpen}
            onClose={() => setIsAskGlamOpen(false)}
            onSelectProduct={slug => navigate(`/products/${slug}`)}
          />

          {/* Slide-out Cart Drawer */}
          <CartDrawer
            onCheckout={() => navigate('/checkout')}
            onContinueShopping={() => navigate('/shop')}
            onSelectProduct={slug => navigate(`/products/${slug}`)}
          />

          {/* Delayed Editorial Offer Modal */}
          <OfferModal
            isOpen={isOfferOpen}
            onClose={() => setIsOfferOpen(false)}
            onExplore={() => navigate('/shop')}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
