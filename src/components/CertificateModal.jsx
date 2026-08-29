import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Award, 
  Calendar, 
  Building2, 
  ExternalLink 
} from 'lucide-react';

export default function CertificateModal({ certificate, allCertificates, onClose, onSelect }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate]);

  if (!certificate) return null;

  const currentIndex = allCertificates.findIndex(c => c.id === certificate.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allCertificates.length;
    onSelect(allCertificates[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allCertificates.length) % allCertificates.length;
    onSelect(allCertificates[prevIndex]);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const resetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative z-10 w-full max-w-5xl h-[90vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {certificate.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                #{certificate.id} of {allCertificates.length} • {certificate.issuer}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-sm">
              <button onClick={zoomOut} className="p-1 text-slate-500 hover:text-slate-900" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-700 px-1">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={zoomIn} className="p-1 text-slate-500 hover:text-slate-900" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={resetZoom} className="p-1 text-slate-500 hover:text-slate-900 ml-1" title="Reset Zoom">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={certificate.image}
              download={`Certificate-${certificate.id}-${certificate.issuer}.jpg`}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Download Certificate"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="relative flex-1 bg-slate-100 flex items-center justify-center p-4 overflow-hidden select-none">
          <button
            onClick={handlePrev}
            className="absolute left-4 z-20 p-3 rounded-full bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 shadow-lg hover:scale-110 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center overflow-auto">
            <img
              key={certificate.id}
              src={certificate.image}
              alt={certificate.title}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-full max-w-full object-contain rounded-xl shadow-md border border-slate-300 transition-transform duration-200"
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 z-20 p-3 rounded-full bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 shadow-lg hover:scale-110 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-900">{certificate.issuer}</span>
            <span>•</span>
            <span className="font-mono">{certificate.date}</span>
            {certificate.certCode && (
              <>
                <span>•</span>
                <span className="font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {certificate.certCode}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {certificate.skills?.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
