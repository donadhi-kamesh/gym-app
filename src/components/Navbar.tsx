'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { brand, banner } = useSite();
  const pathname = usePathname();

  const navItems = [
    { name: 'Clients', href: '/transformations' },
    { name: 'Programs', href: '/programs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="fixed top-0 w-full z-50">
      {banner.enabled && banner.text && (
        <div className="bg-[#f4f4f5] text-zinc-900">
          <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2 text-[11px] font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 shrink-0" />
            <span className="truncate">{banner.text}</span>
            {banner.linkText && banner.linkUrl && (
              <Link
                href={banner.linkUrl}
                className="hidden sm:inline-flex items-center gap-1 font-bold underline underline-offset-2 shrink-0"
              >
                {banner.linkText} <ArrowRight size={11} />
              </Link>
            )}
          </div>
        </div>
      )}

      <nav className="border-b border-white/[0.08] bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-[#f4f4f5] text-zinc-950 flex items-center justify-center rounded-[7px] text-[15px] font-extrabold leading-none">
                {brand.brandName ? brand.brandName.charAt(0).toUpperCase() : 'T'}
              </span>
              <span className="text-white font-bold text-[15px] tracking-[-0.01em]">
                {brand.brandName}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link key={item.name} href={item.href} data-active={active} className="nav-link">
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:block">
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 bg-[#f4f4f5] hover:bg-[#d7f542] text-zinc-950 text-[13px] font-bold rounded-lg px-4 py-2.5 transition-colors"
              >
                Start coaching <ArrowRight size={14} />
              </Link>
            </div>

            <button
              className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-zinc-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-3 border-t border-white/[0.08] space-y-0.5">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="block px-1 py-2.5 text-sm font-semibold text-zinc-300"
                  >
                    Home
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-1 py-2.5 text-sm font-semibold text-zinc-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2 pb-1">
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-1.5 bg-[#f4f4f5] text-zinc-950 text-sm font-bold rounded-lg px-4 py-3"
                    >
                      Start coaching <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
}
