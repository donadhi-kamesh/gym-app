'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { ClientTransformation } from '@/types';
import StatsCard from './StatsCard';

interface ClientProfileProps {
  client: ClientTransformation;
}

export default function ClientProfile({ client }: ClientProfileProps) {
  const weightLoss = client.beforeWeight - client.afterWeight;
  const progress = Math.round(
    ((client.beforeWeight - client.afterWeight) / (client.beforeWeight - client.afterWeight)) *
      client.progressPercentage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start gap-6 bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
        {client.profilePhoto && (
          <img
            src={client.profilePhoto}
            alt={client.name}
            className="w-24 h-24 rounded-full object-cover ring-2 ring-green-400"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-white">{client.name}</h2>
            {client.verified && (
              <CheckCircle className="text-green-400" size={28} />
            )}
          </div>
          <p className="text-gray-400 mb-4">{client.goal}</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-bold">
              ✓ Verified
            </span>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold">
              {client.currentPhase}
            </span>
          </div>
        </div>
      </div>

      {/* Weight Transformation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="BEFORE TRANSFORMATION"
          value={client.beforeWeight}
          unit="kgs"
          color="white"
        />
        <div className="flex items-center justify-center md:col-span-1">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <p className="text-orange-400 font-black text-4xl">-{weightLoss}kg</p>
            <p className="text-gray-400 text-sm mt-2">Weight Loss</p>
          </motion.div>
        </div>
        <StatsCard
          label="AFTER TRANSFORMATION"
          value={client.afterWeight}
          unit="kgs"
          highlight={true}
          color="green"
        />
      </div>

      {/* Journey Description */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-6 rounded-2xl border border-green-500/30">
        <h3 className="text-lg font-bold text-white mb-3">JOURNEY LOG DESCRIPTION</h3>
        <p className="text-gray-300 text-lg italic">"{client.journeyDescription}"</p>
      </div>

      {/* Transformation Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Duration"
          value={client.duration}
          unit="months"
        />
        <StatsCard
          label="Starting Weight"
          value={client.beforeWeight}
          unit="kg"
        />
        <StatsCard
          label="Current Weight"
          value={client.afterWeight}
          unit="kg"
        />
        <StatsCard
          label="Weight Change"
          value={`-${weightLoss}`}
          unit="kg"
          color="orange"
        />
        <StatsCard
          label="Training Consistency"
          value={client.trainingConsistency}
          unit="%"
          color="green"
        />
        <StatsCard
          label="Progress"
          value={client.progressPercentage}
          unit="%"
          highlight={true}
        />
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <p className="text-white font-bold">Overall Progress</p>
          <p className="text-green-400 font-bold">{client.progressPercentage}%</p>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${client.progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"
          />
        </div>
      </div>

      {/* Testimonial */}
      {client.testimonial && (
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-sm font-bold mb-3">CLIENT TESTIMONIAL</p>
          <p className="text-gray-300 text-lg">"{client.testimonial}"</p>
        </div>
      )}
    </motion.div>
  );
}
