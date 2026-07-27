import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, ArrowLeft } from 'lucide-react';
import AdminUmkmTable from './AdminUmkmTable';

export const revalidate = 0;

export default async function AdminUmkmListPage() {
  // Mengambil data langsung dari Prisma dengan aman (mengantisipasi perbedaan huruf kapital)
  const umkmModel = (prisma as any).umkm || (prisma as any).UMKM || (prisma as any).Umkm;
  const dataUmkm = umkmModel ? await umkmModel.findMany({
    orderBy: { createdAt: 'desc' },
  }) : [];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <Link href="/admin" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Kembalikan ke Dashboard Admin
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">Manajemen UMKM Desa</h1>
          </div>
          <Link
            href="/admin/umkm/tambah"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah UMKM Baru</span>
          </Link>
        </div>

        {/* Tabel Interaktif dengan Modal Hapus */}
        <AdminUmkmTable initialData={dataUmkm} />
      </div>
    </div>
  );
}