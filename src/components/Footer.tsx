'use client';

import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function Footer() {
  const { brand } = useSite();

  const links = [
    { name: 'Clients', href: '/transformations' },
    { name: 'Programs', href: '/programs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Start coaching', href: '/register' },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-[#f4f4f5] text-zinc-950 flex items-center justify-center rounded-[7px] text-[15px] font-extrabold leading-none">
                {brand.brandName ? brand.brandName.charAt(0).toUpperCase() : 'T'}
              </span>
              <span className="text-white font-bold text-[15px]">{brand.brandName}</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              {brand.tagline || 'Online coaching for fat loss and muscle gain.'}
            </p>
            <p className="mt-3 text-sm text-zinc-500">{brand.address}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-14 gap-y-3 content-start">
            {links.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {l.name}
                <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500" />
              </Link>
            ))}
          </nav>

          <div className="text-sm">
            <p className="text-zinc-500">{brand.phone}</p>
            <p className="mt-1.5 text-zinc-500">{brand.email}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-[13px] text-zinc-600">
            © {new Date().getFullYear()} {brand.brandName}. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-zinc-700 hover:text-zinc-500 transition-colors"
            title="Portal"
          >
            <Lock size={10} /> Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
