'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

// Fungsi helper untuk simpan berkas umum
async function saveUploadedFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || file.name === 'undefined') {
    return null;
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });

  const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadDir, uniqueFileName);

  await writeFile(filePath, buffer);
  return `/uploads/${uniqueFileName}`;
}

// Fungsi helper khusus untuk menyimpan file virtual tour/panorama ke folder /public/panorama/
async function savePanoramaFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || file.name === 'undefined') {
    return null;
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'panorama');
  await mkdir(uploadDir, { recursive: true });

  const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadDir, uniqueFileName);

  await writeFile(filePath, buffer);
  return `/panorama/${uniqueFileName}`;
}

// ==================== UMKM ACTIONS ====================

export async function createUmkm(formData: FormData) {
  try {
    const nama = formData.get('nama') as string;
    const kategori = formData.get('kategori') as string;
    const kontak = formData.get('kontak') as string;
    const latRaw = formData.get('latitude') as string;
    const lngRaw = formData.get('longitude') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const gambarFile = formData.get('gambar') as File | null;

    const gambarUrl = await saveUploadedFile(gambarFile);

    const latitude = latRaw ? parseFloat(latRaw) : null;
    const longitude = lngRaw ? parseFloat(lngRaw) : null;

    const umkmModel = (prisma as any).umkm || (prisma as any).UMKM || (prisma as any).Umkm;

    await umkmModel.create({
      data: {
        nama,
        kategori,
        kontak: kontak || null,
        gambar: gambarUrl,
        latitude,
        longitude,
        deskripsi: deskripsi || null,
      },
    });

    revalidatePath('/admin/umkm');
    revalidatePath('/umkm');
  } catch (error: any) {
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Error saat membuat UMKM:', error);
    throw error;
  }

  redirect('/admin/umkm');
}

export async function createOrUpdateUmkm(prevState: any, formData: FormData) {
  let shouldRedirect = false;

  try {
    const id = formData.get('id') as string | null;
    const nama = formData.get('nama') as string;
    const kategori = formData.get('kategori') as string;
    const kontak = formData.get('kontak') as string;
    const latRaw = formData.get('latitude') as string;
    const lngRaw = formData.get('longitude') as string;
    const deskripsi = formData.get('deskripsi') as string;
    
    const gambarFile = formData.get('gambar') as File | null;

    const latitude = latRaw ? parseFloat(latRaw) : null;
    const longitude = lngRaw ? parseFloat(lngRaw) : null;

    const umkmModel = (prisma as any).umkm || (prisma as any).UMKM || (prisma as any).Umkm;

    let gambarUrl = null;
    if (id) {
      const existing = await umkmModel.findUnique({ where: { id } });
      gambarUrl = existing?.gambar || null;
    }

    const newGambarUrl = await saveUploadedFile(gambarFile);
    if (newGambarUrl) {
      gambarUrl = newGambarUrl;
    }

    if (id) {
      await umkmModel.update({
        where: { id },
        data: {
          nama,
          kategori,
          kontak: kontak || null,
          gambar: gambarUrl,
          latitude,
          longitude,
          deskripsi: deskripsi || null,
        },
      });
    } else {
      await umkmModel.create({
        data: {
          nama,
          kategori,
          kontak: kontak || null,
          gambar: gambarUrl,
          latitude,
          longitude,
          deskripsi: deskripsi || null,
        },
      });
    }

    revalidatePath('/admin/umkm');
    revalidatePath('/umkm');
    shouldRedirect = true;
  } catch (error: any) {
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Error createOrUpdateUmkm:', error);
    return { error: error.message || 'Gagal menyimpan data UMKM' };
  }

  if (shouldRedirect) {
    redirect('/admin/umkm');
  }
}

export async function updateUmkm(id: string, formData: FormData) {
  if (!formData.has('id')) {
    formData.append('id', id);
  }
  return createOrUpdateUmkm(null, formData);
}

export async function deleteUmkm(id: string) {
  try {
    const umkmModel = (prisma as any).umkm || (prisma as any).UMKM || (prisma as any).Umkm;
    await umkmModel.delete({
      where: { id },
    });
    revalidatePath('/admin/umkm');
    revalidatePath('/umkm');
    return { success: true };
  } catch (error) {
    console.error('Error deleting UMKM:', error);
    return { success: false, error: 'Gagal menghapus UMKM' };
  }
}

// ==================== WISATA ACTIONS ====================

export async function createWisata(formData: FormData) {
  try {
    const nama = formData.get('nama') as string;
    const kategori = formData.get('kategori') as string;
    const lokasi = formData.get('lokasi') as string;
    const hargaTiket = formData.get('hargaTiket') as string;
    const jamOperasional = formData.get('jamOperasional') as string;
    const latRaw = formData.get('latitude') as string;
    const lngRaw = formData.get('longitude') as string;
    const deskripsi = formData.get('deskripsi') as string;

    const gambarFile = formData.get('gambarFile') as File | null;
    const virtualTourFile = formData.get('virtualTourFile') as File | null;

    const gambarUrl = await saveUploadedFile(gambarFile);
    const virtualTourUrl = await savePanoramaFile(virtualTourFile);

    const latitude = latRaw ? parseFloat(latRaw) : null;
    const longitude = lngRaw ? parseFloat(lngRaw) : null;

    const wisataModel = (prisma as any).wisata || (prisma as any).Wisata;

    await wisataModel.create({
      data: {
        nama,
        kategori: kategori || null,
        lokasi: lokasi || null,
        hargaTiket: hargaTiket || null,
        jamOperasional: jamOperasional || null,
        gambar: gambarUrl,
        virtualTourUrl: virtualTourUrl,
        latitude,
        longitude,
        deskripsi: deskripsi || null,
      },
    });

    revalidatePath('/admin/wisata');
    revalidatePath('/wisata');
  } catch (error: any) {
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Error saat membuat Wisata:', error);
    throw error;
  }

  redirect('/admin/wisata');
}

export async function createOrUpdateWisata(prevState: any, formData: FormData) {
  let shouldRedirect = false;

  try {
    const id = formData.get('id') as string | null;
    const nama = formData.get('nama') as string;
    const kategori = formData.get('kategori') as string;
    const lokasi = formData.get('lokasi') as string;
    const hargaTiket = formData.get('hargaTiket') as string;
    const jamOperasional = formData.get('jamOperasional') as string;
    const latRaw = formData.get('latitude') as string;
    const lngRaw = formData.get('longitude') as string;
    const deskripsi = formData.get('deskripsi') as string;
    
    const gambarFile = formData.get('gambarFile') as File | null;
    const oldGambarUrl = formData.get('gambar') as string;

    const virtualTourFile = formData.get('virtualTourFile') as File | null;
    const oldVirtualTourUrl = formData.get('virtualTourUrl') as string;

    const latitude = latRaw ? parseFloat(latRaw) : null;
    const longitude = lngRaw ? parseFloat(lngRaw) : null;

    let gambarUrl = await saveUploadedFile(gambarFile);
    if (!gambarUrl) {
      gambarUrl = oldGambarUrl || null;
    }

    let virtualTourUrl = await savePanoramaFile(virtualTourFile);
    if (!virtualTourUrl) {
      virtualTourUrl = oldVirtualTourUrl || null;
    }

    const wisataModel = (prisma as any).wisata || (prisma as any).Wisata;

    if (id) {
      await wisataModel.update({
        where: { id },
        data: {
          nama,
          kategori: kategori || null,
          lokasi: lokasi || null,
          hargaTiket: hargaTiket || null,
          jamOperasional: jamOperasional || null,
          gambar: gambarUrl,
          virtualTourUrl: virtualTourUrl,
          latitude,
          longitude,
          deskripsi: deskripsi || null,
        },
      });
    } else {
      await wisataModel.create({
        data: {
          nama,
          kategori: kategori || null,
          lokasi: lokasi || null,
          hargaTiket: hargaTiket || null,
          jamOperasional: jamOperasional || null,
          gambar: gambarUrl,
          virtualTourUrl: virtualTourUrl,
          latitude,
          longitude,
          deskripsi: deskripsi || null,
        },
      });
    }

    revalidatePath('/admin/wisata');
    revalidatePath('/wisata');
    shouldRedirect = true;
  } catch (error: any) {
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Error createOrUpdateWisata:', error);
    return { error: error.message || 'Gagal menyimpan data Wisata' };
  }

  if (shouldRedirect) {
    redirect('/admin/wisata');
  }
}

export async function updateWisata(id: string, formData: FormData) {
  if (!formData.has('id')) {
    formData.append('id', id);
  }
  return createOrUpdateWisata(null, formData);
}

export async function deleteWisata(id: string) {
  try {
    const wisataModel = (prisma as any).wisata || (prisma as any).Wisata;
    await wisataModel.delete({
      where: { id },
    });
    revalidatePath('/admin/wisata');
    revalidatePath('/wisata');
    return { success: true };
  } catch (error) {
    console.error('Error deleting Wisata:', error);
    return { success: false, error: 'Gagal menghapus Wisata' };
  }
}

// --- FASILITAS & USAHA ACTIONS ---

export async function createFasilitas(formData: FormData) {
  try {
    const nama = formData.get('nama') as string;
    const kategori = formData.get('kategori') as string;
    const alamat = formData.get('alamat') as string;
    const kontak = formData.get('kontak') as string;
    const jamOperasional = formData.get('jam_operasional') as string;
    const deskripsi = formData.get('deskripsi') as string;
    
    const rawLat = formData.get('latitude') as string;
    const rawLng = formData.get('longitude') as string;
    const latitude = rawLat ? parseFloat(rawLat) : null;
    const longitude = rawLng ? parseFloat(rawLng) : null;

    const file = formData.get('gambar') as File;
    let gambarPath = null;

    if (file && file.size > 0 && file.name !== 'undefined') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads/fasilitas');
      
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      gambarPath = `/uploads/fasilitas/${filename}`;
    }

    await prisma.fasilitas.create({
      data: {
        nama,
        kategori,
        alamat,
        kontak,
        jamOperasional,
        gambar: gambarPath,
        deskripsi,
        latitude,
        longitude,
      },
    });

    revalidatePath('/admin/fasilitas');
    return { success: true };
  } catch (error) {
    console.error('Gagal membuat fasilitas:', error);
    return { error: 'Gagal menyimpan data fasilitas ke database.' };
  }
}

export async function updateFasilitas(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const nama = formData.get('nama') as string;
    const kategori = formData.get('kategori') as string;
    const alamat = formData.get('alamat') as string;
    const kontak = formData.get('kontak') as string;
    const jamOperasional = formData.get('jam_operasional') as string;
    const deskripsi = formData.get('deskripsi') as string;
    
    const rawLat = formData.get('latitude') as string;
    const rawLng = formData.get('longitude') as string;
    const latitude = rawLat ? parseFloat(rawLat) : null;
    const longitude = rawLng ? parseFloat(rawLng) : null;

    const existing = await prisma.fasilitas.findUnique({ where: { id } });
    let gambarPath = existing?.gambar || null;

    const file = formData.get('gambar') as File;
    if (file && file.size > 0 && file.name !== 'undefined') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads/fasilitas');
      
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      gambarPath = `/uploads/fasilitas/${filename}`;
    }

    await prisma.fasilitas.update({
      where: { id },
      data: {
        nama,
        kategori,
        alamat,
        kontak,
        jamOperasional,
        gambar: gambarPath,
        deskripsi,
        latitude,
        longitude,
      },
    });

    revalidatePath('/admin/fasilitas');
    return { success: true };
  } catch (error) {
    console.error('Gagal memperbarui fasilitas:', error);
    return { error: 'Gagal memperbarui data fasilitas.' };
  }
}

export async function deleteFasilitas(id: string) {
  try {
    await prisma.fasilitas.delete({
      where: { id },
    });

    revalidatePath('/admin/fasilitas');
    return { success: true };
  } catch (error) {
    console.error('Gagal menghapus fasilitas:', error);
    throw new Error('Gagal menghapus data fasilitas.');
  }
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// --- CRUD BERITA ---

export async function createBerita(formData: FormData) {
  try {
    const judul = formData.get('judul') as string;
    const kategori = formData.get('kategori') as string;
    const ringkasan = formData.get('ringkasan') as string;
    const isi = formData.get('isi') as string;
    const tanggalStr = formData.get('tanggal') as string;
    
    const slug = generateSlug(judul) + '-' + Date.now().toString().slice(-4);

    const file = formData.get('gambar') as File;
    let gambarPath = null;

    if (file && file.size > 0 && file.name !== 'undefined') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads/berita');
      
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      gambarPath = `/uploads/berita/${filename}`;
    }

    await prisma.berita.create({
      data: {
        judul,
        slug,
        kategori,
        ringkasan,
        isi,
        gambar: gambarPath,
        tanggal: tanggalStr,
      },
    });

    revalidatePath('/admin/berita');
    return { success: true };
  } catch (error) {
    console.error('Gagal membuat berita:', error);
    return { error: 'Gagal menyimpan data berita ke database.' };
  }
}

export async function updateBerita(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const judul = formData.get('judul') as string;
    const kategori = formData.get('kategori') as string;
    const ringkasan = formData.get('ringkasan') as string;
    const isi = formData.get('isi') as string;
    const tanggalStr = formData.get('tanggal') as string;

    const existing = await prisma.berita.findUnique({ where: { id } });
    let gambarPath = existing?.gambar || null;

    const file = formData.get('gambar') as File;
    if (file && file.size > 0 && file.name !== 'undefined') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads/berita');
      
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      gambarPath = `/uploads/berita/${filename}`;
    }

    await prisma.berita.update({
      where: { id },
      data: {
        judul,
        kategori,
        ringkasan,
        isi,
        gambar: gambarPath,
        tanggal: tanggalStr,
      },
    });

    revalidatePath('/admin/berita');
    return { success: true };
  } catch (error) {
    console.error('Gagal memperbarui berita:', error);
    return { error: 'Gagal memperbarui data berita.' };
  }
}

export async function deleteBerita(id: string) {
  try {
    await prisma.berita.delete({
      where: { id },
    });

    revalidatePath('/admin/berita');
    return { success: true };
  } catch (error) {
    console.error('Gagal menghapus berita:', error);
    throw new Error('Gagal menghapus data berita.');
  }
}

// --- LOGIN ADMIN ---
export async function loginAdmin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || user.password !== password) {
    return { error: 'Username atau password salah!' };
  }

  (await cookies()).set({
    name: 'admin_session',
    value: 'authenticated_true',
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  redirect('/admin/berita');
}

// --- LOGOUT ADMIN ---
export async function logoutAdmin() {
  (await cookies()).delete('admin_session');
  redirect('/admin/login');
}