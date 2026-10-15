import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#EFE7DC] border-t border-[#E5DED4] text-[#171512] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Pillars Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-[#E5DED4]">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#171512] shrink-0 mt-1" />
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#171512]">
                Guaranteed Authenticity
              </h3>
              <p className="text-xs text-[#524C46] mt-1 leading-relaxed">
                Directly sourced from authorized brand laboratories and verified distributors worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-[#171512] shrink-0 mt-1" />
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#171512]">
                Complimentary Shipping
              </h3>
              <p className="text-xs text-[#524C46] mt-1 leading-relaxed">
                Enjoy free expedited delivery across India on every curated order above ₹999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <RefreshCw className="w-6 h-6 text-[#171512] shrink-0 mt-1" />
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#171512]">
                Curated With Care
              </h3>
              <p className="text-xs text-[#524C46] mt-1 leading-relaxed">
                Rigorous dermatologist-tested formulas and clean ingredient guidelines you can trust.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 py-10 sm:py-14 border-b border-[#E5DED4]">
          {/* Brand Info */}
          <div className="sm:col-span-2 pr-0 lg:pr-8">
            <span className="font-serif text-3xl font-normal tracking-[0.22em] text-[#171512] block">
              GLAM STUDIO
            </span>
            <span className="text-[9px] uppercase tracking-[0.38em] text-[#524C46] font-medium block mt-1">
              SKINCARE · NUTRITION
            </span>
            <p className="text-xs text-[#524C46] mt-4 leading-relaxed max-w-sm">
              A luxury multi-brand destination curating the world’s most efficacious skincare, haircare, and beauty nutrition. Formulated for real skin, everyday rituals, and visible radiance.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#171512] mb-4">
              Explore
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#524C46]">
              <li>
                <button
                  onClick={() => navigate('/shop')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  The Full Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/brands')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  Curated Brands
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?filter=bestseller')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  Bestselling Formulas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/journal')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  The Beauty Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cart')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  Shopping Bag
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#171512] mb-4">
              Categories
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#524C46]">
              <li>
                <button
                  onClick={() => navigate('/shop?category=Cleansers')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  Cleansing Oils &amp; Balms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Treatments')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  PDRN &amp; Peptides
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Moisturisers')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  Barrier Creams
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Haircare')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  Scalp &amp; Hair Density
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Sun Protection')}
                  className="hover:text-[#171512] transition-colors cursor-pointer"
                >
                  Broad Spectrum SPF
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#171512] mb-4">
              The Edit In Your Inbox
            </h3>
            <p className="text-xs text-[#524C46] leading-relaxed mb-4">
              Receive private previews of new brand launches, ingredient deep-dives, and exclusive customer benefits.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#171512] bg-[#FFFFFF] p-3 border border-[#E5DED4]">
                <CheckCircle2 className="w-4 h-4 text-[#00805A] shrink-0" />
                <span>Thank you. You are now on the GLAM STUDIO guest list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Enter your email address"
                    required
                    className="w-full bg-[#FFFFFF] border border-[#E5DED4] px-3.5 py-2.5 text-xs text-[#171512] placeholder:text-[#524C46]/60 focus:outline-none focus:border-[#171512] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#171512] text-white hover:bg-[#C9B18A] transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#524C46]">
                  By subscribing, you agree to our privacy policy.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar / Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#524C46]">
          <p className="text-center md:text-left">© {new Date().getFullYear()} GLAM STUDIO. All rights reserved. Curated beauty retailer.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
            <span className="hover:text-[#171512] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#171512] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#171512] cursor-pointer">Shipping &amp; Returns</span>
            <span className="hover:text-[#171512] cursor-pointer">Authenticity Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
