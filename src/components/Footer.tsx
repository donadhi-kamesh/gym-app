'use client';

import Link from 'next/link';
import { MessageCircle, Share2, Heart, Lock } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function Footer() {
  const { brand } = useSite();
  const logoInitial = brand.brandName ? brand.brandName.charAt(0).toUpperCase() : 'T';

  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">{logoInitial}</span>
              </div>
              <span className="text-white font-bold text-xl">{brand.brandName}</span>
            </div>
            <p className="text-gray-400 text-sm">
              {brand.tagline || 'Premium fitness transformations with verified results and expert coaching.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/transformations" className="hover:text-green-400 transition-colors">
                  Transformations
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-green-400 transition-colors">
                  Programs & Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-green-400 transition-colors font-bold text-green-400">
                  Register Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Phone: <span className="text-white font-bold">{brand.phone}</span></li>
              <li>Email: <span className="text-white font-bold">{brand.email}</span></li>
              <li>Location: <span className="text-white">{brand.address}</span></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                title="Instagram"
              >
                <Share2 size={22} />
              </a>
              <a
                href={`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={22} />
              </a>
              <a
                href={brand.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                title="Facebook"
              >
                <Heart size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Very discreet CMS link at the end */}
        <div className="border-t border-gray-800/80 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {brand.brandName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                Support & Inquiries
              </Link>
              {/* Discrete low-visibility CMS access link for owner */}
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-400 transition-all opacity-40 hover:opacity-100 text-xs flex items-center gap-1"
                title="Portal"
              >
                <Lock size={10} />
                <span>Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
