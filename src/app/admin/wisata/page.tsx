import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, MapPin, Clock, Ticket, Pencil } from 'lucide-react';
import DeleteButtonWisata from '@/app/admin/wisata/_components/DeleteButtonWisata';

export const revalidate = 0;

export default async function AdminWisataPage() {
  const dataWisata = await prisma.wisata.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kelola Destinasi Wisata</h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Tambah, edit, atau hapus destinasi wisata Desa Purbayani.
          </p>
        </div>
        <Link
          href="/admin/wisata/tambah"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Wisata</span>
        </Link>
      </div>

      {/* Tabel Data Wisata */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {dataWisata.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Belum ada data wisata. Silakan tambah data baru.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Nama Wisata</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Info Operasional</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {dataWisata.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        {item.gambar && (
                          <img
                            src={item.gambar}
                            alt={item.nama}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <span>{item.nama}</span>
                          {item.latitude && item.longitude && (
                            <span className="flex items-center gap-1 text-[10px] text-slate-400 font-normal mt-0.5">
                              <MapPin className="w-3 h-3" /> Ada Peta
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 space-y-1">
                      {item.jamOperasional && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{item.jamOperasional}</span>
                        </div>
                      )}
                      {item.hargaTiket && (
                        <div className="flex items-center gap-1">
                          <Ticket className="w-3 h-3 text-slate-400" />
                          <span>{item.hargaTiket}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/wisata/edit/${item.id}`}
                          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                          title="Edit Data"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        
                        {/* Komponen khusus client untuk tombol hapus & konfirmasi */}
                        <DeleteButtonWisata id={item.id} nama={item.nama} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}