import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Clock, Ticket, Navigation } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import PanoramaViewer from '@/components/VirtualTour/PanoramaViewer';

interface WisataDetailPageProps {
  params: Promise<{ id: string }>;
}

const css = `
@keyframes drift{to{transform:translateX(-50%)}}
@keyframes fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.drift{animation:drift 22s linear infinite}
.drift-slow{animation:drift 38s linear infinite reverse}
.fadeup{animation:fadeup .9s ease-out both;animation-delay:var(--d,0s)}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important}}
`;

const wrap = 'mx-auto w-full max-w-[1000px]';
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

export default async function WisataDetailPage({ params }: WisataDetailPageProps) {
  const { id } = await params;

  const wisataModel = (prisma as any).wisata || (prisma as any).Wisata;
  const wisata = await wisataModel.findUnique({
    where: { id },
  });

  if (!wisata) {
    notFound();
  }

  const googleMapsUrl =
    wisata.latitude && wisata.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${wisata.latitude},${wisata.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wisata.nama)}`;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f8f4] pb-0 text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[360px] items-end overflow-hidden bg-[#061f1b] text-white md:min-h-[440px]">
        <Image
          src={wisata.gambar || '/assets/images/wisata-cover.jpg'}
          alt={wisata.nama}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#061f1b]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061f1b] via-[#061f1b]/40 to-[#061f1b]/30" />

        <div className="absolute left-6 top-24 z-10 sm:left-10 lg:left-16">
          <Link
            href="/wisata"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali
          </Link>
        </div>

        <div className="relative z-10 w-full px-6 pb-20 pt-44 sm:px-10 lg:px-16">
          <div className={wrap}>
            {wisata.kategori && (
              <span className="fadeup inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-md">
                {wisata.kategori}
              </span>
            )}
            <h1 className="fadeup mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-5xl" style={{ ['--d' as string]: '.15s' }}>
              {wisata.nama}
            </h1>
            {wisata.lokasi && (
              <p className="fadeup mt-3 flex items-center gap-2 text-sm text-white/80" style={{ ['--d' as string]: '.3s' }}>
                <MapPin className="h-4 w-4 shrink-0 text-emerald-300" />
                <span>{wisata.lokasi}</span>
              </p>
            )}
          </div>
        </div>

        <Wave fill="#10574a" className="opacity-50" anim="drift-slow" />
        <Wave fill="#f7f8f4" anim="drift" />
      </section>

      {/* ================= KONTEN ================= */}
      <div className="px-6 pb-20 pt-4 sm:px-10 lg:px-16">
        <div className={`${wrap} space-y-6`}>
          {/* Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-3xl border border-emerald-950/10 bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400">Harga tiket</p>
                <p className="text-sm font-semibold text-[#183b32]">{wisata.hargaTiket || 'Gratis / Sesuai Ketentuan'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-emerald-950/10 bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400">Jam operasional</p>
                <p className="text-sm font-semibold text-[#183b32]">{wisata.jamOperasional || 'Setiap Hari'}</p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-3xl bg-[#0b2e28] p-4 text-white shadow-sm transition hover:bg-[#10574a]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-3 text-emerald-300">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-emerald-200">Petunjuk arah</p>
                  <p className="text-sm font-semibold">Buka Google Maps</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-emerald-300 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Deskripsi */}
          <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-2xl text-[#0f3329] sm:text-3xl">Tentang destinasi</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {wisata.deskripsi}
            </p>
          </div>
        </div>
      </div>

      {/* ================= VIRTUAL TOUR ================= */}
      <section className="relative overflow-hidden bg-[#082520] px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-20">
        <div aria-hidden className="absolute -left-32 top-0 h-[360px] w-[360px] rounded-full bg-emerald-500/20 blur-[110px]" />
        <div className={`${wrap} relative`}>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Jelajahi lokasi
            <span className={`block text-emerald-200 ${serifAccent}`}>lewat virtual tour 360°.</span>
          </h2>

          <div className="mt-8 rounded-3xl border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.03] p-2 shadow-[0_0_90px_-30px_rgba(52,211,153,.5)] sm:p-2.5">
            <div className="overflow-hidden rounded-2xl">
              <PanoramaViewer
                imageSrc={wisata.virtualTourUrl || '/panorama/pantai-360.jpg'}
                title={wisata.nama}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}