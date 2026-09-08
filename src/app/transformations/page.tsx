'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSite } from '@/context/SiteContext';

export default function TransformationsPage() {
  const { clients } = useSite();

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
                  <Link
                    href={`/transformations/${client.id}`}
                    className="block bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/20 flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden bg-black">
                      {client.photos && client.photos[0] && (
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
                      {client.verified && (
                        <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1 border border-green-500/30">
                          <span>✓</span> Verified
                        </div>
                      )}

                      {/* Weight Change Badge */}
                      <div className="absolute bottom-4 left-4 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full font-bold text-sm border border-orange-500/30">
                        -{client.beforeWeight - client.afterWeight}kg
                      </div>
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
                        <p className="text-gray-400 text-xs font-bold mb-1">DURATION</p>
                        <p className="text-lg font-bold text-white">
                          {client.duration} Months
                        </p>
                      </div>

                      {/* View Details Button */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-auto">
                        <span className="text-gray-400 text-sm font-bold">View Full Story</span>
                        <ArrowRight
                          size={18}
                          className="text-green-400 group-hover:translate-x-2 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
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
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-extrabold rounded-xl transition-all duration-300 transform hover:scale-105"
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
