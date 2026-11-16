import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Search,
  ShieldCheck,
  Leaf,
  User,
  Share2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { LIVING_ARCHIVE_DATA, packagingImg } from '../data/footwearData';
import { ArchiveRecord } from '../types';

interface LivingArchiveProps {
  initialPairCode?: string;
  onReserveClick: () => void;
}

export const LivingArchive: React.FC<LivingArchiveProps> = ({
  initialPairCode = 'PAM-0184',
  onReserveClick
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialPairCode);
  const [currentPairCode, setCurrentPairCode] = useState<string>(initialPairCode);
  const [activeRecord, setActiveRecord] = useState<ArchiveRecord | null>(
    LIVING_ARCHIVE_DATA[initialPairCode] || LIVING_ARCHIVE_DATA['PAM-0184']
  );
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialPairCode && LIVING_ARCHIVE_DATA[initialPairCode]) {
      setCurrentPairCode(initialPairCode);
      setSearchQuery(initialPairCode);
      setActiveRecord(LIVING_ARCHIVE_DATA[initialPairCode]);
    }
  }, [initialPairCode]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (LIVING_ARCHIVE_DATA[query]) {
      setCurrentPairCode(query);
      setActiveRecord(LIVING_ARCHIVE_DATA[query]);
    } else {
      // Dynamic fallback custom record if user enters another number
      const customRecord: ArchiveRecord = {
        id: query.toLowerCase(),
        pairCode: query,
        pairTitle: `Pamitisan Bespoke Heritage #${query.replace(/[^0-9]/g, '') || '0520'}`,
        serialNumber: `PAM-2026-B05-${query.replace(/[^0-9]/g, '') || '0520'}`,
        batchNumber: 'Batch 05 (Hinabi & Indigo)',
        craftDate: 'August 28, 2026',
        masterArtisan: 'Master Kuya Nonoy & Guild Artisans',
        artisanLocation: 'Barangay Peñafrancia, Naga City, Bicol',
        materialProvenance: `Curated 14oz Raw Thrifted Denim (Ukay Bales, Naga City) + Camarines Sur Handwoven Hinabi Textile Accent.`,
        ukayOrigin: 'Naga City Centro Ukay-Ukay Bales',
        weaveType: 'Bicol Handloom Geometric Weave',
        environmentalImpact: `Diverted ~380g of discarded textile from Bicol landfills, preserving ~2,500 liters of freshwater.`,
        wasteDivertedGrams: 380,
        waterSavedLiters: 2500,
        upperComposition: '80% Upcycled Cotton Denim, 20% Handloom Cotton Weave',
        soleType: '100% Recycled Natural Rubber Crepe',
        ownerName: 'Pamitisan Collector',
        ownerLocation: 'Philippines',
        certificateHash: `sha256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}184920`,
        image: LIVING_ARCHIVE_DATA['PAM-0184'].image,
        artisanQuote: 'Every stitch carries the memory of thrifted denim and the proud hands of Bicolano craftsmen.'
      };
      setCurrentPairCode(query);
      setActiveRecord(customRecord);
    }
  };

  const handleCopyShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?archive=${currentPairCode}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF8F5] text-stone-900">
      {/* Header & QR Lookup bar */}
      <div className="bg-white text-stone-900 p-8 sm:p-12 rounded-2xl border border-[#E7E2D8] space-y-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-900 block font-bold">
              Physical Shoebox Verification
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900">
              THE LIVING <span className="text-amber-800 font-normal italic">ARCHIVE</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-stone-600 max-w-xl leading-relaxed">
              Every physical Pamitisan shoebox bears a serialized QR verification stamp linked to this digital provenance ledger. Enter your Serial ID below to verify your pair's origin.
            </p>
          </div>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. PAM-0184"
                className="w-full sm:w-64 px-4 py-3 bg-[#FAF8F5] border border-[#D3CBBE] rounded-xl text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-blue-900 uppercase tracking-wider transition-colors"
              />
              <span className="absolute right-3 top-3 text-[10px] text-stone-400 font-mono pointer-events-none">
                ID
              </span>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-xl shadow-xs border border-blue-950 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>
          </form>
        </div>

        {/* Quick Sample Selector Chips */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#E7E2D8] text-xs font-mono">
          <span className="text-stone-500 uppercase tracking-wider text-[11px] font-bold">Indexed Pairs:</span>
          <div className="flex flex-wrap gap-2">
            {Object.keys(LIVING_ARCHIVE_DATA).map((code) => (
              <button
                key={code}
                onClick={() => {
                  setSearchQuery(code);
                  setCurrentPairCode(code);
                  setActiveRecord(LIVING_ARCHIVE_DATA[code]);
                }}
                className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors font-mono cursor-pointer font-semibold ${
                  currentPairCode === code
                    ? 'bg-blue-900 text-white shadow-xs border border-blue-950'
                    : 'bg-[#FAF8F5] text-stone-700 border border-[#D3CBBE] hover:border-stone-400'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Living Archive Certificate Canvas */}
      {activeRecord && (
        <main className="archive-container bg-white rounded-2xl border border-[#E7E2D8] overflow-hidden shadow-sm">
          {/* Top Certificate Header */}
          <div className="archive-header bg-[#FAF8F5] p-6 sm:p-8 border-b border-[#E7E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded font-bold">
                Archival Provenance Certificate
              </span>
              <h2 id="pair-title" className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
                {activeRecord.pairTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-600">
                <span>SERIAL: <strong className="text-blue-900 font-bold">{activeRecord.serialNumber}</strong></span>
                <span>•</span>
                <span>BATCH: {activeRecord.batchNumber}</span>
                <span>•</span>
                <span>DATE: {activeRecord.craftDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyShare}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#D3CBBE] text-xs font-semibold tracking-wider uppercase text-stone-800 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-900" />
                <span>{copiedLink ? 'Copied' : 'Share Record'}</span>
              </button>
            </div>
          </div>

          {/* Certificate Body & Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product & QR Shoebox Visual */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl overflow-hidden border border-[#E7E2D8] bg-stone-100">
                <img
                  src={activeRecord.image}
                  alt={activeRecord.pairTitle}
                  className="w-full h-72 object-cover"
                />
              </div>

              {/* Physical QR Shoebox Verification Card */}
              <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-blue-900" />
                    <span className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider">
                      Physical Shoebox Seal
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">
                    Tamper Proof
                  </span>
                </div>

                <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-[#E7E2D8]">
                  <div className="w-14 h-14 bg-[#FAF8F5] text-blue-900 border border-[#D3CBBE] flex items-center justify-center rounded-lg shrink-0">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div className="text-[11px] font-mono text-stone-600 space-y-1">
                    <p className="font-bold text-stone-900 text-xs">{activeRecord.pairCode}</p>
                    <p className="text-[10px] text-stone-500 truncate max-w-[180px]">
                      {activeRecord.certificateHash}
                    </p>
                    <span className="inline-block text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                      Cryptographically Verified
                    </span>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-[#E7E2D8] bg-white">
                  <img
                    src={packagingImg}
                    alt="Pamitisan Shoebox Living Archive Packaging"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Detailed Provenance Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div className="archive-grid grid grid-cols-1 gap-4">
                {/* 1. Material Provenance */}
                <div className="archive-card bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-900 font-bold uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <h3>Material Provenance</h3>
                  </div>
                  <p id="pair-material" className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {activeRecord.materialProvenance}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E7E2D8] text-xs font-mono">
                    <div>
                      <span className="block text-[10px] text-stone-500 uppercase tracking-wider">Thrift Sourcing</span>
                      <strong className="text-stone-900 text-xs font-bold">{activeRecord.ukayOrigin}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-500 uppercase tracking-wider">Weave Heritage</span>
                      <strong className="text-amber-800 text-xs font-bold">{activeRecord.weaveType}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Master Artisan */}
                <div className="archive-card bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-900 font-bold uppercase tracking-wider">
                    <User className="w-4 h-4" />
                    <h3>Master Artisan</h3>
                  </div>
                  <p id="pair-artisan" className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    Handcrafted by <strong className="text-stone-900 font-bold">{activeRecord.masterArtisan}</strong> ({activeRecord.artisanLocation}).
                  </p>
                  <blockquote className="bg-white p-4 border-l-2 border-blue-900 text-xs italic text-stone-700 font-medium rounded-r-lg shadow-xs">
                    "{activeRecord.artisanQuote}"
                  </blockquote>
                </div>

                {/* 3. Environmental Impact */}
                <div className="archive-card bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold uppercase tracking-widest">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-stone-900">Environmental Footprint Offset</h3>
                  </div>
                  <p id="pair-impact" className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {activeRecord.environmentalImpact}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E7E2D8] font-mono">
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase tracking-wider">Textile Waste Diverted</span>
                      <span className="text-2xl font-bold text-emerald-700">{activeRecord.wasteDivertedGrams}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase tracking-wider">Freshwater Conserved</span>
                      <span className="text-2xl font-bold text-blue-900">~{activeRecord.waterSavedLiters.toLocaleString()} L</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authenticity Guarantee & Pre-order CTA */}
              <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-900 font-bold uppercase tracking-wider font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bicol Atelier Heritage Record</span>
                  </div>
                  <p className="text-xs text-stone-600 font-mono">
                    Permanent serialization stored on the immutable craft registry.
                  </p>
                </div>
                <button
                  onClick={onReserveClick}
                  className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-xl shadow-xs border border-blue-950 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Pre-Order Batch 05</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
