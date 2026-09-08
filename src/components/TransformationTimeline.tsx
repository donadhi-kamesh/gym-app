'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface TimelinePhase {
  label: string;
  description?: string;
  completed: boolean;
}

interface TransformationTimelineProps {
  phases: TimelinePhase[];
}

export default function TransformationTimeline({
  phases,
}: TransformationTimelineProps) {
  return (
    <div className="w-full py-12">
      <h3 className="text-3xl font-bold text-white mb-12 text-center">
        TRANSFORMATION TIMELINE
      </h3>

      {/* Desktop Timeline */}
      <div className="hidden md:flex justify-between items-center mb-12">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-1 flex flex-col items-center"
          >
            {/* Circle */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                phase.completed
                  ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                  : 'bg-gray-700 border-2 border-gray-600'
              }`}
            >
              {phase.completed ? (
                <CheckCircle2 size={32} className="text-white" />
              ) : (
                <div className="w-6 h-6 bg-gray-600 rounded-full" />
              )}
            </motion.div>

            {/* Label */}
            <p
              className={`text-center font-bold ${
                phase.completed ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              {phase.label}
            </p>

            {/* Description */}
            {phase.description && (
              <p className="text-gray-500 text-sm mt-2 text-center max-w-[120px]">
                {phase.description}
              </p>
            )}

            {/* Connector Line */}
            {index < phases.length - 1 && (
              <div className="absolute left-1/2 top-8 w-[calc(100%+2rem)] h-1 -ml-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: phase.completed ? 1 : 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-600 origin-left"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-6">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4"
          >
            {/* Timeline Circle */}
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  phase.completed
                    ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                    : 'bg-gray-700 border-2 border-gray-600'
                }`}
              >
                {phase.completed ? (
                  <CheckCircle2 size={24} className="text-white" />
                ) : (
                  <div className="w-4 h-4 bg-gray-600 rounded-full" />
                )}
              </motion.div>

              {/* Vertical Line */}
              {index < phases.length - 1 && (
                <div className="w-1 h-12 bg-gray-700 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="pb-6">
              <p
                className={`font-bold text-lg ${
                  phase.completed ? 'text-green-400' : 'text-gray-400'
                }`}
              >
                {phase.label}
              </p>
              {phase.description && (
                <p className="text-gray-500 text-sm mt-1">{phase.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
