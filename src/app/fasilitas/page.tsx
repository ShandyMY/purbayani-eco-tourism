'use client';

import { DATA_FASILITAS, DATA_USAHA_LOKAL } from '@/data/db';
import { Building2, Store, Phone, Shield, ShieldAlert, Heart } from 'lucide-react';

export default function FasilitasUsahaPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24"> {/* Jarak atas pt-32 aman dari tindihan Navbar */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Halaman */}
        <div className="mb-12">
          <span className="text-teal-600 text-xs font-extrabold uppercase tracking-widest block mb-1">Infrastruktur & Layanan</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">Fasilitas Publik & Usaha Lokal</h1>
          <p className="text-slate-500 text-sm md:text-base mt-2">Daftar sarana pendukung keamanan, administrasi, kesehatan, dan akomodasi di Desa Purbayani.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Sektor 1: Fasilitas Publik & Mitigasi */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-teal-600" /> Fasilitas Umum & Pos Keamanan
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {DATA_FASILITAS.map((fac) => (
                <div key={fac.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-xl flex-shrink-0">
                    {fac.kategori === 'Kesehatan' ? <Heart className="w-5 h-5" /> : fac.kategori === 'Keamanan' ? <ShieldAlert className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">{fac.kategori}</span>
                    <h3 className="font-bold text-slate-900 mt-1.5">{fac.nama}</h3>
                    <p className="text-slate-500 text-xs font-light mt-1">{fac.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sektor 2: Direktori Usaha Lokal & Homestay */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-teal-600" /> Penginapan & Usaha Warga
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {DATA_USAHA_LOKAL.map((store) => (
                <div key={store.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">{store.kategori}</span>
                    <h3 className="font-bold text-slate-900 mt-2">{store.nama}</h3>
                    <p className="text-slate-500 text-xs font-light mt-1">{store.deskripsi}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">Hubungi Reservasi</span>
                    <a href={`https://wa.me/${store.kontak.replace(/[^0-9]/g, '')}`} target="_blank" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700">
                      <Phone className="w-3 h-3" /> {store.kontak}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}