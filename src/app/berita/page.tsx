import { prisma } from '@/lib/prisma';
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  ImageOff,
  Leaf,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0;

/* Gaya disamakan dengan beranda, profil, wisata, dan UMKM. */
const css = `
@keyframes fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes drift{to{transform:translateX(-50%)}}
.fadeup{animation:fadeup .9s ease-out both;animation-delay:var(--d,0s)}
.drift{animation:drift 22s linear infinite}
.drift-slow{animation:drift 38s linear infinite reverse}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important}}
`;

const wrap = 'mx-auto w-full max-w-[1200px] 2xl:max-w-[1360px]';
const h2 = 'text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl';
const eyebrow = 'mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]';
const sectionPad = 'px-6 py-20 sm:px-10 lg:px-16 lg:py-28';
const serifAccent = 'font-serif font-normal italic';

type BeritaItem = {
  id: string;
  judul: string;
  slug: string;
  kategori: string;
  ringkasan: string;
  isi: string;
  gambar: string | null;
  tanggal: string;
};

// Validasi sumber gambar sebelum diberikan ke next/image.
function getValidImageSrc(gambar: string | null | undefined): string | null {
  if (!gambar || typeof gambar !== 'string') {
    return null;
  }

  const src = gambar.trim();

  if (!src || src.toLowerCase() === 'null' || src.toLowerCase() === 'undefined') {
    return null;
  }

  // Gambar lokal dari folder public, misalnya /images/berita.jpg.
  if (src.startsWith('/') && !src.startsWith('//')) {
    return src;
  }

  // Gambar dari URL eksternal.
  try {
    const url = new URL(src);

    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return src;
    }
  } catch {
    return null;
  }

  return null;
}

function formatDate(date: Date | string | null | undefined) {
  if (!date) {
    return 'Tanggal tidak tersedia';
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Tanggal tidak tersedia';
  }

  return parsedDate.toLocaleDateString('id-ID', {
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

function NewsImage({
  gambar,
  judul,
  sizes,
  priority = false,
}: {
  gambar: string | null | undefined;
  judul: string;
  sizes: string;
  priority?: boolean;
}) {
  const imageSrc = getValidImageSrc(gambar);

  if (!imageSrc) {
    return (
      <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-2 bg-[#eaf0e9] text-emerald-900/40">
        <ImageOff className="h-9 w-9" />
        <span className="text-xs font-medium">Gambar belum tersedia</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={judul || 'Berita Desa Purbayani'}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition duration-700 group-hover:scale-105"
    />
  );
}

export default async function BeritaPublicPage() {
  let dataBerita: BeritaItem[] = [];
  let databaseAvailable = true;

  try {
    dataBerita = await prisma.berita.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        judul: true,
        slug: true,
        kategori: true,
        ringkasan: true,
        isi: true,
        gambar: true,
        tanggal: true,
      },
    });
  } catch (error) {
    databaseAvailable = false;
    console.error('Gagal mengambil data berita:', error);
  }

  const featuredNews = dataBerita[0];
  const otherNews = dataBerita.slice(1);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f8f4] text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-[#061f1b] text-white sm:min-h-[580px] lg:min-h-[640px]">
        <Image
          src="/assets/images/berita-cover.jpg"
          alt="Kabar Desa Purbayani"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#061f1b]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f1b]/90 via-[#061f1b]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061f1b]/80 via-transparent to-[#061f1b]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-28 pt-32 sm:px-10 lg:px-16 2xl:max-w-[1440px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <div>
              <div className="fadeup mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md" style={{ ['--d' as string]: '.1s' }}>
                <Newspaper className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">Portal informasi desa</span>
              </div>

              <h1 className="fadeup text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[clamp(2.5rem,4.2vw,4.5rem)] 2xl:text-[5rem]" style={{ ['--d' as string]: '.2s' }}>
                Cerita dan kabar
                <span className={`mt-1 block bg-gradient-to-r from-emerald-200 via-white to-amber-200 bg-clip-text pb-[0.08em] text-transparent ${serifAccent}`}>
                  dari Purbayani.
                </span>
              </h1>

              <p className="fadeup mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base" style={{ ['--d' as string]: '.4s' }}>
                Ikuti informasi pembangunan, kegiatan masyarakat, pengumuman, dan berbagai cerita yang menggambarkan perkembangan Desa Purbayani.
              </p>

              <div className="fadeup mt-7 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '.55s' }}>
                <a href="#daftar-berita" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-7 text-sm font-bold text-[#103c31] shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                  Baca Kabar Desa
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>

            <div className="fadeup hidden lg:block" style={{ ['--d' as string]: '.7s' }}>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Pusat informasi</p>
                <p className="mt-3 font-serif text-5xl leading-none">{dataBerita.length.toString().padStart(2, '0')}</p>
                <p className="mt-2 text-sm text-white/70">Artikel dan informasi tersimpan</p>
                <div className="my-5 h-px bg-white/15" />
                <div className="flex items-start gap-3 text-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"><Sparkles className="h-4 w-4 text-emerald-300" /></span>
                  <div>
                    <p className="font-semibold">Satu sumber informasi</p>
                    <p className="mt-0.5 text-xs leading-5 text-white/70">Ikuti perkembangan dan aktivitas desa dalam satu portal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Wave fill="#10574a" className="opacity-50" anim="drift-slow" />
        <Wave fill="#f7f8f4" anim="drift" />
      </section>

      {/* ================= KONTEN BERITA ================= */}
      <section id="daftar-berita" className={`scroll-mt-8 ${sectionPad}`}>
        <div className={wrap}>
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className={`${eyebrow} text-emerald-800`}>Kabar dan informasi</p>
              <h2 className={h2}>
                Berita terbaru
                <span className={`block text-emerald-800 ${serifAccent}`}>dari desa kita.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Temukan artikel, kegiatan, dan informasi yang mendokumentasikan perkembangan Desa Purbayani.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-emerald-950/10 bg-white px-5 py-3.5 shadow-sm md:self-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <Calendar className="h-5 w-5 text-emerald-800" />
              </div>
              <div>
                <p className="font-serif text-3xl leading-none text-[#0f3329]">{dataBerita.length}</p>
                <p className="mt-1 text-xs text-slate-500">Total artikel</p>
              </div>
            </div>
          </div>

          {!databaseAvailable && (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
              <p className="font-bold">Data berita belum berhasil dimuat.</p>
              <p className="mt-1">
                Halaman tetap dapat ditampilkan, tetapi koneksi database perlu diperiksa agar artikel sebenarnya muncul.
              </p>
            </div>
          )}

          {dataBerita.length === 0 ? (
            <div className="rounded-3xl border border-emerald-950/10 bg-white px-6 py-16 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                <Newspaper className="h-7 w-7 text-emerald-800" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-[#0f3329]">Belum ada berita</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                Informasi dan pengumuman Desa Purbayani akan ditampilkan di sini setelah artikel tersedia.
              </p>
              <Link href="/" className="group mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#0b2e28] px-7 text-sm font-bold text-emerald-200 transition hover:bg-[#10574a]">
                Kembali ke Beranda
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ) : (
            <>
              {/* BERITA UTAMA */}
              {featuredNews && (
                <article className="group grid overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-emerald-950/10 md:grid-cols-12">
                  <div className="relative min-h-[260px] overflow-hidden bg-[#eaf0e9] md:col-span-7 md:min-h-[400px]">
                    <NewsImage
                      gambar={featuredNews.gambar}
                      judul={featuredNews.judul}
                      priority
                      sizes="(max-width: 768px) 100vw, 58vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061b17]/55 via-transparent to-transparent" />

                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-300 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-950">
                      <Sparkles className="h-3 w-3" />
                      Berita utama
                    </span>

                    <span className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      {featuredNews.kategori || 'Kabar Desa'}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 md:col-span-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Calendar className="h-4 w-4 text-emerald-700" />
                        {featuredNews.tanggal || formatDate((featuredNews as any).createdAt)}
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#0f3329] transition-colors group-hover:text-emerald-800 sm:text-[1.75rem]">
                        <Link href={`/berita/${featuredNews.id}`}>{featuredNews.judul}</Link>
                      </h3>

                      <p className="mt-4 line-clamp-5 text-sm leading-7 text-slate-600">
                        {featuredNews.ringkasan ||
                          featuredNews.isi ||
                          'Baca informasi selengkapnya mengenai kabar terbaru dari Desa Purbayani.'}
                      </p>
                    </div>

                    <Link
                      href={`/berita/${featuredNews.id}`}
                      className="group/link inline-flex min-h-11 items-center gap-2.5 self-start rounded-full bg-[#0b2e28] px-6 text-sm font-bold text-emerald-200 transition hover:bg-[#10574a]"
                    >
                      Baca Artikel
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              )}

              {/* BERITA LAINNYA */}
              {otherNews.length > 0 && (
                <div className="mt-14">
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <h3 className="font-serif text-2xl text-[#0f3329] sm:text-3xl">Berita lainnya</h3>
                    <span className="rounded-full border border-emerald-950/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-500">
                      {otherNews.length} artikel
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {otherNews.map((item) => (
                      <article
                        key={item.id}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10"
                      >
                        <Link
                          href={`/berita/${item.id}`}
                          className="relative block h-48 overflow-hidden bg-[#eaf0e9] sm:h-52"
                        >
                          <NewsImage
                            gambar={item.gambar}
                            judul={item.judul}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061b17]/50 to-transparent" />

                          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                            {item.kategori || 'Pengumuman'}
                          </span>
                        </Link>

                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="h-3.5 w-3.5 text-emerald-700" />
                            {item.tanggal || formatDate((item as any).createdAt)}
                          </div>

                          <h4 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-[#0f3329] transition-colors group-hover:text-emerald-800">
                            <Link href={`/berita/${item.id}`}>{item.judul}</Link>
                          </h4>

                          <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-600">
                            {item.ringkasan || item.isi || 'Baca informasi selengkapnya dari Desa Purbayani.'}
                          </p>

                          <div className="mt-auto border-t border-emerald-950/10 pt-4">
                            <Link
                              href={`/berita/${item.id}`}
                              className="inline-flex w-full items-center justify-between text-sm font-bold text-emerald-800 transition hover:text-emerald-600"
                            >
                              Baca selengkapnya
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className={`${wrap} relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2e28] to-[#10574a] px-7 py-12 text-white sm:px-12 md:px-14 md:py-14`}>
          <div aria-hidden className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -right-2 -top-10 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className={`${eyebrow} text-emerald-300`}>Lebih dekat dengan Purbayani</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Bukan sekadar kabar,
                <span className={`block text-emerald-200 ${serifAccent}`}>tetapi cerita sebuah desa.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                Kenali desa melalui informasi, destinasi wisata, dan potensi usaha masyarakatnya.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/wisata" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-8 text-sm font-bold text-emerald-950 shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                Jelajahi Wisata
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/umkm" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10">
                Lihat UMKM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-emerald-950/10 bg-[#f7f8f4] px-6 py-6 sm:px-10 lg:px-16">
        <div className={`${wrap} flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between`}>
          <Link href="/" className="flex items-center gap-2 font-bold tracking-wide text-emerald-950">
            <Leaf className="h-4 w-4 text-emerald-800" />
            PURBAYANI <span className="font-normal text-emerald-800">ECO TOURISM</span>
          </Link>
          <p className="text-xs">Informasi desa, inspirasi masyarakat, masa depan berkelanjutan.</p>
        </div>
      </footer>
    </main>
  );
}