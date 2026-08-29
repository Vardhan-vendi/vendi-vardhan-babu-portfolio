import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import AdminDashboard from './components/admin/AdminDashboard';

function MainPortfolio() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check URL pathname and hash for secret admin route
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      const adminRequested = 
        path === '/admin' || 
        path.startsWith('/admin/') || 
        hash === '#/admin' || 
        hash === '#admin' ||
        search.includes('admin');

      setIsAdmin(adminRequested);
    };

    checkAdminRoute();

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  const handleExitAdmin = () => {
    window.history.pushState({}, '', '/');
    setIsAdmin(false);
  };

  // If secret route /admin is active, render Secret Admin Dashboard
  if (isAdmin) {
    return <AdminDashboard onExit={handleExitAdmin} />;
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About onOpenResume={() => setResumeOpen(true)} />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Contact onOpenResume={() => setResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Official PDF Resume Lightbox Modal */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolio />
    </PortfolioProvider>
  );
}
