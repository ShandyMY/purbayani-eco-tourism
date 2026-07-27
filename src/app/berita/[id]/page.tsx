import { prisma } from '@/lib/prisma';
import { Calendar, ImageOff, ArrowLeft, Newspaper, Share2, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface DetailBeritaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailBeritaPage({ params }: DetailBeritaPageProps) {
  const { id } = await params;

  // 1. Fetch berita utama berdasarkan ID
  const berita = await prisma.berita.findUnique({
    where: { id },
  });

  // Jika berita tidak ditemukan, tampilkan halaman 404
  if (!berita) {
    notFound();
  }

  // 2. Fetch beberapa berita lainnya untuk bagian sidebar
  const beritaLainnya = await prisma.berita.findMany({
    where: {
      id: {
        not: id,
      },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white pt-28 pb-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-400/20 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Semua Berita
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-300/80 pt-2">
            <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold text-[10px]">
              {berita.kategori || 'Pengumuman'}
            </span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {berita.tanggal ||
                  new Date(berita.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
              </span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-black leading-tight text-white">
            {berita.judul}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Article Main Body */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
            
            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 bg-slate-100 relative rounded-2xl overflow-hidden">
              {berita.gambar ? (
                <Image
                  src={berita.gambar}
                  alt={berita.judul}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 text-xs gap-2">
                  <ImageOff className="w-10 h-10" />
                  <span>Tanpa Gambar Header</span>
                </div>
              )}
            </div>

            {/* Article Ringkasan / Lead Text */}
            {berita.ringkasan && (
              <p className="text-sm md:text-base text-slate-600 font-medium italic border-l-4 border-emerald-500 pl-4 py-1 bg-emerald-50/50 rounded-r-lg">
                {berita.ringkasan}
              </p>
            )}

            {/* Full Body Content */}
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm md:text-base whitespace-pre-line">
              {berita.isi}
            </div>

            {/* Footer / Meta Info */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Tag className="w-3.5 h-3.5" />
                <span>Pemerintah Desa Purbayani</span>
              </div>
            </div>
          </article>

          {/* Sidebar / Related Posts */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-emerald-600" />
                Kabar Desa Lainnya
              </h3>

              {beritaLainnya.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">Belum ada berita lainnya.</p>
              ) : (
                <div className="space-y-4">
                  {beritaLainnya.map((item) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.id}`}
                      className="group flex gap-3 items-start hover:bg-slate-50 p-2 rounded-xl transition"
                    >
                      <div className="w-16 h-16 bg-slate-100 relative rounded-lg overflow-hidden shrink-0">
                        {item.gambar ? (
                          <Image
                            src={item.gambar}
                            alt={item.judul}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ImageOff className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 line-clamp-2 transition-colors">
                          {item.judul}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {item.tanggal ||
                            new Date(item.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}