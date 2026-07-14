'use client';

import { DATA_UMKM } from '@/data/db';
import { Phone, CheckCircle } from 'lucide-react';

export default function UMKMPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-teal-600 text-xs font-extrabold uppercase tracking-widest block mb-1">Ekonomi Rakyat</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Direktori UMKM Desa</h1>
          <p className="text-slate-500 text-sm md:text-base mt-2">Dukung perekonomian lokal dengan membeli produk hasil karya masyarakat Desa Purbayani.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DATA_UMKM.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="h-64 relative bg-slate-100">
                <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <span className="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2 py-1 rounded-md uppercase tracking-wider">Kategori Produk Unggulan</span>
                <h2 className="text-2xl font-bold text-slate-950 mt-3">{item.nama}</h2>
                <span className="text-xs text-slate-400 block mt-1">Pemilik Usaha: <span className="font-bold text-slate-700">{item.pemilik}</span></span>
                
                <p className="text-slate-600 text-xs leading-relaxed font-light mt-4">{item.deskripsi}</p>
                
                <div className="mt-6">
                  <span className="text-[11px] font-bold text-slate-800 block mb-2">Varian Produk:</span>
                  <div className="flex flex-wrap gap-2">
                    {item.produk.map((prod, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-full">{prod}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <a href={`https://wa.me/${item.kontak.replace(/[^0-9]/g, '')}`} target="_blank" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition">
                    <Phone className="w-3.5 h-3.5" />
                    Pesan via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}