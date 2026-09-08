'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';
import ClientProfile from '@/components/ClientProfile';
import ImageModal from '@/components/ImageModal';
import TransformationTimeline from '@/components/TransformationTimeline';
import CTASection from '@/components/CTASection';
import { TransformationImage } from '@/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function TransformationDetailPage() {
  const { id } = useParams();
  const { clients } = useSite();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<TransformationImage | null>(null);

  const client = clients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="min-h-screen bg-black pt-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            Transformation Not Found
          </h1>
          <Link
            href="/transformations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-400 text-black font-bold rounded-lg hover:bg-green-500 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Transformations
          </Link>
        </div>
      </div>
    );
  }

  const timelinePhases = [
    { label: 'START', description: 'Day 1 Baseline', completed: true },
    { label: 'MONTH 1', description: 'Initial Progress', completed: true },
    { label: 'MONTH 2', description: 'Visible Body Recomp', completed: true },
    { label: 'MONTH 3', description: 'Peak Conditioning', completed: true },
    { label: 'TRANSFORMATION COMPLETE', description: 'Achieved Goal', completed: true },
  ];

  const handleImageClick = (image: TransformationImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  return (
    <main>
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-800 pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/transformations"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-6 transition-colors font-bold"
          >
            <ArrowLeft size={20} />
            Back to Transformations
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            {client.name}&apos;s Transformation
          </h1>
          <p className="text-gray-400">{client.goal}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Image Carousel */}
        {client.photos && client.photos.length > 0 && (
          <div className="mb-12">
            <ImageCarousel images={client.photos} onImageClick={handleImageClick} />
          </div>
        )}

        {/* Client Profile */}
        <div className="mb-16">
          <ClientProfile client={client} />
        </div>

        {/* Transformation Timeline */}
        <div className="py-12 border-t border-gray-800">
          <TransformationTimeline phases={timelinePhases} />
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        title="Ready for Your Own Transformation?"
        description="Follow in the footsteps of our successful clients and start your fitness journey today."
      />

      {/* Image Modal */}
      {client.photos && (
        <ImageModal
          image={selectedImage}
          images={client.photos}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
