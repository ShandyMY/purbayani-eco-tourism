'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Ticket,
  ImageOff,
  Navigation,
  X,
  ArrowUpRight,
  Leaf,
} from 'lucide-react';

interface WisataItem {
  id: string;
  nama: string;
  deskripsi: string | null;
  kategori: string | null;
  gambar: string | null;
  jamOperasional: string | null;
  hargaTiket: string | null;
  latitude: number | null;
  longitude: number | null;
  lokasi?: string | null;
}

export default function WisataCard({ item }: { item: WisataItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const hasCoordinates =
    item.latitude != null &&
    item.longitude != null &&
    Number.isFinite(Number(item.latitude)) &&
    Number.isFinite(Number(item.longitude));

  const mapsUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
    : null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const noPhoto = (size: string) => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-emerald-800/50">
      <ImageOff className={size} />
      <span className="text-xs font-medium">Foto belum tersedia</span>
    </div>
  );

  return (
    <>
      {/* ===== KARTU ===== */}
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Lihat detail ${item.nama}`}
          className="relative block h-48 w-full overflow-hidden bg-[#eaf0e9] text-left sm:h-52"
        >
          {item.gambar && !imageFailed ? (
            <Image
              src={item.gambar}
              alt={item.nama}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
              onError={() => setImageFailed(true)}
            />
          ) : (
            noPhoto('h-8 w-8 stroke-[1.3]')
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#061b17]/85 via-[#061b17]/10 to-transparent" />

          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            <Leaf className="h-3 w-3 text-emerald-300" />
            {item.kategori || 'Destinasi Wisata'}
          </span>

          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-emerald-300 group-hover:text-emerald-950">
            <ArrowUpRight className="h-4 w-4" />
          </span>

          <h3 className="absolute bottom-4 left-5 right-5 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
            {item.nama}
          </h3>
        </button>

        <div className="flex flex-1 flex-col p-5">
          {item.lokasi && (
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
              <span className="line-clamp-1">{item.lokasi}</span>
            </div>
          )}

          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {item.deskripsi?.trim() || 'Informasi destinasi ini akan segera diperbarui.'}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {item.jamOperasional ? (
              <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-emerald-950/10 bg-[#f7f8f4] p-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400">Jam operasional</p>
                  <p className="mt-0.5 break-words text-xs font-semibold text-[#183b32]">{item.jamOperasional}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-emerald-950/15 p-3">
                <p className="text-[10px] text-slate-400">Jam operasional</p>
                <p className="mt-0.5 text-xs text-slate-500">Belum tersedia</p>
              </div>
            )}

            {item.hargaTiket ? (
              <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-emerald-950/10 bg-[#f7f8f4] p-3">
                <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400">Harga tiket</p>
                  <p className="mt-0.5 break-words text-xs font-semibold text-[#183b32]">{item.hargaTiket}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-emerald-950/15 p-3">
                <p className="text-[10px] text-slate-400">Harga tiket</p>
                <p className="mt-0.5 text-xs text-slate-500">Belum tersedia</p>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-950/15 bg-white px-4 text-xs font-bold text-emerald-900 transition hover:bg-emerald-50"
            >
              Lihat Detail
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0b2e28] px-4 text-xs font-bold text-emerald-200 transition hover:bg-[#10574a] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
              >
                <Navigation className="h-4 w-4" />
                Petunjuk Arah
              </a>
            ) : (
              <div className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f7f8f4] px-4 text-xs font-medium text-slate-400">
                <MapPin className="h-4 w-4" />
                Koordinat belum tersedia
              </div>
            )}
          </div>
        </div>
      </article>

      {/* ===== MODAL DETAIL ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#061f1b]/75 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`wisata-title-${item.id}`}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#f7f8f4] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-52 shrink-0 overflow-hidden bg-[#eaf0e9] sm:h-64">
              {item.gambar && !imageFailed ? (
                <Image
                  src={item.gambar}
                  alt={item.nama}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              ) : (
                noPhoto('h-9 w-9')
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#061b17]/90 via-[#061b17]/20 to-transparent" />

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup detail wisata"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#061f1b]/65 text-white backdrop-blur-md transition hover:bg-[#061f1b]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-7 sm:right-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                  <Leaf className="h-3 w-3 text-emerald-300" />
                  {item.kategori || 'Destinasi Wisata'}
                </span>
                <h2 id={`wisata-title-${item.id}`} className="mt-2.5 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {item.nama}
                </h2>
                {item.lokasi && (
                  <p className="mt-1.5 flex items-center gap-2 text-xs text-white/85 sm:text-sm">
                    <MapPin className="h-4 w-4 shrink-0 text-emerald-300" />
                    {item.lokasi}
                  </p>
                )}
              </div>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7">
              <h3 className="mb-2 font-serif text-xl text-[#0f3329]">Tentang destinasi</h3>
              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">
                {item.deskripsi?.trim() || 'Belum ada deskripsi tambahan untuk destinasi ini.'}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-950/10 bg-white p-4">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Clock className="h-4 w-4" />
                    <span className="text-[11px] font-semibold">Jam operasional</span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#183b32]">{item.jamOperasional || 'Belum tersedia'}</p>
                </div>

                <div className="rounded-2xl border border-emerald-950/10 bg-white p-4">
                  <div className="flex items-center gap-2 text-amber-600">
                    <Ticket className="h-4 w-4" />
                    <span className="text-[11px] font-semibold">Harga tiket</span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#183b32]">{item.hargaTiket || 'Belum tersedia'}</p>
                </div>
              </div>

              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b2e28] px-5 text-sm font-bold text-emerald-200 transition hover:bg-[#10574a]"
                >
                  <Navigation className="h-4 w-4" />
                  Buka Lokasi di Google Maps
                </a>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-3 min-h-11 w-full rounded-full border border-emerald-950/15 px-5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
              >
                Tutup Detail
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}