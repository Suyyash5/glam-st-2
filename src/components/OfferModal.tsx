import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, Tag, Copy, Check } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  onExplore
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('GLAM15').catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171512]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-heading"
        className="relative w-full max-w-md bg-[#F8F5F0] border border-[#E5DED4] p-6 sm:p-8 shadow-2xl z-10 transition-all duration-300"
      >
        {/* Top Right Corner Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-[#524C46] hover:text-[#171512] hover:bg-[#EFE7DC] transition-all cursor-pointer z-20 group"
          aria-label="Close offer pop up"
          title="Close offer pop up"
        >
          <X className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center pt-2">
          {/* Champagne Accent Icon */}
          <div className="w-12 h-12 rounded-full bg-[#EFE7DC] flex items-center justify-center mb-4 border border-[#E5DED4]">
            <Sparkles className="w-5 h-5 text-[#C9B18A]" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#8C7A6B] mb-2 inline-flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-[#C9B18A]" />
            Exclusive Welcome Offer
          </span>

          <h2
            id="offer-heading"
            className="font-serif text-2xl sm:text-3xl font-normal text-[#171512] tracking-wide mb-2 leading-tight"
          >
            Enjoy 15% Off Your First Ritual
          </h2>

          <p className="text-xs text-[#524C46] leading-relaxed max-w-xs mb-5">
            Explore curated essentials from Anua, Medicube, Bare Anatomy, Purito, Minimalist, and The Derma Co. Apply code at checkout on orders above ₹999.
          </p>

          {/* Coupon Code Pill */}
          <div className="w-full bg-[#EFE7DC]/70 border border-dashed border-[#C9B18A] p-3 flex items-center justify-between gap-3 mb-6">
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-[#524C46]">Promo Code</span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#171512] tracking-widest">
                GLAM15
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171512] hover:bg-[#C9B18A] text-white text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C9B18A]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-2.5">
            <button
              onClick={() => {
                onExplore();
                onClose();
              }}
              className="w-full py-3.5 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              Shop The Edit
            </button>

            <button
              onClick={onClose}
              className="py-2 text-[11px] uppercase tracking-[0.18em] font-medium text-[#524C46] hover:text-[#171512] transition-colors cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
