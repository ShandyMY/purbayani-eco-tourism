'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Clock,
  Ticket,
  Navigation,
  X,
  MapPin,
  Info,
  Leaf,
  ArrowUpRight,
} from 'lucide-react';

interface WisataItem {
  id: string;
  nama: string;
  kategori?: string | null;
  deskripsi: string;
  lokasi?: string | null;
  jamOperasional?: string | null;
  hargaTiket?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  gambar?: string | null;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=85';

export default function WisataListClient({
  initialData,
}: {
  initialData: WisataItem[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedWisata, setSelectedWisata] = useState<WisataItem | null>(null);

  const categories = useMemo(() => {
    const list = Array.from(
      new Set(initialData.map((item) => item.kategori || 'Lainnya'))
    );
    return ['Semua', ...list];
  }, [initialData]);

  const filteredData = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return initialData.filter((item) => {
      const matchSearch = [item.nama, item.deskripsi, item.lokasi, item.kategori].some(
        (value) => value?.toLowerCase().includes(keyword)
      );

      const matchCategory =
        selectedCategory === 'Semua' ||
        (item.kategori || 'Lainnya') === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [initialData, searchQuery, selectedCategory]);

  useEffect(() => {
    if (!selectedWisata) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedWisata(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedWisata]);

  const hasCoordinates = (item: WisataItem) =>
    item.latitude != null &&
    item.longitude != null &&
    Number.isFinite(Number(item.latitude)) &&
    Number.isFinite(Number(item.longitude));

  const getMapsUrl = (item: WisataItem) =>
    `https://www.google.com/maps?q=${item.latitude},${item.longitude}`;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
  };

  const onImgError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.src !== FALLBACK_IMAGE) image.src = FALLBACK_IMAGE;
  };

  return (
    <div className="space-y-6">
      {/* ===== PENCARIAN DAN FILTER ===== */}
      <section className="rounded-3xl border border-emerald-950/10 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="w-full md:max-w-xl">
            <label htmlFor="wisata-search" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Temukan destinasi
            </label>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-800/70" />
              <input
                id="wisata-search"
                type="search"
                placeholder="Cari wisata, aktivitas, atau lokasi..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full border border-emerald-950/10 bg-[#f7f8f4] py-3 pl-11 pr-11 text-sm text-[#183b32] outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Hapus pencarian"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-3xl leading-none text-[#0f3329]">
                {filteredData.length}
                <span className="ml-1 font-sans text-sm font-medium text-slate-400">/ {initialData.length}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">Destinasi ditemukan</p>
            </div>
          </div>
        </div>

        <div className="my-5 border-t border-emerald-950/10" />

        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">Kategori</p>
          {(searchQuery || selectedCategory !== 'Semua') && (
            <button type="button" onClick={resetFilters} className="text-xs font-bold text-emerald-800 transition hover:text-[#061f1b]">
              Reset filter
            </button>
          )}
        </div>

        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                type="button"
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition duration-200 ${
                  active
                    ? 'border-[#0b2e28] bg-[#0b2e28] text-emerald-200'
                    : 'border-emerald-950/10 bg-white text-slate-600 hover:border-emerald-600/40 hover:bg-emerald-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== KARTU DESTINASI ===== */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredData.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10"
            >
              <button
                type="button"
                onClick={() => setSelectedWisata(item)}
                aria-label={`Lihat detail ${item.nama}`}
                className="relative block h-48 w-full overflow-hidden bg-[#eaf0e9] text-left sm:h-52"
              >
                <img
                  src={item.gambar || FALLBACK_IMAGE}
                  alt={item.nama}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  onError={onImgError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061b17]/80 via-[#061b17]/10 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  {item.kategori || 'Wisata Alam'}
                </span>

                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-emerald-300 group-hover:text-emerald-950">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-[#0f3329]">
                  {item.nama}
                </h3>

                {item.lokasi && (
                  <div className="mt-2 flex items-start gap-1.5 text-xs font-medium text-slate-500">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                    <span className="line-clamp-2">{item.lokasi}</span>
                  </div>
                )}

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                  {item.deskripsi || 'Informasi lengkap destinasi ini akan segera tersedia.'}
                </p>

                {(item.jamOperasional || item.hargaTiket) && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {item.jamOperasional ? (
                      <div className="min-w-0 rounded-xl border border-emerald-950/10 bg-[#f7f8f4] p-3">
                        <Clock className="mb-1.5 h-4 w-4 text-emerald-700" />
                        <p className="text-[10px] font-semibold text-slate-400">Jam buka</p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#183b32]">{item.jamOperasional}</p>
                      </div>
                    ) : (
                      <div />
                    )}

                    {item.hargaTiket && (
                      <div className="min-w-0 rounded-xl border border-emerald-950/10 bg-[#f7f8f4] p-3">
                        <Ticket className="mb-1.5 h-4 w-4 text-amber-600" />
                        <p className="text-[10px] font-semibold text-slate-400">Harga tiket</p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#183b32]">{item.hargaTiket}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWisata(item)}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-950/15 bg-white px-4 text-xs font-bold text-emerald-900 transition hover:bg-emerald-50"
                  >
                    <Info className="h-4 w-4" />
                    Lihat detail
                  </button>

                  {hasCoordinates(item) ? (
                    <a
                      href={getMapsUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0b2e28] px-4 text-xs font-bold text-emerald-200 transition hover:bg-[#10574a] active:scale-[0.98]"
                    >
                      <Navigation className="h-4 w-4" />
                      Petunjuk arah
                    </a>
                  ) : (
                    <p className="rounded-full bg-[#f7f8f4] px-4 py-3 text-center text-xs text-slate-400">
                      Koordinat belum tersedia
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="mx-auto max-w-lg rounded-3xl border border-emerald-950/10 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="mt-5 font-serif text-2xl text-[#0f3329]">Destinasi belum ditemukan</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
            Coba kata kunci lain atau pilih kategori yang berbeda untuk menemukan destinasi wisata Purbayani.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 min-h-11 rounded-full bg-[#0b2e28] px-6 text-xs font-bold text-emerald-200 transition hover:bg-[#10574a]"
          >
            Tampilkan semua destinasi
          </button>
        </section>
      )}

      {/* ===== MODAL DETAIL ===== */}
      {selectedWisata && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#061f1b]/75 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedWisata(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="wisata-modal-title"
            className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#f7f8f4] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup detail"
              onClick={() => setSelectedWisata(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#061f1b]/65 text-white backdrop-blur-md transition hover:bg-[#061f1b]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-52 shrink-0 bg-[#eaf0e9] sm:h-64">
              <img
                src={selectedWisata.gambar || FALLBACK_IMAGE}
                alt={selectedWisata.nama}
                className="h-full w-full object-cover"
                onError={onImgError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061b17]/90 via-[#061b17]/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-7 sm:right-7">
                <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                  <Leaf className="h-3 w-3 text-emerald-300" />
                  {selectedWisata.kategori || 'Wisata Alam'}
                </span>
                <h2 id="wisata-modal-title" className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {selectedWisata.nama}
                </h2>
                {selectedWisata.lokasi && (
                  <p className="mt-1.5 flex items-center gap-2 text-xs text-white/85 sm:text-sm">
                    <MapPin className="h-4 w-4 shrink-0 text-emerald-300" />
                    {selectedWisata.lokasi}
                  </p>
                )}
              </div>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedWisata.jamOperasional && (
                  <div className="flex items-start gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4">
                    <div className="rounded-xl bg-emerald-50 p-2 text-emerald-800"><Clock className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400">Jam operasional</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#183b32]">{selectedWisata.jamOperasional}</p>
                    </div>
                  </div>
                )}

                {selectedWisata.hargaTiket && (
                  <div className="flex items-start gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4">
                    <div className="rounded-xl bg-amber-50 p-2 text-amber-600"><Ticket className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400">Harga tiket</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#183b32]">{selectedWisata.hargaTiket}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-serif text-xl text-[#0f3329]">Tentang destinasi</h3>
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {selectedWisata.deskripsi || 'Informasi lengkap mengenai destinasi ini belum tersedia.'}
                </p>
              </div>

              <div className="mt-6 border-t border-emerald-950/10 pt-5">
                {hasCoordinates(selectedWisata) ? (
                  <a
                    href={getMapsUrl(selectedWisata)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b2e28] px-5 text-sm font-bold text-emerald-200 transition hover:bg-[#10574a]"
                  >
                    <Navigation className="h-4 w-4" />
                    Buka petunjuk arah Google Maps
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <p className="rounded-2xl border border-emerald-950/10 bg-white p-4 text-center text-xs leading-5 text-slate-500">
                    Petunjuk arah belum tersedia karena koordinat destinasi belum diisi.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}