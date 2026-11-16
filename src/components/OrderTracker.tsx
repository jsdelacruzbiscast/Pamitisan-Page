import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  QrCode,
  AlertCircle,
  Truck,
  ArrowRight,
  Sparkles,
  Bell,
  Check,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_ORDERS } from '../data/footwearData';
import { OrderTrackRecord } from '../types';

interface OrderTrackerProps {
  ordersList?: OrderTrackRecord[];
  onViewArchive: (code: string) => void;
  onContactCobbler: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  ordersList = INITIAL_ORDERS,
  onViewArchive,
  onContactCobbler
}) => {
  const [searchInput, setSearchInput] = useState<string>('PAM-8821');
  const [trackedOrder, setTrackedOrder] = useState<OrderTrackRecord | null>(ordersList[0] || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [smsAlertActive, setSmsAlertActive] = useState<boolean>(true);
  const [smsToast, setSmsToast] = useState<string | null>(null);

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchInput.trim().toUpperCase().replace(/[\s-]/g, '');
    
    // Find matching order by orderId or phone
    const found = ordersList.find(
      (order) =>
        order.orderId.toUpperCase().replace(/[\s-]/g, '') === query ||
        order.phone.replace(/[\s-]/g, '') === query ||
        order.email.toUpperCase() === searchInput.trim().toUpperCase()
    );

    if (found) {
      setTrackedOrder(found);
      setErrorMessage(null);
    } else {
      // Simulate demo fallback if user tests a new random order ID
      if (query.startsWith('PAM') || query.length >= 6) {
        const demoOrder: OrderTrackRecord = {
          orderId: searchInput.trim().toUpperCase(),
          phone: '0917-XXX-XXXX',
          customerName: 'Valued Supporter',
          email: 'collector@pamitisan.ph',
          shoeName: 'Pamitisan ETNIKO Classic #0184',
          shoeCode: 'PAM-0184',
          euSize: 40,
          footCm: 25.5,
          batch: 'Batch 05',
          orderDate: 'Aug 30, 2026',
          estimatedDelivery: 'Oct 20, 2026',
          courier: 'LBC Express Door-to-Door',
          trackingNumber: 'LBC-PENDING-DISPATCH',
          deliveryAddress: 'Delivery details confirmed on reservation',
          paymentMethod: 'GCash Verified',
          paymentPlan: 'split_deposit',
          paymentStatus: 'Verified',
          totalPaid: 900,
          remainingBalance: 900,
          customInitials: 'VS',
          denimShade: 'Raw Deep Indigo',
          smsUpdatesEnabled: true,
          currentStage: 1,
          livingArchiveId: 'PAM-0184',
          stages: [
            {
              stage: 1,
              title: '1. Denim Sourced & Cut',
              description: 'Dark-wash thrifted denim selected, sanitised, and patterned on the bench.',
              date: 'Aug 31, 2026',
              isCompleted: true,
              isCurrent: true,
              artisanNote: 'Textiles prepped and handed over to Master Kuya Nonoy.'
            },
            {
              stage: 2,
              title: '2. Upper Hand-Stitched by Artisan',
              description: 'Upper panels and Hinabi geometric accents being hand-stitched.',
              isCompleted: false,
              isCurrent: false
            },
            {
              stage: 3,
              title: '3. Sole Lasting & Quality Test',
              description: 'Vulcanized sole lasting and compression quality check.',
              isCompleted: false,
              isCurrent: false
            },
            {
              stage: 4,
              title: '4. Archive Boxed & Dispatched',
              description: 'Living archive QR certification, boxing, and courier handover.',
              isCompleted: false,
              isCurrent: false
            }
          ]
        };
        setTrackedOrder(demoOrder);
        setErrorMessage(null);
      } else {
        setErrorMessage(`No active batch reservation found for "${searchInput}". Please check your Order ID (e.g. PAM-8821) or mobile phone number.`);
        setTrackedOrder(null);
      }
    }
  };

  const handleTestSmsBroadcast = () => {
    setSmsToast(`SMS Broadcast Sent to ${trackedOrder?.phone || '0917-882-1920'}: "PAMITISAN BENCH UPDATE: Stage 2 in progress for ${trackedOrder?.orderId}. Master Cobbler is stitching your Hinabi upper!"`);
    setTimeout(() => {
      setSmsToast(null);
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#FAF8F5] text-stone-900">
      {/* Toast Notification */}
      {smsToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-stone-900 text-white p-4 rounded-xl shadow-2xl border border-stone-700 flex items-start gap-3 animate-in slide-in-from-bottom-5">
          <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs font-mono">
            <strong className="text-amber-400 block uppercase tracking-wider">Simulated Artisan SMS Dispatched</strong>
            <p className="text-stone-300 leading-relaxed">{smsToast}</p>
          </div>
        </div>
      )}

      {/* Search Header Section */}
      <section className="tracking-portal bg-white text-stone-900 p-8 sm:p-12 rounded-2xl border border-[#E7E2D8] space-y-8 shadow-sm">
        <div className="space-y-3 text-center max-w-xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-900 block font-bold">
            Real-Time Workshop Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
            TRACK YOUR <span className="text-amber-800 font-normal italic">PAIR</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-stone-600 leading-relaxed">
            Monitor your pair through every phase of hand-cutting, stitching, and lasting at our Naga City workshop.
          </p>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleTrack} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              id="order-id"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Order ID (e.g. PAM-8821)"
              className="w-full px-4 py-3 bg-[#FAF8F5] text-stone-900 border border-[#D3CBBE] rounded-xl text-xs font-mono placeholder-stone-400 focus:outline-none focus:border-blue-900 uppercase tracking-wider transition-colors"
            />
          </div>
          <button
            type="submit"
            id="track-btn"
            className="btn-primary px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-xl shadow-xs border border-blue-950 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>

        {/* Sample Lookups */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-stone-600">
          <span className="uppercase text-[11px] font-bold tracking-wider">Sample Reservations:</span>
          <button
            onClick={() => {
              setSearchInput('PAM-8821');
              setTrackedOrder(ordersList[0]);
              setErrorMessage(null);
            }}
            className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#D3CBBE] hover:border-stone-400 text-stone-800 rounded-lg transition-colors cursor-pointer font-medium"
          >
            PAM-8821 (Stitching)
          </button>
          <button
            onClick={() => {
              setSearchInput('PAM-9042');
              setTrackedOrder(ordersList[1]);
              setErrorMessage(null);
            }}
            className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#D3CBBE] hover:border-stone-400 text-stone-800 rounded-lg transition-colors cursor-pointer font-medium"
          >
            PAM-9042 (Lasting & 50% Deposit)
          </button>
        </div>
      </section>

      {/* Error State */}
      {errorMessage && (
        <div className="bg-red-50 text-red-800 p-5 rounded-xl border border-red-200 flex items-start gap-3 text-xs font-mono shadow-xs">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">{errorMessage}</p>
            <p className="mt-1 text-red-700">
              Need assistance? Contact our Naga workshop artisan desk at <span className="font-bold text-stone-900">pamitisannaga@gmail.com</span>.
            </p>
          </div>
        </div>
      )}

      {/* Tracked Order Details Card & Timeline */}
      {trackedOrder && (
        <div className="bg-white rounded-2xl border border-[#E7E2D8] shadow-sm overflow-hidden space-y-6">
          {/* Order Overview Header */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 border-b border-[#E7E2D8] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-900 font-bold">
                  Active Atelier Reservation
                </span>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-bold">
                  {trackedOrder.orderId}
                </span>
                {trackedOrder.paymentPlan === 'split_deposit' && (
                  <span className="text-[10px] font-mono bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold">
                    50% Atelier Deposit
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-serif font-bold tracking-tight text-stone-900 mt-1">
                {trackedOrder.shoeName}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-600 pt-0.5">
                <span>PATRON: <strong className="text-stone-900 font-bold">{trackedOrder.customerName}</strong></span>
                <span>•</span>
                <span>SIZE: EU {trackedOrder.euSize} ({trackedOrder.footCm} CM)</span>
                {trackedOrder.customInitials && (
                  <>
                    <span>•</span>
                    <span className="text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      HEEL MONOGRAM: "{trackedOrder.customInitials}"
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onViewArchive(trackedOrder.livingArchiveId)}
                className="px-4 py-2.5 bg-white hover:bg-[#F3EFEA] border border-[#D3CBBE] text-stone-800 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5 text-blue-900" />
                <span>Living Archive</span>
              </button>
            </div>
          </div>

          {/* SMS Notification Banner (Consumer Engagement) */}
          <div className="mx-6 sm:mx-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-blue-950 font-mono">
              <Bell className="w-4 h-4 text-blue-900 shrink-0" />
              <span>
                <strong>SMS & Viber Workbench Broadcasts:</strong> Active for {trackedOrder.phone || '0917-882-1920'}
              </span>
            </div>
            <button
              onClick={handleTestSmsBroadcast}
              className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-[10px] font-mono font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              Test SMS Alert
            </button>
          </div>

          {/* 4-Stage Status Timeline */}
          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-blue-900 block mb-6">
                Handcrafting Stage Progression
              </span>
              <div id="tracking-status" className="status-timeline space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-[1px] before:bg-[#E7E2D8]">
                {trackedOrder.stages.map((st) => {
                  const isDone = st.isCompleted;
                  const isCurrent = st.isCurrent;
                  return (
                    <div
                      key={st.stage}
                      className={`step relative flex items-start gap-4 ${
                        isDone ? 'complete' : isCurrent ? 'active' : ''
                      }`}
                    >
                      {/* Node Icon */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 z-10 font-mono text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : isCurrent
                            ? 'bg-blue-900 text-white ring-2 ring-blue-300 shadow-xs'
                            : 'bg-white text-stone-400 border border-[#D3CBBE]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : st.stage}
                      </div>

                      {/* Content Card */}
                      <div
                        className={`flex-1 p-5 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-[#FAF8F5] border-blue-900 shadow-xs'
                            : isDone
                            ? 'bg-white border-[#E7E2D8]'
                            : 'bg-[#FAF8F5]/50 border-dashed border-[#E7E2D8] opacity-60'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2 uppercase tracking-tight">
                            {st.title}
                            {isCurrent && (
                              <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-200 rounded font-bold">
                                Active Bench
                              </span>
                            )}
                          </h5>
                          {st.date && (
                            <span className="text-[11px] font-mono text-stone-500 font-semibold">
                              {st.date}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {st.description}
                        </p>

                        {/* Artisan Note Callout */}
                        {st.artisanNote && (
                          <div className="mt-3 p-3 bg-white border-l-2 border-blue-900 rounded-r-lg text-xs text-stone-700 font-mono shadow-xs">
                            <span className="text-[9px] uppercase tracking-widest text-blue-900 font-bold block">
                              Master Cobbler Bench Note:
                            </span>
                            "{st.artisanNote}"
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery & Financial Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E7E2D8] text-xs font-mono">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8]">
                <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Est. Dispatch Date</span>
                <strong className="text-stone-900 text-xs font-bold mt-0.5 block">{trackedOrder.estimatedDelivery}</strong>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8]">
                <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Courier Pathway</span>
                <strong className="text-stone-900 text-xs font-bold mt-0.5 block">{trackedOrder.courier}</strong>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8]">
                <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Amount Paid</span>
                <strong className="text-emerald-700 text-xs font-bold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ₱{trackedOrder.totalPaid.toLocaleString()}
                </strong>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8]">
                <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Remaining Balance</span>
                <strong className={`text-xs font-bold mt-0.5 block ${trackedOrder.remainingBalance > 0 ? 'text-amber-900' : 'text-stone-600'}`}>
                  {trackedOrder.remainingBalance > 0 ? `₱${trackedOrder.remainingBalance.toLocaleString()} (on dispatch)` : 'Fully Settled'}
                </strong>
              </div>
            </div>

            {/* Zero-Risk Guarantee Badge */}
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8] flex items-center gap-3 text-xs text-stone-700">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <p className="leading-relaxed">
                <strong>Zero-Risk Fit Protection:</strong> In the unlikely event the sizing needs adjustment after you try them on, your reservation includes 1-time free re-lasting or exchange within 14 days.
              </p>
            </div>
          </div>

          {/* Footer Assistance Action */}
          <div className="bg-[#FAF8F5] px-6 sm:px-8 py-4 border-t border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-stone-600">
              Have questions about your custom pair's hand-lasting?
            </span>
            <button
              onClick={onContactCobbler}
              className="text-blue-900 hover:text-blue-700 font-bold uppercase tracking-wider font-mono flex items-center gap-2 cursor-pointer text-xs transition-colors"
            >
              <span>Message Naga Artisan Workshop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
