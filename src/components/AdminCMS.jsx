import React, { useState, useEffect } from 'react';
import {
  Lock,
  Key,
  Save,
  GitBranch,
  Upload,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  FolderGit2,
  FileText,
  Briefcase,
  Award,
  Users,
  Cpu,
  Eye
} from 'lucide-react';
import { getPortfolioData, savePortfolioDataLocally, resetPortfolioData } from '../utils/dataStore.js';
import { commitFileToGitHub, getFileFromGitHub } from '../utils/githubApi.js';

export default function AdminCMS({ onExit }) {
  // Authentication PIN state
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');

  // GitHub Credentials
  const [token, setToken] = useState(() => localStorage.getItem('zidan_gh_pat') || '');
  const [repoOwner, setRepoOwner] = useState('ZidanIndra');
  const [repoName, setRepoName] = useState('ZidanIndra.github.io');
  const [branch, setBranch] = useState('master');

  // Portfolio Data state
  const [data, setData] = useState(() => getPortfolioData());
  const [activeTab, setActiveTab] = useState('profile');

  // Status feedback
  const [status, setStatus] = useState({ type: '', message: '', commitUrl: '' });
  const [isCommitting, setIsCommitting] = useState(false);

  // Binary file upload state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPath, setUploadPath] = useState('public/assets/');
  const [isUploading, setIsUploading] = useState(false);

  // Check PIN / Password
  const handlePinSubmit = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('zidan_admin_pin') || '#Zidanindra990';
    if (pin === storedPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Password salah! Silakan coba lagi (Default: #Zidanindra990)');
    }
  };

  const handleSaveToken = () => {
    localStorage.setItem('zidan_gh_pat', token);
    setStatus({ type: 'success', message: 'GitHub Token berhasil disimpan di browser lokal.' });
  };

  // Local Save / Preview
  const handleSaveLocal = () => {
    savePortfolioDataLocally(data);
    setStatus({
      type: 'success',
      message: 'Perubahan berhasil disimpan secara lokal (Preview mode aktif).'
    });
  };

  // Reset to original
  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset semua data kembali ke default awal?')) {
      resetPortfolioData();
      setData(getPortfolioData());
      setStatus({ type: 'info', message: 'Data berhasil direset ke data default.' });
    }
  };

  // Direct Commit to GitHub
  const handleCommitToGitHub = async () => {
    if (!token) {
      setStatus({ type: 'error', message: 'GitHub Personal Access Token (PAT) belum diisi.' });
      return;
    }

    setIsCommitting(true);
    setStatus({ type: 'loading', message: 'Mengambil SHA dan melakukan commit ke repository GitHub...' });

    try {
      // 1. Get current SHA of src/data/portfolioData.json
      let currentSha = null;
      try {
        const fileData = await getFileFromGitHub({
          token,
          repoOwner,
          repoName,
          path: 'src/data/portfolioData.json',
          branch,
        });
        currentSha = fileData.sha;
      } catch (e) {
        console.warn('File not found or new, committing fresh:', e);
      }

      // 2. Commit updated JSON
      const formattedJson = JSON.stringify(data, null, 2);
      const commitRes = await commitFileToGitHub({
        token,
        repoOwner,
        repoName,
        path: 'src/data/portfolioData.json',
        content: formattedJson,
        message: `feat(cms): update portfolio content via Admin CMS [skip ci]`,
        sha: currentSha,
        branch,
      });

      // Save locally as well
      savePortfolioDataLocally(data);

      setStatus({
        type: 'success',
        message: 'Commit berhasil! Perubahan langsung dipush ke branch master.',
        commitUrl: commitRes?.commit?.html_url || `https://github.com/${repoOwner}/${repoName}/commits/${branch}`
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: `Gagal commit ke GitHub: ${err.message}`
      });
    } finally {
      setIsCommitting(false);
    }
  };

  // Handle Binary Asset File Upload (CV PDF, Project Screenshot, etc.)
  const handleUploadAsset = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setStatus({ type: 'error', message: 'Pilih file terlebih dahulu untuk diupload.' });
      return;
    }
    if (!token) {
      setStatus({ type: 'error', message: 'GitHub Personal Access Token (PAT) diperlukan untuk upload file.' });
      return;
    }

    setIsUploading(true);
    setStatus({ type: 'loading', message: `Mengupload ${uploadFile.name} ke GitHub...` });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(',')[1];
          const fullPath = `${uploadPath.replace(/\/+$/, '')}/${uploadFile.name}`;

          // Check if file already exists to get its SHA
          let fileSha = null;
          try {
            const existing = await getFileFromGitHub({
              token,
              repoOwner,
              repoName,
              path: fullPath,
              branch,
            });
            fileSha = existing.sha;
          } catch (e) {}

          const result = await commitFileToGitHub({
            token,
            repoOwner,
            repoName,
            path: fullPath,
            content: base64Data,
            isBase64: true,
            message: `chore(assets): upload ${uploadFile.name} via Admin CMS`,
            sha: fileSha,
            branch,
          });

          setStatus({
            type: 'success',
            message: `File ${uploadFile.name} berhasil diupload ke ${fullPath}! Dapat diakses via ./assets/${uploadFile.name}`,
            commitUrl: result?.commit?.html_url
          });
          setUploadFile(null);
        } catch (uploadErr) {
          setStatus({ type: 'error', message: `Gagal upload: ${uploadErr.message}` });
        } finally {
          setIsUploading(false);
        }
      };
    } catch (e) {
      setStatus({ type: 'error', message: `Gagal membaca file: ${e.message}` });
      setIsUploading(false);
    }
  };

  // Helper update handlers
  const handleProfileChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'New Project Title',
      category: 'Full-Stack',
      description: 'Project description here...',
      image: './assets/iconweb.png',
      tags: ['React', 'Node.js'],
      liveUrl: '',
      githubUrl: '',
      featured: false
    };
    setData((prev) => ({ ...prev, projects: [newProj, ...prev.projects] }));
  };

  const handleUpdateProject = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleDeleteProject = (index) => {
    if (window.confirm('Hapus proyek ini?')) {
      setData((prev) => {
        const updated = [...prev.projects];
        updated.splice(index, 1);
        return { ...prev, projects: updated };
      });
    }
  };

  const handleAddCertificate = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: 'Judul Sertifikat',
      issuer: 'Nama Penerbit / Lembaga',
      year: new Date().getFullYear().toString(),
      image: './assets/iconweb.png',
      description: 'Keterangan sertifikat...'
    };
    setData((prev) => ({ ...prev, certificates: [newCert, ...prev.certificates] }));
  };

  const handleUpdateCertificate = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.certificates];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certificates: updated };
    });
  };

  const handleDeleteCertificate = (index) => {
    if (window.confirm('Hapus sertifikat ini?')) {
      setData((prev) => {
        const updated = [...prev.certificates];
        updated.splice(index, 1);
        return { ...prev, certificates: updated };
      });
    }
  };

  const handleAddActivity = () => {
    const newAct = {
      id: `act-${Date.now()}`,
      title: 'Nama Aktivitas / Kegiatan',
      issuer: 'Penyelenggara / Komunitas',
      year: new Date().getFullYear().toString(),
      image: './assets/iconweb.png',
      description: 'Keterangan kegiatan organisasi / pengabdian...'
    };
    setData((prev) => ({
      ...prev,
      activities: [newAct, ...(prev.activities || [])]
    }));
  };

  const handleUpdateActivity = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.activities || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, activities: updated };
    });
  };

  const handleDeleteActivity = (index) => {
    if (window.confirm('Hapus aktivitas ini?')) {
      setData((prev) => {
        const updated = [...(prev.activities || [])];
        updated.splice(index, 1);
        return { ...prev, activities: updated };
      });
    }
  };

  // Render PIN Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-neutral-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Portfolio Admin CMS</h2>
          <p className="text-xs text-center text-neutral-400 mb-6">
            Masukkan password keamanan untuk mengelola portofolio & file repository.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={32}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Password (Default: #Zidanindra990)"
                className="w-full text-center tracking-widest text-base sm:text-lg px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-amber-500/50"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-400 mt-2 text-center">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
            >
              Buka CMS
            </button>

            <button
              type="button"
              onClick={onExit}
              className="w-full py-2.5 rounded-xl glass-card text-neutral-400 text-xs hover:text-white transition-colors"
            >
              Kembali ke Portofolio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-neutral-100 pb-20">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 rounded-xl glass-card text-neutral-400 hover:text-white transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-amber-400" />
              <span>Zidan Portfolio CMS</span>
            </h1>
            <p className="text-[11px] text-neutral-400">Direct GitHub REST API Git Engine</p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={handleSaveLocal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card text-neutral-200 text-xs font-semibold hover:border-amber-500/40 hover:text-amber-300 transition-all"
            title="Simpan sementara di browser untuk preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Simpan Preview</span>
          </button>

          <button
            onClick={handleCommitToGitHub}
            disabled={isCommitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-xs font-bold hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 disabled:opacity-50 transition-all"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>{isCommitting ? 'Committing...' : 'Commit ke GitHub'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl glass-card text-neutral-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
            title="Reset Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Status Notification Banner */}
        {status.message && (
          <div
            className={`p-4 rounded-2xl mb-6 flex items-start justify-between gap-4 border ${
              status.type === 'error'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : status.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              {status.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              )}
              <span>{status.message}</span>
            </div>
            {status.commitUrl && (
              <a
                href={status.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline font-semibold shrink-0 hover:text-white"
              >
                Lihat di GitHub
              </a>
            )}
          </div>
        )}

        {/* GitHub PAT Setup Accordion Card */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>GitHub API Configuration</span>
            </h3>
            <span className="text-[11px] text-neutral-400">Tersimpan di browser lokal</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-8">
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                GitHub Personal Access Token (PAT dengan izin `repo`)
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/40"
              />
            </div>
            <div className="sm:col-span-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveToken}
                className="w-full py-2 px-3 rounded-xl glass-card text-neutral-200 text-xs font-semibold hover:border-amber-500/30 hover:text-amber-400 transition-colors"
              >
                Simpan Token
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'profile', label: 'Profile & Hero', icon: FileText },
            { id: 'projects', label: `Projects (${data.projects?.length || 0})`, icon: Briefcase },
            { id: 'certificates', label: `Publications (${data.certificates?.length || 0})`, icon: Award },
            { id: 'activities', label: `Activities (${data.activities?.length || 0})`, icon: Users },
            { id: 'upload', label: 'Upload Asset', icon: Upload },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'glass-card text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile & Hero */}
        {activeTab === 'profile' && (
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
            <h3 className="text-base font-bold text-white mb-2">Informasi Profil</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Handwritten Greeting</label>
                <input
                  type="text"
                  value={data.profile.greeting}
                  onChange={(e) => handleProfileChange('greeting', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Headline / Title</label>
                <input
                  type="text"
                  value={data.profile.title}
                  onChange={(e) => handleProfileChange('title', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Bio Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={data.profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">URL Portofolio Deck (Figma)</label>
                <input
                  type="text"
                  value={data.profile.figmaDeckUrl}
                  onChange={(e) => handleProfileChange('figmaDeckUrl', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">File Path CV (PDF)</label>
                <input
                  type="text"
                  value={data.profile.cvPath}
                  onChange={(e) => handleProfileChange('cvPath', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.profile.linkedin}
                  onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={data.profile.github}
                  onChange={(e) => handleProfileChange('github', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Daftar Proyek</h3>
              <button
                type="button"
                onClick={handleAddProject}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Proyek</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.projects?.map((project, idx) => (
                <div key={project.id || idx} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-bold text-amber-400">Proyek #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(idx)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Judul Proyek</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => handleUpdateProject(idx, 'category', e.target.value)}
                        placeholder="AI / ML, Full-Stack, Web App"
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Deskripsi</label>
                      <textarea
                        rows={2}
                        value={project.description}
                        onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Path Gambar</label>
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => handleUpdateProject(idx, 'image', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Tags (pisahkan koma)</label>
                      <input
                        type="text"
                        value={project.tags?.join(', ') || ''}
                        onChange={(e) =>
                          handleUpdateProject(
                            idx,
                            'tags',
                            e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Live / HF URL</label>
                      <input
                        type="text"
                        value={project.liveUrl || ''}
                        onChange={(e) => handleUpdateProject(idx, 'liveUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Behance URL (opsional)</label>
                      <input
                        type="text"
                        value={project.behanceUrl || ''}
                        onChange={(e) => handleUpdateProject(idx, 'behanceUrl', e.target.value)}
                        placeholder="https://behance.net/..."
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">GitHub Repo URL (opsional)</label>
                      <input
                        type="text"
                        value={project.githubUrl || ''}
                        onChange={(e) => handleUpdateProject(idx, 'githubUrl', e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Daftar Sertifikat</h3>
              <button
                type="button"
                onClick={handleAddCertificate}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Sertifikat</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.certificates?.map((cert, idx) => (
                <div key={cert.id || idx} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-bold text-amber-400">Sertifikat #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCertificate(idx)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Hapus Sertifikat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Nama Sertifikat</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => handleUpdateCertificate(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Penerbit</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleUpdateCertificate(idx, 'issuer', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Tahun</label>
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => handleUpdateCertificate(idx, 'year', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Path Gambar</label>
                      <input
                        type="text"
                        value={cert.image}
                        onChange={(e) => handleUpdateCertificate(idx, 'image', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Link Publikasi / DOI (opsional)</label>
                      <input
                        type="text"
                        value={cert.link || ''}
                        onChange={(e) => handleUpdateCertificate(idx, 'link', e.target.value)}
                        placeholder="https://doi.org/..."
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Activities */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Daftar Aktivitas & Pengabdian</h3>
              <button
                type="button"
                onClick={handleAddActivity}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Aktivitas</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.activities?.map((item, idx) => (
                <div key={item.id || idx} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-bold text-amber-400">Aktivitas #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(idx)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Hapus Aktivitas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Nama Kegiatan</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateActivity(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Penyelenggara / Lembaga</label>
                      <input
                        type="text"
                        value={item.issuer}
                        onChange={(e) => handleUpdateActivity(idx, 'issuer', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Tahun</label>
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => handleUpdateActivity(idx, 'year', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Path Gambar</label>
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) => handleUpdateActivity(idx, 'image', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Deskripsi</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => handleUpdateActivity(idx, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Asset Upload */}
        {activeTab === 'upload' && (
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h3 className="text-base font-bold text-white mb-2">Upload Asset Langsung ke Repository</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Upload CV PDF baru, foto profile, atau tangkapan layar proyek langsung ke folder `public/assets/` via GitHub API.
            </p>

            <form onSubmit={handleUploadAsset} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Pilih File (PDF, PNG, JPG)</label>
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-neutral-950 hover:file:bg-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Target Folder di Repo</label>
                <input
                  type="text"
                  value={uploadPath}
                  onChange={(e) => setUploadPath(e.target.value)}
                  placeholder="public/assets/"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading || !uploadFile}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 disabled:opacity-50 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? 'Mengupload...' : 'Upload & Commit ke GitHub'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
