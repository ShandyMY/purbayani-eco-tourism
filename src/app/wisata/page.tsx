import { prisma } from '@/lib/prisma';
import { Compass } from 'lucide-react';
import WisataListClient from './WisataListClient';

export const revalidate = 0;

export default async function WisataPublicPage() {
  const dataWisata = await prisma.wisata.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
              <Compass className="w-4 h-4" /> Eco-Tourism Desa Purbayani
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Jelajahi Pesona & <span className="text-emerald-400">Keindahan Alam</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Temukan destinasi wisata alam, budaya, dan sarana edukasi keluarga terbaik di Desa Purbayani.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center min-w-[220px]">
            <span className="text-3xl md:text-4xl font-extrabold text-emerald-400">{dataWisata.length}</span>
            <p className="text-xs text-slate-200 mt-1 font-medium">Destinasi Terdaftar</p>
          </div>
        </div>
      </div>

      {/* Interactive Catalog Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <WisataListClient initialData={dataWisata} />
      </div>
    </div>
  );
}