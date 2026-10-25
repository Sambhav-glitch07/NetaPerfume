import React, { useState } from 'react';
import { X, User, Package, MapPin, Heart, LogOut, Check, ShoppingBag } from 'lucide-react';
import { CustomerOrder, Fragrance, ShippingAddress, UserAccount } from '../types';
import { NetaEmblem } from './NetaEmblem';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onUpdateUser: (user: UserAccount) => void;
  wishlistFragrances: Fragrance[];
  onAddToCart: (fragrance: Fragrance) => void;
  onRemoveFromWishlist: (id: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  wishlistFragrances,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl bg-[#0B0A09] border border-[#D8B52F]/40 rounded-xs shadow-2xl max-h-[90vh] overflow-y-auto my-auto text-[#F6F4EE]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#D8B52F]/20 flex items-center justify-between bg-[#11100E]">
          <div className="flex items-center gap-3">
            <NetaEmblem size={24} variant="gold" />
            <div>
              <h2 className="font-serif text-lg font-semibold tracking-wide text-[#F7F4EB]">
                Patron Sanctuary · NETA Circle
              </h2>
              <span className="text-[10px] tracking-widest uppercase text-[#9E9A8E] font-sans block">
                Privileged Access · {user.email}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#DDD8CB] hover:text-[#D8B52F] hover:bg-[#1E1B15] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Body: Sidebar Navigation + Tab Contents */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          
          {/* Sidebar Tabs (3.5 cols) */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#D8B52F]/15 bg-[#0F0E0D] p-5 space-y-1">
            <div className="pb-4 mb-3 border-b border-[#D8B52F]/10">
              <span className="text-xs font-serif text-[#F7F4EB] block">{user.name}</span>
              <span className="text-[10px] text-[#D8B52F] uppercase tracking-wider font-sans">
                Founding Patron Tier
              </span>
            </div>

            {[
              { id: 'orders', label: 'Order History', icon: Package, count: user.orders.length },
              { id: 'wishlist', label: 'Private Wishlist', icon: Heart, count: wishlistFragrances.length },
              { id: 'profile', label: 'Patron Profile', icon: User },
              { id: 'addresses', label: 'Saved Residences', icon: MapPin },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3 rounded-xs text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D8B52F]/15 text-[#FFF5D0] border border-[#D8B52F]/40'
                      : 'text-[#8E8A7D] hover:text-[#DDD8CB] hover:bg-[#151412]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#D8B52F]" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#181613] text-[#D8B52F]">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-6 mt-6 border-t border-[#D8B52F]/10">
              <button
                onClick={onClose}
                className="w-full flex items-center gap-2.5 p-2 text-xs text-[#7A7568] hover:text-[#E25C5C] font-sans tracking-wider uppercase transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit Sanctuary</span>
              </button>
            </div>
          </div>

          {/* Main Content Area (8.5 cols) */}
          <div className="md:col-span-8 p-6 sm:p-8">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8B52F]/15">
                  <h3 className="font-serif text-lg font-medium text-[#F7F4EB]">
                    Your Sovereign Acquisitions
                  </h3>
                  <span className="text-xs text-[#8E8A7D] font-sans">
                    {user.orders.length} Historic Orders
                  </span>
                </div>

                {user.orders.length === 0 ? (
                  <div className="text-center py-12 text-xs text-[#8E8A7D] space-y-2">
                    <Package className="w-8 h-8 text-[#D8B52F]/40 mx-auto" />
                    <p>No orders recorded in your patron ledger yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 bg-[#11100F] border border-[#D8B52F]/20 rounded-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#D8B52F]/10 text-xs font-sans">
                          <div>
                            <span className="text-[#888375]">Order ID: </span>
                            <span className="text-[#D8B52F] font-mono font-semibold">{order.id}</span>
                            <span className="text-[#555] mx-2">·</span>
                            <span className="text-[#A5A194]">{order.date}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#1A1813] text-[#D8B52F] border border-[#D8B52F]/30 text-[10px] tracking-wider uppercase font-semibold">
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-1 text-xs">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="flex justify-between text-[#DDD8CB] font-sans">
                              <span>
                                {i.quantity}x {i.fragranceName} ({i.size})
                              </span>
                              <span className="text-[#D8B52F] tabular-nums font-mono">
                                ₹{(i.price * i.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tracking info */}
                        <div className="pt-2 border-t border-[#D8B52F]/10 flex flex-wrap items-center justify-between text-[11px] text-[#8E8A7D] font-sans">
                          <span>Tracking: <code className="text-[#E8D8A6]">{order.trackingNumber}</code></span>
                          <span className="text-xs text-[#F7F4EB] font-semibold">
                            Total Settled: <span className="text-[#D8B52F]">₹{order.total.toLocaleString('en-IN')}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8B52F]/15">
                  <h3 className="font-serif text-lg font-medium text-[#F7F4EB]">
                    Reserved Formulations
                  </h3>
                  <span className="text-xs text-[#8E8A7D] font-sans">
                    {wishlistFragrances.length} Items Saved
                  </span>
                </div>

                {wishlistFragrances.length === 0 ? (
                  <div className="text-center py-12 text-xs text-[#8E8A7D] space-y-2">
                    <Heart className="w-8 h-8 text-[#D8B52F]/40 mx-auto" />
                    <p>Your private reserve list is currently empty.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {wishlistFragrances.map((fragrance) => (
                      <div
                        key={fragrance.id}
                        className="p-3.5 bg-[#11100F] border border-[#D8B52F]/20 rounded-xs flex items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-[10px] text-[#D8B52F] tracking-widest uppercase font-sans">
                            {fragrance.number} · {fragrance.family}
                          </span>
                          <h4 className="font-serif text-sm font-medium text-[#F7F4EB]">
                            {fragrance.name}
                          </h4>
                          <span className="font-serif text-xs text-[#D8B52F] tabular-nums">
                            ₹{fragrance.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onAddToCart(fragrance)}
                            className="px-3 py-1.5 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] text-xs font-sans uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                          <button
                            onClick={() => onRemoveFromWishlist(fragrance.id)}
                            className="p-1.5 text-[#888375] hover:text-[#E25C5C] transition-colors cursor-pointer"
                            aria-label="Remove from wishlist"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8B52F]/15">
                  <h3 className="font-serif text-lg font-medium text-[#F7F4EB]">
                    Patron Credentials
                  </h3>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="text-xs uppercase tracking-wider text-[#D8B52F] hover:underline cursor-pointer"
                  >
                    {isEditingProfile ? 'Cancel' : 'Edit Credentials'}
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8E8A7D] block mb-1 font-sans">
                      Salutation & Full Name
                    </label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-[#121110] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8E8A7D] block mb-1 font-sans">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      disabled={!isEditingProfile}
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-[#121110] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8E8A7D] block mb-1 font-sans">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditingProfile}
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-[#121110] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs disabled:opacity-60"
                    />
                  </div>

                  {isEditingProfile && (
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#D8B52F] text-[#0A0908] text-xs uppercase tracking-wider font-semibold rounded-xs cursor-pointer"
                    >
                      Save Changes
                    </button>
                  )}
                </form>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8B52F]/15">
                  <h3 className="font-serif text-lg font-medium text-[#F7F4EB]">
                    Saved Delivery Residences
                  </h3>
                </div>

                <div className="space-y-3">
                  {user.savedAddresses.map((addr, idx) => (
                    <div key={idx} className="p-4 bg-[#11100F] border border-[#D8B52F]/20 rounded-xs space-y-1 text-xs font-sans">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#F7F4EB]">{addr.fullName}</span>
                        <span className="text-[10px] text-[#D8B52F] uppercase border border-[#D8B52F]/30 px-1.5 py-0.5">
                          Primary Estate
                        </span>
                      </div>
                      <p className="text-[#8E8A7D]">{addr.addressLine}</p>
                      <p className="text-[#8E8A7D]">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-[#8E8A7D]">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
