'use client';

import { useState, useMemo } from 'react';
import { Search, Phone, Navigation, Sparkles, X, MapPin, Eye, Info } from 'lucide-react';

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

// Helper untuk format nomor WA Indonesia
function formatWaNumber(phone: string) {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    return '62' + cleaned.slice(1);
  }
  return cleaned;
}

export default function UmkmListClient({ initialData }: { initialData: UmkmItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedUmkm, setSelectedUmkm] = useState<UmkmItem | null>(null);

  // Daftar Kategori Unik
  const categories = useMemo(() => {
    const list = Array.from(new Set(initialData.map((item) => item.kategori || 'Lainnya')));
    return ['Semua', ...list];
  }, [initialData]);

  // Filter pencarian & kategori
  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pemilik?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari produk UMKM atau pemilik..."
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

          <div className="text-xs font-medium text-slate-500 flex items-center gap-2 self-start md:self-auto">
            <span>
              Menampilkan <strong className="text-slate-900 font-bold">{filteredData.length}</strong> dari {initialData.length} UMKM
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

      {/* ===== GRID UMKM CARDS ===== */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div 
                  className="relative w-full h-52 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedUmkm(item)}
                >
                  <img
                    src={item.gambar || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80'}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-emerald-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {item.kategori || 'Produk Lokal'}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-emerald-600" /> Lihat Detail
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <h3 
                    onClick={() => setSelectedUmkm(item)}
                    className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {item.nama}
                  </h3>

                  {item.pemilik && (
                    <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                      Pemilik: {item.pemilik}
                    </p>
                  )}

                  <p className="text-slate-500 text-xs leading-relaxed font-normal line-clamp-3">
                    {item.deskripsi || 'Belum ada deskripsi untuk UMKM ini.'}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedUmkm(item)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-600" />
                    <span>Detail</span>
                  </button>

                  {item.noHp ? (
                    <a
                      href={`https://wa.me/${formatWaNumber(item.noHp)}?text=Halo%20${encodeURIComponent(item.nama)},%20saya%20tertarik%20dengan%20produk/jasa%20Anda.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all duration-200"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Pesan WA</span>
                    </a>
                  ) : (
                    <div className="w-full bg-slate-50 border border-slate-100 text-slate-400 font-medium text-[11px] py-2.5 px-2 rounded-xl text-center italic flex items-center justify-center">
                      Tanpa WA
                    </div>
                  )}
                </div>

                {item.latitude && item.longitude ? (
                  <a
                    href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
                  >
                    <Navigation className="w-4 h-4 text-emerald-400" />
                    <span>Petunjuk Arah (Google Maps)</span>
                  </a>
                ) : (
                  <div className="w-full bg-slate-50 border border-slate-100 text-slate-400 font-medium text-xs py-2.5 px-4 rounded-xl text-center italic">
                    Lokasi peta belum tersedia
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">UMKM Tidak Ditemukan</h3>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">
            Tidak ada produk/UMKM yang cocok dengan kata kunci &quot;<strong className="text-slate-800">{searchQuery}</strong>&quot;.
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

      {/* ===== POPUP MODAL DETAIL UMKM ===== */}
      {selectedUmkm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedUmkm(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUmkm(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-64 md:h-80 bg-slate-100 shrink-0">
              <img
                src={selectedUmkm.gambar || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80'}
                alt={selectedUmkm.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm mb-2">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {selectedUmkm.kategori || 'Produk UMKM'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black">{selectedUmkm.nama}</h2>
                {selectedUmkm.pemilik && (
                  <p className="text-xs text-slate-200 mt-1 font-medium">Pemilik: {selectedUmkm.pemilik}</p>
                )}
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {selectedUmkm.alamat && (
                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Alamat Lengkap</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{selectedUmkm.alamat}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Deskripsi Usaha / Produk</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedUmkm.deskripsi || 'Tidak ada deskripsi detail untuk UMKM ini.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {selectedUmkm.noHp && (
                  <a
                    href={`https://wa.me/${formatWaNumber(selectedUmkm.noHp)}?text=Halo%20${encodeURIComponent(selectedUmkm.nama)},%20saya%20tertarik%20dengan%20produk/jasa%20Anda.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Pesan via WhatsApp</span>
                  </a>
                )}

                {selectedUmkm.latitude && selectedUmkm.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${selectedUmkm.latitude},${selectedUmkm.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Navigation className="w-4 h-4 text-emerald-400" />
                    <span>Petunjuk Arah (Maps)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}