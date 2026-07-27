'use client';

import { Trash2 } from 'lucide-react';
import { deleteWisata } from '@/app/admin/actions';

interface DeleteButtonWisataProps {
  id: string;
  nama: string;
}

export default function DeleteButtonWisata({ id, nama }: DeleteButtonWisataProps) {
  const handleDelete = async () => {
    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus "${nama}"?`);
    if (confirmed) {
      await deleteWisata(id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
      title="Hapus Data"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}