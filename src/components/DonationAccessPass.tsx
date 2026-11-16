import React, { useState } from 'react';
import {
  Sparkles,
  Recycle,
  Ticket,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
  Truck,
  Leaf,
  Layers,
  Copy,
  Check,
  FileCheck
} from 'lucide-react';
import { DenimDonationPledge } from '../types';

interface DonationAccessPassProps {
  onApplyDiscountToCheckout?: (code: string, discount: number) => void;
}

export const DonationAccessPass: React.FC<DonationAccessPassProps> = ({
  onApplyDiscountToCheckout
}) => {
  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [itemCount, setItemCount] = useState<number>(1);
  const [itemDescription, setItemDescription] = useState<string>('Old Levi\'s blue denim jeans (size 32)');
  const [dropoffMethod, setDropoffMethod] = useState<'naga_hub' | 'courier_pickup'>('naga_hub');
  const [address, setAddress] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedPass, setGeneratedPass] = useState<DenimDonationPledge | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !email || !phone) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      const discountVal = itemCount >= 2 ? 300 : 200;
      const code = `ARCHIVE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const passId = `PASS-PAM-${Math.floor(1000 + Math.random() * 9000)}`;

      const newPass: DenimDonationPledge = {
        id: passId,
        donorName,
        email,
        phone,
        itemCount,
        itemDescription,
        dropoffMethod,
        address: dropoffMethod === 'courier_pickup' ? address : 'Naga City Workshop Hub',
        discountCode: code,
        discountAmount: discountVal,
        archivePassId: passId,
        dateCreated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pledged'
      };

      setGeneratedPass(newPass);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCopyCode = () => {
    if (!generatedPass) return;
    navigator.clipboard?.writeText(generatedPass.discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section id="donate-pass" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF8F5] text-stone-900 border-t border-[#E7E2D8]">
      <div className="space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <Recycle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Closed-Loop Circular Incentive Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
            DONATE DENIM. UNLOCK <span className="text-amber-800 italic font-normal">ARCHIVE ACCESS</span>.
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-mono leading-relaxed">
            Turn your closet cleanout into 1-of-1 wearable art. Donate old denim pants to receive an instant <strong>₱200–₱300 discount</strong> and guaranteed <strong>24-Hour VIP Early Drop Access</strong> before the next 50-pair batch opens to the public.
          </p>
        </div>

        {/* 3-Step Gamified Mechanic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 bg-blue-50 text-blue-900 font-mono font-bold rounded-xl flex items-center justify-center border border-blue-200">
              01
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Pledge Old Denim Pants
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Register worn-out jeans or jackets (any brand). We intercept them before they reach landfills, sanitizing and patterning them in Naga City.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 bg-amber-50 text-amber-900 font-mono font-bold rounded-xl flex items-center justify-center border border-amber-200">
              02
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Receive 24-Hr VIP Archive Pass
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Get your unique VIP pass token granting 24-hour early access to claim one of the scarce 50 batch slots, plus a ₱200–₱300 discount.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-900 font-mono font-bold rounded-xl flex items-center justify-center border border-emerald-200">
              03
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Your Name on the Archive Ledger
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Your name and denim provenance are permanently stamped on the physical Certificate of Authenticity inside that shoe's Living Archive Box.
            </p>
          </div>
        </div>

        {/* Generated VIP Pass Modal/Card or Interactive Form */}
        {generatedPass ? (
          <div className="bg-white border-2 border-blue-900 rounded-3xl p-8 sm:p-10 shadow-xl max-w-2xl mx-auto space-y-6 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
              <Ticket className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-900 font-bold block">
                VIP Archive Access Pass Issued
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                MARAMING SALAMAT, {generatedPass.donorName.toUpperCase()}!
              </h3>
              <p className="text-xs font-mono text-stone-600">
                Your denim contribution has been logged into the Naga Circular Registry.
              </p>
            </div>

            {/* Visual VIP Ticket */}
            <div className="bg-[#FAF8F5] border border-[#D3CBBE] rounded-2xl p-6 text-left font-mono text-xs space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-[#E7E2D8] pb-3">
                <span className="text-stone-500 uppercase tracking-widest text-[10px]">Pass ID:</span>
                <strong className="text-blue-900 font-bold">{generatedPass.archivePassId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-widest text-[10px]">Discount Value:</span>
                <strong className="text-emerald-700 font-bold">₱{generatedPass.discountAmount} Off Next Pre-Order</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-widest text-[10px]">Batch Drop Access:</span>
                <span className="text-blue-900 font-bold">24-Hour Early Access Window</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-widest text-[10px]">Donated Items:</span>
                <span className="text-stone-800">{generatedPass.itemCount} Pair(s) ({generatedPass.itemDescription})</span>
              </div>

              {/* Discount Code Box */}
              <div className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between bg-white p-3 rounded-xl border border-[#D3CBBE]">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-500 block font-semibold">
                    Checkout Promo Code
                  </span>
                  <span className="text-base font-bold text-blue-900 tracking-wider">
                    {generatedPass.discountCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="#products"
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xl shadow-xs border border-blue-950 transition-all block text-center font-mono cursor-pointer"
              >
                Browse Batch 05 Lineup & Redeem Code
              </a>
              <button
                onClick={() => setGeneratedPass(null)}
                className="w-full py-2.5 bg-transparent hover:bg-stone-100 text-stone-600 text-xs font-mono uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Register Another Denim Donation
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E7E2D8] shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="border-b border-[#E7E2D8] pb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Denim Pledge & Archive Registration
              </span>
              <span className="text-[10px] font-mono text-stone-500 uppercase">Takes 1 Minute</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. maria@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                    Mobile Number (for SMS token) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0917-882-1920"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                    Number of Denim Garments *
                  </label>
                  <select
                    value={itemCount}
                    onChange={(e) => setItemCount(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-blue-900 cursor-pointer"
                  >
                    <option value={1}>1 Denim Item (₱200 Voucher + VIP Pass)</option>
                    <option value={2}>2 Denim Items (₱300 Voucher + VIP Pass)</option>
                    <option value={3}>3+ Denim Items (₱300 Voucher + Special Artisan Credit)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                  Garment Description / Brand Details
                </label>
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="e.g. 1 dark blue Levi's jeans, 1 light wash denim jacket"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-blue-900"
                />
              </div>

              {/* Drop-off / Shipping Method */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                  Handover Preference:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      dropoffMethod === 'naga_hub'
                        ? 'bg-blue-900 text-white border-blue-950'
                        : 'bg-[#FAF8F5] text-stone-700 border-[#D3CBBE]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="dropoff"
                      checked={dropoffMethod === 'naga_hub'}
                      onChange={() => setDropoffMethod('naga_hub')}
                      className="sr-only"
                    />
                    <MapPin className="w-4 h-4 shrink-0" />
                    <div className="text-xs font-mono">
                      <strong className="block font-bold">Naga City Drop-off Hub</strong>
                      <span className="text-[10px] opacity-80">Free drop-off at atelier desk</span>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      dropoffMethod === 'courier_pickup'
                        ? 'bg-blue-900 text-white border-blue-950'
                        : 'bg-[#FAF8F5] text-stone-700 border-[#D3CBBE]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="dropoff"
                      checked={dropoffMethod === 'courier_pickup'}
                      onChange={() => setDropoffMethod('courier_pickup')}
                      className="sr-only"
                    />
                    <Truck className="w-4 h-4 shrink-0" />
                    <div className="text-xs font-mono">
                      <strong className="block font-bold">LBC / Courier Send-in</strong>
                      <span className="text-[10px] opacity-80">Nationwide pouch drop-in</span>
                    </div>
                  </label>
                </div>
              </div>

              {dropoffMethod === 'courier_pickup' && (
                <div className="space-y-1 animate-in fade-in">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                    Your Address for Courier Waybill:
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter city, province, or nearest LBC branch"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 disabled:bg-stone-300 text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-xs border border-blue-950 flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                {isSubmitting ? (
                  <span>Generating Archive Pass & Circular ID...</span>
                ) : (
                  <>
                    <span>Generate VIP Pass & ₱{itemCount >= 2 ? '300' : '200'} Voucher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
