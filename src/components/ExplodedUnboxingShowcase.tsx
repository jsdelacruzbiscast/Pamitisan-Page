import React, { useState } from 'react';
import {
  Package,
  QrCode,
  FileCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Gift,
  Eye,
  Info,
  Maximize2
} from 'lucide-react';
import { packagingImg, etnikoImg } from '../data/footwearData';

interface UnboxingLayer {
  id: string;
  stepNumber: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  icon: string;
}

const UNBOXING_LAYERS: UnboxingLayer[] = [
  {
    id: 'box',
    stepNumber: '01',
    name: 'The Living Archive Box',
    title: 'Solid Kraft & Timber Presentation Case',
    subtitle: '100% Recycled & Reusable Keepsake',
    description: 'Constructed from heavy FSC-certified recycled rigid board with hand-screened water-based botanical ink and custom wax seal stamping.',
    specs: [
      'Dimensions: 34cm x 22cm x 13cm',
      'Hand-stamped in Naga City Atelier',
      'Magnetic closure with natural jute pull tab'
    ],
    icon: '📦'
  },
  {
    id: 'dustbag',
    stepNumber: '02',
    name: 'Artisan Dustbag',
    title: 'Unbleached Organic Cotton Travel Pouch',
    subtitle: 'Breathable Storage for Slow Travel',
    description: 'Every pair rests inside a custom woven unbleached cotton dustbag with natural drawstring cord, screen-printed with the Pamitisan mountain base insignia.',
    specs: [
      '100% Unbleached Heavy Cotton Muslin',
      'Screenprinted with non-toxic soy ink',
      'Protects handwoven textiles during transit'
    ],
    icon: '🎒'
  },
  {
    id: 'certificate',
    stepNumber: '03',
    name: 'Pedigree Certificate',
    title: 'Individual Parchment Certificate of Authenticity',
    subtitle: 'Radical Provenance & Maker Ledger',
    description: 'A physical parchment document officially signed by the master cobbler and founder Kinan, detailing the exact thrift shop provenance and textile grams diverted.',
    specs: [
      'Serialized Unit Code (e.g. PAM-0184-B05)',
      'Named Master Cobbler & Weaver Signature',
      'Exact Grams of Textile Waste Intercepted'
    ],
    icon: '📜'
  },
  {
    id: 'qr_tag',
    stepNumber: '04',
    name: 'Living Archive QR Tag',
    title: 'Brass-Plated Micro-Documentary Key',
    subtitle: 'The "Purple Cow" Social Currency',
    description: 'An individually laser-etched brass medallion attached to the eyelet or tongue. Scanning opens an unlisted 30-second video of your exact shoe being made.',
    specs: [
      'Direct mobile phone camera scan',
      'Watch your thrifted jeans being cut & stitched',
      'Instant shareable status link for social media'
    ],
    icon: '🏷️'
  },
  {
    id: 'footwear',
    stepNumber: '05',
    name: '1-of-1 Wearable Art',
    title: 'Hand-Finished Philippine Heritage Footwear',
    subtitle: 'Zero Break-In Everyday Companion',
    description: 'Your custom-fitted pair, treated with eco-friendly water repellent and hand-buffed with natural beeswax before leaving the Bicol workbench.',
    specs: [
      'Exposed Origin Line denim selvedge',
      'Embossed custom leather heel monogram',
      'Orthopedic memory foam and vulcanized unit sole'
    ],
    icon: '👟'
  }
];

export const ExplodedUnboxingShowcase: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<UnboxingLayer>(UNBOXING_LAYERS[2]); // Certificate default

  return (
    <section id="unboxing-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF8F5] text-stone-900 border-t border-[#E7E2D8]">
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-blue-900" />
            <span>The "Purple Cow" Experience Design</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
            THE LIVING ARCHIVE <span className="text-amber-800 italic font-normal">UNBOXING</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-mono leading-relaxed">
            Not just footwear—a museum-grade collectible artifact. Explore the 5 tactile layers included in every single pair shipped from our Naga City workshop.
          </p>
        </div>

        {/* 5-Layer Interactive Carousel Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
          {UNBOXING_LAYERS.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveLayer(layer)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                activeLayer.id === layer.id
                  ? 'bg-blue-900 text-white border-blue-950 shadow-md ring-2 ring-blue-900/20'
                  : 'bg-white text-stone-700 border-[#E7E2D8] hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-base">{layer.icon}</span>
                <span className={`text-[10px] font-bold ${activeLayer.id === layer.id ? 'text-blue-200' : 'text-stone-400'}`}>
                  {layer.stepNumber}
                </span>
              </div>
              <strong className="block text-xs font-serif font-bold truncate">
                {layer.name}
              </strong>
            </button>
          ))}
        </div>

        {/* Exploded Showcase Main Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-[#E7E2D8] shadow-sm">
          
          {/* Visual Showcase Left */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-stone-100 border border-[#D3CBBE] h-80 sm:h-96">
            <img
              src={packagingImg}
              alt="Living Archive Packaging Box with QR Plaque and Pedigree Insert"
              className="w-full h-full object-cover"
            />
            
            {/* Dynamic Spotlight Callout Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-xs text-white p-4 rounded-xl border border-stone-700 font-mono text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{activeLayer.icon}</span>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-amber-400 block font-bold">
                    Layer {activeLayer.stepNumber} Focus
                  </span>
                  <strong className="text-sm font-serif font-bold">{activeLayer.name}</strong>
                </div>
              </div>
              <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-md text-stone-300">
                1-of-1 Included
              </span>
            </div>
          </div>

          {/* Deep Layer Details Right */}
          <div className="lg:col-span-6 space-y-6 font-mono">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
                <span>Layer {activeLayer.stepNumber} of 05</span>
                <span>•</span>
                <span>{activeLayer.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {activeLayer.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                {activeLayer.description}
              </p>
            </div>

            {/* Feature Specs */}
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E7E2D8] space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                Technical Specifications & Materials
              </span>
              <ul className="space-y-2 text-xs text-stone-800">
                {activeLayer.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Share & Gift Value Callout */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#products"
                className="flex-1 py-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-center shadow-xs border border-blue-950 flex items-center justify-center gap-1.5"
              >
                <span>Reserve in Batch 05 Drop</span>
              </a>
              <a
                href="#archive"
                className="py-3 px-5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center"
              >
                Scan Archive Code
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
