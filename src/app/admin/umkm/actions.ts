'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function createUmkm(formData: FormData) {
  let isSuccess = false;

  try {
    const nama = formData.get('nama') as string;
    const kategori = formData.get('kategori') as string;
    const kontak = formData.get('kontak') as string;
    const latRaw = formData.get('latitude') as string;
    const lngRaw = formData.get('longitude') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const gambarFile = formData.get('gambar') as File | null;

    let gambarUrl: string | null = null;

    // Proses Simpan Gambar jika file diunggah
    if (gambarFile && gambarFile.size > 0 && gambarFile.name !== 'undefined') {
      const bytes = await gambarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Buat direktori public/uploads jika belum ada
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      // Buat nama file unik
      const uniqueFileName = `${Date.now()}-${gambarFile.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, uniqueFileName);

      // Tulis file ke direktori disk
      await writeFile(filePath, buffer);
      gambarUrl = `/uploads/${uniqueFileName}`;
    }

    // Parsing koordinat
    const latitude = latRaw ? parseFloat(latRaw) : null;
    const longitude = lngRaw ? parseFloat(lngRaw) : null;

    // Simpan ke Prisma Database
    await prisma.umkm.create({
      data: {
        nama,
        kategori,
        kontak: kontak || null,
        gambar: gambarUrl, // Berupa string URL path, BUKAN objek File
        latitude,
        longitude,
        deskripsi: deskripsi || null,
      },
    });

    revalidatePath('/admin/umkm');
    revalidatePath('/umkm');
    isSuccess = true;
  } catch (error) {
    console.error('Error saat membuat UMKM:', error);
    throw error;
  }

  // Penting: Redirect dipanggil di luar try-catch
  if (isSuccess) {
    redirect('/admin/umkm');
  }
}