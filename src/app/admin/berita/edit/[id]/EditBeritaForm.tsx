'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { updateBerita } from '@/app/admin/actions';

interface BeritaProps {
  berita: {
    id: string;
    judul: string;
    kategori: string;
    ringkasan: string | null;
    isi: string;
    gambar: string | null;
    tanggal: Date;
  };
}

export default function EditBeritaForm({ berita }: BeritaProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.append('id', berita.id);

    try {
      const res = await updateBerita(formData);
      if (res && res.error) {
        setError(res.error);
      } else {
        router.push('/admin/berita');
        router.refresh();
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memperbarui berita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/admin/berita" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Manajemen Berita
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Edit Berita & Kegiatan</h1>
          <p className="text-xs text-slate-500 mt-1">Perbarui informasi dan konten berita desa.</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-600 text-xs font-medium border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
          {/* Judul */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Judul Berita</label>
            <input
              type="text"
              name="judul"
              defaultValue={berita.judul}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kategori */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Kategori</label>
              <select
                name="kategori"
                defaultValue={berita.kategori}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition bg-white"
              >
                <option value="pembangunan">Pembangunan</option>
                <option value="kegiatan">Kegiatan</option>
                <option value="pengumuman">Pengumuman</option>
                <option value="kesehatan">Kesehatan</option>
              </select>
            </div>

            {/* Tanggal */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tanggal Publikasi</label>
              <input
                type="date"
                name="tanggal"
                defaultValue={new Date(berita.tanggal).toISOString().split('T')[0]}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Ringkasan */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ringkasan Singkat (Opsional)</label>
            <textarea
              name="ringkasan"
              rows={2}
              defaultValue={berita.ringkasan || ''}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
            />
          </div>

          {/* Isi Berita */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Isi Berita Lengkap</label>
            <textarea
              name="isi"
              rows={6}
              defaultValue={berita.isi}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>

          {/* Upload Gambar */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ganti Gambar Utama (Opsional)</label>
            {berita.gambar && (
              <div className="mb-2">
                <img src={berita.gambar} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-slate-200" />
              </div>
            )}
            <div className="flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <Upload className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="file"
                name="gambar"
                accept="image/*"
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition cursor-pointer"
              />
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/admin/berita"
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Menyimpan...' : 'Perbarui Berita'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}