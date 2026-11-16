import React, { useState } from 'react';
import { Ruler, ShoppingBag, Menu, X } from 'lucide-react';
import { BATCH_INFO } from '../data/footwearData';

interface NavbarProps {
  activeTab: 'preorder' | 'story' | 'archive' | 'track' | 'checkout';
  setActiveTab: (tab: 'preorder' | 'story' | 'archive' | 'track' | 'checkout') => void;
  onOpenSizingModal: () => void;
  cartSlotCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSizingModal,
  cartSlotCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'preorder', label: 'Batch 05' },
    { id: 'story', label: 'Craft & Impact' },
    { id: 'archive', label: 'Living Archive' },
    { id: 'track', label: 'Track Order' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveTab('preorder')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
            id="brand-logo-btn"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-blue-900 transition-colors">
              PAMITISAN
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-stone-500 uppercase border-l border-stone-300 pl-3">
              Naga City • Bicol
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs uppercase tracking-widest transition-colors py-1 cursor-pointer font-medium ${
                    isActive
                      ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* CM Fit Finder */}
            <button
              id="open-sizing-calc-nav"
              onClick={onOpenSizingModal}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase px-3.5 py-2 rounded-lg bg-white border border-[#D3CBBE] hover:border-stone-400 text-stone-700 transition-all cursor-pointer shadow-xs"
              title="Find your exact EU size from centimeters"
            >
              <Ruler className="w-3.5 h-3.5 text-amber-700" />
              <span>CM Fit</span>
            </button>

            {/* Reserve Slot Button */}
            <button
              id="nav-checkout-btn"
              onClick={() => setActiveTab('checkout')}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-all shadow-xs border border-blue-950 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Reserve</span>
              {cartSlotCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-blue-950 text-[10px] font-bold flex items-center justify-center font-mono ml-0.5">
                  {cartSlotCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none cursor-pointer rounded-lg bg-white border border-[#D3CBBE]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E7E2D8] px-5 py-5 space-y-3 shadow-md">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-900 text-white'
                    : 'text-stone-700 hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#E7E2D8]">
            <button
              onClick={() => {
                onOpenSizingModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-lg bg-[#FAF8F5] border border-[#D3CBBE] text-stone-800"
            >
              <Ruler className="w-4 h-4 text-amber-700" />
              <span>CM Sizing Calculator</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
