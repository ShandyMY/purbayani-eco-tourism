'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  MapPin, ShoppingBag, Navigation, Trees, Radio, 
  BookOpen, Building2, Store, Palmtree, Globe, ArrowRight, Eye
} from 'lucide-react';

const DigitalMap = dynamic(() => import('@/components/Map/MapContainer'), { 
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full flex flex-col items-center justify-center bg-slate-50 rounded-[32px] border border-dashed border-slate-300 animate-pulse">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent mb-3" />
      <p className="text-sm text-slate-500 font-medium">Menyiapkan Peta Digital Desa...</p>
    </div>
  )
});

const PanoramaViewer = dynamic(() => import('@/components/VirtualTour/PanoramaViewer'), { 
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full flex flex-col items-center justify-center bg-slate-900 rounded-[32px] border border-slate-800 animate-pulse">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mb-3" />
      <p className="text-sm text-slate-400 font-medium">Menginisialisasi Virtual Tour 360°...</p>
    </div>
  )
});

export default function Home() {
  // Handler scroll mulus ke peta
  const scrollToPeta = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById('peta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-600 selection:text-white pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover object-center filter brightness-75 scale-105"
            src="/assets/videos/hero-purbayani.mp4" 
            poster="/assets/images/hero-fallback.jpg"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30 z-10" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto text-white flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 text-emerald-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            SMART ECO-TOURISM DESA PURBAYANI
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
          >
            Jelajahi Serpihan Surga <br />
            <span className="font-serif italic font-normal text-emerald-200">di Garut Selatan</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-lg text-slate-100 max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            Satu portal digital terintegrasi untuk menyusuri profil desa, potensi wisata bahari, direktori UMKM lokal, pemetaan wilayah, hingga pesona virtual tour 360°.
          </motion.p>

          {/* Pengganti Search: Tombol Call-to-Action Premium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 z-30"
          >
            <button 
              onClick={scrollToPeta}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-full transition duration-300 text-sm md:text-base shadow-[0_10px_20px_rgba(13,148,136,0.3)] flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Buka Peta Digital
            </button>
            
            <a 
              href="#virtual-tour"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full backdrop-blur-md transition duration-300 text-sm md:text-base flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" /> Virtual Tour 360°
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. MENU DIREKTORI UTAMA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-bold tracking-widest text-xs uppercase bg-teal-50 px-4 py-1.5 rounded-full">
            Menu Utama
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight">
            Eksplorasi Portal Purbayani
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Temukan semua informasi administratif, potensi ekonomi rakyat, dan keindahan alam yang tertata rapi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Link href="/wisata" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img src="/assets/images/wisata-cover.jpg" alt="Wisata" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <span className="text-xs text-teal-300 font-bold uppercase tracking-widest block mb-2">Destinasi</span>
              <h3 className="text-2xl font-bold mb-2">Direktori Wisata</h3>
              <p className="text-slate-200 text-xs font-light line-clamp-2">Eksplorasi Pantai Cilame, ekowisata mangrove, dan keindahan pantai selatan Garut.</p>
            </div>
          </Link>

          <Link href="/umkm" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img src="/assets/images/umkm-cover.jpg" alt="UMKM" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <span className="text-xs text-yellow-400 font-bold uppercase tracking-widest block mb-2">Ekonomi Kreatif</span>
              <h3 className="text-2xl font-bold mb-2">Direktori UMKM</h3>
              <p className="text-slate-200 text-xs font-light line-clamp-2">Pemberdayaan gula semut aren khas kehutanan, anyaman pandan, dan kuliner laut.</p>
            </div>
          </Link>

          <Link href="/profil" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img src="/assets/images/profil-cover.jpg" alt="Profil Desa" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <span className="text-xs text-blue-400 font-bold uppercase tracking-widest block mb-2">Informasi Publik</span>
              <h3 className="text-2xl font-bold mb-2">Profil & Layanan Desa</h3>
              <p className="text-slate-200 text-xs font-light line-clamp-2">Struktur perangkat desa, program pemberdayaan, data statistik kependudukan, dan sejarah desa.</p>
            </div>
          </Link>

          <Link href="/berita" className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img src="/assets/images/berita-cover.jpg" alt="Berita" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
              <h4 className="text-lg font-bold mb-1">Kabar Desa & Berita</h4>
              <p className="text-xs text-slate-300">Agenda pesta laut syukur nelayan, program kerja, dan info wisata.</p>
            </div>
          </Link>

          <Link href="/fasilitas" className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img src="/assets/images/fasilitas-cover.jpg" alt="Fasilitas" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
              <h4 className="text-lg font-bold mb-1">Fasilitas Publik & Keamanan</h4>
              <p className="text-xs text-slate-300">Posko evakuasi bencana tsunami, klinik kesehatan desa, dan rute evakuasi.</p>
            </div>
          </Link>

          <Link href="/fasilitas" className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <img src="/assets/images/usaha-cover.jpg" alt="Usaha Lokal" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
              <h4 className="text-lg font-bold mb-1">Direktori Usaha Lokal</h4>
              <p className="text-xs text-slate-300">Daftar homestay pantai milik warga, persewaan alat camping samudra, dll.</p>
            </div>
          </Link>

        </div>
      </section>

      {/* 3. DIGITAL MAPPING */}
      <section id="peta" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-bold tracking-widest text-xs uppercase bg-teal-100/50 border border-teal-200/40 px-3.5 py-1 rounded-full">
              Peta Geografis Desa
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight">
              Peta Potensi Geografis & Jalur
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
              Pemetaan spasial digital terintegrasi yang memperlihatkan sebaran destinasi wisata, UMKM, warung makan, pertanian, perkebunan, serta titik-titik pos strategis desa.
            </p>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden border border-slate-200/60 shadow-2xl p-4 md:p-6">
            <DigitalMap />
          </div>
        </div>
      </section>

      {/* 4. VIRTUAL TOUR SECTION */}
      <section id="virtual-tour" className="py-24 bg-white border-t border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="w-full lg:w-1/3 space-y-6">
              <span className="text-teal-600 font-bold tracking-widest text-xs uppercase bg-teal-50 px-3 py-1 rounded-full">
                Interactive Experience
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                Jelajahi Lewat <br />Virtual Tour 360°
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
                Teknologi wisata imersif yang menghadirkan keindahan Desa Purbayani di genggaman Anda. Nikmati visualisasi panorama beresolusi tinggi, navigasikan diri Anda menyusuri sudut pantai selatan dan kawasan produktif desa tanpa batas jarak.
              </p>
              <div className="pt-2">
                <a href="#virtual-tour-player" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold text-sm group">
                  Mulai Tur Virtual Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div id="virtual-tour-player" className="w-full lg:w-2/3 rounded-[32px] overflow-hidden border border-slate-200/50 shadow-2xl bg-slate-100 p-2.5">
              <PanoramaViewer />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}