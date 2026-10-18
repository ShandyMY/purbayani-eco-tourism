import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Leaf,
  MapPin,
  ShoppingBag,
  Store,
} from 'lucide-react';
import UmkmListClient from './UMKMListClient';

export const revalidate = 0;

/* Gaya disamakan dengan beranda, profil, dan wisata. */
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

type UmkmItem = {
  id: number | string;
  nama: string;
  kategori: string | null;
  deskripsi: string;
  pemilik: string | null;
  noHp: string | null;
  alamat: string | null;
  latitude: number | null;
  longitude: number | null;
  gambar: string | null;
};

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

export default async function UmkmPublicPage() {
  let dataUmkm: UmkmItem[] = [];
  let databaseAvailable = true;

  try {
    const umkmModel = (prisma as any).umkm || (prisma as any).uMKM;

    if (!umkmModel?.findMany) {
      throw new Error('Model UMKM tidak ditemukan.');
    }

    const rawData = await umkmModel.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nama: true,
        kategori: true,
        deskripsi: true,
        kontak: true,
        latitude: true,
        longitude: true,
        gambar: true,
      },
    });

    dataUmkm = rawData.map((item: any) => ({
      id: item.id,
      nama: item.nama ?? 'Usaha UMKM',
      kategori: item.kategori ?? null,
      deskripsi: item.deskripsi ?? '',
      pemilik: item.pemilik ?? null,
      noHp: item.kontak ?? item.noHp ?? null,
      alamat: item.alamat ?? null,
      latitude: item.latitude != null ? Number(item.latitude) : null,
      longitude: item.longitude != null ? Number(item.longitude) : null,
      gambar: item.gambar ?? null,
    }));
  } catch (error) {
    databaseAvailable = false;
    console.error('Gagal mengambil data UMKM:', error);
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f8f4] text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-[#061f1b] text-white sm:min-h-[580px] lg:min-h-[640px]">
        <Image
          src="/assets/images/umkm-cover.jpg"
          alt="Usaha lokal Desa Purbayani"
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
                <Store className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">Produk lokal dan cerita warga</span>
              </div>

              <h1 className="fadeup text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[clamp(2.5rem,4.2vw,4.5rem)] 2xl:text-[5rem]" style={{ ['--d' as string]: '.2s' }}>
                Dari Purbayani,
                <span className={`mt-1 block bg-gradient-to-r from-emerald-200 via-white to-amber-200 bg-clip-text pb-[0.08em] text-transparent ${serifAccent}`}>
                  untuk Indonesia.
                </span>
              </h1>

              <p className="fadeup mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base" style={{ ['--d' as string]: '.4s' }}>
                Temukan produk unggulan, cita rasa lokal, dan karya warga Desa Purbayani. Setiap pilihanmu ikut mendukung pertumbuhan ekonomi masyarakat desa.
              </p>

              <div className="fadeup mt-7 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '.55s' }}>
                <a href="#katalog" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-7 text-sm font-bold text-[#103c31] shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                  Jelajahi Katalog
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>

            <div className="fadeup hidden lg:block" style={{ ['--d' as string]: '.7s' }}>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Direktori usaha lokal</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="font-serif text-5xl leading-none">{dataUmkm.length}</span>
                  <span className="pb-1 text-sm text-emerald-200">usaha terdaftar</span>
                </div>
                <div className="my-5 h-px bg-white/15" />
                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"><Leaf className="h-4 w-4 text-emerald-300" /></span>
                    <div>
                      <p className="font-semibold">Dukung produk lokal</p>
                      <p className="mt-0.5 text-xs leading-5 text-white/70">Kenali potensi dan usaha masyarakat desa.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"><MapPin className="h-4 w-4 text-emerald-300" /></span>
                    <div>
                      <p className="font-semibold">Jelajahi Purbayani</p>
                      <p className="mt-0.5 text-xs leading-5 text-white/70">Temukan usaha dan produk khas masyarakat setempat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Wave fill="#10574a" className="opacity-50" anim="drift-slow" />
        <Wave fill="#eaf0e9" anim="drift" />
      </section>

      {/* ================= KATALOG ================= */}
      <section id="katalog" className={`scroll-mt-8 bg-[#eaf0e9] ${sectionPad}`}>
        <div className={wrap}>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className={`${eyebrow} text-emerald-800`}>Katalog UMKM</p>
              <h2 className={h2}>
                Kenali produk,
                <span className={`block text-emerald-800 ${serifAccent}`}>dukung potensi desa.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Lihat berbagai usaha yang tumbuh dari kreativitas dan potensi masyarakat Purbayani.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-emerald-950/10 bg-white px-5 py-3.5 shadow-sm md:self-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <ShoppingBag className="h-5 w-5 text-emerald-800" />
              </div>
              <div>
                <p className="font-serif text-3xl leading-none text-[#0f3329]">{dataUmkm.length}</p>
                <p className="mt-1 text-xs text-slate-500">Total usaha</p>
              </div>
            </div>
          </div>

          {!databaseAvailable && (
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
              <p className="font-bold">Data katalog belum tersedia.</p>
              <p className="mt-1">
                Tampilan halaman tetap aktif, tetapi data UMKM belum berhasil dimuat dari database. Periksa koneksi database saat ingin menampilkan data sebenarnya.
              </p>
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-emerald-950/10 bg-[#f7f8f4] p-3 shadow-sm sm:p-5">
            <UmkmListClient initialData={dataUmkm} />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={sectionPad}>
        <div className={`${wrap} relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2e28] to-[#10574a] px-7 py-12 text-white sm:px-12 md:px-14 md:py-14`}>
          <div aria-hidden className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -right-2 -top-10 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className={`${eyebrow} text-emerald-300`}>Bersama membangun desa</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Potensi lokal,
                <span className={`block text-emerald-200 ${serifAccent}`}>dampak yang nyata.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                Jelajahi destinasi wisata Purbayani dan temukan keistimewaan desa dari sisi alam, budaya, hingga ekonomi masyarakatnya.
              </p>
            </div>

            <Link href="/wisata" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 self-start rounded-full bg-emerald-300 px-8 text-sm font-bold text-emerald-950 shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white md:self-center">
              Jelajahi Wisata
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
          <p className="text-xs">Mengenal potensi desa, mendukung usaha masyarakat.</p>
        </div>
      </footer>
    </main>
  );
}