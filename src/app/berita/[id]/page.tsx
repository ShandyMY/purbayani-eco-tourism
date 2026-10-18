import { prisma } from '@/lib/prisma';
import {
  Calendar,
  ImageOff,
  ArrowLeft,
  Newspaper,
  Tag,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface DetailBeritaPageProps {
  params: Promise<{
    id: string;
  }>;
}

const css = `
@keyframes fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes drift{to{transform:translateX(-50%)}}
.fadeup{animation:fadeup .9s ease-out both;animation-delay:var(--d,0s)}
.drift{animation:drift 22s linear infinite}
.drift-slow{animation:drift 38s linear infinite reverse}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important}}
`;

const serifAccent = 'font-serif font-normal italic';
const eyebrow = 'text-[11px] font-semibold uppercase tracking-[0.22em]';

function formatTanggal(tanggal: Date | string) {
  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) {
    return 'Tanggal tidak tersedia';
  }

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function Wave({ fill, className, anim }: { fill: string; className?: string; anim: string }) {
  const d = 'M0 60 C 180 10 360 110 540 60 S 900 10 1080 60 S 1260 100 1440 60 V120 H0 Z';
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 h-[60px] overflow-hidden ${className ?? ''}`}>
      <div className={`flex h-full w-[200%] ${anim}`}>
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={d} fill={fill} />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default async function DetailBeritaPage({ params }: DetailBeritaPageProps) {
  const { id } = await params;

  let berita = null;
  let beritaLainnya: (NonNullable<typeof berita> & {
    id: string;
    judul: string;
    gambar: string | null;
    createdAt: Date;
    tanggal: string | null;
    kategori: string | null;
  })[] = [];

  try {
    berita = await prisma.berita.findUnique({
      where: { id },
    });

    if (berita) {
      beritaLainnya = await prisma.berita.findMany({
        where: {
          id: { not: id },
        },
        take: 3,
        orderBy: { createdAt: 'desc' },
      });
    }
  } catch (error) {
    console.error('Gagal mengambil detail berita:', error);
  }

  if (!berita) {
    notFound();
  }

  const tanggalBerita = berita.tanggal || formatTanggal(berita.createdAt);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f8f4] text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ARTIKEL ================= */}
      <section className="relative isolate overflow-hidden bg-[#061f1b] px-6 pb-28 pt-28 text-white sm:px-10 md:pb-32 md:pt-32 lg:px-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(52,211,153,0.2),transparent_40%),radial-gradient(ellipse_at_0%_100%,rgba(217,171,94,0.12),transparent_40%)]" />
        <div aria-hidden className="absolute -right-24 -top-28 -z-10 h-[380px] w-[380px] rounded-full border border-white/10" />
        <div aria-hidden className="absolute -right-4 -top-8 -z-10 h-[240px] w-[240px] rounded-full border border-white/10" />

        <div className="mx-auto max-w-[1000px]">
          <Link
            href="/berita"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Semua Berita
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="fadeup mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-md">
                <Tag className="h-3 w-3" />
                {berita.kategori || 'Pengumuman'}
              </span>

              <span className="inline-flex items-center gap-2 text-sm text-white/75">
                <Calendar className="h-4 w-4 text-emerald-300" />
                {tanggalBerita}
              </span>
            </div>

            <h1 className="fadeup text-3xl font-semibold leading-[1.15] tracking-[-0.025em] sm:text-4xl lg:text-5xl" style={{ ['--d' as string]: '.15s' }}>
              {berita.judul}
            </h1>

            {berita.ringkasan && (
              <p className="fadeup mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8" style={{ ['--d' as string]: '.3s' }}>
                {berita.ringkasan}
              </p>
            )}

            <div className="fadeup mt-7 flex items-center gap-3 border-t border-white/15 pt-5" style={{ ['--d' as string]: '.45s' }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Newspaper className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">Pemerintah Desa Purbayani</p>
                <p className="mt-0.5 text-xs text-white/60">Informasi dan kabar terkini desa</p>
              </div>
            </div>
          </div>
        </div>

        <Wave fill="#10574a" className="opacity-50" anim="drift-slow" />
        <Wave fill="#f7f8f4" anim="drift" />
      </section>

      {/* ================= KONTEN ================= */}
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <article className="min-w-0 overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm lg:col-span-8">
            {/* Gambar utama */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#eaf0e9]">
              {berita.gambar ? (
                <Image
                  src={berita.gambar}
                  alt={berita.judul}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-emerald-900/40">
                  <ImageOff className="h-10 w-10" />
                  <span className="text-sm font-medium">Gambar belum tersedia</span>
                </div>
              )}
            </div>

            <div className="p-6 md:p-9">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-950/10 pb-4">
                <div className={`flex items-center gap-2 text-emerald-800 ${eyebrow}`}>
                  <BookOpen className="h-4 w-4" />
                  Artikel desa
                </div>
                <span className="text-xs text-slate-500">{tanggalBerita}</span>
              </div>

              {berita.ringkasan && (
                <div className="mb-7 rounded-r-2xl border-l-4 border-emerald-500 bg-emerald-50/70 px-5 py-4">
                  <p className="font-serif text-lg leading-8 text-[#0f3329] sm:text-xl sm:leading-9">
                    {berita.ringkasan}
                  </p>
                </div>
              )}

              <div className="max-w-prose whitespace-pre-line break-words text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-9">
                {berita.isi || 'Isi berita belum tersedia.'}
              </div>

              <div className="mt-9 border-t border-emerald-950/10 pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className={`text-slate-400 ${eyebrow}`}>Diterbitkan oleh</p>
                    <p className="mt-1.5 font-semibold text-[#0f3329]">Pemerintah Desa Purbayani</p>
                  </div>

                  <Link
                    href="/berita"
                    className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#0b2e28] px-6 text-sm font-bold text-emerald-200 transition hover:bg-[#10574a]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Berita lainnya
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* ===== Sidebar ===== */}
          <aside className="space-y-5 lg:col-span-4 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-emerald-950/10 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className={`text-emerald-800 ${eyebrow}`}>Tetap terhubung</p>
                  <h2 className="mt-2 font-serif text-2xl leading-tight text-[#0f3329]">Kabar desa lainnya</h2>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Newspaper className="h-5 w-5" />
                </div>
              </div>

              <div className="mb-5 h-px bg-emerald-950/10" />

              {beritaLainnya.length === 0 ? (
                <div className="rounded-2xl bg-[#f7f8f4] px-4 py-6 text-center">
                  <Newspaper className="mx-auto h-7 w-7 text-emerald-900/30" />
                  <p className="mt-3 text-sm text-slate-500">Belum ada berita lainnya.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {beritaLainnya.map((item) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.id}`}
                      className="group flex gap-3.5 rounded-2xl p-1.5 transition hover:bg-[#f7f8f4]"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#eaf0e9]">
                        {item.gambar ? (
                          <Image
                            src={item.gambar}
                            alt={item.judul}
                            fill
                            sizes="80px"
                            className="object-cover transition duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-emerald-900/30">
                            <ImageOff className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 py-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                          {item.kategori || 'Berita'}
                        </span>
                        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[#0f3329] transition group-hover:text-emerald-700">
                          {item.judul}
                        </h3>
                        <p className="mt-1.5 text-[11px] text-slate-500">
                          {item.tanggal || formatTanggal(item.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/berita"
                className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-950/15 px-4 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
              >
                Lihat semua berita
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Kartu promosi wisata */}
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2e28] to-[#10574a] p-6 text-white md:p-7">
              <div aria-hidden className="absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full border border-white/10" />
              <div aria-hidden className="absolute -right-5 -top-5 -z-10 h-24 w-24 rounded-full border border-white/10" />

              <p className={`text-emerald-300 ${eyebrow}`}>Jelajahi Purbayani</p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">
                Temukan pesona alam
                <span className={`block text-emerald-200 ${serifAccent}`}>dan kehidupan desa.</span>
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/75">
                Kenali destinasi wisata dan potensi lokal yang membuat Purbayani istimewa.
              </p>

              <Link
                href="/wisata"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-300 px-6 text-sm font-bold text-emerald-950 transition hover:bg-white"
              >
                Jelajahi wisata
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}