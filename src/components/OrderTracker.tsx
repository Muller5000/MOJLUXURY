import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, MapPin, Sparkles, MessageCircle, RefreshCw, Cpu } from 'lucide-react';
import { getSupabase } from '../supabaseClient';

interface OrderTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledRef?: string;
}

interface ActivityLog {
  time: string;
  text: string;
  category: 'system' | 'atelier' | 'logistics';
}

export function OrderTracker({ isOpen, onClose, prefilledRef = '' }: OrderTrackerProps) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState(prefilledRef);
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const [activeStep, setActiveStep] = useState(2); // Step 2: Tailoring Active
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Pre-fill search if reference is passed
  useEffect(() => {
    if (prefilledRef) {
      setSearchQuery(prefilledRef);
      handleSearch(new Event('submit') as any, prefilledRef);
    }
  }, [prefilledRef]);

  // Scroll to bottom of activity logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activityLogs]);

  // Seed and animate live activity logs when order is loaded
  useEffect(() => {
    if (!orderFound) return;

    // Only seed standard simulated logs if activityLogs is empty
    if (activityLogs.length === 0) {
      const initialLogs: ActivityLog[] = [
        { time: '09:00', text: 'Secure transaction authenticated via Paystack Sandbox.', category: 'system' },
        { time: '09:05', text: 'Order queued in Victoria Island digital atelier pipeline.', category: 'system' },
        { time: '09:40', text: 'Premium fabric selection and allocation finalized (Heavy Mikado Silk / Handcrafted Lace).', category: 'atelier' },
        { time: '10:15', text: 'Bespoke drafting active: pattern drapes configured to custom measurements.', category: 'atelier' },
      ];
      setActivityLogs(initialLogs);
    }

    // List of dynamic updates to append every 8 seconds to simulate real-time atelier progress
    const simulatedAtelierUpdates = [
      { text: 'Garment fabric cutting initiated under master cutter supervision.', category: 'atelier' },
      { text: 'Premium cotton lining panels prepped and seam allowances locked.', category: 'atelier' },
      { text: 'Stitching bodice panels and locking custom waist proportions.', category: 'atelier' },
      { text: 'Sleeve draping and pleating assembly in progress.', category: 'atelier' },
      { text: 'Quality checklist: measuring bust (36") and hips (40") metrics against order custom specs.', category: 'atelier' },
      { text: 'Garment iron-drape styling and custom luxury tag placement active.', category: 'atelier' },
      { text: 'Handover complete: order prepped for DHL Express global dispatch.', category: 'logistics' },
    ];

    let updateIndex = 0;
    const interval = setInterval(() => {
      if (updateIndex >= simulatedAtelierUpdates.length) {
        clearInterval(interval);
        return;
      }
      
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0].substring(0, 5); // e.g. "17:03"
      
      const newLog: ActivityLog = {
        time: timeString,
        text: simulatedAtelierUpdates[updateIndex].text,
        category: simulatedAtelierUpdates[updateIndex].category as any,
      };

      setActivityLogs((prev) => [...prev, newLog]);
      
      // Advance step indicator when tailoring finishes
      if (updateIndex === 4) {
        setActiveStep(3); // Quality check complete
      } else if (updateIndex === 6) {
        setActiveStep(4); // Logistics handover
      }

      updateIndex++;
    }, 8000);

    return () => clearInterval(interval);
  }, [orderFound]);

  const handleSearch = async (e: React.FormEvent, directQuery?: string) => {
    if (e) e.preventDefault();
    const query = directQuery || searchQuery;
    if (!query.trim()) return;

    setIsSearching(true);
    setOrderFound(false);

    // Try fetching remote order details and logs from Supabase database
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('reference', query.trim())
          .maybeSingle();

        if (orderError) throw orderError;

        if (orderData) {
          const statusMap: Record<string, number> = {
            verified: 1,
            tailoring: 2,
            inspection: 3,
            transit: 4,
            delivered: 5
          };
          setActiveStep(statusMap[orderData.status] || 2);

          const { data: logData, error: logError } = await supabase
            .from('atelier_logs')
            .select('*')
            .eq('order_reference', query.trim())
            .order('created_at', { ascending: true });

          if (logError) throw logError;

          if (logData && logData.length > 0) {
            setActivityLogs(logData.map(log => ({
              time: log.log_time,
              text: log.log_text,
              category: log.category as any
            })));
          } else {
            setActivityLogs([
              { time: '09:00', text: 'Secure transaction authenticated via Paystack Sandbox.', category: 'system' },
              { time: '09:05', text: 'Order queued in Victoria Island digital atelier pipeline.', category: 'system' }
            ]);
          }

          setOrderFound(true);
          setIsSearching(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase query skipped/failed, running robust simulated tracker:', err);
      }
    }

    // Graceful simulated offline fallback
    setTimeout(() => {
      setIsSearching(false);
      setOrderFound(true);
    }, 1200);
  };

  const getWhatsAppSupportLink = () => {
    const text = `Hi MOJLUXURY! 🌟 I'm tracking my order reference ${searchQuery || 'MOJ-ORDER'} and would like to speak to a master tailor about my bespoke fitting.`;
    return `https://wa.me/2348084424520?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 25 }}
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-amber-100 max-h-[90vh] flex flex-col z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-amber-50/50 to-orange-50/20 shrink-0">
          <div>
            <h3 className="font-serif text-2xl text-gray-900 tracking-wide">Real-Time Order Tracker</h3>
            <p className="text-xs text-amber-800 mt-1 uppercase tracking-widest font-semibold">Atelier Production & Global Logistics pipeline</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-950"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Lookup Input */}
          <form onSubmit={(e) => handleSearch(e)} className="max-w-md mx-auto">
            <div className="relative flex items-center bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden p-1 focus-within:border-amber-500 focus-within:bg-white transition-all shadow-sm">
              <span className="pl-3 text-gray-400"><Search size={18} /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter order reference (e.g. MOJ-789234)"
                className="w-full bg-transparent px-3 py-3 text-sm focus:outline-none text-gray-900 font-semibold"
                required
              />
              <button
                type="submit"
                disabled={isSearching}
                className="bg-amber-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                {isSearching ? <RefreshCw size={14} className="animate-spin" /> : 'Track'}
              </button>
            </div>
            <span className="block text-[10px] text-gray-400 text-center mt-2">
              Tip: Enter your post-checkout Paystack reference or try standard demo code <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-amber-950 font-bold">MOJ-TEST-99</code>
            </span>
          </form>

          {/* 2. Loading state */}
          {isSearching && (
            <div className="h-[40vh] flex flex-col items-center justify-center space-y-4">
              <RefreshCw size={36} className="text-amber-900 animate-spin" />
              <p className="font-serif text-gray-500 italic text-sm">Accessing Victoria Island flagship database...</p>
            </div>
          )}

          {/* 3. Results Section */}
          {!isSearching && orderFound && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: GPS Path Map & Timeline */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual SVG GPS Transit Map */}
                <div className="bg-[#1c1917] rounded-3xl p-4 overflow-hidden relative border border-amber-900/20 shadow-md">
                  <div className="flex justify-between items-center text-white mb-3">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 flex items-center gap-1"><Cpu size={12} className="animate-pulse" /> Live Sizing GPS Tracker</span>
                    <span className="text-[10px] bg-amber-900/55 px-2 py-0.5 rounded border border-amber-500/20">DHL Express</span>
                  </div>

                  {/* SVG Custom Map Drawing */}
                  <div className="w-full aspect-[16/9] relative bg-[#131110] rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
                    
                    {/* SVG Content */}
                    <svg className="w-full h-full p-6 text-amber-800" viewBox="0 0 400 200" fill="none" stroke="currentColor">
                      {/* Stylized Vector Grid background */}
                      <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 100 0 L 100 200 M 200 0 L 200 200 M 300 0 L 300 200" strokeWidth="0.25" strokeOpacity="0.1" />

                      {/* Origin Showroom Marker */}
                      <circle cx="80" cy="130" r="4" fill="#f59e0b" />
                      <circle cx="80" cy="130" r="12" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1" className="animate-ping" />
                      
                      {/* Destination Doorstep Marker */}
                      <circle cx="320" cy="70" r="4" fill="#fff" />
                      <circle cx="320" cy="70" r="10" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />

                      {/* Air Transit Path Line */}
                      <path d="M 80 130 Q 200 40 320 70" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" />

                      {/* Pulsing GPS dot shifting along the curved path based on activeStep */}
                      <circle 
                        cx={activeStep >= 4 ? "320" : activeStep >= 3 ? "240" : "130"} 
                        cy={activeStep >= 4 ? "70" : activeStep >= 3 ? "52" : "105"} 
                        r="6" 
                        fill="#f59e0b" 
                        className="transition-all duration-[2000ms] shadow-lg" 
                      />
                      <circle 
                        cx={activeStep >= 4 ? "320" : activeStep >= 3 ? "240" : "130"} 
                        cy={activeStep >= 4 ? "70" : activeStep >= 3 ? "52" : "105"} 
                        r="16" 
                        stroke="#f59e0b" 
                        strokeWidth="1.5" 
                        strokeOpacity="0.5" 
                        className="animate-ping transition-all duration-[2000ms]" 
                      />
                    </svg>

                    {/* Styled Map HUD badges */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[9px] text-amber-200 border border-white/5">
                      <span className="block font-semibold">Origin Location:</span>
                      <span>Victoria Island Showroom, Lagos</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[9px] text-white border border-white/5 text-right">
                      <span className="block font-semibold">DHL Hub:</span>
                      <span>Air Dispatch Pipeline</span>
                    </div>
                  </div>
                </div>

                {/* Garment Journey Timeline */}
                <div className="space-y-4">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-1">Garment Sizing Timeline</span>
                  <div className="grid grid-cols-5 gap-2 relative">
                    {/* Progress Background bar */}
                    <div className="absolute top-[15px] left-8 right-8 h-1 bg-gray-100 z-0"></div>
                    <div 
                      className="absolute top-[15px] left-8 h-1 bg-amber-950 z-0 transition-all duration-[2000ms]"
                      style={{ width: `${activeStep * 25}%` }}
                    ></div>

                    {/* Step 1: Confirmed */}
                    <div className="flex flex-col items-center text-center space-y-2 z-10">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm font-bold text-xs ${activeStep >= 1 ? 'bg-amber-950 text-white' : 'bg-gray-100 text-gray-400'}`}>1</span>
                      <span className="text-[9px] font-bold text-gray-700 uppercase tracking-wider block">Verified</span>
                    </div>
                    
                    {/* Step 2: Tailoring */}
                    <div className="flex flex-col items-center text-center space-y-2 z-10">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm font-bold text-xs ${activeStep >= 2 ? 'bg-amber-950 text-white' : 'bg-gray-100 text-gray-400'} ${activeStep === 2 ? 'animate-pulse bg-amber-700' : ''}`}>2</span>
                      <span className="text-[9px] font-bold text-gray-700 uppercase tracking-wider block">Tailoring</span>
                    </div>

                    {/* Step 3: Inspection */}
                    <div className="flex flex-col items-center text-center space-y-2 z-10">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm font-bold text-xs ${activeStep >= 3 ? 'bg-amber-950 text-white' : 'bg-gray-100 text-gray-400'} ${activeStep === 3 ? 'animate-pulse bg-amber-700' : ''}`}>3</span>
                      <span className="text-[9px] font-bold text-gray-700 uppercase tracking-wider block">Inspection</span>
                    </div>

                    {/* Step 4: Shipped */}
                    <div className="flex flex-col items-center text-center space-y-2 z-10">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm font-bold text-xs ${activeStep >= 4 ? 'bg-amber-950 text-white' : 'bg-gray-100 text-gray-400'} ${activeStep === 4 ? 'animate-pulse bg-amber-700' : ''}`}>4</span>
                      <span className="text-[9px] font-bold text-gray-700 uppercase tracking-wider block">Transit</span>
                    </div>

                    {/* Step 5: Delivered */}
                    <div className="flex flex-col items-center text-center space-y-2 z-10">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm font-bold text-xs ${activeStep >= 5 ? 'bg-amber-950 text-white' : 'bg-gray-100 text-gray-400'}`}>5</span>
                      <span className="text-[9px] font-bold text-gray-700 uppercase tracking-wider block">Delivered</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Column: Live Atelier Activity Ticker Log */}
              <div className="lg:col-span-5 flex flex-col h-[52vh] sm:h-auto border border-gray-100 rounded-3xl overflow-hidden bg-gray-50/50">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center shrink-0">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Atelier Ticker
                  </span>
                  <span className="text-[9px] text-gray-400 italic">Auto-refresh active</span>
                </div>

                {/* Log Terminal List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[10px]">
                  {activityLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2 items-start"
                    >
                      <span className="text-amber-800 font-semibold">[{log.time}]</span>
                      <span className={log.category === 'system' ? 'text-gray-400' : log.category === 'logistics' ? 'text-amber-600 font-bold' : 'text-gray-800'}>
                        {log.text}
                      </span>
                    </motion.div>
                  ))}
                  
                  {/* Blinking loader dot inside logs showing active progress */}
                  <div className="flex gap-2 items-center text-gray-400 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-800 animate-pulse"></span>
                    <span>Waiting for next tailoring milestone...</span>
                  </div>
                  
                  <div ref={logEndRef} />
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-gray-100 bg-white space-y-3 shrink-0">
                  <div className="bg-amber-50/30 border border-amber-100/30 p-3 rounded-xl flex flex-col gap-1 text-[10px]">
                    <span className="font-bold text-amber-950 uppercase tracking-wider block">📏 Fitting Clarification?</span>
                    <span className="text-gray-500">Need to make adjustments to your size or length request? Speak directly to your cutter.</span>
                  </div>
                  <a
                    href={getWhatsAppSupportLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase tracking-widest text-[10px] py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle size={14} /> Contact Atelier on WhatsApp
                  </a>
                </div>

              </div>

            </div>
          )}

          {/* 4. Default Search Prompt */}
          {!isSearching && !orderFound && (
            <div className="h-[40vh] flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-5xl text-amber-950/40">📐</span>
              <p className="font-serif text-gray-500 italic text-sm">
                Enter your unique order reference code above to inspect drapes and track logistics in real-time.
              </p>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
}
