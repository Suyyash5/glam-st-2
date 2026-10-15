import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Printer, ShieldCheck, Clock, MapPin, PackageCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationPageProps {
  orderId?: string;
  currentOrder?: Order | null;
  navigate: (route: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderId,
  currentOrder,
  navigate
}) => {
  const [order, setOrder] = useState<Order | null>(currentOrder || null);

  useEffect(() => {
    if (!order && orderId) {
      try {
        const stored = localStorage.getItem('glam_studio_orders');
        if (stored) {
          const orders: Order[] = JSON.parse(stored);
          const found = orders.find(o => o.id === orderId || o.orderNumber === orderId);
          if (found) {
            setOrder(found);
          }
        }
      } catch (e) {
        console.warn('Failed to retrieve order', e);
      }
    }
  }, [orderId, order]);

  if (!order) {
    return (
      <div className="w-full bg-[#F8F5F0] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#171512] mb-3">Order Not Found</h2>
        <p className="text-xs text-[#524C46] max-w-sm mb-6">
          We could not locate this order in the active session. If you recently submitted an order, check your shopping bag.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#171512] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Animated Confirmation Card */}
        <div className="bg-white border border-[#E5DED4] p-5 sm:p-8 md:p-12 shadow-sm text-center">
          {/* Circular Animated Confirmation Mark */}
          <div className="w-16 h-16 rounded-full bg-[#EFE7DC] border-2 border-[#C9B18A] mx-auto flex items-center justify-center mb-6 animate-scale-up">
            <CheckCircle2 className="w-8 h-8 text-[#171512]" />
          </div>

          <span className="inline-block px-3 py-1 bg-[#EFE7DC] text-[#171512] text-[10px] uppercase tracking-[0.25em] font-bold mb-3 border border-[#E5DED4]">
            Demo Order Submitted
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#171512] mb-2 font-normal">
            Thank you for your order
          </h1>

          <p className="text-xs text-[#524C46] max-w-md mx-auto mb-6 leading-relaxed">
            Your simulated order has been registered in the demonstration catalog store. An automated confirmation summary is generated below.
          </p>

          <div className="bg-[#FAF8F5] border border-[#E5DED4] p-4 max-w-md mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#524C46] block">Order Reference</span>
              <span className="font-mono font-bold text-sm text-[#171512]">{order.orderNumber}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#524C46] block">Date</span>
              <span className="text-[#171512] font-medium">{formattedDate}</span>
            </div>
          </div>

          {/* Transparent Notice */}
          <div className="p-4 bg-[#EFE7DC]/40 border-l-2 border-[#C9B18A] text-left text-xs text-[#524C46] mb-8">
            <span className="font-semibold text-[#171512] block mb-0.5">What Happens Next (Demo Flow):</span>
            In a live production environment, warehouse staff would pick and temperature-seal these authentic formulas. Because this is a demonstration experience, no live courier has been dispatched.
          </div>

          {/* Order Items Breakdown */}
          <div className="text-left border-t border-[#E5DED4] pt-8 mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#171512] mb-4">
              Curated Items ({order.items.length})
            </h2>

            <div className="divide-y divide-[#E5DED4] border border-[#E5DED4] bg-[#FAF8F5]">
              {order.items.map(item => (
                <div key={item.product.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-white p-1 shrink-0 flex items-center justify-center border border-[#E5DED4]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#524C46] block">
                        {item.product.brand}
                      </span>
                      <p className="text-xs font-semibold text-[#171512]">
                        {item.product.name}
                      </p>
                      <span className="text-[11px] text-[#524C46]">
                        Qty: {item.quantity} · {item.product.volume}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#171512]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="text-left border-t border-[#E5DED4] pt-6 mb-8 text-xs text-[#524C46] space-y-2">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#171512]">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Method ({order.deliveryMethod})</span>
              <span className="font-semibold text-[#171512]">
                {order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode</span>
              <span className="font-semibold text-[#171512]">{order.paymentMethod}</span>
            </div>
            <div className="pt-3 border-t border-[#E5DED4] flex justify-between items-baseline text-sm text-[#171512] font-bold">
              <span className="uppercase tracking-wider">Final Order Total</span>
              <span className="font-serif text-2xl font-bold">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Delivery Recipient Info */}
          <div className="text-left bg-[#FAF8F5] border border-[#E5DED4] p-5 mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-[#171512] uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C9B18A]" />
              <span>Delivery Recipient</span>
            </div>
            <p className="text-xs font-semibold text-[#171512]">{order.customerDetails.fullName}</p>
            <p className="text-xs text-[#524C46] mt-0.5">{order.customerDetails.address}</p>
            <p className="text-xs text-[#524C46]">
              {order.customerDetails.city}, {order.customerDetails.state} — {order.customerDetails.pincode}
            </p>
            <p className="text-xs text-[#524C46] mt-1">Phone: +91 {order.customerDetails.phone}</p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#171512] text-[#171512] hover:bg-[#171512] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
