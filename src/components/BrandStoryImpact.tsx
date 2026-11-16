import React, { useState, useEffect } from 'react';
import {
  Heart,
  Scissors,
  ArrowRight,
  Sparkles,
  Recycle,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { IMPACT_METRICS, workshopImg } from '../data/footwearData';

interface BrandStoryImpactProps {
  onReserveClick: () => void;
}

export const BrandStoryImpact: React.FC<BrandStoryImpactProps> = ({ onReserveClick }) => {
  const [counters, setCounters] = useState({
    denim: 0,
    pairs: 0,
    waste: 0,
    hinabi: 0
  });

  useEffect(() => {
    // Animate counters upward
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        denim: Math.floor(ease * IMPACT_METRICS.denimPantsUpcycled),
        pairs: Math.floor(ease * IMPACT_METRICS.pairsHandcrafted),
        waste: Math.floor(ease * IMPACT_METRICS.kgWasteDiverted),
        hinabi: Math.floor(ease * IMPACT_METRICS.yardsHinabiWoven),
      });
      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 bg-[#FAF8F5] text-stone-900">
      {/* Brand Story Hero */}
      <section className="space-y-6 text-center max-w-3xl mx-auto pt-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-blue-900 block">
          Born in Naga City, Camarines Sur
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.05]">
          FROM POST-CONSUMER DENIM <br />
          <span className="text-amber-800 font-normal italic">TO TIMELESS ARTISANAL SILHOUETTES.</span>
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          Pamitisan began inside an academic textile lab in Naga City with a vital mission: <em className="text-stone-800">"Why allow tons of high-grade thrifted denim to rot in landfills when Bicolano master cobblers can transform them into sustainable, all-season designer footwear?"</em>
        </p>
      </section>

      {/* Story Columns & Workshop Visual */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E7E2D8] bg-white p-3 shadow-md group">
          <div className="relative overflow-hidden rounded-xl bg-stone-100">
            <img
              src={workshopImg}
              alt="Pamitisan Master Cobbler Workshop in Naga City"
              className="w-full h-[440px] object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
                The Workshop Bench • Naga City
              </span>
              <p className="text-base sm:text-lg font-medium tracking-tight mt-1 text-stone-100">
                "Every pair carries the soul of the artisan and the natural patina of reclaimed denim."
              </p>
              <span className="text-xs font-mono text-stone-300 mt-1">
                — Master Kuya Nonoy, Head Cobbler
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-blue-900 block">
              Founder Story & Bicolano Roots
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
              FROM COLLEGE THESIS TO REVOLUTIONARY FOOTWEAR
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-mono">
              Conceptualized in 2021 as a 15-member college research thesis during the COVID-19 pandemic, the project was solo-ventured upon graduation in 2022 by founder <strong>Kinan</strong> to preserve a dream and see how far conscious Philippine footwear could go.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-mono">
              The name <strong className="text-stone-900 font-bold">Pamitisan</strong> is derived from the Bicolano root word <em className="text-blue-900 font-bold not-italic">bitis</em> (foot), translating to the lower slope, base, or foundation of a mountain. Rooted in the mantra <strong className="text-stone-900">"Make every step a purpose,"</strong> the brand transforms discarded thrifted jeans into 1-of-1 wearable art while providing an economic lifeline to local Bicolano cobblers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-6 bg-white rounded-xl border border-[#E7E2D8] space-y-2 shadow-xs">
              <div className="w-9 h-9 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg flex items-center justify-center">
                <Scissors className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold tracking-tight text-stone-900 uppercase mt-2">Zero-Waste "Ukay-to-Upper"</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-mono">
                Intercepting 14oz raw selvedge & vintage denim before landfills, delivering zero break-in comfort.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E7E2D8] space-y-2 shadow-xs">
              <div className="w-9 h-9 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold tracking-tight text-stone-900 uppercase mt-2">Artisan Economic Lifeline</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-mono">
                Direct partnerships paying fair wages to Bicolano cobblers and master handloom Hinabi weavers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: IMPACT TRACKER SECTION */}
      <section className="impact-tracker bg-white rounded-2xl p-8 sm:p-14 border border-[#E7E2D8] shadow-sm" id="impact">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-900 font-bold">
              Verified Sustainability Ledger
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
              OUR FOOTPRINT IN <span className="text-amber-800 font-normal italic">NUMBERS</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-stone-600 max-w-xl mx-auto tracking-wide">
              Verified environmental and cultural metrics calculated across all serialized Pamitisan batches.
            </p>
          </div>

          <div className="impact-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="impact-card bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] text-center space-y-2 shadow-xs">
              <span className="counter font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 block">
                {counters.denim.toLocaleString()}+
              </span>
              <p className="text-[11px] font-mono text-stone-800 font-bold uppercase tracking-wider">
                Jeans Upcycled
              </p>
              <span className="text-[10px] font-mono text-stone-500 block">
                Bicol Thrift Hubs
              </span>
            </div>
            <div className="impact-card bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] text-center space-y-2 shadow-xs">
              <span className="counter font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-700 block">
                {counters.pairs.toLocaleString()}+
              </span>
              <p className="text-[11px] font-mono text-stone-800 font-bold uppercase tracking-wider">
                Pairs Handcrafted
              </p>
              <span className="text-[10px] font-mono text-stone-500 block">
                Zero Deadstock
              </span>
            </div>
            <div className="impact-card bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] text-center space-y-2 shadow-xs">
              <span className="counter font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 block">
                {counters.waste.toLocaleString()}
              </span>
              <p className="text-[11px] font-mono text-stone-800 font-bold uppercase tracking-wider">
                kg Waste Diverted
              </p>
              <span className="text-[10px] font-mono text-stone-500 block">
                Regional Landfills
              </span>
            </div>
            <div className="impact-card bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] text-center space-y-2 shadow-xs">
              <span className="counter font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-700 block">
                {counters.hinabi.toLocaleString()}+
              </span>
              <p className="text-[11px] font-mono text-stone-800 font-bold uppercase tracking-wider">
                Yards Woven
              </p>
              <span className="text-[10px] font-mono text-stone-500 block">
                Handloom Guilds
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Ethical Pipeline */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-blue-900">
            Transparency & Process
          </span>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-stone-900">
            HOW EVERY SILHOUETTE IS CRAFTED
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <span className="font-mono text-xs text-blue-900 font-bold tracking-widest">STAGE // 01</span>
            <h3 className="text-sm font-bold tracking-tight uppercase text-stone-900">
              Curated Thrift Extraction
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We hand-select heavy cotton denim bales in Naga City, prioritizing resilient raw selvedge and vintage weaves.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <span className="font-mono text-xs text-blue-900 font-bold tracking-widest">STAGE // 02</span>
            <h3 className="text-sm font-bold tracking-tight uppercase text-stone-900">
              Hinabi Loom Weaving
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Local master weavers create geometric Hinabi and Inabel textile panels using manual wooden handlooms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <span className="font-mono text-xs text-blue-900 font-bold tracking-widest">STAGE // 03</span>
            <h3 className="text-sm font-bold tracking-tight uppercase text-stone-900">
              Bench Lasting & Stitching
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Senior cobblers mold the upper onto ergonomic wooden shoe lasts, cementing to vulcanized eco-rubber crepe outsoles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E7E2D8] space-y-3 shadow-xs">
            <span className="font-mono text-xs text-blue-900 font-bold tracking-widest">STAGE // 04</span>
            <h3 className="text-sm font-bold tracking-tight uppercase text-stone-900">
              Archive QR Serialization
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Each pair receives its serial certificate number linked to its physical QR shoebox tag before dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold tracking-tight text-stone-900">
            JOIN THE PURPOSE-DRIVEN STRIDE
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Batch 05 pre-orders are currently active. Reserve your custom hand-stitched pair before capacity caps at 50 units.
          </p>
        </div>
        <button
          onClick={onReserveClick}
          className="px-7 py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-xl shadow-xs border border-blue-950 transition-all flex items-center gap-3 whitespace-nowrap cursor-pointer"
        >
          <span>Reserve Batch Slot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
