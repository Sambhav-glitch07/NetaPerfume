import React from 'react';
import { ArrowRight, ArrowUp, Heart, Star, Check } from 'lucide-react';
import { Fragrance } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { InterlockingRingsMotif } from './NetaEmblem';

interface LimitedEditionsProps {
  fragrances: Fragrance[];
  wishlist: string[];
  onToggleWishlist: (fragranceId: string) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const LimitedEditions: React.FC<LimitedEditionsProps> = ({
  fragrances,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectFragrance,
}) => {
  const [recentlyAddedId, setRecentlyAddedId] = React.useState<string | null>(null);

  // Find limited edition items
  const royalDurbar = fragrances.find((f) => f.id === 'neta-00-royal-durbar') || fragrances[0];
  const enchantingEmber = fragrances.find((f) => f.id === 'neta-enchanting-ember') || fragrances[1];
  const luminousAccord = fragrances.find((f) => f.id === 'neta-luminous-accord') || fragrances[2];
  const velvetSantal = fragrances.find((f) => f.id === 'neta-velvet-santal') || fragrances[3];

  const handleAdd = (e: React.MouseEvent, fragrance: Fragrance) => {
    e.stopPropagation();
    onAddToCart(fragrance);
    setRecentlyAddedId(fragrance.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  return (
    <section id="limited-editions" className="relative w-full py-16 md:py-24 border-b border-[#D8B52F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================== SECTION HEADER ===================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D8B52F]/20 mb-12">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#D8B52F] font-medium font-sans">
              Rare Formulations · Collector Reserve
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] tracking-tight mt-1">
              Neta Prestige: Limited Editions Unveiled
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <p className="text-xs text-[#9E9A8E] font-light max-w-sm leading-relaxed font-sans">
              Immerse yourself in the prestige of limited editions, where exceptional craftsmanship and rarity unite to create an olfactory masterpiece.
            </p>

            <InterlockingRingsMotif className="w-28 shrink-0 hidden sm:inline-flex" />
          </div>
        </div>

        {/* ===================== ASYMMETRICAL LUXURY SHOWCASE ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1 (Large 5 cols): Neta No. 00 Royal Durbar Reserve */}
          <div
            onClick={() => onSelectFragrance(royalDurbar)}
            className="lg:col-span-5 bg-[#0C0B0A] border border-[#D8B52F]/30 hover:border-[#D8B52F]/70 rounded-xs p-6 flex flex-col justify-between cursor-pointer group shadow-xl transition-all duration-300"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#D8B52F] bg-[#16130D] border border-[#D8B52F]/30 px-2.5 py-1">
                Limited Edition · 300 Bottles
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(royalDurbar.id);
                }}
                className="p-1.5 rounded-full bg-[#141210] hover:bg-[#201D17] text-[#DDD8CB] hover:text-[#D8B52F] border border-[#D8B52F]/20"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlist.includes(royalDurbar.id) ? 'fill-[#D8B52F] text-[#D8B52F]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Visual */}
            <div className="py-4 flex items-center justify-center">
              <PerfumeBottleVisual fragrance={royalDurbar} size="card" interactive={true} />
            </div>

            {/* Content */}
            <div className="pt-4 border-t border-[#D8B52F]/15">
              <div className="flex items-center justify-between text-xs tracking-widest text-[#9E9A8E] uppercase font-sans">
                <span>{royalDurbar.number}</span>
                <span>{royalDurbar.size}</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[#F7F4EB] group-hover:text-[#D8B52F] transition-colors mt-1">
                {royalDurbar.name}
              </h3>
              <p className="text-xs text-[#8A8576] font-sans font-light mt-1.5 leading-relaxed">
                {royalDurbar.description}
              </p>

              {/* Price & Add */}
              <div className="mt-4 pt-3 border-t border-[#D8B52F]/10 flex items-center justify-between">
                <span className="font-serif text-xl font-semibold text-[#D8B52F] tabular-nums">
                  ₹{royalDurbar.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={(e) => handleAdd(e, royalDurbar)}
                  className="w-9 h-9 rounded-full bg-[#D8B52F] hover:bg-[#F2D04E] text-[#0A0908] flex items-center justify-center transition-all cursor-pointer group-hover:scale-105"
                >
                  {recentlyAddedId === royalDurbar.id ? (
                    <Check className="w-4 h-4 text-black" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 (Medium 4 cols): Enchanting Ember */}
          <div
            onClick={() => onSelectFragrance(enchantingEmber)}
            className="lg:col-span-4 bg-[#0C0B0A] border border-[#D8B52F]/30 hover:border-[#D8B52F]/70 rounded-xs p-6 flex flex-col justify-between cursor-pointer group shadow-xl transition-all duration-300"
          >
            {/* Top row with Rating & Wishlist */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 bg-[#14120F] border border-[#D8B52F]/30 px-2 py-0.5 rounded-xs text-[#D8B52F] text-xs">
                <Star className="w-3 h-3 fill-[#D8B52F]" />
                <span className="font-sans font-medium text-[11px]">5.0</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(enchantingEmber.id);
                }}
                className="p-1.5 rounded-full bg-[#141210] hover:bg-[#201D17] text-[#DDD8CB] hover:text-[#D8B52F] border border-[#D8B52F]/20"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlist.includes(enchantingEmber.id) ? 'fill-[#D8B52F] text-[#D8B52F]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Visual */}
            <div className="py-2 flex items-center justify-center">
              <PerfumeBottleVisual fragrance={enchantingEmber} size="card" interactive={true} />
            </div>

            {/* Content */}
            <div className="pt-4 border-t border-[#D8B52F]/15">
              <span className="text-[10px] tracking-widest text-[#9E9A8E] uppercase font-sans">
                {enchantingEmber.family} Family
              </span>
              <h3 className="font-serif text-lg font-medium text-[#F7F4EB] group-hover:text-[#D8B52F] transition-colors mt-0.5">
                {enchantingEmber.name}
              </h3>
              <p className="text-xs text-[#8A8576] font-sans font-light mt-1.5 line-clamp-2 leading-relaxed">
                {enchantingEmber.description}
              </p>

              {/* Price & Add */}
              <div className="mt-4 pt-3 border-t border-[#D8B52F]/10 flex items-center justify-between">
                <span className="font-serif text-lg font-semibold text-[#D8B52F] tabular-nums">
                  ₹{enchantingEmber.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={(e) => handleAdd(e, enchantingEmber)}
                  className="w-8 h-8 rounded-full bg-[#D8B52F] hover:bg-[#F2D04E] text-[#0A0908] flex items-center justify-center transition-all cursor-pointer group-hover:scale-105"
                >
                  {recentlyAddedId === enchantingEmber.id ? (
                    <Check className="w-4 h-4 text-black" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Cards 3 & 4 (3 cols): Vertical Fluted Column Cards matching reference! */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            {[luminousAccord, velvetSantal].map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectFragrance(item)}
                className="relative bg-[#0E0D0C] border border-[#D8B52F]/25 hover:border-[#D8B52F]/80 rounded-xs p-3 flex flex-col justify-between items-center cursor-pointer group transition-all duration-300"
              >
                {/* Upward Arrow Icon on top */}
                <div className="w-6 h-6 rounded-full border border-[#D8B52F]/30 flex items-center justify-center text-[#D8B52F] group-hover:bg-[#D8B52F] group-hover:text-black transition-colors">
                  <ArrowUp className="w-3 h-3" />
                </div>

                {/* Vertical Rotated Typography matching the screenshot! */}
                <div className="my-6 py-2 overflow-hidden flex items-center justify-center">
                  <span
                    className="font-serif text-xs tracking-[0.22em] text-[#C2BFA8] group-hover:text-[#D8B52F] uppercase whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {item.name} · Extrait
                  </span>
                </div>

                {/* Miniature Bottle Thumbnail and Price */}
                <div className="w-full text-center pt-2 border-t border-[#D8B52F]/15">
                  <span className="font-serif text-xs font-semibold text-[#D8B52F] block tabular-nums">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] text-[#888476] tracking-wider uppercase font-sans">
                    100ml
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
