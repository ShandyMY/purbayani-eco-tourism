'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Store, Compass, FileText, Home, Building2, Newspaper, LogOut } from 'lucide-react';
import { logoutAdmin } from '@/app/admin/actions'; // Import fungsi logout yang sudah dibuat

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Jika sedang di halaman login, tampilkan children saja tanpa sidebar admin
  if (isLoginPage) {
    return <>{children}</>;
  }

  const menuItems = [
    { title: 'Overview', href: '/admin', icon: LayoutDashboard },
    { title: 'Kelola UMKM', href: '/admin/umkm', icon: Store },
    { title: 'Kelola Wisata', href: '/admin/wisata', icon: Compass },
    { title: 'Fasilitas & Usaha', href: '/admin/fasilitas', icon: Building2 },
    { title: 'Kelola Berita', href: '/admin/berita', icon: Newspaper },
    { title: 'Profil Desa', href: '/admin/profil', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          <div className="px-3 py-2">
            <h2 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Panel Admin
            </h2>
            <p className="text-lg font-bold text-white mt-1">Desa Purbayani</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bagian Bawah Sidebar (Link Situs & Tombol Logout) */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white transition"
          >
            <Home className="w-4 h-4" />
            <span>Lihat Situs Utama</span>
          </Link>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:text-white hover:bg-rose-600/20 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar (Logout)</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}