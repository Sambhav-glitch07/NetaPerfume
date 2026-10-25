import React, { useState } from 'react';
import { Maximize2, Minimize2, Eye } from 'lucide-react';

interface FramedCanvasContainerProps {
  children: React.ReactNode;
}

export const FramedCanvasContainer: React.FC<FramedCanvasContainerProps> = ({ children }) => {
  const [isFramed, setIsFramed] = useState(true);

  return (
    <div className={`min-h-screen bg-[#2c291c] text-[#F6F4EE] transition-all duration-500 ${isFramed ? 'py-4 md:py-10 px-0 sm:px-4 md:px-8 lg:px-14' : 'p-0'}`}>
      
      {/* Editorial Header bar above the framed canvas on desktop (Matching Reference Image) */}
      {isFramed && (
        <div className="max-w-[1440px] mx-auto px-4 pb-6 hidden md:flex items-start justify-between gap-8">
          {/* Top Left: Reference Title Typography */}
          <div className="flex flex-col">
            <h1 className="font-serif text-3xl lg:text-4xl tracking-tight text-[#F7F4EB] leading-none">
              Full{' '}
              <span className="block text-[#D8B52F] font-serif italic mt-0.5">
                Website
              </span>
            </h1>
            <div className="w-20 h-[1.5px] bg-[#D8B52F]/60 mt-2" />
          </div>

          {/* Top Right: Editorial commentary & View mode toggle matching reference note */}
          <div className="flex items-center gap-6 max-w-xl text-right">
            <p className="text-xs text-[#E8D8A6]/90 font-serif italic leading-relaxed">
              "The website exudes luxury with a clean layout, showcasing perfumes through stunning visuals and intuitive navigation. Seamless checkout ensures a smooth user experience, elevating online perfume shopping to a refined indulgence."
            </p>

            <button
              onClick={() => setIsFramed(!isFramed)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#171510] border border-[#D8B52F]/40 hover:border-[#D8B52F] text-[11px] font-sans tracking-wider uppercase text-[#D8B52F] rounded-xs cursor-pointer shrink-0 transition-all"
              title="Toggle Full-Bleed View"
            >
              {isFramed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{isFramed ? 'Full-Bleed View' : 'Framed View'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating View Mode Switch when Full-Bleed */}
      {!isFramed && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsFramed(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#12110F]/90 backdrop-blur-md border border-[#D8B52F]/50 text-xs text-[#D8B52F] rounded-full shadow-2xl hover:bg-[#1E1B15] transition-all cursor-pointer font-sans uppercase tracking-wider"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Framed View</span>
          </button>
        </div>
      )}

      {/* The Central Website Surface: Deep near-black (#080707) with subtly rounded corners */}
      <div
        className={`w-full max-w-[1440px] mx-auto bg-[#080707] transition-all duration-500 overflow-hidden ${
          isFramed
            ? 'md:rounded-[28px] lg:rounded-[36px] border md:border-[#D8B52F]/25 shadow-[0_35px_90px_rgba(0,0,0,0.85)]'
            : 'rounded-none border-none shadow-none'
        }`}
      >
        {children}
      </div>

    </div>
  );
};
