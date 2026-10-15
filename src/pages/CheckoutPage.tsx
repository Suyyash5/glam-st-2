import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Lock, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerDetails, Order } from '../types';

interface CheckoutPageProps {
  navigate: (route: string) => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigate, onOrderComplete }) => {
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('cod_demo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  if (items.length === 0) {
    return (
      <div className="w-full bg-[#F8F5F0] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#171512] mb-3">Your Bag is Empty</h2>
        <p className="text-xs text-[#524C46] mb-6">Please add items to your shopping bag before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const expressSurcharge = deliverySpeed === 'express' ? 99 : 0;
  const finalTotal = total + expressSurcharge;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!customerDetails.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    if (!customerDetails.email.trim() || !customerDetails.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }

    const cleanedPhone = customerDetails.phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      errs.phone = 'Valid 10-digit Indian phone number is required';
    }

    if (!customerDetails.address.trim()) {
      errs.address = 'Street address and apartment/house number required';
    }

    if (!customerDetails.city.trim()) {
      errs.city = 'City is required';
    }

    if (!customerDetails.state.trim()) {
      errs.state = 'State / Region is required';
    }

    const cleanedPincode = customerDetails.pincode.replace(/\D/g, '');
    if (cleanedPincode.length !== 6) {
      errs.pincode = 'Valid 6-digit Indian PIN code is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury order verification & generation
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const uniqueOrderNumber = `GLAM-2026-${randomNum}`;

      const newOrder: Order = {
        id: `order_${Date.now()}`,
        orderNumber: uniqueOrderNumber,
        createdAt: new Date().toISOString(),
        items: [...items],
        subtotal,
        shipping: shipping + expressSurcharge,
        discount,
        total: finalTotal,
        customerDetails: { ...customerDetails },
        paymentMethod:
          paymentMethod === 'cod_demo'
            ? 'Cash on Delivery (Demo Mode)'
            : 'Simulated Instant UPI (Demo Mode)',
        deliveryMethod:
          deliverySpeed === 'express'
            ? 'VIP Priority Express (24-48 Hours)'
            : 'Standard Complimentary (3-5 Business Days)',
        status: 'demo_submitted'
      };

      // Store in demo order store in localStorage
      try {
        const stored = localStorage.getItem('glam_studio_orders');
        const orders = stored ? JSON.parse(stored) : [];
        orders.unshift(newOrder);
        localStorage.setItem('glam_studio_orders', JSON.stringify(orders));
      } catch (err) {
        console.warn('Failed to save demo order to localStorage', err);
      }

      // Clear shopping bag
      clearCart();

      // Navigate to order confirmation
      onOrderComplete(newOrder);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen pb-24">
      {/* Top Header */}
      <div className="border-b border-[#E5DED4] bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#524C46] hover:text-[#171512] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#00805A] font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-bit Demo Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Delivery and Payment Details Form */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Step 1: Customer & Delivery Address */}
            <div className="bg-white border border-[#E5DED4] p-4 sm:p-8 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5DED4]">
                <span className="w-6 h-6 rounded-full bg-[#171512] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-2xl text-[#171512]">
                  Delivery Address &amp; Recipient
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-fullname" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    Full Name *
                  </label>
                  <input
                    id="checkout-fullname"
                    type="text"
                    value={customerDetails.fullName}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, fullName: e.target.value })
                    }
                    placeholder="e.g. Radhika Sharma"
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none ${
                      errors.fullName ? 'border-[#9E3B33]' : 'border-[#E5DED4] focus:border-[#171512]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-[#9E3B33] mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="checkout-email" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    Email Address *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={customerDetails.email}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, email: e.target.value })
                    }
                    placeholder="radhika@example.com"
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none ${
                      errors.email ? 'border-[#9E3B33]' : 'border-[#E5DED4] focus:border-[#171512]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-[#9E3B33] mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="checkout-phone" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    Mobile Phone (+91) *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={customerDetails.phone}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, phone: e.target.value })
                    }
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none ${
                      errors.phone ? 'border-[#9E3B33]' : 'border-[#E5DED4] focus:border-[#171512]'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-[#9E3B33] mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-address" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    Street Address &amp; House/Apt No. *
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={customerDetails.address}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, address: e.target.value })
                    }
                    placeholder="Apt 402, Lotus Residency, 14th Main Road"
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none ${
                      errors.address ? 'border-[#9E3B33]' : 'border-[#E5DED4] focus:border-[#171512]'
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[10px] text-[#9E3B33] mt-1 block">
                      {errors.address}
                    </span>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="checkout-city" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    City *
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    value={customerDetails.city}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, city: e.target.value })
                    }
                    placeholder="Mumbai / Bengaluru / Delhi"
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none ${
                      errors.city ? 'border-[#9E3B33]' : 'border-[#E5DED4] focus:border-[#171512]'
                    }`}
                  />
                  {errors.city && (
                    <span className="text-[10px] text-[#9E3B33] mt-1 block">
                      {errors.city}
                    </span>
                  )}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="checkout-state" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    State *
                  </label>
                  <input
                    id="checkout-state"
                    type="text"
                    value={customerDetails.state}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, state: e.target.value })
                    }
                    placeholder="Maharashtra / Karnataka"
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none ${
                      errors.state ? 'border-[#9E3B33]' : 'border-[#E5DED4] focus:border-[#171512]'
                    }`}
                  />
                  {errors.state && (
                    <span className="text-[10px] text-[#9E3B33] mt-1 block">
                      {errors.state}
                    </span>
                  )}
                </div>

                {/* PIN Code */}
                <div>
                  <label htmlFor="checkout-pincode" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    PIN Code (6 Digits) *
                  </label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    value={customerDetails.pincode}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, pincode: e.target.value })
                    }
                    placeholder="400050"
                    maxLength={6}
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none ${
                      errors.pincode ? 'border-[#9E3B33]' : 'border-[#E5DED4] focus:border-[#171512]'
                    }`}
                  />
                  {errors.pincode && (
                    <span className="text-[10px] text-[#9E3B33] mt-1 block">
                      {errors.pincode}
                    </span>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="checkout-notes" className="text-[11px] uppercase tracking-wider font-bold text-[#171512] block mb-1 cursor-pointer">
                    Delivery Notes (Optional)
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    value={customerDetails.notes}
                    onChange={e =>
                      setCustomerDetails({ ...customerDetails, notes: e.target.value })
                    }
                    placeholder="Leave with front security / Ring bell"
                    className="w-full bg-[#FAF8F5] border border-[#E5DED4] px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#171512]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="bg-white border border-[#E5DED4] p-4 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5DED4]">
                <span className="w-6 h-6 rounded-full bg-[#171512] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#171512]">
                  Delivery Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <label
                  onClick={() => setDeliverySpeed('standard')}
                  className={`p-3.5 sm:p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                    deliverySpeed === 'standard'
                      ? 'border-[#171512] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#E5DED4] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#171512]">
                      Standard Express
                    </span>
                    <span className="text-xs font-semibold text-[#00805A]">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#524C46] mt-2">
                    Delivered in 3-5 business days across India.
                  </p>
                </label>

                <label
                  onClick={() => setDeliverySpeed('express')}
                  className={`p-3.5 sm:p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                    deliverySpeed === 'express'
                      ? 'border-[#171512] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#E5DED4] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#171512]">
                      VIP Priority
                    </span>
                    <span className="text-xs font-semibold text-[#171512]">
                      +₹99
                    </span>
                  </div>
                  <p className="text-[11px] text-[#524C46] mt-2">
                    Priority dispatch within 24-48 hours with air courier.
                  </p>
                </label>
              </div>
            </div>

            {/* Step 3: Transparent Demo Order Payment Selection */}
            <div className="bg-white border border-[#E5DED4] p-4 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5DED4]">
                <span className="w-6 h-6 rounded-full bg-[#171512] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#171512]">
                  Order Settlement (Demo Mode)
                </h2>
              </div>

              {/* Notice per section 12 */}
              <div className="bg-[#EFE7DC] p-4 text-xs text-[#524C46] border border-[#E5DED4] leading-relaxed">
                <span className="font-semibold text-[#171512] block mb-1">
                  Demo Environment Transparency Notice
                </span>
                This is a fully functional demonstration environment. No payment gateways are integrated, and no financial charges, credit card details, or bank credentials will be requested.
              </div>

              <div className="space-y-3 pt-2">
                <label
                  onClick={() => setPaymentMethod('cod_demo')}
                  className={`p-4 border block transition-all cursor-pointer ${
                    paymentMethod === 'cod_demo'
                      ? 'border-[#171512] bg-[#FAF8F5]'
                      : 'border-[#E5DED4] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod_demo'}
                      onChange={() => setPaymentMethod('cod_demo')}
                      className="accent-[#171512]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#171512] block">
                        Cash on Delivery / Pay on Delivery (Demo Simulation)
                      </span>
                      <span className="text-[11px] text-[#524C46]">
                        Simulated offline payment. Pay in cash or UPI upon courier arrival.
                      </span>
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('upi_demo')}
                  className={`p-4 border block transition-all cursor-pointer ${
                    paymentMethod === 'upi_demo'
                      ? 'border-[#171512] bg-[#FAF8F5]'
                      : 'border-[#E5DED4] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi_demo'}
                      onChange={() => setPaymentMethod('upi_demo')}
                      className="accent-[#171512]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#171512] block">
                        Instant Simulated UPI Confirmation (Demo Simulation)
                      </span>
                      <span className="text-[11px] text-[#524C46]">
                        Instantly generates order confirmation without external redirection.
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Items Summary & Final Submit Button */}
          <div className="lg:col-span-5 bg-white border border-[#E5DED4] p-4 sm:p-8 space-y-6 lg:sticky lg:top-28">
            <h3 className="font-serif text-xl text-[#171512] pb-4 border-b border-[#E5DED4]">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Mini Line items list */}
            <div className="divide-y divide-[#E5DED4] max-h-64 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.product.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-14 bg-[#FAF8F5] p-1 shrink-0 flex items-center justify-center border border-[#E5DED4]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#524C46] block">
                        {item.product.brand}
                      </span>
                      <p className="text-xs font-semibold text-[#171512] truncate">
                        {item.product.name}
                      </p>
                      <span className="text-[11px] text-[#524C46]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#171512] shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#E5DED4] space-y-2.5 text-xs text-[#524C46]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#171512]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping ({deliverySpeed === 'express' ? 'VIP Priority' : 'Standard'})</span>
                <span className="font-semibold text-[#171512]">
                  {shipping + expressSurcharge === 0 ? 'FREE' : `₹${shipping + expressSurcharge}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E5DED4] flex justify-between items-baseline text-[#171512]">
                <span className="text-sm font-bold uppercase tracking-wider">Final Total</span>
                <span className="font-serif text-3xl font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#171512] hover:bg-[#C9B18A] disabled:bg-[#77716B] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Demo Order...</span>
                </>
              ) : (
                <span>Complete Demo Order</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#524C46]">
              <ShieldCheck className="w-4 h-4 text-[#00805A]" />
              <span>Simulated demo submission · Cart cleared on confirmation</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
