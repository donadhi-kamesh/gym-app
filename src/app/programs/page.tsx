'use client';

import { motion } from 'framer-motion';
import { programs } from '@/data/clients';
import Footer from '@/components/Footer';
import ProgramCard from '@/components/ProgramCard';
import CTASection from '@/components/CTASection';

export default function ProgramsPage() {
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
              Our Premium Programs
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Scientifically-designed fitness programs tailored to your specific goals. Choose your path to transformation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            What's Included in Every Program
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expert Coaching',
                description: 'Personalized guidance from certified fitness professionals',
                icon: '💪',
              },
              {
                title: 'Nutrition Plans',
                description: 'Custom meal plans aligned with your fitness goals',
                icon: '🥗',
              },
              {
                title: 'Progress Tracking',
                description: 'Real-time monitoring and adjustments to your program',
                icon: '📊',
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock support via WhatsApp and email',
                icon: '🤝',
              },
              {
                title: 'Workout Plans',
                description: 'Structured training programs updated weekly',
                icon: '🏋️',
              },
              {
                title: 'Community Access',
                description: 'Join our exclusive community of transformers',
                icon: '👥',
              },
              {
                title: 'Supplement Guidance',
                description: 'Evidence-based supplement recommendations',
                icon: '💊',
              },
              {
                title: 'Transformation Photos',
                description: 'Professional photo documentation of your journey',
                icon: '📸',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-gray-800 hover:border-green-400/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How long does it take to see results?',
                a: 'Most clients notice visible changes within 4-6 weeks. Significant transformations typically occur within 8-12 weeks of consistent effort.',
              },
              {
                q: 'Do I need gym experience?',
                a: 'No! Our programs are designed for all fitness levels, from complete beginners to advanced athletes.',
              },
              {
                q: 'Can I do this from home?',
                a: 'Absolutely. We offer both gym-based and home workout programs. Choose what works best for you.',
              },
              {
                q: 'Is nutrition guidance included?',
                a: 'Yes! Every program includes personalized nutrition plans tailored to your goals and preferences.',
              },
              {
                q: 'What if I miss a workout?',
                a: 'Our coaches adjust your program dynamically. We focus on consistency, not perfection.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day satisfaction guarantee. If you\'re not happy, we\'ll refund your investment.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-green-400/50 transition-all duration-300"
              >
                <h3 className="text-white font-bold mb-2 flex items-center gap-3">
                  <span className="text-green-400 text-lg">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-400 ml-7">{faq.a}</p>
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
