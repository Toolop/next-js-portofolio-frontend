"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Upload,
  X,
  Loader2,
  ChevronRight,
  FolderKanban,
  LayoutGrid
} from "lucide-react";

// Types
type Portfolio = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  link: string;
  portofolio_id: string;
  images?: string[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ProjectManagementPage() {
  const [activeTab, setActiveTab] = useState<"project" | "portfolio">("project");
  
  // Data State
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Edit State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  
  // Form State
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    link: "",
    portofolio_id: ""
  });
  const [portfolioForm, setPortfolioForm] = useState({
    name: ""
  });
  
  // Upload State
  const [uploadingProjectId, setUploadingProjectId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Initial Data Fetch
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [portRes, projRes] = await Promise.all([
        fetch(`${API_BASE}/portofolio`, { credentials: "include" }),
        fetch(`${API_BASE}/project`, { credentials: "include" })
      ]);

      if (!portRes.ok || !projRes.ok) throw new Error("Connection failed");

      const portData = await portRes.json();
      const projData = await projRes.json();

      setPortfolios(portData || []);
      setProjects(projData || []);
    } catch (err) {
      setError("FAILED_TO_SYNC_WITH_DATA_NODE");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Portfolio CRUD
  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = editingPortfolio 
        ? `${API_BASE}/portofolio/${editingPortfolio.id}`
        : `${API_BASE}/portofolio`;
      
      const res = await fetch(url, {
        method: editingPortfolio ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(portfolioForm),
      });

      if (!res.ok) throw new Error("Operation failed");
      
      await fetchData();
      closeModal();
    } catch (err) {
      setError("PORTFOLIO_MUTATION_ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm("Confirm data erasure?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/portofolio/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchData();
    } catch (err) {
      setError("DELETION_SEQUENCE_INTERRUPTED");
    } finally {
      setIsLoading(false);
    }
  };

  // Project CRUD
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = editingProject 
        ? `${API_BASE}/project/${editingProject.id}`
        : `${API_BASE}/project`;
      
      const res = await fetch(url, {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(projectForm),
      });

      if (!res.ok) throw new Error("Operation failed");
      
      await fetchData();
      closeModal();
    } catch (err) {
      setError("PROJECT_MUTATION_ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Confirm node decommissioning?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/project/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchData();
    } catch (err) {
      setError("NODE_ERASURE_FAILED");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadImages = async (projectId: string) => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => formData.append("images", file));
      
      const res = await fetch(`${API_BASE}/project/${projectId}/images`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      
      await fetchData();
      setSelectedFiles([]);
      setUploadingProjectId(null);
    } catch (err) {
      setError("IMAGE_UPLINK_FAILURE");
    } finally {
      setIsUploading(false);
    }
  };

  // UI Helpers
  const openModal = (item?: any) => {
    if (activeTab === "portfolio") {
      if (item) {
        setEditingPortfolio(item);
        setPortfolioForm({ name: item.name });
      } else {
        setEditingPortfolio(null);
        setPortfolioForm({ name: "" });
      }
    } else {
      if (item) {
        setEditingProject(item);
        setProjectForm({
          name: item.name,
          description: item.description,
          link: item.link,
          portofolio_id: item.portofolio_id
        });
      } else {
        setEditingProject(null);
        setProjectForm({
          name: "",
          description: "",
          link: "",
          portofolio_id: ""
        });
      }
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setEditingPortfolio(null);
    setError(null);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase mb-2">PROJECT_MANAGER</h1>
          <p className="text-[10px] text-neutral-500 font-bold tracking-[0.3em] uppercase">REPOSITORY ACCESS AND ASSET DEPLOYMENT</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 border border-primary/20 px-6 py-2 rounded-sm text-[10px] font-black tracking-widest text-black transition-all"
        >
          <Plus className="w-4 h-4" />
          {activeTab === "project" ? "INITIALIZE_NODE" : "NEW_PORTFOLIO"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-8">
        {[
          { id: "project", label: "PROJECT_NODES", icon: FolderKanban },
          { id: "portfolio", label: "PORTFOLIO_GROUPS", icon: LayoutGrid }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-[10px] font-black tracking-[0.2em] transition-all relative ${
              activeTab === tab.id ? "text-primary" : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="tab-underline" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm text-[10px] font-black tracking-widest text-red-500 uppercase flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Main Content Area */}
      {isLoading && !projects.length ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-50">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-[10px] font-black tracking-widest text-neutral-500">SYNCHRONIZING_CORE...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {activeTab === "project" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-surface-container-low border border-white/5 rounded-sm p-6 group hover:border-primary/20 transition-all flex flex-col">
                  {/* Image Preview / Display */}
                  <div className="aspect-video bg-black rounded-sm overflow-hidden mb-6 relative border border-white/5">
                    {proj.images && proj.images.length > 0 ? (
                      <div className="flex h-full">
                        <img src={proj.images[0]} alt={proj.name} className="w-full h-full object-cover" />
                        {proj.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-sm text-[8px] font-black text-primary border border-primary/20">
                            +{proj.images.length - 1} DATA_UNITS
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-800">
                        <FolderKanban className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="text-[8px] font-black bg-black/40 backdrop-blur-md text-neutral-400 border border-white/10 px-2 py-1 rounded-sm uppercase tracking-widest">
                        {portfolios.find(p => p.id === proj.portofolio_id)?.name || "SYSTEM_ORPHAN"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-black text-white tracking-tighter uppercase mb-2 group-hover:text-primary transition-colors">{proj.name}</h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mb-6 font-medium">
                      {proj.description || "NO_DESCRIPTION_AVAILABLE"}
                    </p>
                  </div>

                  {/* Image Upload Area */}
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between text-[8px] font-black text-neutral-600 tracking-widest uppercase mb-1">
                      <span>UPLINK_IMAGES</span>
                      {proj.images && <span>{proj.images.length} ATTACHED</span>}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                       {selectedFiles.length > 0 && uploadingProjectId === proj.id ? (
                         <div className="flex flex-wrap gap-2 w-full">
                           {selectedFiles.map((f, i) => (
                             <div key={i} className="w-10 h-10 border border-primary/30 rounded-sm bg-primary/5 flex items-center justify-center text-[8px] font-bold overflow-hidden truncate px-1">
                               {f.name.slice(0,4)}
                             </div>
                           ))}
                           <button 
                             onClick={() => handleUploadImages(proj.id)}
                             disabled={isUploading}
                             className="flex-1 bg-primary/10 border border-primary/20 text-primary text-[8px] font-black rounded-sm flex items-center justify-center gap-2 hover:bg-primary/20"
                           >
                             {isUploading ? <Loader2 className="w-3 h-3 animate-spin"/> : <Upload className="w-3 h-3"/>}
                             EXECUTE
                           </button>
                           <button onClick={() => {setSelectedFiles([]); setUploadingProjectId(null)}} className="p-2 border border-white/10 rounded-sm text-neutral-500 hover:text-white">
                             <X className="w-3 h-3"/>
                           </button>
                         </div>
                       ) : (
                         <label className="w-full border border-dashed border-white/10 py-3 rounded-sm flex items-center justify-center gap-2 text-neutral-600 hover:text-primary hover:border-primary/20 transition-all cursor-pointer">
                           <ImageIcon className="w-3 h-3" />
                           <span className="text-[9px] font-black tracking-widest uppercase">ATTACH_DATA_UNITS</span>
                           <input 
                             type="file" 
                             multiple 
                             className="hidden" 
                             onChange={(e) => {
                               if (e.target.files) {
                                 setSelectedFiles(Array.from(e.target.files));
                                 setUploadingProjectId(proj.id);
                               }
                             }}
                           />
                         </label>
                       )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(proj)} className="p-2 text-neutral-500 hover:text-primary transition-colors border border-transparent hover:border-primary/10 rounded-sm">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteProject(proj.id)} className="p-2 text-neutral-500 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/10 rounded-sm">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="p-2 text-primary hover:bg-primary/10 rounded-sm transition-all">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {portfolios.map((port) => (
                <div key={port.id} className="bg-surface-container-low border border-white/5 p-6 rounded-sm flex items-center justify-between group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-sm bg-black border border-white/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] text-neutral-500 font-bold tracking-[0.2em] mb-1">GROUP_ID: {port.id.slice(-8).toUpperCase()}</h4>
                      <h3 className="text-sm font-black text-white tracking-widest uppercase">{port.name}</h3>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => openModal(port)} className="p-2 text-neutral-600 hover:text-primary transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deletePortfolio(port.id)} className="p-2 text-neutral-600 hover:text-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface border border-white/10 rounded-sm overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white tracking-widest uppercase">
                    {activeTab === "project" 
                      ? (editingProject ? "RECONFIGURE_NODE" : "INITIALIZE_NEW_NODE")
                      : (editingPortfolio ? "MODIFY_GROUP" : "CREATE_NEW_GROUP")
                    }
                  </h3>
                  <p className="text-[8px] font-black text-neutral-500 tracking-[0.3em] uppercase mt-1">SYSTEM_ENTRY_V1.0</p>
                </div>
                <button onClick={closeModal} className="text-neutral-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={activeTab === "project" ? handleProjectSubmit : handlePortfolioSubmit} className="p-8 space-y-6">
                {activeTab === "project" ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-neutral-500 tracking-widest uppercase">NODE_IDENTITY</label>
                      <input 
                        required
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                        placeholder="ENTER_NAME..."
                        className="w-full bg-black/40 border-b-2 border-white/10 focus:border-primary focus:outline-none transition-all py-3 px-4 text-[11px] font-bold text-neutral-300 rounded-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-neutral-500 tracking-widest uppercase">CORE_DESCRIPTION</label>
                      <textarea 
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        placeholder="SUMMARIZE_FUNCTION..."
                        className="w-full bg-black/40 border-b-2 border-white/10 focus:border-primary focus:outline-none transition-all py-3 px-4 text-[11px] font-bold text-neutral-300 rounded-sm resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-neutral-500 tracking-widest uppercase">REMOTE_UPLINK</label>
                        <input 
                          value={projectForm.link}
                          onChange={(e) => setProjectForm({...projectForm, link: e.target.value})}
                          placeholder="https://..."
                          className="w-full bg-black/40 border-b-2 border-white/10 focus:border-primary focus:outline-none transition-all py-3 px-4 text-[11px] font-bold text-neutral-300 rounded-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-neutral-500 tracking-widest uppercase">GROUP_AFFILIATION</label>
                        <select 
                          required
                          value={projectForm.portofolio_id}
                          onChange={(e) => setProjectForm({...projectForm, portofolio_id: e.target.value})}
                          className="w-full bg-black/40 border-b-2 border-white/10 focus:border-primary focus:outline-none transition-all py-3 px-4 text-[11px] font-bold text-neutral-300 rounded-sm appearance-none"
                        >
                          <option value="" disabled className="bg-surface">SELECT_GROUP...</option>
                          {portfolios.map(p => (
                            <option key={p.id} value={p.id} className="bg-surface">{p.name.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-neutral-500 tracking-widest uppercase">GROUP_NAME</label>
                    <input 
                      required
                      value={portfolioForm.name}
                      onChange={(e) => setPortfolioForm({...portfolioForm, name: e.target.value})}
                      placeholder="ENTER_GROUP_NAME..."
                      className="w-full bg-black/40 border-b-2 border-white/10 focus:border-primary focus:outline-none transition-all py-3 px-4 text-[11px] font-bold text-neutral-300 rounded-sm"
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary text-black font-black text-[10px] tracking-[0.3em] py-4 rounded-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <ChevronRight className="w-4 h-4"/>}
                    {editingProject || editingPortfolio ? "COMMIT_CHANGES" : "INITIALIZE_SYSTEM"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
