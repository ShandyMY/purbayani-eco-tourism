import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

function getPrismaInstance() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL tidak ditemukan di file .env');
  }
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return { prisma: new PrismaClient({ adapter }), pool };
}

async function main() {
  const { prisma, pool } = getPrismaInstance();

  const dataFasilitas = [
    {
      nama: 'Kantor Kepala Desa Purbayani',
      kategori: 'Pemerintahan',
      deskripsi: 'Pusat pelayanan administrasi kependudukan, perizinan desa, dan pusat koordinasi pemerintah Desa Purbayani.',
      alamat: 'Jl. Raya Purbayani No. 01, Desa Purbayani, Kec. Caringin, Kab. Garut',
      kontak: '0812-3456-7890',
      jamOperasional: 'Senin - Jumat (08.00 - 15.00 WIB)',
      latitude: -7.538521,
      longitude: 107.512411,
      gambar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
    },
    {
      nama: 'Puskesmas Pembantu (Pustu) Purbayani',
      kategori: 'Kesehatan',
      deskripsi: 'Fasilitas kesehatan tingkat pertama untuk pertolongan darurat, pemeriksaan kesehatan umum, posyandu, dan persalinan warga.',
      alamat: 'Jl. Kesehatan Desa No. 12, Purbayani',
      kontak: '0821-9876-5432',
      jamOperasional: '24 Jam (UGD / Darurat)',
      latitude: -7.539100,
      longitude: 107.513200,
      gambar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    },
    {
      nama: 'SD Negeri 1 Purbayani',
      kategori: 'Pendidikan',
      deskripsi: 'Gedung sekolah dasar negeri unggulan fasilitas ruang kelas, perpustakaan digital, dan lapangan olahraga serbaguna.',
      alamat: 'Jl. Pendidikan No. 05, Purbayani',
      kontak: '0853-1122-3344',
      jamOperasional: 'Senin - Sabtu (07.00 - 13.00 WIB)',
      latitude: -7.537200,
      longitude: 107.511800,
      gambar: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    },
    {
      nama: 'Masjid Agung Al-Mutaqin Purbayani',
      kategori: 'Keagamaan',
      deskripsi: 'Masjid jami pusat ibadah shalat berjamaah warga desa, kegiatan pengajian rutin mingguan, dan madrasah diniyah.',
      alamat: 'Dusun Tengah, Desa Purbayani',
      kontak: '0878-5544-3322',
      jamOperasional: 'Setiap Hari (24 Jam)',
      latitude: -7.538900,
      longitude: 107.514100,
      gambar: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80',
    },
    {
      nama: 'Gelanggang Olahraga & Lapangan Pemuda',
      kategori: 'Olahraga & Seni',
      deskripsi: 'Lapangan terbuka untuk sepak bola, voli, bulu tangkis, serta tempat penyelenggaraan acara festival seni desa.',
      alamat: 'Jl. Pemuda Desa, Purbayani',
      kontak: '0896-7788-9900',
      jamOperasional: 'Setiap Hari (06.00 - 18.00 WIB)',
      latitude: -7.540100,
      longitude: 107.510900,
      gambar: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    },
    {
      nama: 'Balai Serbaguna & Pos Kamling',
      kategori: 'Fasilitas Umum',
      deskripsi: 'Tempat musyawarah warga, kegiatan Posyandu lansia, pelatihan UMKM, dan pusat penjagaan keamanan malam (Siskamling).',
      alamat: 'RT 03 / RW 02, Desa Purbayani',
      kontak: null,
      jamOperasional: 'Sesuai Jadwal Kegiatan / 24 Jam Siskamling',
      latitude: -7.536900,
      longitude: 107.515000,
      gambar: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    },
  ];

  console.log('🌱 Memulai proses seeding data fasilitas...');

  for (const item of dataFasilitas) {
    await prisma.fasilitas.create({
      data: item,
    });
  }

  console.log('✅ Seeding fasilitas berhasil!');
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error('❌ Terjadi kesalahan saat seeding:', e);
  process.exit(1);
});