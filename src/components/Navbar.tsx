'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { brand, banner } = useSite();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Transformations', href: '/transformations' },
    { name: 'Programs', href: '/programs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Register', href: '/register' },
  ];

  const logoInitial = brand.brandName ? brand.brandName.charAt(0).toUpperCase() : 'T';

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Dynamic Announcement Banner */}
      {banner.enabled && banner.text && (
        <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-black font-extrabold text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-md">
          <span>{banner.text}</span>
          {banner.linkText && banner.linkUrl && (
            <Link
              href={banner.linkUrl}
              className="underline hover:text-white transition-colors inline-flex items-center gap-0.5"
            >
              {banner.linkText} <ArrowRight size={12} />
            </Link>
          )}
        </div>
      )}

      <nav className="bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
                <span className="text-black font-black text-xl">{logoInitial}</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight hidden sm:inline">
                {brand.brandName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm font-bold"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-extrabold px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 text-sm"
              >
                Start Transformation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-6 pt-2 border-t border-gray-800 space-y-2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 hover:text-green-400 py-2 font-bold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/register"
                  className="block bg-gradient-to-r from-green-400 to-emerald-600 text-black font-extrabold px-4 py-3 rounded-xl text-center shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Start Transformation
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </div>
  );
}
