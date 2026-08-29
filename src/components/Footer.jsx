import React from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';
import { personalData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white border-t border-slate-200">
      <div className="w-full max-w-6xl px-4 sm:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]">
                VB
              </div>
              <span className="text-sm font-bold text-slate-900">{personalData.name}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Java Full Stack &amp; MERN Developer • SPSR Nellore, AP
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalData.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 transition-colors"
              title="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Vendi Vardhan Babu. All rights reserved.
          </div>
          <div>
            Built with React, Vite &amp; Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
