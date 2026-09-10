import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, PlayCircle, Plus, Minus, MessageCircle, MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import heritageImage from '../assets/heritage_image.jpg';

export function InfoHub() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const faqs = [
    {
      q: "How does ready-to-wear sizing work?",
      a: "Our ready-to-wear (RTW) garments follow our custom luxury size chart, ranging from UK 6 to UK 22. Every item features generous, tailored seam allowances so they can be easily adjusted by a local tailor if you change sizes. Check out our interactive Size Guide above to find your exact match!"
    },
    {
      q: "What is your turnaround time for Custom/Bespoke fitting?",
      a: "Bespoke custom-made garments are individually hand-draped and tailored in our Lagos atelier. Standard bespoke production takes 7-10 business days from the moment you submit your measurements. For rush orders (3-5 business days), an express fee may apply."
    },
    {
      q: "Can I book an in-person showroom consultation in Lagos?",
      a: "Absolutely! We love welcoming members of the tribe. You can book an appointment to visit our Victoria Island showroom by selecting 'Book Showroom Appointment' in the Contact Us form, or by clicking our floating WhatsApp button. Our showroom features exclusive designs not listed online."
    },
    {
      q: "Are payments safe on your platform?",
      a: "Extremely safe. We partner with Paystack and Flutterwave, West Africa's leading secure payment processors, to accept local debit cards, USSD, bank transfers, and international Mastercard/Visa cards. All transactions are fully encrypted, and your card details never touch our servers."
    },
    {
      q: "Can I make changes to my measurements after placing a bespoke order?",
      a: "We begin cutting fabrics 24 hours after order placement. If you need to update any measurement (bust, waist, hip, or dress length), please contact our design team via WhatsApp immediately with your Order ID, and we will gladly adjust it for you free of charge."
    }
  ];

  const testimonials = [
    {
      quote: "The custom fitting was absolute perfection! I wore the custom draped Mikado silk to my sister's Owambe in Lagos, and I lost count of the compliments. MOJLUXURY has earned a lifelong customer.",
      name: "Adesua Balogun",
      role: "Owambe Guest",
      rating: 5,
      outfit: "Bespoke Mikado Silk Wrapper Set"
    },
    {
      quote: "Shipping to London was incredibly fast—arrived via DHL in just 4 days. The Adire print fabric is premium and feels very luxurious against the skin. Fits my curves without a single adjustment.",
      name: "Dr. Chioma Nwachukwu",
      role: "International Client (UK)",
      rating: 5,
      outfit: "Ready-to-Wear Adire Midi Dress"
    },
    {
      quote: "Visiting their Victoria Island showroom was a dream. The design team took my exact waist and hip measurements and tailored my Sunday Best outfit free of fitting fees. Outstanding service!",
      name: "Funmilayo Adebayo",
      role: "Showroom Client",
      rating: 5,
      outfit: "Sunday Best Embroidered Dress"
    },
    {
      quote: "I ordered my traditional wedding wrapper and gele from MOJLUXURY. The handwoven Aso Oke is of supreme quality and the gold embroidery is incredibly detailed. Absolute masterpiece.",
      name: "Zainab Bello",
      role: "Owambe Bride",
      rating: 5,
      outfit: "Custom Handwoven Aso Oke Set"
    },
    {
      quote: "As an executive, finding stylish and modest African coordinates that fit perfectly is difficult. Their Corporate Slay sets fit exceptionally well. Highly recommend their tailoring!",
      name: "Kemi Alabi",
      role: "Corporate Client",
      rating: 5,
      outfit: "Corporate Slay Mikado Coord"
    },
    {
      quote: "I love their Ready-to-Wear Shift dresses. They are so breathable, perfect for Lagos heat, yet they look incredibly elegant and high-fashion.",
      name: "Amara Okafor",
      role: "RTW Regular Client",
      rating: 5,
      outfit: "RTW Linen Shift Dress"
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 5000);
  };

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      
      {/* 1. OUR STORY / ABOUT US SECTION */}
      <motion.section 
        id="about-story-section" 
        className="py-20 md:py-28 bg-gray-50/50 border-t border-gray-100 scroll-mt-24"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs text-amber-800 font-bold uppercase tracking-[0.25em] block">
                Fashion Design Agency & Academy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 tracking-wide uppercase leading-tight">
                Our Story & Mission
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                MOJLUXURY is a premier Fashion Design Agency. We don't just sell clothes; we curate entire wardrobes. From designing high-quality everyday ready-to-wear pieces that fit flawlessly, to sourcing and supplying premium clothing materials like authentic Adire, silks, and Ankara.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Beyond creating fashion, our passion is passing down the craft. Through the <strong>MOJLUXURY Fashion Academy</strong>, we tutor and mentor upcoming fashion designers, offering masterclasses in pattern drafting, garment construction, and fashion business management to empower the next generation of global designers.
              </p>
              <div className="border-l-4 border-amber-800/40 pl-4 italic text-sm text-gray-700 font-serif">
                "Whether we are drafting a new ready-to-wear collection, sourcing raw materials, or guiding a student through their first stitch, our mission is to elevate fashion at every step of the journey."
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <img 
                src={heritageImage} 
                alt="Our Heritage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 max-w-[80%]">
                <span className="block text-sm font-bold text-white uppercase tracking-widest mb-1 drop-shadow-md">Mojisola Ajayi</span>
                <span className="block text-[10px] text-amber-300 uppercase tracking-wider font-semibold drop-shadow-md">Creative Director & Founder</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. TESTIMONIALS SECTION */}
      <motion.section 
        id="testimonials-section" 
        className="py-20 md:py-28 bg-[#1f1a17] text-white relative overflow-hidden scroll-mt-24"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Inline styles for the infinite horizontal marquee */}
        <style>{`
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marqueeRight 45s linear infinite;
          }
          .animate-marquee-right:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-[0.25em] block mb-1">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide uppercase">
              Loved by the Tribe
            </h2>
            <p className="text-xs text-amber-200/60 max-w-md mx-auto mt-2 italic font-serif">
              Real experiences from premium women styled in our signature traditional and ready-to-wear garments. Hover to pause.
            </p>
          </div>
        </div>

        {/* Infinite scrolling viewport */}
        <div className="w-full overflow-hidden relative z-10 py-4 select-none">
          <div className="animate-marquee-right flex gap-8 px-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i} 
                className="bg-[#29231f] border border-amber-900/20 p-8 rounded-3xl flex flex-col justify-between space-y-6 w-[360px] flex-shrink-0 hover:-translate-y-2.5 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/30 transition-all duration-500 shadow-xl"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, idx) => (
                      <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-amber-100/80 italic leading-relaxed font-serif">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-amber-950/40 pt-4 flex flex-col space-y-1">
                  <span className="text-xs font-bold tracking-wider text-amber-300 uppercase">{t.name}</span>
                  <div className="flex justify-between items-center text-[10px] text-amber-200/50 uppercase tracking-widest font-semibold gap-2">
                    <span>{t.role}</span>
                    <span className="bg-amber-950 text-amber-400 px-2.5 py-0.5 rounded border border-amber-900/30 truncate max-w-[180px]">
                      {t.outfit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. SHIPPING & RETURNS SECTION */}
      <motion.section 
        id="shipping-returns-section" 
        className="py-20 md:py-28 bg-white border-y border-gray-100 scroll-mt-24"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs text-amber-800 uppercase tracking-[0.25em] font-semibold block mb-1">
              Care & Deliveries
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide uppercase">
              Shipping & Fits Policy
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 italic font-serif">
              Our commitment to smooth domestic logistics, international delivery, and flawless custom fitting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100/50 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-amber-900/10 pb-4">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="font-serif text-base text-gray-900 font-semibold uppercase tracking-wider">Premium Logistics</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Lagos showroom, Domestic & DHL Global</span>
                </div>
              </div>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-800 mt-1 font-bold">✓</span>
                  <div>
                    <strong>Showroom Pick-up (Lagos):</strong> 
                    <p className="text-xs text-gray-500 mt-0.5">Complimentary pick-up at Victoria Island showroom, ready within 2-4 business days.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-800 mt-1 font-bold">✓</span>
                  <div>
                    <strong>Standard Nigerian Shipping:</strong> 
                    <p className="text-xs text-gray-500 mt-0.5">₦3,500 within Lagos (1-2 days), ₦7,500 for other Nigerian states via GIGM/GIG Logistics (3-5 days).</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-800 mt-1 font-bold">✓</span>
                  <div>
                    <strong>Worldwide DHL Express:</strong> 
                    <p className="text-xs text-gray-500 mt-0.5">Flat-rate $35 shipping to US, UK, Canada, and Europe. Fully tracked delivery in 3-7 business days.</p>
                  </div>
                </li>
              </ul>
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/30 text-xs text-amber-900 leading-relaxed">
                ⚠️ <strong>International Custom Duties:</strong> Import tariffs, customs fees, and local taxes may be applied by the destination country's authorities and are the sole responsibility of the customer.
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100/50 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-amber-900/10 pb-4">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="font-serif text-base text-gray-900 font-semibold uppercase tracking-wider">Returns & Fit Policy</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hassle-Free RTW Returns & Custom Adjustment Guarantee</span>
                </div>
              </div>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-800 mt-1 font-bold">✓</span>
                  <div>
                    <strong>Ready-to-Wear (RTW) Policy:</strong> 
                    <p className="text-xs text-gray-500 mt-0.5">We accept returns of standard size RTW items within 7 days of delivery. Garments must be unworn, unwashed, and in original packaging with secure luxury tags attached.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-800 mt-1 font-bold">✓</span>
                  <div>
                    <strong>Bespoke Custom Orders:</strong> 
                    <p className="text-xs text-gray-500 mt-0.5">Because bespoke orders are individually custom-cut and tailored to your specific measurements, they are non-refundable and exempt from standard return rules.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-800 mt-1 font-bold">✓</span>
                  <div>
                    <strong>Free Alteration Clause:</strong> 
                    <p className="text-xs text-gray-500 mt-0.5">In the rare event that your bespoke garment does not fit as desired, we offer free professional alterations inside our Lagos showroom or will subsidize local adjustment up to $25/₦20,000.</p>
                  </div>
                </li>
              </ul>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/30 text-xs text-emerald-950 leading-relaxed">
                ✨ <strong>Return Initiation:</strong> Simply email <span className="underline">orders@mojluxury.com</span> with your invoice within the window, and we will schedule your courier pick-up.
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
      <motion.section 
        id="faqs-section" 
        className="py-20 md:py-28 bg-gray-50/30 scroll-mt-24"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs text-amber-800 uppercase tracking-[0.25em] font-semibold block mb-1">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide uppercase">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 italic font-serif">
              Answering your inquiries about traditional custom fits, booking consultations, and secure online ordering.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200/80 bg-white rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center text-sm font-semibold uppercase tracking-wider text-gray-800 hover:text-amber-950 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-700 font-serif text-lg leading-none">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-gray-600 border-t border-gray-100/50 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* 5. CONTACT US SECTION */}
      <motion.section 
        id="contact-section" 
        className="py-20 md:py-28 bg-white border-t border-gray-100 scroll-mt-24"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs text-amber-800 uppercase tracking-[0.25em] font-semibold block mb-1">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide uppercase">
              Contact the Atelier
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 italic font-serif">
              Book a fitting session, inquire about custom fabric drops, or update your tailored fitting measurements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Form column */}
            <div className="lg:col-span-7 bg-gray-50 p-8 rounded-2xl border border-gray-100/50 shadow-sm flex flex-col justify-center">
              <h3 className="font-serif text-base text-gray-900 font-semibold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200/50">
                Send a Message
              </h3>
              
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center space-y-4"
                >
                  <div className="w-12 h-12 bg-amber-100 text-amber-900 flex items-center justify-center rounded-full text-xl font-bold shadow-inner">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg text-amber-955 font-bold uppercase tracking-wider">Message Received!</h4>
                  <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                    Thank you for reaching out to the tribe. A lead design consultant will contact you via WhatsApp text within 2 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Adesua Balogun"
                        className="w-full bg-white border border-gray-200/80 px-4 py-3 text-sm focus:outline-none focus:border-amber-900 rounded-lg transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. adesua@gmail.com"
                        className="w-full bg-white border border-gray-200/80 px-4 py-3 text-sm focus:outline-none focus:border-amber-900 rounded-lg transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">WhatsApp Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full bg-white border border-gray-200/80 px-4 py-3 text-sm focus:outline-none focus:border-amber-900 rounded-lg transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Inquiry Type</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-white border border-gray-200/80 px-4 py-3 text-sm focus:outline-none focus:border-amber-900 rounded-lg cursor-pointer transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Custom Sizing Adjustments">Custom Sizing Adjustments</option>
                        <option value="Order Support & Tracking">Order Support & Tracking</option>
                        <option value="Book Showroom Appointment">Book Showroom Appointment</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Your Message</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your event date, required custom measurements, or design preferences..."
                      className="w-full bg-white border border-gray-200/80 px-4 py-3 text-sm focus:outline-none focus:border-amber-900 rounded-lg transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-amber-950 text-white py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase hover:bg-black transition-colors shadow-sm"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Showroom & Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100/50 shadow-sm flex-1 space-y-4">
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-widest block">Flagship Showroom</span>
                <h4 className="font-serif text-lg text-gray-900 font-semibold uppercase tracking-wider">Lagos Showroom</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Visit us for standard-size fittings, custom measurement consultations, and an exclusive in-person look at our heritage collections.
                </p>
                <div className="text-xs text-gray-700 space-y-3 pt-2">
                  <div className="flex gap-2">
                    <span>📍</span>
                    <div>
                      <strong>Address:</strong>
                      <p className="text-gray-500 mt-0.5">Suite 12, Landmark Heritage Tower, Water Corporation Drive, Victoria Island, Lagos, Nigeria.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span>🕒</span>
                    <div>
                      <strong>Opening Hours:</strong>
                      <p className="text-gray-500 mt-0.5">Tuesday - Saturday: 10:00 AM - 6:00 PM<br />Sunday: By Appointment Only</p>
                    </div>
                  </div>
                </div>

                {/* Live Interactive Map */}
                <div className="w-full h-[180px] rounded-xl overflow-hidden shadow-inner border border-gray-200/50 mt-4 relative">
                  <iframe 
                    title="MOJLUXURY Lagos Showroom Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.717013233834!2d3.4243613758832746!3d6.430399923055959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf52de22c4ab1%3A0x2ad1b138402db380!2sLandmark%20Towers!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                    className="w-full h-full border-none"
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-950 to-amber-900 text-amber-200 p-8 rounded-2xl shadow-md space-y-4">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Live WhatsApp Atelier Chat</span>
                <h4 className="font-serif text-base text-white uppercase tracking-wider font-semibold">Immediate Assistance</h4>
                <p className="text-xs text-amber-100/70 leading-relaxed">
                  Need custom advice on choosing an Owambe outfit or selecting fabrics? Chat with our designers directly on WhatsApp.
                </p>
                <a 
                  href="https://wa.me/2348000000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-amber-950 font-bold px-6 py-3 text-xs tracking-widest uppercase hover:bg-amber-50 rounded-lg shadow-sm transition-colors"
                >
                  💬 WhatsApp Designer
                </a>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 6. PRIVACY POLICY & TERMS OF SERVICE Drawer (Flutterwave/Paystack Compliance) */}
      <section id="privacy-terms-section" className="py-8 bg-gray-50 border-t border-gray-200/50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button 
            onClick={() => setOpenPrivacy(!openPrivacy)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-amber-950 transition-colors border border-gray-200 bg-white px-6 py-3 rounded-full shadow-sm"
          >
            <span>📜 Secure Payment Safety Compliance & Privacy Policy</span>
            <span className="font-serif text-xs leading-none">{openPrivacy ? '▲' : '▼'}</span>
          </button>

          <AnimatePresence>
            {openPrivacy && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="text-left mt-8 p-8 bg-white border border-gray-200 rounded-2xl text-xs text-gray-600 leading-relaxed space-y-6 shadow-sm">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-serif text-sm text-gray-900 font-semibold uppercase tracking-wider mb-1">Merchant Payment Safety Compliance</h3>
                    <p className="text-gray-400 font-semibold">Required terms of operation for secure Flutterwave & Paystack gateway processing.</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 uppercase tracking-wider">1. Secure E-Commerce Payment Policy</h4>
                    <p>
                      All online credit, debit card and bank transfer transactions on MOJLUXURY are processed securely through premium payment processors, Paystack (licensed by the Central Bank of Nigeria) and Flutterwave. All transactions utilize advanced AES-256 bank-level encryption. Your critical card details are never saved, stored, or inspected by our servers.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 uppercase tracking-wider">2. Custom Tailoring Order and Measurement Intake Agreement</h4>
                    <p>
                      When ordering custom bespoke items, you agree to submit highly accurate measurements (bust, waist, hips, and overall length). We cut and tailor the garment specifically for your shape. While we provide free adjustments/alterations for minor fit deviations, you acknowledge that custom-cut orders cannot be restocked or returned for a cash refund.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 uppercase tracking-wider">3. Shipping, International Tariffs & Timelines</h4>
                    <p>
                      Ready-to-wear orders dispatch in 2 business days. Custom bespoke orders require 7-10 business days for hand-tailoring before shipping. We deliver worldwide using DHL Express. Customers are solely responsible for local customs fees, import duties, and VAT charges assessed by destination country customs offices.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 uppercase tracking-wider">4. Privacy Policy & Client Information Safety</h4>
                    <p>
                      We collect your full name, email, phone number, and measurements solely to fulfill custom-fitting garments and dispatch standard orders. We will never sell, lease, or distribute your email or physical address to third-party marketing companies. You may request deletion of your fitting details by emailing support@mojluxury.com.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
