'use client';

import { useState } from 'react';
import { MapPin, MousePointerClick } from 'lucide-react';
import dynamic from 'next/dynamic';

// Memuat ActualMap hanya ketika isLoaded bernilai true
const LazyLeafletMap = dynamic(() => import('./ActualMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent mb-3" />
      <p className="text-sm text-slate-500 font-medium animate-pulse">Menghubungkan GPS & data rute...</p>
    </div>
  )
});

export default function MapContainer() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-50">
      {!isLoaded ? (
        // Placeholder Peta Ringan (Tanpa beban load jaringan tile OpenStreetMap)
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 cursor-pointer group p-6 text-center"
          onClick={() => setIsLoaded(true)}
        >
          <div className="bg-teal-500 text-white p-4 rounded-full shadow-md group-hover:scale-110 transition duration-300 mb-4">
            <MapPin className="w-7 h-7" />
          </div>
          <h4 className="text-slate-800 font-semibold text-lg">Buka Peta Interaktif Purbayani</h4>
          <p className="text-slate-500 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
            Klik untuk mengaktifkan navigasi peta, melacak titik penginapan, kuliner, dan pantai terdekat.
          </p>
          <button className="mt-5 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-full flex items-center gap-2 hover:bg-slate-800 transition">
            <MousePointerClick className="w-4 h-4" />
            Aktifkan Navigasi Peta
          </button>
        </div>
      ) : (
        <LazyLeafletMap />
      )}
    </div>
  );
}