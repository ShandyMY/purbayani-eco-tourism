'use client';

import { useState, ChangeEvent, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import { createUmkm } from '@/app/admin/actions';

const KATEGORI_OPTIONS = [
  'Toko Baju',
  'Kuliner',
  'Warung Kelontong & Warmindo',
  'Warung Kelontong',
  'Warung Ikan',
  'Penginapan',
  'Pasar Ikan',
  'Kuliner & Penginapan',
  'Kriya Kerajinan',
  'Jasa & Kuliner',
  'Jasa',
  'Hiburan (Karaoke)',
];

export default function TambahUmkmPage() {
  const [selectedKategori, setSelectedKategori] = useState<string>(KATEGORI_OPTIONS[0]);
  const [isCustomKategori, setIsCustomKategori] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/umkm"
          className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tambah UMKM Baru</h1>
          <p className="text-xs text-slate-500">Isi formulir untuk menambahkan produk/usaha warga.</p>
        </div>
      </div>

      <form 
        action={createUmkm} 
        encType="multipart/form-data"
        className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Usaha / Produk *</label>
          <input
            type="text"
            name="nama"
            required
            placeholder="Contoh: Keripik Pisang Garut"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Pilihan Kategori Interaktif (Button Pills + Lainnya) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Pilih Kategori UMKM *</label>
          
          <input type="hidden" name="kategori" value={selectedKategori} />

          <div className="flex flex-wrap gap-2 mb-3">
            {KATEGORI_OPTIONS.map((kat) => {
              const isSelected = selectedKategori === kat && !isCustomKategori;
              return (
                <button
                  key={kat}
                  type="button"
                  onClick={() => {
                    setSelectedKategori(kat);
                    setIsCustomKategori(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {kat}
                </button>
              );
            })}
          </div>

          {isCustomKategori && (
            <input
              type="text"
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              placeholder="Ketik nama kategori baru..."
              required
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Kontak / No. WhatsApp</label>
          <input
            type="text"
            name="kontak"
            placeholder="Contoh: 081234567890"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Input & Preview Gambar */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Upload Foto UMKM / Produk</label>
          
          <input
            ref={fileInputRef}
            type="file"
            name="gambar"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {!previewUrl ? (
            <div 
              onClick={handleBoxClick}
              className="cursor-pointer border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 text-center transition bg-slate-50/50 hover:bg-slate-50"
            >
              <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
                <Upload className="w-6 h-6 text-emerald-600" />
                <span className="text-xs font-medium">Klik untuk memilih foto produk</span>
                <span className="text-[10px] text-slate-400">Format: JPG, PNG, WEBP (Maks. 5MB)</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Preview Foto UMKM"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition cursor-pointer"
                  title="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-slate-500 text-xs">
                <span className="flex items-center gap-1.5 truncate">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedFile?.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Latitude</label>
            <input
              type="text"
              name="latitude"
              placeholder="-7.5332"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Longitude</label>
            <input
              type="text"
              name="longitude"
              placeholder="107.4795"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Produk / Usaha</label>
          <textarea
            name="deskripsi"
            rows={4}
            placeholder="Jelaskan keunggulan produk atau lokasi usaha..."
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-md cursor-pointer"
        >
          Simpan Data UMKM
        </button>
      </form>
    </div>
  );
}