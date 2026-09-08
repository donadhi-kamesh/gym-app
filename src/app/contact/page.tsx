'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'weight-loss',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', goal: 'weight-loss', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to start your transformation? Let's talk about your fitness goals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-white mb-8">
                Contact Information
              </h2>

              {/* WhatsApp */}
              <a
                href="https://wa.me/9177385668"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-green-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-400/30">
                  <MessageCircle className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">WhatsApp</p>
                  <p className="text-gray-400 text-sm">+91 9177385668</p>
                  <p className="text-gray-500 text-xs mt-2">Quick responses</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919177385668"
                className="flex items-start gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-green-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-400/30">
                  <Phone className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Call Us</p>
                  <p className="text-gray-400 text-sm">+91 9177385668</p>
                  <p className="text-gray-500 text-xs mt-2">Mon-Sat, 9AM-6PM</p> 
                </div>
              </a>

              {/* Email */}
              <a
                 href="mailto:info@teamdinesh.com"
                className="flex items-start gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-green-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-400/30">
                  <Mail className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Email</p>
                  <p className="text-gray-400 text-sm">info@teamdinesh.com</p>
                  <p className="text-gray-500 text-xs mt-2">24-hour response</p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Location</p>
                  <p className="text-gray-400 text-sm">Kuppam, India</p>
                  <p className="text-gray-500 text-xs mt-2">Also available online</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white font-bold mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-bold mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-white font-bold mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="+91 9999 999 999"
                    />
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-white font-bold mb-3">
                      Fitness Goal *
                    </label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                    >
                      <option value="weight-loss">Weight Loss</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="strength">Strength Training</option>
                      <option value="transformation">Body Transformation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-bold mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors resize-none"
                    placeholder="Tell us about your fitness journey and goals..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold py-4 rounded-lg transition-all duration-300"
                >
                  Send Message
                </motion.button>

                {/* Success Message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/20 border border-green-400 text-green-400 p-4 rounded-lg text-center font-bold"
                  >
                    Thank you! We'll be in touch soon.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            Common Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How quickly will you respond?',
                a: 'We aim to respond to all inquiries within 24 hours. For urgent matters, WhatsApp us for immediate assistance.',
              },
              {
                q: 'Do you offer free consultations?',
                a: 'Yes! We offer a free 30-minute consultation to discuss your goals and find the perfect program for you.',
              },
              {
                q: 'What is the next step?',
                a: 'Fill out the contact form or message us directly. We\'ll schedule a consultation to understand your needs and create a personalized plan.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
              >
                <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
