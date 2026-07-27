'use client';

import { useState, ChangeEvent, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Image as ImageIcon, Compass } from 'lucide-react';
import { createWisata } from '@/app/admin/actions';

const KATEGORI_OPTIONS = [
  'Wisata Alam',
  'Wisata Air & Pantai',
  'Wisata Religi',
  'Wisata Budaya & Edukasi',
  'Kuliner & Rekreasi',
  'Spot Foto & Selfie',
];

export default function TambahWisataPage() {
  const [selectedKategori, setSelectedKategori] = useState<string>(KATEGORI_OPTIONS[0]);
  
  // State untuk Gambar Utama
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State untuk File Virtual Tour / Panorama (.jpg/.png/.zip)
  const [vtPreviewName, setVtPreviewName] = useState<string | null>(null);
  const [selectedVtFile, setSelectedVtFile] = useState<File | null>(null);
  const vtInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleVtChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVtFile(file);
      setVtPreviewName(file.name);
    }
  };

  const handleRemoveVt = () => {
    setSelectedVtFile(null);
    setVtPreviewName(null);
    if (vtInputRef.current) {
      vtInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/wisata"
          className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tambah Destinasi Wisata Baru</h1>
          <p className="text-xs text-slate-500">Isi formulir untuk menambahkan lokasi wisata dan virtual tour.</p>
        </div>
      </div>

      <form 
        action={createWisata} 
        className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Destinasi Wisata *</label>
          <input
            type="text"
            name="nama"
            required
            placeholder="Contoh: Curug Cikaso / Pantai Santolo"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Pilihan Kategori */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Pilih Kategori Wisata *</label>
          <input type="hidden" name="kategori" value={selectedKategori} />

          <div className="flex flex-wrap gap-2">
            {KATEGORI_OPTIONS.map((kat) => {
              const isSelected = selectedKategori === kat;
              return (
                <button
                  key={kat}
                  type="button"
                  onClick={() => setSelectedKategori(kat)}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Lokasi / Alamat</label>
            <input
              type="text"
              name="lokasi"
              placeholder="Contoh: Desa Sukamenak"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Harga Tiket Masuk</label>
            <input
              type="text"
              name="hargaTiket"
              placeholder="Contoh: Rp10.000 / Gratis"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Jam Operasional</label>
          <input
            type="text"
            name="jamOperasional"
            placeholder="Contoh: 08.00 - 17.00 WIB"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Input & Preview Gambar Utama */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Upload Foto Utama Destinasi</label>
          
          <input
            ref={fileInputRef}
            type="file"
            name="gambarFile"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {!previewUrl ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 text-center transition bg-slate-50/50 hover:bg-slate-50"
            >
              <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
                <Upload className="w-6 h-6 text-emerald-600" />
                <span className="text-xs font-medium">Klik untuk memilih foto utama</span>
                <span className="text-[10px] text-slate-400">Format: JPG, PNG, WEBP</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                <img src={previewUrl} alt="Preview Foto Wisata" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-slate-500 text-xs">
                <span className="flex items-center gap-1.5 truncate">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedFile?.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input File Virtual Tour / Panorama 360 */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Upload File Virtual Tour / Panorama (360°)</label>
          
          <input
            ref={vtInputRef}
            type="file"
            name="virtualTourFile"
            accept="image/*,.zip"
            onChange={handleVtChange}
            className="hidden"
          />

          {!vtPreviewName ? (
            <div 
              onClick={() => vtInputRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl p-5 text-center transition bg-slate-50/50 hover:bg-slate-50"
            >
              <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
                <Compass className="w-6 h-6 text-sky-600" />
                <span className="text-xs font-medium">Klik untuk upload file panorama / virtual tour</span>
                <span className="text-[10px] text-slate-400">Format: Foto Panorama (Equirectangular 360°) atau arsip aset</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-sky-50 border border-sky-200 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-sky-900 font-medium truncate">
                <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="truncate">{vtPreviewName}</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveVt}
                className="p-1 text-slate-400 hover:text-red-600 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
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
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Lengkap Wisata</label>
          <textarea
            name="deskripsi"
            rows={4}
            placeholder="Ceritakan keindahan dan daya tarik destinasi ini..."
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-md cursor-pointer"
        >
          Simpan Data Wisata
        </button>
      </form>
    </div>
  );
}