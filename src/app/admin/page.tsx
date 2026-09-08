'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Users, Image as ImageIcon } from 'lucide-react';
import Footer from '@/components/Footer';
import { clients as initialClients, testimonials } from '@/data/clients';
import { ClientTransformation, Registration } from '@/types';

type Tab = 'registrations' | 'clients' | 'testimonials';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('registrations');
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('registrations');
      if (stored) return JSON.parse(stored);
    }
    return [];
  });
  const [clients, setClients] = useState<ClientTransformation[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('clients');
      if (stored) return JSON.parse(stored);
    }
    return initialClients;
  });
  const [showTransformationForm, setShowTransformationForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [clientForm, setClientForm] = useState({
    name: '',
    goal: '',
    beforeWeight: '',
    afterWeight: '',
    duration: '',
    verified: false,
    photos: [] as { url: string; type: 'before' | 'progress' | 'after'; caption: string }[],
  });

  const saveRegistrations = (data: Registration[]) => {
    setRegistrations(data);
    localStorage.setItem('registrations', JSON.stringify(data));
  };

  const saveClients = (data: ClientTransformation[]) => {
    setClients(data);
    localStorage.setItem('clients', JSON.stringify(data));
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: ClientTransformation = {
      id: editingId || Date.now().toString(),
      name: clientForm.name,
      goal: clientForm.goal,
      beforeWeight: Number(clientForm.beforeWeight),
      afterWeight: Number(clientForm.afterWeight),
      duration: Number(clientForm.duration),
      verified: clientForm.verified,
      progressPercentage: 0,
      trainingConsistency: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + Number(clientForm.duration) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currentPhase: 'Active',
      journeyDescription: '',
      photos: clientForm.photos.length > 0 ? clientForm.photos.map((p, i) => ({
        id: `p-${Date.now()}-${i}`,
        url: p.url,
        type: p.type,
        caption: p.caption,
      })) : [
        {
          id: 'p-before',
          url: '/placeholders/image-26.svg',
          type: 'before',
          caption: 'Starting Point',
        },
        {
          id: 'p-after',
          url: '/placeholders/image-27.svg',
          type: 'after',
          caption: 'Final Result',
        },
      ],
      testimonial: '',
      profilePhoto: '',
    };

    if (editingId) {
      saveClients([...clients.map(c => c.id === editingId ? newClient : c)]);
    } else {
      saveClients([...clients, newClient]);
    }

    setClientForm({ name: '', goal: '', beforeWeight: '', afterWeight: '', duration: '', verified: false, photos: [] });
    setShowTransformationForm(false);
    setEditingId(null);
  };

  const handleDeleteClient = (id: string) => {
    if (confirm('Are you sure you want to delete this transformation?')) {
      saveClients(clients.filter(c => c.id !== id));
    }
  };

  const handleDeleteRegistration = (id: string) => {
    if (confirm('Delete this registration?')) {
      saveRegistrations(registrations.filter(r => r.id !== id));
    }
  };

  const tabs = [
    { id: 'registrations' as Tab, label: 'Registrations', icon: Users },
    { id: 'clients' as Tab, label: 'Transformations', icon: ImageIcon },
    { id: 'testimonials' as Tab, label: 'Testimonials', icon: Users },
  ];

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-800 pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Manage your fitness platform</p>
            </div>
            <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full font-bold text-sm">
              Protected Access
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-bold capitalize transition-all duration-300 border-b-2 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {tab.id === 'registrations' && registrations.length > 0 && (
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  {registrations.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">New Registrations</h3>
              <p className="text-gray-400 mb-6">People who submitted the registration form</p>

              {registrations.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No registrations yet</p>
                  <p className="text-gray-500 text-sm">Registrations will appear here after form submission</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {registrations.map((reg, index) => (
                    <motion.div
                      key={reg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 hover:border-green-400/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{reg.name}</h3>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                              {reg.package}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-3">{reg.mobileNumber}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Age</p>
                              <p className="text-white font-bold">{reg.age}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Gender</p>
                              <p className="text-white font-bold">{reg.gender}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Height</p>
                              <p className="text-white font-bold">{reg.height}cm</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Weight</p>
                              <p className="text-white font-bold">{reg.weight}kg</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Goal</p>
                              <p className="text-white font-bold">{reg.fitnessGoal}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Commitment</p>
                              <p className="text-white font-bold">{reg.commitmentLevel}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Diet</p>
                              <p className="text-white font-bold">{reg.dietPreference}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Found Via</p>
                              <p className="text-white font-bold">{reg.foundVia}</p>
                            </div>
                          </div>
                          <p className="text-gray-500 text-xs mt-3">Submitted: {new Date(reg.submittedAt).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <a
                            href={`https://wa.me/${reg.mobileNumber}?text=Hi%20${encodeURIComponent(reg.name)}%2C%20thanks%20for%20registering%20with%20Team%20Dinesh!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
                            title="WhatsApp"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          </a>
                          <button
                            onClick={() => handleDeleteRegistration(reg.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Clients / Transformations Tab */}
        {activeTab === 'clients' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-end mb-6">
              <button
                onClick={() => { setShowTransformationForm(!showTransformationForm); setEditingId(null); }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold rounded-lg transition-all duration-300"
              >
                <Plus size={20} />
                Add Transformation
              </button>
            </div>

            {/* Add/Edit Transformation Form */}
            {showTransformationForm && (
              <motion.form
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleClientSubmit}
                className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 mb-8 space-y-6"
              >
                <h3 className="text-2xl font-bold text-white">{editingId ? 'Edit Transformation' : 'New Transformation'}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    required
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  />
                  <input
                    type="text"
                    placeholder="Fitness Goal"
                    value={clientForm.goal}
                    onChange={(e) => setClientForm({ ...clientForm, goal: e.target.value })}
                    required
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="number"
                    placeholder="Before Weight (kg)"
                    value={clientForm.beforeWeight}
                    onChange={(e) => setClientForm({ ...clientForm, beforeWeight: e.target.value })}
                    required
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  />
                  <input
                    type="number"
                    placeholder="After Weight (kg)"
                    value={clientForm.afterWeight}
                    onChange={(e) => setClientForm({ ...clientForm, afterWeight: e.target.value })}
                    required
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  />
                  <input
                    type="number"
                    placeholder="Duration (months)"
                    value={clientForm.duration}
                    onChange={(e) => setClientForm({ ...clientForm, duration: e.target.value })}
                    required
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={clientForm.verified}
                    onChange={(e) => setClientForm({ ...clientForm, verified: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="verified" className="text-white font-bold">Mark as Verified</label>
                </div>

                <div className="space-y-4">
                  <p className="text-white font-bold">Transformation Photos</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Before Photo URL"
                      value={clientForm.photos.find(p => p.type === 'before')?.url || ''}
                      onChange={(e) => {
                        const existing = clientForm.photos.find(p => p.type === 'before');
                        const newPhotos = existing
                          ? clientForm.photos.map(p => p.type === 'before' ? { ...p, url: e.target.value } : p)
                          : [...clientForm.photos, { url: e.target.value, type: 'before' as const, caption: 'Before' }];
                        setClientForm({ ...clientForm, photos: newPhotos });
                      }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                    />
                    <input
                      type="text"
                      placeholder="After Photo URL"
                      value={clientForm.photos.find(p => p.type === 'after')?.url || ''}
                      onChange={(e) => {
                        const existing = clientForm.photos.find(p => p.type === 'after');
                        const newPhotos = existing
                          ? clientForm.photos.map(p => p.type === 'after' ? { ...p, url: e.target.value } : p)
                          : [...clientForm.photos, { url: e.target.value, type: 'after' as const, caption: 'After' }];
                        setClientForm({ ...clientForm, photos: newPhotos });
                      }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors">
                    {editingId ? 'Update' : 'Save Transformation'}
                  </button>
                  <button type="button" onClick={() => { setShowTransformationForm(false); setEditingId(null); }} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            {/* Clients List */}
            <div className="space-y-4">
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-green-400/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{client.name}</h3>
                        {client.verified && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">✓ Verified</span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">{client.goal}</p>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Before</p>
                          <p className="text-white font-bold">{client.beforeWeight}kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500">After</p>
                          <p className="text-green-400 font-bold">{client.afterWeight}kg</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="text-white font-bold">{client.duration}mo</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Progress</p>
                          <p className="text-orange-400 font-bold">{client.progressPercentage}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setClientForm({
                            name: client.name,
                            goal: client.goal,
                            beforeWeight: String(client.beforeWeight),
                            afterWeight: String(client.afterWeight),
                            duration: String(client.duration),
                            verified: client.verified,
                            photos: client.photos.map(p => ({ url: p.url, type: p.type, caption: p.caption || '' })),
                          });
                          setEditingId(client.id);
                          setShowTransformationForm(true);
                        }}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-end mb-6">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-bold rounded-lg hover:scale-105 transition-transform">
                <Plus size={20} />
                Add Testimonial
              </button>
            </div>

            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-green-400/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <img src={testimonial.clientPhoto} alt={testimonial.clientName} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="text-white font-bold mb-1">{testimonial.clientName}</h3>
                        <p className="text-green-400 text-sm mb-2">{testimonial.transformation}</p>
                        <p className="text-gray-400 italic">&quot;{testimonial.testimonial}&quot;</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg"><Edit2 size={16} /></button>
                      <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
