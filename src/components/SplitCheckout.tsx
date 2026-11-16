import React, { useState, useEffect } from 'react';
import {
  Ruler,
  Lock,
  Upload,
  CheckCircle2,
  ArrowRight,
  Truck,
  Footprints,
  Phone,
  Mail,
  MapPin,
  User,
  Leaf,
  Sparkles,
  ShieldCheck,
  Bell,
  Check
} from 'lucide-react';
import { ShoeProduct, OrderTrackRecord } from '../types';
import { PRODUCTS, BATCH_INFO } from '../data/footwearData';
import { calculateEuSizeFromCm, getCmFromEuSize } from '../utils/sizing';

interface SplitCheckoutProps {
  selectedProduct: ShoeProduct;
  initialEuSize?: number;
  onOpenSizingModal: () => void;
  onOrderCompleted: (newOrder: OrderTrackRecord) => void;
  onBackToPreorder: () => void;
}

export const SplitCheckout: React.FC<SplitCheckoutProps> = ({
  selectedProduct,
  initialEuSize = 40,
  onOpenSizingModal,
  onOrderCompleted,
  onBackToPreorder
}) => {
  const [product, setProduct] = useState<ShoeProduct>(selectedProduct || PRODUCTS[0]);
  const [euSize, setEuSize] = useState<number>(initialEuSize);
  const [footCm, setFootCm] = useState<number>(getCmFromEuSize(initialEuSize));
  const [wideFeet, setWideFeet] = useState<boolean>(false);

  // Co-Creation / Personalization options (Behavioral Strategy)
  const [customInitials, setCustomInitials] = useState<string>('');
  const [denimShade, setDenimShade] = useState<string>('Raw Deep Indigo (Standard)');
  const [smsUpdatesEnabled, setSmsUpdatesEnabled] = useState<boolean>(true);

  // Form Fields
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [addressLine, setAddressLine] = useState<string>('');
  const [city, setCity] = useState<string>('Naga City');
  const [province, setProvince] = useState<string>('Camarines Sur');
  const [postalCode, setPostalCode] = useState<string>('4400');
  const [isNagaDelivery, setIsNagaDelivery] = useState<boolean>(true);

  // Payment Options & Deposit Plan (Behavioral Strategy: Low friction 50% split)
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'split_deposit'>('split_deposit');
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'maya' | 'bank'>('gcash');
  const [proofFileUploaded, setProofFileUploaded] = useState<boolean>(false);

  // Archive Pass / Donation Discount Code State
  const [discountCodeInput, setDiscountCodeInput] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);

  // 15-Minute Slot Reservation Lock
  const [lockSeconds, setLockSeconds] = useState<number>(15 * 60);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderTrackRecord | null>(null);

  useEffect(() => {
    setProduct(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLockSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLockTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCmChange = (cm: number) => {
    setFootCm(cm);
    const res = calculateEuSizeFromCm(cm);
    setEuSize(res.euSize);
  };

  const handleEuSizeChange = (newSize: number) => {
    setEuSize(newSize);
    setFootCm(getCmFromEuSize(newSize));
  };

  const handleApplyDiscount = () => {
    setDiscountError(null);
    const cleanCode = discountCodeInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode.startsWith('ARCHIVE') || cleanCode === 'PAMITISAN200' || cleanCode === 'DENIMPASS') {
      setAppliedDiscount(200);
      setAppliedCode(cleanCode);
    } else if (cleanCode === 'ARCHIVE300' || cleanCode === 'DONORVIP') {
      setAppliedDiscount(300);
      setAppliedCode(cleanCode);
    } else {
      setDiscountError('Invalid code. Ensure you enter your Archive Access Pass voucher code.');
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(0);
    setAppliedCode(null);
    setDiscountCodeInput('');
  };

  const shippingFee = isNagaDelivery ? 0 : 150;
  const discountedProductPrice = Math.max(0, product.price - appliedDiscount);
  const fullAmount = discountedProductPrice + shippingFee;
  const depositAmount = Math.round(discountedProductPrice / 2) + shippingFee;
  const dueUponDispatch = fullAmount - depositAmount;
  const amountToPayNow = paymentPlan === 'split_deposit' ? depositAmount : fullAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !mobilePhone || !addressLine) {
      alert('Please fill out all required delivery fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderId = `PAM-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRecord: OrderTrackRecord = {
        orderId: generatedOrderId,
        phone: mobilePhone,
        customerName: fullName,
        email: email,
        shoeName: product.name,
        shoeCode: product.code,
        euSize: euSize,
        footCm: footCm,
        batch: BATCH_INFO.batchNumber,
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        estimatedDelivery: BATCH_INFO.estimatedDeliveryDate,
        courier: isNagaDelivery ? 'Local Naga City Courier' : 'LBC Express Nationwide',
        trackingNumber: `LBC-PH-${Math.floor(100000000 + Math.random() * 900000000)}`,
        deliveryAddress: `${addressLine}, ${city}, ${province} ${postalCode}`,
        paymentMethod: `${paymentMethod.toUpperCase()} (${paymentPlan === 'split_deposit' ? '50% Atelier Deposit' : 'Full Payment'})`,
        paymentPlan: paymentPlan,
        paymentStatus: 'Verified',
        totalPaid: amountToPayNow,
        remainingBalance: paymentPlan === 'split_deposit' ? dueUponDispatch : 0,
        customInitials: customInitials.trim().toUpperCase() || undefined,
        denimShade: denimShade,
        smsUpdatesEnabled: smsUpdatesEnabled,
        currentStage: 1,
        livingArchiveId: product.code,
        stages: [
          {
            stage: 1,
            title: '1. Denim Sourced & Cut',
            description: `Sanitized 14oz thrifted denim allocated for ${fullName}'s pair (EU ${euSize}, ${footCm}cm). ${customInitials ? `Heel stamp reserved: "${customInitials.toUpperCase()}". ` : ''}Precision patterning in progress.`,
            date: 'Today - Active Bench',
            isCompleted: true,
            isCurrent: true,
            artisanNote: 'Batch reservation locked. Upper pattern mapped to custom foot measurements.'
          },
          {
            stage: 2,
            title: '2. Upper Hand-Stitched by Artisan',
            description: 'Handwoven Hinabi panels and denim uppers being hand-stitched by Master Cobbler.',
            isCompleted: false,
            isCurrent: false
          },
          {
            stage: 3,
            title: '3. Sole Lasting & Quality Test',
            description: 'Mounted onto wooden shoe last with vulcanized eco-rubber outsole.',
            isCompleted: false,
            isCurrent: false
          },
          {
            stage: 4,
            title: '4. Archive Boxed & Dispatched',
            description: 'Individual Living Archive QR tag stamped and boxed in unbleached cotton dustbag.',
            isCompleted: false,
            isCurrent: false
          }
        ]
      };
      setConfirmedOrder(newRecord);
      onOrderCompleted(newRecord);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#FAF8F5] text-stone-900">
      {/* Reservation Confirmation Modal */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 border border-[#E7E2D8] shadow-2xl space-y-6 text-center animate-in zoom-in-95 text-stone-900">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-blue-900 uppercase font-bold tracking-widest block">
                Pre-Order Slot Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
                MARAMING SALAMAT, {confirmedOrder.customerName.toUpperCase()}!
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Your bespoke pair of <strong className="text-stone-900">{confirmedOrder.shoeName}</strong> in <strong className="text-blue-900">EU {confirmedOrder.euSize}</strong> has been logged into the Naga atelier bench queue.
              </p>
            </div>

            {/* Order Ticket */}
            <div className="bg-[#FAF8F5] text-stone-900 p-5 rounded-xl text-left font-mono text-xs space-y-2.5 border border-[#E7E2D8]">
              <div className="flex justify-between border-b border-[#E7E2D8] pb-2">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Tracking ID:</span>
                <strong className="text-blue-900 text-sm font-bold">{confirmedOrder.orderId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Payment Plan:</span>
                <span className="text-stone-800 font-semibold">
                  {confirmedOrder.paymentPlan === 'split_deposit' ? '50% Atelier Deposit Paid' : 'Fully Paid'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Amount Paid Now:</span>
                <strong className="text-stone-900">₱{confirmedOrder.totalPaid.toLocaleString()}</strong>
              </div>
              {confirmedOrder.remainingBalance > 0 && (
                <div className="flex justify-between text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                  <span className="uppercase tracking-wider text-[10px] font-bold">Balance Due on Dispatch:</span>
                  <strong className="font-bold">₱{confirmedOrder.remainingBalance.toLocaleString()}</strong>
                </div>
              )}
              {confirmedOrder.customInitials && (
                <div className="flex justify-between">
                  <span className="text-stone-500 uppercase tracking-wider text-[10px]">Heel Embossing:</span>
                  <span className="text-blue-900 font-bold">"{confirmedOrder.customInitials}"</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Est. Dispatch:</span>
                <span className="text-stone-800">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Waste Diverted:</span>
                <span className="text-emerald-700 font-semibold">~{product.wasteDivertedGrams}g Denim Saved</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  window.location.hash = '#track';
                }}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xl shadow-xs border border-blue-950 transition-all cursor-pointer font-mono"
              >
                Track Progress in Live Artisan Portal
              </button>
              <button
                onClick={onBackToPreorder}
                className="w-full py-3 bg-[#FAF8F5] hover:bg-[#F3EFEA] text-stone-800 border border-[#D3CBBE] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all cursor-pointer"
              >
                Back to Footwear Showcase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E2D8]">
        <div>
          <button
            onClick={onBackToPreorder}
            className="text-xs uppercase tracking-wider text-stone-500 hover:text-blue-900 flex items-center gap-1 mb-2 cursor-pointer transition-colors"
          >
            ← Back to Selection
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
            SECURE BATCH 05 RESERVATION
          </h1>
        </div>

        {/* 15-Minute Slot Hold Timer */}
        <div className="inline-flex items-center gap-2 bg-white border border-[#E7E2D8] text-stone-800 px-3.5 py-2 rounded-xl text-xs font-mono shadow-xs">
          <Lock className="w-3.5 h-3.5 text-amber-700" />
          <span className="uppercase tracking-wider text-[10px] text-stone-500 font-semibold">Slot Held:</span>
          <strong className="font-bold text-sm text-blue-900">{formatLockTime(lockSeconds)}</strong>
        </div>
      </div>

      {/* Checkout Columns */}
      <div className="checkout-layout grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form */}
        <div className="checkout-form-col lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E2D8] space-y-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-900 font-mono">
              1. Sizing, Customization & Delivery
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
              STEP 1 / 2
            </span>
          </div>

          <form id="preorder-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-semibold">
                  <User className="w-3 h-3 text-blue-900" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maria Santos"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-semibold">
                  <Mail className="w-3 h-3 text-blue-900" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maria.santos@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-semibold">
                <Phone className="w-3 h-3 text-blue-900" />
                Mobile Number (SMS & Courier) *
              </label>
              <input
                type="tel"
                required
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                placeholder="e.g. 0917-882-1920"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900 transition-colors"
              />
            </div>

            {/* Sizing & Centimeter Review */}
            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E7E2D8] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-900 flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-blue-900" />
                  Precision Centimeter Sizing:
                </span>
                <button
                  type="button"
                  onClick={onOpenSizingModal}
                  className="text-blue-900 text-xs font-mono uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <Ruler className="w-3 h-3 text-amber-700" /> Size Guide
                </button>
              </div>

              <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                    Foot Length (cm):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="20.0"
                    max="30.0"
                    value={footCm}
                    onChange={(e) => handleCmChange(parseFloat(e.target.value) || 24.5)}
                    placeholder="Foot Length (cm)"
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D3CBBE] rounded-xl text-xs font-mono font-bold text-stone-900 focus:border-blue-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                    EU Size:
                  </label>
                  <select
                    required
                    value={euSize}
                    onChange={(e) => handleEuSizeChange(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D3CBBE] rounded-xl text-xs font-mono font-bold text-stone-900 focus:border-blue-900 focus:outline-none cursor-pointer"
                  >
                    <option value="">Select EU Size</option>
                    {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((s) => (
                      <option key={s} value={s}>
                        EU {s} ({getCmFromEuSize(s)} cm)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer pt-0.5">
                <input
                  type="checkbox"
                  checked={wideFeet}
                  onChange={(e) => setWideFeet(e.target.checked)}
                  className="rounded accent-blue-900 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-stone-600">
                  Add Wide Feet Room (+0.5cm artisan forefoot allowance)
                </span>
              </label>

              {/* Zero-Risk Fit Guarantee Reminder */}
              <div className="bg-white p-3 rounded-lg border border-[#E7E2D8] flex items-center gap-2.5 text-[11px] text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Zero-Risk Fit Guarantee:</strong> Includes free 1-time size exchange/re-lasting if fit isn't perfect.
                </span>
              </div>
            </div>

            {/* Co-Creation & Personalization Module (Consumer Behavior Strategy) */}
            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E7E2D8] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Atelier Co-Creation (Free of Charge):
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 border border-emerald-200 rounded font-semibold">
                  Included in Batch
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                    Embossed Leather Initials (2-3 Letters):
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={customInitials}
                    onChange={(e) => setCustomInitials(e.target.value.toUpperCase())}
                    placeholder="e.g. JD or MSR"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D3CBBE] rounded-xl text-xs font-mono font-bold text-stone-900 placeholder-stone-400 focus:border-blue-900 focus:outline-none uppercase"
                  />
                  <span className="text-[10px] text-stone-500 block">Stamped on vegetable-tanned heel tab</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                    Denim Wash Tone:
                  </label>
                  <select
                    value={denimShade}
                    onChange={(e) => setDenimShade(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D3CBBE] rounded-xl text-xs font-mono font-bold text-stone-900 focus:border-blue-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Raw Deep Indigo (Standard)">Raw Deep Indigo (Standard)</option>
                    <option value="Stonewash Faded">Stonewash Faded Vintage</option>
                    <option value="Mixed Contrast Patchwork">Mixed Contrast Patchwork</option>
                  </select>
                  <span className="text-[10px] text-stone-500 block">Curated from sanitized thrift cuts</span>
                </div>
              </div>

              {/* SMS Notification Toggle */}
              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer pt-1 border-t border-[#E7E2D8]">
                <input
                  type="checkbox"
                  checked={smsUpdatesEnabled}
                  onChange={(e) => setSmsUpdatesEnabled(e.target.checked)}
                  className="rounded accent-blue-900 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-stone-700 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-blue-900" />
                  <span>Send workbench milestone SMS & Viber photo alerts as my pair is crafted</span>
                </span>
              </label>
            </div>

            {/* Delivery Address */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3 h-3 text-blue-900" />
                  Philippine Delivery Address *
                </label>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-blue-50 text-blue-900 px-2 py-0.5 border border-blue-200 rounded font-semibold">
                  {isNagaDelivery ? 'Free Naga Hub' : 'Nationwide LBC (+₱150)'}
                </span>
              </div>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="House / Unit / Street / Barangay"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900 transition-colors"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setIsNagaDelivery(e.target.value.toLowerCase().includes('naga'));
                  }}
                  placeholder="City"
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900"
                />
                <input
                  type="text"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Province"
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900"
                />
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>

            {/* Payment Deposit Plan Selector (Behavioral Strategy: 50% Deposit) */}
            <div className="space-y-4 pt-4 border-t border-[#E7E2D8]">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-900 block font-mono">
                2. Flexible Payment Plan
              </span>
              <p className="text-xs text-stone-600">
                To lower friction while securing your pair and funding the cobbler's fair wage upfront:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentPlan === 'split_deposit'
                      ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                      : 'bg-[#FAF8F5] text-stone-700 border-[#D3CBBE] hover:border-stone-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="split_deposit"
                    checked={paymentPlan === 'split_deposit'}
                    onChange={() => setPaymentPlan('split_deposit')}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">50% Atelier Deposit</span>
                    {paymentPlan === 'split_deposit' && <Check className="w-4 h-4" />}
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <div className="text-lg font-mono font-bold">₱{depositAmount.toLocaleString()} today</div>
                    <div className={`text-[10px] font-mono ${paymentPlan === 'split_deposit' ? 'text-blue-200' : 'text-stone-500'}`}>
                      Remaining ₱{dueUponDispatch.toLocaleString()} paid only when dispatched
                    </div>
                  </div>
                </label>

                <label
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentPlan === 'full'
                      ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                      : 'bg-[#FAF8F5] text-stone-700 border-[#D3CBBE] hover:border-stone-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="full"
                    checked={paymentPlan === 'full'}
                    onChange={() => setPaymentPlan('full')}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">Full Upfront Payment</span>
                    {paymentPlan === 'full' && <Check className="w-4 h-4" />}
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <div className="text-lg font-mono font-bold">₱{fullAmount.toLocaleString()} today</div>
                    <div className={`text-[10px] font-mono ${paymentPlan === 'full' ? 'text-blue-200' : 'text-stone-500'}`}>
                      Zero balance upon completion
                    </div>
                  </div>
                </label>
              </div>

              {/* Payment Method Channels */}
              <div className="pt-2 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-600 block font-semibold">
                  Select Transfer Channel:
                </span>
                <div className="payment-options grid grid-cols-3 gap-3">
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'gcash'
                        ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                        : 'bg-white text-stone-700 border-[#D3CBBE] hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      value="gcash"
                      checked={paymentMethod === 'gcash'}
                      onChange={() => setPaymentMethod('gcash')}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold block uppercase tracking-wider">GCash</span>
                    <span className="text-[9px] opacity-80 uppercase tracking-widest mt-0.5">Scan / Pay</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'maya'
                        ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                        : 'bg-white text-stone-700 border-[#D3CBBE] hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      value="maya"
                      checked={paymentMethod === 'maya'}
                      onChange={() => setPaymentMethod('maya')}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold block uppercase tracking-wider">Maya</span>
                    <span className="text-[9px] opacity-80 uppercase tracking-widest mt-0.5">Wallet</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                        : 'bg-white text-stone-700 border-[#D3CBBE] hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold block uppercase tracking-wider">Bank</span>
                    <span className="text-[9px] opacity-80 uppercase tracking-widest mt-0.5">BDO / BPI</span>
                  </label>
                </div>
              </div>

              {/* Payment Details Box */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8] space-y-2.5 text-xs font-mono">
                {paymentMethod === 'gcash' && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-800 uppercase text-[11px]">GCash Mobile:</span>
                      <span className="text-blue-900 font-bold text-sm">0917-882-1920</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Account: <strong className="text-stone-900">PAMITISAN FOOTWEAR / J. NAGA</strong>
                    </p>
                  </div>
                )}

                {paymentMethod === 'maya' && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-800 uppercase text-[11px]">Maya Account:</span>
                      <span className="text-blue-900 font-bold text-sm">0917-882-1920</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Account: <strong className="text-stone-900">PAMITISAN BICOL STUDIOS</strong>
                    </p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-stone-600">BDO Account:</span>
                      <strong className="text-stone-900">0042-8819-2041</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">BPI Account:</span>
                      <strong className="text-stone-900">3919-4820-11</strong>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Account: <strong className="text-stone-900">PAMITISAN ARTISANAL ENTERPRISE</strong>
                    </p>
                  </div>
                )}

                {/* Upload Screenshot */}
                <div className="pt-2.5 border-t border-[#E7E2D8] space-y-1.5">
                  <div
                    onClick={() => setProofFileUploaded(!proofFileUploaded)}
                    className={`p-3 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                      proofFileUploaded
                        ? 'bg-blue-50 text-blue-900 border-blue-300'
                        : 'bg-white border-[#D3CBBE] hover:border-stone-400 text-stone-600'
                    }`}
                  >
                    <Upload className={`w-3.5 h-3.5 mx-auto mb-1 ${proofFileUploaded ? 'text-blue-900' : 'text-stone-500'}`} />
                    <span className="text-xs font-semibold block uppercase tracking-wider">
                      {proofFileUploaded ? '✓ Screenshot Attached (sample_receipt.png)' : 'Upload Transfer Proof (Optional)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-checkout w-full py-3.5 bg-blue-900 hover:bg-blue-800 disabled:bg-stone-200 disabled:text-stone-400 text-white text-xs font-semibold tracking-widest uppercase rounded-xl shadow-xs border border-blue-950 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              {isSubmitting ? (
                <span>Locking Batch Slot in Naga Workshop...</span>
              ) : (
                <>
                  <span>
                    Confirm {paymentPlan === 'split_deposit' ? 'Deposit' : 'Order'} (₱{amountToPayNow.toLocaleString()})
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className="checkout-summary-col lg:col-span-5 sticky top-28 space-y-6">
          <div className="summary-card bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-3">
              <h3 className="text-base font-bold tracking-tight text-stone-900 uppercase font-serif">
                Order Summary
              </h3>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-bold">
                {BATCH_INFO.batchNumber}
              </span>
            </div>

            {/* Product Preview */}
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#E7E2D8] shrink-0 bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="item-line flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-tight">
                    {product.name}
                  </h4>
                  <span className="font-mono text-sm font-bold text-blue-900">
                    ₱{product.price.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs font-mono text-stone-600">
                  EU {euSize} ({footCm} cm) {wideFeet && '• WIDE'}
                </div>
                {customInitials && (
                  <div className="text-[11px] font-mono text-amber-800 font-semibold">
                    Monogram: "{customInitials}" • {denimShade.split(' ')[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Impact Badge */}
            <div className="impact-badge bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold uppercase tracking-wider font-mono">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Environmental Offset</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Diverts <strong className="text-emerald-700">~{product.wasteDivertedGrams}g</strong> of textile waste and supports fair cobbler livelihoods in Naga City.
              </p>
            </div>

            {/* Price Line Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-[#E7E2D8] text-xs font-mono">
              <div className="flex justify-between text-stone-600">
                <span className="uppercase text-[11px]">Handcrafted Pair:</span>
                <span className="font-bold text-stone-900">₱{product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="uppercase text-[11px]">QR Tag & Heel Initials:</span>
                <span className="text-emerald-700 font-semibold uppercase">Free / Included</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="uppercase text-[11px]">Delivery:</span>
                <span className="font-bold text-stone-900">{isNagaDelivery ? 'FREE (Naga Hub)' : '₱150 (LBC)'}</span>
              </div>

              {/* Archive Pass / Donation Discount Code Field */}
              <div className="pt-2 border-t border-[#E7E2D8] space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-700 block">
                  Archive Pass / Denim Voucher
                </span>
                {appliedCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200 text-xs">
                    <div>
                      <strong className="font-bold">{appliedCode}</strong>
                      <span className="text-[10px] text-emerald-700 block">-₱{appliedDiscount} Circular Discount</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveDiscount}
                      className="text-stone-400 hover:text-stone-700 font-bold p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCodeInput}
                      onChange={(e) => setDiscountCodeInput(e.target.value)}
                      placeholder="e.g. ARCHIVE-XXXX"
                      className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-blue-900"
                    />
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {discountError && (
                  <span className="text-[10px] text-red-600 block">{discountError}</span>
                )}
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span className="uppercase text-[11px]">Denim Donation Discount:</span>
                  <span>-₱{appliedDiscount.toLocaleString()}</span>
                </div>
              )}

              {/* Plan Breakdown */}
              <div className="pt-2 border-t border-[#E7E2D8] space-y-1.5">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="uppercase text-[11px] font-bold">Due Today:</span>
                  <strong className="text-blue-900 font-mono font-bold text-base">
                    ₱{amountToPayNow.toLocaleString()}
                  </strong>
                </div>
                {paymentPlan === 'split_deposit' && (
                  <div className="flex items-center justify-between text-amber-900 text-[11px]">
                    <span className="uppercase">Due Upon Dispatch:</span>
                    <strong className="font-mono font-semibold">₱{dueUponDispatch.toLocaleString()}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Dispatch Note */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E7E2D8] text-[11px] font-mono text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-900 font-semibold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                <span>Est. Dispatch: {BATCH_INFO.estimatedDeliveryDate}</span>
              </div>
              <p className="text-[10px] text-stone-500">
                Guaranteed covered under our Zero-Risk Perfect Fit Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
