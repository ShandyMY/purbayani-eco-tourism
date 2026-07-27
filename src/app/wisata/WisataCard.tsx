'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Ticket, ImageOff, Navigation, X } from 'lucide-react';

interface WisataItem {
  id: string;
  nama: string;
  deskripsi: string | null;
  kategori: string | null;
  gambar: string | null;
  jamOperasional: string | null;
  hargaTiket: string | null;
  latitude: number | null;
  longitude: number | null;
}

export default function WisataCard({ item }: { item: WisataItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Kartu Wisata */}
      <div
        onClick={() => setIsOpen(true)}
        className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
      >
        <div>
          {/* Image & Category Overlay */}
          <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
            {item.gambar ? (
              <Image
                src={item.gambar}
                alt={item.nama}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 text-xs gap-2">
                <ImageOff className="w-8 h-8 stroke-1" />
                <span>Foto Tidak Tersedia</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-md text-emerald-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-emerald-100">
                {item.kategori || 'Destinasi Wisata'}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-3">
            <h2 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
              {item.nama}
            </h2>
            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
              {item.deskripsi}
            </p>
          </div>
        </div>

        {/* Footer Meta & Button */}
        <div className="p-6 bg-slate-50/80 border-t border-slate-100/80 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            {item.jamOperasional && (
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-100">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item.jamOperasional}</span>
              </div>
            )}
            {item.hargaTiket && (
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-100">
                <Ticket className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate font-semibold">{item.hargaTiket}</span>
              </div>
            )}
          </div>

          {item.latitude && item.longitude && (
            <a
              href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()} // Mencegah pop-up terbuka saat menekan button ini
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Arah (Google Maps)</span>
            </a>
          )}
        </div>
      </div>

      {/* Pop Up / Modal Detail */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col relative animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="h-64 md:h-80 w-full bg-slate-100 relative shrink-0">
              {item.gambar ? (
                <Image
                  src={item.gambar}
                  alt={item.nama}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 text-sm gap-2">
                  <ImageOff className="w-10 h-10 stroke-1" />
                  <span>Foto Tidak Tersedia</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-emerald-100">
                  {item.kategori || 'Destinasi Wisata'}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  {item.nama}
                </h2>
                <div className="flex flex-wrap gap-3 mt-4 text-xs font-medium text-slate-600">
                  {item.jamOperasional && (
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>{item.jamOperasional}</span>
                    </div>
                  )}
                  {item.hargaTiket && (
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <Ticket className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-slate-800">{item.hargaTiket}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Deskripsi Wisata</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.deskripsi || 'Tidak ada deskripsi detail untuk destinasi wisata ini.'}
                </p>
              </div>

              {item.latitude && item.longitude && (
                <div className="pt-2">
                  <a
                    href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Petunjuk Arah (Google Maps)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}