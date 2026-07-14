'use client';

import { DATA_BERITA } from '@/data/db';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export default function BeritaPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24"> {/* Jarak atas pt-32 agar konten tidak terpotong navbar */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Kabar */}
        <div className="mb-12">
          <span className="text-teal-600 text-xs font-extrabold uppercase tracking-widest block mb-1">Informasi Terkini</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Kabar & Berita Purbayani</h1>
          <p className="text-slate-500 text-sm md:text-base mt-2">Dapatkan info resmi kegiatan sosial, festival budaya, dan pengumuman pariwisata desa.</p>
        </div>

        {/* Daftar Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DATA_BERITA.map((berita) => (
            <div key={berita.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="h-48 bg-slate-100 relative">
                  <img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] bg-teal-50 text-teal-700 font-extrabold px-2 py-1 rounded-md uppercase tracking-wider">{berita.kategori}</span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                      <Calendar className="w-3 h-3" />
                      {berita.tanggal}
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-bold text-slate-950 line-clamp-2 hover:text-teal-600 transition mb-2">
                    {berita.judul}
                  </h2>
                  <p className="text-slate-500 text-xs font-light leading-relaxed line-clamp-3">
                    {berita.ringkasan}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2">
                <button className="w-full bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-100 text-slate-700 hover:text-teal-700 text-xs font-bold py-3 rounded-2xl transition flex items-center justify-center gap-1.5">
                  Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}