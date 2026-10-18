import Link from 'next/link';
import { Plus, Edit, Newspaper, ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import DeleteBeritaButton from './DeleteBeritaButton';

export const dynamic = 'force-dynamic';

export default async function AdminBeritaPage() {
  const beritaList = await prisma.berita.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Back */}
        <div>
          <Link href="/admin" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard Admin
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Manajemen Berita & Kegiatan</h1>
              <p className="text-xs text-slate-500 mt-1">Kelola informasi, pengumuman, dan berita terbaru desa.</p>
            </div>
            <Link
              href="/admin/berita/tambah"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Berita Baru</span>
            </Link>
          </div>
        </div>

        {/* Tabel Data Berita */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Berita / Judul</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Penulis</th>
                  <th className="py-4 px-6">Tanggal</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {beritaList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <Newspaper className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      Belum ada berita atau kegiatan yang ditambahkan.
                    </td>
                  </tr>
                ) : (
                  beritaList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 flex items-center gap-3">
                        {item.gambar ? (
                          <img src={item.gambar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            📰
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{item.judul}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{item.ringkasan}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-600">{'Admin'}</td>
                      <td className="py-4 px-6 text-slate-500 text-[11px]">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/berita/edit/${item.id}`}
                            className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteBeritaButton id={item.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}