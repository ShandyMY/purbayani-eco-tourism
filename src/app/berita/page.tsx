import { prisma } from '@/lib/prisma';
import { Calendar, ImageOff, ArrowRight, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0;

export default async function BeritaPublicPage() {
  // Query tanpa filter 'dipublikasikan' agar sesuai dengan schema Prisma
  const dataBerita = await prisma.berita.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const featuredNews = dataBerita[0];
  const otherNews = dataBerita.slice(1);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" /> Portal Kabar Desa
          </div>
          <h1 className="text-3xl md:text-5xl font-black">Berita & <span className="text-emerald-400">Pengumuman</span></h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Informasi resmi pembangunan, agenda kegiatan warga, dan kabar terkini dari Pemerintah Desa Purbayani.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20 space-y-10">
        {dataBerita.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-semibold text-sm">Belum ada berita dipublikasikan.</p>
            <p className="text-slate-400 text-xs mt-1">Kabar dan pengumuman desa akan muncul di sini.</p>
          </div>
        ) : (
          <>
            {/* Featured Article (Berita Utama) */}
            {featuredNews && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-0">
                <div className="md:col-span-7 h-64 md:h-full min-h-[280px] bg-slate-100 relative overflow-hidden">
                  {featuredNews.gambar ? (
                    <Image
                      src={featuredNews.gambar}
                      alt={featuredNews.judul}
                      fill
                      priority
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 text-xs gap-2">
                      <ImageOff className="w-8 h-8" />
                      <span>Tanpa Gambar</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    Kabar Terbaru
                  </span>
                </div>
                <div className="md:col-span-5 p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {featuredNews.tanggal || new Date(featuredNews.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 hover:text-emerald-600 transition-colors leading-snug">
                      <Link href={`/berita/${featuredNews.id}`}>{featuredNews.judul}</Link>
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 line-clamp-4 leading-relaxed">
                      {featuredNews.ringkasan || featuredNews.isi}
                    </p>
                  </div>
                  <Link
                    href={`/berita/${featuredNews.id}`}
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-bold text-xs transition"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Other News Grid */}
            {otherNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherNews.map((item) => (
                  <article key={item.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                        {item.gambar ? (
                          <Image
                            src={item.gambar}
                            alt={item.judul}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 text-xs">
                            <ImageOff className="w-6 h-6 mb-1" />
                            <span>Tanpa Gambar</span>
                          </div>
                        )}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {item.kategori || 'Pengumuman'}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{item.tanggal || new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <h2 className="font-bold text-slate-900 text-base line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          <Link href={`/berita/${item.id}`}>{item.judul}</Link>
                        </h2>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {item.ringkasan || item.isi}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                      <Link
                        href={`/berita/${item.id}`}
                        className="w-full text-emerald-600 hover:text-emerald-800 font-bold text-xs py-1 flex items-center justify-between transition"
                      >
                        <span>Baca Artikel</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}