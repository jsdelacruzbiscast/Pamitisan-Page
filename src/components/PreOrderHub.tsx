import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Leaf,
  Info,
  Ruler,
  ShieldCheck,
  QrCode,
  Sun,
  CloudRain,
  Wind,
  Sparkles,
  RefreshCw,
  Award,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { ShoeProduct } from '../types';
import { PRODUCTS, BATCH_INFO, COMMUNITY_STORIES, workshopImg } from '../data/footwearData';
import { TransformationVisualizer } from './TransformationVisualizer';
import { DonationAccessPass } from './DonationAccessPass';
import { CustomizerVisualizer } from './CustomizerVisualizer';
import { ErgonomicsFlexComparison } from './ErgonomicsFlexComparison';
import { ExplodedUnboxingShowcase } from './ExplodedUnboxingShowcase';
import { WalkingLookbook } from './WalkingLookbook';

interface PreOrderHubProps {
  onSelectProductForCheckout: (product: ShoeProduct, size?: number) => void;
  onOpenSizingModal: () => void;
  onViewArchive: (code: string) => void;
  onViewStory: () => void;
}

export const PreOrderHub: React.FC<PreOrderHubProps> = ({
  onSelectProductForCheckout,
  onOpenSizingModal,
  onViewArchive,
  onViewStory
}) => {
  const [selectedProductForModal, setSelectedProductForModal] = useState<ShoeProduct | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'pamitisan-etniko-classic': 40,
    'pamitisan-mayon-high-top': 41,
    'pamitisan-hinabi-slipon': 39
  });

  const [activeReservationIndex, setActiveReservationIndex] = useState<number>(0);
  const LIVE_RESERVATIONS = [
    { name: 'Jayson A.', city: 'Makati City', model: 'ETNIKO Classic #0184', size: 'EU 41', timeAgo: '3m ago' },
    { name: 'Maria C.', city: 'Naga City', model: 'Hinabi Slip-On #0315', size: 'EU 38', timeAgo: '7m ago' },
    { name: 'David T.', city: 'Cebu City', model: 'Mayon High-Top #0092', size: 'EU 42', timeAgo: '14m ago' },
    { name: 'Danica R.', city: 'Quezon City', model: 'ETNIKO Habi #0412', size: 'EU 39', timeAgo: '21m ago' }
  ];

  useEffect(() => {
    const resTimer = setInterval(() => {
      setActiveReservationIndex(prev => (prev + 1) % LIVE_RESERVATIONS.length);
    }, 4500);
    return () => clearInterval(resTimer);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSizeChange = (productId: string, size: number) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const percentageClaimed = Math.round((BATCH_INFO.slotsClaimed / BATCH_INFO.slotsTotal) * 100);

  return (
    <div className="space-y-24 pb-24 bg-[#FAF8F5] text-stone-900">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-12 border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial & Value Proposition */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono tracking-widest uppercase font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Limited Batch 05 • Naga City Atelier
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.08] tracking-tight text-stone-900">
                  RECLAIMED DENIM. <br />
                  <span className="text-blue-950 font-normal italic">ALL-SEASON FOOTWEAR.</span>
                </h1>
                <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed pt-1">
                  Pamitisan deconstructs curated thrift jeans into serialized footwear, handcrafted one pair at a time by master Bicolano cobblers.
                </p>
              </div>

              {/* Scarcity & Batch 05 Drop Bar */}
              <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] space-y-5 max-w-xl shadow-xs">
                <div className="flex items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">
                      Active Drop Window
                    </span>
                    <strong className="text-base font-bold tracking-tight text-stone-900">
                      {BATCH_INFO.batchNumber}: {BATCH_INFO.batchTitle}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-blue-900 font-bold tracking-wider">
                      {BATCH_INFO.slotsRemaining} Slots Remaining
                    </span>
                    <span className="text-[10px] text-stone-500 block font-mono">
                      ({BATCH_INFO.slotsClaimed} / {BATCH_INFO.slotsTotal} Reserved)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden border border-stone-200">
                    <div 
                      className="bg-blue-900 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${percentageClaimed}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono uppercase tracking-wider text-stone-500">
                    <span className="text-emerald-700 font-semibold">{percentageClaimed}% Capacity Claimed</span>
                    <span>Cap: Strict 50 Pairs</span>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  <div className="bg-[#FAF8F5] p-2.5 rounded-xl text-center border border-[#E7E2D8]">
                    <span className="font-mono text-lg font-bold text-stone-900 block">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500">Days</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 rounded-xl text-center border border-[#E7E2D8]">
                    <span className="font-mono text-lg font-bold text-stone-900 block">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500">Hours</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 rounded-xl text-center border border-[#E7E2D8]">
                    <span className="font-mono text-lg font-bold text-stone-900 block">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500">Mins</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 rounded-xl text-center border border-[#E7E2D8]">
                    <span className="font-mono text-lg font-bold text-blue-900 block">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500">Secs</span>
                  </div>
                </div>

                {/* Live Bench Activity Pulse Ticker */}
                <div className="pt-2 border-t border-[#E7E2D8] flex items-center justify-between font-mono text-[11px] text-stone-700 bg-stone-50/80 p-2.5 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
                    <span className="truncate">
                      <strong>{LIVE_RESERVATIONS[activeReservationIndex].name}</strong> ({LIVE_RESERVATIONS[activeReservationIndex].city}) reserved {LIVE_RESERVATIONS[activeReservationIndex].model} ({LIVE_RESERVATIONS[activeReservationIndex].size})
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-600 shrink-0 font-semibold ml-2">
                    {LIVE_RESERVATIONS[activeReservationIndex].timeAgo}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#collection-grid"
                  className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all inline-flex items-center gap-2.5 shadow-xs border border-blue-950 cursor-pointer"
                >
                  <span>Explore Upcycled Pairs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={onOpenSizingModal}
                  className="px-6 py-3.5 bg-white hover:bg-[#F3EFEA] border border-[#D3CBBE] text-stone-800 text-xs font-semibold tracking-widest uppercase rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Ruler className="w-3.5 h-3.5 text-amber-700" />
                  <span>Measure CM Fit</span>
                </button>
              </div>

              {/* Subtle Trust Line */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E7E2D8] text-xs text-stone-600 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>1-of-1 Thrift Denim</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Zero Factory Waste</span>
                </div>
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-blue-900" />
                  <span>Living Archive QR Tag</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] bg-white p-3 shadow-sm group">
                <div className="relative overflow-hidden rounded-xl bg-stone-100">
                  <img
                    src={PRODUCTS[0].image}
                    alt={PRODUCTS[0].name}
                    className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs font-semibold">
                    <span className="text-blue-900">Upcycled Denim</span> • PAM-0184
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 flex items-center justify-between shadow-xs">
                    <div>
                      <p className="font-bold text-sm text-stone-900 tracking-tight">
                        ETNIKO Classic Denim
                      </p>
                      <span className="text-xs font-mono text-blue-950 font-bold">
                        ₱1,800 • Pre-Order Price
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectProductForCheckout(PRODUCTS[0], selectedSizes['pamitisan-etniko-classic'] || 40)}
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-wider uppercase rounded-lg shadow-xs border border-blue-950 transition-all cursor-pointer"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Upcycling & All-Season Versatility Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E7E2D8] space-y-8 shadow-xs">
          <div className="max-w-3xl space-y-2.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-800 block">
              The Upcycled Footwear Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              WHY UPCYCLED DENIM PERFORMS ALL-SEASON
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Denim was originally engineered as workwear for its extraordinary tensile strength, breathability, and natural longevity. By diverting pre-loved jeans and vintage garments into footwear, we create shoes designed to thrive through every season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-900">Dry Season Breathability</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                100% natural cotton weave allows continuous airflow and moisture evaporation during hot days, lined with unbleached canvas.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <CloudRain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-900">Weather-Ready Construction</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Reinforced vulcanized rubber outsoles and water-resistant sealed seams protect your stride against sudden monsoon rains.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-900">Aging & Denim Patina</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Unlike synthetic leathers that peel, genuine upcycled indigo denim molds comfortably to your feet and develops richer character with age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bespoke Spec & Heel Monogram Visualizer (Endowment Effect) */}
      <CustomizerVisualizer
        onSelectProductForCheckout={(prod, size, customData) => {
          onSelectProductForCheckout(prod, size);
        }}
      />

      {/* Radical Transparency: Ukay-to-Upper Visualizer */}
      <TransformationVisualizer />

      {/* Ditch the "Stiff Canvas Tax" Ergonomics & Biomechanics Pressure Map */}
      <ErgonomicsFlexComparison />

      {/* Exploded Living Archive Box Unboxing Showcase */}
      <ExplodedUnboxingShowcase />

      {/* Closed Loop Denim Donation & Archive Pass Portal */}
      <DonationAccessPass />

      {/* Collection Grid Section */}
      <section id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E7E2D8] gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-900 block mb-2 font-mono">
              Artisan Batch Catalogue
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
              BATCH 05 ATELIER SELECTION
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
              Every pair is crafted from unique cuts of reclaimed denim pants and handloom Hinabi textiles. Choose your silhouette and secure your reservation slot.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSizingModal}
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2.5 bg-white border border-[#D3CBBE] hover:bg-[#F3EFEA] rounded-xl text-stone-800 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Ruler className="w-3.5 h-3.5 text-amber-700" />
              <span>EU Size Guide (CM)</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid: Minimalist & Progressive Disclosure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {PRODUCTS.map((product) => {
            const currentSelectedSize = selectedSizes[product.id] || product.availableSizes[0];
            const isCardExpanded = !!expandedCards[product.id];

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                tabIndex={0}
                onClick={() => {
                  // Enable toggle on mobile touch devices
                  setExpandedCards((prev) => ({
                    ...prev,
                    [product.id]: !prev[product.id]
                  }));
                }}
                className="bg-white rounded-2xl overflow-hidden border border-[#E7E2D8] hover:border-blue-900/60 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              >
                {/* Product Image Stage */}
                <div className="relative bg-stone-100 overflow-hidden aspect-4/3 p-3 cursor-pointer">
                  <div className="relative w-full h-full overflow-hidden rounded-xl bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Minimal Scarcity Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/95 backdrop-blur-xs text-stone-900 border border-stone-200 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs font-semibold">
                        {product.slotsRemaining} Slots Left
                      </span>
                    </div>

                    {/* Quick Specs Inspect Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProductForModal(product);
                      }}
                      className="absolute bottom-3 right-3 z-10 px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-blue-900 text-stone-700 hover:text-white border border-stone-200 transition-all cursor-pointer shadow-xs flex items-center gap-1.5 text-[11px] font-mono font-medium"
                      title="Inspect Provenance & Materials"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    {/* Subtle Hover Hint Overlay on Image */}
                    <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="bg-white/95 text-stone-900 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md border border-stone-300 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                        <span>Select Size & Reserve</span>
                        <ChevronDown className="w-3 h-3 text-blue-900 animate-bounce" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  {/* Always Visible Info Header */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1 uppercase tracking-wider">
                      <span>{product.code}</span>
                      <span className="text-amber-800 font-semibold">{product.masterArtisan}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-blue-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Hover Prompt Cue (Price is kept inside the hidden slide-down drawer) */}
                  <div
                    className={`pt-1 flex items-center justify-between font-mono text-xs text-stone-500 transition-all duration-300 ${
                      isCardExpanded ? 'hidden' : 'group-hover:hidden'
                    }`}
                  >
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                      1-of-1 Handmade
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-blue-900 font-semibold uppercase tracking-wider">
                      <span>Hover for price & sizes</span>
                      <ChevronDown className="w-3 h-3 text-blue-900" />
                    </div>
                  </div>

                  {/* Interactive Progressive Disclosure Drawer (Slides down on hover or tap) */}
                  <div
                    className={`grid transition-all duration-400 ease-out ${
                      isCardExpanded
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-3 border-t border-[#E7E2D8] space-y-4">
                        
                        {/* Size Selector */}
                        <div
                          className="space-y-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold tracking-wider uppercase text-[11px] text-stone-700 font-mono">
                              Select EU Size:
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenSizingModal();
                              }}
                              className="text-blue-900 hover:text-blue-700 font-mono text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Ruler className="w-3 h-3 text-amber-700" /> Size Guide
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {product.availableSizes.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSizeChange(product.id, size);
                                }}
                                className={`w-9 h-8 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                                  currentSelectedSize === size
                                    ? 'bg-blue-900 text-white shadow-xs border border-blue-950 scale-105'
                                    : 'bg-white text-stone-700 border border-[#D3CBBE] hover:border-stone-400 hover:bg-[#FAF8F5]'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price & Action Row */}
                        <div
                          className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 block">
                                Full Price
                              </span>
                              <span className="text-[9px] font-mono bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.2 rounded font-semibold uppercase">
                                50% Deposit: ₱{(product.price / 2).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold tracking-tight text-stone-900">
                                ₱{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-stone-400 line-through font-mono">
                                  ₱{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProductForCheckout(product, currentSelectedSize);
                            }}
                            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 shadow-xs border border-blue-950 cursor-pointer active:scale-95"
                            id={`reserve-btn-${product.id}`}
                          >
                            <span>Reserve</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consumer Trust & Risk Mitigation: 3 Promises */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Zero-Risk Fit Guarantee</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Never worry about online sizing. If your bespoke pair doesn't fit like a glove, we re-last or exchange it once for free within 14 days of receipt.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Free Atelier Personalization</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every pair is made from scratch. Choose your raw or faded denim wash and get your initials embossed on the leather heel counter at zero extra charge.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-200">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">SMS Workbench Updates</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Receive direct SMS notifications with real photos from the Naga bench as your denim is cut, stitched, vulcanized, and boxed with its Living Archive QR.
            </p>
          </div>
        </div>
      </section>

      {/* Philippine Heritage Walking Logs Lookbook */}
      <WalkingLookbook onSelectProductForCheckout={onSelectProductForCheckout} />

      {/* Community Patina & Wearers of Pamitisan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E7E2D8] space-y-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-900 block">
                Social Proof & Long-Term Durability
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                HOW UPCYCLED DENIM AGES: THE PATINA STORIES
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Unlike synthetic fast-fashion sneakers that deteriorate, authentic heavyweight thrifted denim develops unique fades, character, and molded comfort the more you walk in them.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-stone-500 bg-[#FAF8F5] px-3.5 py-2 rounded-xl border border-[#E7E2D8]">
              <MessageSquare className="w-3.5 h-3.5 text-blue-900" />
              <span>Verified Batch 01-04 Owners</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_STORIES.map((story) => (
              <div key={story.id} className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-2">
                    <span className="font-bold text-xs text-stone-900">{story.ownerName}</span>
                    <span className="text-[10px] font-mono text-blue-900 font-semibold">{story.location}</span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 flex items-center justify-between">
                    <span>{story.shoeModel}</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-[#E7E2D8] text-stone-700 font-semibold">{story.wearDuration}</span>
                  </div>
                  <p className="text-xs text-stone-700 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E7E2D8] text-[11px] font-mono text-emerald-800 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                  <strong className="block text-[10px] uppercase tracking-wider text-emerald-900 mb-0.5">Observed Patina:</strong>
                  {story.patinaDescription}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisanal Heritage Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-14 space-y-6 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-900 block font-mono">
                Bicolano Artisanal Movement
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-[1.1] text-stone-900">
                NOT MASS-PRODUCED. <br />
                <span className="text-amber-800 font-normal italic">CRAFTED ONE LAST AT A TIME.</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg">
                By producing exclusively through pre-order batch drops, we eliminate deadstock inventory, pay living wages to Bicolano master cobblers, and keep thrifted denim out of landfills.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E7E2D8]">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight block text-blue-900">1,250+</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">Jeans Upcycled</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight block text-emerald-700">100%</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">QR Serialized</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight block text-amber-800">Zero</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500">Factory Waste</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onViewStory}
                  className="px-6 py-3.5 bg-[#FAF8F5] hover:bg-[#F3EFEA] text-stone-900 text-xs font-semibold tracking-wider uppercase rounded-xl border border-[#D3CBBE] transition-all inline-flex items-center gap-2.5 cursor-pointer shadow-xs"
                >
                  <span>Read Full Heritage & Impact</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative min-h-[320px] bg-stone-100">
              <img
                src={workshopImg}
                alt="Bicol Artisan Workshop"
                className="w-full h-full object-cover grayscale contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 border-[16px] border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal (Progressive Disclosure) */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#E7E2D8] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-[#FAF8F5] p-8 flex flex-col justify-between text-stone-900 border-b md:border-b-0 md:border-r border-[#E7E2D8]">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-blue-900 block font-bold">
                    Material Provenance & Specs
                  </span>
                  <h3 className="text-2xl font-serif font-bold tracking-tight mt-2 text-stone-900">
                    {selectedProductForModal.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                    {selectedProductForModal.description}
                  </p>
                </div>
                <div className="my-6 rounded-xl overflow-hidden border border-[#E7E2D8] bg-white">
                  <img
                    src={selectedProductForModal.image}
                    alt={selectedProductForModal.name}
                    className="w-full h-44 object-cover"
                  />
                </div>
                <div className="space-y-2 text-xs font-mono text-stone-600 border-t border-[#E7E2D8] pt-4">
                  <div className="flex justify-between">
                    <span>Thrift Denim:</span>
                    <span className="text-stone-900 font-semibold">{selectedProductForModal.ukaySource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Textile Weave:</span>
                    <span className="text-amber-800 font-semibold">{selectedProductForModal.textileOrigin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outsole:</span>
                    <span className="text-stone-900 font-semibold">{selectedProductForModal.soleType}</span>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6 flex flex-col justify-between bg-white">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold">
                      Crafting Features
                    </span>
                    <button
                      onClick={() => setSelectedProductForModal(null)}
                      className="text-xs font-mono uppercase tracking-widest text-stone-500 hover:text-stone-900 font-bold cursor-pointer"
                    >
                      Close [✕]
                    </button>
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {selectedProductForModal.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8] space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold tracking-wider uppercase text-[11px] text-stone-800 font-mono">Choose Size:</span>
                      <button
                        onClick={() => {
                          setSelectedProductForModal(null);
                          onOpenSizingModal();
                        }}
                        className="text-blue-900 hover:text-blue-700 font-mono text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Ruler className="w-3 h-3 text-amber-700" /> CM Calculator
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProductForModal.availableSizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSizeChange(selectedProductForModal.id, s)}
                          className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors ${
                            (selectedSizes[selectedProductForModal.id] || selectedProductForModal.availableSizes[0]) === s
                              ? 'bg-blue-900 text-white shadow-xs'
                              : 'bg-white text-stone-700 border border-[#D3CBBE] hover:border-stone-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-[#E7E2D8]">
                  <button
                    onClick={() => {
                      const sz = selectedSizes[selectedProductForModal.id] || selectedProductForModal.availableSizes[0];
                      setSelectedProductForModal(null);
                      onSelectProductForCheckout(selectedProductForModal, sz);
                    }}
                    className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-wider uppercase rounded-xl shadow-xs border border-blue-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Slot (₱{selectedProductForModal.price.toLocaleString()})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      const code = selectedProductForModal.code;
                      setSelectedProductForModal(null);
                      onViewArchive(code);
                    }}
                    className="w-full py-2 bg-transparent text-stone-500 hover:text-blue-900 text-xs font-mono text-center flex items-center justify-center gap-2 cursor-pointer tracking-wider transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5 text-blue-900" />
                    <span>View Living Archive Record ({selectedProductForModal.code})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
