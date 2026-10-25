import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { NetaEmblem } from './NetaEmblem';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'signature-collection', label: 'Signature Collection' },
    { id: 'craftsmanship', label: 'Craftsmanship' },
    { id: 'limited-editions', label: 'Limited Editions' },
    { id: 'our-story', label: 'Our Story' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080707]/95 backdrop-blur-md border-b border-[#D8B52F]/20 transition-all duration-300">
      {/* Announcement Bar */}
      <div className="w-full bg-[#12100d] border-b border-[#D8B52F]/10 py-1.5 px-4 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase font-sans text-[#E5D5A7]/90 flex items-center justify-center gap-3">
          <span>Complimentary White-Glove Courier Across India</span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#D8B52F]" />
          <span>Pure Extrait de Parfum Concentration</span>
        </p>
      </div>

      {/* Main Navigation Bar: Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#D8B52F]"
          aria-label="Neta Perfume Home"
        >
          <NetaEmblem size={28} variant="gold" className="transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.28em] text-lg sm:text-xl font-semibold text-[#F7F4EA] uppercase whitespace-nowrap">
              NETA <span className="font-light text-[#D8B52F]">PERFUME</span>
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#9E9A8E] -mt-1 font-sans">
              HAUTE PARFUMERIE · INDIA
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.16em] uppercase font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-2 whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-[#D8B52F]' : 'text-[#DDD8CB] hover:text-[#FFF5D0]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D8B52F]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Functional Utilities (Search, Wishlist, Account, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#DDD8CB] hover:text-[#D8B52F] transition-colors cursor-pointer rounded-sm hover:bg-[#1C1A16] focus:outline-hidden"
            title="Search Fragrances"
            aria-label="Search Fragrances"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#DDD8CB] hover:text-[#D8B52F] transition-colors cursor-pointer rounded-sm hover:bg-[#1C1A16] focus:outline-hidden"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D8B52F] text-black text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account Trigger */}
          <button
            onClick={onOpenAccount}
            className="p-2 text-[#DDD8CB] hover:text-[#D8B52F] transition-colors cursor-pointer rounded-sm hover:bg-[#1C1A16] focus:outline-hidden"
            title="Account & Orders"
            aria-label="Account & Orders"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-3 py-2 bg-[#171513] hover:bg-[#201D19] border border-[#D8B52F]/40 text-[#F6F4EE] hover:text-[#D8B52F] transition-all cursor-pointer rounded-sm group shadow-xs"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8B52F]" />
            <span className="hidden sm:inline text-xs tracking-[0.14em] uppercase font-medium">
              Bag
            </span>
            <span className="w-5 h-5 rounded-full bg-[#D8B52F] text-black text-[10px] font-bold flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#DDD8CB] hover:text-[#D8B52F] transition-colors cursor-pointer rounded-sm"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0908] border-b border-[#D8B52F]/30 px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-sm tracking-[0.18em] uppercase py-2 text-[#E2DFD2] hover:text-[#D8B52F] border-b border-[#1A1815] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#C4C0AE] py-2"
              >
                <Search className="w-4 h-4 text-[#D8B52F]" /> Search Fragrance Database
              </button>
              <button
                onClick={() => {
                  onOpenAccount();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#C4C0AE] py-2"
              >
                <User className="w-4 h-4 text-[#D8B52F]" /> Discerning Patron Account
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
