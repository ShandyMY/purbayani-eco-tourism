import { ShieldCheck, Target, Users, MapPin, Award, Trees } from 'lucide-react';

export default function ProfilPublicPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Trees className="w-4 h-4" /> Profil & Identitas
          </div>
          <h1 className="text-3xl md:text-5xl font-black">Mengenal Desa <span className="text-emerald-400">Purbayani</span></h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Mewujudkan Desa Purbayani yang Mandiri, Sejahtera, Berkelanjutan, dan Berbasis Teknologi Informasi melalui Smart Eco-Tourism.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-10">
        {/* Visi & Misi Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white p-8 rounded-3xl shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Target className="w-6 h-6 text-emerald-300" />
              </div>
              <h2 className="text-2xl font-black">Visi Desa</h2>
              <p className="text-emerald-50 text-sm leading-relaxed italic">
                &ldquo;Terwujudnya Desa Purbayani yang agrowisata, mandiri secara ekonomi, berdaya saing tinggi, serta lestari dalam pelestarian lingkungan dan kearifan lokal.&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Misi Utama</h2>
            <ul className="text-slate-600 text-xs md:text-sm space-y-2.5 list-disc list-inside leading-relaxed">
              <li>Meningkatkan tata kelola pemerintahan desa yang transparan dan akuntabel.</li>
              <li>Mengembangkan potensi pariwisata berbasis *Eco-Tourism* dan partisipasi warga.</li>
              <li>Mendorong pemberdayaan UMKM lokal melalui digitalisasi ekonomi.</li>
              <li>Menjaga kelestarian sumber daya alam dan kualitas lingkungan hidup.</li>
            </ul>
          </div>
        </div>

        {/* Demografi & Statistik Ringkas */}
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">Gambaran Umum Wilayah</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-slate-900">± 4.500</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Jumlah Penduduk</div>
            </div>
            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <MapPin className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-slate-900">12.5 km²</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Luas Wilayah</div>
            </div>
            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <Award className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-slate-900">4 Dusun</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Wilayah Administratif</div>
            </div>
            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <Trees className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-slate-900">Eco-Village</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Fokus Pembangunan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}