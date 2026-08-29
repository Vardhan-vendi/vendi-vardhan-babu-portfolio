import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Cpu, 
  FolderGit2, 
  Award, 
  GraduationCap, 
  Send, 
  FileText, 
  Menu, 
  X, 
  ArrowUpRight
} from 'lucide-react';
import { personalData } from '../data/portfolioData';

const navItems = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Cpu },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Certificates', href: '#certificates', icon: Award, count: '13' },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Send },
];

export default function Navbar({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'certificates', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 lg:px-16 py-3 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-[96vw] flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md'
            : 'bg-white/85 backdrop-blur-md border border-slate-200/70 shadow-sm'
        }`}
      >
        {/* Left: Avatar Monogram */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex items-center gap-3 group shrink-0"
          aria-label="Vendi Vardhan Babu - Home"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-900 p-[1px] shadow-sm group-hover:scale-105 transition-transform">
            <img
              src="/profile-transparent.png"
              alt="Avatar"
              className="w-full h-full object-cover rounded-full bg-slate-100"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-black text-slate-950 tracking-tight group-hover:text-indigo-600 transition-colors">
              {personalData.name}
            </span>
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links with Bold Icons */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 border border-indigo-200/60 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 stroke-[2.5] ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span>{item.name}</span>
                {item.count && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 font-extrabold">
                    {item.count}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Right Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 stroke-[2.5] text-indigo-600" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-indigo-600 shadow-sm transition-all"
          >
            <Send className="w-3 h-3 stroke-[2.5]" />
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="View Resume"
          >
            <FileText className="w-4 h-4 stroke-[2.5] text-indigo-600" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col gap-1 lg:hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 stroke-[2.5] text-slate-500" />
                    <span>{item.name}</span>
                  </div>
                  {item.count && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                      {item.count}
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 stroke-[2.5] text-indigo-600" />
                <span>View Full Resume</span>
              </button>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
