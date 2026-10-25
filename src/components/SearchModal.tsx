import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Fragrance } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  fragrances,
  onSelectFragrance,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularSearches = ['Assam Oud', 'Mysore Sandalwood', 'Kashmiri Saffron', 'The Statesman', 'Extrait'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return fragrances.filter((f) => {
      const matchName = f.name.toLowerCase().includes(q);
      const matchNumber = f.number.toLowerCase().includes(q);
      const matchFamily = f.family.toLowerCase().includes(q);
      const matchDesc = f.description.toLowerCase().includes(q);
      const matchTop = f.notes.top.some((n) => n.toLowerCase().includes(q));
      const matchHeart = f.notes.heart.some((n) => n.toLowerCase().includes(q));
      const matchBase = f.notes.base.some((n) => n.toLowerCase().includes(q));

      return matchName || matchNumber || matchFamily || matchDesc || matchTop || matchHeart || matchBase;
    });
  }, [fragrances, query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#0B0A09] border border-[#D8B52F]/40 rounded-xs shadow-2xl p-6 text-[#F6F4EE]">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#D8B52F]/40 pb-3">
          <Search className="w-5 h-5 text-[#D8B52F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by fragrance name, note (Oud, Saffron, Sandalwood), or family..."
            className="w-full bg-transparent border-none text-sm sm:text-base text-[#F7F4EB] placeholder-[#6E6A5E] px-3 focus:outline-hidden font-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8E8A7D] hover:text-[#FFF5D0] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1 text-[#8E8A7D] hover:text-[#FFF5D0] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div className="mt-4 pt-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8E8A7D] block mb-2 font-sans font-medium">
              Popular Olfactory Inquiries:
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 text-xs bg-[#141310] hover:bg-[#1E1B15] text-[#C2BFA8] hover:text-[#D8B52F] border border-[#D8B52F]/20 rounded-xs cursor-pointer font-sans transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="mt-4 max-h-80 overflow-y-auto divide-y divide-[#D8B52F]/10">
            {results.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#8E8A7D] font-sans">
                No bespoke creations found for "{query}". Try searching for Oud, Sandalwood, or Saffron.
              </div>
            ) : (
              results.map((fragrance) => (
                <div
                  key={fragrance.id}
                  onClick={() => {
                    onSelectFragrance(fragrance);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-[#121110] transition-colors cursor-pointer group"
                >
                  <div>
                    <span className="text-[10px] text-[#D8B52F] tracking-widest uppercase font-sans">
                      {fragrance.number} · {fragrance.family}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#F7F4EB] group-hover:text-[#D8B52F]">
                      {fragrance.name}
                    </h4>
                    <p className="text-[11px] text-[#888375] font-sans truncate max-w-md">
                      {fragrance.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-serif text-xs font-semibold text-[#D8B52F] tabular-nums">
                      ₹{fragrance.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#888375] group-hover:text-[#D8B52F] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
