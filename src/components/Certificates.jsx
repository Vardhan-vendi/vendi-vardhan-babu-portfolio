import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  Building2, 
  Calendar
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import CertificateModal from './CertificateModal';

const categories = [
  { id: 'all', label: 'All Certifications' },
  { id: 'Frontend & React', label: 'React & Frontend' },
  { id: 'Backend & APIs', label: 'Backend & APIs' },
  { id: 'Python & SQL', label: 'Python & SQL' },
  { id: 'Full Stack Web', label: 'Full Stack' },
  { id: 'Cloud & DevOps', label: 'Cloud' },
];

export default function Certificates() {
  const { certificates } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCertModal, setActiveCertModal] = useState(null);

  const filteredCerts = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(c => c.category === selectedCategory || (selectedCategory === 'Frontend & React' && c.category.includes('Frontend')));

  useEffect(() => {
    if (activeIndex >= filteredCerts.length) {
      setActiveIndex(0);
    }
  }, [selectedCategory, filteredCerts.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeCertModal) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, filteredCerts.length, activeCertModal]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredCerts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredCerts.length) % filteredCerts.length);
  };

  const currentCert = filteredCerts[activeIndex] || filteredCerts[0];

  return (
    <section id="certificates" className="relative min-h-[100dvh] w-full py-20 bg-slate-50/50 border-t border-slate-200/80 flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[96vw] px-4 sm:px-8 lg:px-12 mx-auto flex flex-col items-center justify-center my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Certifications &amp; Learning
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Interactive horizontal 3D carousel. Use arrow buttons or click side cards to navigate.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 z-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal 3D Carousel Stage */}
        <div className="relative w-full max-w-6xl h-[340px] sm:h-[420px] md:h-[460px] flex items-center justify-center my-4 overflow-hidden">
          
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-30 p-3.5 rounded-full bg-white text-slate-800 hover:text-indigo-600 border border-slate-200 shadow-xl hover:scale-110 transition-all cursor-pointer"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Cards Stack */}
          <div className="relative w-full h-full flex items-center justify-center [perspective:1400px]">
            {filteredCerts.map((cert, index) => {
              const diff = index - activeIndex;
              let normalizedDiff = diff;
              if (normalizedDiff > filteredCerts.length / 2) normalizedDiff -= filteredCerts.length;
              if (normalizedDiff < -filteredCerts.length / 2) normalizedDiff += filteredCerts.length;

              const isVisible = Math.abs(normalizedDiff) <= 2;
              if (!isVisible) return null;

              const isCenter = normalizedDiff === 0;
              const xOffset = normalizedDiff * (window.innerWidth < 640 ? 170 : 290);
              const scale = isCenter ? 1 : Math.max(0.68, 1 - Math.abs(normalizedDiff) * 0.16);
              const opacity = isCenter ? 1 : Math.max(0.4, 1 - Math.abs(normalizedDiff) * 0.28);
              const rotateY = normalizedDiff * -16;
              const zIndex = 20 - Math.abs(normalizedDiff);

              return (
                <motion.div
                  key={cert.id}
                  onClick={() => {
                    if (isCenter) {
                      setActiveCertModal(cert);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    opacity: opacity,
                    rotateY: rotateY,
                    zIndex: zIndex,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  className="absolute w-[300px] sm:w-[400px] md:w-[460px] aspect-[16/10] bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden cursor-pointer group flex flex-col justify-between select-none"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative w-full h-full bg-slate-100 overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain rounded-xl"
                    />

                    {isCenter && (
                      <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-slate-950 text-xs font-black shadow-xl">
                          <ZoomIn className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                          <span>View Full-Resolution</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-900 text-white shadow-sm">
                        #{cert.id}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-30 p-3.5 rounded-full bg-white text-slate-800 hover:text-indigo-600 border border-slate-200 shadow-xl hover:scale-110 transition-all cursor-pointer"
            aria-label="Next Certificate"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Active Certificate Information Card */}
        {currentCert && (
          <motion.div
            key={currentCert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 z-10 text-center sm:text-left mt-2"
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 mb-1 font-mono">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                  {currentCert.issuer}
                </span>
                <span>•</span>
                <span>{currentCert.date}</span>
                {currentCert.certCode && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                      {currentCert.certCode}
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-950 leading-tight mb-1">
                {currentCert.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1">{currentCert.description}</p>
            </div>

            <button
              onClick={() => setActiveCertModal(currentCert)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Inspect High-Res</span>
            </button>
          </motion.div>
        )}

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5 mt-6 z-10">
          {filteredCerts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to certificate ${idx + 1}`}
            />
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeCertModal && (
            <CertificateModal
              certificate={activeCertModal}
              allCertificates={certificates}
              onClose={() => setActiveCertModal(null)}
              onSelect={(c) => setActiveCertModal(c)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
