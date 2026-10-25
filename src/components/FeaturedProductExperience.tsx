import React, { useState } from 'react';
import { ShoppingBag, Zap, Heart, Check, Minus, Plus } from 'lucide-react';
import { Fragrance } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { NetaEmblem } from './NetaEmblem';

interface FeaturedProductExperienceProps {
  fragrance: Fragrance;
  isWishlisted: boolean;
  onToggleWishlist: (fragranceId: string) => void;
  onAddToCart: (fragrance: Fragrance, quantity: number, size: string) => void;
  onBuyNow: (fragrance: Fragrance, quantity: number, size: string) => void;
}

export const FeaturedProductExperience: React.FC<FeaturedProductExperienceProps> = ({
  fragrance,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('100 ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const sizes = [
    { label: '50 ml Flacon', volume: '50 ml', multiplier: 0.65 },
    { label: '100 ml Flacon (Signature)', volume: '100 ml', multiplier: 1.0 },
  ];

  const currentSizeObj = sizes.find((s) => s.volume === selectedSize) || sizes[1];
  const computedPrice = Math.round(fragrance.price * currentSizeObj.multiplier);

  const handleAdd = () => {
    onAddToCart(fragrance, quantity, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(fragrance, quantity, selectedSize);
  };

  return (
    <section className="relative w-full py-16 md:py-24 border-b border-[#D8B52F]/15 bg-[#070606] overflow-hidden">
      {/* Background Volumetric Gold Glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D8B52F]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <NetaEmblem size={24} variant="gold" className="mx-auto mb-2" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#D8B52F] font-medium font-sans">
            Featured Masterwork
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] tracking-tight mt-1">
            {fragrance.number} — {fragrance.name}
          </h2>
          <div className="w-16 h-[1px] bg-[#D8B52F]/40 mx-auto mt-4" />
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Large Cinematic Bottle Flacon (6 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-6 sm:p-10 bg-[#0C0B0A] border border-[#D8B52F]/25 rounded-xs shadow-2xl">
            {/* Ambient Radial Spotlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#D8B52F]/10 via-transparent to-transparent pointer-events-none" />

            <PerfumeBottleVisual
              fragrance={fragrance}
              size="detail"
              interactive={false}
            />

            {/* Spec Sheet Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-widest text-[#9E9A8E] uppercase font-sans border-t border-[#D8B52F]/15 pt-2">
              <span>{fragrance.concentration}</span>
              <span>{fragrance.longevity}</span>
            </div>
          </div>

          {/* Right: Scent Breakdown & Purchase Module (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Row: Category & Wishlist */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D8B52F]/15">
              <span className="text-xs tracking-[0.2em] uppercase text-[#D8B52F] font-sans font-medium">
                {fragrance.family} Olfactory Profile
              </span>

              <button
                onClick={() => onToggleWishlist(fragrance.id)}
                className="flex items-center gap-1.5 text-xs text-[#DDD8CB] hover:text-[#D8B52F] cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D8B52F] text-[#D8B52F]' : ''}`} />
                <span className="font-sans uppercase tracking-wider text-[10px]">
                  {isWishlisted ? 'Saved' : 'Wishlist'}
                </span>
              </button>
            </div>

            {/* Story & Description */}
            <div>
              <p className="font-sans text-sm text-[#DDD8CB] leading-relaxed font-light">
                {fragrance.description}
              </p>
              <p className="font-sans text-xs text-[#9E9A8E] leading-relaxed mt-2 font-light">
                {fragrance.story}
              </p>
            </div>

            {/* Scent Notes Pyramid */}
            <div className="bg-[#100F0E] border border-[#D8B52F]/20 p-4 rounded-xs space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8B52F] block font-sans font-semibold">
                Olfactory Composition
              </span>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <span className="w-16 tracking-wider uppercase text-[#888375] font-medium shrink-0">
                    Top Notes:
                  </span>
                  <span className="text-[#F7F4EB]">{fragrance.notes.top.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-16 tracking-wider uppercase text-[#888375] font-medium shrink-0">
                    Heart:
                  </span>
                  <span className="text-[#F7F4EB]">{fragrance.notes.heart.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-16 tracking-wider uppercase text-[#888375] font-medium shrink-0">
                    Base:
                  </span>
                  <span className="text-[#F7F4EB]">{fragrance.notes.base.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <span className="text-xs tracking-wider uppercase text-[#9E9A8E] block mb-2 font-sans">
                Select Flacon Volume
              </span>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map((s) => (
                  <button
                    key={s.volume}
                    onClick={() => setSelectedSize(s.volume)}
                    className={`py-2.5 px-3 text-xs tracking-wider uppercase font-medium text-center border transition-all cursor-pointer rounded-xs ${
                      selectedSize === s.volume
                        ? 'border-[#D8B52F] bg-[#D8B52F]/10 text-[#FFF5D0]'
                        : 'border-[#D8B52F]/25 bg-[#121110] text-[#9E9A8E] hover:border-[#D8B52F]/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#888375] block font-sans">
                  Total Investment
                </span>
                <span className="font-serif text-3xl font-semibold text-[#D8B52F] tabular-nums">
                  ₹{(computedPrice * quantity).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#D8B52F]/30 bg-[#121110] rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#DDD8CB] hover:text-[#D8B52F] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold text-[#F7F4EB] tabular-nums font-sans">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#DDD8CB] hover:text-[#D8B52F] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleAdd}
                className="flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#171512] hover:bg-[#221F1A] border border-[#D8B52F]/50 text-[#F6F4EE] hover:text-[#D8B52F] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#D8B52F]" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D8B52F]" /> Add to Bag
                  </>
                )}
              </button>

              <button
                onClick={handleBuy}
                className="flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs shadow-md"
              >
                <Zap className="w-4 h-4" /> Immediate Checkout
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
