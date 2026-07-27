'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Phone, Pencil, AlertTriangle, Loader2 } from 'lucide-react';
import { deleteUmkm } from '@/app/admin/actions';

export default function AdminUmkmTable({ initialData }: { initialData: any[] }) {
  const [selectedDelete, setSelectedDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!selectedDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteUmkm(selectedDelete.id);
      if (res && res.success === false) {
        alert(res.error || 'Gagal menghapus data');
      } else {
        setSelectedDelete(null);
        window.location.reload();
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghapus data');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-bold">
              <tr>
                <th className="p-4 pl-6">Nama Usaha / Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Kontak / WA</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    Belum ada data UMKM yang tersimpan.
                  </td>
                </tr>
              ) : (
                initialData.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-slate-900 text-sm">{item.nama}</div>
                      <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5 max-w-xs">
                        {item.deskripsi}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md font-semibold">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      {item.kontak ? (
                        <div className="flex items-center gap-1 text-slate-700">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          {item.kontak}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Tombol Edit */}
                        <Link
                          href={`/admin/umkm/edit/${item.id}`}
                          className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-xl transition"
                          title="Edit Data"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>

                        {/* Tombol Hapus (Memicu Modal Pop-up) */}
                        <button
                          type="button"
                          onClick={() => setSelectedDelete(item)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL / POP-UP KONFIRMASI HAPUS */}
      {selectedDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">Hapus Data UMKM?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Apakah Anda yakin ingin menghapus <span className="font-semibold text-slate-800">"{selectedDelete.nama}"</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedDelete(null)}
                disabled={isDeleting}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  'Ya, Hapus'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}