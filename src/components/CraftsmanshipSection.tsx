import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Fragrance } from '../types';
import { BRAND_PRINCIPLES, CRAFTSMANSHIP_POINTS } from '../data/fragrances';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { InterlockingRingsMotif } from './NetaEmblem';

interface CraftsmanshipSectionProps {
  fragrance: Fragrance;
  onExploreMore: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  fragrance,
  onExploreMore,
  onSelectFragrance,
}) => {
  return (
    <section id="craftsmanship" className="relative w-full py-16 md:py-24 border-b border-[#D8B52F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================== SECTION HEADER (MATCHING REFERENCE) ===================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D8B52F]/20 mb-12">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[#D8B52F] font-medium font-sans">
              Olfactory Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] tracking-tight mt-1">
              Tradition, Innovation Unite in Craftsmanship.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={onExploreMore}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#14120F] hover:bg-[#1E1B15] border border-[#D8B52F]/40 text-[#E8D8A6] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs"
            >
              <span>Explore Formulations</span>
              <span className="w-5 h-5 rounded-full bg-[#D8B52F] text-black flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            <InterlockingRingsMotif className="w-28 shrink-0 hidden sm:inline-flex" />
          </div>
        </div>

        {/* ===================== SYMMETRICAL 3-COLUMN DISPLAY WITH DOTTED CONNECTORS ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (4 cols): The 3 Pillars */}
          <div className="lg:col-span-4 space-y-8 text-left lg:text-right">
            {BRAND_PRINCIPLES.map((principle, index) => (
              <div key={principle.number} className="relative group">
                <div className="flex items-center lg:justify-end gap-2 text-xs tracking-widest text-[#D8B52F] font-sans font-medium uppercase">
                  <span>{principle.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8B52F]" />
                  <span>{principle.subtitle}</span>
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-[#F7F4EB] mt-1 group-hover:text-[#D8B52F] transition-colors">
                  {principle.title}
                </h3>
                
                <p className="text-xs text-[#9E9A8E] font-sans font-light leading-relaxed mt-2">
                  {principle.description}
                </p>

                {/* Symmetrical Gold Dotted Connector visible on desktop */}
                <div className="hidden lg:flex items-center justify-end gap-1 mt-3 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-[#D8B52F]" />
                  <div className="w-16 border-t border-dashed border-[#D8B52F]" />
                </div>
              </div>
            ))}
          </div>

          {/* Center Column (4 cols): Dramatic Bottle in Chiaroscuro */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div
              onClick={() => onSelectFragrance(fragrance)}
              className="relative w-full max-w-sm rounded-xs border border-[#D8B52F]/30 bg-[#0A0908] p-4 flex flex-col items-center justify-center cursor-pointer group shadow-2xl hover:border-[#D8B52F]/70 transition-colors"
            >
              {/* Gold Top Light Spotlight */}
              <div className="absolute top-0 w-36 h-20 bg-[#D8B52F]/15 blur-xl pointer-events-none" />
              
              <PerfumeBottleVisual
                fragrance={fragrance}
                size="craftsmanship"
                interactive={true}
              />

              {/* Flacon Caption */}
              <div className="mt-3 text-center">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8B52F] font-sans">
                  The Imperial Architecture
                </span>
                <p className="font-serif text-sm text-[#F7F4EA]">
                  Aged Assam Agarwood & Mysore Sandalwood
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Artisanal Excellence */}
          <div className="lg:col-span-4 space-y-8 text-left">
            {CRAFTSMANSHIP_POINTS.right.map((point, index) => (
              <div key={point.title} className="relative group">
                {/* Dotted Connector on Left side for right column */}
                <div className="hidden lg:flex items-center gap-1 mb-2 opacity-60">
                  <div className="w-16 border-t border-dashed border-[#D8B52F]" />
                  <div className="w-2 h-2 rounded-full bg-[#D8B52F]" />
                </div>

                <div className="flex items-center gap-2 text-xs tracking-widest text-[#D8B52F] font-sans font-medium uppercase">
                  <span>Standard 0{index + 1}</span>
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-[#F7F4EB] mt-1 group-hover:text-[#D8B52F] transition-colors">
                  {point.title}
                </h3>
                
                <p className="text-xs text-[#9E9A8E] font-sans font-light leading-relaxed mt-2">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
