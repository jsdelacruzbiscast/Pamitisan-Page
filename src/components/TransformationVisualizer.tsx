import React, { useState } from 'react';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Footprints,
  Sliders,
  Feather,
  Flame,
  Check,
  Layers
} from 'lucide-react';
import { workshopImg, etnikoImg } from '../data/footwearData';

export const TransformationVisualizer: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [selectedTopic, setSelectedTopic] = useState<'origin_line' | 'story_strata' | 'zero_breakin'>('zero_breakin');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white text-stone-900 border-t border-[#E7E2D8]">
      <div className="space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5 text-blue-900" />
            <span>The "Ukay-to-Upper" Craft Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
            RADICAL TRANSPARENCY: <span className="text-amber-800 italic font-normal">UKAY TO UPPER</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-mono leading-relaxed">
            Every pair starts as rugged, discarded denim intercepted from landfills. See how Master Bicolano artisans deconstruct, pattern, and hand-stitch raw jeans into 1-of-1 wearable art.
          </p>
        </div>

        {/* Interactive Before & After Transformation Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Slider Left */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-4 sm:p-6 rounded-3xl border border-[#E7E2D8] shadow-xs space-y-4">
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden select-none border border-[#D3CBBE]">
              {/* After: Finished Shoe */}
              <img
                src={etnikoImg}
                alt="Finished Upcycled Pamitisan ETNIKO Sneaker"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-stone-700">
                After: 1-of-1 Handcrafted Sneaker Upper
              </div>

              {/* Before: Raw Jeans & Workshop Workbench (Clipped by sliderPos) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={workshopImg}
                  alt="Raw Thrifted Jeans at Naga Atelier Workbench"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute bottom-4 left-4 bg-blue-950/90 text-white px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-blue-800">
                  Before: Intercepted Thrift Jeans & Raw Patterns
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-xl flex items-center justify-center cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 bg-blue-900 text-white rounded-full border-2 border-white flex items-center justify-center text-xs font-mono font-bold shadow-lg">
                  ⟷
                </div>
              </div>

              {/* Slider Input overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                aria-label="Slide to compare raw thrifted jeans and finished handcrafted sneaker"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-stone-600 px-2">
              <span>← Drag left: Raw Thrift Denim</span>
              <span className="font-bold text-blue-900">Interactive Transformation Comparison</span>
              <span>Drag right: Finished Upper →</span>
            </div>
          </div>

          {/* Educational Insights Right */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-900 font-bold block">
              The Anatomy of Conscious Footwear
            </span>

            <div className="space-y-3">
              {/* Tab 1: Zero Break-In */}
              <div
                onClick={() => setSelectedTopic('zero_breakin')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedTopic === 'zero_breakin'
                    ? 'bg-[#FAF8F5] border-blue-900 shadow-xs'
                    : 'bg-white border-[#E7E2D8] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-serif text-stone-900 flex items-center gap-2">
                    <Feather className="w-4 h-4 text-emerald-600" />
                    Zero Break-In vs. The "Stiff Canvas Tax"
                  </h4>
                  {selectedTopic === 'zero_breakin' && <Check className="w-4 h-4 text-blue-900" />}
                </div>
                <p className="text-xs text-stone-600 font-mono mt-1.5 leading-relaxed">
                  Mass-market sneakers use rigid, synthetic-backed canvas that requires painful weeks to break in and causes heel blisters. Pre-loved thrifted denim has natural fiber "give" that molds to your foot instantly from step one.
                </p>
              </div>

              {/* Tab 2: The Origin Line */}
              <div
                onClick={() => setSelectedTopic('origin_line')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedTopic === 'origin_line'
                    ? 'bg-[#FAF8F5] border-blue-900 shadow-xs'
                    : 'bg-white border-[#E7E2D8] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-serif text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    The "Origin Line" (Exposed Outseam)
                  </h4>
                  {selectedTopic === 'origin_line' && <Check className="w-4 h-4 text-blue-900" />}
                </div>
                <p className="text-xs text-stone-600 font-mono mt-1.5 leading-relaxed">
                  The visible selvedge seam along the vamp is not a defect—it is our badge of honor proving the garment was cut from real vintage jeans, turning each shoe into an insider conversation piece.
                </p>
              </div>

              {/* Tab 3: Story Strata */}
              <div
                onClick={() => setSelectedTopic('story_strata')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedTopic === 'story_strata'
                    ? 'bg-[#FAF8F5] border-blue-900 shadow-xs'
                    : 'bg-white border-[#E7E2D8] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-serif text-stone-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-900" />
                    "Story Strata" (Layered Textile Eyelets)
                  </h4>
                  {selectedTopic === 'story_strata' && <Check className="w-4 h-4 text-blue-900" />}
                </div>
                <p className="text-xs text-stone-600 font-mono mt-1.5 leading-relaxed">
                  Eyelets are reinforced with multi-layered denim and deadstock canvas layers, preventing tear-out under heavy tension during daily walking commutes or regional hikes.
                </p>
              </div>
            </div>

            {/* Durability Guarantee Callout */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E7E2D8] flex items-center gap-2.5 text-xs text-stone-700 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Tropical Monsoon Durability:</strong> Double-bonded rubber outsoles tested against wet Philippine road conditions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
