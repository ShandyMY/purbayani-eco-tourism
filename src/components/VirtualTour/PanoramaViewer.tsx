'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, RotateCw } from 'lucide-react';

export default function PanoramaViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isActivated || !containerRef.current) return;

    let viewerInstance: any = null;

    const initViewer = async () => {
      setIsLoading(true);
      try {
        // Dynamic import library 3D hanya saat dibutuhkan
        const { Viewer } = await import('@photo-sphere-viewer/core');
        await import('@photo-sphere-viewer/core/index.css');

        if (containerRef.current) {
          viewerInstance = new Viewer({
            container: containerRef.current,
            // Menunjuk langsung ke folder public/panorama/pantai-360.jpg
            panorama: '/panorama/pantai-360.jpg',
            caption: 'Pantai Purbayani Garut - Virtual Tour 360°',
            loadingTxt: 'Menyiapkan pemandangan virtual...',
            defaultZoomLvl: 30,
            touchmoveTwoFingers: true,
            mousewheelCtrlKey: false,
          });
        }
      } catch (error) {
        console.error('Gagal memuat Virtual Tour:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initViewer();

    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, [isActivated]);

  if (!isActivated) {
    return (
      <div className="w-full">
        {/* Placeholder dengan background dari /panorama/pantai-360.jpg */}
        <div 
          className="w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center bg-cover bg-center border border-slate-200 shadow-md group cursor-pointer"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('/panorama/pantai-360.jpg')"
          }}
          onClick={() => setIsActivated(true)}
        >
          <div className="bg-teal-500 text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition duration-300">
            <Play className="w-6 h-6 fill-white translate-x-0.5" />
          </div>
          <h4 className="text-white font-semibold text-lg mt-4 px-4 text-center">Mulai Wisata Virtual 360°</h4>
          <p className="text-slate-300 text-xs mt-1 px-4 text-center">Klik untuk memuat penjelajah interaktif tanpa membebani halaman</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 rounded-2xl z-10">
          <RotateCw className="w-8 h-8 text-teal-400 animate-spin mb-3" />
          <p className="text-sm text-slate-300">Memuat modul 360°...</p>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden shadow-inner bg-slate-900 border border-slate-200"
      />
      <p className="text-center text-xs text-slate-400 mt-3 italic">
        *Gunakan mouse atau geser layar ponsel untuk rotasi foto 360°
      </p>
    </div>
  );
}