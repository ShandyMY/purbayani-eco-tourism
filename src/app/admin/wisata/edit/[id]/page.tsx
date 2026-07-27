import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditWisataClient from './EditWisataClient';

interface EditWisataPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWisataPage({ params }: EditWisataPageProps) {
  const { id } = await params;

  // Ambil data dari database menggunakan Prisma
  const wisata = await prisma.wisata.findUnique({
    where: { id },
  });

  // Jika data tidak ditemukan di database, tampilkan halaman 404
  if (!wisata) {
    notFound();
  }

  // Lempar data ke Client Component
  return <EditWisataClient wisata={wisata} />;
}