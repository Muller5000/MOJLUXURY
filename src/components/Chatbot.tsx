import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, HelpCircle } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  showWhatsAppButton?: boolean;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Welcome to MOJLUXURY Atelier! 🌟 I am your digital fashion concierge. How can I assist you with your luxury traditional wear today?',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const chatbotPrompts = [
    {
      id: 'sizing',
      label: '📐 Sizing & Bespoke Fits',
      response: 'Every woman\'s body is uniquely beautiful. You can select standard UK sizes (UK 6 to 24) or input custom chest/waist/hip measurements for free bespoke tailoring on any item! We offer custom drapes and hem/sleeve adjustments at no extra cost.',
    },
    {
      id: 'timeline',
      label: '⏳ Production & Delivery',
      response: 'For standard ready-to-wear pieces, DHL Express delivery takes 5-7 business days. For custom bespoke fitting orders, please allow 3-5 additional days for our master tailors to handcraft your perfect fit.',
    },
    {
      id: 'showroom',
      label: '📍 Victoria Island Showroom',
      response: 'Our luxury flagship showroom is located in Victoria Island, Lagos. You are welcome to book a personal styling and fitting session! Click the button below to schedule your appointment on WhatsApp.',
    },
    {
      id: 'stylist',
      label: '💬 Chat with Lead Stylist',
      response: 'Connecting you directly to our lead atelier stylist on WhatsApp! Click the button below to start your personal styling consultation.',
      showWhatsApp: true,
    },
  ];

  const handlePromptClick = (label: string, response: string, showWhatsApp = false) => {
    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: label,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate luxury typing effect
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        sender: 'bot',
        text: response,
        timestamp: new Date(),
        showWhatsAppButton: showWhatsApp || label.includes('Showroom') || label.includes('Stylist') || label.includes('Fits'),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const getWhatsAppLink = (messageText: string) => {
    const defaultText = `Hi MOJLUXURY! 🌟 I'm visiting your website and would love to consult with a stylist about sizing and bespoke fittings.`;
    const encoded = encodeURIComponent(defaultText);
    return `https://wa.me/2348084424520?text=${encoded}`;
  };

  return (
    <>
      {/* Floating Chat Bubble Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-amber-950 hover:bg-black text-amber-200 hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-amber-900/30 cursor-pointer group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300">
            Styling Concierge
          </span>
        )}
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-amber-100 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 p-4 flex justify-between items-center text-white border-b border-amber-900/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-900/50 flex items-center justify-center border border-amber-500/20 text-amber-400">
                  <Sparkles size={16} />
                </div>
                <div>
                  <span className="block text-xs font-serif font-bold uppercase tracking-widest text-amber-200">MOJLUXURY Concierge</span>
                  <span className="block text-[9px] uppercase tracking-wider text-amber-400 font-semibold">Atelier Styling Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-amber-900/40 rounded-full transition-colors text-amber-300 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-amber-50/10">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-950 text-white rounded-br-none shadow-sm'
                        : 'bg-white border border-amber-100/50 text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    
                    {/* Inline WhatsApp Transition Button */}
                    {msg.showWhatsAppButton && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3"
                      >
                        <a
                          href={getWhatsAppLink(msg.text)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-[9px] px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                        >
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.29-3.856l.361.214c1.6.95 3.798 1.452 5.352 1.453 5.518 0 10.01-4.486 10.01-10.006.002-2.673-1.036-5.187-2.923-7.073C17.18 2.845 14.673 1.806 12 1.806c-5.522 0-10.012 4.488-10.015 10.01-.001 1.898.506 3.748 1.47 5.4l.235.402L2.73 21.09l3.617-.946z" />
                          </svg>
                          Chat Live on WhatsApp
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing simulation bubble */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-amber-100/50 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-amber-900 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Curated styling prompts footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-2">
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <HelpCircle size={10} /> Concierge Styling Prompts
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                {chatbotPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => handlePromptClick(prompt.label, prompt.response, prompt.showWhatsApp)}
                    className="text-[10px] bg-white hover:bg-amber-50 hover:text-amber-950 font-medium text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-100 hover:border-amber-200 transition-colors shadow-2xs text-left cursor-pointer"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
