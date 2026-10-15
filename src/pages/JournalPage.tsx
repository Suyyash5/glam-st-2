import React from 'react';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';

interface JournalPageProps {
  articleSlug?: string;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  navigate: (route: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  articleSlug,
  onBack,
  onSelectArticle,
  navigate
}) => {
  const currentArticle = articleSlug
    ? JOURNAL_ARTICLES.find(a => a.slug === articleSlug)
    : null;

  if (currentArticle) {
    return (
      <div className="w-full bg-[#F8F5F0] min-h-screen pb-24">
        {/* Navigation Bar */}
        <div className="border-b border-[#E5DED4] bg-white py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-[#524C46]">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-medium text-[#171512] hover:text-[#C9B18A] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to The Journal</span>
            </button>
            <span className="uppercase tracking-widest text-[10px]">{currentArticle.category}</span>
          </div>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9B18A] block mb-3">
            {currentArticle.category} · {currentArticle.readTime}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#171512] font-normal leading-tight mb-4">
            {currentArticle.title}
          </h1>

          <p className="font-serif italic text-lg text-[#524C46] leading-relaxed mb-8">
            {currentArticle.subtitle}
          </p>

          <div className="flex items-center gap-4 py-4 border-y border-[#E5DED4] text-xs text-[#524C46] mb-8">
            <span className="font-semibold text-[#171512]">{currentArticle.author}</span>
            <span>·</span>
            <span>{currentArticle.authorRole}</span>
            <span>·</span>
            <span>{currentArticle.date}</span>
          </div>

          <div className="aspect-16/9 w-full mb-10 overflow-hidden bg-white border border-[#E5DED4]">
            <img
              src={currentArticle.image}
              alt={currentArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 text-sm sm:text-base text-[#171512]/90 leading-relaxed font-light">
            {currentArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-[#E5DED4] flex justify-between items-center">
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-[#171512] hover:bg-[#C9B18A] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Shop Curated Formulas →
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8F5F0] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E5DED4] bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#524C46] block mb-2">
            Editorial Insights
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#171512] mb-3">
            The Beauty Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#524C46] font-light leading-relaxed">
            Biochemical breakdowns, ingredient deep dives, and mindful rituals curated by our editorial team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <h2 className="sr-only">Journal Articles Directory</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map(article => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.slug)}
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
                <h3 className="font-serif text-2xl font-normal text-[#171512] group-hover:text-[#C9B18A] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-[#524C46] line-clamp-3 leading-relaxed mb-6 font-light">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-[#E5DED4] flex items-center justify-between text-xs font-semibold text-[#171512]">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
