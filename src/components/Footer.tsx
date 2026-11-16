import React from 'react';
import {
  MapPin,
  Mail,
  ShieldCheck,
  Leaf,
  Heart,
  Ruler,
  Building2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'preorder' | 'story' | 'archive' | 'track' | 'checkout') => void;
  onOpenSizingModal: () => void;
  onOpenB2BModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizingModal, onOpenB2BModal }) => {
  return (
    <footer className="bg-white text-stone-700 border-t border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold tracking-tight text-stone-900 uppercase">
                PAMITISAN
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
                BICOL
              </span>
            </div>
            <p className="text-sm font-serif italic text-amber-800 tracking-wide">
              "Make every step a purpose."
            </p>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm font-mono">
              Handcrafted artisanal footwear transforming curated thrifted denim and indigenous Bicolano Hinabi weaves into serialized 1-of-1 wearable art for all seasons.
            </p>
            <div className="pt-2 text-xs font-mono text-stone-600 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-900" />
                <span>Naga City Workshop, Camarines Sur, Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-900" />
                <span>pamitisannaga@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-900 font-bold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate('preorder')}
                  className="text-stone-600 hover:text-blue-900 transition-colors cursor-pointer"
                >
                  Batch 05 Drop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="text-stone-600 hover:text-blue-900 transition-colors cursor-pointer"
                >
                  Heritage & Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('archive')}
                  className="text-stone-600 hover:text-blue-900 transition-colors cursor-pointer"
                >
                  The Living Archive (QR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="text-stone-600 hover:text-blue-900 transition-colors cursor-pointer"
                >
                  Track My Pair
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizingModal}
                  className="text-stone-600 hover:text-blue-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Ruler className="w-3 h-3 text-amber-700" />
                  <span>CM Sizing Calculator</span>
                </button>
              </li>
              <li>
                <a
                  href="#customizer-atelier"
                  className="text-stone-600 hover:text-blue-900 transition-colors block"
                >
                  Bespoke Co-Creator Atelier
                </a>
              </li>
              <li>
                <a
                  href="#ergonomics-flex"
                  className="text-stone-600 hover:text-blue-900 transition-colors block"
                >
                  Zero Break-In Biomechanics
                </a>
              </li>
              <li>
                <a
                  href="#unboxing-showcase"
                  className="text-stone-600 hover:text-blue-900 transition-colors block"
                >
                  Living Archive Unboxing
                </a>
              </li>
              <li>
                <a
                  href="#walking-lookbook"
                  className="text-stone-600 hover:text-blue-900 transition-colors block"
                >
                  Philippine Heritage Lookbook
                </a>
              </li>
              {onOpenB2BModal && (
                <li>
                  <button
                    onClick={onOpenB2BModal}
                    className="text-blue-900 hover:text-blue-700 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3 h-3 text-blue-900" />
                    <span>B2B / Kultura Wholesale</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Shoe Care & Craft */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-900 font-bold">
              Denim Care
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-stone-600">
              <li>• Spot-clean with botanical soap & cold water</li>
              <li>• Air-dry away from harsh direct sun to preserve indigo</li>
              <li>• Hinabi accents soften naturally with your stride</li>
              <li>• Re-soleable vulcanized rubber foundation</li>
            </ul>
          </div>

          {/* Col 5: Ethics & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-900 font-bold">
              Commitments
            </h4>
            <div className="space-y-2.5 text-xs font-mono text-stone-600">
              <div className="flex items-start gap-2">
                <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero factory overproduction</span>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>2.5x living wage for Bicol cobblers</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                <span>Free 1x size exchange guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-500">
          <p>© 2026 Pamitisan Footwear. Handcrafted in Naga City, Bicol.</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-600">Make Every Step a Purpose</span>
            <span>•</span>
            <span className="text-blue-900 font-bold">Batch 05 Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
