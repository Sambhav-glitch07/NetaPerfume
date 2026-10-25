import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Minus, Plus, ShoppingBag, Tag, Check, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
  discountCode: string;
  appliedDiscount: number;
  onApplyDiscountCode: (code: string) => boolean;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
  discountCode,
  appliedDiscount,
  onApplyDiscountCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(appliedDiscount > 0);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const shippingCost = subtotal > 5000 || subtotal === 0 ? 0 : 450;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const success = onApplyDiscountCode(promoInput.trim());
    if (success) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid privilege code. Try "LEGACY10" for 10% courtesy.');
      setPromoSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0908] border-l border-[#D8B52F]/30 text-[#F6F4EE] flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-[#D8B52F]/20 flex items-center justify-between bg-[#11100F]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D8B52F]" />
              <h2 className="font-serif text-lg font-medium tracking-wide text-[#F7F4EB]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#9E9A8E] font-sans tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#DDD8CB] hover:text-[#D8B52F] hover:bg-[#1C1A16] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="bg-[#141210] px-5 py-2.5 border-b border-[#D8B52F]/15 text-xs font-sans">
            {subtotal >= 5000 ? (
              <div className="flex items-center gap-2 text-[#D8B52F]">
                <Check className="w-3.5 h-3.5" />
                <span>Complimentary White-Glove Insured Delivery Unlocked</span>
              </div>
            ) : (
              <div className="text-[#A8A495]">
                Add <span className="text-[#D8B52F] font-semibold">₹{(5000 - subtotal).toLocaleString('en-IN')}</span> more for Complimentary Courier
              </div>
            )}
          </div>

          {/* Bag Items List or Empty State */}
          <div className="grow overflow-y-auto p-5 divide-y divide-[#D8B52F]/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full border border-[#D8B52F]/30 flex items-center justify-center bg-[#121110]">
                  <ShoppingBag className="w-7 h-7 text-[#D8B52F]/60" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#F7F4EB]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#8E8A7D] max-w-xs font-sans leading-relaxed">
                  Explore our signature extraits and limited collections to elevate your olfactory presence.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="mt-2 px-6 py-2.5 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] text-xs font-sans tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={`${item.fragrance.id}-${item.size}-${index}`} className="py-4 flex gap-4 items-center">
                  {/* Miniature Flacon Badge */}
                  <div className="w-16 h-20 bg-[#12110F] border border-[#D8B52F]/20 rounded-xs flex flex-col items-center justify-center shrink-0 p-1">
                    <span className="font-serif text-[9px] text-[#D8B52F] font-semibold text-center leading-tight">
                      {item.fragrance.number}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-[#A5A194] text-center font-sans mt-1">
                      {item.size}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="grow overflow-hidden">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm text-[#F7F4EB] truncate">
                        {item.fragrance.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-[#7A7568] hover:text-[#E25C5C] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] text-[#8C8778] uppercase tracking-wider block font-sans">
                      {item.fragrance.family} · {item.size}
                    </span>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#D8B52F]/30 bg-[#121110] rounded-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-1 text-[#DDD8CB] hover:text-[#D8B52F]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 text-[#DDD8CB] hover:text-[#D8B52F]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-[#D8B52F] tabular-nums">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Order Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#D8B52F]/20 bg-[#11100F] space-y-4">
              
              {/* Privilege Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative grow">
                    <Tag className="w-3.5 h-3.5 text-[#D8B52F] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Privilege Code (try LEGACY10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-[#0A0908] border border-[#D8B52F]/30 text-xs py-2 pl-9 pr-3 rounded-xs text-[#F7F4EB] placeholder-[#6A6557] uppercase tracking-wider focus:outline-hidden focus:border-[#D8B52F]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1E1B16] hover:bg-[#2A261F] border border-[#D8B52F]/40 text-[#E8D8A6] text-xs uppercase tracking-wider font-sans cursor-pointer rounded-xs"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[10px] text-[#E25C5C] font-sans">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-[10px] text-[#69C775] font-sans">Privilege code applied: 10% courtesy discount.</p>
                )}
              </form>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs font-sans text-[#A8A495]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#F7F4EB] tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#69C775]">
                    <span>Privilege Courtesy ({appliedDiscount}%)</span>
                    <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Courier</span>
                  <span className="text-[#F7F4EB]">
                    {shippingCost === 0 ? 'Complimentary' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#D8B52F]/20 flex justify-between text-sm font-semibold">
                  <span className="text-[#F7F4EB]">Total</span>
                  <span className="font-serif text-lg text-[#D8B52F] tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs shadow-lg group"
              >
                <span>Proceed to Sovereign Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#7A7568] font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8B52F]" />
                <span>256-Bit SSL Encrypted Sovereign Transaction</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
