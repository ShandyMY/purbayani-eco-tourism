'use client';

import { motion } from 'framer-motion';
import { Navigation, Eye } from 'lucide-react';

export default function HomeHeroClient() {
  const scrollToPeta = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById('peta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
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
  );
}