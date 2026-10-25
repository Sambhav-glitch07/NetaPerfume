import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star, Check, Minus, Plus } from 'lucide-react';
import { Fragrance } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';

interface ProductDetailModalProps {
  fragrance: Fragrance | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (fragranceId: string) => void;
  onAddToCart: (fragrance: Fragrance, quantity: number, size: string) => void;
  onBuyNow: (fragrance: Fragrance, quantity: number, size: string) => void;
  relatedFragrances: Fragrance[];
  onSelectRelated: (fragrance: Fragrance) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  fragrance,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  relatedFragrances,
  onSelectRelated,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('100 ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !fragrance) return null;

  const sizes = [
    { label: '50 ml Flacon', volume: '50 ml', multiplier: 0.65 },
    { label: '100 ml Flacon (Signature)', volume: '100 ml', multiplier: 1.0 },
  ];

  const currentSizeObj = sizes.find((s) => s.volume === selectedSize) || sizes[1];
  const unitPrice = Math.round(fragrance.price * currentSizeObj.multiplier);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(fragrance, quantity, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(fragrance, quantity, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Container */}
      <div className="relative z-10 w-full max-w-4xl bg-[#0A0908] border border-[#D8B52F]/40 rounded-xs shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto my-auto text-[#F6F4EE]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#171512] hover:bg-[#25221C] text-[#DDD8CB] hover:text-[#D8B52F] border border-[#D8B52F]/20 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Bottle Display & Badges (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full bg-[#0E0D0C] border border-[#D8B52F]/20 rounded-xs p-6 relative flex items-center justify-center">
                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(fragrance.id)}
                  className="absolute top-3 left-3 p-2 rounded-full bg-[#171512] text-[#DDD8CB] hover:text-[#D8B52F] border border-[#D8B52F]/20 cursor-pointer"
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D8B52F] text-[#D8B52F]' : ''}`} />
                </button>

                <PerfumeBottleVisual fragrance={fragrance} size="detail" interactive={false} />
              </div>

              {/* Guarantees strip */}
              <div className="w-full mt-4 space-y-2 text-[11px] text-[#A5A194] font-sans font-light">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#D8B52F]" />
                  <span>Complimentary Insured White-Glove Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D8B52F]" />
                  <span>Authenticity Certified · Sealed Extrait Flacon</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-[#D8B52F]" />
                  <span>Complimentary Discovery Sample Included</span>
                </div>
              </div>
            </div>

            {/* Right: Scent Details & Commerce (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D8B52F] font-medium font-sans">
                  <span>{fragrance.number}</span>
                  <span>·</span>
                  <span>{fragrance.family} Olfactory Family</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EB] mt-1">
                  {fragrance.name}
                </h2>
                <p className="text-xs text-[#8F8B7D] font-sans mt-0.5">
                  {fragrance.subtitle}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#D8B52F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D8B52F]" />
                  ))}
                </div>
                <span className="text-xs text-[#DDD8CB] font-sans tabular-nums font-medium">
                  {fragrance.rating}
                </span>
                <span className="text-xs text-[#7A7568] font-sans">
                  ({fragrance.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-[#DDD8CB] leading-relaxed font-light">
                {fragrance.description}
              </p>

              {/* Olfactory Notes Pyramid */}
              <div className="bg-[#121110] border border-[#D8B52F]/20 p-4 rounded-xs space-y-2.5">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8B52F] font-sans font-semibold block">
                  Olfactory Architecture
                </span>
                <div className="text-xs space-y-1.5 font-sans">
                  <div>
                    <span className="text-[#888375] uppercase text-[10px] tracking-wider block">Top Notes:</span>
                    <span className="text-[#F7F4EB]">{fragrance.notes.top.join(' · ')}</span>
                  </div>
                  <div>
                    <span className="text-[#888375] uppercase text-[10px] tracking-wider block">Heart Accords:</span>
                    <span className="text-[#F7F4EB]">{fragrance.notes.heart.join(' · ')}</span>
                  </div>
                  <div>
                    <span className="text-[#888375] uppercase text-[10px] tracking-wider block">Base Longevity:</span>
                    <span className="text-[#F7F4EB]">{fragrance.notes.base.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Performance specs */}
              <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                <div className="bg-[#100F0E] p-2.5 border border-[#D8B52F]/15 rounded-xs">
                  <span className="text-[10px] text-[#888375] uppercase block">Concentration:</span>
                  <span className="text-[#E8D8A6] font-medium">{fragrance.concentration}</span>
                </div>
                <div className="bg-[#100F0E] p-2.5 border border-[#D8B52F]/15 rounded-xs">
                  <span className="text-[10px] text-[#888375] uppercase block">Longevity / Sillage:</span>
                  <span className="text-[#E8D8A6] font-medium">{fragrance.longevity}</span>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <span className="text-xs uppercase tracking-wider text-[#9E9A8E] block mb-2 font-sans">
                  Flacon Volume
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s.volume}
                      onClick={() => setSelectedSize(s.volume)}
                      className={`py-2 px-3 text-xs tracking-wider uppercase font-medium border text-center transition-all cursor-pointer rounded-xs ${
                        selectedSize === s.volume
                          ? 'border-[#D8B52F] bg-[#D8B52F]/15 text-[#FFF5D0]'
                          : 'border-[#D8B52F]/20 bg-[#121110] text-[#9E9A8E] hover:border-[#D8B52F]/40'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing & Quantity */}
              <div className="flex items-center justify-between pt-2 border-t border-[#D8B52F]/15">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#888375] block font-sans">
                    Total
                  </span>
                  <span className="font-serif text-2xl font-semibold text-[#D8B52F] tabular-nums">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

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

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 py-3 px-5 bg-[#171512] hover:bg-[#23201B] border border-[#D8B52F]/50 text-[#F6F4EE] hover:text-[#D8B52F] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs"
                >
                  {addedSuccess ? (
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
                  className="flex items-center justify-center gap-2 py-3 px-5 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs shadow-md"
                >
                  Immediate Purchase
                </button>
              </div>

            </div>

          </div>

          {/* Related Fragrances recommendations */}
          {relatedFragrances.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#D8B52F]/20">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D8B52F] font-sans font-medium block mb-3">
                Complementary Creations
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedFragrances.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectRelated(item)}
                    className="p-3 bg-[#11100F] border border-[#D8B52F]/20 hover:border-[#D8B52F]/60 rounded-xs flex items-center gap-3 cursor-pointer group transition-colors"
                  >
                    <div className="w-10 h-10 shrink-0 bg-[#0A0908] rounded-xs flex items-center justify-center border border-[#D8B52F]/20">
                      <span className="font-serif text-[10px] text-[#D8B52F] font-semibold">
                        {item.number.replace('Neta No. ', '#')}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-serif text-xs text-[#F7F4EB] group-hover:text-[#D8B52F] truncate">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-[#888375] font-sans block tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
