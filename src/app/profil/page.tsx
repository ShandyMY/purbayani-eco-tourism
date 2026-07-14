'use client';

import { Users, Landmark, Heart, Eye } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Profil */}
        <div className="text-center mb-16">
          <span className="text-teal-600 text-xs font-extrabold uppercase tracking-widest block mb-1">Informasi Publik</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Profil Desa Purbayani</h1>
          <p className="text-slate-500 text-sm md:text-base mt-2">Mengenal lebih dekat tata kelola, sejarah, dan nilai sosial Desa Purbayani.</p>
        </div>

        {/* 1. SEJARAH */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Landmark className="w-6 h-6 text-teal-600" /> Sejarah Singkat
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            Desa Purbayani merupakan salah satu wilayah administratif di pesisir Garut Selatan yang kaya akan potensi kelautan dan kehutanan adat. Sejak pembentukannya, desa ini menjunjung tinggi integrasi harmonis antara konservasi alam dan kemandirian ekonomi, menjadikannya salah satu motor utama pemeliharaan ekosistem mangrove di Jawa Barat.
          </p>
        </div>

        {/* 2. VISI & MISI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-teal-600" /> Visi Desa
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              "Mewujudkan Desa Purbayani Mandiri yang Sejahtera berbasis Smart Eco-Tourism, Kelestarian Lingkungan, dan Kemandirian Ekonomi Kerakyatan pada Tahun 2030."
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-teal-600" /> Misi Utama
            </h3>
            <ul className="text-slate-600 text-sm leading-relaxed font-light list-disc pl-4 space-y-1">
              <li>Membangun infrastruktur desa digital yang ramah lingkungan.</li>
              <li>Memberdayakan UMKM pesisir melalui teknologi tepat guna.</li>
              <li>Mengembangkan kawasan pariwisata berkelanjutan berbasis komunitas (CBT).</li>
            </ul>
          </div>
        </div>

        {/* 3. DEMOGRAFI */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2 mb-6">
            <Users className="w-6 h-6 text-teal-600" /> Statistik Kependudukan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { total: '3.450+', label: 'Total Penduduk' },
              { total: '1.120', label: 'Kepala Keluarga' },
              { total: '450 Ha', label: 'Luas Wilayah' },
              { total: '65%', label: 'Mata Pencaharian Nelayan' }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="block text-xl md:text-2xl font-black text-teal-600">{stat.total}</span>
                <span className="block text-[11px] font-bold text-slate-400 mt-1 uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}