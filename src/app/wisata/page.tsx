import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Compass,
  MapPin,
  Waves,
  Leaf,
  Sparkles,
  Trees,
  Mountain,
} from 'lucide-react';
import WisataListClient from './WisataListClient';

export const revalidate = 0;

/* Gaya disamakan dengan beranda dan profil. */
const css = `
@keyframes fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes drift{to{transform:translateX(-50%)}}
.fadeup{animation:fadeup .9s ease-out both;animation-delay:var(--d,0s)}
.drift{animation:drift 22s linear infinite}
.drift-slow{animation:drift 38s linear infinite reverse}
.no-scrollbar{scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important}}
`;

const wrap = 'mx-auto w-full max-w-[1200px] 2xl:max-w-[1360px]';
const h2 = 'text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl';
const eyebrow = 'mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]';
const sectionPad = 'px-6 py-20 sm:px-10 lg:px-16 lg:py-28';
const serifAccent = 'font-serif font-normal italic';

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

export default async function WisataPublicPage() {
  let dataWisata: Awaited<ReturnType<typeof prisma.wisata.findMany>> = [];

  try {
    dataWisata = await prisma.wisata.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nama: true,
        kategori: true,
        deskripsi: true,
        lokasi: true,
        jamOperasional: true,
        hargaTiket: true,
        latitude: true,
        longitude: true,
        gambar: true,
      },
    });
  } catch (error) {
    console.error('Gagal mengambil data direktori wisata:', error);
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f8f4] text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-[#061f1b] text-white sm:min-h-[580px] lg:min-h-[640px]">
        <Image
          src="/assets/images/wisata-cover.jpg"
          alt="Destinasi wisata Desa Purbayani"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#061f1b]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f1b]/90 via-[#061f1b]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061f1b]/80 via-transparent to-[#061f1b]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-28 pt-32 sm:px-10 lg:px-16 2xl:max-w-[1440px]">
          <div className="max-w-3xl">
            <div className="fadeup mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md" style={{ ['--d' as string]: '.1s' }}>
              <Compass className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">Explore Purbayani</span>
            </div>

            <h1 className="fadeup text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[clamp(2.5rem,4.2vw,4.5rem)] 2xl:text-[5rem]" style={{ ['--d' as string]: '.2s' }}>
              Jelajahi pesona
              <span className={`mt-1 block bg-gradient-to-r from-emerald-200 via-white to-amber-200 bg-clip-text pb-[0.08em] text-transparent ${serifAccent}`}>
                alam Purbayani.
              </span>
            </h1>

            <p className="fadeup mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base" style={{ ['--d' as string]: '.4s' }}>
              Temukan destinasi alam, panorama pesisir, dan pengalaman lokal yang menjadi bagian dari Desa Purbayani, Garut.
            </p>

            <div className="fadeup mt-7 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '.55s' }}>
              <a href="#daftar-wisata" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-7 text-sm font-bold text-[#103c31] shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                Jelajahi Destinasi
                <ArrowDown className="h-4 w-4" />
              </a>
              <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15">
                Kembali ke Beranda
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="fadeup mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-5 text-xs text-white/80 sm:text-sm" style={{ ['--d' as string]: '.7s' }}>
              <span className="inline-flex items-center gap-2"><Waves className="h-4 w-4 text-emerald-300" />Wisata Pesisir</span>
              <span className="inline-flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-300" />Ekowisata</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-300" />Desa Purbayani</span>
            </div>
          </div>
        </div>

        <Wave fill="#10574a" className="opacity-50" anim="drift-slow" />
        <Wave fill="#f7f8f4" anim="drift" />
      </section>

      {/* ================= PENGANTAR ================= */}
      <section className={sectionPad}>
        <div className={`${wrap} grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end`}>
          <div>
            <p className={`${eyebrow} text-emerald-800`}>Temukan yang berbeda</p>
            <h2 className={h2}>
              Setiap perjalanan
              <span className={`block text-emerald-800 ${serifAccent}`}>punya cerita.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            Temukan informasi destinasi wisata yang tersedia di portal Purbayani. Gunakan katalog di bawah untuk mengenal pilihan destinasi dan merencanakan perjalanan.
          </p>
        </div>

        <div className={`${wrap} mt-10 grid gap-4 sm:grid-cols-3`}>
          <div className="group rounded-3xl border border-emerald-950/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-[#0b2e28] group-hover:text-emerald-300">
              <Compass className="h-5 w-5" />
            </div>
            <p className="font-serif text-5xl leading-none text-[#0f3329]">{dataWisata.length}</p>
            <p className="mt-3 text-sm font-medium text-slate-600">Destinasi tercatat</p>
          </div>

          <div className="group rounded-3xl border border-emerald-950/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-[#0b2e28] group-hover:text-emerald-300">
              <Waves className="h-5 w-5" />
            </div>
            <p className="font-serif text-2xl leading-tight text-[#0f3329]">Pesisir &amp; Alam</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Kenali potensi lanskap dan alam desa.</p>
          </div>

          <div className="group rounded-3xl border border-emerald-950/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-[#0b2e28] group-hover:text-emerald-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="font-serif text-2xl leading-tight text-[#0f3329]">Pengalaman Lokal</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Temukan daya tarik dan cerita masyarakat.</p>
          </div>
        </div>
      </section>

      {/* ================= DIREKTORI ================= */}
      <section id="daftar-wisata" className={`scroll-mt-20 bg-[#eaf0e9] ${sectionPad}`}>
        <div className={wrap}>
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className={`${eyebrow} text-emerald-800`}>Direktori destinasi</p>
              <h2 className={h2}>
                Pilih
                <span className={`text-emerald-800 ${serifAccent}`}> perjalananmu.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-600">
              Jelajahi daftar destinasi yang tercatat dalam direktori wisata Purbayani.
            </p>
          </div>

          {dataWisata.length === 0 && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              Belum ada data destinasi yang dapat ditampilkan. Pastikan database lokal terhubung dan data wisata sudah tersedia.
            </div>
          )}

          <div className="rounded-3xl border border-emerald-950/10 bg-[#f7f8f4] p-3 shadow-sm sm:p-5">
            <WisataListClient initialData={dataWisata} />
          </div>
        </div>
      </section>

      {/* ================= PENUTUP ================= */}
      <section className={sectionPad}>
        <div className={`${wrap} relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2e28] to-[#10574a] px-7 py-12 text-white sm:px-12 md:px-14 md:py-14`}>
          <div aria-hidden className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -right-3 -top-7 h-40 w-40 rounded-full border border-white/10" />
          <Trees aria-hidden className="absolute bottom-[-30px] right-[15%] h-36 w-36 text-white/[0.05]" />
          <Mountain aria-hidden className="absolute bottom-[-24px] right-[-10px] h-44 w-44 text-white/[0.05]" />

          <div className="relative z-10 max-w-2xl">
            <p className={`${eyebrow} text-emerald-300`}>Lanjutkan menjelajah</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Kenali desa
              <span className={`block text-emerald-200 ${serifAccent}`}>lebih dekat.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              Temukan juga cerita masyarakat, usaha lokal, dan informasi mengenai Desa Purbayani.
            </p>
            <Link href="/umkm" className="group mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-emerald-300 px-7 text-sm font-bold text-emerald-950 shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
              Jelajahi UMKM Lokal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-emerald-950/10 bg-[#f7f8f4] px-6 py-6 sm:px-10 lg:px-16">
        <div className={`${wrap} flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between`}>
          <Link href="/" className="font-bold tracking-wide text-emerald-950">
            PURBAYANI <span className="font-normal text-emerald-800">ECO TOURISM</span>
          </Link>
          <p className="text-xs">© {new Date().getFullYear()} Desa Purbayani</p>
        </div>
      </footer>
    </main>
  );
}