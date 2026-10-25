import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, QrCode, Building, Banknote, Truck, ArrowLeft, ArrowRight, Printer } from 'lucide-react';
import { CartItem, CustomerOrder, ShippingAddress } from '../types';
import { NetaEmblem } from './NetaEmblem';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderSuccess: (order: CustomerOrder) => void;
  userDefaultAddress?: ShippingAddress;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderSuccess,
  userDefaultAddress,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'white_glove'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: userDefaultAddress?.fullName || 'Vibha Gupta',
    email: userDefaultAddress?.email || 'vibhagupta13572@gmail.com',
    phone: userDefaultAddress?.phone || '+91 98765 43210',
    addressLine: userDefaultAddress?.addressLine || 'Suite 402, Sovereign Residency, Golf Course Road',
    city: userDefaultAddress?.city || 'Gurugram',
    state: userDefaultAddress?.state || 'Haryana',
    pincode: userDefaultAddress?.pincode || '122002',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  if (!isOpen) return null;

  const validateShipping = () => {
    const errors: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!address.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!address.email.trim() || !address.email.includes('@')) errors.email = 'Valid email is required';
    if (!address.phone.trim()) errors.phone = 'Valid 10-digit mobile number is required';
    if (!address.addressLine.trim()) errors.addressLine = 'Delivery address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.state.trim()) errors.state = 'State is required';
    if (!address.pincode.trim() || address.pincode.length < 6) errors.pincode = 'Valid 6-digit Indian PIN code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newOrderId = `NETA-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `DLV-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const order: CustomerOrder = {
        id: newOrderId,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        items: items.map((i) => ({
          id: i.fragrance.id,
          fragranceName: i.fragrance.name,
          number: i.fragrance.number,
          size: i.size,
          quantity: i.quantity,
          price: i.unitPrice,
        })),
        subtotal,
        discount,
        shipping: shippingMethod === 'white_glove' ? 750 : shipping,
        total: total + (shippingMethod === 'white_glove' ? 750 : 0),
        status: 'Processing',
        trackingNumber,
        shippingAddress: address,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'Unified Payments Interface (UPI / QR)'
            : paymentMethod === 'card'
            ? 'Luxury Credit / Debit Card'
            : paymentMethod === 'netbanking'
            ? 'Premium NetBanking'
            : 'Sovereign Cash on Delivery',
      };

      setConfirmedOrder(order);
      setIsProcessing(false);
      setStep('confirmation');
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-[#0B0A09] border border-[#D8B52F]/40 rounded-xs shadow-2xl max-h-[92vh] overflow-y-auto my-auto text-[#F6F4EE]">
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#D8B52F]/20 flex items-center justify-between bg-[#11100E]">
          <div className="flex items-center gap-3">
            <NetaEmblem size={24} variant="gold" />
            <div>
              <h2 className="font-serif text-lg font-semibold tracking-wide text-[#F7F4EB]">
                NETA · Sovereign Checkout
              </h2>
              <span className="text-[10px] tracking-widest uppercase text-[#9E9A8E] font-sans block">
                {step === 'shipping' ? 'Step 1: Delivery Protocol' : step === 'payment' ? 'Step 2: Payment Settlement' : 'Order Confirmed'}
              </span>
            </div>
          </div>

          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#DDD8CB] hover:text-[#D8B52F] hover:bg-[#1E1B15] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* ===================== STEP 1: SHIPPING & ADDRESS ===================== */}
        {step === 'shipping' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6">
            
            {/* Contact Details */}
            <div>
              <h3 className="font-serif text-sm tracking-wider uppercase text-[#D8B52F] mb-3">
                Recipient Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A8A495] block mb-1 font-sans">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-[#141210] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs focus:outline-hidden focus:border-[#D8B52F]"
                    placeholder="e.g. Maharani Vibha Gupta"
                  />
                  {formErrors.fullName && <p className="text-[10px] text-[#E25C5C] mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A8A495] block mb-1 font-sans">
                    Email for Dispatch Notices *
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-[#141210] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs focus:outline-hidden focus:border-[#D8B52F]"
                    placeholder="patron@domain.com"
                  />
                  {formErrors.email && <p className="text-[10px] text-[#E25C5C] mt-1">{formErrors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#A8A495] block mb-1 font-sans">
                    Mobile Number (for Courier Delivery Verification) *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-[#141210] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs focus:outline-hidden focus:border-[#D8B52F]"
                    placeholder="+91 98765 43210"
                  />
                  {formErrors.phone && <p className="text-[10px] text-[#E25C5C] mt-1">{formErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="font-serif text-sm tracking-wider uppercase text-[#D8B52F] mb-3">
                Destination Address (India)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A8A495] block mb-1 font-sans">
                    Estate / Residence / Flat / Street Address *
                  </label>
                  <input
                    type="text"
                    value={address.addressLine}
                    onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                    className="w-full bg-[#141210] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs focus:outline-hidden focus:border-[#D8B52F]"
                    placeholder="Floor, Villa, Building Name, Street"
                  />
                  {formErrors.addressLine && <p className="text-[10px] text-[#E25C5C] mt-1">{formErrors.addressLine}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A8A495] block mb-1 font-sans">
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-[#141210] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs focus:outline-hidden focus:border-[#D8B52F]"
                      placeholder="e.g. New Delhi"
                    />
                    {formErrors.city && <p className="text-[10px] text-[#E25C5C] mt-1">{formErrors.city}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A8A495] block mb-1 font-sans">
                      State *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full bg-[#141210] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs focus:outline-hidden focus:border-[#D8B52F]"
                      placeholder="e.g. Delhi NCR"
                    />
                    {formErrors.state && <p className="text-[10px] text-[#E25C5C] mt-1">{formErrors.state}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A8A495] block mb-1 font-sans">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      maxLength={6}
                      className="w-full bg-[#141210] border border-[#D8B52F]/30 p-2.5 text-xs text-[#F7F4EB] rounded-xs focus:outline-hidden focus:border-[#D8B52F]"
                      placeholder="110001"
                    />
                    {formErrors.pincode && <p className="text-[10px] text-[#E25C5C] mt-1">{formErrors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Courier Tiers */}
            <div>
              <h3 className="font-serif text-sm tracking-wider uppercase text-[#D8B52F] mb-3">
                Courier Service Level
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 border rounded-xs cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#D8B52F] bg-[#D8B52F]/10'
                      : 'border-[#D8B52F]/20 bg-[#121110] hover:border-[#D8B52F]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm text-[#F7F4EB] font-medium">Complimentary Air Express</span>
                    <span className="text-xs text-[#D8B52F] font-semibold">FREE</span>
                  </div>
                  <p className="text-[11px] text-[#8E8A7D] mt-1 font-sans">
                    Insured temperature-controlled 2–3 business day delivery.
                  </p>
                </div>

                <div
                  onClick={() => setShippingMethod('white_glove')}
                  className={`p-4 border rounded-xs cursor-pointer transition-all ${
                    shippingMethod === 'white_glove'
                      ? 'border-[#D8B52F] bg-[#D8B52F]/10'
                      : 'border-[#D8B52F]/20 bg-[#121110] hover:border-[#D8B52F]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm text-[#F7F4EB] font-medium">White-Glove VIP Courier</span>
                    <span className="text-xs text-[#D8B52F] font-semibold">₹750</span>
                  </div>
                  <p className="text-[11px] text-[#8E8A7D] mt-1 font-sans">
                    Hand-delivered in lacquered presentation box with engraved seal.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-[#D8B52F]/15 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-wider text-[#A8A495] hover:text-[#FFF5D0] cursor-pointer"
              >
                Return to Bag
              </button>

              <button
                type="submit"
                className="flex items-center gap-3 py-3 px-6 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs"
              >
                <span>Continue to Settlement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ===================== STEP 2: PAYMENT SETTLEMENT ===================== */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Transparent Development Notice per instructions */}
            <div className="p-3.5 bg-[#17140B] border border-[#D8B52F]/30 rounded-xs text-xs font-sans text-[#E5D5A7] space-y-1">
              <span className="font-semibold text-[#D8B52F] uppercase tracking-wider block">
                Development Mode / Gateway Architecture Notice
              </span>
              <p className="text-[11px] text-[#B8B4A5] leading-relaxed">
                In production, transactions securely hand off to Razorpay/Cashfree with server-side signature verification. In this development preview, placing an order executes a verified test simulation without actual card deduction.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h3 className="font-serif text-sm tracking-wider uppercase text-[#D8B52F] mb-3">
                Select Sovereign Payment Gateway
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'card', label: 'Credit / Debit', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Building },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3.5 text-center border rounded-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? 'border-[#D8B52F] bg-[#D8B52F]/15 text-[#FFF5D0]'
                          : 'border-[#D8B52F]/20 bg-[#121110] text-[#8E8A7D] hover:border-[#D8B52F]/40'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#D8B52F]" />
                      <span className="text-[11px] font-sans font-medium uppercase tracking-wider">
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Method Specific Display */}
            <div className="p-4 bg-[#121110] border border-[#D8B52F]/20 rounded-xs">
              {paymentMethod === 'upi' && (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-32 h-32 bg-white p-2 rounded-xs flex flex-col items-center justify-center shrink-0 border border-[#D8B52F]">
                    {/* Simulated Clean QR Code Graphic */}
                    <div className="w-full h-full bg-[#0A0908] rounded-xs flex flex-col items-center justify-center p-2 text-center">
                      <NetaEmblem size={24} variant="gold" />
                      <span className="text-[8px] font-mono text-[#D8B52F] mt-1">UPI PAY</span>
                      <span className="text-[7px] text-[#A8A495] mt-0.5">neta@razorpay</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="font-serif text-sm font-medium text-[#F7F4EB]">
                      Instant UPI Payment (GPay, PhonePe, Paytm, BHIM)
                    </h4>
                    <p className="text-xs text-[#8E8A7D] font-sans">
                      Scan with any UPI app or enter your VPA. Instant payment verification and automated dispatch trigger.
                    </p>
                    <span className="inline-block text-[11px] text-[#D8B52F] font-mono mt-1">
                      Merchant VPA: netaperfume@icici
                    </span>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase text-[#888375] block mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        defaultValue="4242 •••• •••• 8899"
                        className="w-full bg-[#181614] border border-[#D8B52F]/30 p-2 text-xs rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#888375] block mb-1">Name on Card</label>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        defaultValue={address.fullName}
                        className="w-full bg-[#181614] border border-[#D8B52F]/30 p-2 text-xs rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#888375] block mb-1">Valid Thru</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full bg-[#181614] border border-[#D8B52F]/30 p-2 text-xs rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#888375] block mb-1">Security CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="842"
                        className="w-full bg-[#181614] border border-[#D8B52F]/30 p-2 text-xs rounded-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <span className="text-xs text-[#DDD8CB] block">Select Preferred Institution</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
                    {['HDFC Bank Priority', 'ICICI Wealth', 'State Bank of India', 'Axis Burgundy'].map((b) => (
                      <div key={b} className="p-2 bg-[#171513] border border-[#D8B52F]/20 rounded-xs text-center text-[#E8D8A6]">
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="text-xs text-[#DDD8CB] space-y-1">
                  <span className="font-semibold text-[#D8B52F]">Cash on Delivery Protocol</span>
                  <p className="text-[11px] text-[#8E8A7D]">
                    Our armed courier will verify OTP upon arrival. Please keep the exact amount ready in cash or demand draft.
                  </p>
                </div>
              )}
            </div>

            {/* Order Review Line */}
            <div className="p-4 bg-[#141210] border border-[#D8B52F]/20 rounded-xs space-y-2 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-[#8E8A7D]">Items Total ({items.length} flacons)</span>
                <span className="tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#69C775]">
                  <span>Privilege Courtesy</span>
                  <span className="tabular-nums">-₹{Math.round(subtotal * (discount / 100)).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8E8A7D]">Courier ({shippingMethod === 'white_glove' ? 'White Glove' : 'Air Express'})</span>
                <span>{shippingMethod === 'white_glove' ? '₹750' : 'Complimentary'}</span>
              </div>
              <div className="pt-2 border-t border-[#D8B52F]/20 flex justify-between font-semibold text-sm">
                <span className="text-[#F7F4EB]">Total Payable</span>
                <span className="font-serif text-lg text-[#D8B52F] tabular-nums">
                  ₹{(total + (shippingMethod === 'white_glove' ? 750 : 0)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#A8A495] hover:text-[#FFF5D0] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Address
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="flex items-center gap-3 py-3.5 px-8 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer rounded-xs shadow-xl disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Settlement...</span>
                ) : (
                  <>
                    <span>Confirm Sovereign Order</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ===================== STEP 3: ORDER CONFIRMED RECEIPT ===================== */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="p-6 sm:p-10 space-y-8 text-center">
            
            <div className="w-16 h-16 rounded-full border-2 border-[#D8B52F] flex items-center justify-center mx-auto bg-[#171510] text-[#D8B52F]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8B52F] font-sans font-medium block">
                Acquisition Confirmed
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F4EB] font-medium mt-1">
                Your Neta Legacy Has Been Secured
              </h2>
              <p className="text-xs text-[#8E8A7D] max-w-md mx-auto mt-2 font-sans leading-relaxed">
                Thank you, {confirmedOrder.shippingAddress.fullName}. A formal confirmation certificate has been dispatched to {confirmedOrder.shippingAddress.email}.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="max-w-md mx-auto p-5 bg-[#121110] border border-[#D8B52F]/30 rounded-xs text-left text-xs font-sans space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#D8B52F]/15">
                <span className="text-[#888375]">Order Identifier:</span>
                <span className="font-mono text-[#D8B52F] font-semibold">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#D8B52F]/15">
                <span className="text-[#888375]">Tracking Protocol:</span>
                <span className="font-mono text-[#E8D8A6]">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#D8B52F]/15">
                <span className="text-[#888375]">Settlement Method:</span>
                <span className="text-[#F7F4EB]">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#D8B52F]/15">
                <span className="text-[#888375]">Destination:</span>
                <span className="text-[#F7F4EB] text-right truncate max-w-[200px]">
                  {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-sm pt-1">
                <span className="text-[#F7F4EB]">Total Settled:</span>
                <span className="font-serif text-[#D8B52F] text-base tabular-nums">
                  ₹{confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171512] hover:bg-[#221F1A] border border-[#D8B52F]/30 text-[#DDD8CB] text-xs uppercase tracking-wider font-sans cursor-pointer rounded-xs"
              >
                <Printer className="w-3.5 h-3.5 text-[#D8B52F]" />
                <span>Print Formal Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D8B52F] hover:bg-[#E5C24D] text-[#0A0908] text-xs uppercase tracking-wider font-semibold font-sans cursor-pointer rounded-xs"
              >
                <span>Return to House of Neta</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
