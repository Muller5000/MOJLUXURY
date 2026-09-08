import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function DeliveryWidget() {
  const [activeTab, setActiveTab] = useState<'lagos' | 'major' | 'interstate' | 'intl'>('lagos');

  const deliveryRates = {
    lagos: {
      title: 'Lagos Deliveries',
      express: '₦2,500 (Same-day Express if placed before 12 PM)',
      standard: '₦1,500 (1-2 working days)',
      notes: 'Lagos Cash-on-Delivery is supported for standard delivery.',
    },
    major: {
      title: 'Abuja & Port Harcourt',
      express: 'N/A',
      standard: '₦3,500 (2-3 working days)',
      notes: 'Pre-payment required via Paystack or bank transfer.',
    },
    interstate: {
      title: 'Other Nigerian States',
      express: 'N/A',
      standard: '₦4,500 (3-5 working days)',
      notes: 'Shipped via trusted interstate courier partners.',
    },
    intl: {
      title: 'International Shipping',
      express: '₦25,000 / $30 flat rate (DHL Express)',
      standard: 'N/A',
      notes: '5-7 working days worldwide delivery. Real-time DHL tracking link provided.',
    },
  };

  return (
    <div className="bg-amber-50/20 border border-amber-100/50 rounded-2xl p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs text-amber-800 uppercase tracking-widest font-semibold block mb-1">Shipping & Logistics</span>
          <h3 className="font-serif text-2xl md:text-3xl text-gray-900">Localized Delivery Rates</h3>
          <p className="text-xs text-gray-500 max-w-lg mx-auto mt-2">We deliver nationwide across Nigeria and worldwide via DHL Express. Find delivery timelines and cost breakdown below.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 border-b border-gray-100 pb-4">
          {(Object.keys(deliveryRates) as Array<keyof typeof deliveryRates>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeTab === key
                  ? 'bg-amber-950 text-white shadow-md'
                  : 'bg-white border border-gray-100 text-gray-600 hover:bg-amber-50/40 hover:text-amber-950'
              }`}
            >
              {deliveryRates[key].title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm min-h-[160px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-serif text-lg text-gray-900 border-b border-gray-50 pb-2 flex justify-between items-center">
                <span>{deliveryRates[activeTab].title}</span>
                <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">ESTIMATED RATES</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Standard Delivery</span>
                  <span className="text-gray-800 font-medium">{deliveryRates[activeTab].standard}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Express Delivery</span>
                  <span className="text-gray-800 font-medium">{deliveryRates[activeTab].express}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-50 text-xs text-gray-500 italic">
                <strong>Delivery Note:</strong> {deliveryRates[activeTab].notes}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
