import React, { useState } from 'react';
import { Sparkles, X, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface AskGlamDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (slug: string) => void;
}

interface Message {
  sender: 'user' | 'glam';
  text: string;
  recommendedProducts?: Product[];
}

export const AskGlamDrawer: React.FC<AskGlamDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'glam',
      text: 'Welcome to Ask Glam Concierge. I can help guide your routine across our curated catalogue of skincare, haircare, and nutrition. What skin concern or brand are you exploring today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'Best gentle double cleanser',
    'Hair density & scalp mist',
    'PDRN & firming peptide serum',
    'Barrier repair cream for redness',
    'Sunscreen with no white cast'
  ];

  const handleQuery = (query: string) => {
    if (!query.trim()) return;

    const userMsg: Message = { sender: 'user', text: query };
    const q = query.toLowerCase();

    let matched: Product[] = [];
    let responseText = '';

    if (q.includes('cleanse') || q.includes('pore') || q.includes('blackhead') || q.includes('oil')) {
      matched = PRODUCTS.filter(p => p.category === 'Cleansers');
      responseText =
        'For pore refinement and effective double-cleansing without stripping moisture, we recommend the cult-favorite Anua Heartleaf Pore Control Cleansing Oil.';
    } else if (q.includes('hair') || q.includes('scalp') || q.includes('fall') || q.includes('growth')) {
      matched = PRODUCTS.filter(p => p.category === 'Haircare');
      responseText =
        'For stimulating hair density and repairing cuticle damage, explore Bare Anatomy Rosemary & Rice Water Hair Growth Spray and the Ultra Smoothing Mask.';
    } else if (q.includes('pdrn') || q.includes('peptide') || q.includes('firm') || q.includes('glass')) {
      matched = PRODUCTS.filter(p => p.id === 'prod_medicube_pdrn_pink_serum');
      responseText =
        'Medicube PDRN Pink Peptide Serum features 1% Salmon Sodium DNA and 5 types of peptides to visibly improve skin elasticity and cellular resilience.';
    } else if (q.includes('barrier') || q.includes('bamboo') || q.includes('panthenol') || q.includes('dry')) {
      matched = PRODUCTS.filter(p => p.id === 'prod_purito_bamboo_cream');
      responseText =
        'Purito Seoul Mighty Bamboo Panthenol Cream provides 10% Panthenol and fermented bamboo extract to cushion and reinforce damaged moisture barriers.';
    } else if (q.includes('sun') || q.includes('spf') || q.includes('white cast')) {
      matched = PRODUCTS.filter(p => p.category === 'Sun Protection');
      responseText =
        'For weightless daily UV defense, Beauty of Joseon Relief Sun and The Derma Co 1% Hyaluronic Sunscreen offer SPF50+ protection with zero white cast.';
    } else {
      matched = PRODUCTS.slice(0, 3);
      responseText =
        'Here are top recommendations from our curated beauty edit that form the foundation of an elevated daily routine:';
    }

    const glamMsg: Message = {
      sender: 'glam',
      text: responseText,
      recommendedProducts: matched
    };

    setMessages(prev => [...prev, userMsg, glamMsg]);
    setInputText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F8F5F0] h-full shadow-2xl flex flex-col z-10 border-l border-[#E5DED4]">
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E5DED4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EFE7DC] border border-[#E5DED4] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#C9B18A]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-normal tracking-wide text-[#171512]">
                Ask Glam Concierge
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#524C46]">
                Curated Product Advisor · Demo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#524C46] hover:text-[#171512] transition-colors"
            aria-label="Close concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="bg-[#EFE7DC]/50 px-4 py-2 text-[10px] text-[#524C46] border-b border-[#E5DED4] text-center">
          Interactive consultation advisor connected to the GLAM STUDIO live catalogue.
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#171512] text-white'
                    : 'bg-white border border-[#E5DED4] text-[#171512] shadow-xs'
                }`}
              >
                {m.text}
              </div>

              {/* Product recommendation cards */}
              {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                <div className="w-full mt-3 space-y-2">
                  {m.recommendedProducts.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod.slug);
                        onClose();
                      }}
                      className="p-3 bg-white border border-[#E5DED4] hover:border-[#171512] transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-[#FAF8F5] p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#524C46] block">
                          {prod.brand}
                        </span>
                        <h4 className="text-xs font-semibold text-[#171512] truncate group-hover:text-[#C9B18A]">
                          {prod.name}
                        </h4>
                        <span className="text-xs font-medium text-[#171512]">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#524C46] group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-4 bg-white/60 border-t border-[#E5DED4]">
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#524C46] block mb-2">
            Suggested Consultations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map(p => (
              <button
                key={p}
                onClick={() => handleQuery(p)}
                className="text-[10px] px-2.5 py-1 bg-white border border-[#E5DED4] text-[#171512] hover:border-[#171512] transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-[#E5DED4] flex items-center gap-2">
          <label htmlFor="ask-glam-input" className="sr-only">
            Ask about ingredients, skin concerns
          </label>
          <input
            id="ask-glam-input"
            type="text"
            aria-label="Ask about ingredients, skin concerns"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQuery(inputText)}
            placeholder="Ask about ingredients, skin concerns..."
            className="flex-1 bg-[#FAF8F5] border border-[#E5DED4] px-3.5 py-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#171512]"
          />
          <button
            onClick={() => handleQuery(inputText)}
            className="p-2.5 bg-[#171512] hover:bg-[#C9B18A] text-white transition-colors cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
