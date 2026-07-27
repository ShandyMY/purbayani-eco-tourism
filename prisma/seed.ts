import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helper slug gambar
function generateImageSlug(nama: string) {
  const cleanName = nama
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return `/images/wisata/${cleanName}.jpg`;
}

// Data Wisata
const dataWisata = [
  {
    nama: "Pantai Rancabuaya",
    kategori: "Wisata Bahari",
    deskripsi: "Pantai ikonik Desa Purbayani dengan hamparan karang luas yang menakjubkan saat surut, ombak khas pantai selatan yang megah, serta tebing karang alami yang mempesona.",
    lokasi: "Dusun Rancabuaya, Desa Purbayani",
    hargaTiket: "Rp 10.000 / orang",
    jamOperasional: "24 Jam",
    latitude: -7.5332,
    longitude: 107.4795,
  },
  {
    nama: "Puncak Guha",
    kategori: "Spot Panorama & Teletubbies",
    deskripsi: "Situs tebing karang menakjubkan di atas samudra. Menyuguhkan pemandangan lanskap pantai 360 derajat, tempat terbaik menikmati sunset, dan bukit rumput hijau ala Teletubbies.",
    lokasi: "Samping Pantai Rancabuaya, Desa Purbayani",
    hargaTiket: "Rp 10.000 / orang",
    jamOperasional: "06.00 - 18.00 WIB",
    latitude: -7.5385,
    longitude: 107.4912,
  },
  {
    nama: "Pelabuhan & Tempat Pelelangan Ikan (TPI) Rancabuaya",
    kategori: "Wisata Bahari & Edukasi",
    deskripsi: "Pusat aktivitas nelayan lokal Purbayani. Wisatawan bisa melihat langsung proses pendaratan perahu nelayan, membeli ikan laut segar kualitas terbaik, atau menikmati suasana dermaga.",
    lokasi: "Dermaga Rancabuaya, Desa Purbayani",
    hargaTiket: "Gratis (Parkir Rp 3.000)",
    jamOperasional: "05.00 - 16.00 WIB",
    latitude: -7.5308,
    longitude: 107.4814,
  },
  {
    nama: "Muara Sungai Cariang",
    kategori: "Wisata Alam & Rekreasi",
    deskripsi: "Pertemuan antara air tawar sungai dan air laut yang tenang. Lokasi favorit wisatawan untuk berenang santai, naik perahu sampan kayu lokal, dan memancing.",
    lokasi: "Kampung Cariang, Desa Purbayani",
    hargaTiket: "Gratis",
    jamOperasional: "24 Jam",
    latitude: -7.5285,
    longitude: 107.4788,
  },
  {
    nama: "Gua Lalay Puncak Guha",
    kategori: "Wisata Ekologi",
    deskripsi: "Gua alami di bawah tebing Puncak Guha yang menjadi habitat ribuan kelelawar (lalay). Menyajikan atraksi ribuan kelelawar terbang keluar gua menjelang matahari terbenam.",
    lokasi: "Kawasan Puncak Guha, Desa Purbayani",
    hargaTiket: "Termasuk Tiket Puncak Guha",
    jamOperasional: "16.30 - 18.00 WIB (Best Time)",
    latitude: -7.5391,
    longitude: 107.4918,
  },
  {
    nama: "Spot Sunset Karang Purbayani",
    kategori: "Spot Foto & Fotografi",
    deskripsi: "Area gugusan karang datar di tepi pantai yang memunculkan gumpalan busa ombak estetik dan pantulan cermin air laut saat senja tiba. Sangat disukai pecinta fotografi.",
    lokasi: "Pesisir Barat Desa Purbayani",
    hargaTiket: "Gratis",
    jamOperasional: "15.30 - 18.00 WIB",
    latitude: -7.5338,
    longitude: 107.4791,
  },
  {
    nama: "Gazebo Kuliner Pesisir Purbayani",
    kategori: "Wisata Kuliner & Santai",
    deskripsi: "Deretan gazebo kayu di pinggir pantai di mana pengunjung bisa menikmati sajian ikan bakar khas Rancabuaya sambil diterpa angin laut dan suara deburan ombak.",
    lokasi: "Kawasan Sentra Kuliner Purbayani",
    hargaTiket: "Gratis (Cukup beli makanan)",
    jamOperasional: "08.00 - 22.00 WIB",
    latitude: -7.5327,
    longitude: 107.4798,
  }
];

async function seedWisata() {
  console.log('🔄 Memasukkan data Wisata...');
  await prisma.wisata.deleteMany({});

  for (const item of dataWisata) {
    const gambar = generateImageSlug(item.nama);
    await prisma.wisata.create({
      data: {
        ...item,
        gambar,
      },
    });
  }
  console.log('✅ Data Wisata berhasil dimasukkan!');
}

async function main() {
  console.log('🌱 Memulai proses seeding database Purbayani...');
  
  await seedWisata();
  // Kalo nanti ada data lain, tinggal panggil di sini:
  // await seedUmkm(); 

  console.log('🎉 Semua proses seeding berhasil!');
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });