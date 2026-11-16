import React, { useState } from 'react';
import {
  Feather,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Footprints,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  Thermometer,
  Zap
} from 'lucide-react';

interface ZoneDetail {
  id: string;
  name: string;
  massMarketText: string;
  pamitisanText: string;
  icon: string;
}

const ZONES: ZoneDetail[] = [
  {
    id: 'achilles',
    name: 'Achilles & Ankle Collar',
    massMarketText: 'Rigid cardboard and unwashed synthetic binding cut into the heel, causing friction blisters during the first 2-4 weeks.',
    pamitisanText: 'Pre-washed 14oz thrifted denim is naturally softened with padded cotton drill collar for zero friction from Day 1.',
    icon: '🩹'
  },
  {
    id: 'vamp',
    name: 'Forefoot Crease & Toe Box',
    massMarketText: 'Industrial 12oz canvas resists natural bending, pinching the pinky toe and creating painful forefoot crease pressure points.',
    pamitisanText: 'Organic cotton fibers have pre-relaxed horizontal stretch, yielding to your stride without stiff pinch points.',
    icon: '⚡'
  },
  {
    id: 'footbed',
    name: 'Insole & Arch Support',
    massMarketText: 'Flat, low-density cardboard/EVA footbeds collapse after 20km, leaving zero arch support for long walking commutes.',
    pamitisanText: 'Orthopedic dual-density recycled EVA topped with natural shock-absorbing cork conforms to your arch.',
    icon: '☁️'
  },
  {
    id: 'breathability',
    name: 'Tropical Climate Breathability',
    massMarketText: 'Heavy chemical glues and synthetic polyester mesh trap heat and humidity, causing foot perspiration in Philippine weather.',
    pamitisanText: '100% natural breathable denim and unbleached canvas facilitate airflow even in 32°C tropical heat.',
    icon: '🍃'
  }
];

export const ErgonomicsFlexComparison: React.FC = () => {
  const [activeShoe, setActiveShoe] = useState<'mass_market' | 'pamitisan'>('pamitisan');
  const [selectedZone, setSelectedZone] = useState<ZoneDetail>(ZONES[0]);

  return (
    <section id="ergonomics-flex" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white text-stone-900 border-t border-[#E7E2D8]">
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-900 border border-red-200 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-red-700" />
            <span>Biomechanics & Anatomical Comfort Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
            DITCH THE <span className="text-red-800 italic font-normal">"STIFF CANVAS TAX"</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-mono leading-relaxed">
            Why do standard factory canvas sneakers give you blisters for weeks? Compare the pressure dynamics of mass-market stiff canvas versus Pamitisan's pre-softened, upcycled denim footwear.
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="flex justify-center">
          <div className="bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#D3CBBE] inline-flex gap-2 font-mono text-xs shadow-inner">
            <button
              type="button"
              onClick={() => setActiveShoe('mass_market')}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeShoe === 'mass_market'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <AlertOctagon className="w-4 h-4 text-red-400" />
              <span>Mass-Market Factory Canvas</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveShoe('pamitisan')}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeShoe === 'pamitisan'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Pamitisan Upcycled Denim</span>
            </button>
          </div>
        </div>

        {/* Anatomical Pressure Map & Diagnostic Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Diagram Left */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E7E2D8] shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-3 font-mono text-xs">
              <span className="font-bold text-stone-900 uppercase">
                {activeShoe === 'mass_market' ? '⚠️ High-Friction Pressure Diagram' : '✅ Ergonomic Zero-Friction Contour'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                activeShoe === 'mass_market' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {activeShoe === 'mass_market' ? 'High Blister Risk (Break-in: 3 Weeks)' : 'Zero Break-In (Day 1 Softness)'}
              </span>
            </div>

            {/* Visual Pressure Mock Silhouette Canvas */}
            <div className={`relative h-72 sm:h-80 rounded-2xl p-6 flex flex-col justify-between border transition-all ${
              activeShoe === 'mass_market'
                ? 'bg-gradient-to-br from-red-50 to-stone-100 border-red-300'
                : 'bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-300'
            }`}>
              
              {/* Interactive Pressure Hotspots */}
              <div className="grid grid-cols-2 gap-4 h-full">
                
                {/* Achilles Hotspot */}
                <div
                  onClick={() => setSelectedZone(ZONES[0])}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    selectedZone.id === 'achilles'
                      ? 'ring-2 ring-blue-900 bg-white shadow-md'
                      : 'bg-white/80 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono">1. Heel & Collar</span>
                    <span className="text-sm">{ZONES[0].icon}</span>
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold block ${
                      activeShoe === 'mass_market' ? 'text-red-700' : 'text-emerald-700'
                    }`}>
                      {activeShoe === 'mass_market' ? '🔴 85% Blister Friction' : '🟢 0% Heel Pinch'}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono line-clamp-1">Click to inspect</span>
                  </div>
                </div>

                {/* Forefoot Crease Hotspot */}
                <div
                  onClick={() => setSelectedZone(ZONES[1])}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    selectedZone.id === 'vamp'
                      ? 'ring-2 ring-blue-900 bg-white shadow-md'
                      : 'bg-white/80 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono">2. Flex Vamp & Toe</span>
                    <span className="text-sm">{ZONES[1].icon}</span>
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold block ${
                      activeShoe === 'mass_market' ? 'text-red-700' : 'text-emerald-700'
                    }`}>
                      {activeShoe === 'mass_market' ? '🔴 Stiff Crease Ridge' : '🟢 Natural Fiber Flex'}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono line-clamp-1">Click to inspect</span>
                  </div>
                </div>

                {/* Footbed & Arch Hotspot */}
                <div
                  onClick={() => setSelectedZone(ZONES[2])}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    selectedZone.id === 'footbed'
                      ? 'ring-2 ring-blue-900 bg-white shadow-md'
                      : 'bg-white/80 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono">3. Arch Insole</span>
                    <span className="text-sm">{ZONES[2].icon}</span>
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold block ${
                      activeShoe === 'mass_market' ? 'text-red-700' : 'text-emerald-700'
                    }`}>
                      {activeShoe === 'mass_market' ? '🔴 Flat Cardboard Board' : '🟢 Dual Recycled EVA'}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono line-clamp-1">Click to inspect</span>
                  </div>
                </div>

                {/* Tropical Airflow Hotspot */}
                <div
                  onClick={() => setSelectedZone(ZONES[3])}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    selectedZone.id === 'breathability'
                      ? 'ring-2 ring-blue-900 bg-white shadow-md'
                      : 'bg-white/80 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono">4. Tropical Thermal</span>
                    <span className="text-sm">{ZONES[3].icon}</span>
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold block ${
                      activeShoe === 'mass_market' ? 'text-red-700' : 'text-emerald-700'
                    }`}>
                      {activeShoe === 'mass_market' ? '🔴 Trapped Moisture' : '🟢 Open Weave Airflow'}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono line-clamp-1">Click to inspect</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Metric Scorecard Comparison */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center font-mono">
              <div className="p-2.5 bg-white rounded-xl border border-[#E7E2D8]">
                <span className="text-[9px] uppercase text-stone-500 block font-semibold">Break-In</span>
                <strong className={`text-xs ${activeShoe === 'mass_market' ? 'text-red-700' : 'text-emerald-700'}`}>
                  {activeShoe === 'mass_market' ? '2-4 Weeks' : '0 Days (Instant)'}
                </strong>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#E7E2D8]">
                <span className="text-[9px] uppercase text-stone-500 block font-semibold">Blister Rate</span>
                <strong className={`text-xs ${activeShoe === 'mass_market' ? 'text-red-700' : 'text-emerald-700'}`}>
                  {activeShoe === 'mass_market' ? 'High (~70%)' : '< 1% (Verified)'}
                </strong>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#E7E2D8]">
                <span className="text-[9px] uppercase text-stone-500 block font-semibold">Cushioning</span>
                <strong className={`text-xs ${activeShoe === 'mass_market' ? 'text-stone-700' : 'text-emerald-700'}`}>
                  {activeShoe === 'mass_market' ? 'Single Board' : 'Memory + Cork'}
                </strong>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#E7E2D8]">
                <span className="text-[9px] uppercase text-stone-500 block font-semibold">Textile Origin</span>
                <strong className={`text-xs ${activeShoe === 'mass_market' ? 'text-stone-700' : 'text-blue-900'}`}>
                  {activeShoe === 'mass_market' ? 'Mass Synthetic' : '100% Upcycled'}
                </strong>
              </div>
            </div>

          </div>

          {/* Deep Zone Inspection Right */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E7E2D8] space-y-4 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedZone.icon}</span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {selectedZone.name}
                </h3>
              </div>

              {/* Mass Market Comparison Box */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 uppercase">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>The Stiff Canvas Problem</span>
                </div>
                <p className="text-xs text-red-950 leading-relaxed">
                  {selectedZone.massMarketText}
                </p>
              </div>

              {/* Pamitisan Artisanal Solution Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  <span>The Pamitisan Craft Solution</span>
                </div>
                <p className="text-xs text-blue-950 leading-relaxed">
                  {selectedZone.pamitisanText}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7E2D8] flex items-center gap-2 text-xs text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Backed by our <strong>14-Day Zero-Risk Fit & Comfort Guarantee</strong>.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
