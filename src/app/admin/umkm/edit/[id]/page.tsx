import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import UmkmFormClient from '../../[id]/UmkmFormClient'; // Sesuaikan path ini jika berbeda
import { updateUmkm } from '@/app/admin/actions';

export const revalidate = 0;

interface EditUmkmPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUmkmPage({ params }: EditUmkmPageProps) {
  const { id } = await params;
  
  // Mengambil data dengan aman
  const umkmModel = (prisma as any).umkm || (prisma as any).UMKM || (prisma as any).Umkm;
  const umkm = umkmModel ? await umkmModel.findUnique({
    where: { id },
  }) : null;

  if (!umkm) {
    notFound();
  }

  // Bind ID ke Server Action agar otomatis menyertakan ID saat form disubmit
  const updateActionWithId = updateUmkm.bind(null, id);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 md:p-12">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/umkm"
          className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Edit Data UMKM</h1>
          <p className="text-xs text-slate-500">Perbarui informasi UMKM: {umkm.nama}</p>
        </div>
      </div>

      {/* Gunakan prop 'umkm' dan 'formAction' sesuai dengan definisi di UmkmFormClient */}
      <UmkmFormClient umkm={umkm} formAction={updateActionWithId} />
    </div>
  );
}