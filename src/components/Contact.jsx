import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  MessageSquare, 
  FileText, 
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import GithubIcon from './icons/GithubIcon';
import { personalData } from '../data/portfolioData';

export default function Contact({ onOpenResume }) {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 800);
  };

  return (
    <section id="contact" className="relative min-h-[100dvh] w-full py-20 bg-white border-t border-slate-200/80 flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[96vw] px-4 sm:px-8 lg:px-12 mx-auto flex flex-col justify-center my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Let's Build Something Great.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl">
            Actively seeking a Junior Java Developer or Full Stack Developer role. Feel free to connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* Left: Contact Info Cards (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="white-card p-5 sm:p-6 rounded-3xl group hover:border-indigo-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                    <Mail className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono block">Direct Email</span>
                    <span className="text-xs sm:text-sm font-black text-slate-950">{personalData.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalData.email, 'email')}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 stroke-[2.5] text-emerald-600" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                </button>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`mailto:${personalData.email}`}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <span>Compose in Email App</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="white-card p-5 sm:p-6 rounded-3xl group hover:border-blue-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono block">Phone &amp; WhatsApp</span>
                    <span className="text-xs sm:text-sm font-black text-slate-950">{personalData.phone}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalData.phone, 'phone')}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                  title="Copy phone"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 stroke-[2.5] text-emerald-600" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                </button>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Call Directly</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* GitHub Profile */}
            <div className="white-card p-5 sm:p-6 rounded-3xl flex items-center justify-between group hover:border-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center shadow-xs">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">GitHub</span>
                  <span className="text-xs sm:text-sm font-black text-slate-950">Vardhan-vendi</span>
                </div>
              </div>
              <a
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-extrabold hover:bg-indigo-600 transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>Repositories</span>
                <ExternalLink className="w-3 h-3 stroke-[2.5]" />
              </a>
            </div>

            {/* Location & Resume Trigger */}
            <div className="white-card p-5 sm:p-6 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-mono block">Location</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">{personalData.location}</span>
                </div>
              </div>
              <button
                onClick={onOpenResume}
                className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Resume PDF</span>
              </button>
            </div>

          </div>

          {/* Right: Message Form (Col 7) */}
          <div className="lg:col-span-7 white-card p-6 sm:p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold shadow-xs">
                <MessageSquare className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-950">Send a Message</h3>
                <p className="text-xs text-slate-500">I will get back to you promptly.</p>
              </div>
            </div>

            {submitted ? (
              <div className="py-10 flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-bold border border-emerald-200">
                  ✓
                </div>
                <h4 className="text-lg font-black text-slate-950">Thank You! Message Sent.</h4>
                <p className="text-xs text-slate-600 max-w-sm">
                  Your message has been sent. You can also reach me directly at <strong className="text-slate-900">{personalData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-800 hover:bg-slate-200 mt-2 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-700">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-700">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <input
                    type="text"
                    placeholder="Role Opportunity / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-700">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-indigo-600 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
