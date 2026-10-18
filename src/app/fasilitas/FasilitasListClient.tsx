'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Navigation,
  Building2,
  X,
  MapPin,
  Clock,
  Phone,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import Image from 'next/image';

interface FasilitasItem {
  id: string;
  nama: string;
  kategori?: string | null;
  deskripsi: string;
  alamat?: string | null;
  kontak?: string | null;
  jamOperasional?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  gambar?: string | null;
}

/**
 * Memvalidasi URL gambar sebelum digunakan oleh next/image.
 * Mendukung URL HTTP/HTTPS dan path gambar lokal dari folder public.
 */
function getValidImageSrc(gambar: string | null | undefined): string | null {
  if (!gambar || typeof gambar !== 'string') {
    return null;
  }

  const src = gambar.trim();

  if (!src || src.toLowerCase() === 'null' || src.toLowerCase() === 'undefined') {
    return null;
  }

  // Path lokal, misalnya /images/puskesmas.jpg
  if (src.startsWith('/') && !src.startsWith('//')) {
    return src;
  }

  // URL internet harus valid dan menggunakan HTTP atau HTTPS.
  try {
    const url = new URL(src);

    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return src;
    }
  } catch {
    // Abaikan URL yang tidak valid.
  }

  return null;
}

const mapsUrl = (item: FasilitasItem) =>
  `https://maps.google.com/?q=${item.latitude},${item.longitude}`;

function ImageFallback({ modal = false }: { modal?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#eaf0e9] text-emerald-900/40">
      <Building2 className={`${modal ? 'h-10 w-10' : 'h-8 w-8'} stroke-[1.3]`} />
      <span className="text-xs font-medium">
        {modal ? 'Foto fasilitas' : 'Gambar tidak tersedia'}
      </span>
    </div>
  );
}

export default function FasilitasListClient({
  initialData,
}: {
  initialData: FasilitasItem[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedFasilitas, setSelectedFasilitas] = useState<FasilitasItem | null>(null);

  // Kategori unik dari database.
  const categories = useMemo(() => {
    const list = Array.from(new Set(initialData.map((item) => item.kategori || 'Umum')));
    return ['Semua', ...list];
  }, [initialData]);

  // Filter kategori dan pencarian.
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return initialData.filter((item) => {
      const matchSearch =
        (item.nama || '').toLowerCase().includes(query) ||
        (item.deskripsi || '').toLowerCase().includes(query) ||
        (item.alamat || '').toLowerCase().includes(query) ||
        (item.kategori || '').toLowerCase().includes(query);

      const matchCategory =
        selectedCategory === 'Semua' || (item.kategori || 'Umum') === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [initialData, searchQuery, selectedCategory]);

  const selectedImage = getValidImageSrc(selectedFasilitas?.gambar);

  // Tutup modal dengan Esc dan kunci scroll halaman.
  useEffect(() => {
    if (!selectedFasilitas) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedFasilitas(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedFasilitas]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
  };

  return (
    <div className="space-y-6">
      {/* ===== PENCARIAN DAN FILTER ===== */}
      <section className="rounded-3xl border border-emerald-950/10 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="w-full md:max-w-md">
            <label htmlFor="fasilitas-search" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Temukan fasilitas
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-800/70" />
              <input
                id="fasilitas-search"
                type="search"
                placeholder="Cari fasilitas (misal: Puskesmas, Balai)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-emerald-950/10 bg-[#f7f8f4] py-3 pl-11 pr-11 text-sm text-[#183b32] outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-3xl leading-none text-[#0f3329]">
                {filteredData.length}
                <span className="ml-1 font-sans text-sm font-medium text-slate-400">/ {initialData.length}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">Fasilitas ditemukan</p>
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
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;

            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isActive}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition duration-200 ${
                  isActive
                    ? 'border-[#0b2e28] bg-[#0b2e28] text-emerald-200'
                    : 'border-emerald-950/10 bg-white text-slate-600 hover:border-emerald-600/40 hover:bg-emerald-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== KARTU FASILITAS ===== */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredData.map((item) => {
            const imageSrc = getValidImageSrc(item.gambar);

            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10"
              >
                <button
                  type="button"
                  onClick={() => setSelectedFasilitas(item)}
                  aria-label={`Lihat detail ${item.nama}`}
                  className="relative block h-48 w-full overflow-hidden bg-[#eaf0e9] text-left sm:h-52"
                >
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={item.nama || 'Fasilitas umum'}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <ImageFallback />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061b17]/80 via-[#061b17]/10 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    {item.kategori || 'Umum'}
                  </span>

                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-emerald-300 group-hover:text-emerald-950">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-[#0f3329]">
                    {item.nama}
                  </h3>

                  {item.jamOperasional && (
                    <div className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{item.jamOperasional}</span>
                    </div>
                  )}

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                    {item.deskripsi || 'Tidak ada deskripsi rinci untuk fasilitas ini.'}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFasilitas(item)}
                      className="flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-emerald-950/15 bg-white px-3 text-xs font-bold text-emerald-900 transition hover:bg-emerald-50"
                    >
                      <Info className="h-4 w-4" />
                      Detail
                    </button>

                    {item.latitude != null && item.longitude != null ? (
                      <a
                        href={mapsUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#0b2e28] px-3 text-xs font-bold text-emerald-200 transition hover:bg-[#10574a] active:scale-[0.98]"
                      >
                        <Navigation className="h-4 w-4" />
                        Rute Maps
                      </a>
                    ) : (
                      <p className="flex min-h-11 items-center justify-center rounded-full bg-[#f7f8f4] px-3 text-xs text-slate-400">
                        Tanpa Maps
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="mx-auto max-w-lg rounded-3xl border border-emerald-950/10 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="mt-5 font-serif text-2xl text-[#0f3329]">Fasilitas tidak ditemukan</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
            {searchQuery
              ? `Tidak ada fasilitas yang cocok dengan pencarian “${searchQuery}”.`
              : 'Tidak ada fasilitas pada kategori ini.'}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 min-h-11 rounded-full bg-[#0b2e28] px-6 text-xs font-bold text-emerald-200 transition hover:bg-[#10574a]"
          >
            Reset filter
          </button>
        </section>
      )}

      {/* ===== MODAL DETAIL ===== */}
      {selectedFasilitas && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#061f1b]/75 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedFasilitas(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="fasilitas-modal-title"
            className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#f7f8f4] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFasilitas(null)}
              aria-label="Tutup detail fasilitas"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#061f1b]/65 text-white backdrop-blur-md transition hover:bg-[#061f1b]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-52 shrink-0 bg-[#eaf0e9] sm:h-64">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={selectedFasilitas.nama || 'Fasilitas umum'}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              ) : (
                <ImageFallback modal />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061b17]/90 via-[#061b17]/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-7 sm:right-7">
                <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                  <Building2 className="h-3 w-3 text-emerald-300" />
                  {selectedFasilitas.kategori || 'Fasilitas Umum'}
                </span>
                <h2 id="fasilitas-modal-title" className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {selectedFasilitas.nama}
                </h2>
              </div>
            </div>

            <div className="space-y-5 overflow-y-auto p-5 sm:p-7">
              {(selectedFasilitas.jamOperasional || selectedFasilitas.kontak) && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedFasilitas.jamOperasional && (
                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4">
                      <div className="rounded-xl bg-amber-50 p-2 text-amber-700"><Clock className="h-5 w-5" /></div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400">Jam operasional / layanan</p>
                        <p className="mt-0.5 text-sm font-semibold text-[#183b32]">{selectedFasilitas.jamOperasional}</p>
                      </div>
                    </div>
                  )}

                  {selectedFasilitas.kontak && (
                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4">
                      <div className="rounded-xl bg-emerald-50 p-2 text-emerald-800"><Phone className="h-5 w-5" /></div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400">Kontak / telepon</p>
                        <p className="mt-0.5 text-sm font-semibold text-[#183b32]">{selectedFasilitas.kontak}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedFasilitas.alamat && (
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4">
                  <div className="rounded-xl bg-emerald-50 p-2 text-emerald-800"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400">Alamat lengkap</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#183b32]">{selectedFasilitas.alamat}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-2 font-serif text-xl text-[#0f3329]">Informasi layanan</h3>
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {selectedFasilitas.deskripsi || 'Belum ada deskripsi lengkap untuk fasilitas ini.'}
                </p>
              </div>

              {selectedFasilitas.latitude != null && selectedFasilitas.longitude != null && (
                <div className="border-t border-emerald-950/10 pt-5">
                  <a
                    href={mapsUrl(selectedFasilitas)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b2e28] px-5 text-sm font-bold text-emerald-200 transition hover:bg-[#10574a]"
                  >
                    <Navigation className="h-4 w-4" />
                    Petunjuk arah Google Maps
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}