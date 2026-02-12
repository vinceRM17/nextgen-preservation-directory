'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/map', label: 'Map' },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Site Title */}
          <Link href="/" className="text-xl md:text-2xl font-oswald font-semibold hover:text-slate-300 transition-colors">
            NextGen Preservation Collab Directory
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-lato text-sm hover:text-slate-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-800 rounded transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-nav" className="md:hidden mt-4 pt-4 border-t border-slate-700" aria-label="Mobile navigation">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-lato text-sm hover:text-slate-300 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
