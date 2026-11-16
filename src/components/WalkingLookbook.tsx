import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Camera,
  Sparkles,
  ArrowRight,
  Footprints,
  Tag,
  Shirt,
  Calendar
} from 'lucide-react';
import { ShoeProduct } from '../types';
import { PRODUCTS, etnikoImg, mayonImg, hinabiImg } from '../data/footwearData';

interface LookbookItem {
  id: string;
  destination: string;
  locationCategory: string;
  occasion: string;
  shoeProductId: string;
  shoeName: string;
  price: number;
  image: string;
  stylingNotes: string;
  pairingTags: string[];
  distanceWalked: string;
}

const LOOKS: LookbookItem[] = [
  {
    id: 'look-1',
    destination: 'Naga City Heritage Route & Peñafrancia Walk',
    locationCategory: 'Cultural Urban Commute',
    occasion: 'Peñafrancia Festival & Naga Centro Stroll',
    shoeProductId: 'pamitisan-etniko-classic',
    shoeName: 'ETNIKO Classic Low-Cut Denim',
    price: 1800,
    image: etnikoImg,
    stylingNotes: 'Paired with unbleached organic linen button-down, rolled selvedge denim pants, and a minimalist canvas tote. Clean streetwear that lets the Hinabi accent shine.',
    pairingTags: ['Linen Button-Down', 'Cuffed Raw Denim', 'Canvas Tote'],
    distanceWalked: '12,400 Steps / Day'
  },
  {
    id: 'look-2',
    destination: 'Cagsawa Ruins & Mount Mayon Foothills',
    locationCategory: 'Regional Volcanic Trail',
    occasion: 'Weekend Slow Travel & Volcanic Ash Path',
    shoeProductId: 'pamitisan-etniko-high-cut',
    shoeName: 'ETNIKO High-Cut Denim Sneaker',
    price: 1900,
    image: mayonImg,
    stylingNotes: 'Paired with olive ripstop utility shorts, breathable ribbed cotton crew socks, and a lightweight windbreaker. Rugged ankle support for uneven terrain.',
    pairingTags: ['Ripstop Utility Shorts', 'Ribbed Crew Socks', 'Technical Windbreaker'],
    distanceWalked: '16,800 Steps / Day'
  },
  {
    id: 'look-3',
    destination: 'Intramuros Historic Walled City, Manila',
    locationCategory: 'Cobblestone & Heritage Art Walk',
    occasion: 'Museum Gallery Hopping & Café Working',
    shoeProductId: 'pamitisan-etniko-habi',
    shoeName: 'ETNIKO Habi Sneakers (Premium Weaves)',
    price: 2400,
    image: hinabiImg,
    stylingNotes: 'Paired with modern Barong-inspired linen overshirt, tailored charcoal pleated trousers, and brass wireframe sunglasses. Elevating traditional textiles into high-fashion.',
    pairingTags: ['Modern Barong Overshirt', 'Pleated Charcoal Trousers', 'Vintage Brass Frames'],
    distanceWalked: '9,500 Steps / Day'
  },
  {
    id: 'look-4',
    destination: 'Siargao & Catanduanes Island Strolls',
    locationCategory: 'Coastal Boardwalk & Island Hopping',
    occasion: 'Sunset Pier Walks & Easy Slip-On Days',
    shoeProductId: 'pamitisan-slip-on',
    shoeName: 'Pamitisan Heritage Slip-On',
    price: 1500,
    image: hinabiImg,
    stylingNotes: 'Paired with relaxed hemp drawstring shorts, open camp-collar floral shirt, and woven straw hat. Effortless zero-friction on-and-off movement.',
    pairingTags: ['Hemp Drawstring Shorts', 'Camp Collar Shirt', 'Woven Straw Hat'],
    distanceWalked: '8,200 Steps / Day'
  }
];

interface WalkingLookbookProps {
  onSelectProductForCheckout: (product: ShoeProduct, size?: number) => void;
}

export const WalkingLookbook: React.FC<WalkingLookbookProps> = ({
  onSelectProductForCheckout
}) => {
  const [selectedLook, setSelectedLook] = useState<LookbookItem>(LOOKS[0]);

  const handleShopLook = (look: LookbookItem) => {
    const matched = PRODUCTS.find((p) => p.id === look.shoeProductId) || PRODUCTS[0];
    onSelectProductForCheckout(matched, 40);
  };

  return (
    <section id="walking-lookbook" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white text-stone-900 border-t border-[#E7E2D8]">
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Style & Slow Travel Lookbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
            PHILIPPINE HERITAGE <span className="text-amber-800 italic font-normal">WALKING LOGS</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-mono leading-relaxed">
            See how conscious creators and slow travelers style Pamitisan across iconic Philippine landscapes—from Naga City cobblestones to Siargao coastal paths.
          </p>
        </div>

        {/* 4 Lookbook Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKS.map((look) => (
            <div
              key={look.id}
              onClick={() => setSelectedLook(look)}
              className={`rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                selectedLook.id === look.id
                  ? 'border-blue-900 shadow-lg ring-2 ring-blue-900/20 bg-[#FAF8F5]'
                  : 'border-[#E7E2D8] bg-white hover:shadow-md'
              }`}
            >
              {/* Image Header with destination pill */}
              <div className="relative h-60 overflow-hidden bg-stone-100">
                <img
                  src={look.image}
                  alt={look.destination}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span className="truncate max-w-[170px]">{look.destination.split('&')[0]}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold shadow-xs">
                  ₱{look.price.toLocaleString()}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 font-mono text-xs flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-blue-900 font-bold uppercase tracking-wider block">
                    {look.locationCategory}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-blue-900 transition-colors">
                    {look.shoeName}
                  </h3>
                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {look.stylingNotes}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E7E2D8]">
                  <div className="flex flex-wrap gap-1">
                    {look.pairingTags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShopLook(look);
                    }}
                    className="w-full py-2 bg-stone-900 group-hover:bg-blue-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Shop This Look</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Selected Look Deep-Dive Highlight Banner */}
        <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E7E2D8] flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center shrink-0">
              <Footprints className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                Active Field Validation
              </span>
              <strong className="text-sm font-serif font-bold text-stone-900 block">
                {selectedLook.destination}
              </strong>
              <span className="text-emerald-700 text-xs font-semibold">
                Tested Durability: {selectedLook.distanceWalked} without sole separation or blister friction
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleShopLook(selectedLook)}
            className="w-full md:w-auto px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs border border-blue-950 shrink-0 cursor-pointer"
          >
            Pre-Order {selectedLook.shoeName} (₱{selectedLook.price.toLocaleString()})
          </button>
        </div>

      </div>
    </section>
  );
};
