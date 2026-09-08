'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { useSite } from '@/context/SiteContext';

export default function AboutPage() {
  const { about, brand, hero } = useSite();

  return (
    <main>
      {/* Header */}
      <div className="bg-gradient-to-b from-green-900/20 to-black pt-32 pb-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              {about.title || `About ${brand.brandName}`}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {about.subtitle || 'We are dedicated to transforming lives through verified fitness coaching.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {about.mission}
              </p>
              <h3 className="text-2xl font-bold text-white mb-4">Our Story</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                {about.story}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden border border-gray-800"
            >
              <img
                src="/placeholders/image-2.svg"
                alt="Mission"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-8 rounded-2xl border border-green-500/30 text-center"
              >
                <div className="text-4xl mb-4 text-green-400 font-bold">0{index + 1}</div>
                <h3 className="text-white font-bold text-xl mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {hero.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
            Meet {brand.brandName}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 text-center">
            The dedicated coaches behind your transformation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.team.map((member, index) => (
              <motion.div
                key={member.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-green-400/50 transition-all duration-300"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-400 font-bold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
