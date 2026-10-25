import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Fragrance } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { InterlockingRingsMotif } from './NetaEmblem';

interface HeroSectionProps {
  featuredFragrance: Fragrance;
  onExploreClick: () => void;
  onPhilosophyClick: () => void;
  onProductClick: (fragrance: Fragrance) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredFragrance,
  onExploreClick,
  onPhilosophyClick,
  onProductClick,
}) => {
  return (
    <section className="relative w-full pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#D8B52F]/15">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-[#D8B52F]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[#9E7A18]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Editorial Headline & Actions (5.5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 z-10">
            {/* Subtle Kicker / Subtitle */}
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D8B52F] font-medium">
              <span>Haute Parfumerie</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8B52F]" />
              <span>Neta No. 01 Edition</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-[#F7F4EB]">
              Command Attention.{' '}
              <span className="block mt-1 gold-gradient-text font-normal italic">
                Leave a Legacy.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#B5B0A1] max-w-lg font-light">
              Discover distinctive fragrances composed for confidence, character, and an unforgettable presence. A modern interpretation of Indian luxury, crafted for those who make every moment count.
            </p>

            {/* Actions: Primary CTA with circle arrow & Secondary link */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                onClick={onExploreClick}
                className="group relative inline-flex items-center gap-4 px-6 py-3.5 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 shadow-md cursor-pointer rounded-xs"
              >
                <span>View All Fragrances</span>
                <span className="w-7 h-7 rounded-full bg-[#0A0908] text-[#D8B52F] group-hover:text-[#FFF5D0] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={onPhilosophyClick}
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase text-[#DDD8CB] hover:text-[#D8B52F] font-medium py-2 transition-colors cursor-pointer group"
              >
                <span>Discover Our Philosophy</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Micro Authority Seal & Interlocking Rings */}
            <div className="pt-6 border-t border-[#D8B52F]/15 flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#D8B52F]/40 flex items-center justify-center bg-[#151310]">
                  <ShieldCheck className="w-4 h-4 text-[#D8B52F]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-serif tracking-wider text-[#F7F4EA]">
                    Master Distillers
                  </span>
                  <span className="text-[10px] tracking-widest text-[#8F8A7C] uppercase font-sans">
                    Kannauj & Grasse Heritage
                  </span>
                </div>
              </div>

              {/* Interlocking Rings Graphic */}
              <InterlockingRingsMotif className="w-24 opacity-70 hidden sm:block" />
            </div>
          </div>

          {/* Center Column: Photorealistic Perfume Bottle Feature (4.5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Clickable bottle visual to open details */}
            <div
              onClick={() => onProductClick(featuredFragrance)}
              className="cursor-pointer w-full group"
              title={`View details for ${featuredFragrance.name}`}
            >
              <PerfumeBottleVisual
                fragrance={featuredFragrance}
                size="hero"
                interactive={true}
              />
            </div>

            {/* Bottom "Explore Luxury" Slider bar matching the reference image */}
            <div className="mt-4 flex items-center gap-3 w-full max-w-xs justify-center">
              <div className="w-10 h-[1px] bg-[#D8B52F]/40" />
              <button
                onClick={() => onProductClick(featuredFragrance)}
                className="px-4 py-1.5 rounded-full border border-[#D8B52F]/40 bg-[#141210]/90 text-[10px] tracking-[0.2em] uppercase text-[#E8D8A6] hover:text-[#FFF] hover:border-[#D8B52F] transition-all cursor-pointer"
              >
                Explore Luxury
              </button>
              <div className="w-10 h-[1px] bg-[#D8B52F]/40" />
            </div>
          </div>

          {/* Right Column: Restrained Distinctive Heritage Pillars (2 cols) */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col justify-around lg:justify-center items-start gap-6 lg:gap-10 border-t lg:border-t-0 lg:border-l border-[#D8B52F]/15 pt-6 lg:pt-0 lg:pl-6">
            {/* Stat 1 */}
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#D8B52F] tabular-nums">
                12+
              </span>
              <span className="text-xs font-serif tracking-wider text-[#F7F4EA] mt-1">
                Signature Blends
              </span>
              <span className="text-[10px] text-[#8C8778] tracking-widest uppercase font-sans mt-0.5">
                Rare Formulations
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#D8B52F] tabular-nums">
                100%
              </span>
              <span className="text-xs font-serif tracking-wider text-[#F7F4EA] mt-1">
                Pure Extrait
              </span>
              <span className="text-[10px] text-[#8C8778] tracking-widest uppercase font-sans mt-0.5">
                Superior Concentration
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#D8B52F] tabular-nums">
                18h+
              </span>
              <span className="text-xs font-serif tracking-wider text-[#F7F4EA] mt-1">
                Timeless Sillage
              </span>
              <span className="text-[10px] text-[#8C8778] tracking-widest uppercase font-sans mt-0.5">
                Distinctive Presence
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
