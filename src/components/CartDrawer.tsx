import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
  onSelectProduct: (slug: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onCheckout,
  onContinueShopping,
  onSelectProduct
}) => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    shipping,
    total
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#F8F5F0] h-full shadow-2xl flex flex-col z-10 border-l border-[#E5DED4] animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E5DED4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#171512]" />
            <h3 className="font-serif text-lg sm:text-xl font-normal tracking-wide text-[#171512]">
              Your Bag ({totalItems})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#524C46] hover:text-[#171512] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#EFE7DC] px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#E5DED4]">
          {amountToFreeShipping > 0 ? (
            <p className="text-xs text-[#171512]">
              Add <span className="font-bold text-[#171512]">₹{amountToFreeShipping.toLocaleString('en-IN')}</span> more to unlock <span className="font-semibold text-[#171512]">Free Express Shipping</span>
            </p>
          ) : (
            <p className="text-xs text-[#00805A] font-semibold flex items-center gap-1.5">
              <span>✓ You have unlocked Complimentary Express Shipping!</span>
            </p>
          )}
          <div className="w-full bg-[#E5DED4] h-1.5 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-[#171512] h-full transition-all duration-300"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>

        {/* Line Items List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-white border border-[#E5DED4] flex items-center justify-center mb-4 text-[#524C46]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl text-[#171512] mb-2">Your bag is empty</h4>
              <p className="text-xs text-[#524C46] max-w-xs mb-6">
                Discover thoughtfully selected skincare, haircare, and nutrition from our curated collection.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onContinueShopping();
                }}
                className="px-6 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C9B18A] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.product.id}
                className="bg-white border border-[#E5DED4] p-4 flex gap-4 transition-all hover:border-[#171512]/40"
              >
                {/* Product Thumbnail */}
                <div
                  onClick={() => {
                    closeCart();
                    onSelectProduct(item.product.slug);
                  }}
                  className="w-20 h-20 bg-[#FAF8F5] p-2 shrink-0 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#524C46]">
                          {item.product.brand}
                        </span>
                        <h4
                          onClick={() => {
                            closeCart();
                            onSelectProduct(item.product.slug);
                          }}
                          className="text-xs font-medium text-[#171512] line-clamp-1 hover:text-[#C9B18A] cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#524C46] hover:text-[#9E3B33] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#524C46] block mt-0.5">
                      {item.product.volume}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E5DED4]/50 mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#E5DED4] bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-[#171512] hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-[#171512]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockCount}
                        className="p-1.5 text-[#171512] hover:bg-white transition-colors disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total Price for line item */}
                    <span className="text-xs font-bold text-[#171512]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 bg-white border-t border-[#E5DED4] space-y-3 sm:space-y-4">
            <div className="space-y-1.5 text-xs text-[#524C46]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#171512] font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-[#171512] font-semibold">
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5DED4] text-sm text-[#171512] font-bold">
                <span>Total Estimated</span>
                <span className="font-serif text-lg">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                closeCart();
                onCheckout();
              }}
              className="w-full py-4 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#524C46] tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00805A]" />
              <span>Authentic Sourcing · Secure SSL Encrypted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
