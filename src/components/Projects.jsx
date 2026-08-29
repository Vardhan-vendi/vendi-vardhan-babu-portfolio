import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Globe, 
  Terminal, 
  Maximize2, 
  X, 
  ArrowRight,
  Code2
} from 'lucide-react';
import GithubIcon from './icons/GithubIcon';
import { projectsData } from '../data/portfolioData';

export default function Projects() {
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  return (
    <section id="projects" className="relative min-h-[100dvh] w-full py-20 bg-white border-t border-slate-200/80 flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[96vw] px-4 sm:px-8 lg:px-12 mx-auto flex flex-col justify-center my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Projects
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl">
            Software systems engineered with attention to authentication security, scalable database schemas, and clean code principles.
          </p>
        </div>

        {/* Projects Cards Grid Spread Across Full Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="white-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-indigo-300"
            >
              <div>
                {/* Header Category & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {project.badge}
                  </span>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="text-xl font-black text-slate-950 group-hover:text-indigo-600 transition-colors leading-snug mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  {project.subtitle}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6 text-xs text-slate-700">
                  {project.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Tags & Action CTAs */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-indigo-600 shadow-sm transition-all"
                    >
                      <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3 stroke-[2.5] ml-0.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5 stroke-[2.5] text-slate-600" />
                      <span>Architecture</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="p-2.5 rounded-xl bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
                    title="View System Breakdown"
                  >
                    <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-slate-300 shadow-sm transition-all"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase font-mono font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800">
                    {activeProjectModal.category}
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">• {activeProjectModal.badge}</span>
                </div>

                <h3 className="text-2xl font-black text-slate-950 mb-2">{activeProjectModal.title}</h3>
                <p className="text-sm text-slate-600 mb-6">{activeProjectModal.subtitle}</p>

                {activeProjectModal.architecture && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 font-mono mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 stroke-[2.5]" />
                      <span>System Architecture Details</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {Object.entries(activeProjectModal.architecture).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded-xl bg-white border border-slate-200">
                          <span className="text-slate-500 capitalize block text-[11px] font-mono">{key}:</span>
                          <span className="text-slate-900 font-bold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Complete Feature Breakdown
                  </h4>
                  {activeProjectModal.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 stroke-[2.5] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  {activeProjectModal.liveUrl && (
                    <a
                      href={activeProjectModal.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-indigo-600 shadow-sm"
                    >
                      <Globe className="w-4 h-4 stroke-[2.5]" />
                      <span>Open Live Demo</span>
                    </a>
                  )}
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub Source</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
