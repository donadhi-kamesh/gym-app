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
      <div className="min-h-screen pt-40 px-4">
        <div className="max-w-xl mx-auto card p-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Client not found</h1>
          <p className="mt-2 text-sm text-zinc-500">This page may have been moved or removed.</p>
          <Link href="/transformations" className="btn-primary mt-6">
            <ArrowLeft size={16} /> All clients
          </Link>
        </div>
      </div>
    );
  }

  const timelinePhases = [
    { label: 'Start', description: 'Baseline measurements', completed: true },
    { label: 'Month 1', description: 'Habits locked in', completed: true },
    { label: 'Month 2', description: 'Visible recomposition', completed: true },
    { label: 'Month 3', description: 'Peak conditioning', completed: true },
    { label: 'Complete', description: 'Goal reached', completed: true },
  ];

  return (
    <main>
      <div className="border-b border-white/[0.08] bg-black/45 backdrop-blur-xl pt-36 md:pt-40 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/transformations" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={15} /> All clients
          </Link>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.025em] text-white leading-[1.02]">
            {client.name}
          </h1>
          <p className="mt-3 text-zinc-400 text-[15px]">
            {client.goal} · {client.duration} months · Verified
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#0a0a0b]/60">
        {client.photos?.length > 0 && (
          <div className="mb-10">
            <ImageCarousel images={client.photos} onImageClick={(img) => { setSelectedImage(img); setModalOpen(true); }} />
          </div>
        )}
        <ClientProfile client={client} />
        <div className="mt-10 pt-4 border-t border-white/[0.08]">
          <TransformationTimeline phases={timelinePhases} />
        </div>
      </div>

      <CTASection
        title="Want a result like this?"
        description="Same process: assessment, plan, weekly check-ins. Start with an application."
      />

      {client.photos && (
        <ImageModal image={selectedImage} images={client.photos} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}

      <Footer />
    </main>
  );
}
