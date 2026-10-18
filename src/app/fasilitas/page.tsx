import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Clock3,
  Leaf,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import FasilitasListClient from './FasilitasListClient';

export const revalidate = 0;

/* Gaya disamakan dengan beranda, profil, wisata, UMKM, dan berita. */
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

type FasilitasItem = {
  id: number | string;
  nama: string;
  kategori: string;
  deskripsi: string;
  alamat: string | null;
  kontak: string | null;
  jamOperasional: string | null;
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

export default async function FasilitasPublicPage() {
  let dataFasilitas: FasilitasItem[] = [];
  let databaseAvailable = true;

  try {
    const rawData = await prisma.fasilitas.findMany({
      orderBy: { createdAt: 'desc' },
    });

    dataFasilitas = rawData.map((item: any) => ({
      id: item.id,
      nama: item.nama ?? 'Fasilitas Umum',
      kategori: item.kategori ?? 'Umum',
      deskripsi: item.deskripsi ?? '',
      alamat: item.alamat ?? null,
      kontak: item.kontak ?? null,
      jamOperasional: item.jamOperasional ?? item.jam_operasional ?? null,
      latitude: item.latitude != null ? Number(item.latitude) : null,
      longitude: item.longitude != null ? Number(item.longitude) : null,
      gambar: item.gambar ?? null,
    }));
  } catch (error) {
    databaseAvailable = false;
    console.error('Gagal mengambil data fasilitas:', error);
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f8f4] text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-[#061f1b] text-white sm:min-h-[580px] lg:min-h-[640px]">
        <Image
          src="/assets/images/fasilitas-cover.jpg"
          alt="Fasilitas umum Desa Purbayani"
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
                <Building2 className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">Sarana dan infrastruktur desa</span>
              </div>

              <h1 className="fadeup text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[clamp(2.5rem,4.2vw,4.5rem)] 2xl:text-[5rem]" style={{ ['--d' as string]: '.2s' }}>
                Fasilitas untuk
                <span className={`mt-1 block bg-gradient-to-r from-emerald-200 via-white to-amber-200 bg-clip-text pb-[0.08em] text-transparent ${serifAccent}`}>
                  kehidupan lebih baik.
                </span>
              </h1>

              <p className="fadeup mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base" style={{ ['--d' as string]: '.4s' }}>
                Kenali berbagai sarana umum yang mendukung pelayanan masyarakat, aktivitas sosial, pendidikan, kesehatan, dan kehidupan warga Desa Purbayani.
              </p>

              <div className="fadeup mt-7 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '.55s' }}>
                <a href="#katalog-fasilitas" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-7 text-sm font-bold text-[#103c31] shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                  Jelajahi Fasilitas
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>

            <div className="fadeup hidden lg:block" style={{ ['--d' as string]: '.7s' }}>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Direktori fasilitas</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="font-serif text-5xl leading-none">{dataFasilitas.length}</span>
                  <span className="pb-1 text-sm text-emerald-200">fasilitas terdata</span>
                </div>
                <div className="my-5 h-px bg-white/15" />
                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"><ShieldCheck className="h-4 w-4 text-emerald-300" /></span>
                    <div>
                      <p className="font-semibold">Sarana pendukung warga</p>
                      <p className="mt-0.5 text-xs leading-5 text-white/70">Informasi fasilitas untuk membantu kebutuhan masyarakat.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"><MapPin className="h-4 w-4 text-emerald-300" /></span>
                    <div>
                      <p className="font-semibold">Informasi lokasi</p>
                      <p className="mt-0.5 text-xs leading-5 text-white/70">Temukan alamat dan detail fasilitas jika tersedia.</p>
                    </div>
                  </div>
                </div>
              </div>
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
            <p className={`${eyebrow} text-emerald-800`}>Kenali sarana desa</p>
            <h2 className={h2}>
              Sarana yang mendukung
              <span className={`block text-emerald-800 ${serifAccent}`}>aktivitas masyarakat.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            Gunakan direktori di bawah untuk melihat informasi fasilitas yang telah tercatat, termasuk kategori, alamat, kontak, dan jam operasional jika tersedia.
          </p>
        </div>

        <div className={`${wrap} mt-10 grid gap-4 sm:grid-cols-3`}>
          {[
            { icon: Building2, title: 'Informasi fasilitas', text: 'Detail sarana dalam satu direktori.' },
            { icon: MapPin, title: 'Alamat dan lokasi', text: 'Lokasi ditampilkan jika datanya tersedia.' },
            { icon: Clock3, title: 'Jam operasional', text: 'Jadwal layanan jika telah dicatat.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-3xl border border-emerald-950/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-[#0b2e28] group-hover:text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-serif text-2xl leading-tight text-[#0f3329]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DIREKTORI ================= */}
      <section id="katalog-fasilitas" className={`scroll-mt-8 bg-[#eaf0e9] ${sectionPad}`}>
        <div className={wrap}>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className={`${eyebrow} text-emerald-800`}>Direktori publik</p>
              <h2 className={h2}>
                Daftar
                <span className={`text-emerald-800 ${serifAccent}`}> fasilitas umum.</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Building2 className="h-4 w-4 text-emerald-800" />
              {dataFasilitas.length} fasilitas
            </div>
          </div>

          {!databaseAvailable && (
            <div className="mb-7 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
              <p className="font-bold">Data fasilitas belum berhasil dimuat.</p>
              <p className="mt-1">
                Tampilan halaman tetap tersedia, tetapi koneksi database perlu diperiksa agar data fasilitas yang sebenarnya dapat ditampilkan.
              </p>
            </div>
          )}

          <div className="rounded-3xl border border-emerald-950/10 bg-[#f7f8f4] p-3 shadow-sm sm:p-5">
            <FasilitasListClient initialData={dataFasilitas} />
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
              <p className={`${eyebrow} text-emerald-300`}>Jelajahi Purbayani</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Kenali fasilitasnya,
                <span className={`block text-emerald-200 ${serifAccent}`}>jelajahi potensinya.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                Temukan destinasi wisata dan usaha lokal yang turut membentuk potensi Desa Purbayani.
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
          <p className="text-xs">Sarana desa untuk masyarakat yang lebih berdaya.</p>
        </div>
      </footer>
    </main>
  );
}