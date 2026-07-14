'use client';

import { DATA_WISATA } from '@/data/db';
import { MapPin, CheckCircle } from 'lucide-react';

export default function WisataPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-teal-600 text-xs font-extrabold uppercase tracking-widest block mb-1">Eksplorasi</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Direktori Destinasi Wisata</h1>
          <p className="text-slate-500 text-sm md:text-base mt-2">Daftar objek wisata ekologis terlengkap di area wilayah Desa Purbayani.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DATA_WISATA.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row hover:shadow-md transition">
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-100">
                <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-teal-50 text-teal-700 font-extrabold px-2 py-1 rounded-md uppercase tracking-wider">{item.kategori}</span>
                  <h2 className="text-xl font-bold text-slate-950 mt-3">{item.nama}</h2>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                    <span className="font-medium truncate">{item.lokasi}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-light mt-3">{item.deskripsi}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">Harga Tiket Masuk</span>
                  <span className="text-sm font-bold text-teal-600">{item.hargaTiket}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}