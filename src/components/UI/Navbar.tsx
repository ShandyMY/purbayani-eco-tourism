'use client';

import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Leaf,
  MapPin,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil Desa', href: '/profil' },
  { name: 'Wisata', href: '/wisata' },
  { name: 'UMKM', href: '/umkm' },
  { name: 'Fasilitas', href: '/fasilitas' },
  { name: 'Kabar Desa', href: '/berita' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Tutup menu mobile dengan tombol Esc.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Navbar publik tidak ditampilkan di area admin.
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const handleMapClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);

    if (pathname === '/') {
      const target = document.getElementById('peta');

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        window.history.replaceState(null, '', '/#peta');
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] px-3 pt-3 sm:px-5">
      <nav
        aria-label="Navigasi utama"
        className={`mx-auto max-w-[1360px] rounded-full border transition-all duration-300 ${
          scrolled
            ? 'border-emerald-950/10 bg-[#f7f8f4]/95 shadow-lg shadow-emerald-950/10 backdrop-blur-xl'
            : 'border-white/25 bg-[#f7f8f4]/85 shadow-md shadow-emerald-950/5 backdrop-blur-xl'
        } ${isOpen ? 'xl:rounded-full max-xl:rounded-3xl' : ''}`}
      >
        <div className="flex h-16 items-center justify-between gap-4 pl-3 pr-3 sm:pl-4 lg:pr-4">
          {/* BRAND */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Purbayani Eco Tourism - Beranda"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b2e28] text-emerald-300 transition duration-300 group-hover:bg-[#10574a]">
              <Leaf className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
            </div>

            <div className="leading-none">
              <span className="block text-base font-bold tracking-[0.14em] text-[#0f3329]">
                PURBAYANI
              </span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-800">
                Eco Tourism · Garut
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {menuItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                    active
                      ? 'bg-[#0b2e28] text-emerald-200'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* MAP CTA */}
          <div className="hidden xl:block">
            <Link
              href="/#peta"
              onClick={handleMapClick}
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-bold text-emerald-950 transition duration-300 hover:bg-emerald-200"
            >
              <MapPin className="h-4 w-4" />
              <span>Peta Digital</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-950/10 bg-white text-emerald-900 transition hover:bg-emerald-50 xl:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* TABLET + MOBILE MENU */}
        {isOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-emerald-950/10 px-4 pb-5 pt-3 sm:px-6 xl:hidden"
          >
            <div className="mb-3 rounded-2xl bg-emerald-50 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-800">
                Jelajahi Purbayani
              </p>
              <p className="mt-1 font-serif text-lg text-[#0f3329]">
                Alam, budaya, dan cerita lokal.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {menuItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`flex min-h-12 items-center justify-between rounded-full px-5 text-sm font-semibold transition ${
                      active
                        ? 'bg-[#0b2e28] text-emerald-200'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                    }`}
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                );
              })}
            </div>

            <Link
              href="/#peta"
              onClick={handleMapClick}
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-300 px-4 text-sm font-bold text-emerald-950 transition hover:bg-emerald-200"
            >
              <MapPin className="h-4 w-4" />
              Buka Peta Digital
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}