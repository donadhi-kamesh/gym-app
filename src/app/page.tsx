import Hero from '@/components/Hero';
import { homeStatistics, clients, programs, testimonials } from '@/data/clients';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ProgramCard from '@/components/ProgramCard';
import TestimonialCard from '@/components/TestimonialCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero stats={homeStatistics} />

      {/* Featured Transformations */}
      <section className="py-20 bg-black/80 backdrop-blur-md border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Featured Transformations
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real stories from real people who took control of their fitness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {clients.slice(0, 3).map((client) => (
              <Link
                key={client.id}
                href={`/transformations/${client.id}`}
                className="group bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/20"
              >
                <div className="relative h-64 overflow-hidden">
                  {client.photos[0] && (
                    <img
                      src={client.photos[0].url}
                      alt={`${client.name} before`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold text-sm">
                    ✓ Verified
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {client.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-400">{client.goal}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs font-bold">Before</p>
                      <p className="text-2xl font-black text-white">
                        {client.beforeWeight}kg
                      </p>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs font-bold">After</p>
                      <p className="text-2xl font-black text-green-400">
                        {client.afterWeight}kg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {client.duration} months transformation
                    </span>
                    <ArrowRight
                      size={20}
                      className="text-green-400 group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/transformations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              View All Transformations
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-black/85 backdrop-blur-md border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our Premium Programs
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Scientifically-designed programs tailored to your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/80 backdrop-blur-md border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              What our satisfied clients have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
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
