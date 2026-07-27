'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, PlusCircle, Upload } from 'lucide-react';
import { createFasilitas } from '@/app/admin/actions';

export default function TambahFasilitasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);

    try {
      const result = await createFasilitas(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        router.push('/admin/fasilitas');
        router.refresh();
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/admin/fasilitas" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Manajemen Fasilitas & Usaha
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Tambah Fasilitas / Usaha Baru</h1>
          <p className="text-xs text-slate-500 mt-1">Masukkan informasi detail fasilitas umum atau unit usaha desa.</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Nama Fasilitas / Usaha <span className="text-rose-500">*</span></label>
            <input
              type="text"
              name="nama"
              required
              placeholder="Contoh: BUMDes Sumber Makmur / Lapangan Desa"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Kategori <span className="text-rose-500">*</span></label>
              <select
                name="kategori"
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white transition"
              >
                <option value="">Pilih Kategori</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Olahraga & Seni">Olahraga & Seni</option>
                <option value="Keagamaan">Keagamaan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pemerintahan">Pemerintahan</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Kontak / No. Telepon / WhatsApp</label>
              <input
                type="text"
                name="kontak"
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Alamat</label>
              <input
                type="text"
                name="alamat"
                placeholder="Contoh: Dusun 1, RT 02 / RW 01"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Jam Operasional</label>
              <input
                type="text"
                name="jam_operasional"
                placeholder="Contoh: Senin - Jumat, 08:00 - 16:00"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Latitude (Koordinat)</label>
              <input
                type="number"
                step="any"
                name="latitude"
                placeholder="Contoh: -7.412345"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Longitude (Koordinat)</label>
              <input
                type="number"
                step="any"
                name="longitude"
                placeholder="Contoh: 108.123456"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Upload Foto dengan Preview Gambar */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Upload Foto / Gambar</label>
            <div className="flex items-center gap-4">
              {previewImage ? (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
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
                <p className="text-[11px] text-slate-400 mt-1">Format: JPG, PNG, atau WebP (Maks. beberapa MB)</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Deskripsi <span className="text-rose-500">*</span></label>
            <textarea
              name="deskripsi"
              rows={4}
              required
              placeholder="Tuliskan informasi lengkap mengenai fasilitas atau unit usaha ini..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
            ></textarea>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/admin/fasilitas"
              className="px-5 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Simpan Data</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}