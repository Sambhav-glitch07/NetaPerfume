import React, { useState, useMemo } from 'react';
import { ArrowRight, Heart, SlidersHorizontal, Check } from 'lucide-react';
import { Fragrance } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { InterlockingRingsMotif } from './NetaEmblem';

interface SignatureCollectionProps {
  fragrances: Fragrance[];
  wishlist: string[];
  onToggleWishlist: (fragranceId: string) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  fragrances,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectFragrance,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = ['All', 'Woody', 'Oud', 'Amber', 'Fresh', 'Signature'];

  const filteredFragrances = useMemo(() => {
    let result = [...fragrances];

    // Filter by category
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Signature') {
        result = result.filter((f) => f.isSignature);
      } else {
        result = result.filter((f) => f.family.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [fragrances, selectedCategory, sortBy]);

  const handleAddToCartClick = (e: React.MouseEvent, fragrance: Fragrance) => {
    e.stopPropagation();
    onAddToCart(fragrance);
    setRecentlyAddedId(fragrance.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);
  };

  return (
    <section id="signature-collection" className="relative w-full py-16 md:py-24 border-b border-[#D8B52F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================== SECTION HEADER (MATCHING REFERENCE DESIGN) ===================== */}
        <div className="relative mb-12">
          {/* Top row with headline & right editorial copy */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D8B52F]/20">
            {/* Left Headline */}
            <div className="max-w-xl">
              <span className="text-xs tracking-[0.25em] uppercase text-[#D8B52F] font-medium font-sans">
                Signature Flacons
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] tracking-tight mt-1">
                Elevate Your Senses with Neta Elegance
              </h2>
            </div>

            {/* Right Editorial Copy & Interlocking Circles Motif */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:max-w-md">
              <p className="text-xs text-[#A8A495] font-light leading-relaxed font-sans">
                Welcome to the epitome of olfactory luxury — the Neta Signatures. Pure extrait compositions formulated for lingering, sovereign presence.
              </p>

              <InterlockingRingsMotif className="w-28 shrink-0 hidden md:inline-flex" />
            </div>
          </div>

          {/* Filter & Sort Bar */}
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Interactive Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#D8B52F] text-black font-semibold'
                      : 'bg-[#151310] text-[#B8B4A5] hover:text-[#FFF5D0] border border-[#D8B52F]/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-[#9E9A8E]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D8B52F]" />
              <span className="uppercase tracking-wider">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#12110F] border border-[#D8B52F]/30 text-[#E5D5A7] px-2.5 py-1 text-xs uppercase tracking-wider rounded-xs cursor-pointer focus:outline-hidden focus:border-[#D8B52F]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===================== FOUR-COLUMN PRODUCT GRID ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFragrances.map((fragrance) => {
            const isWishlisted = wishlist.includes(fragrance.id);
            const isAdded = recentlyAddedId === fragrance.id;

            return (
              <div
                key={fragrance.id}
                onClick={() => onSelectFragrance(fragrance)}
                className="group relative bg-[#0F0E0D] border border-[#D8B52F]/25 hover:border-[#D8B52F]/70 rounded-xs transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-[0_10px_30px_rgba(216,181,47,0.1)]"
              >
                {/* Top Bar on Card: Sale Tag & Wishlist Heart */}
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                  {/* Subtle Badge Tag */}
                  {fragrance.badge ? (
                    <span className="text-[10px] tracking-[0.16em] uppercase font-sans font-semibold bg-[#1C1810]/90 text-[#D8B52F] border border-[#D8B52F]/30 px-2 py-0.5 pointer-events-auto">
                      {fragrance.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] tracking-[0.16em] uppercase text-[#888375] font-sans">
                      {fragrance.family}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(fragrance.id);
                    }}
                    className="p-1.5 rounded-full bg-[#141210]/80 hover:bg-[#201D17] text-[#DDD8CB] hover:text-[#D8B52F] border border-[#D8B52F]/20 transition-colors pointer-events-auto cursor-pointer"
                    aria-label={`Add ${fragrance.name} to wishlist`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isWishlisted ? 'fill-[#D8B52F] text-[#D8B52F]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Product Visual */}
                <div className="relative pt-6 pb-2 px-4 flex items-center justify-center">
                  <PerfumeBottleVisual
                    fragrance={fragrance}
                    size="card"
                    interactive={true}
                  />
                </div>

                {/* Card Content & Pricing */}
                <div className="p-4 sm:p-5 border-t border-[#D8B52F]/15 bg-[#0A0908] flex flex-col justify-between grow">
                  <div>
                    {/* Fragrance Number & Category */}
                    <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-[#9E9A8E] font-sans">
                      <span>{fragrance.number}</span>
                      <span>{fragrance.size}</span>
                    </div>

                    {/* Fragrance Name */}
                    <h3 className="font-serif text-lg font-medium text-[#F7F4EB] group-hover:text-[#D8B52F] transition-colors mt-1 truncate">
                      {fragrance.name}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs text-[#8A8576] font-light line-clamp-2 mt-1 leading-relaxed font-sans">
                      {fragrance.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-4 pt-3 border-t border-[#D8B52F]/10 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg text-[#D8B52F] font-semibold tabular-nums">
                        ₹{fragrance.price.toLocaleString('en-IN')}
                      </span>
                      {fragrance.originalPrice && (
                        <span className="text-xs text-[#6B6658] line-through tabular-nums font-sans">
                          ₹{fragrance.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Add to Bag Circular Arrow Button matching reference */}
                    <button
                      onClick={(e) => handleAddToCartClick(e, fragrance)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isAdded
                          ? 'bg-[#3E8E41] text-white'
                          : 'bg-[#D8B52F] hover:bg-[#F2D04E] text-[#0A0908] group-hover:scale-105'
                      }`}
                      title="Add to Bag"
                      aria-label={`Add ${fragrance.name} to bag`}
                    >
                      {isAdded ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
