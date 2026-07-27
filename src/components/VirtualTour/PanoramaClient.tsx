'use client';

import dynamic from 'next/dynamic';

const DynamicPanorama = dynamic(() => import('./PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full flex flex-col items-center justify-center bg-slate-900 rounded-[32px] border border-slate-800 animate-pulse">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mb-3" />
      <p className="text-sm text-slate-400 font-medium">Menginisialisasi Virtual Tour 360°...</p>
    </div>
  ),
});

interface PanoramaClientProps {
  imageSrc: string;
  title: string;
}

export default function PanoramaClient({ imageSrc, title }: PanoramaClientProps) {
  return <DynamicPanorama imageSrc={imageSrc} title={title} />;
}