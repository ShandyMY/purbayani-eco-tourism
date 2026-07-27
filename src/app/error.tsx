'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-20">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center space-y-4">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Gagal Memuat Data</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Terjadi kendala saat menghubungkan ke server atau memuat data Desa Purbayani. Silakan coba muat ulang halaman.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Coba Lagi</span>
        </button>
      </div>
    </div>
  );
}