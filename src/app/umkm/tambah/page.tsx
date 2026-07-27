import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { createUmkm } from '../../actions';

export default function TambahUmkmPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <Link href="/admin/umkm" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Batal & Kembali
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Tambah Data UMKM Baru</h1>
        </div>

        <form action={createUmkm} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Nama Usaha / Usaha Warga *</label>
            <input
              type="text"
              name="nama"
              required
              placeholder="Contoh: Olahan Ikan Asin Purbayani"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Kategori *</label>
              <input
                type="text"
                name="kategori"
                required
                placeholder="Kuliner / Kerajinan / Pertanian"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">No. WhatsApp / Kontak</label>
              <input
                type="text"
                name="kontak"
                placeholder="081234567890"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">URL Gambar / Path Gambar</label>
            <input
              type="text"
              name="gambar"
              placeholder="/images/umkm/produk.jpg atau URL Unsplash"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Latitude (Koordinat G-Maps)</label>
              <input
                type="text"
                name="latitude"
                placeholder="-7.5332"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Longitude (Koordinat G-Maps)</label>
              <input
                type="text"
                name="longitude"
                placeholder="107.4795"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Deskripsi Produk / Usaha *</label>
            <textarea
              name="deskripsi"
              rows={4}
              required
              placeholder="Jelaskan produk unggulan atau layanan usaha ini..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Data UMKM</span>
          </button>
        </form>
      </div>
    </div>
  );
}