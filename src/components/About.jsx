import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Code2, 
  GraduationCap, 
  BrainCircuit, 
  Terminal, 
  CheckCircle2, 
  Award, 
  Sparkles
} from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function About({ onOpenResume }) {
  return (
    <section id="about" className="relative min-h-[100dvh] w-full py-20 bg-white border-t border-slate-200/80 flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[96vw] px-4 sm:px-8 lg:px-12 mx-auto flex flex-col justify-center my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.06]">
            Building With Purpose. <br />
            <span className="accent-gradient-text">Creating With Code.</span>
          </h2>
        </div>

        {/* 3 Major Pillars Grid Spread Across Full Viewport */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          
          {/* Card 1 */}
          <div className="white-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group hover:border-indigo-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 font-bold shadow-xs">
                <Code2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2 group-hover:text-indigo-600 transition-colors">
                Full Stack Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Hands-on engineering across both Java/Spring and MERN stacks. Proficient in modular backend service layers, RESTful endpoints, and responsive frontend UI components.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-mono font-bold text-slate-700">
              <span className="px-3 py-1 rounded-lg bg-slate-100">Java</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100">Spring Boot</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100">React.js</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100">Node.js</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="white-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group hover:border-blue-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 font-bold shadow-xs">
                <GraduationCap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2 group-hover:text-blue-600 transition-colors">
                Academic Distinction
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Consistently ranked at the top of cohort in Master of Computer Applications (<strong className="text-slate-900 font-bold">9.02 CGPA</strong>) and B.Sc Computer Science (<strong className="text-slate-900 font-bold">9.28 CGPA</strong>).
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-mono font-bold">
              <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700">MCA: 9.02</span>
              <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700">B.Sc: 9.28</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700">MPC: 98.4%</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="white-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group hover:border-emerald-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 font-bold shadow-xs">
                <BrainCircuit className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2 group-hover:text-emerald-600 transition-colors">
                Python &amp; ML Pursuit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Expanding capabilities into Machine Learning with Python (NumPy, Pandas) to complement robust backend services with algorithmic data analysis and intelligence.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-mono font-bold text-slate-700">
              <span className="px-3 py-1 rounded-lg bg-slate-100">Python</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100">NumPy</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100">Pandas</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100">Data Analytics</span>
            </div>
          </div>

        </div>

        {/* Real Numbers Metrics Strip Spread Across Full Width */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
          {personalData.stats.slice(0, 4).map((stat, idx) => (
            <div key={idx} className="text-left">
              <div className="text-2xl sm:text-4xl font-black text-slate-950 font-mono tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-800">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
