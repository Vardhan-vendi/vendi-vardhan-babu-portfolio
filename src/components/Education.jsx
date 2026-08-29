import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="relative min-h-[100dvh] w-full py-20 bg-slate-50/50 border-t border-slate-200/80 flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[96vw] px-4 sm:px-8 lg:px-12 mx-auto flex flex-col justify-center my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Academic Journey
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl">
            Consistently high academic standing across post-graduate, undergraduate, and intermediate studies.
          </p>
        </div>

        {/* Timeline Cards Grid across width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {educationData.map((edu, idx) => (
            <div key={idx} className="white-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group hover:border-indigo-300">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                    {edu.period}
                  </span>

                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                    🏆 {edu.score}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-950 mb-1 group-hover:text-indigo-600 transition-colors">
                  {edu.degree}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                  <span className="font-bold text-slate-800">{edu.institution}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                    {edu.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                  {edu.highlight}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 font-mono font-bold text-[10px]">
                {edu.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
