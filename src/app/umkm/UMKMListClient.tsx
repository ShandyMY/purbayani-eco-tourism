'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Phone,
  Navigation,
  X,
  MapPin,
  Info,
  Leaf,
  ArrowUpRight,
} from 'lucide-react';

interface UmkmItem {
  id: string;
  nama: string;
  kategori?: string | null;
  deskripsi: string;
  pemilik?: string | null;
  noHp?: string | null;
  alamat?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  gambar?: string | null;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80';

// Helper untuk format nomor WA Indonesia
function formatWaNumber(phone: string) {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    return '62' + cleaned.slice(1);
  }
  return cleaned;
}

const waUrl = (item: UmkmItem) =>
  `https://wa.me/${formatWaNumber(item.noHp ?? '')}?text=Halo%20${encodeURIComponent(
    item.nama
  )},%20saya%20tertarik%20dengan%20produk/jasa%20Anda.`;

const mapsUrl = (item: UmkmItem) =>
  `https://www.google.com/maps?q=${item.latitude},${item.longitude}`;

export default function UmkmListClient({ initialData }: { initialData: UmkmItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedUmkm, setSelectedUmkm] = useState<UmkmItem | null>(null);

  // Daftar kategori unik
  const categories = useMemo(() => {
    const list = Array.from(new Set(initialData.map((item) => item.kategori || 'Lainnya')));
    return ['Semua', ...list];
  }, [initialData]);

  // Filter pencarian dan kategori
  const filteredData = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    return initialData.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(keyword) ||
        item.deskripsi?.toLowerCase().includes(keyword) ||
        item.pemilik?.toLowerCase().includes(keyword) ||
        item.kategori?.toLowerCase().includes(keyword);

      const matchCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [initialData, searchQuery, selectedCategory]);

  // Tutup modal dengan Esc dan kunci scroll halaman
  useEffect(() => {
    if (!selectedUmkm) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedUmkm(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedUmkm]);

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
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="w-full md:max-w-md">
            <label htmlFor="umkm-search" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Temukan usaha
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-800/70" />
              <input
                id="umkm-search"
                type="search"
                placeholder="Cari produk UMKM atau pemilik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-3xl leading-none text-[#0f3329]">
                {filteredData.length}
                <span className="ml-1 font-sans text-sm font-medium text-slate-400">/ {initialData.length}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">Usaha ditemukan</p>
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

      {/* ===== KARTU UMKM ===== */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredData.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10"
            >
              <button
                type="button"
                onClick={() => setSelectedUmkm(item)}
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
                  {item.kategori || 'Produk Lokal'}
                </span>

                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-emerald-300 group-hover:text-emerald-950">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-[#0f3329]">{item.nama}</h3>

                {item.pemilik && (
                  <p className="mt-1.5 text-xs font-medium text-emerald-800">Pemilik: {item.pemilik}</p>
                )}

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                  {item.deskripsi || 'Belum ada deskripsi untuk UMKM ini.'}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUmkm(item)}
                    className="flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-emerald-950/15 bg-white px-3 text-xs font-bold text-emerald-900 transition hover:bg-emerald-50"
                  >
                    <Info className="h-4 w-4" />
                    Detail
                  </button>

                  {item.noHp ? (
                    <a
                      href={waUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-emerald-300 px-3 text-xs font-bold text-emerald-950 transition hover:bg-emerald-200 active:scale-[0.98]"
                    >
                      <Phone className="h-4 w-4" />
                      Pesan WA
                    </a>
                  ) : (
                    <p className="flex min-h-11 items-center justify-center rounded-full bg-[#f7f8f4] px-3 text-xs text-slate-400">
                      Tanpa WA
                    </p>
                  )}
                </div>

                {item.latitude && item.longitude ? (
                  <a
                    href={mapsUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0b2e28] px-4 text-xs font-bold text-emerald-200 transition hover:bg-[#10574a] active:scale-[0.98]"
                  >
                    <Navigation className="h-4 w-4" />
                    Petunjuk arah
                  </a>
                ) : (
                  <p className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-[#f7f8f4] px-4 text-xs text-slate-400">
                    Lokasi peta belum tersedia
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="mx-auto max-w-lg rounded-3xl border border-emerald-950/10 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="mt-5 font-serif text-2xl text-[#0f3329]">UMKM tidak ditemukan</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
            {searchQuery
              ? `Tidak ada usaha yang cocok dengan kata kunci “${searchQuery}”.`
              : 'Tidak ada usaha pada kategori ini.'}
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
      {selectedUmkm && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#061f1b]/75 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedUmkm(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="umkm-modal-title"
            className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#f7f8f4] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup detail"
              onClick={() => setSelectedUmkm(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#061f1b]/65 text-white backdrop-blur-md transition hover:bg-[#061f1b]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-52 shrink-0 bg-[#eaf0e9] sm:h-64">
              <img
                src={selectedUmkm.gambar || FALLBACK_IMAGE}
                alt={selectedUmkm.nama}
                className="h-full w-full object-cover"
                onError={onImgError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061b17]/90 via-[#061b17]/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-7 sm:right-7">
                <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                  <Leaf className="h-3 w-3 text-emerald-300" />
                  {selectedUmkm.kategori || 'Produk UMKM'}
                </span>
                <h2 id="umkm-modal-title" className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {selectedUmkm.nama}
                </h2>
                {selectedUmkm.pemilik && (
                  <p className="mt-1.5 text-xs text-white/85 sm:text-sm">Pemilik: {selectedUmkm.pemilik}</p>
                )}
              </div>
            </div>

            <div className="space-y-5 overflow-y-auto p-5 sm:p-7">
              {selectedUmkm.alamat && (
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4">
                  <div className="rounded-xl bg-emerald-50 p-2 text-emerald-800"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400">Alamat lengkap</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#183b32]">{selectedUmkm.alamat}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-2 font-serif text-xl text-[#0f3329]">Tentang usaha</h3>
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {selectedUmkm.deskripsi || 'Tidak ada deskripsi detail untuk UMKM ini.'}
                </p>
              </div>

              {(selectedUmkm.noHp || (selectedUmkm.latitude && selectedUmkm.longitude)) && (
                <div className="grid grid-cols-1 gap-3 border-t border-emerald-950/10 pt-5 sm:grid-cols-2">
                  {selectedUmkm.noHp && (
                    <a
                      href={waUrl(selectedUmkm)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-300 px-4 text-sm font-bold text-emerald-950 transition hover:bg-emerald-200"
                    >
                      <Phone className="h-4 w-4" />
                      Pesan via WhatsApp
                    </a>
                  )}

                  {selectedUmkm.latitude && selectedUmkm.longitude && (
                    <a
                      href={mapsUrl(selectedUmkm)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b2e28] px-4 text-sm font-bold text-emerald-200 transition hover:bg-[#10574a]"
                    >
                      <Navigation className="h-4 w-4" />
                      Petunjuk arah
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}