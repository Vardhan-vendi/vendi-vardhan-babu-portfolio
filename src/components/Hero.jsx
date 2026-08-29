import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  MapPin, 
  ChevronDown,
  Sparkles,
  Layers,
  Code2,
  Atom,
  Server,
  Database,
  Cpu,
  Coffee,
  Check,
  Copy
} from 'lucide-react';
import { JavaIcon, SpringBootIcon, ReactIcon, NodeIcon } from './icons/TechIcons';
import GithubIcon from './icons/GithubIcon';
import { usePortfolio } from '../context/PortfolioContext';

// 4 Floating Skill Badges with official brand icons
const skillOrbs = [
  { name: 'Java', icon: JavaIcon, color: 'text-red-600 bg-red-50/80 border-red-200/80', pos: 'top-6 -left-6 sm:-left-12', delay: 0 },
  { name: 'Spring Boot', icon: SpringBootIcon, color: 'text-emerald-600 bg-emerald-50/80 border-emerald-200/80', pos: 'top-24 -right-6 sm:-right-12', delay: 0.8 },
  { name: 'React.js', icon: ReactIcon, color: 'text-cyan-600 bg-cyan-50/80 border-cyan-200/80', pos: 'bottom-24 -left-6 sm:-left-14', delay: 1.4 },
  { name: 'Node.js', icon: NodeIcon, color: 'text-green-600 bg-green-50/80 border-green-200/80', pos: 'bottom-12 -right-6 sm:-right-12', delay: 2.1 },
];

export default function Hero({ onOpenResume }) {
  const { personal, certificates } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full h-[100dvh] min-h-[580px] max-h-[100dvh] bg-white pt-24 sm:pt-28 pb-6 px-6 sm:px-12 lg:px-16 flex flex-col justify-between items-center overflow-hidden z-10 select-none"
    >
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-50/70 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-cyan-50/70 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Main Full-Width Viewport Container */}
      <div className="w-full max-w-[96vw] mx-auto my-auto flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Expressive Typography & CTAs (7 Cols - Spread Out) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide mb-4 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles</span>
            </div>

            {/* Huge Expressive Name Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-slate-950 tracking-tight leading-[1.04] mb-3">
              Hi, I'm <br />
              <span className="accent-gradient-text">
                {personal.name}
              </span>
            </h1>

            {/* Sub-Headline & Academic Standing */}
            <div className="flex flex-wrap items-center gap-2.5 text-sm sm:text-base font-bold text-slate-700 mb-4">
              <span>Full Stack &amp; Java Developer</span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-600 font-mono font-extrabold bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200/60">
                MCA 9.02 CGPA
              </span>
            </div>

            {/* Concise Value Proposition */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-normal">
              Specializing in <strong className="text-slate-900 font-bold">Core Java, Spring Boot, React.js, Node.js</strong>, and modern databases. I engineer high-performance backend systems and fluid, responsive digital experiences.
            </p>

            {/* Action Triggers */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-slate-900 hover:bg-indigo-600 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-white" />
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-xs hover:scale-105 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5] text-slate-600" />
                <span>Resume PDF</span>
              </button>

              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs font-mono font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all cursor-pointer"
                title="Copy email"
              >
                {copied ? <Check className="w-4 h-4 stroke-[2.5] text-emerald-600" /> : <Copy className="w-4 h-4 stroke-[2.5] text-slate-500" />}
                <span>{copied ? 'Copied' : 'Email'}</span>
              </button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-950 font-black text-sm">9.02</span>
                <span className="text-slate-500 font-bold">MCA CGPA</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-600 font-black text-sm">13+</span>
                <span className="text-slate-500 font-bold">Certifications</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 stroke-[2.5] text-slate-400" />
                <span>{personal.location}</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Floating Portrait & Skill Pills (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative order-1 lg:order-2"
          >
            {/* Ambient Radial Ring */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-indigo-50 blur-3xl -z-10" />

            {/* Portrait Container */}
            <div className="relative w-64 sm:w-80 md:w-96 flex flex-col items-center">
              
              {/* Floating Skill Badges */}
              {skillOrbs.map((orb, i) => {
                const Icon = orb.icon;
                return (
                  <motion.div
                    key={orb.name}
                    animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
                    className={`absolute ${orb.pos} z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl floating-pill border ${orb.color}`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                    <span className="text-[11px] font-extrabold tracking-tight text-slate-800 whitespace-nowrap">{orb.name}</span>
                  </motion.div>
                );
              })}

              {/* Main Transparent Portrait */}
              <motion.img
                src="/profile-transparent.png"
                alt={personal.name}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-auto max-h-[380px] sm:max-h-[440px] md:max-h-[480px] object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.18)]"
              />

              {/* Bottom Identity Pill */}
              <div className="absolute -bottom-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-md flex items-center gap-2 z-20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-slate-900 tracking-wide">{personal.name}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-extrabold border border-indigo-200">
                  9.02 CGPA
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Bottom Viewport Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer pt-1 group select-none"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 font-bold">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 stroke-[2.5] text-indigo-600 group-hover:translate-y-0.5 transition-transform" />
      </motion.button>

    </section>
  );
}
