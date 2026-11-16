/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PreOrderHub } from './components/PreOrderHub';
import { BrandStoryImpact } from './components/BrandStoryImpact';
import { LivingArchive } from './components/LivingArchive';
import { OrderTracker } from './components/OrderTracker';
import { SplitCheckout } from './components/SplitCheckout';
import { SizingModal } from './components/SizingModal';
import { B2BReadinessModal } from './components/B2BReadinessModal';
import { Footer } from './components/Footer';
import { PRODUCTS, INITIAL_ORDERS } from './data/footwearData';
import { ShoeProduct, OrderTrackRecord } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'preorder' | 'story' | 'archive' | 'track' | 'checkout'>('preorder');
  const [isSizingModalOpen, setIsSizingModalOpen] = useState<boolean>(false);
  const [isB2BModalOpen, setIsB2BModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ShoeProduct>(PRODUCTS[0]);
  const [selectedEuSize, setSelectedEuSize] = useState<number>(40);
  const [archivePairCode, setArchivePairCode] = useState<string>('PAM-0184');
  const [ordersList, setOrdersList] = useState<OrderTrackRecord[]>(INITIAL_ORDERS);
  const [notification, setNotification] = useState<string | null>(null);

  // Check URL query parameters for Living Archive (?pair_id=X or ?archive=X)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pairId = params.get('pair_id') || params.get('pair') || params.get('archive');
      if (pairId) {
        setArchivePairCode(pairId.toUpperCase());
        setActiveTab('archive');
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSelectProductForCheckout = (product: ShoeProduct, size?: number) => {
    setSelectedProduct(product);
    if (size) {
      setSelectedEuSize(size);
    }
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSizingModal = () => {
    setIsSizingModalOpen(true);
  };

  const handleSelectSizeFromModal = (euSize: number, footCm: number) => {
    setSelectedEuSize(euSize);
    showNotification(`Selected EU ${euSize} (${footCm.toFixed(1)} cm) based on your measurement.`);
  };

  const handleViewArchive = (code: string) => {
    setArchivePairCode(code);
    setActiveTab('archive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCompleted = (newOrder: OrderTrackRecord) => {
    setOrdersList((prev) => [newOrder, ...prev]);
    showNotification(`Pre-order reservation ${newOrder.orderId} successfully registered!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-blue-900 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 px-5 py-3.5 rounded-xl shadow-xl border border-stone-700 text-xs font-mono flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
          <span className="tracking-wide text-stone-200">{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-stone-100 ml-2 text-xs font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSizingModal={handleOpenSizingModal}
        cartSlotCount={activeTab === 'checkout' ? 1 : 0}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeTab === 'preorder' && (
          <PreOrderHub
            onSelectProductForCheckout={handleSelectProductForCheckout}
            onOpenSizingModal={handleOpenSizingModal}
            onViewArchive={handleViewArchive}
            onViewStory={() => {
              setActiveTab('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'story' && (
          <BrandStoryImpact
            onReserveClick={() => {
              setActiveTab('preorder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'archive' && (
          <LivingArchive
            initialPairCode={archivePairCode}
            onReserveClick={() => {
              setActiveTab('preorder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'track' && (
          <OrderTracker
            ordersList={ordersList}
            onViewArchive={handleViewArchive}
            onContactCobbler={() => {
              alert('You can direct message our Naga City workshop directly on Instagram / Messenger @PamitisanFootwear or email pamitisannaga@gmail.com.');
            }}
          />
        )}

        {activeTab === 'checkout' && (
          <SplitCheckout
            selectedProduct={selectedProduct}
            initialEuSize={selectedEuSize}
            onOpenSizingModal={handleOpenSizingModal}
            onOrderCompleted={handleOrderCompleted}
            onBackToPreorder={() => {
              setActiveTab('preorder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Sizing Modal ("Sizing Friction Killer") */}
      <SizingModal
        isOpen={isSizingModalOpen}
        onClose={() => setIsSizingModalOpen(false)}
        onSelectSize={handleSelectSizeFromModal}
      />

      {/* Global B2B & Wholesale Modal */}
      <B2BReadinessModal
        isOpen={isB2BModalOpen}
        onClose={() => setIsB2BModalOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSizingModal={handleOpenSizingModal}
        onOpenB2BModal={() => setIsB2BModalOpen(true)}
      />
    </div>
  );
}
