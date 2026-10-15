import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';
import { BrandStrip } from '../components/BrandStrip';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { JOURNAL_ARTICLES } from '../data/journal';
import { Product } from '../types';

interface HomeProps {
  navigate: (route: string) => void;
  onSelectProduct: (slug: string) => void;
  onSelectBrand: (brandSlug: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  navigate,
  onSelectProduct,
  onSelectBrand
}) => {
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);

  const bestsellers = PRODUCTS.filter(p => p.isBestseller);
  const featuredPicks = PRODUCTS.slice(0, 4);

  // Story chapters specified in section 6.C
  const storyChapters = [
    {
      number: '01',
      title: 'The Ritual',
      headline: 'Your ritual, reimagined.',
      copy: 'Thoughtfully selected essentials for the moments that make your routine your own. From morning UV defense to restorative evening exfoliating serums.',
      visual: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      tag: 'Morning & Evening Care',
      focusBrand: 'The Derma Co & Minimalist'
    },
    {
      number: '02',
      title: 'The Actives',
      headline: 'Good formulas. Thoughtful choices.',
      copy: 'Explore skincare essentials with transparent clinical actives. Featuring high-purity Niacinamide, Hyaluronic Acid, and dermatologist-tested Kojic Acid.',
      visual: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      tag: 'Bio-Identical Actives',
      focusBrand: 'Minimalist & The Derma Co'
    },
    {
      number: '03',
      title: 'The Botanicals',
      headline: 'Find what feels right for you.',
      copy: 'Discover revered global beauty traditions and clean botanical nourishment. From Spanish Squalane to Ayurvedic Onion seed extracts.',
      visual: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      tag: 'Holistic Wellness',
      focusBrand: 'Pilgrim & Mamaearth'
    }
  ];

  return (
    <div className="w-full">
      {/* SECTION 1: HOMEPAGE OPENING HERO (Split Layout matching Section 6.B & Reference Screenshot) */}
      <section className="relative w-full bg-[#F8F5F0] border-b border-[#E5DED4] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Side Editorial Content */}
            <div className="lg:col-span-6 flex flex-col items-start z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE7DC] border border-[#E5DED4] mb-6">
                <Sparkles className="w-3 h-3 text-[#C9B18A]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#171512]">
                  Curated For A Brighter You
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#171512] tracking-tight leading-[1.08] mb-6">
                Global Beauty <br />
                <span className="italic font-light">For Real Life</span>
              </h1>

              <p className="text-sm sm:text-base text-[#524C46] leading-relaxed max-w-lg mb-8 font-light">
                Skincare, haircare and treatments, handpicked from the world&apos;s most loved science and clean beauty houses—including Anua, Medicube, Bare Anatomy, Purito, Minimalist, and The Derma Co.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg cursor-pointer group"
                >
                  <span>Shop The Edit</span>
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </button>

                <button
                  onClick={() => navigate('/brands')}
                  className="px-5 sm:px-6 py-3.5 sm:py-4 border border-[#171512] text-[#171512] hover:bg-[#171512] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  Explore Brands
                </button>
              </div>

              {/* Guarantees Strip */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#E5DED4] text-xs text-[#524C46]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#00805A]" />
                  <span>100% Authentic Brands</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#00805A]" />
                  <span>Free Express Over ₹999</span>
                </div>
              </div>
            </div>

            {/* Right Side Editorial Still Life Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none aspect-auto sm:aspect-4/5 bg-[#EFE7DC] border border-[#E5DED4] p-3.5 sm:p-8 shadow-xl flex flex-col justify-between overflow-hidden">
                {/* Background Subtle Gradient & Sunlight Beam */}
                <div className="absolute inset-0 bg-radial from-white/70 via-transparent to-black/5 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-semibold text-[#524C46] mb-2 sm:mb-0">
                  <span>Vogue Beauty Edit</span>
                  <span className="text-[#171512]">Autumn / Winter</span>
                </div>

                {/* Hero Showcase Composition */}
                <div className="relative z-10 my-auto grid grid-cols-2 gap-3 sm:gap-4 items-center py-3 sm:py-4">
                  {/* Bottle 1: Anua Cleansing Oil */}
                  <div
                    onClick={() => onSelectProduct('anua-heartleaf-pore-control-cleansing-oil')}
                    className="bg-[#FFFFFF]/90 p-2.5 sm:p-5 border border-[#E5DED4] shadow-sm hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <div className="aspect-3/4 w-full flex items-center justify-center overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={PRODUCTS[0].image}
                        alt="Anua Heartleaf Pore Control Cleansing Oil"
                        className="max-h-full max-w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#524C46] block">
                        Anua
                      </span>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#171512] truncate">
                        Heartleaf Pore Oil
                      </p>
                      <span className="text-xs text-[#C9B18A] font-bold">₹1,950</span>
                    </div>
                  </div>

                  {/* Bottle 2: Medicube PDRN Pink Peptide Serum */}
                  <div
                    onClick={() => onSelectProduct('medicube-pdrn-pink-peptide-serum')}
                    className="bg-[#FFFFFF]/90 p-2.5 sm:p-5 border border-[#E5DED4] shadow-sm hover:scale-105 transition-transform cursor-pointer group mt-4 sm:mt-12"
                  >
                    <div className="aspect-3/4 w-full flex items-center justify-center overflow-hidden bg-[#FAF8F5]">
                      <img
                        src={PRODUCTS[1].image}
                        alt="Medicube PDRN Pink Peptide Serum"
                        className="max-h-full max-w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#524C46] block">
                        Medicube
                      </span>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#171512] truncate">
                        PDRN Pink Peptide
                      </p>
                      <span className="text-xs text-[#C9B18A] font-bold">₹2,450</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="relative z-10 pt-3 border-t border-[#E5DED4] flex justify-between items-center text-xs">
                  <span className="font-serif italic text-[#171512] text-[11px] sm:text-xs">Clinical actives &amp; pure botanicals</span>
                  <button
                    onClick={() => navigate('/shop')}
                    className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#171512] hover:text-[#C9B18A] flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                  >
                    <span>View Edit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED BRANDS STRIP */}
      <BrandStrip onSelectBrand={onSelectBrand} />

      {/* SECTION 3: SCROLL-DRIVEN BRAND STORY (Section 6.C) */}
      <section className="w-full bg-[#FAF8F5] py-14 sm:py-20 md:py-28 border-b border-[#E5DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-2">
                Brand Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171512]">
                A Trilogy of Care
              </h2>
            </div>

            {/* Chapter Navigator Pill Tabs - Horizontally scrollable on mobile */}
            <div className="flex items-center gap-2 mt-5 md:mt-0 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              {storyChapters.map((ch, idx) => (
                <button
                  key={ch.number}
                  onClick={() => setActiveStoryChapter(idx)}
                  className={`px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    activeStoryChapter === idx
                      ? 'bg-[#171512] text-white shadow-xs'
                      : 'bg-white border border-[#E5DED4] text-[#524C46] hover:text-[#171512]'
                  }`}
                >
                  {ch.number} · {ch.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Chapter Display */}
          <div className="bg-white border border-[#E5DED4] shadow-sm p-5 sm:p-10 lg:p-14 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text side */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-serif text-2xl text-[#C9B18A] font-light">
                    Chapter {storyChapters[activeStoryChapter].number}
                  </span>
                  <span className="h-[1px] w-12 bg-[#E5DED4]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#524C46]">
                    {storyChapters[activeStoryChapter].tag}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#171512] font-normal mb-5 leading-tight">
                  {storyChapters[activeStoryChapter].headline}
                </h3>

                <p className="text-sm text-[#524C46] leading-relaxed mb-6 font-light">
                  {storyChapters[activeStoryChapter].copy}
                </p>

                <div className="p-4 bg-[#F8F5F0] border-l-2 border-[#C9B18A] mb-8">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#524C46] block">
                    Curated Spotlight
                  </span>
                  <p className="text-xs font-semibold text-[#171512] mt-0.5">
                    {storyChapters[activeStoryChapter].focusBrand}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/shop')}
                    className="px-6 py-3 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Shop This Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      setActiveStoryChapter((activeStoryChapter + 1) % storyChapters.length)
                    }
                    className="px-4 py-3 border border-[#E5DED4] text-xs font-semibold uppercase tracking-wider text-[#524C46] hover:text-[#171512] cursor-pointer"
                  >
                    Next Chapter →
                  </button>
                </div>
              </div>

              {/* Visual side */}
              <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-4/3 overflow-hidden bg-[#FAF8F5] border border-[#E5DED4]">
                <img
                  src={storyChapters[activeStoryChapter].visual}
                  alt={storyChapters[activeStoryChapter].headline}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/30 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs p-3 text-xs flex justify-between items-center border border-[#E5DED4]">
                  <span className="font-serif italic text-[#171512]">
                    {storyChapters[activeStoryChapter].title}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#524C46]">
                    GLAM STUDIO Journal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BROWSE BY CATEGORY (5 image-led cards as specified in section 6.E) */}
      <section className="w-full bg-[#F8F5F0] py-20 border-b border-[#E5DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-2">
                Curated Categories
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171512]">
                Explore By Need
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-semibold text-[#171512] hover:text-[#C9B18A] flex items-center gap-1.5 cursor-pointer"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5-Column Grid on Desktop, 2-Column Responsive on Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => navigate(`/shop?category=${cat.name}`)}
                className="group relative flex flex-col bg-white border border-[#E5DED4] p-3 overflow-hidden transition-all duration-300 hover:border-[#171512] hover:shadow-lg cursor-pointer last:col-span-2 sm:last:col-span-1"
              >
                <div className="relative aspect-3/4 w-full bg-[#FAF8F5] mb-2.5 sm:mb-3 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-base sm:text-xl font-normal text-[#171512] group-hover:text-[#C9B18A] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#524C46] mt-0.5">
                    {cat.itemCount} Formulations
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: BESTSELLERS & FEATURED PICKS (Section 6.F) */}
      <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 border-b border-[#E5DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-2">
                Celebrated Formulas
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171512]">
                The Most Loved Bestsellers
              </h2>
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="mt-4 md:mt-0 px-6 py-3 border border-[#171512] text-[#171512] hover:bg-[#171512] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer self-start md:self-auto"
            >
              View Full Edit →
            </button>
          </div>

          {/* Product Grid: 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestsellers.slice(0, 4).map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 2}
                onClick={() => onSelectProduct(product.slug)}
                onBrandClick={onSelectBrand}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: EDITORIAL SPOTLIGHT BANNER */}
      <section className="w-full bg-[#171512] text-[#F8F5F0] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-[#C9B18A] mb-4">
            Curatorial Standard
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide leading-tight mb-6">
            Clean Science Meets <br />
            <span className="italic">Ancient Korean Botanicals</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#E5DED4]/80 max-w-2xl leading-relaxed font-light mb-10">
            Every formula on GLAM STUDIO is vetted for physiological biocompatibility, ingredient concentration authenticity, and gentle dermal synergy. No fluff, no artificial fillers—just purposeful skincare and hair wellness that transforms your everyday ritual.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl border-t border-b border-[#E5DED4]/20 py-8 mb-10">
            <div>
              <span className="font-serif text-3xl text-[#C9B18A] font-light">100%</span>
              <p className="text-[10px] uppercase tracking-wider text-[#E5DED4]/70 mt-1">Verified Brands</p>
            </div>
            <div>
              <span className="font-serif text-3xl text-[#C9B18A] font-light">0%</span>
              <p className="text-[10px] uppercase tracking-wider text-[#E5DED4]/70 mt-1">Counterfeits</p>
            </div>
            <div>
              <span className="font-serif text-3xl text-[#C9B18A] font-light">48hr</span>
              <p className="text-[10px] uppercase tracking-wider text-[#E5DED4]/70 mt-1">Express Dispatch</p>
            </div>
            <div>
              <span className="font-serif text-3xl text-[#C9B18A] font-light">₹999</span>
              <p className="text-[10px] uppercase tracking-wider text-[#E5DED4]/70 mt-1">Free Shipping</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-4 bg-[#C9B18A] hover:bg-[#FFFFFF] text-[#171512] text-xs font-semibold uppercase tracking-[0.25em] transition-colors shadow-lg cursor-pointer"
          >
            Explore The Entire Edit
          </button>
        </div>
      </section>

      {/* SECTION 7: EDITORIAL JOURNAL PREVIEW (Section 6.G) */}
      <section className="w-full bg-[#FAF8F5] py-20 border-b border-[#E5DED4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-2">
                Knowledge &amp; Rituals
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171512]">
                The Beauty Journal
              </h2>
            </div>
            <button
              onClick={() => navigate('/journal')}
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-semibold text-[#171512] hover:text-[#C9B18A] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JOURNAL_ARTICLES.map(article => (
              <div
                key={article.id}
                onClick={() => navigate(`/journal/${article.slug}`)}
                className="group flex flex-col bg-white border border-[#E5DED4] overflow-hidden hover:border-[#171512] transition-colors cursor-pointer"
              >
                <div className="aspect-16/10 w-full overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#524C46] mb-3">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#171512] group-hover:text-[#C9B18A] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#524C46] line-clamp-2 leading-relaxed mb-6 font-light">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#E5DED4] flex items-center justify-between text-xs font-semibold text-[#171512]">
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4 text-[#524C46] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
