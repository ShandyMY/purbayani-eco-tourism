import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, ShoppingBag, ArrowRight } from 'lucide-react';

export const revalidate = 0; // Agar data selalu up-to-date saat direfresh

export default async function AdminOverviewPage() {
  // 1. Ambil total data dari database
  const totalWisata = await prisma.wisata.count();
  
  // Jika Anda sudah memiliki model Umkm di Prisma schema, gunakan ini:
  // Jika belum ada, Anda bisa set manual ke angka 0 sementara waktu.
  const totalUmkm = await prisma.umkm.count(); 

  // 2. Ambil beberapa data wisata terbaru untuk ditampilkan di tabel kecil
  const recentWisata = await prisma.wisata.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5, // Ambil 5 data terbaru
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Admin</h1>
        <p className="text-slate-500 text-xs md:text-sm mt-1">
          Ringkasan statistik dan data sistem informasi Desa Purbayani.
        </p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Card Total Wisata */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Wisata</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalWisata}</h3>
            <Link 
              href="/admin/wisata" 
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 mt-3 transition"
            >
              Kelola Data Wisata <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <MapPin className="w-8 h-8" />
          </div>
        </div>

        {/* Card Total UMKM */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total UMKM Desa</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalUmkm}</h3>
            <Link 
              href="/admin/umkm" 
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 mt-3 transition"
            >
              Kelola Data UMKM <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <ShoppingBag className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Tabel Wisata Terbaru */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-slate-900">Destinasi Wisata Terakhir Ditambahkan</h2>
          <Link href="/admin/wisata" className="text-xs font-semibold text-emerald-600 hover:underline">
            Lihat Semua
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentWisata.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center bg-slate-50 rounded-xl">
              Belum ada data destinasi wisata.
            </p>
          ) : (
            recentWisata.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.gambar ? (
                    <img src={item.gambar} alt={item.nama} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.nama}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.kategori}</p>
                  </div>
                </div>
                {item.lokasi && (
                  <span className="hidden sm:inline-block text-[10px] bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full font-medium border border-slate-100">
                    {item.lokasi}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}