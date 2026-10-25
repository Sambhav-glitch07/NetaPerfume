import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Fragrance } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { InterlockingRingsMotif } from './NetaEmblem';

interface BrandStorySectionProps {
  fragrance: Fragrance;
  onExploreHeritage: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  fragrance,
  onExploreHeritage,
  onSelectFragrance,
}) => {
  return (
    <section id="our-story" className="relative w-full py-16 md:py-24 border-b border-[#D8B52F]/15 overflow-hidden">
      {/* Background Ambient Radial */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#D8B52F]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Section Layout matching reference "Journey of Elysian Elegance / A Fragrance Timeline" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Philosophy (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs tracking-[0.28em] uppercase text-[#D8B52F] font-medium font-sans">
              Our Philosophy · The Sovereign Spirit
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] leading-[1.15] tracking-tight">
              Heritage in Every Note.{' '}
              <span className="block italic text-[#D8B52F] font-normal">
                Presence in Every Moment.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#B5B0A1] font-light">
              Neta Perfume was founded on a singular conviction: true authority does not demand attention through volume, but commands it through quiet distinction. We synthesize the grand aromatic traditions of Indian perfumery with modern French architectural refinement.
            </p>

            <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#8E8A7D] font-light">
              From aged agarwood to delicate damask rose and vintage sandalwood accords, every composition is calibrated for those who lead with purpose, speak with clarity, and leave a permanent imprint upon every room they grace.
            </p>

            {/* Interlocking Rings and CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                onClick={onExploreHeritage}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-[#171512] hover:bg-[#221F1A] border border-[#D8B52F]/40 text-[#E8D8A6] hover:text-[#FFF] font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 cursor-pointer rounded-xs"
              >
                <span>View Full Heritage</span>
                <span className="w-6 h-6 rounded-full bg-[#D8B52F] text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              <InterlockingRingsMotif className="w-32 opacity-70" />
            </div>

            {/* Quantitative Proof Strip */}
            <div className="pt-6 border-t border-[#D8B52F]/15 flex items-center gap-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#D8B52F]">
                  <span className="font-serif text-xl font-semibold text-[#F7F4EB]">5.0</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D8B52F] text-[#D8B52F]" />
                  ))}
                </div>
                <span className="text-[10px] tracking-wider uppercase text-[#888375] font-sans mt-0.5">
                  Connoisseur Ratings
                </span>
              </div>

              <div className="h-8 w-[1px] bg-[#D8B52F]/20" />

              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-[#D8B52F] tabular-nums">
                  100%
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#888375] font-sans mt-0.5">
                  Extrait Formulation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Glowing Bottle Canvas (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div
              onClick={() => onSelectFragrance(fragrance)}
              className="relative w-full rounded-xs overflow-hidden border border-[#D8B52F]/30 bg-[#0A0908] p-6 sm:p-8 flex items-center justify-center cursor-pointer group shadow-2xl"
            >
              {/* Inner ambient glow floor */}
              <div className="absolute inset-x-8 bottom-4 h-12 bg-[#D8B52F]/20 blur-2xl rounded-full pointer-events-none" />

              {/* Glowing horizontal light beam like in reference */}
              <div className="absolute bottom-12 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D8B52F] to-transparent opacity-60" />

              <PerfumeBottleVisual
                fragrance={fragrance}
                size="detail"
                interactive={true}
              />

              {/* Discreet badge on top right */}
              <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase text-[#D8B52F] bg-[#14120F]/90 border border-[#D8B52F]/30 px-3 py-1 font-sans">
                Signature Flacon
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
