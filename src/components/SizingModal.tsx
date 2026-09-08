import React from 'react';
import { motion } from 'motion/react';

interface SizingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizingModal({ isOpen, onClose }: SizingModalProps) {
  if (!isOpen) return null;

  const sizingData = [
    { uk: 'UK 6', us: 'US 2', bust: '31.5" / 80cm', waist: '24" / 61cm', hips: '34" / 86cm' },
    { uk: 'UK 8', us: 'US 4', bust: '32.5" / 83cm', waist: '25" / 63cm', hips: '35" / 89cm' },
    { uk: 'UK 10', us: 'US 6', bust: '34" / 86cm', waist: '27" / 68cm', hips: '37" / 94cm' },
    { uk: 'UK 12', us: 'US 8', bust: '36" / 91cm', waist: '29" / 74cm', hips: '39" / 99cm' },
    { uk: 'UK 14', us: 'US 10', bust: '38" / 96cm', waist: '31" / 79cm', hips: '41" / 104cm' },
    { uk: 'UK 16', us: 'US 12', bust: '40" / 101cm', waist: '33" / 84cm', hips: '43" / 109cm' },
    { uk: 'UK 18', us: 'US 14', bust: '42" / 106cm', waist: '35" / 89cm', hips: '45" / 114cm' },
    { uk: 'UK 20', us: 'US 16', bust: '44" / 112cm', waist: '37" / 94cm', hips: '47" / 119cm' },
    { uk: 'UK 22', us: 'US 18', bust: '46" / 117cm', waist: '39" / 99cm', hips: '49" / 124cm' },
    { uk: 'UK 24', us: 'US 20', bust: '48" / 122cm', waist: '41" / 104cm', hips: '51" / 129cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-amber-100 max-h-[90vh] flex flex-col z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-amber-50/50 to-orange-50/20">
          <div>
            <h3 className="font-serif text-2xl text-gray-900 tracking-wide">Inclusive Size Guide</h3>
            <p className="text-xs text-amber-800 mt-1 uppercase tracking-widest font-semibold">Standard UK / US & Metric Conversions</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4 text-sm text-amber-900 flex gap-3">
            <svg className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              <strong>Bespoke Fit Note:</strong> If your measurements fall between sizes or you have a custom height requirement, we offer <strong>free bespoke custom tailoring</strong>. Select "Request Bespoke Tailoring" on any product page.
            </p>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
                  <th className="py-3 px-4 font-semibold">UK Size</th>
                  <th className="py-3 px-4 font-semibold">US Size</th>
                  <th className="py-3 px-4 font-semibold">Bust</th>
                  <th className="py-3 px-4 font-semibold">Waist</th>
                  <th className="py-3 px-4 font-semibold">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sizingData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/10 transition-colors">
                    <td className="py-3 px-4 font-medium text-amber-900">{row.uk}</td>
                    <td className="py-3 px-4 text-gray-600">{row.us}</td>
                    <td className="py-3 px-4 text-gray-700">{row.bust}</td>
                    <td className="py-3 px-4 text-gray-700">{row.waist}</td>
                    <td className="py-3 px-4 text-gray-700">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sizing Tips */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg text-gray-900">How to Measure</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
              <div className="border border-gray-100 p-3 rounded-lg">
                <span className="font-semibold block mb-1 text-gray-900">1. Bust</span>
                Measure around the fullest part of your chest, keeping the tape level across your back.
              </div>
              <div className="border border-gray-100 p-3 rounded-lg">
                <span className="font-semibold block mb-1 text-gray-900">2. Waist</span>
                Measure around your natural waistline, which is the narrowest area above your belly button.
              </div>
              <div className="border border-gray-100 p-3 rounded-lg">
                <span className="font-semibold block mb-1 text-gray-900">3. Hips</span>
                Measure around the fullest part of your hips, keeping the tape level.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-50 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-black hover:bg-gray-800 text-white font-medium uppercase tracking-widest text-xs px-6 py-3 rounded transition-colors"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
}
