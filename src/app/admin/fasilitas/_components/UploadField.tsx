'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function UploadField({ currentImage }: { currentImage: string | null }) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-700">Foto / Gambar</label>
      <div className="flex items-center gap-4">
        {previewImage ? (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
            <img src={previewImage} alt="Preview Baru" className="w-full h-full object-cover" />
          </div>
        ) : currentImage ? (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
            <img src={currentImage} alt="Current" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Upload className="w-6 h-6" />
          </div>
        )}

        <div className="flex-1">
          <input
            type="file"
            name="gambar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 mt-1">Biarkan kosong jika tidak ingin mengubah gambar.</p>
        </div>
      </div>
    </div>
  );
}