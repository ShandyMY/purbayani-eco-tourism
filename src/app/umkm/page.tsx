import { prisma } from '@/lib/prisma';
import { ShoppingBag } from 'lucide-react';
import UmkmListClient from './UMKMListClient'; // Adjust path sesuai struktur folder kamu

export const revalidate = 0;

export default async function UmkmPublicPage() {
  const umkmModel = (prisma as any).umkm || (prisma as any).uMKM;
  const rawData = await umkmModel.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Normalisasi data agar sesuai dengan interface UmkmItem di client
  const dataUmkm = rawData.map((item: any) => ({
    id: item.id,
    nama: item.nama,
    kategori: item.kategori ?? null,
    deskripsi: item.deskripsi ?? '',
    pemilik: item.pemilik ?? null,
    noHp: item.kontak ?? item.noHp ?? null, // Menggunakan 'kontak' dari Prisma
    alamat: item.alamat ?? null,
    latitude: item.latitude ? Number(item.latitude) : null,
    longitude: item.longitude ? Number(item.longitude) : null,
    gambar: item.gambar ?? null,
  }));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
              <ShoppingBag className="w-4 h-4" /> Ekonomi Kerakyatan
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Katalog <span className="text-emerald-400">UMKM Purbayani</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Dukung perekonomian warga dengan membeli produk kuliner, olahan tani, dan kerajinan tangan khas Desa Purbayani.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center min-w-[220px]">
            <span className="text-3xl md:text-4xl font-extrabold text-emerald-400">{dataUmkm.length}</span>
            <p className="text-xs text-slate-200 mt-1 font-medium">Usaha Terdaftar</p>
          </div>
        </div>
      </div>

      {/* Main Content Rendered via Client Component */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <UmkmListClient initialData={dataUmkm} />
      </div>
    </div>
  );
}