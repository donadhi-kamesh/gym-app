'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Users,
  Image as ImageIcon,
  Layout,
  PhoneCall,
  Flame,
  Award,
  Download,
  CheckCircle,
  HelpCircle,
  Key,
  RotateCcw,
  Sparkles,
  Search,
  MessageSquare,
  DollarSign,
  Info,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import Footer from '@/components/Footer';
import { useSite } from '@/context/SiteContext';
import { Program, ClientTransformation, Testimonial, Registration } from '@/types';

type Tab =
  | 'overview'
  | 'brand'
  | 'hero'
  | 'programs'
  | 'transformations'
  | 'testimonials'
  | 'about'
  | 'leads'
  | 'settings';

export default function AdminDashboard() {
  const site = useSite();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('cms_authenticated') === 'true';
    }
    return false;
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Active Tab State
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Form Modals / Forms State
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [programForm, setProgramForm] = useState<Partial<Program>>({
    name: '',
    description: '',
    duration: '3 Months',
    price: '₹12,000',
    ctaText: 'Choose Package',
    image: '/placeholders/image-7.svg',
  });

  const [showTransformModal, setShowTransformModal] = useState(false);
  const [editingTransformId, setEditingTransformId] = useState<string | null>(null);
  const [transformForm, setTransformForm] = useState({
    name: '',
    goal: '',
    beforeWeight: 80,
    afterWeight: 70,
    duration: 4,
    verified: true,
    journeyDescription: '',
    beforePhoto: '',
    afterPhoto: '',
  });

  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    clientName: '',
    transformation: '',
    testimonial: '',
    verified: true,
    clientPhoto: '/placeholders/image-11.svg',
  });

  // Leads Filter & Search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilter, setLeadFilter] = useState<'All' | 'New' | 'Contacted' | 'Enrolled' | 'Archived'>('All');

  // Passcode Change
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === site.adminPasscode) {
      sessionStorage.setItem('cms_authenticated', 'true');
      setIsAuthenticated(true);
      setPasscodeError('');
      showToast('Welcome to Team Dinesh CMS Dashboard!');
    } else {
      setPasscodeError('Incorrect PIN passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cms_authenticated');
    setIsAuthenticated(false);
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col justify-between pt-32 pb-12">
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-gray-900/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-2xl"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <Lock className="w-8 h-8 text-black" />
            </div>

            <h1 className="text-3xl font-black text-white text-center mb-2">CMS Portal Lock</h1>
            <p className="text-gray-400 text-center text-sm mb-8">
              Enter owner passcode to manage site content & client leads
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter Passcode"
                  className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest placeholder-gray-600 focus:outline-none focus:border-green-400 transition-all"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-red-400 text-xs font-bold mt-2 text-center">{passcodeError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-extrabold rounded-xl transition-all shadow-lg hover:shadow-green-500/25"
              >
                Unlock CMS Dashboard
              </button>
            </form>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  // Filtered Leads
  const filteredLeads = site.registrations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      r.mobileNumber.includes(leadSearch) ||
      r.package.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesFilter = leadFilter === 'All' ? true : (r.status || 'New') === leadFilter;
    return matchesSearch && matchesFilter;
  });

  // Export CSV Handler
  const handleExportCSV = () => {
    if (site.registrations.length === 0) {
      showToast('No registrations to export.');
      return;
    }
    const headers = ['Name', 'Mobile', 'Age', 'Gender', 'Height', 'Weight', 'Goal', 'Package', 'Status', 'Submitted At'];
    const rows = site.registrations.map((r) => [
      `"${r.name}"`,
      `"${r.mobileNumber}"`,
      r.age,
      r.gender,
      r.height,
      r.weight,
      `"${r.fitnessGoal}"`,
      `"${r.package}"`,
      r.status || 'New',
      `"${new Date(r.submittedAt).toLocaleString()}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `team_dinesh_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported successfully as CSV!');
  };

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'brand', label: 'Brand & Contact', icon: PhoneCall },
    { id: 'hero', label: 'Hero & Banner', icon: Flame },
    { id: 'programs', label: 'Programs', icon: DollarSign, count: site.programs.length },
    { id: 'transformations', label: 'Transformations', icon: ImageIcon, count: site.clients.length },
    { id: 'testimonials', label: 'Testimonials', icon: Award, count: site.testimonials.length },
    { id: 'about', label: 'About Page', icon: Info },
    { id: 'leads', label: 'Leads & Registrations', icon: Users, count: site.registrations.length },
    { id: 'settings', label: 'Security & Settings', icon: Key },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-28 left-4 right-4 sm:left-auto sm:right-8 z-50 bg-green-500 text-black font-bold px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle size={20} />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className="bg-gray-900/60 border-b border-gray-800 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white">Team Dinesh CMS</h1>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                  Owner Admin
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Customize website content, pricing, client stories, and manage consultation leads.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-bold rounded-lg transition-all flex items-center gap-2"
              >
                View Live Site <ArrowUpRight size={16} />
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-bold rounded-lg transition-all flex items-center gap-2 border border-red-500/30"
              >
                <LogOut size={16} /> Lock Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation — horizontal chips on mobile, rail on desktop */}
          <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible bg-gray-900/50 p-3 lg:p-4 rounded-2xl border border-gray-800 lg:h-fit lg:space-y-2">
            <p className="hidden lg:block text-gray-500 text-xs font-bold uppercase tracking-wider px-3 mb-2">Navigation</p>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 lg:w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black shadow-lg shadow-green-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-black ${
                        isActive ? 'bg-black/30 text-black' : 'bg-gray-800 text-green-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-3">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400 text-sm font-bold">Total Leads</p>
                      <Users className="text-green-400" size={24} />
                    </div>
                    <p className="text-4xl font-black text-white">{site.registrations.length}</p>
                    <p className="text-xs text-green-400 mt-2 font-bold">
                      {site.registrations.filter((r) => (r.status || 'New') === 'New').length} new pending leads
                    </p>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400 text-sm font-bold">Transformations</p>
                      <ImageIcon className="text-emerald-400" size={24} />
                    </div>
                    <p className="text-4xl font-black text-white">{site.clients.length}</p>
                    <p className="text-xs text-gray-500 mt-2">Verified success stories published</p>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-400 text-sm font-bold">Active Programs</p>
                      <DollarSign className="text-orange-400" size={24} />
                    </div>
                    <p className="text-4xl font-black text-white">{site.programs.length}</p>
                    <p className="text-xs text-gray-500 mt-2">Fitness packages offered</p>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Management Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="p-4 bg-gray-800/60 hover:bg-gray-800 rounded-xl text-left border border-gray-700/50 transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-bold">Manage Incoming Leads</p>
                        <p className="text-xs text-gray-400">View client registrations & message on WhatsApp</p>
                      </div>
                      <Users className="text-green-400" size={20} />
                    </button>

                    <button
                      onClick={() => setActiveTab('programs')}
                      className="p-4 bg-gray-800/60 hover:bg-gray-800 rounded-xl text-left border border-gray-700/50 transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-bold">Update Pricing & Programs</p>
                        <p className="text-xs text-gray-400">Add or edit package durations and prices</p>
                      </div>
                      <DollarSign className="text-emerald-400" size={20} />
                    </button>

                    <button
                      onClick={() => setActiveTab('transformations')}
                      className="p-4 bg-gray-800/60 hover:bg-gray-800 rounded-xl text-left border border-gray-700/50 transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-bold">Add Transformation Story</p>
                        <p className="text-xs text-gray-400">Publish new client before/after photos</p>
                      </div>
                      <ImageIcon className="text-orange-400" size={20} />
                    </button>

                    <button
                      onClick={() => setActiveTab('brand')}
                      className="p-4 bg-gray-800/60 hover:bg-gray-800 rounded-xl text-left border border-gray-700/50 transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-bold">Edit Phone / Contact Info</p>
                        <p className="text-xs text-gray-400">Update phone, email, or social links</p>
                      </div>
                      <PhoneCall className="text-blue-400" size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BRAND & CONTACT TAB */}
            {activeTab === 'brand' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-6">
                  <h3 className="text-2xl font-black text-white">Brand & Contact Info</h3>
                  <p className="text-gray-400 text-sm">
                    Changes here immediately update the Navbar, Contact page, CTA sections, and Footer.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Brand Name</label>
                      <input
                        type="text"
                        value={site.brand.brandName}
                        onChange={(e) => site.updateBrand({ brandName: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Tagline</label>
                      <input
                        type="text"
                        value={site.brand.tagline}
                        onChange={(e) => site.updateBrand({ tagline: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Phone Number</label>
                      <input
                        type="text"
                        value={site.brand.phone}
                        onChange={(e) => site.updateBrand({ phone: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">
                        WhatsApp Number (digits only, e.g. 919177385668)
                      </label>
                      <input
                        type="text"
                        value={site.brand.whatsapp}
                        onChange={(e) => site.updateBrand({ whatsapp: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={site.brand.email}
                        onChange={(e) => site.updateBrand({ email: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Physical Location</label>
                      <input
                        type="text"
                        value={site.brand.address}
                        onChange={(e) => site.updateBrand({ address: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Instagram Link</label>
                      <input
                        type="text"
                        value={site.brand.instagramUrl}
                        onChange={(e) => site.updateBrand({ instagramUrl: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">YouTube Link</label>
                      <input
                        type="text"
                        value={site.brand.youtubeUrl}
                        onChange={(e) => site.updateBrand({ youtubeUrl: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('Brand & Contact info updated!')}
                    className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-extrabold rounded-xl"
                  >
                    Save Brand Settings
                  </button>
                </div>
              </motion.div>
            )}

            {/* HERO & BANNER TAB */}
            {activeTab === 'hero' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Announcement Banner Editor */}
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Top Announcement Banner</h3>
                    <label className="flex items-center gap-2 text-sm text-gray-300 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={site.banner.enabled}
                        onChange={(e) => site.updateBanner({ enabled: e.target.checked })}
                        className="w-5 h-5 accent-green-400 rounded"
                      />
                      Enable Banner
                    </label>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Banner Message</label>
                    <input
                      type="text"
                      value={site.banner.text}
                      onChange={(e) => site.updateBanner({ text: e.target.value })}
                      className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                    />
                  </div>
                </div>

                {/* Hero Content Editor */}
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-6">
                  <h3 className="text-xl font-bold text-white">Hero Section Copy</h3>

                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Main Headline</label>
                    <input
                      type="text"
                      value={site.hero.title}
                      onChange={(e) => site.updateHero({ title: e.target.value })}
                      className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 text-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Subheadline</label>
                    <textarea
                      rows={3}
                      value={site.hero.subtitle}
                      onChange={(e) => site.updateHero({ subtitle: e.target.value })}
                      className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Primary Button Text</label>
                      <input
                        type="text"
                        value={site.hero.primaryCtaText}
                        onChange={(e) => site.updateHero({ primaryCtaText: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Secondary Button Text</label>
                      <input
                        type="text"
                        value={site.hero.secondaryCtaText}
                        onChange={(e) => site.updateHero({ secondaryCtaText: e.target.value })}
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                  </div>

                  {/* Stats counters */}
                  <p className="text-gray-300 font-bold text-sm">Hero Counter Statistics</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {site.hero.stats.map((st, i) => (
                      <div key={i} className="bg-gray-800/50 p-4 rounded-xl space-y-2 border border-gray-700">
                        <input
                          type="text"
                          value={st.number}
                          onChange={(e) => {
                            const newStats = [...site.hero.stats];
                            newStats[i].number = e.target.value;
                            site.updateHero({ stats: newStats });
                          }}
                          placeholder="e.g. 500+"
                          className="w-full bg-black/60 border border-gray-600 rounded-lg px-3 py-1.5 text-green-400 font-black text-center"
                        />
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const newStats = [...site.hero.stats];
                            newStats[i].label = e.target.value;
                            site.updateHero({ stats: newStats });
                          }}
                          placeholder="Label"
                          className="w-full bg-black/60 border border-gray-600 rounded-lg px-3 py-1.5 text-gray-300 text-xs text-center"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => showToast('Hero section updated!')}
                    className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-extrabold rounded-xl"
                  >
                    Save Hero Content
                  </button>
                </div>
              </motion.div>
            )}

            {/* PROGRAMS TAB */}
            {activeTab === 'programs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="text-2xl font-black text-white">Programs & Packages</h3>
                  <button
                    onClick={() => {
                      setEditingProgramId(null);
                      setProgramForm({
                        name: '',
                        description: '',
                        duration: '3 Months',
                        price: '₹12,000',
                        ctaText: 'Choose Package',
                        image: '/placeholders/image-7.svg',
                      });
                      setShowProgramModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-bold rounded-xl flex items-center gap-2"
                  >
                    <Plus size={18} /> Add New Program
                  </button>
                </div>

                {/* Program Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {site.programs.map((prog) => (
                    <div
                      key={prog.id}
                      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-bold text-white">{prog.name}</h4>
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full font-bold text-xs">
                            {prog.price || 'Contact'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{prog.description}</p>
                        <div className="text-xs text-gray-500 mb-6">Duration: {prog.duration}</div>
                      </div>

                      <div className="flex gap-2 justify-end pt-4 border-t border-gray-800">
                        <button
                          onClick={() => {
                            setEditingProgramId(prog.id);
                            setProgramForm(prog);
                            setShowProgramModal(true);
                          }}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete program "${prog.name}"?`)) {
                              site.deleteProgram(prog.id);
                              showToast('Program deleted.');
                            }
                          }}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add/Edit Program Modal */}
                {showProgramModal && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-5 sm:p-6 max-w-lg w-full space-y-4 my-auto max-h-[92dvh] overflow-y-auto">
                      <h4 className="text-xl font-bold text-white">
                        {editingProgramId ? 'Edit Program' : 'Create New Program'}
                      </h4>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Package Name</label>
                        <input
                          type="text"
                          value={programForm.name || ''}
                          onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                          placeholder="e.g. 6 Month Transformation"
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Price</label>
                          <input
                            type="text"
                            value={programForm.price || ''}
                            onChange={(e) => setProgramForm({ ...programForm, price: e.target.value })}
                            placeholder="e.g. ₹20,000"
                            className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Duration</label>
                          <input
                            type="text"
                            value={programForm.duration || ''}
                            onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                            placeholder="e.g. 6 Months"
                            className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={programForm.description || ''}
                          onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">CTA Button Text</label>
                        <input
                          type="text"
                          value={programForm.ctaText || ''}
                          onChange={(e) => setProgramForm({ ...programForm, ctaText: e.target.value })}
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => {
                            if (!programForm.name) return;
                            if (editingProgramId) {
                              site.updateProgram(editingProgramId, programForm);
                              showToast('Program updated!');
                            } else {
                              site.addProgram({
                                id: Date.now().toString(),
                                name: programForm.name || 'New Package',
                                description: programForm.description || '',
                                duration: programForm.duration || '3 Months',
                                price: programForm.price || '₹12,000',
                                ctaText: programForm.ctaText || 'Choose Package',
                                image: '/placeholders/image-7.svg',
                              });
                              showToast('New program created!');
                            }
                            setShowProgramModal(false);
                          }}
                          className="flex-1 py-3 bg-green-500 text-black font-extrabold rounded-xl"
                        >
                          Save Program
                        </button>
                        <button
                          onClick={() => setShowProgramModal(false)}
                          className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TRANSFORMATIONS TAB */}
            {activeTab === 'transformations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="text-2xl font-black text-white">Client Transformation Stories</h3>
                  <button
                    onClick={() => {
                      setEditingTransformId(null);
                      setTransformForm({
                        name: '',
                        goal: 'Weight Loss & Muscle Definition',
                        beforeWeight: 75,
                        afterWeight: 65,
                        duration: 4,
                        verified: true,
                        journeyDescription: 'Consistent effort and personalized nutrition.',
                        beforePhoto: '',
                        afterPhoto: '',
                      });
                      setShowTransformModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-bold rounded-xl flex items-center gap-2"
                  >
                    <Plus size={18} /> Add Transformation
                  </button>
                </div>

                <div className="space-y-4">
                  {site.clients.map((c) => (
                    <div
                      key={c.id}
                      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-xl font-bold text-white">{c.name}</h4>
                          {c.verified && (
                            <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{c.goal}</p>
                        <div className="flex gap-4 text-xs font-mono">
                          <span className="text-gray-300">Before: <strong className="text-white">{c.beforeWeight}kg</strong></span>
                          <span className="text-green-400">After: <strong className="text-green-400">{c.afterWeight}kg</strong></span>
                          <span className="text-orange-400">Duration: <strong>{c.duration} Months</strong></span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingTransformId(c.id);
                            setTransformForm({
                              name: c.name,
                              goal: c.goal,
                              beforeWeight: c.beforeWeight,
                              afterWeight: c.afterWeight,
                              duration: c.duration,
                              verified: c.verified,
                              journeyDescription: c.journeyDescription || '',
                              beforePhoto: c.photos.find((p) => p.type === 'before')?.url || '',
                              afterPhoto: c.photos.find((p) => p.type === 'after')?.url || '',
                            });
                            setShowTransformModal(true);
                          }}
                          className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete transformation story for ${c.name}?`)) {
                              site.deleteClient(c.id);
                              showToast('Transformation deleted.');
                            }
                          }}
                          className="p-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transformation Modal */}
                {showTransformModal && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-5 sm:p-6 max-w-lg w-full space-y-4 my-auto max-h-[92dvh] overflow-y-auto">
                      <h4 className="text-xl font-bold text-white">
                        {editingTransformId ? 'Edit Transformation' : 'New Transformation Story'}
                      </h4>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Client Name</label>
                        <input
                          type="text"
                          value={transformForm.name}
                          onChange={(e) => setTransformForm({ ...transformForm, name: e.target.value })}
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Fitness Goal</label>
                        <input
                          type="text"
                          value={transformForm.goal}
                          onChange={(e) => setTransformForm({ ...transformForm, goal: e.target.value })}
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Before (kg)</label>
                          <input
                            type="number"
                            value={transformForm.beforeWeight}
                            onChange={(e) => setTransformForm({ ...transformForm, beforeWeight: Number(e.target.value) })}
                            className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs font-bold uppercase mb-1">After (kg)</label>
                          <input
                            type="number"
                            value={transformForm.afterWeight}
                            onChange={(e) => setTransformForm({ ...transformForm, afterWeight: Number(e.target.value) })}
                            className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Duration (mo)</label>
                          <input
                            type="number"
                            value={transformForm.duration}
                            onChange={(e) => setTransformForm({ ...transformForm, duration: Number(e.target.value) })}
                            className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Before Photo URL</label>
                        <input
                          type="text"
                          value={transformForm.beforePhoto}
                          onChange={(e) => setTransformForm({ ...transformForm, beforePhoto: e.target.value })}
                          placeholder="/placeholders/image-12.svg"
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">After Photo URL</label>
                        <input
                          type="text"
                          value={transformForm.afterPhoto}
                          onChange={(e) => setTransformForm({ ...transformForm, afterPhoto: e.target.value })}
                          placeholder="/placeholders/image-16.svg"
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => {
                            if (!transformForm.name) return;
                            const newClientObj: ClientTransformation = {
                              id: editingTransformId || Date.now().toString(),
                              name: transformForm.name,
                              goal: transformForm.goal,
                              beforeWeight: transformForm.beforeWeight,
                              afterWeight: transformForm.afterWeight,
                              duration: transformForm.duration,
                              verified: transformForm.verified,
                              trainingConsistency: 90,
                              progressPercentage: 85,
                              startDate: '2024-01-01',
                              endDate: '2024-05-01',
                              currentPhase: 'Maintenance',
                              journeyDescription: transformForm.journeyDescription,
                              profilePhoto: transformForm.beforePhoto || '/placeholders/image-11.svg',
                              photos: [
                                {
                                  id: 'p-before',
                                  url: transformForm.beforePhoto || '/placeholders/image-12.svg',
                                  type: 'before',
                                  caption: 'Starting Point',
                                },
                                {
                                  id: 'p-after',
                                  url: transformForm.afterPhoto || '/placeholders/image-16.svg',
                                  type: 'after',
                                  caption: 'Final Result',
                                },
                              ],
                            };

                            if (editingTransformId) {
                              site.updateClient(editingTransformId, newClientObj);
                              showToast('Transformation story updated!');
                            } else {
                              site.addClient(newClientObj);
                              showToast('New transformation story published!');
                            }
                            setShowTransformModal(false);
                          }}
                          className="flex-1 py-3 bg-green-500 text-black font-extrabold rounded-xl"
                        >
                          Save Transformation
                        </button>
                        <button
                          onClick={() => setShowTransformModal(false)}
                          className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="text-2xl font-black text-white">Client Testimonials</h3>
                  <button
                    onClick={() => {
                      setEditingTestimonialId(null);
                      setTestimonialForm({
                        clientName: '',
                        transformation: '',
                        testimonial: '',
                        verified: true,
                        clientPhoto: '/placeholders/image-11.svg',
                      });
                      setShowTestimonialModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-bold rounded-xl flex items-center gap-2"
                  >
                    <Plus size={18} /> Add Testimonial
                  </button>
                </div>

                <div className="space-y-4">
                  {site.testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white">{t.clientName}</h4>
                        <p className="text-green-400 text-xs font-bold mb-2">{t.transformation}</p>
                        <p className="text-gray-300 text-sm italic">&quot;{t.testimonial}&quot;</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingTestimonialId(t.id);
                            setTestimonialForm(t);
                            setShowTestimonialModal(true);
                          }}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete testimonial?')) {
                              site.deleteTestimonial(t.id);
                              showToast('Testimonial deleted.');
                            }
                          }}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial Modal */}
                {showTestimonialModal && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-5 sm:p-6 max-w-lg w-full space-y-4 my-auto max-h-[92dvh] overflow-y-auto">
                      <h4 className="text-xl font-bold text-white">
                        {editingTestimonialId ? 'Edit Testimonial' : 'Add Testimonial'}
                      </h4>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Client Name</label>
                        <input
                          type="text"
                          value={testimonialForm.clientName || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">
                          Transformation Summary
                        </label>
                        <input
                          type="text"
                          value={testimonialForm.transformation || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, transformation: e.target.value })}
                          placeholder="e.g. Lost 10kg in 4 months"
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Testimonial Quote</label>
                        <textarea
                          rows={3}
                          value={testimonialForm.testimonial || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial: e.target.value })}
                          className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-2 text-white"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => {
                            if (!testimonialForm.clientName) return;
                            if (editingTestimonialId) {
                              site.updateTestimonial(editingTestimonialId, testimonialForm);
                              showToast('Testimonial updated!');
                            } else {
                              site.addTestimonial({
                                id: Date.now().toString(),
                                clientName: testimonialForm.clientName || '',
                                transformation: testimonialForm.transformation || '',
                                testimonial: testimonialForm.testimonial || '',
                                verified: true,
                                clientPhoto: testimonialForm.clientPhoto || '/placeholders/image-11.svg',
                              });
                              showToast('Testimonial added!');
                            }
                            setShowTestimonialModal(false);
                          }}
                          className="flex-1 py-3 bg-green-500 text-black font-extrabold rounded-xl"
                        >
                          Save Testimonial
                        </button>
                        <button
                          onClick={() => setShowTestimonialModal(false)}
                          className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ABOUT PAGE TAB */}
            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-6">
                  <h3 className="text-2xl font-black text-white">About Page Copy & Team</h3>

                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Page Title</label>
                    <input
                      type="text"
                      value={site.about.title}
                      onChange={(e) => site.updateAbout({ title: e.target.value })}
                      className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Company Mission</label>
                    <textarea
                      rows={2}
                      value={site.about.mission}
                      onChange={(e) => site.updateAbout({ mission: e.target.value })}
                      className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Company Story</label>
                    <textarea
                      rows={4}
                      value={site.about.story}
                      onChange={(e) => site.updateAbout({ story: e.target.value })}
                      className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white"
                    />
                  </div>

                  <button
                    onClick={() => showToast('About page copy updated!')}
                    className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-extrabold rounded-xl"
                  >
                    Save About Content
                  </button>
                </div>
              </motion.div>
            )}

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-white">Consultation Leads ({site.registrations.length})</h3>
                    <p className="text-gray-400 text-sm">Form submissions from clients interested in joining</p>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl flex items-center gap-2 border border-gray-700 text-sm"
                  >
                    <Download size={16} /> Export to CSV
                  </button>
                </div>

                {/* Controls & Search */}
                <div className="flex flex-col sm:flex-row gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 text-gray-500" size={18} />
                    <input
                      type="text"
                      placeholder="Search lead by name, phone, or package..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="w-full bg-black/60 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-green-400"
                    />
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {(['All', 'New', 'Contacted', 'Enrolled', 'Archived'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setLeadFilter(st)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          leadFilter === st
                            ? 'bg-green-400 text-black font-extrabold'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Leads List */}
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 bg-gray-900/40 rounded-2xl border border-gray-800">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 font-bold">No leads found</p>
                    <p className="text-gray-500 text-xs mt-1">Submit a test registration on `/register` to test.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredLeads.map((reg) => (
                      <div
                        key={reg.id}
                        className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-green-500/40 transition-all"
                      >
                        <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-xl font-bold text-white">{reg.name}</h4>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
                              {reg.package}
                            </span>

                            {/* Status dropdown */}
                            <select
                              value={reg.status || 'New'}
                              onChange={(e) =>
                                site.updateRegistrationStatus(reg.id, e.target.value as Registration['status'])
                              }
                              className="bg-black/60 border border-gray-700 text-xs font-bold rounded-lg px-2.5 py-1 text-gray-300 focus:outline-none focus:border-green-400"
                            >
                              <option value="New">🟡 New</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="Enrolled">🟢 Enrolled</option>
                              <option value="Archived">⚪ Archived</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-2">
                            <div>
                              <span className="text-gray-500 block">Phone</span>
                              <span className="text-white font-bold">{reg.mobileNumber}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Age / Gender</span>
                              <span className="text-white">{reg.age} yrs / {reg.gender}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Metrics</span>
                              <span className="text-white">{reg.height}cm / {reg.weight}kg</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Goal</span>
                              <span className="text-green-400 font-bold">{reg.fitnessGoal}</span>
                            </div>
                          </div>

                          <div className="text-xs text-gray-500 pt-1">
                            Diet: <span className="text-gray-300 font-bold">{reg.dietPreference}</span> •
                            Commitment: <span className="text-gray-300 font-bold">{reg.commitmentLevel}</span> •
                            Found via: <span className="text-gray-300">{reg.foundVia}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <a
                            href={`https://wa.me/${reg.mobileNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hi ${reg.name}, thanks for reaching out to Team Dinesh! We got your fitness goal (${reg.fitnessGoal}) and package preference (${reg.package}). Let's schedule a call!`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-black font-extrabold rounded-xl flex items-center gap-2 text-xs shadow-lg shadow-green-500/20"
                          >
                            <MessageSquare size={16} /> WhatsApp Lead
                          </a>

                          <button
                            onClick={() => {
                              if (confirm(`Delete registration lead for ${reg.name}?`)) {
                                site.deleteRegistration(reg.id);
                                showToast('Lead deleted.');
                              }
                            }}
                            className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* SECURITY & SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-6">
                  <h3 className="text-xl font-bold text-white">Change Admin Passcode</h3>

                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">New PIN Passcode</label>
                      <input
                        type="password"
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                        placeholder="Enter new PIN"
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Confirm New PIN Passcode</label>
                      <input
                        type="password"
                        value={confirmPasscode}
                        onChange={(e) => setConfirmPasscode(e.target.value)}
                        placeholder="Confirm new PIN"
                        className="w-full bg-black/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newPasscode) return;
                        if (newPasscode !== confirmPasscode) {
                          showToast('Passcodes do not match!');
                          return;
                        }
                        site.updateAdminPasscode(newPasscode);
                        setNewPasscode('');
                        setConfirmPasscode('');
                        showToast('Admin passcode updated successfully!');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-extrabold rounded-xl"
                    >
                      Update Passcode
                    </button>
                  </div>
                </div>

                {/* Reset Factory Defaults */}
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl space-y-4">
                  <h3 className="text-xl font-bold text-red-400">Danger Zone: Reset Content</h3>
                  <p className="text-gray-400 text-sm">
                    Reset all customized content, programs, transformations, and settings back to default values.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all CMS data back to original defaults?')) {
                        site.resetAllToDefault();
                        showToast('All CMS data reset to default values.');
                      }
                    }}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-black font-extrabold rounded-xl flex items-center gap-2"
                  >
                    <RotateCcw size={18} /> Reset All CMS Data
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
