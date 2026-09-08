'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

interface CTASectionProps {
  title?: string;
  description?: string;
  showContacts?: boolean;
}

export default function CTASection({
  title = 'Your Transformation Starts Today.',
  description = 'Join hundreds of verified clients who have achieved their fitness goals with our proven programs and expert coaching.',
  showContacts = true,
}: CTASectionProps) {
  const { brand } = useSite();

  return (
    <section className="bg-gradient-to-r from-black via-green-900/20 to-black py-20 border-y border-green-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Main CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-extrabold rounded-xl transition-all duration-300 transform hover:scale-105 text-lg shadow-xl shadow-green-500/25"
          >
            Start Your Transformation
          </Link>
          <Link
            href="/transformations"
            className="px-8 py-4 border-2 border-green-400 text-green-400 hover:bg-green-400/10 font-extrabold rounded-xl transition-all duration-300 transform hover:scale-105 text-lg"
          >
            View Success Stories
          </Link>
        </motion.div>

        {/* Contact Options */}
        {showContacts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-green-400 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center group-hover:bg-green-400/30">
                <MessageCircle className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-white font-bold">WhatsApp</p>
                <p className="text-gray-400 text-sm">Message us directly</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${brand.phone}`}
              className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-green-400 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center group-hover:bg-green-400/30">
                <Phone className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-white font-bold">Call Us</p>
                <p className="text-gray-400 text-sm">{brand.phone}</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-green-400 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center group-hover:bg-green-400/30">
                <Mail className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-white font-bold">Email</p>
                <p className="text-gray-400 text-sm">{brand.email}</p>
              </div>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
