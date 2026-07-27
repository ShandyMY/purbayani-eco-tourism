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

  // Menggunakan URL gambar dari fasilitas yang sudah terbukti lancar
  const dataBerita = [
    {
      judul: 'Pembangunan Jalan Usaha Tani Diresmikan oleh Kepala Desa',
      slug: 'pembangunan-jalan-usaha-tani-diresmikan-oleh-kepala-desa',
      ringkasan:
        'Akses jalan tani sepanjang 1,2 km kini resmi dapat digunakan oleh para petani lokal untuk mempermudah distribusi hasil panen.',
      isi: `Pemerintah Desa Purbayani secara resmi meresmikan penyelesaian jalan usaha tani yang menghubungkan area persawahan warga dengan jalan utama desa.

Pembangunan jalan ini didanai melalui Alokasi Dana Desa (ADD) tahun anggaran berjalan. Dengan adanya akses jalan yang memadai, diharapkan biaya angkut hasil panen dapat dipangkas secara signifikan.

Kepala Desa menyampaikan terima kasih kepada seluruh warga yang bergotong-royong membantu proses pengerjaan konstruksi.`,
      kategori: 'Pembangunan',
      tanggal: '27 Juli 2026',
      gambar:
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
    },
    {
      judul: 'Pelaksanaan Posyandu Balita dan Lansia Serentak',
      slug: 'pelaksanaan-posyandu-balita-dan-lansia-serentak',
      ringkasan:
        'Kegiatan pemeriksaan kesehatan gratis rutin dan pemberian makanan tambahan (PMT) digelar di Balai RW 03.',
      isi: `Kader Posyandu Desa Purbayani kembali menggelar kegiatan rutin bulanan berupa penimbangan balita, imunisasi dasar, serta pemeriksaan tekanan darah dan gula darah gratis untuk para lansia.

Dalam kegiatan ini, Dinas Kesehatan setempat juga memberikan edukasi terkait pencegahan stunting dan pentingnya gizi seimbang bagi anak-anak usia dini.`,
      kategori: 'Kesehatan',
      tanggal: '24 Juli 2026',
      gambar:
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    },
    {
      judul: 'Pengumuman Jadwal Pelatihan Digitalisasi UMKM Desa',
      slug: 'pengumuman-jadwal-pelatihan-digitalisasi-umkm-desa',
      ringkasan:
        'Pelatihan pembuatan toko online dan pemasaran digital bagi pelaku UMKM lokal dibuka mulai minggu depan.',
      isi: `Dalam rangka mendorong digitalisasi ekonomi desa, Pemerintah Desa bekerja sama dengan akademisi universitas akan mengadakan Pelatihan Pemasaran Digital untuk pelaku UMKM lokal.

Materi yang akan dipelajari meliputi:
1. Fotografi produk menggunakan smartphone.
2. Manajemen media sosial dan Branding.
3. Pendaftaran merchant di marketplace dan pembayaran QRIS.

Pendaftaran terbuka gratis untuk seluruh warga desa yang memiliki usaha skala mikro, kecil, maupun menengah.`,
      kategori: 'Pengumuman',
      tanggal: '20 Juli 2026',
      gambar:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    },
    {
      judul: 'Kerja Bakti Masal Persiapan Lomba Kebersihan Antar RT',
      slug: 'kerja-bakti-masal-persiapan-lomba-kebersihan-antar-rt',
      ringkasan:
        'Warga antusias membersihkan lingkungan dan mempercantik taman-taman RT menyambut peringatan HUT RI.',
      isi: `Suasana gotong royong tampak menyelimuti lingkungan Desa Purbayani. Seluruh RT serentak melaksanakan kerja bakti membersihkan saluran air, memotong rumput liar, serta mengecat gapura.

Kegiatan ini sekaligus dilakukan dalam rangka menyambut Lomba Kebersihan Lingkungan Antar-RT yang rutin diadakan setiap tahun.`,
      kategori: 'Kegiatan',
      tanggal: '15 Juli 2026',
      gambar:
        'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    },
  ];

  console.log('🌱 Memulai proses seeding data berita...');

  for (const item of dataBerita) {
    // Menggunakan upsert agar tidak bentrok error slug unique
    await prisma.berita.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  console.log('✅ Seeding berita berhasil!');
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error('❌ Terjadi kesalahan saat seeding:', e);
  process.exit(1);
});