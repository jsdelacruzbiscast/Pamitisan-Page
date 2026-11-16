import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Briefcase,
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  FileSpreadsheet
} from 'lucide-react';
import { B2BInquiryData } from '../types';

export const B2BReadinessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<B2BInquiryData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    entityType: 'Retail Hub (e.g. Kultura)',
    estimatedPairs: '50-100 Pairs',
    customRequirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-[#E7E2D8] shadow-2xl max-w-2xl w-full p-8 sm:p-10 space-y-6 animate-in zoom-in-95 text-stone-900">
        
        <div className="flex items-center justify-between border-b border-[#E7E2D8] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-900 font-bold block">
                B2B & Institutional Inquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                KULTURA & WHOLESALE PARTNERSHIP
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-lg font-mono p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 font-mono">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-stone-900 font-serif">
              B2B Inquiry Received
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Maraming salamat! Founder Kinan and the Pamitisan commercial team will review your wholesale proposal and supply catalog specs within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all font-mono"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <p className="text-stone-600 leading-relaxed">
              Standardized wholesale production lines (<strong>ETNIKO Habi</strong> and <strong>ETNIKO Classic</strong>) are available for curated retail showcases (e.g. Kultura Filipino), corporate milestone gifting, and cultural museum gift shops.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                  Organization / Retail Hub *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Kultura SM / Ayala Museum / Corp"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-stone-900 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="e.g. Category Merchandiser"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-stone-900 focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. buyer@kulturafilipino.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-stone-900 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                  Partnership Type *
                </label>
                <select
                  value={formData.entityType}
                  onChange={(e) => setFormData({ ...formData, entityType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-stone-900 focus:outline-none focus:border-blue-900 cursor-pointer"
                >
                  <option value="Retail Hub (e.g. Kultura)">Retail Showcase (e.g. Kultura Filipino)</option>
                  <option value="Corporate Gift/Token">Corporate Milestone Tokens</option>
                  <option value="Boutique Gallery">Art Space / Boutique Gallery</option>
                  <option value="Eco-Tourism Partner">Eco-Tourism / Resort Partner</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                Estimated Volume / Target Quarter
              </label>
              <select
                value={formData.estimatedPairs}
                onChange={(e) => setFormData({ ...formData, estimatedPairs: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-stone-900 focus:outline-none focus:border-blue-900 cursor-pointer"
              >
                <option value="20-50 Pairs">Initial Trial Run: 20-50 Pairs</option>
                <option value="50-100 Pairs">Standard Wholesale Tier: 50-100 Pairs</option>
                <option value="100-300 Pairs">Regional Placement: 100-300 Pairs</option>
                <option value="Custom Project">Custom Collaborative Capsule</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                Packaging / Storytelling Specs
              </label>
              <textarea
                rows={2}
                value={formData.customRequirements}
                onChange={(e) => setFormData({ ...formData, customRequirements: e.target.value })}
                placeholder="Include custom packaging needs, DTI compliance requests, or specific regional weave requests..."
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-stone-900 focus:outline-none focus:border-blue-900"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-[11px] text-blue-950">
              <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0" />
              <span>
                Standardized with Living Archive packaging inserts & verifiable textile metrics.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs border border-blue-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit B2B Inquiry to Naga Atelier</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
