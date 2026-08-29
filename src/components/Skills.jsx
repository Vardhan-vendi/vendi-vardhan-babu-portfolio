import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  JavaIcon, 
  SpringBootIcon, 
  ReactIcon, 
  NodeIcon, 
  MongoIcon, 
  MySQLIcon, 
  PythonIcon, 
  JavaScriptIcon, 
  TailwindIcon, 
  HTML5Icon, 
  CSS3Icon, 
  GitIcon, 
  PostmanIcon, 
  JWTIcon 
} from './icons/TechIcons';

const iconLookup = {
  Java: JavaIcon,
  SpringBoot: SpringBootIcon,
  React: ReactIcon,
  Node: NodeIcon,
  MongoDB: MongoIcon,
  MySQL: MySQLIcon,
  Python: PythonIcon,
  JavaScript: JavaScriptIcon,
  Tailwind: TailwindIcon,
  HTML5: HTML5Icon,
  CSS3: CSS3Icon,
  Git: GitIcon,
  Postman: PostmanIcon,
  JWT: JWTIcon,
};

export default function Skills() {
  const { skills } = usePortfolio();
  const [isPausedTrack1, setIsPausedTrack1] = useState(false);
  const [isPausedTrack2, setIsPausedTrack2] = useState(false);

  const getOfficialIcon = (skill) => {
    if (skill.icon && iconLookup[skill.icon]) return iconLookup[skill.icon];
    const lower = skill.name.toLowerCase();
    if (lower.includes('java') && !lower.includes('javascript')) return JavaIcon;
    if (lower.includes('spring')) return SpringBootIcon;
    if (lower.includes('react')) return ReactIcon;
    if (lower.includes('node') || lower.includes('express')) return NodeIcon;
    if (lower.includes('mongo')) return MongoIcon;
    if (lower.includes('mysql') || lower.includes('jdbc') || lower.includes('hibernate')) return MySQLIcon;
    if (lower.includes('python') || lower.includes('machine learning')) return PythonIcon;
    if (lower.includes('javascript')) return JavaScriptIcon;
    if (lower.includes('tailwind')) return TailwindIcon;
    if (lower.includes('html')) return HTML5Icon;
    if (lower.includes('css')) return CSS3Icon;
    if (lower.includes('git')) return GitIcon;
    if (lower.includes('postman')) return PostmanIcon;
    if (lower.includes('jwt') || lower.includes('security')) return JWTIcon;
    return JavaIcon;
  };

  // Split skills into two streams
  const half = Math.ceil(skills.length / 2);
  const track1 = skills.slice(0, half);
  const track2 = skills.slice(half);

  return (
    <section id="skills" className="relative min-h-[100dvh] w-full py-20 bg-slate-50/50 border-t border-slate-200/80 flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[96vw] px-4 sm:px-8 lg:px-12 mx-auto flex flex-col justify-center my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Technologies I Work With
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl">
            Official tools and engineering frameworks moving in continuous 360° infinite rotating streams. Hover any card to pause.
          </p>
        </div>

        {/* 360° Infinite Horizontal Rotating Carousel Area */}
        <div className="flex flex-col gap-6 w-full relative">
          
          {/* Edge Gradient Masking for Smooth Infinite Blend */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

          {/* Track 1: Moving Slowly Left */}
          <div 
            className="w-full overflow-hidden select-none py-2"
            onMouseEnter={() => setIsPausedTrack1(true)}
            onMouseLeave={() => setIsPausedTrack1(false)}
          >
            <motion.div
              animate={{ x: isPausedTrack1 ? undefined : ['0%', '-50%'] }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex items-center gap-5 w-max"
            >
              {[...track1, ...track1].map((skill, index) => {
                const Icon = getOfficialIcon(skill);
                return (
                  <div
                    key={`track1-${skill.name}-${index}`}
                    className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-xl hover:border-indigo-300 hover:scale-105 transition-all duration-300 cursor-pointer shrink-0 group min-w-[260px] sm:min-w-[290px]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className="w-full h-full" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-black text-slate-950 group-hover:text-indigo-600 transition-colors leading-tight">
                        {skill.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 mt-1">
                        {skill.role || skill.desc || 'Full Stack Technology'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Track 2: Moving Slowly Right (Reverse) */}
          <div 
            className="w-full overflow-hidden select-none py-2"
            onMouseEnter={() => setIsPausedTrack2(true)}
            onMouseLeave={() => setIsPausedTrack2(false)}
          >
            <motion.div
              animate={{ x: isPausedTrack2 ? undefined : ['-50%', '0%'] }}
              transition={{
                duration: 48,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex items-center gap-5 w-max"
            >
              {[...track2, ...track2].map((skill, index) => {
                const Icon = getOfficialIcon(skill);
                return (
                  <div
                    key={`track2-${skill.name}-${index}`}
                    className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-xl hover:border-cyan-300 hover:scale-105 transition-all duration-300 cursor-pointer shrink-0 group min-w-[260px] sm:min-w-[290px]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className="w-full h-full" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-black text-slate-950 group-hover:text-cyan-600 transition-colors leading-tight">
                        {skill.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 mt-1">
                        {skill.role || skill.desc || 'Full Stack Technology'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
