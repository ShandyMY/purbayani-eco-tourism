'use client';

import { useState, useMemo } from 'react';
import { Search, Navigation, Building2, X, MapPin, Eye, Clock, Phone, Info, ShieldAlert } from 'lucide-react';
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

export default function FasilitasListClient({ initialData }: { initialData: FasilitasItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedFasilitas, setSelectedFasilitas] = useState<FasilitasItem | null>(null);

  // Kategori unik yang diekstrak dari database
  const categories = useMemo(() => {
    const list = Array.from(new Set(initialData.map((item) => item.kategori || 'Umum')));
    return ['Semua', ...list];
  }, [initialData]);

  // Logika Filter & Pencarian
  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.alamat?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [initialData, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* ===== BAR PENCARIAN & FILTER KATEGORI ===== */}
      <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100/80 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari fasilitas umum (misal: Puskesmas, Balai)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
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

          <div className="text-xs font-medium text-slate-500 self-start md:self-auto">
            Menampilkan <strong className="text-slate-900 font-bold">{filteredData.length}</strong> dari {initialData.length} fasilitas
          </div>
        </div>

        {/* Tag Kategori Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-teal-900 text-teal-100 shadow-md shadow-teal-950/20'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== GRID KARTU FASILITAS ===== */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Header */}
                <div 
                  className="h-52 w-full bg-slate-100 relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedFasilitas(item)}
                >
                  {item.gambar ? (
                    <Image
                      src={item.gambar}
                      alt={item.nama}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 text-xs gap-2">
                      <Building2 className="w-8 h-8 stroke-1" />
                      <span>Gambar Fasilitas</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-teal-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm border border-teal-100">
                    {item.kategori || 'Umum'}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-teal-600" /> Lihat Detail
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <h3 
                    onClick={() => setSelectedFasilitas(item)}
                    className="font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {item.nama}
                  </h3>

                  {item.jamOperasional && (
                    <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50/80 px-2.5 py-1 rounded-lg w-fit">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold line-clamp-1">{item.jamOperasional}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.deskripsi || 'Tidak ada deskripsi rinci untuk fasilitas ini.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedFasilitas(item)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-600" />
                    <span>Detail Info</span>
                  </button>

                  {item.latitude && item.longitude ? (
                    <a
                      href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-teal-600/20 transition-all duration-200"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Rute Maps</span>
                    </a>
                  ) : (
                    <div className="w-full bg-slate-50 text-slate-400 font-medium text-[11px] py-2.5 px-2 rounded-xl text-center italic flex items-center justify-center">
                      Tanpa Maps
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Fasilitas Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tidak ada data fasilitas umum yang sesuai dengan pencarian &quot;<strong className="text-slate-800">{searchQuery}</strong>&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="mt-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* ===== MODAL DETAIL POPUP ===== */}
      {selectedFasilitas && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedFasilitas(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFasilitas(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-64 md:h-72 bg-slate-100 shrink-0">
              {selectedFasilitas.gambar ? (
                <Image
                  src={selectedFasilitas.gambar}
                  alt={selectedFasilitas.nama}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Building2 className="w-12 h-12 stroke-1" />
                  <span className="text-xs">Foto Fasilitas</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="inline-block bg-teal-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm mb-2">
                  {selectedFasilitas.kategori || 'Fasilitas Umum'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black">{selectedFasilitas.nama}</h2>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Grid Metadata Informasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedFasilitas.jamOperasional && (
                  <div className="flex items-start gap-3 bg-amber-50/70 border border-amber-200/50 p-3.5 rounded-2xl">
                    <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-amber-800 font-semibold uppercase">Jam Operasional / Layanan</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedFasilitas.jamOperasional}</p>
                    </div>
                  </div>
                )}

                {selectedFasilitas.kontak && (
                  <div className="flex items-start gap-3 bg-emerald-50/70 border border-emerald-200/50 p-3.5 rounded-2xl">
                    <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-emerald-800 font-semibold uppercase">Kontak / Telepon Pendaftaran</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedFasilitas.kontak}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedFasilitas.alamat && (
                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Alamat Lengkap</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{selectedFasilitas.alamat}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Informasi Layanan & Deskripsi</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedFasilitas.deskripsi || 'Belum ada deskripsi lengkap untuk fasilitas ini.'}
                </p>
              </div>

              {selectedFasilitas.latitude && selectedFasilitas.longitude && (
                <div className="pt-2">
                  <a
                    href={`https://maps.google.com/?q=${selectedFasilitas.latitude},${selectedFasilitas.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Petunjuk Arah Google Maps</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}