'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';

export default function AboutPage() {
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
               About Team Dinesh
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're dedicated to transforming lives through verified fitness coaching and proven methodologies.
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
              <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                We believe that every person deserves access to world-class fitness coaching and accountability. Our mission is to make real, verifiable transformations accessible to everyone.
              </p>
              <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                By combining expert coaching, proven methodologies, and verified results, we've created a platform where dreams become reality. We don't just promise transformations—we document, verify, and celebrate them.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Your success is our success. We're invested in your journey and committed to helping you become the best version of yourself.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Verified Results',
                description: 'Every transformation is documented and verified. Authenticity is non-negotiable.',
                icon: '✓',
              },
              {
                title: 'Expert Coaching',
                description: 'Our coaches are certified professionals with years of real-world experience.',
                icon: '👨‍🏫',
              },
              {
                title: 'Accountability',
                description: 'We keep you accountable to your goals through continuous tracking and support.',
                icon: '📊',
              },
              {
                title: 'Community',
                description: 'You\'re not alone. Join a supportive community of transformers.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-8 rounded-xl border border-green-500/30 text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '500+', label: 'Transformations' },
              { number: '10K+', label: 'Progress Photos' },
              { number: '95%', label: 'Satisfaction Rate' },
              { number: '50+', label: 'Expert Coaches' },
            ].map((stat, index) => (
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
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
            Meet Team Dinesh
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 text-center">
            The coaches behind your transformation
          </p>

          {/* Team Group Photo */}
          <div className="mb-16 rounded-2xl overflow-hidden border border-gray-800">
            <img
              src="/placeholders/image-3.svg"
              alt="Team Dinesh"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="bg-gradient-to-r from-green-900/30 to-black p-6 text-center">
              <p className="text-white font-bold text-xl">Team Dinesh</p>
              <p className="text-gray-400">Your Transformation Partners</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Coach Dinesh',
                role: 'Founder & Head Coach',
                image: '/placeholders/image-4.svg',
                bio: '10+ years of fitness coaching experience with 500+ successful transformations.',
              },
              {
                name: 'Coach Priya',
                role: 'Nutrition Specialist',
                image: '/placeholders/image-5.svg',
                bio: 'Certified nutritionist helping clients build sustainable eating habits.',
              },
              {
                name: 'Coach Arjun',
                role: 'Performance Coach',
                image: '/placeholders/image-6.svg',
                bio: 'Specializes in strength training and athletic performance optimization.',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-green-400/50 transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-400 font-bold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
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
