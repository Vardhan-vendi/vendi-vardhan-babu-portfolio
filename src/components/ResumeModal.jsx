import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    const link = document.createElement('a');
    link.href = '/Vendi_Vardhan_Babu_Resume.pdf';
    link.download = 'Vendi_Vardhan_Babu_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.open('/Vendi_Vardhan_Babu_Resume.pdf', '_blank');
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.2));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.7));
  const resetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="relative z-10 w-full max-w-5xl h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  {personalData.name} — Official Resume
                </h3>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Verified PDF
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {personalData.role}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm">
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

            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Print / Open in New Tab"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Download Resume PDF directly"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="relative flex-1 bg-slate-100 overflow-auto p-4 sm:p-6 flex items-start justify-center select-none">
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 ease-out max-w-3xl w-full bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden"
          >
            <img
              src="/resume-preview.png"
              alt="Vendi Vardhan Babu - Resume Preview"
              className="w-full h-auto object-contain block"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document: <code className="text-slate-800 font-mono">Vendi_Vardhan_Babu_Resume.pdf</code></span>
          </div>

          <a
            href="/Vendi_Vardhan_Babu_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Open Vector PDF</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
