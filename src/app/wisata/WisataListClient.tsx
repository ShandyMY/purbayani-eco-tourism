'use client';

import { useState, useMemo } from 'react';
import { Search, Clock, Ticket, Navigation, Sparkles, X, MapPin, Eye, Info } from 'lucide-react';

interface WisataItem {
  id: string;
  nama: string;
  kategori?: string | null;
  deskripsi: string;
  lokasi?: string | null; // <-- Tambahan kolom lokasi teks
  jamOperasional?: string | null;
  hargaTiket?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  gambar?: string | null;
}

export default function WisataListClient({ initialData }: { initialData: WisataItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedWisata, setSelectedWisata] = useState<WisataItem | null>(null);

  // Ambil daftar kategori unik dari data
  const categories = useMemo(() => {
    const list = Array.from(new Set(initialData.map((item) => item.kategori || 'Lainnya')));
    return ['Semua', ...list];
  }, [initialData]);

  // Filter data berdasarkan keyword & kategori (mencakup pencarian berdasarkan lokasi juga)
  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lokasi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [initialData, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* ===== FILTER & SEARCH BAR ===== */}
      <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100/80 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Input Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari destinasi wisata atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Info Jumlah Hasil */}
          <div className="text-xs font-medium text-slate-500 flex items-center gap-2 self-start md:self-auto">
            <span>
              Menampilkan <strong className="text-slate-900 font-bold">{filteredData.length}</strong> dari {initialData.length} Destinasi
            </span>
          </div>
        </div>

        {/* Filter Pills Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== GRID WISATA CARDS ===== */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Header Overlay */}
                <div 
                  className="relative w-full h-52 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedWisata(item)}
                >
                  <img
                    src={item.gambar || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80';
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Kategori Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-emerald-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {item.kategori || 'Wisata Alam'}
                    </span>
                  </div>

                  {/* Quick Detail Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-emerald-600" /> Lihat Detail
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-2.5">
                  <h3 
                    onClick={() => setSelectedWisata(item)}
                    className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {item.nama}
                  </h3>

                  {/* Lokasi Teks di Kartu */}
                  {item.lokasi && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.lokasi}</span>
                    </div>
                  )}

                  <p className="text-slate-500 text-xs leading-relaxed font-normal line-clamp-3">
                    {item.deskripsi || 'Belum ada deskripsi untuk destinasi wisata ini.'}
                  </p>
                </div>
              </div>

              {/* Action Footer & Meta */}
              <div className="p-6 pt-0 space-y-3">
                {/* Jam Operasional & Tiket */}
                {(item.jamOperasional || item.hargaTiket) && (
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    {item.jamOperasional ? (
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100/80">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.jamOperasional}</span>
                      </div>
                    ) : (
                      <div />
                    )}
                    {item.hargaTiket ? (
                      <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100/80">
                        <Ticket className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate font-semibold text-slate-800">{item.hargaTiket}</span>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setSelectedWisata(item)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Info className="w-4 h-4 text-slate-600" />
                    <span>Lihat Detail</span>
                  </button>

                  {item.latitude && item.longitude ? (
                    <a
                      href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition-all duration-200"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Petunjuk Arah (Google Maps)</span>
                    </a>
                  ) : (
                    <div className="w-full bg-slate-50 border border-slate-100 text-slate-400 font-medium text-xs py-2 px-4 rounded-xl text-center italic">
                      Lokasi koordinat belum tersedia
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ===== EMPTY STATE ===== */
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Destinasi Tidak Ditemukan</h3>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Tidak ada destinasi yang cocok dengan kata kunci &quot;<strong className="text-slate-800">{searchQuery}</strong>&quot; atau kategori yang dipilih.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="mt-5 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* ===== POPUP MODAL DETAIL WISATA ===== */}
      {selectedWisata && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedWisata(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-64 md:h-80 bg-slate-100 shrink-0">
              <img
                src={selectedWisata.gambar || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'}
                alt={selectedWisata.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1.5">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm mb-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {selectedWisata.kategori || 'Wisata Alam'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black">{selectedWisata.nama}</h2>
                {selectedWisata.lokasi && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{selectedWisata.lokasi}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Meta Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {selectedWisata.jamOperasional && (
                  <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Jam Operasional</p>
                      <p className="font-bold text-slate-800">{selectedWisata.jamOperasional}</p>
                    </div>
                  </div>
                )}
                {selectedWisata.hargaTiket && (
                  <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <Ticket className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Harga Tiket</p>
                      <p className="font-bold text-slate-800">{selectedWisata.hargaTiket}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Deskripsi Lengkap */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tentang Destinasi</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedWisata.deskripsi || 'Tidak ada informasi deskripsi tambahan.'}
                </p>
              </div>

              {/* Map Action Button */}
              {selectedWisata.latitude && selectedWisata.longitude ? (
                <a
                  href={`https://www.google.com/maps?q=${selectedWisata.latitude},${selectedWisata.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Buka Petunjuk Arah di Google Maps</span>
                </a>
              ) : (
                <div className="p-3 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 italic">
                  Koordinat lokasi peta tidak tersedia.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}