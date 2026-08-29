import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  FolderGit2, 
  Award, 
  FileText, 
  User, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  ArrowLeft, 
  Upload, 
  RotateCcw, 
  Download, 
  Globe, 
  ExternalLink,
  Eye,
  KeyRound,
  Sparkles,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../../context/PortfolioContext';
import { renderPdfFirstPageToImage } from '../../utils/pdfToImage';
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
} from '../icons/TechIcons';

const availableIcons = [
  { id: 'Java', name: 'Java', Component: JavaIcon },
  { id: 'SpringBoot', name: 'Spring Boot', Component: SpringBootIcon },
  { id: 'React', name: 'React.js', Component: ReactIcon },
  { id: 'Node', name: 'Node.js', Component: NodeIcon },
  { id: 'MongoDB', name: 'MongoDB', Component: MongoIcon },
  { id: 'MySQL', name: 'MySQL', Component: MySQLIcon },
  { id: 'Python', name: 'Python', Component: PythonIcon },
  { id: 'JavaScript', name: 'JavaScript', Component: JavaScriptIcon },
  { id: 'Tailwind', name: 'Tailwind CSS', Component: TailwindIcon },
  { id: 'HTML5', name: 'HTML5', Component: HTML5Icon },
  { id: 'CSS3', name: 'CSS3', Component: CSS3Icon },
  { id: 'Git', name: 'Git & GitHub', Component: GitIcon },
  { id: 'Postman', name: 'Postman', Component: PostmanIcon },
  { id: 'JWT', name: 'JWT Security', Component: JWTIcon },
];

export default function AdminDashboard({ onExit }) {
  const {
    personal,
    skills,
    projects,
    certificates,
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
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('skills');
  const [saveToast, setSaveToast] = useState(false);
  const [isSavingAndExiting, setIsSavingAndExiting] = useState(false);
  const [isProcessingResume, setIsProcessingResume] = useState(false);
  const [resumeSyncSuccess, setResumeSyncSuccess] = useState(false);

  // Skill Form State
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);
  const [skillForm, setSkillForm] = useState({ name: '', role: '', icon: 'Java', desc: '', category: 'java' });

  // Project Form State
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    category: 'Full Stack',
    badge: 'Production',
    liveUrl: '',
    githubUrl: '',
    tags: '',
    highlights: '',
  });

  // Certificate Form State
  const [editingCertId, setEditingCertId] = useState(null);
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    date: '',
    certCode: '',
    category: 'Backend & APIs',
    image: '',
    description: '',
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState(personal);

  const showSuccess = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Save All and Exit to Homepage
  const handleSaveAndRedirectToHome = () => {
    setIsSavingAndExiting(true);
    updatePersonal(profileForm);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSaveToast(true);
    setTimeout(() => {
      onExit();
    }, 600);
  };

  // Skill Handlers
  const handleSaveSkill = (e) => {
    e.preventDefault();
    if (!skillForm.name) return;

    if (editingSkillIndex !== null) {
      updateSkill(editingSkillIndex, {
        ...skills[editingSkillIndex],
        name: skillForm.name,
        role: skillForm.role || skillForm.desc,
        desc: skillForm.desc || skillForm.role,
        icon: skillForm.icon,
        category: skillForm.category,
      });
      setEditingSkillIndex(null);
    } else {
      addSkill({
        name: skillForm.name,
        role: skillForm.role || 'Full Stack Tech',
        desc: skillForm.desc || 'Engineered scalable services',
        icon: skillForm.icon,
        category: skillForm.category,
      });
    }

    setSkillForm({ name: '', role: '', icon: 'Java', desc: '', category: 'java' });
    showSuccess();
  };

  const handleEditSkill = (index) => {
    const s = skills[index];
    setEditingSkillIndex(index);
    setSkillForm({
      name: s.name,
      role: s.role || s.desc || '',
      desc: s.desc || s.role || '',
      icon: s.icon || 'Java',
      category: s.category || 'java',
    });
  };

  // Project Handlers
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const tagsArray = typeof projectForm.tags === 'string'
      ? projectForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      : projectForm.tags;

    const highlightsArray = typeof projectForm.highlights === 'string'
      ? projectForm.highlights.split('\n').map(h => h.trim()).filter(Boolean)
      : projectForm.highlights;

    const payload = {
      title: projectForm.title,
      subtitle: projectForm.subtitle,
      category: projectForm.category,
      badge: projectForm.badge,
      liveUrl: projectForm.liveUrl,
      githubUrl: projectForm.githubUrl,
      tags: tagsArray,
      highlights: highlightsArray,
    };

    if (editingProjectId) {
      updateProject(editingProjectId, payload);
      setEditingProjectId(null);
    } else {
      addProject(payload);
    }

    setProjectForm({
      title: '',
      subtitle: '',
      category: 'Full Stack',
      badge: 'Production',
      liveUrl: '',
      githubUrl: '',
      tags: '',
      highlights: '',
    });
    showSuccess();
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      subtitle: proj.subtitle,
      category: proj.category,
      badge: proj.badge,
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags,
      highlights: Array.isArray(proj.highlights) ? proj.highlights.join('\n') : proj.highlights,
    });
  };

  // Certificate Handlers
  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!certForm.title) return;

    const payload = {
      title: certForm.title,
      issuer: certForm.issuer,
      date: certForm.date,
      certCode: certForm.certCode,
      category: certForm.category,
      image: certForm.image || '/certificates/cert-1.jpg',
      description: certForm.description,
    };

    if (editingCertId) {
      updateCertificate(editingCertId, payload);
      setEditingCertId(null);
    } else {
      addCertificate(payload);
    }

    setCertForm({
      title: '',
      issuer: '',
      date: '',
      certCode: '',
      category: 'Backend & APIs',
      image: '',
      description: '',
    });
    showSuccess();
  };

  const handleEditCert = (cert) => {
    setEditingCertId(cert.id);
    setCertForm({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      certCode: cert.certCode || '',
      category: cert.category,
      image: cert.image,
      description: cert.description,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // AUTOMATIC RESUME & PREVIEW SYNCHRONIZATION HANDLER
  const handleUnifiedResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingResume(true);
    setResumeSyncSuccess(false);

    try {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        // Read PDF as base64 Data URL for download
        const reader = new FileReader();
        reader.onloadend = async () => {
          const pdfDataUrl = reader.result;

          try {
            // Render first page automatically as high-resolution preview image
            const generatedPreviewImage = await renderPdfFirstPageToImage(file);
            updateResume(pdfDataUrl, generatedPreviewImage);
            setResumeSyncSuccess(true);
            showSuccess();
          } catch (renderErr) {
            console.warn('PDF preview fallback triggered:', renderErr);
            updateResume(pdfDataUrl, null);
            setResumeSyncSuccess(true);
            showSuccess();
          } finally {
            setIsProcessingResume(false);
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('image/')) {
        // Direct Image upload
        const reader = new FileReader();
        reader.onloadend = () => {
          updateResume(reader.result, reader.result);
          setIsProcessingResume(false);
          setResumeSyncSuccess(true);
          showSuccess();
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Failed to process uploaded resume:', err);
      setIsProcessingResume(false);
    }
  };

  // Profile Handlers
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updatePersonal(profileForm);
    showSuccess();
  };

  // Export JSON
  const exportDataJson = () => {
    const data = {
      personal,
      skills,
      projects,
      certificates,
      resumePdfUrl,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-24 selection:bg-indigo-600 selection:text-white">
      
      {/* Clean White Top Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm font-bold">
            <KeyRound className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-slate-950">
                Admin Control Panel
              </h1>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                Live Studio
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Manage your portfolio content in real-time.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={exportDataJson}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 transition-colors shadow-xs"
            title="Download JSON Backup"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all portfolio customizations back to default settings?')) {
                resetToDefaults();
                showSuccess();
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 text-xs font-bold transition-colors border border-rose-200 shadow-xs"
            title="Restore Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Reset</span>
          </button>

          {/* PRIMARY SAVE & REDIRECT BUTTON */}
          <button
            onClick={handleSaveAndRedirectToHome}
            disabled={isSavingAndExiting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            title="Save changes and redirect to home page"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>{isSavingAndExiting ? 'Saving & Redirecting...' : 'Save & Go to Home'}</span>
          </button>

          <button
            onClick={onExit}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Clean White Navigation Tabs */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-2.5 flex items-center gap-2 overflow-x-auto shadow-xs">
        {[
          { id: 'skills', label: 'Skills & Carousels', icon: Cpu, count: skills.length },
          { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
          { id: 'certificates', label: 'Certificates (13)', icon: Award, count: certificates.length },
          { id: 'resume', label: 'Resume PDF', icon: FileText },
          { id: 'profile', label: 'Bio & Contact Details', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4 stroke-[2.5]" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        
        {/* --- TAB 1: SKILLS MANAGEMENT --- */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Add / Edit Skill Form */}
            <div className="lg:col-span-5 white-card rounded-3xl p-6 h-fit sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-indigo-600 stroke-[2.5]" />
                  <span>{editingSkillIndex !== null ? 'Edit Skill' : 'Add New Skill'}</span>
                </h3>
                {editingSkillIndex !== null && (
                  <button
                    onClick={() => {
                      setEditingSkillIndex(null);
                      setSkillForm({ name: '', role: '', icon: 'Java', desc: '', category: 'java' });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveSkill} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Technology Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Java, Docker, Next.js"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Stack Role / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Microservices & OOP"
                    value={skillForm.role}
                    onChange={(e) => setSkillForm({ ...skillForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Official Brand Icon</label>
                  <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1.5 bg-slate-50 rounded-xl border border-slate-200">
                    {availableIcons.map((ic) => {
                      const IconComp = ic.Component;
                      const isSelected = skillForm.icon === ic.id;
                      return (
                        <button
                          key={ic.id}
                          type="button"
                          onClick={() => setSkillForm({ ...skillForm, icon: ic.id })}
                          className={`p-2 rounded-lg flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                          <span className="text-[9px] font-mono truncate w-full text-center">{ic.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white font-medium"
                  >
                    <option value="java">Java Ecosystem</option>
                    <option value="mern">MERN & Frontend</option>
                    <option value="databases">Databases & Cloud</option>
                    <option value="ml_tools">Python, ML & Tools</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Save className="w-4 h-4 stroke-[2.5]" />
                  <span>{editingSkillIndex !== null ? 'Save Skill Changes' : 'Add to Skills'}</span>
                </button>
              </form>
            </div>

            {/* Right: Skills List */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black text-slate-950">Active Skills ({skills.length})</h3>
                <span className="text-xs text-slate-500 font-mono">Live in 360° Carousel</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, idx) => (
                  <div
                    key={`${skill.name}-${idx}`}
                    className="white-card rounded-2xl p-4 flex items-center justify-between group hover:border-indigo-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-xs">
                        <JavaIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-slate-950">{skill.name}</h4>
                        <p className="text-[11px] font-mono text-slate-500">{skill.role || skill.desc || 'Tech Stack'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditSkill(idx)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                        title="Edit Skill"
                      >
                        <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete skill "${skill.name}"?`)) {
                            deleteSkill(idx);
                            showSuccess();
                          }
                        }}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 2: PROJECTS MANAGEMENT --- */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Project Form */}
            <div className="lg:col-span-5 white-card rounded-3xl p-6 h-fit sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-indigo-600 stroke-[2.5]" />
                  <span>{editingProjectId ? 'Edit Project' : 'Add New Project'}</span>
                </h3>
                {editingProjectId && (
                  <button
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm({
                        title: '',
                        subtitle: '',
                        category: 'Full Stack',
                        badge: 'Production',
                        liveUrl: '',
                        githubUrl: '',
                        tags: '',
                        highlights: '',
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProject} className="space-y-3.5 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MERN E-Commerce Store"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle / Summary</label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack E-Commerce with Stripe & JWT"
                    value={projectForm.subtitle}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                    <input
                      type="text"
                      placeholder="MERN / Java"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Badge</label>
                    <input
                      type="text"
                      placeholder="Live Demo / Core Java"
                      value={projectForm.badge}
                      onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React.js, Node.js, MongoDB, JWT"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Key Highlights (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="JWT Auth&#10;Stripe payment gateway&#10;RESTful API Endpoints"
                    value={projectForm.highlights}
                    onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 stroke-[2.5]" />
                  <span>{editingProjectId ? 'Save Project' : 'Add Project'}</span>
                </button>
              </form>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-black text-slate-950 text-left">Current Featured Projects ({projects.length})</h3>

              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="white-card rounded-3xl p-6 flex flex-col justify-between text-left group hover:border-indigo-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          {proj.category}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-bold">• {proj.badge}</span>
                      </div>
                      <h4 className="text-lg font-black text-slate-950">{proj.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{proj.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showSuccess();
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {proj.tags && proj.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- TAB 3: CERTIFICATES MANAGEMENT --- */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Add / Edit Certificate Form */}
            <div className="lg:col-span-5 white-card rounded-3xl p-6 h-fit sticky top-24 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600 stroke-[2.5]" />
                  <span>{editingCertId ? 'Edit Certificate' : 'Add New Certificate'}</span>
                </h3>
                {editingCertId && (
                  <button
                    onClick={() => {
                      setEditingCertId(null);
                      setCertForm({
                        title: '',
                        issuer: '',
                        date: '',
                        certCode: '',
                        category: 'Backend & APIs',
                        image: '',
                        description: '',
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveCert} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Certificate Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Java Full Stack Certification"
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Issuer</label>
                    <input
                      type="text"
                      placeholder="e.g. ExcelR / GDSC / DevTown"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Dec 2024"
                      value={certForm.date}
                      onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Credential Code (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. EXCELR-8827"
                    value={certForm.certCode}
                    onChange={(e) => setCertForm({ ...certForm, certCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Certificate Image / File</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-indigo-600 cursor-pointer"
                    />
                  </div>
                  {certForm.image && (
                    <div className="mt-2 w-28 aspect-[16/10] rounded-lg overflow-hidden border border-slate-200 bg-white">
                      <img src={certForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Save className="w-4 h-4 stroke-[2.5]" />
                  <span>{editingCertId ? 'Save Certificate' : 'Add Certificate'}</span>
                </button>
              </form>
            </div>

            {/* Certificates List */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-sm font-black text-slate-950 text-left">Verified Certificates ({certificates.length})</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {certificates.map((c) => (
                  <div
                    key={c.id}
                    className="white-card rounded-2xl p-4 flex flex-col justify-between group hover:border-indigo-300"
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono text-indigo-600 font-bold block">{c.issuer}</span>
                        <h4 className="text-xs font-black text-slate-950 truncate">{c.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">{c.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 mt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleEditCert(c)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete certificate "${c.title}"?`)) {
                            deleteCertificate(c.id);
                            showSuccess();
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 4: RESUME REPLACEMENT (AUTOMATIC PREVIEW GENERATION) --- */}
        {activeTab === 'resume' && (
          <div className="max-w-3xl mx-auto white-card rounded-3xl p-8 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shadow-xs">
                <FileText className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">Resume Upload &amp; Automatic Preview</h3>
                <p className="text-xs text-slate-500">
                  Upload your resume PDF (or image). The high-res visual preview and vector download will update automatically in real-time.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Primary Single Upload Box */}
              <div className="p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-all flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-xs">
                  <Upload className="w-6 h-6 stroke-[2.5]" />
                </div>

                <h4 className="text-sm font-black text-slate-950 mb-1">
                  Upload New Resume PDF or Image
                </h4>
                <p className="text-xs text-slate-500 mb-4 max-w-sm">
                  Accepts <code className="font-mono text-slate-800 font-bold">.pdf</code>, <code className="font-mono text-slate-800 font-bold">.png</code>, or <code className="font-mono text-slate-800 font-bold">.jpg</code>. High-resolution preview is generated instantly on upload.
                </p>

                <label className="relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95">
                  <Upload className="w-4 h-4 stroke-[2.5]" />
                  <span>Choose Resume File</span>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={handleUnifiedResumeUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </label>

                {/* Processing State Indicator */}
                {isProcessingResume && (
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mt-4 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Rendering crisp high-resolution preview from PDF...</span>
                  </div>
                )}

                {/* Success Notification */}
                {resumeSyncSuccess && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mt-4 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resume and preview synchronized automatically!</span>
                  </div>
                )}
              </div>

              {/* Current Active Resume & Live Generated Preview Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                {/* Live Preview Frame */}
                <div className="w-36 sm:w-44 aspect-[8.5/11] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md shrink-0 flex items-center justify-center">
                  <img
                    src={resumePreviewUrl || '/resume-preview.png'}
                    alt="Current Resume Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Information and Quick Actions */}
                <div className="flex-1 text-left flex flex-col justify-between h-full py-1">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Live Synced Document</span>
                    </div>

                    <h4 className="text-base font-black text-slate-950 mb-1">
                      Active Resume on Portfolio
                    </h4>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                      This is the active document downloaded when visitors click "Resume PDF" and inspected when they open the full-screen vector preview modal.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100">
                    <a
                      href={resumePdfUrl}
                      download="Vendi_Vardhan_Babu_Resume.pdf"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-xs transition-all"
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Test Download</span>
                    </a>

                    <a
                      href={resumePdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Open in Browser</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* --- TAB 5: PROFILE & CONTACT --- */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto white-card rounded-3xl p-8 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shadow-xs">
                <User className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">Personal Profile &amp; Contact Info</h3>
                <p className="text-xs text-slate-500">Update your headline, contact details, and academic standing.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Primary Role</label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={profileForm.github}
                  onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Bio / Perspective</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Clean White Sticky Bottom Quick-Save & Return Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="hidden sm:inline">Edits are automatically saved in browser local storage.</span>
          <span className="sm:hidden">Ready to save?</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            Cancel / Back
          </button>
          
          <button
            onClick={handleSaveAndRedirectToHome}
            disabled={isSavingAndExiting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>{isSavingAndExiting ? 'Saving & Redirecting...' : 'Save & Redirect to Home'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Toast */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-2xl animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Changes Saved Successfully!</span>
        </div>
      )}

    </div>
  );
}
