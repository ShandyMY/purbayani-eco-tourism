import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditBeritaForm from './EditBeritaForm';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const berita = await prisma.berita.findUnique({
    where: { id },
  });

  if (!berita) {
    notFound();
  }

  // Format data agar aman dikirim ke Client Component
  const formattedBerita = {
    ...berita,
    tanggal: berita.tanggal ? new Date(berita.tanggal) : new Date(),
  };

  return <EditBeritaForm berita={formattedBerita} />;
}