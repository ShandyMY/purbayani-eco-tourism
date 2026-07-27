'use client';

import { Trash2 } from 'lucide-react';
import { deleteBerita } from '@/app/admin/actions';

export default function DeleteBeritaButton({ id }: { id: string }) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      await deleteBerita(id);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
        title="Hapus"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}