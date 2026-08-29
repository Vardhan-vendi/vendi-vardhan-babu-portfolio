import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

// Track 1 Technologies (Left Stream)
const track1Technologies = [
  { name: 'Java', role: 'OOP & Multithreading', Icon: JavaIcon },
  { name: 'Spring Boot', role: 'REST APIs & Microservices', Icon: SpringBootIcon },
  { name: 'React.js', role: 'Frontend UI & Hooks', Icon: ReactIcon },
  { name: 'Node.js', role: 'Backend Event Loop', Icon: NodeIcon },
  { name: 'MongoDB', role: 'NoSQL & Atlas Cloud', Icon: MongoIcon },
  { name: 'MySQL', role: 'Relational Database & SQL', Icon: MySQLIcon },
  { name: 'Python', role: 'ML & NumPy/Pandas', Icon: PythonIcon },
  { name: 'JavaScript', role: 'ES6+ & Async/Await', Icon: JavaScriptIcon },
];

// Track 2 Technologies (Right Stream)
const track2Technologies = [
  { name: 'Tailwind CSS', role: 'Responsive Utility CSS', Icon: TailwindIcon },
  { name: 'JWT Auth', role: 'Stateless Security & RBAC', Icon: JWTIcon },
  { name: 'HTML5', role: 'Semantic DOM Structure', Icon: HTML5Icon },
  { name: 'CSS3', role: 'Modern Flex/Grid Layouts', Icon: CSS3Icon },
  { name: 'Git & GitHub', role: 'Version Control & CI/CD', Icon: GitIcon },
  { name: 'Postman', role: 'API Testing & Mocks', Icon: PostmanIcon },
  { name: 'Spring Security', role: 'Role-Based Access Control', Icon: SpringBootIcon },
  { name: 'Express.js', role: 'Middleware & Routing', Icon: NodeIcon },
];

export default function Skills() {
  const [isPausedTrack1, setIsPausedTrack1] = useState(false);
  const [isPausedTrack2, setIsPausedTrack2] = useState(false);

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
              {[...track1Technologies, ...track1Technologies].map((tech, index) => {
                const Icon = tech.Icon;
                return (
                  <div
                    key={`track1-${tech.name}-${index}`}
                    className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-xl hover:border-indigo-300 hover:scale-105 transition-all duration-300 cursor-pointer shrink-0 group min-w-[260px] sm:min-w-[290px]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className="w-full h-full" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-black text-slate-950 group-hover:text-indigo-600 transition-colors leading-tight">
                        {tech.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 mt-1">
                        {tech.role}
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
              {[...track2Technologies, ...track2Technologies].map((tech, index) => {
                const Icon = tech.Icon;
                return (
                  <div
                    key={`track2-${tech.name}-${index}`}
                    className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-xl hover:border-cyan-300 hover:scale-105 transition-all duration-300 cursor-pointer shrink-0 group min-w-[260px] sm:min-w-[290px]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className="w-full h-full" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-black text-slate-950 group-hover:text-cyan-600 transition-colors leading-tight">
                        {tech.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 mt-1">
                        {tech.role}
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
