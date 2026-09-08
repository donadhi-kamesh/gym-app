'use client';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export default function StatsCard({ label, value, unit, highlight = false }: StatsCardProps) {
  return (
    <div
      className={`rounded-[14px] border p-5 transition-colors ${
        highlight ? 'border-white/25 bg-white/[0.04]' : 'border-white/[0.09] bg-black/40'
      }`}
    >
      <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-[0.14em]">{label}</p>
      <p className="mt-1.5 text-[1.7rem] font-bold tracking-tight text-white tnum leading-none">
        {value}
        {unit && <span className="ml-1 text-sm font-semibold text-zinc-500">{unit}</span>}
      </p>
    </div>
  );
}
