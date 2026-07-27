import { prisma } from '@/lib/prisma';
import { Building2 } from 'lucide-react';
import FasilitasListClient from './FasilitasListClient'; // Sesuaikan lokasi file client

export const revalidate = 0;

export default async function FasilitasPublicPage() {
  const rawData = await prisma.fasilitas.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Safe mapping untuk menghindari undefined pada Next.js Client Component
  const dataFasilitas = rawData.map((item: any) => ({
    id: item.id,
    nama: item.nama,
    kategori: item.kategori ?? 'Umum',
    deskripsi: item.deskripsi ?? '',
    alamat: item.alamat ?? null,
    kontak: item.kontak ?? null,
    jamOperasional: item.jamOperasional ?? item.jam_operasional ?? null,
    latitude: item.latitude ? Number(item.latitude) : null,
    longitude: item.longitude ? Number(item.longitude) : null,
    gambar: item.gambar ?? null,
  }));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.15),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Sarana & Infrastruktur Desa
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Fasilitas <span className="text-teal-400">Umum</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Daftar kantor pelayanan publik, pos kesehatan, gedung sekolah, tempat ibadah, dan sarana olahraga penunjang warga Desa Purbayani.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center min-w-[200px]">
            <span className="text-3xl md:text-4xl font-extrabold text-teal-300">{dataFasilitas.length}</span>
            <p className="text-xs text-slate-200 mt-1 font-medium">Fasilitas Terdata</p>
          </div>
        </div>
      </div>

      {/* Main Interactive Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <FasilitasListClient initialData={dataFasilitas} />
      </div>
    </div>
  );
}