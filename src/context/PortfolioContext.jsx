import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  personalData as initialPersonal, 
  skillsData as initialSkills, 
  projectsData as initialProjects, 
  certificatesData as initialCerts, 
  educationData as initialEdu 
} from '../data/portfolioData';
import { getLargeItem, setLargeItem, deleteLargeItem } from '../utils/idbStorage';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'vendi_portfolio_custom_data_v1';

export function PortfolioProvider({ children }) {
  const [personal, setPersonal] = useState(initialPersonal);
  const [skills, setSkills] = useState(initialSkills.skills);
  const [projects, setProjects] = useState(initialProjects);
  const [certificates, setCertificates] = useState(initialCerts);
  const [education, setEducation] = useState(initialEdu);
  const [resumePdfUrl, setResumePdfUrl] = useState('/Vendi_Vardhan_Babu_Resume.pdf');
  const [resumePreviewUrl, setResumePreviewUrl] = useState('/resume-preview.png');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage and IndexedDB on mount
  useEffect(() => {
    async function initData() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.personal) setPersonal(parsed.personal);
          if (parsed.skills) setSkills(parsed.skills);
          if (parsed.projects) setProjects(parsed.projects);
          if (parsed.certificates) setCertificates(parsed.certificates);
          if (parsed.education) setEducation(parsed.education);
        }

        // Load large files from IndexedDB
        const storedPdf = await getLargeItem('resumePdf');
        const storedPreview = await getLargeItem('resumePreview');

        if (storedPdf) setResumePdfUrl(storedPdf);
        if (storedPreview) setResumePreviewUrl(storedPreview);
      } catch (e) {
        console.warn('Failed to load portfolio data:', e);
      } finally {
        setIsLoaded(true);
      }
    }

    initData();
  }, []);

  // Save textual metadata to LocalStorage
  const persistTextData = (newPersonal, newSkills, newProjects, newCerts, newEdu) => {
    try {
      const dataToSave = {
        personal: newPersonal || personal,
        skills: newSkills || skills,
        projects: newProjects || projects,
        certificates: newCerts || certificates,
        education: newEdu || education,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to persist to localStorage', e);
    }
  };

  // --- SKILLS ACTIONS ---
  const addSkill = (newSkill) => {
    const updated = [newSkill, ...skills];
    setSkills(updated);
    persistTextData(null, updated, null, null, null);
  };

  const updateSkill = (index, updatedSkill) => {
    const updated = [...skills];
    updated[index] = updatedSkill;
    setSkills(updated);
    persistTextData(null, updated, null, null, null);
  };

  const deleteSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    persistTextData(null, updated, null, null, null);
  };

  // --- PROJECTS ACTIONS ---
  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: newProject.id || `proj-${Date.now()}`
    };
    const updated = [projectWithId, ...projects];
    setProjects(updated);
    persistTextData(null, null, updated, null, null);
  };

  const updateProject = (id, updatedProject) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedProject } : p);
    setProjects(updated);
    persistTextData(null, null, updated, null, null);
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    persistTextData(null, null, updated, null, null);
  };

  // --- CERTIFICATES ACTIONS ---
  const addCertificate = (newCert) => {
    const certWithId = {
      ...newCert,
      id: newCert.id || certificates.length + 1
    };
    const updated = [certWithId, ...certificates];
    setCertificates(updated);
    persistTextData(null, null, null, updated, null);
  };

  const updateCertificate = (id, updatedCert) => {
    const updated = certificates.map(c => c.id === id ? { ...c, ...updatedCert } : c);
    setCertificates(updated);
    persistTextData(null, null, null, updated, null);
  };

  const deleteCertificate = (id) => {
    const updated = certificates.filter(c => c.id !== id);
    setCertificates(updated);
    persistTextData(null, null, null, updated, null);
  };

  // --- RESUME ACTIONS (IndexedDB Backed for Unlimited Size) ---
  const updateResume = async (pdfUrl, previewUrl) => {
    if (pdfUrl) {
      setResumePdfUrl(pdfUrl);
      await setLargeItem('resumePdf', pdfUrl);
    }
    if (previewUrl) {
      setResumePreviewUrl(previewUrl);
      await setLargeItem('resumePreview', previewUrl);
    }
  };

  // --- PERSONAL DATA ACTIONS ---
  const updatePersonal = (newPersonal) => {
    setPersonal(newPersonal);
    persistTextData(newPersonal, null, null, null, null);
  };

  // --- RESET TO DEFAULTS ---
  const resetToDefaults = async () => {
    localStorage.removeItem(STORAGE_KEY);
    await deleteLargeItem('resumePdf');
    await deleteLargeItem('resumePreview');
    setPersonal(initialPersonal);
    setSkills(initialSkills.skills);
    setProjects(initialProjects);
    setCertificates(initialCerts);
    setEducation(initialEdu);
    setResumePdfUrl('/Vendi_Vardhan_Babu_Resume.pdf');
    setResumePreviewUrl('/resume-preview.png');
  };

  return (
    <PortfolioContext.Provider
      value={{
        isLoaded,
        personal,
        skills,
        projects,
        certificates,
        education,
        resumePdfUrl,
        resumePreviewUrl,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        updateResume,
        updatePersonal,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
