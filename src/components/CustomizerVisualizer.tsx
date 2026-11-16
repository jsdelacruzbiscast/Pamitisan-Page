import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Check,
  ArrowRight,
  ShieldCheck,
  Layers,
  Palette,
  Tag,
  Hammer,
  Eye,
  Scissors
} from 'lucide-react';
import { ShoeProduct } from '../types';
import { PRODUCTS, etnikoImg, mayonImg, hinabiImg, workshopImg } from '../data/footwearData';

interface CustomizerVisualizerProps {
  onSelectProductForCheckout: (product: ShoeProduct, size?: number, customData?: { initials: string; denimShade: string }) => void;
}

const WASH_OPTIONS = [
  { id: 'deep_indigo', name: 'Raw Deep Indigo', colorHex: '#1A2942', accentBg: 'bg-[#1A2942]', border: 'border-blue-900', desc: '14oz unwashed crisp thrifted denim with rich dark indigo dye.' },
  { id: 'stonewash_vintage', name: 'Stonewash Vintage', colorHex: '#4A6B82', accentBg: 'bg-[#4A6B82]', border: 'border-sky-800', desc: 'Softened, pre-loved light blue wash with natural whiskering.' },
  { id: 'volcanic_ash', name: 'Mayon Volcanic Ash', colorHex: '#3A3A3C', accentBg: 'bg-[#3A3A3C]', border: 'border-stone-800', desc: 'Gritty charcoal denim salvaged from black and dark-dyed jeans.' },
  { id: 'patchwork_split', name: 'Artisan Patchwork Split', colorHex: '#2C3E50', accentBg: 'bg-gradient-to-r from-[#1A2942] to-[#4A6B82]', border: 'border-indigo-900', desc: 'Dual-tone paneling combining deep indigo vamp with stonewash quarter.' }
];

const WEAVE_OPTIONS = [
  { id: 'bicol_terracotta', name: 'Bicol Geometric Terracotta', hex: '#C85A32', desc: 'Traditional Camarines Sur handloom weave with warm clay tones.' },
  { id: 'inabel_diamond', name: 'Northern Inabel Diamond', hex: '#8B5A2B', desc: 'Geometric heritage weave symbolizing mountain peaks and protection.' },
  { id: 'monochrome_cream', name: 'Raw Unbleached Monochrome', hex: '#E5DFD3', desc: 'Natural off-white cotton handloom weave for subtle, minimalist styling.' }
];

const HARDWARE_OPTIONS = [
  { id: 'brass', name: 'Antiqued Brass', icon: '🟡' },
  { id: 'gunmetal', name: 'Matte Gunmetal', icon: '⚫' },
  { id: 'copper', name: 'Raw Hammered Copper', icon: '🟤' }
];

export const CustomizerVisualizer: React.FC<CustomizerVisualizerProps> = ({
  onSelectProductForCheckout
}) => {
  const [selectedShoeIndex, setSelectedShoeIndex] = useState<number>(1); // ETNIKO Classic by default
  const [selectedWash, setSelectedWash] = useState(WASH_OPTIONS[0]);
  const [selectedWeave, setSelectedWeave] = useState(WEAVE_OPTIONS[0]);
  const [selectedHardware, setSelectedHardware] = useState(HARDWARE_OPTIONS[0]);
  const [monogramInitials, setMonogramInitials] = useState<string>('PAMS');
  const [activeView, setActiveView] = useState<'upper' | 'heel_stamp' | 'materials'>('upper');

  const currentProduct = PRODUCTS[selectedShoeIndex] || PRODUCTS[0];

  const handleClaimSpec = () => {
    onSelectProductForCheckout(currentProduct, 40, {
      initials: monogramInitials.trim().toUpperCase() || 'PAMS',
      denimShade: selectedWash.name
    });
  };

  return (
    <section id="customizer-atelier" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF8F5] text-stone-900 border-t border-[#E7E2D8]">
      <div className="space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Co-Creation Atelier (1-of-1 Spec)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
            DESIGN YOUR <span className="text-amber-800 italic font-normal">BESPOKE SPEC</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-mono leading-relaxed">
            Co-create your footwear in real time. Choose your silhouette, curate thrifted denim wash tones, select handloom patterns, and preview your custom initials hot-stamped onto the vegetable-tanned leather heel counter.
          </p>
        </div>

        {/* 2-Column Co-Creation Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Photorealistic Visualizer & Dynamic Leather Stamp */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2D8] shadow-sm space-y-6 relative overflow-hidden">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-blue-900 uppercase">Live Atelier Preview</span>
                </div>
                <div className="text-[11px] text-stone-500 uppercase tracking-wider">
                  Spec: <strong className="text-stone-900 font-bold">{currentProduct.code}-{selectedWash.id.toUpperCase().slice(0, 3)}</strong>
                </div>
              </div>

              {/* Visual Canvas Stage */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-100 border border-[#D3CBBE] flex items-center justify-center">
                
                {/* Background Wash Atmosphere Tint */}
                <div
                  className="absolute inset-0 opacity-15 mix-blend-multiply transition-colors duration-700 pointer-events-none"
                  style={{ backgroundColor: selectedWash.colorHex }}
                />

                {/* Primary Shoe Image */}
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-all duration-500 scale-105"
                />

                {/* Simulated Floating Real-Time Heel Monogram Leather Stamp Badge */}
                <div className="absolute top-4 right-4 bg-[#DDB892]/95 text-stone-900 border-2 border-[#9C6644] p-3 rounded-xl shadow-lg backdrop-blur-xs font-mono text-center min-w-[110px] animate-in fade-in zoom-in-95">
                  <span className="text-[9px] uppercase tracking-widest text-[#7F4F24] font-bold block">
                    Leather Heel Stamp
                  </span>
                  <div className="text-xl font-serif font-extrabold tracking-widest text-[#4A2810] border-y border-[#B08968] py-0.5 my-1">
                    {monogramInitials.trim().toUpperCase() || 'PAMS'}
                  </div>
                  <span className="text-[8px] uppercase tracking-wider text-[#7F4F24] block">
                    Naga City Atelier
                  </span>
                </div>

                {/* Live Spec Badges Overlay */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <div className="bg-stone-900/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 border border-stone-700">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: selectedWash.colorHex }} />
                    <span>Wash: {selectedWash.name}</span>
                  </div>
                  <div className="bg-stone-900/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 border border-stone-700">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: selectedWeave.hex }} />
                    <span>Weave: {selectedWeave.name}</span>
                  </div>
                </div>
              </div>

              {/* Visual Angle Toggles */}
              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveView('upper')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold uppercase transition-all cursor-pointer ${
                    activeView === 'upper'
                      ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                      : 'bg-[#FAF8F5] text-stone-700 border-[#D3CBBE] hover:bg-stone-100'
                  }`}
                >
                  Full Silhouette
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('heel_stamp')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold uppercase transition-all cursor-pointer ${
                    activeView === 'heel_stamp'
                      ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                      : 'bg-[#FAF8F5] text-stone-700 border-[#D3CBBE] hover:bg-stone-100'
                  }`}
                >
                  Heel Stamp Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('materials')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold uppercase transition-all cursor-pointer ${
                    activeView === 'materials'
                      ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                      : 'bg-[#FAF8F5] text-stone-700 border-[#D3CBBE] hover:bg-stone-100'
                  }`}
                >
                  Textile Swatches
                </button>
              </div>

              {/* Price & Summary Footer inside Visualizer */}
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Configured Base Model</span>
                  <strong className="text-sm font-serif font-bold text-stone-900 block">{currentProduct.name}</strong>
                  <span className="text-xs text-emerald-700 font-bold">Includes Free 1-of-1 Monogram Embossing</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Pre-Order Price</span>
                  <span className="text-xl font-bold text-blue-900">₱{currentProduct.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Live Inputs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Base Silhouette Model */}
            <div className="bg-white p-6 rounded-3xl border border-[#E7E2D8] shadow-xs space-y-3 font-mono">
              <label className="text-[11px] font-bold uppercase tracking-wider text-blue-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-blue-900" />
                  1. Select Base Silhouette
                </span>
                <span className="text-[10px] text-stone-500">5 Models</span>
              </label>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setSelectedShoeIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedShoeIndex === idx
                        ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                        : 'bg-[#FAF8F5] text-stone-800 border-[#D3CBBE] hover:border-stone-400'
                    }`}
                  >
                    <strong className="block text-[11px] truncate">{prod.name}</strong>
                    <span className={`text-[10px] block ${selectedShoeIndex === idx ? 'text-blue-200' : 'text-stone-500'}`}>
                      ₱{prod.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Thrifted Denim Wash Selection */}
            <div className="bg-white p-6 rounded-3xl border border-[#E7E2D8] shadow-xs space-y-3 font-mono">
              <label className="text-[11px] font-bold uppercase tracking-wider text-blue-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-900" />
                  2. Select Curated Denim Wash
                </span>
                <span className="text-[10px] text-stone-500 font-normal">{selectedWash.name}</span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {WASH_OPTIONS.map((wash) => (
                  <button
                    key={wash.id}
                    type="button"
                    onClick={() => setSelectedWash(wash)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      selectedWash.id === wash.id
                        ? 'bg-[#FAF8F5] border-blue-900 ring-2 ring-blue-900/20'
                        : 'bg-white border-[#E7E2D8] hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-stone-300 shadow-2xs mt-0.5"
                      style={{ backgroundColor: wash.colorHex }}
                    />
                    <div className="min-w-0">
                      <strong className="block text-xs font-bold text-stone-900 truncate">{wash.name}</strong>
                      <span className="text-[10px] text-stone-500 line-clamp-1">{wash.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Heritage Handloom Weave Accent */}
            <div className="bg-white p-6 rounded-3xl border border-[#E7E2D8] shadow-xs space-y-3 font-mono">
              <label className="text-[11px] font-bold uppercase tracking-wider text-blue-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-900" />
                  3. Indigenous Handloom Weave Accent
                </span>
                <span className="text-[10px] text-stone-500 font-normal">{selectedWeave.name}</span>
              </label>

              <div className="space-y-2">
                {WEAVE_OPTIONS.map((weave) => (
                  <button
                    key={weave.id}
                    type="button"
                    onClick={() => setSelectedWeave(weave)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedWeave.id === weave.id
                        ? 'bg-[#FAF8F5] border-amber-800 ring-2 ring-amber-800/20'
                        : 'bg-white border-[#E7E2D8] hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-stone-300 shadow-2xs"
                        style={{ backgroundColor: weave.hex }}
                      />
                      <span className="text-xs font-bold text-stone-900 truncate">{weave.name}</span>
                    </div>
                    {selectedWeave.id === weave.id && <Check className="w-3.5 h-3.5 text-amber-800 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Leather Heel Monogram (Live Text Input) */}
            <div className="bg-white p-6 rounded-3xl border-2 border-amber-900/40 shadow-xs space-y-3 font-mono bg-gradient-to-br from-white to-[#FAF6F0]">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-800" />
                  4. Custom Leather Heel Monogram (Free)
                </label>
                <span className="text-[10px] text-amber-800 font-semibold uppercase">Max 4 Letters</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Hot-stamped by hand into 100% vegetable-tanned leather placed above the heel counter.
              </p>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  maxLength={4}
                  value={monogramInitials}
                  onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                  placeholder="e.g. JD, MK, PAMS"
                  className="flex-1 px-4 py-2.5 bg-white border border-[#D3CBBE] rounded-xl text-sm font-mono font-bold tracking-widest text-stone-900 focus:outline-none focus:border-amber-800 uppercase"
                />
                <button
                  type="button"
                  onClick={() => setMonogramInitials('URAG')}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-mono font-bold uppercase rounded-xl transition-colors cursor-pointer"
                >
                  "URAG" (Grit)
                </button>
              </div>
            </div>

            {/* Step 5: Direct Pre-Order Bespoke CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleClaimSpec}
                className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg border border-blue-950 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer"
              >
                <span>Reserve This Bespoke Spec (₱{currentProduct.price.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-stone-600">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Zero-Risk Fit Guarantee
                </span>
                <span>•</span>
                <span>50% Atelier Deposit Available</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
