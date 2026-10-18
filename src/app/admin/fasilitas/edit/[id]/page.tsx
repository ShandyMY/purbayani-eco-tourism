import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { updateFasilitas } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function EditFasilitasPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const fasilitas = await prisma.fasilitas.findUnique({
    where: { id },
  });

  if (!fasilitas) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateFasilitas(formData);
    redirect('/admin/fasilitas');
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/admin/fasilitas" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Manajemen Fasilitas & Usaha
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Edit Fasilitas / Usaha</h1>
          <p className="text-xs text-slate-500 mt-1">Perbarui informasi fasilitas umum atau unit usaha desa.</p>
        </div>

        <form action={handleUpdate} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-5">
          <input type="hidden" name="id" value={fasilitas.id} />

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Nama Fasilitas / Usaha <span className="text-rose-500">*</span></label>
            <input
              type="text"
              name="nama"
              defaultValue={fasilitas.nama}
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Kategori <span className="text-rose-500">*</span></label>
              <select
                name="kategori"
                defaultValue={fasilitas.kategori ?? ''}
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
                defaultValue={fasilitas.kontak || ''}
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
                defaultValue={fasilitas.alamat || ''}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Jam Operasional</label>
              <input
                type="text"
                name="jam_operasional"
                defaultValue={fasilitas.jamOperasional || ''}
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
                defaultValue={fasilitas.latitude !== null ? String(fasilitas.latitude) : ''}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Longitude (Koordinat)</label>
              <input
                type="number"
                step="any"
                name="longitude"
                defaultValue={fasilitas.longitude !== null ? String(fasilitas.longitude) : ''}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Upload Foto / Gambar (Menggantikan input URL) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Foto / Gambar</label>
            <div className="flex items-center gap-4">
              {fasilitas.gambar && (
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                  <img src={fasilitas.gambar} alt="Current" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  name="gambar"
                  accept="image/*"
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400 mt-1">Biarkan kosong jika tidak ingin mengubah foto.</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Deskripsi <span className="text-rose-500">*</span></label>
            <textarea
              name="deskripsi"
              defaultValue={fasilitas.deskripsi}
              rows={4}
              required
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
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}