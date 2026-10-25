import React from 'react';
import { Fragrance } from '../types';
import { NetaEmblem } from './NetaEmblem';

interface PerfumeBottleVisualProps {
  fragrance: Fragrance;
  size?: 'hero' | 'card' | 'detail' | 'craftsmanship' | 'thumbnail';
  className?: string;
  interactive?: boolean;
}

export const PerfumeBottleVisual: React.FC<PerfumeBottleVisualProps> = ({
  fragrance,
  size = 'card',
  className = '',
  interactive = true,
}) => {
  // Dimension and scale adjustments
  const isHero = size === 'hero';
  const isDetail = size === 'detail';
  const isCraft = size === 'craftsmanship';
  const isCard = size === 'card';

  // Specific color tones based on bottle style
  const bottleTint = fragrance.liquidTint || '#d4af37';

  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden group ${
        isHero
          ? 'w-full h-[460px] md:h-[540px]'
          : isDetail
          ? 'w-full h-[400px] md:h-[480px]'
          : isCraft
          ? 'w-full h-[380px] md:h-[440px]'
          : 'w-full h-64 md:h-72'
      } ${className}`}
    >
      {/* Background Studio Lighting & Volumetric Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-90"
        style={{
          background: `radial-gradient(ellipse at 50% 55%, ${bottleTint}33 0%, rgba(10, 9, 8, 0.7) 50%, #080707 90%)`,
        }}
      />

      {/* Dramatic Top Spotlight Rim */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-[#D8B52F]/20 via-[#D8B52F]/5 to-transparent blur-xl pointer-events-none" />

      {/* Base Reflection Light Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-44 h-4 bg-[#D8B52F]/25 blur-md rounded-full pointer-events-none" />

      {/* Photorealistic SVG & CSS Layered Flacon Model */}
      <div
        className={`relative z-10 flex flex-col items-center transition-transform duration-500 ${
          interactive ? 'group-hover:scale-105' : ''
        }`}
      >
        {/* ===================== THE BOTTLE CAP ===================== */}
        <div className="relative flex flex-col items-center">
          {/* Cap Finial / Crest */}
          <div className="w-8 h-3 bg-gradient-to-r from-[#94711B] via-[#FFF3C4] to-[#7D5B11] rounded-t-sm shadow-md" />
          
          {/* Main Solid Metallic Gold Stopper with Chamfered Shoulders */}
          <div className="relative w-16 md:w-20 h-14 md:h-16 rounded-t-md shadow-2xl overflow-hidden border-t border-[#FFF8DE]/50">
            {/* Realistic Brushed Gold Reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#593E07] via-[#D8B52F] via-35% via-[#FFF6D4] via-50% via-[#D8B52F] via-65% to-[#4A3305]" />
            
            {/* Fine Machined Horizontal Guilloche Grooves */}
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)]" />
            
            {/* Micro Emblem Engraving on Cap */}
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <NetaEmblem size={20} variant="outline" className="text-[#FFFBD9]" />
            </div>

            {/* Specular Edge Highlights */}
            <div className="absolute left-1 top-0 bottom-0 w-[1px] bg-[#FFFBEA]/80" />
            <div className="absolute right-1 top-0 bottom-0 w-[1px] bg-[#3B2804]/80" />
          </div>

          {/* Heavy Gold Collar & Sprayer Ring */}
          <div className="w-12 md:w-14 h-3 bg-gradient-to-r from-[#7D5C14] via-[#FFE28A] to-[#694B0B] border-y border-[#3E2905] shadow-inner" />
        </div>

        {/* ===================== THE GLASS BODY ===================== */}
        <div
          className={`relative overflow-hidden transition-all duration-300 ${
            fragrance.bottleStyle === 'fluted_column'
              ? 'w-24 md:w-28 h-56 md:h-64 rounded-md'
              : fragrance.bottleStyle === 'crystal_decanter'
              ? 'w-40 md:w-48 h-52 md:h-60 rounded-xl'
              : 'w-36 md:w-44 h-48 md:h-56 rounded-md'
          } shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]`}
          style={{
            // Multi-layered smoked glass illusion
            background: 'linear-gradient(135deg, rgba(30, 27, 24, 0.95) 0%, rgba(12, 11, 10, 0.98) 100%)',
            border: '1px solid rgba(255, 248, 220, 0.15)',
          }}
        >
          {/* Inner Refractive Chamber & Liquid Glow */}
          <div
            className="absolute inset-2 rounded-sm overflow-hidden"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${bottleTint}99 0%, ${bottleTint}33 45%, #0e0d0c 85%)`,
            }}
          >
            {/* Liquid Surface Meniscus line */}
            <div
              className="absolute top-6 left-0 right-0 h-[2px] opacity-75"
              style={{
                background: `linear-gradient(90deg, transparent, ${bottleTint}, #FFF5D6, ${bottleTint}, transparent)`,
              }}
            />

            {/* Caustic Light Streaks inside the perfume */}
            <div className="absolute -inset-full opacity-35 bg-gradient-to-tr from-transparent via-[#FFF1BD]/40 to-transparent rotate-12 blur-[1px]" />
          </div>

          {/* Heavy Base Crystal Floor (Solid bottom weight) */}
          <div className="absolute bottom-0 left-0 right-0 h-10 md:h-12 bg-gradient-to-t from-[#1b1916] via-[#100f0d] to-transparent border-t border-[#FFF8DE]/10">
            {/* Thick bottom glass reflection */}
            <div className="absolute bottom-2 left-4 right-4 h-1.5 bg-[#FFF5D0]/30 rounded-full blur-[1px]" />
          </div>

          {/* Side Glass Chamfer Reflections (Left bevel highlight) */}
          <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-[#FFF5CE]/40 via-[#FFF5CE]/10 to-transparent" />
          
          {/* Right Shadow Bevel */}
          <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-[#000000]/80 to-transparent" />

          {/* ===================== EMBOSSED BRAND LABEL ===================== */}
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="relative w-28 md:w-32 py-3 px-2 flex flex-col items-center justify-center text-center bg-[#070707]/90 backdrop-blur-xs border border-[#D8B52F]/40 shadow-lg">
              {/* Fine Gold Inner Inset Border */}
              <div className="absolute inset-1 border border-[#D8B52F]/20 pointer-events-none" />

              {/* Tiny Crest Emblem */}
              <NetaEmblem size={16} variant="gold" className="mb-1" />

              {/* Brand Wordmark */}
              <span className="font-serif tracking-[0.25em] text-[10px] md:text-[11px] font-semibold text-[#FFF5D0] uppercase">
                NETA
              </span>

              {/* Fragrance Number & Name */}
              <span className="font-serif tracking-[0.12em] text-[8px] md:text-[9px] text-[#D8B52F] mt-0.5">
                {fragrance.number}
              </span>
              <span className="font-serif tracking-widest text-[9px] md:text-[10px] font-medium text-[#F7F4EA] uppercase mt-0.5 max-w-[100px] truncate">
                {fragrance.name}
              </span>

              {/* Divider Hairline */}
              <div className="w-8 h-[1px] bg-[#D8B52F]/50 my-1" />

              {/* Sub-label */}
              <span className="font-sans text-[6px] md:text-[7px] tracking-[0.18em] text-[#C2BFA8] uppercase">
                EXTRAIT DE PARFUM
              </span>
              <span className="font-sans text-[5.5px] md:text-[6.5px] tracking-widest text-[#8F8B7D] mt-0.5">
                100 ML · 3.4 FL. OZ.
              </span>
            </div>
          </div>

          {/* Glass Top Rim Specular Glint */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFFDEB]/90 to-transparent" />
        </div>

        {/* ===================== GROUND REFLECTION ===================== */}
        <div className="w-32 md:w-40 h-8 mt-1 scale-y-[-0.3] opacity-25 blur-[2px] overflow-hidden pointer-events-none">
          <div
            className="w-full h-16 rounded-md"
            style={{
              background: `linear-gradient(to bottom, ${bottleTint}66, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
