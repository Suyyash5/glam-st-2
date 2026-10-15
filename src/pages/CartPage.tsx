import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  navigate: (route: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate, onSelectProduct }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    shipping,
    discount,
    total
  } = useCart();

  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="w-full bg-[#F8F5F0] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white border border-[#E5DED4] flex items-center justify-center mb-6 text-[#524C46] shadow-xs">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171512] mb-3">Your Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-[#524C46] max-w-sm mb-8 font-light">
          Your curated vanity awaits. Discover world-renowned skincare, scalp serums, and barrier formulations.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-4 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-colors shadow-md cursor-pointer"
        >
          Explore The Full Edit
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E5DED4] bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-1">
              Shopping Bag
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171512]">
              Your Selected Ritual ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#524C46] hover:text-[#171512] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Curating</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Free Shipping Alert Bar */}
        <div className="bg-[#EFE7DC] border border-[#E5DED4] p-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            {amountToFreeShipping > 0 ? (
              <span className="text-[#171512]">
                Add <span className="font-bold">₹{amountToFreeShipping.toLocaleString('en-IN')}</span> more to qualify for <span className="font-semibold">Complimentary Express Shipping</span>.
              </span>
            ) : (
              <span className="text-[#00805A] font-semibold flex items-center gap-1.5">
                <span>✓ Congratulations! Your order qualifies for Free Express Delivery.</span>
              </span>
            )}
            <span className="text-[11px] text-[#524C46]">Threshold: ₹999</span>
          </div>
          <div className="w-full bg-[#E5DED4] h-1.5 mt-3 rounded-full overflow-hidden">
            <div
              className="bg-[#171512] h-full transition-all duration-300"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List */}
          <div className="lg:col-span-8 bg-white border border-[#E5DED4] divide-y divide-[#E5DED4]">
            <h2 className="sr-only">Cart Items List</h2>
            {items.map(item => (
              <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                {/* Product Info */}
                <div className="flex gap-3 sm:gap-4 items-center">
                  <div
                    onClick={() => onSelectProduct(item.product.slug)}
                    className="w-18 sm:w-20 h-22 sm:h-24 bg-[#FAF8F5] p-2 shrink-0 flex items-center justify-center cursor-pointer border border-[#E5DED4]"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#524C46] block">
                      {item.product.brand}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(item.product.slug)}
                      className="text-xs sm:text-sm font-medium text-[#171512] hover:text-[#C9B18A] transition-colors cursor-pointer line-clamp-2"
                    >
                      {item.product.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-[#524C46] block mt-0.5">
                      {item.product.volume}
                    </span>
                    <span className="text-xs font-semibold text-[#171512] block mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </span>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E5DED4]/50">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#E5DED4] bg-[#FAF8F5]">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 sm:p-2 text-[#171512] hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-semibold text-[#171512]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stockCount}
                      className="p-2 text-[#171512] hover:bg-white transition-colors disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="text-sm font-bold text-[#171512] min-w-[70px] text-right">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-[#524C46] hover:text-[#9E3B33] transition-colors"
                    title="Remove from bag"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-white border border-[#E5DED4] p-6 space-y-6">
            <h2 className="font-serif text-xl font-normal text-[#171512] pb-4 border-b border-[#E5DED4]">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-[#524C46]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#171512]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#171512]">
                  {shipping === 0 ? (
                    <span className="text-[#00805A] font-bold">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#00805A]">
                  <span>Applied Promotional Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="pt-4 border-t border-[#E5DED4] flex justify-between items-baseline text-[#171512]">
                <span className="text-sm font-bold uppercase tracking-wider">Estimated Total</span>
                <span className="font-serif text-2xl font-bold">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-2 pt-4 border-t border-[#E5DED4] text-[11px] text-[#524C46]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C9B18A]" />
                <span>Express courier tracking via SMS &amp; Email</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00805A]" />
                <span>100% Genuine batch certificates verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
