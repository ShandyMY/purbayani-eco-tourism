import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import HomeHeroClient from '@/components/HomeHeroClient';
import MapClient from '@/components/Map/MapClient';
import PanoramaClient from '@/components/VirtualTour/PanoramaClient';

export const revalidate = 0;

export default async function Home() {
  // Ambil Data dari Prisma Database secara parallel
  const [wisataList, umkmList, fasilitasList] = await Promise.all([
    prisma.wisata.findMany(),
    prisma.umkm.findMany(),
    prisma.fasilitas.findMany(),
  ]);

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

        <HomeHeroClient />
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
          
          {/* Wisata */}
          <Link href="/wisata" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <Image 
              src="/assets/images/wisata-cover.jpg" 
              alt="Wisata Desa Purbayani" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <span className="text-xs text-teal-300 font-bold uppercase tracking-widest block mb-2">Destinasi</span>
              <h3 className="text-2xl font-bold mb-2">Direktori Wisata</h3>
              <p className="text-slate-200 text-xs font-light line-clamp-2">Eksplorasi Pantai Cilame, ekowisata mangrove, dan keindahan pantai selatan Garut.</p>
            </div>
          </Link>

          {/* UMKM */}
          <Link href="/umkm" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <Image 
              src="/assets/images/umkm-cover.jpg" 
              alt="UMKM Desa Purbayani" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <span className="text-xs text-yellow-400 font-bold uppercase tracking-widest block mb-2">Ekonomi Kreatif</span>
              <h3 className="text-2xl font-bold mb-2">Direktori UMKM</h3>
              <p className="text-slate-200 text-xs font-light line-clamp-2">Pemberdayaan gula semut aren khas kehutanan, anyaman pandan, dan kuliner laut.</p>
            </div>
          </Link>

          {/* Profil */}
          <Link href="/profil" className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <Image 
              src="/assets/images/profil-cover.jpg" 
              alt="Profil Desa Purbayani" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <span className="text-xs text-blue-400 font-bold uppercase tracking-widest block mb-2">Informasi Publik</span>
              <h3 className="text-2xl font-bold mb-2">Profil & Layanan Desa</h3>
              <p className="text-slate-200 text-xs font-light line-clamp-2">Struktur perangkat desa, program pemberdayaan, data statistik kependudukan, dan sejarah desa.</p>
            </div>
          </Link>

          {/* Berita */}
          <Link href="/berita" className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <Image 
              src="/assets/images/berita-cover.jpg" 
              alt="Berita Desa Purbayani" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
              <h4 className="text-lg font-bold mb-1">Kabar Desa & Berita</h4>
              <p className="text-xs text-slate-300">Agenda pesta laut syukur nelayan, program kerja, dan info wisata.</p>
            </div>
          </Link>

          {/* Fasilitas */}
          <Link href="/fasilitas" className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <Image 
              src="/assets/images/fasilitas-cover.jpg" 
              alt="Fasilitas Publik Desa Purbayani" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
              <h4 className="text-lg font-bold mb-1">Fasilitas Publik & Keamanan</h4>
              <p className="text-xs text-slate-300">Posko evakuasi bencana tsunami, klinik kesehatan desa, dan rute evakuasi.</p>
            </div>
          </Link>

          {/* Usaha Lokal */}
          <Link href="/umkm" className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <Image 
              src="/assets/images/usaha-cover.jpg" 
              alt="Usaha Lokal Desa Purbayani" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition duration-700" 
            />
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
            <MapClient 
              wisataList={wisataList}
              umkmList={umkmList}
              fasilitasList={fasilitasList}
            />
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
              <PanoramaClient imageSrc="/panorama/pantai-360.jpg" title="Pantai Purbayani" />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}