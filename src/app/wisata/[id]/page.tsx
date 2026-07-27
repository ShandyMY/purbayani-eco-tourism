import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Ticket, Navigation } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import PanoramaViewer from '@/components/VirtualTour/PanoramaViewer';

interface WisataDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WisataDetailPage({ params }: WisataDetailPageProps) {
  const { id } = await params;
  
  const wisataModel = (prisma as any).wisata || (prisma as any).Wisata;
  const wisata = await wisataModel.findUnique({
    where: { id },
  });

  if (!wisata) {
    notFound();
  }

  const googleMapsUrl =
    wisata.latitude && wisata.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${wisata.latitude},${wisata.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wisata.nama)}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Header Image / Hero */}
      <div className="relative w-full h-[350px] md:h-[450px] bg-slate-900">
        <Image
          src={wisata.gambar || '/images/placeholder-wisata.jpg'}
          alt={wisata.nama}
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/wisata"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full text-xs font-semibold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali
          </Link>
        </div>

        <div className="absolute bottom-6 left-6 right-6 max-w-4xl mx-auto space-y-2">
          <span className="bg-teal-500 text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full">
            {wisata.kategori}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white">{wisata.nama}</h1>
          {wisata.lokasi && (
            <p className="text-xs md:text-sm text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{wisata.lokasi}</span>
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pt-8 space-y-8">
        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Harga Tiket</p>
              <p className="text-xs font-bold text-slate-800">{wisata.hargaTiket || 'Gratis / Sesuai Ketentuan'}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Jam Operasional</p>
              <p className="text-xs font-bold text-slate-800">{wisata.jamOperasional || 'Setiap Hari'}</p>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between transition group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-teal-100">Petunjuk Arah</p>
                <p className="text-xs font-bold">Buka Google Maps</p>
              </div>
            </div>
          </a>
        </div>

        {/* Deskripsi */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900">Tentang Destinasi</h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {wisata.deskripsi}
          </p>
        </div>

        {/* Panorama Viewer 360° */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Jelajahi Lokasi (Virtual Tour)</h2>
          <PanoramaViewer
            imageSrc={wisata.virtualTourUrl || '/panorama/pantai-360.jpg'}
            title={wisata.nama}
          />
        </div>
      </div>
    </div>
  );
}