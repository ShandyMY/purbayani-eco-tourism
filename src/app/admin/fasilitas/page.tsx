import Link from 'next/link';
import { Plus, ArrowLeft, Building2, Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import DeleteFasilitasButton from './_components/DeleteFasilitasButton'; // Kita buatkan tombol hapus terpisah karena ini Server Component

export const dynamic = 'force-dynamic';

export default async function AdminFasilitasListPage() {
  // Mengambil data langsung dari Prisma Database
  const dataFasilitas = await prisma.fasilitas.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <Link href="/admin" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard Admin
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">Manajemen Fasilitas & Usaha Desa</h1>
          </div>
          <Link
            href="/admin/fasilitas/tambah"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Fasilitas / Usaha</span>
          </Link>
        </div>

        {/* Tabel Data */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-4 pl-6">Nama Fasilitas / Usaha</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Alamat / Lokasi</th>
                  <th className="p-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dataFasilitas.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-400">
                      Belum ada data fasilitas & usaha. Silakan tambah data baru.
                    </td>
                  </tr>
                ) : (
                  dataFasilitas.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-slate-900 text-sm">{item.nama}</div>
                        <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5 max-w-xs">
                          {item.deskripsi}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-md font-semibold">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {item.alamat || '-'}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/fasilitas/edit/${item.id}`}
                            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-xl transition"
                            title="Edit Data"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          {/* Komponen kecil untuk tombol hapus interaktif */}
                          <DeleteFasilitasButton id={item.id} nama={item.nama} />
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