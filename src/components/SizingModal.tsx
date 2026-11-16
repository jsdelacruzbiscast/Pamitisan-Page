import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, MessageCircle, ArrowRight, Footprints } from 'lucide-react';
import { calculateEuSizeFromCm } from '../utils/sizing';

interface SizingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (euSize: number, footCm: number) => void;
}

export const SizingModal: React.FC<SizingModalProps> = ({
  isOpen,
  onClose,
  onSelectSize
}) => {
  const [footCm, setFootCm] = useState<number>(24.5);
  const [hasWideFeet, setHasWideFeet] = useState<boolean>(false);
  const [measurementCopied, setMeasurementCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const result = calculateEuSizeFromCm(footCm);
  const finalRecommendedEu = hasWideFeet && result.euSize < 45 ? result.euSize + 1 : result.euSize;

  const handleApply = () => {
    if (onSelectSize) {
      onSelectSize(finalRecommendedEu, footCm);
    }
    onClose();
  };

  const handleCopyMeasurement = () => {
    const text = `Hi Pamitisan! My foot length is ${footCm} cm (Recommended: EU ${finalRecommendedEu}${hasWideFeet ? ' with Wide Feet Custom Lasting' : ''}). Can you confirm my sizing for Batch 05?`;
    navigator.clipboard?.writeText(text);
    setMeasurementCopied(true);
    setTimeout(() => setMeasurementCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E7E2D8] overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        {/* Modal Header */}
        <div className="bg-[#FAF8F5] text-stone-900 p-6 flex items-center justify-between border-b border-[#E7E2D8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-stone-900 uppercase font-serif">
                Find Your Exact EU Fit
              </h3>
              <p className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                Centimeter Sizing Precision • Bespoke Cobbler Match
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            id="close-sizing-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          {/* Instructions */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E2D8] space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5" />
              How to Measure in 30 Seconds:
            </span>
            <p className="text-xs text-stone-600 leading-relaxed font-mono">
              Step firmly on a blank sheet of paper with your heel flush against a flat wall. Mark the tip of your longest toe, then measure the exact distance in centimeters (cm).
            </p>
          </div>

          {/* Calculator Input Group */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="foot-cm-slider" className="text-xs font-mono uppercase tracking-wider font-bold text-stone-800">
                Foot Length (Centimeters):
              </label>
              <span className="font-mono text-sm font-bold text-blue-900 bg-[#FAF8F5] px-2.5 py-0.5 border border-[#E7E2D8] rounded-md">
                {footCm.toFixed(1)} cm
              </span>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="20.0"
              max="30.0"
              step="0.1"
              value={footCm}
              onChange={(e) => setFootCm(parseFloat(e.target.value))}
              className="w-full accent-blue-900 cursor-pointer h-2 bg-stone-100 rounded-lg appearance-none"
              id="foot-cm-slider"
            />

            {/* Direct Number Input */}
            <div className="flex items-center gap-3">
              <input
                type="number"
                id="foot-cm"
                step="0.1"
                min="20.0"
                max="30.0"
                value={footCm}
                onChange={(e) => setFootCm(parseFloat(e.target.value) || 20)}
                placeholder="e.g. 24.5"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900"
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 whitespace-nowrap">
                Range: 20.0 - 30.0 cm
              </span>
            </div>

            {/* Wide feet toggle */}
            <label className="flex items-center gap-2.5 pt-1 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasWideFeet}
                onChange={(e) => setHasWideFeet(e.target.checked)}
                className="rounded accent-blue-900 w-4 h-4 cursor-pointer"
              />
              <span className="font-mono text-xs text-stone-600">
                I have wide feet or high instep (+0.5cm forefoot allowance)
              </span>
            </label>
          </div>

          {/* Sizing Result Box */}
          <div
            id="size-result"
            className="bg-[#FAF8F5] text-stone-900 p-6 rounded-xl border border-[#E7E2D8] space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block font-semibold">
                  Recommended Size
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
                    EU {finalRecommendedEu}
                  </span>
                  <span className="text-xs font-mono text-blue-900 font-bold">
                    ({footCm.toFixed(1)} cm foot length)
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed border-t border-[#E7E2D8] pt-3 font-mono">
              {hasWideFeet
                ? 'We recommend EU ' + finalRecommendedEu + ' with wide lasting, allowing comfortable flex around the forefoot and Hinabi side panels.'
                : result.notes}
            </p>

            {/* Quick Sizing Range Table Reference */}
            <div className="grid grid-cols-4 gap-1.5 pt-2 text-[10px] font-mono text-center">
              <div className={`p-2 rounded-lg border ${finalRecommendedEu === 36 ? 'bg-blue-900 text-white font-bold border-blue-950 shadow-xs' : 'bg-white border-[#E7E2D8] text-stone-600'}`}>
                36 (23.0cm)
              </div>
              <div className={`p-2 rounded-lg border ${finalRecommendedEu === 38 ? 'bg-blue-900 text-white font-bold border-blue-950 shadow-xs' : 'bg-white border-[#E7E2D8] text-stone-600'}`}>
                38 (24.5cm)
              </div>
              <div className={`p-2 rounded-lg border ${finalRecommendedEu === 40 ? 'bg-blue-900 text-white font-bold border-blue-950 shadow-xs' : 'bg-white border-[#E7E2D8] text-stone-600'}`}>
                40 (25.5cm)
              </div>
              <div className={`p-2 rounded-lg border ${finalRecommendedEu === 42 ? 'bg-blue-900 text-white font-bold border-blue-950 shadow-xs' : 'bg-white border-[#E7E2D8] text-stone-600'}`}>
                42 (27.0cm)
              </div>
            </div>
          </div>

          {/* Artisan DM & Assistance Options */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={handleApply}
              className="flex-1 py-3.5 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 shadow-xs border border-blue-950 transition-all cursor-pointer font-mono"
              id="apply-calculated-size-btn"
            >
              <span>Apply EU {finalRecommendedEu} to Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyMeasurement}
              className="py-3.5 px-4 bg-white hover:bg-[#F3EFEA] text-stone-800 border border-[#D3CBBE] rounded-xl text-xs font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer font-mono shadow-xs"
              title="Copy details to message our cobblers"
            >
              <MessageCircle className="w-4 h-4 text-blue-900" />
              <span>{measurementCopied ? 'Copied to Clipboard!' : 'Ask Cobbler via DM'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="bg-[#FAF8F5] px-6 py-3.5 border-t border-[#E7E2D8] text-[10px] text-stone-500 flex items-center justify-between font-mono uppercase tracking-wider">
          <span>Artisan Lasting Guarantee</span>
          <span className="text-emerald-700 font-bold">Free 1x Exchange if Fit Needs Adjustment</span>
        </div>
      </div>
    </div>
  );
};
