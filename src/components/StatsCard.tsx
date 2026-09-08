'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  color?: 'green' | 'orange' | 'white';
}

export default function StatsCard({
  label,
  value,
  unit,
  highlight = false,
  color = 'white',
}: StatsCardProps) {
  const colorClasses = {
    green: 'text-green-400',
    orange: 'text-orange-400',
    white: 'text-white',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        highlight
          ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-400/50'
          : 'bg-gray-900/50 border-gray-800'
      }`}
    >
      <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className={`text-3xl md:text-4xl font-black ${colorClasses[color]}`}>
          {value}
        </p>
        {unit && <p className="text-gray-400 text-sm">{unit}</p>}
      </div>
    </motion.div>
  );
}
