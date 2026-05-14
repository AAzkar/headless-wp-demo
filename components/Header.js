'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header({ siteTitle, menuItems }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-6 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex items-center justify-between px-8 py-4 rounded-full border shadow-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 border-gray-200 backdrop-blur-xl'
              : 'bg-white/10 border-white/10 backdrop-blur-xl'
          }`}
        >
          <Link
            href="/"
            className={`text-xl font-bold transition ${
              scrolled ? 'text-[#10231d]' : 'text-white'
            }`}
          >
            {siteTitle}
          </Link>

          <nav className="flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.path === '#' ? '/' : item.path}
                className={`text-sm transition duration-300 ${
                  scrolled
                    ? 'text-gray-700 hover:text-[#10231d]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}