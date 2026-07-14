'use client';

import { Palmtree } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 text-white mb-4">
            <Palmtree className="w-6 h-6 text-teal-500" />
            <span className="font-black tracking-tight text-lg">DESA PURBAYANI</span>
          </div>
          <p className="text-xs leading-relaxed font-light text-slate-500">
            Platform Portal & GIS Smart Eco-Tourism terintegrasi Desa Purbayani, Kecamatan Caringin, Kabupaten Garut, Jawa Barat.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Akses Kontak Resmi</h4>
          <ul className="text-xs space-y-2.5 font-light">
            <li>Email: <span className="text-slate-300 font-medium">pemerintah@purbayani.desa.id</span></li>
            <li>Telepon: <span className="text-slate-300 font-medium">+62 821-4433-2211</span></li>
            <li>Alamat: <span className="text-slate-300 font-medium">Jl. Raya Pesisir Rancabuaya No.12, Caringin, Garut</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Sinergi Digital</h4>
          <p className="text-xs leading-relaxed font-light text-slate-500">
            Dikelola secara kolaboratif oleh Pemerintah Desa Purbayani bersama Karang Taruna dan Kelompok Sadar Wisata (Pokdarwis) setempat.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center">
        <p className="text-[11px] text-slate-600">&copy; {new Date().getFullYear()} Desa Purbayani Garut. All Rights Reserved. Built for Smart Village Eco-Tourism Initiative.</p>
      </div>
    </footer>
  );
}