'use client';

import { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Tipe Data dari Prisma Database
export interface WisataItem {
  id: string;
  nama: string;
  deskripsi: string;
  hargaTiket?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface UmkmItem {
  id: string;
  nama: string;
  deskripsi?: string | null;
  kontak?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface FasilitasItem {
  id: string;
  nama: string;
  kategori?: string | null;
  deskripsi: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface MapContainerProps {
  wisataList?: WisataItem[];
  umkmList?: UmkmItem[];
  fasilitasList?: FasilitasItem[];
}

// Custom Marker Icon Berdasarkan Kategori
const getMarkerIcon = (category: string) => {
  let color = 'bg-teal-500';
  if (category === 'wisata') color = 'bg-emerald-500';
  if (category === 'umkm') color = 'bg-amber-500';
  if (category === 'Administrasi' || category === 'Kesehatan' || category === 'Keamanan' || category === 'fasilitas') {
    color = 'bg-sky-500';
  }

  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-6 h-6 rounded-full ${color} border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">📍</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  });
};

export default function MapContainer({
  wisataList = [],
  umkmList = [],
  fasilitasList = []
}: MapContainerProps) {
  // Koordinat Pusat Desa Purbayani
  const centerPosition: [number, number] = [-7.5385, 107.5124];
  const [activeFilter, setActiveFilter] = useState<'semua' | 'wisata' | 'umkm' | 'fasilitas'>('semua');

  // Filter HANYA data yang memiliki nilai koordinat valid (latitude & longitude tidak null)
  const validWisata = wisataList.filter((item) => item.latitude != null && item.longitude != null);
  const validUmkm = umkmList.filter((item) => item.latitude != null && item.longitude != null);
  const validFasilitas = fasilitasList.filter((item) => item.latitude != null && item.longitude != null);

  return (
    <div className="w-full h-[550px] flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-sm border border-slate-100">
      
      {/* Sidebar Legenda & Filter */}
      <div className="w-full md:w-80 bg-slate-900 text-white p-6 flex flex-col justify-between z-[99]">
        <div>
          <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest block mb-1">
            Gis Pemetaan
          </span>
          <h3 className="text-xl font-bold tracking-tight mb-4 text-white">
            Legenda Potensi
          </h3>
          
          <div className="flex flex-col gap-2.5">
            {[
              { id: 'semua', label: 'Semua Lokasi', color: 'border-teal-500/20' },
              { id: 'wisata', label: 'Destinasi Wisata 🌴', color: 'border-emerald-500/30' },
              { id: 'umkm', label: 'UMKM Kreatif 🍯', color: 'border-amber-500/30' },
              { id: 'fasilitas', label: 'Fasilitas Umum 🏥', color: 'border-sky-500/30' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveFilter(item.id as any)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                  activeFilter === item.id 
                    ? 'bg-teal-600 text-white border-transparent shadow-md' 
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 ' + item.color
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 mt-6 leading-relaxed">
          *Peta interaktif ini dirancang untuk menunjukkan tata letak, koordinat, dan fungsi akses wilayah strategis di Desa Purbayani.
        </p>
      </div>

      {/* Peta OpenStreetMap Canvas */}
      <div className="flex-1 relative h-[350px] md:h-full">
        <LeafletMap center={centerPosition} zoom={14} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker Wisata dari Database */}
          {(activeFilter === 'semua' || activeFilter === 'wisata') && validWisata.map((item) => (
            <Marker key={`wisata-${item.id}`} position={[item.latitude!, item.longitude!]} icon={getMarkerIcon('wisata')}>
              <Popup>
                <div className="p-2 min-w-[220px]">
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Wisata</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1.5 mb-0">{item.nama}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.deskripsi}</p>
                  {item.hargaTiket && (
                    <span className="text-[11px] font-bold text-slate-700 block mt-2">Tiket: {item.hargaTiket}</span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Marker UMKM dari Database */}
          {(activeFilter === 'semua' || activeFilter === 'umkm') && validUmkm.map((item) => (
            <Marker key={`umkm-${item.id}`} position={[item.latitude!, item.longitude!]} icon={getMarkerIcon('umkm')}>
              <Popup>
                <div className="p-2 min-w-[220px]">
                  <span className="bg-amber-50 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">UMKM Desa</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1.5 mb-0">{item.nama}</h4>
                  {item.deskripsi && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.deskripsi}</p>
                  )}
                  {item.kontak && (
                    <span className="text-[11px] font-bold text-slate-700 block mt-2">Hubungi: {item.kontak}</span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Marker Fasilitas Publik dari Database */}
          {(activeFilter === 'semua' || activeFilter === 'fasilitas') && validFasilitas.map((item) => (
            <Marker key={`fasilitas-${item.id}`} position={[item.latitude!, item.longitude!]} icon={getMarkerIcon(item.kategori || 'fasilitas')}>
              <Popup>
                <div className="p-2 min-w-[220px]">
                  <span className="bg-sky-50 text-sky-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">{item.kategori || 'Fasilitas'}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1.5 mb-0">{item.nama}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.deskripsi}</p>
                </div>
              </Popup>
            </Marker>
          ))}

        </LeafletMap>
      </div>
    </div>
  );
}