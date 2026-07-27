'use client';

import dynamic from 'next/dynamic';
import { WisataItem, UmkmItem, FasilitasItem } from './MapContainer';

const DynamicMapContainer = dynamic(() => import('./MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full flex flex-col items-center justify-center bg-slate-50 rounded-[32px] border border-dashed border-slate-300 animate-pulse">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent mb-3" />
      <p className="text-sm text-slate-500 font-medium">Menyiapkan Peta Digital Desa...</p>
    </div>
  ),
});

interface MapClientProps {
  wisataList?: WisataItem[];
  umkmList?: UmkmItem[];
  fasilitasList?: FasilitasItem[];
}

export default function MapClient({ wisataList, umkmList, fasilitasList }: MapClientProps) {
  return (
    <DynamicMapContainer
      wisataList={wisataList}
      umkmList={umkmList}
      fasilitasList={fasilitasList}
    />
  );
}