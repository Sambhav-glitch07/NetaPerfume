import React, { useState, useEffect } from 'react';
import { FRAGRANCES } from './data/fragrances';
import { CartItem, CustomerOrder, Fragrance, UserAccount } from './types';
import { FramedCanvasContainer } from './components/FramedCanvasContainer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SignatureCollection } from './components/SignatureCollection';
import { BrandStorySection } from './components/BrandStorySection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { FeaturedProductExperience } from './components/FeaturedProductExperience';
import { LimitedEditions } from './components/LimitedEditions';
import { NewsletterAndFooter } from './components/NewsletterAndFooter';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  // Navigation active section tracking
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Selected fragrance for deep modal view
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Discount code management
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Cart State (Persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('neta_perfume_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Initial sample cart with 1 item for immediate luxury discovery
    return [
      {
        fragrance: FRAGRANCES[0],
        size: '100 ml Flacon (Signature)',
        quantity: 1,
        unitPrice: FRAGRANCES[0].price,
      },
    ];
  });

  // 2. Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('neta_perfume_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return ['neta-02-imperial-oud', 'neta-00-royal-durbar'];
  });

  // 3. User Account State (Persisted)
  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('neta_perfume_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      name: 'Vibha Gupta',
      email: 'vibhagupta13572@gmail.com',
      phone: '+91 98765 43210',
      savedAddresses: [
        {
          fullName: 'Vibha Gupta',
          email: 'vibhagupta13572@gmail.com',
          phone: '+91 98765 43210',
          addressLine: 'Suite 402, Sovereign Residency, Golf Course Road',
          city: 'Gurugram',
          state: 'Haryana',
          pincode: '122002',
        },
      ],
      orders: [
        {
          id: 'NETA-749102',
          date: '18 Oct 2026',
          items: [
            {
              id: 'neta-01-statesman',
              fragranceName: 'The Statesman',
              number: 'Neta No. 01',
              size: '100 ml',
              quantity: 1,
              price: 9800,
            },
          ],
          subtotal: 9800,
          discount: 980,
          shipping: 0,
          total: 8820,
          status: 'Dispatched',
          trackingNumber: 'DLV-IN-8849201',
          shippingAddress: {
            fullName: 'Vibha Gupta',
            email: 'vibhagupta13572@gmail.com',
            phone: '+91 98765 43210',
            addressLine: 'Suite 402, Sovereign Residency, Golf Course Road',
            city: 'Gurugram',
            state: 'Haryana',
            pincode: '122002',
          },
          paymentMethod: 'Unified Payments Interface (UPI / QR)',
        },
      ],
    };
  });

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('neta_perfume_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('neta_perfume_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('neta_perfume_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Handlers
  const handleAddToCart = (fragrance: Fragrance, quantity: number = 1, size: string = '100 ml') => {
    const multiplier = size.includes('50 ml') ? 0.65 : 1.0;
    const unitPrice = Math.round(fragrance.price * multiplier);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.fragrance.id === fragrance.id && i.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { fragrance, size, quantity, unitPrice }];
      }
    });

    showToast(`Added ${fragrance.name} (${size}) to your Bag`);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Flacon removed from bag');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (fragranceId: string) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(fragranceId);
      const fragrance = FRAGRANCES.find((f) => f.id === fragranceId);
      if (isSaved) {
        showToast(`Removed ${fragrance?.name || 'creation'} from wishlist`);
        return prev.filter((id) => id !== fragranceId);
      } else {
        showToast(`Saved ${fragrance?.name || 'creation'} to private wishlist`);
        return [...prev, fragranceId];
      }
    });
  };

  // Immediate Checkout / Buy Now Handler
  const handleBuyNow = (fragrance: Fragrance, quantity: number = 1, size: string = '100 ml') => {
    handleAddToCart(fragrance, quantity, size);
    if (selectedFragrance) setSelectedFragrance(null);
    setIsCheckoutOpen(true);
  };

  // Promo Code Handler
  const handleApplyDiscount = (code: string) => {
    if (code.toUpperCase() === 'LEGACY10') {
      setDiscountCode('LEGACY10');
      setAppliedDiscount(10);
      showToast('Privilege Courtesy applied: 10% discount');
      return true;
    }
    return false;
  };

  // Order Placement Success Handler
  const handleOrderSuccess = (order: CustomerOrder) => {
    setUser((prev) => ({
      ...prev,
      orders: [order, ...prev.orders],
    }));
    setCart([]);
    showToast(`Order ${order.id} confirmed! Preparing dispatch.`);
  };

  // Smooth Navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Derived Values
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartDiscountAmount = Math.round(cartSubtotal * (appliedDiscount / 100));
  const cartShippingCost = cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 450;
  const cartFinalTotal = Math.max(0, cartSubtotal - cartDiscountAmount + cartShippingCost);

  const wishlistFragrances = FRAGRANCES.filter((f) => wishlist.includes(f.id));
  const featuredFragrance = FRAGRANCES[0]; // The Statesman

  return (
    <FramedCanvasContainer>
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#161410] border border-[#D8B52F]/70 text-[#F7F4EB] text-xs font-sans tracking-wide py-2.5 px-6 rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D8B52F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header with Top Bar Contract */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsAccountOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <div id="hero">
        <HeroSection
          featuredFragrance={featuredFragrance}
          onExploreClick={() => handleNavigate('signature-collection')}
          onPhilosophyClick={() => handleNavigate('our-story')}
          onProductClick={(fragrance) => setSelectedFragrance(fragrance)}
        />
      </div>

      {/* Signature Collection (4-Column Grid) */}
      <SignatureCollection
        fragrances={FRAGRANCES.slice(0, 4)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(fragrance) => handleAddToCart(fragrance, 1, '100 ml')}
        onSelectFragrance={(fragrance) => setSelectedFragrance(fragrance)}
      />

      {/* Brand Story Section */}
      <BrandStorySection
        fragrance={FRAGRANCES[1]} // Imperial Oud spotlight
        onExploreHeritage={() => handleNavigate('craftsmanship')}
        onSelectFragrance={(fragrance) => setSelectedFragrance(fragrance)}
      />

      {/* Craftsmanship Section (Symmetrical with center bottle & dotted connectors) */}
      <CraftsmanshipSection
        fragrance={FRAGRANCES[2]} // Midnight Reserve
        onExploreMore={() => handleNavigate('signature-collection')}
        onSelectFragrance={(fragrance) => setSelectedFragrance(fragrance)}
      />

      {/* Featured Masterwork Experience (Detailed Purchase Module) */}
      <FeaturedProductExperience
        fragrance={featuredFragrance}
        isWishlisted={wishlist.includes(featuredFragrance.id)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Limited Editions (Prestige Series Asymmetric Layout) */}
      <LimitedEditions
        fragrances={FRAGRANCES}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(fragrance) => handleAddToCart(fragrance, 1, '100 ml')}
        onSelectFragrance={(fragrance) => setSelectedFragrance(fragrance)}
      />

      {/* Newsletter & Footer */}
      <NewsletterAndFooter
        onNavigate={handleNavigate}
      />

      {/* ===================== MODALS & DRAWERS ===================== */}

      {/* Product Detail Modal */}
      <ProductDetailModal
        fragrance={selectedFragrance}
        isOpen={!!selectedFragrance}
        onClose={() => setSelectedFragrance(null)}
        isWishlisted={selectedFragrance ? wishlist.includes(selectedFragrance.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        relatedFragrances={FRAGRANCES.filter((f) => f.id !== selectedFragrance?.id)}
        onSelectRelated={(item) => setSelectedFragrance(item)}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreProducts={() => handleNavigate('signature-collection')}
        discountCode={discountCode}
        appliedDiscount={appliedDiscount}
        onApplyDiscountCode={handleApplyDiscount}
      />

      {/* Real Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={appliedDiscount}
        shipping={cartShippingCost}
        total={cartFinalTotal}
        onOrderSuccess={handleOrderSuccess}
        userDefaultAddress={user.savedAddresses[0]}
      />

      {/* Discerning Patron Account & Wishlist Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={user}
        onUpdateUser={setUser}
        wishlistFragrances={wishlistFragrances}
        onAddToCart={(fragrance) => handleAddToCart(fragrance, 1, '100 ml')}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        fragrances={FRAGRANCES}
        onSelectFragrance={(fragrance) => setSelectedFragrance(fragrance)}
      />

    </FramedCanvasContainer>
  );
}
