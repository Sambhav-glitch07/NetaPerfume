import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { NetaEmblem } from './NetaEmblem';

interface NewsletterAndFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPolicyModal?: (policy: string) => void;
}

export const NewsletterAndFooter: React.FC<NewsletterAndFooterProps> = ({
  onNavigate,
  onOpenPolicyModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="w-full bg-[#070606] text-[#F6F4EE] border-t border-[#D8B52F]/20">
      
      {/* ===================== NEWSLETTER SECTION (MATCHING REFERENCE) ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-b border-[#D8B52F]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Brand Lockup & Copy */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <NetaEmblem size={28} variant="gold" />
              <span className="font-serif tracking-[0.25em] text-xl font-semibold text-[#F7F4EB] uppercase">
                NETA <span className="text-[#D8B52F] font-light">PERFUME</span>
              </span>
            </div>
            <p className="text-xs text-[#9E9A8E] max-w-md font-sans font-light leading-relaxed">
              Indulge in the essence of opulence with our exquisite fragrances, where Indian leadership heritage meets allure in every captivating note.
            </p>
          </div>

          {/* Right Newsletter Form */}
          <div className="lg:col-span-6 flex flex-col lg:items-end">
            <div className="w-full max-w-md space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8B52F] font-sans font-semibold block">
                Privileged Communiqué
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7F4EB]">
                An Invitation to the World of Neta.
              </h3>

              {subscribed ? (
                <div className="p-3 bg-[#13120E] border border-[#D8B52F]/40 rounded-xs flex items-center gap-2 text-xs text-[#D8B52F] font-sans">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the Neta Circle. You will receive private salon notices.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="grow bg-[#11100F] border border-[#D8B52F]/30 px-3.5 py-2.5 text-xs text-[#F7F4EB] placeholder-[#6B6658] rounded-xs focus:outline-hidden focus:border-[#D8B52F] font-sans"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs shrink-0"
                  >
                    Join the Circle
                  </button>
                </form>
              )}

              <span className="text-[10px] text-[#7A7568] block font-sans">
                Curated quarterly notices on limited extraits. Zero spam. Unsubscribe at discretion.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ===================== MAIN FOOTER LINKS ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Philosophy (2 cols on lg) */}
          <div className="col-span-2 space-y-3">
            <span className="font-serif tracking-widest text-base font-medium text-[#F7F4EB]">
              The House of Neta
            </span>
            <p className="text-xs text-[#8E8A7D] font-sans leading-relaxed max-w-sm font-light">
              Architectural luxury perfumes crafted for individuals who lead. Formulated at pure Extrait de Parfum strength with aged agarwood, Mysore sandalwood, and Kannauj botanical distillations.
            </p>
            <div className="text-[11px] text-[#A5A194] font-sans pt-1">
              <span>Atelier Flagship: Lutyens Delhi & South Mumbai</span>
            </div>
          </div>

          {/* Col 2: The Collection */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D8B52F] font-sans font-medium block">
              Creations
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#A8A495]">
              <li>
                <button onClick={() => onNavigate('signature-collection')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  Signature Extraits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('limited-editions')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  Limited Flacons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('signature-collection')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  Woody & Oud Accords
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('signature-collection')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  Saffron & Amber Reserves
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Heritage & Philosophy */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D8B52F] font-sans font-medium block">
              Heritage
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#A8A495]">
              <li>
                <button onClick={() => onNavigate('our-story')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('craftsmanship')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  Distillation Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('craftsmanship')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  Aged Assam Agarwood
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('craftsmanship')} className="hover:text-[#FFF5D0] transition-colors cursor-pointer">
                  The Sovereign Ritual
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Client Services & Policies */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D8B52F] font-sans font-medium block">
              Concierge
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#A8A495]">
              <li>
                <span className="hover:text-[#FFF5D0] cursor-pointer">Complimentary Courier</span>
              </li>
              <li>
                <span className="hover:text-[#FFF5D0] cursor-pointer">Discovery Flacon Guarantee</span>
              </li>
              <li>
                <span className="hover:text-[#FFF5D0] cursor-pointer">Private Gifting Atelier</span>
              </li>
              <li>
                <span className="hover:text-[#FFF5D0] cursor-pointer">concierge@netaperfume.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Social Links Row matching reference */}
        <div className="mt-12 pt-8 border-t border-[#D8B52F]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs text-[#8E8A7D] font-sans">
            <span className="hover:text-[#D8B52F] cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-[#D8B52F] cursor-pointer transition-colors">X (Twitter)</span>
            <span className="hover:text-[#D8B52F] cursor-pointer transition-colors">YouTube</span>
            <span className="hover:text-[#D8B52F] cursor-pointer transition-colors">LinkedIn</span>
          </div>

          <div className="text-[11px] text-[#7A7568] font-sans">
            <span>Official Flagship: NetaPerfume.in</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-[#1C1A16] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6A6557] font-sans">
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-[#A8A495] cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-[#A8A495] cursor-pointer">Terms & Conditions</span>
            <span>·</span>
            <span className="hover:text-[#A8A495] cursor-pointer">Shipping & Dispatch Protocol</span>
            <span>·</span>
            <span className="hover:text-[#A8A495] cursor-pointer">Returns & Quality Authenticity</span>
          </div>

          <div>
            © {new Date().getFullYear()} NETA PERFUME INDIA. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
};
