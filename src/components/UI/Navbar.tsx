'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Palmtree } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Sembunyikan Navbar publik di seluruh area admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const menuItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil Desa', href: '/profil' },
    { name: 'Direktori Wisata', href: '/wisata' },
    { name: 'Direktori UMKM', href: '/umkm' },
    { name: 'Fasilitas & Usaha', href: '/fasilitas' },
    { name: 'Kabar Desa', href: '/berita' },
  ];

  // Handler scroll mulus ke anchor target
  const handleScrollToPeta = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === '/') {
      e.preventDefault();
      const target = document.getElementById('peta');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-[1000] bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-teal-600 text-white p-2 rounded-xl">
            <Palmtree className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 tracking-tight block">PURBAYANI</span>
            <span className="text-[10px] text-teal-600 font-bold block -mt-1 tracking-wider uppercase">Garut Selatan</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={idx} 
                href={item.href} 
                className={`text-sm font-semibold transition ${
                  isActive ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          {/* Tombol Peta Digital */}
          <Link 
            href="/#peta" 
            onClick={handleScrollToPeta}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition"
          >
            Peta Digital
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-100 py-6 px-6 absolute w-full left-0 shadow-xl">
          <div className="flex flex-col gap-4">
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={idx} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-bold transition ${
                    isActive ? 'text-teal-600' : 'text-slate-700 hover:text-teal-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Tombol Peta di Mobile */}
            <Link 
              href="/#peta" 
              onClick={handleScrollToPeta}
              className="bg-teal-600 text-white text-center py-3 rounded-xl font-bold mt-2"
            >
              Peta Digital
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}