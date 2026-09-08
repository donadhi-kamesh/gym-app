'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, ArrowRight, Lock } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { clients as initialClients } from '@/data/clients';
import { ClientTransformation } from '@/types';

const ADMIN_PASSWORD = 'admin123';

export default function TransformationsPage() {
  const [clients, setClients] = useState<ClientTransformation[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('clients');
      if (stored) return JSON.parse(stored);
    }
    return initialClients;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminAuth') === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    goal: '',
    beforeWeight: '',
    afterWeight: '',
    duration: '',
  });

  const saveClients = (data: ClientTransformation[]) => {
    setClients(data);
    localStorage.setItem('clients', JSON.stringify(data));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('adminAuth', 'true');
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminAuth');
    setShowForm(false);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: ClientTransformation = {
      id: Date.now().toString(),
      name: form.name,
      goal: form.goal,
      beforeWeight: Number(form.beforeWeight),
      afterWeight: Number(form.afterWeight),
      duration: Number(form.duration),
      verified: false,
      progressPercentage: 0,
      trainingConsistency: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + Number(form.duration) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currentPhase: 'Active',
      journeyDescription: '',
      photos: [
        {
          id: `p-${Date.now()}-before`,
          url: '/placeholders/image-26.svg',
          type: 'before',
          caption: 'Starting Point',
        },
        {
          id: `p-${Date.now()}-after`,
          url: '/placeholders/image-27.svg',
          type: 'after',
          caption: 'Final Result',
        },
      ],
      testimonial: '',
      profilePhoto: '',
    };
    saveClients([...clients, newClient]);
    setForm({ name: '', goal: '', beforeWeight: '', afterWeight: '', duration: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transformation?')) {
      saveClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-900/20 to-black pt-32 pb-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              Verified Transformations
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real people. Real results. Real accountability. Explore our gallery of verified fitness transformations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {!isAdmin ? (
          <div className="flex justify-end">
            <form onSubmit={handlePasswordSubmit} className="flex gap-2">
              <input
                type="password"
                placeholder="Admin Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold rounded-lg transition-all duration-300"
              >
                <Lock size={18} />
                Unlock Admin
              </button>
            </form>
            {passwordError && (
              <p className="text-red-400 text-sm mt-2 ml-auto">{passwordError}</p>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-green-400">
              <Lock size={18} />
              <span className="font-bold">Admin Mode Active</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {showForm ? <X size={20} /> : <Plus size={20} />}
                {showForm ? 'Cancel' : 'Add Transformation'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Add Transformation Form */}
        <AnimatePresence>
          {showForm && isAdmin && (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleAdd}
              className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 mt-6 space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">New Transformation</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                />
                <input
                  type="text"
                  placeholder="Fitness Goal"
                  value={form.goal}
                  onChange={(e) => setForm({ ...form, goal: e.target.value })}
                  required
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="number"
                  placeholder="Before Weight (kg)"
                  value={form.beforeWeight}
                  onChange={(e) => setForm({ ...form, beforeWeight: e.target.value })}
                  required
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                />
                <input
                  type="number"
                  placeholder="After Weight (kg)"
                  value={form.afterWeight}
                  onChange={(e) => setForm({ ...form, afterWeight: e.target.value })}
                  required
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                />
                <input
                  type="number"
                  placeholder="Duration (months)"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors">
                  Save Transformation
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Transformation Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/20 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-black">
                    {client.photos[0] && (
                      <>
                        <img
                          src={client.photos[0].url}
                          alt={`${client.name} before`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      </>
                    )}

                    {/* Verification Badge */}
                    <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1">
                      <span>✓</span> Verified
                    </div>

                    {/* Weight Change Badge */}
                    <div className="absolute bottom-4 left-4 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full font-bold text-sm">
                      -{client.beforeWeight - client.afterWeight}kg
                    </div>

                    {/* Delete Button - Admin Only */}
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="absolute top-4 left-4 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Transformation"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {client.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4">{client.goal}</p>

                    {/* Before/After Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-gray-400 text-xs font-bold mb-1">BEFORE</p>
                        <p className="text-2xl font-black text-white">
                          {client.beforeWeight}kg
                        </p>
                      </div>
                      <div className="bg-green-500/20 p-3 rounded-lg">
                        <p className="text-gray-400 text-xs font-bold mb-1">AFTER</p>
                        <p className="text-2xl font-black text-green-400">
                          {client.afterWeight}kg
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="mb-6">
                      <p className="text-gray-400 text-xs font-bold mb-2">DURATION</p>
                      <p className="text-lg font-bold text-white">
                        {client.duration} Months
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6 mt-auto">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-gray-400 font-bold">PROGRESS</p>
                        <p className="text-sm font-bold text-green-400">
                          {client.progressPercentage}%
                        </p>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${client.progressPercentage}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"
                        />
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-800 group/btn">
                      <span className="text-gray-400 text-sm">View Transformation</span>
                      <ArrowRight
                        size={18}
                        className="text-green-400 group-hover/btn:translate-x-2 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-green-900/20 to-black border-t border-green-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Your Story Could Be Next
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join our community of successful transformations. Let&apos;s create your verified success story.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
