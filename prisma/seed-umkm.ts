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

const umkmData = [
  { nama: "Karaoke Tiga Dara Sri Bela Jaya", kategori: "Hiburan (Karaoke)", deskripsi: "Menyediakan tempat hiburan untuk wisatawan", kontak: "083128527338", latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Tambal Ban dan Cuci Steam (Warung Imas)", kategori: "Jasa", deskripsi: "Menyediakan jasa perawatan sepeda motor", kontak: null, latitude: null, longitude: null },
  { nama: "Galih Cell", kategori: "Jasa & Kuliner", deskripsi: "Menyediakan jasa dana, konter, dll", kontak: null, latitude: null, longitude: null },
  { nama: "Warung Teh Wati", kategori: "Kriya Kerajinan", deskripsi: "Menjual berbagai macam kerajinan", kontak: null, latitude: null, longitude: null },
  { nama: "Aneka Jajanan T@jenk", kategori: "Kuliner", deskripsi: "Menjual olahan jajanan/cemilan", kontak: "082215725060", latitude: null, longitude: null },
  { nama: "Bakar Ikan BR3 Putri Laksana", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.5331656, longitude: 107.4797234 },
  { nama: "Bakar Ikan Doa Ibu", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Bakar Ikan Jaya Mustika", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: "082320770256", latitude: -7.5326507, longitude: 107.4799373 },
  { nama: "Bakar Ikan Putra BR Satu", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Bakar Ikan Sedrana", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: null, longitude: null },
  { nama: "Bakar Ikan Zayra", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: "085352250652", latitude: -7.531908, longitude: 107.4805878 },
  { nama: "Baso Cuaki Family", kategori: "Kuliner", deskripsi: "Menyediakan baso cuanki", kontak: null, latitude: null, longitude: null },
  { nama: "Batagor dan Siomay", kategori: "Kuliner", deskripsi: "Menyediakan jajanan batagor dan siomay", kontak: null, latitude: null, longitude: null },
  { nama: "Ikan Bakar Abang Flores", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: null, longitude: null },
  { nama: "Ikan Bakar Adinda", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.5324993, longitude: 107.4800349 },
  { nama: "Ikan Bakar Bah Jilun", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: null, longitude: null },
  { nama: "Ikan Bakar Bunga", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.5325776, longitude: 107.4799863 },
  { nama: "Ikan Bakar Ibu Lilis", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Ikan Bakar Mang Cepi", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: "081322053140/081222658004", latitude: -7.5329941, longitude: 107.4797766 },
  { nama: "Ikan Bakar Pak Ujang Wiro", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: "082319876557", latitude: -7.5327313, longitude: 107.4798897 },
  { nama: "Ikan Bakar Pondok Layla", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.5320106, longitude: 107.4804338 },
  { nama: "Ikan Bakar Putri Bungsu", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Ikan Bakar Rimayoubii", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Ikan Bakar Teh Milah", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: "082218493154/082387579", latitude: -7.5328139, longitude: 107.4798553 },
  { nama: "Ikan Bakar Turanhas", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.5322723, longitude: 107.4801821 },
  { nama: "Ikan Bakar Umi Hani", kategori: "Kuliner", deskripsi: "Menjual olahan ayam, ikan, dan seafood; tersedia warung eceran + minuman segar", kontak: null, latitude: -7.5287828, longitude: 107.4795667 },
  { nama: "Ikan Bakar Wulandari", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: -7.5328947, longitude: 107.4798158 },
  { nama: "Kantinasari Seafood", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan seafood", kontak: null, latitude: null, longitude: null },
  { nama: "Kios Ikan Acit / Iki", kategori: "Kuliner", deskripsi: "Tersedia bermacam-macam ikan laut & menerima jasa masak / pesanan ikan asam manis", kontak: "083894660320", latitude: -7.5310518, longitude: 107.4814331 },
  { nama: "Pusaka Ikan Bakar Abah Ahong", kategori: "Kuliner", deskripsi: "Menyediakan berbagai macam olahan ikan", kontak: null, latitude: null, longitude: null },
  { nama: "RM Seafood Pondok Bambu", kategori: "Kuliner", deskripsi: "Menjual berbagai macam olahan seafood", kontak: "085322421237", latitude: -7.5293489, longitude: 107.4804025 },
  { nama: "Rumah Makan Barokah", kategori: "Kuliner", deskripsi: "Menjual berbagai macam olahan makanan", kontak: "083128527338", latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Saung Balebat", kategori: "Kuliner", deskripsi: "Menjual berbagai macam olahan makanan", kontak: null, latitude: null, longitude: null },
  { nama: "Saung Rendi", kategori: "Kuliner", deskripsi: "Bakar ikan dan bakso", kontak: null, latitude: -7.5336125, longitude: 107.4796928 },
  { nama: "Seafood Wajabrig", kategori: "Kuliner", deskripsi: "Menjual berbagai macam olahan seafood", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Seblak Parasmanan", kategori: "Kuliner", deskripsi: "Menjual olahan seblak, mie, sate seafood, dimsum, dan minuman", kontak: null, latitude: null, longitude: null },
  { nama: "Toko Arum", kategori: "Kuliner", deskripsi: "Menyediakan kebutuhan sehari-hari", kontak: null, latitude: null, longitude: null },
  { nama: "Toko Fatimah", kategori: "Kuliner", deskripsi: "Menyediakan kebutuhan sehari-hari", kontak: null, latitude: -7.5290173, longitude: 107.4799631 },
  { nama: "Toko Koswara (Warmindo)", kategori: "Kuliner", deskripsi: "Warung mie dan warung kelontong (kebutuhan sehari-hari)", kontak: null, latitude: -7.5296439, longitude: 107.4807507 },
  { nama: "Warung DS", kategori: "Kuliner", deskripsi: "Menyediakan kebutuhan sehari-hari", kontak: null, latitude: -7.5335233, longitude: 107.4797058 },
  { nama: "Warung Ibu Enah", kategori: "Kuliner", deskripsi: "Menyediakan kebutuhan sehari-hari", kontak: null, latitude: -7.5294032, longitude: 107.4804763 },
  { nama: "Warung Nasi Bakar Ikan Putri Bungsu", kategori: "Kuliner", deskripsi: "Menjual olahan ikan bakar dan nasi", kontak: "081223098392 / 085314724704", latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Warung Nasi RZ", kategori: "Kuliner", deskripsi: "Menjual olahan ikan, seafood, dan minuman", kontak: "082315371058", latitude: -7.5289693, longitude: 107.4798838 },
  { nama: "Warung Nasi dan Gorengan", kategori: "Kuliner", deskripsi: "Menjual nasi, gorengan, dan minuman", kontak: null, latitude: null, longitude: null },
  { nama: "Ikan Bakar dan Penginapan Putra Bungsu", kategori: "Kuliner & Penginapan", deskripsi: "Menyediakan tempat penginapan dan berbagai macam olahan Ikan", kontak: "081395071852", latitude: null, longitude: null },
  { nama: "Anugrah Jaya", kategori: "Pasar Ikan", deskripsi: "Tempat jual beli ikan laut, borongan, eceran, serta tersedia Jenis ikan laut segar", kontak: "085314048982", latitude: -7.5308565, longitude: 107.481462 },
  { nama: "Tempat Pelelangan Ikan Pelabuhan Rancabuaya", kategori: "Pasar Ikan", deskripsi: "Menyediakan tempat pelelangan ikan", kontak: null, latitude: null, longitude: null },
  { nama: "Losmen Cicilan S20", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Abang Flores", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "082318213792", latitude: null, longitude: null },
  { nama: "Penginapan Asri Family", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Penginapan BR Satu", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "085722242010", latitude: null, longitude: null },
  { nama: "Penginapan BR3 Putri Laksana H. Baro", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "081322053140 / 081222658004", latitude: -7.5331656, longitude: 107.4797234 },
  { nama: "Penginapan Barokah Rancabuaya", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Bunda Rafi", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "0821121966743", latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Penginapan DS", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: -7.5335233, longitude: 107.4797058 },
  { nama: "Penginapan Doa Ibu", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Gajah Putih", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Garsel", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "082315821009", latitude: -7.531908, longitude: 107.4805878 },
  { nama: "Penginapan Neng Jaya", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "083128527338", latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Penginapan Plamboyan", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Putra Bungsu", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Putra Kelana", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: -7.5319582, longitude: 107.4805121 },
  { nama: "Penginapan Putri Arimbi", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "081323185296 / 081222571170", latitude: null, longitude: null },
  { nama: "Penginapan Putri Bungsu", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "082224484591", latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Penginapan Rendi", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "085864519959", latitude: -7.5336125, longitude: 107.4796928 },
  { nama: "Penginapan Rimayoubii", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "085603663658", latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Penginapan Sederhana", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: -7.5334363, longitude: 107.4797163 },
  { nama: "Penginapan Sedrana", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Sinarwangi", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Penginapan Zayra Putri", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "085352250652", latitude: -7.531908, longitude: 107.4805878 },
  { nama: "Pondok Grandis", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: null, longitude: null },
  { nama: "Pondok Layla", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: -7.5320106, longitude: 107.4804338 },
  { nama: "Pondok Nur'aeni", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "082130700343", latitude: -7.5336125, longitude: 107.4796928 },
  { nama: "Sinar Barokah", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: "081214670092", latitude: -7.5319582, longitude: 107.4805121 },
  { nama: "Villa Jaya Sakti 2", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Villa Jaya Sakti 3", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan (Tersedia AC, TV, kipas angin standar)", kontak: null, latitude: -7.5303934, longitude: 107.4813277 },
  { nama: "Villa Jaya Sakti 4 Putra", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan (Tersedia AC, TV, kipas angin standar)", kontak: null, latitude: -7.531717, longitude: 107.4808969 },
  { nama: "Penginapan Pondok Bambu", kategori: "Penginapan", deskripsi: "Menyediakan tempat penginapan untuk wisatawan", kontak: null, latitude: -7.5293489, longitude: 107.4804025 },
  { nama: "Kios RM Family", kategori: "Warung Ikan", deskripsi: "Tempat jual beli macam-macam ikan laut & seafood", kontak: "085323584448", latitude: -7.5314131, longitude: 107.4812883 },
  { nama: "Toko Nadia", kategori: "Warung Kelontong", deskripsi: "Menyediakan berbagai macam kebutuhan sehari-hari", kontak: null, latitude: -7.5309636, longitude: 107.4814541 },
  { nama: "Warung Asri Family", kategori: "Warung Kelontong", deskripsi: "Menyediakan berbagai macam kebutuhan sehari-hari", kontak: null, latitude: -7.533745, longitude: 107.4796702 },
  { nama: "Toko Resi", kategori: "Warung Kelontong & Warmindo", deskripsi: "Menyediakan berbagai macam kebutuhan sehari-hari & warung makan mie", kontak: null, latitude: -7.5312553, longitude: 107.4813723 },
  { nama: "RM Abah Adong", kategori: "Kuliner", deskripsi: "Menyediakan berbagai olahan makanan dan menerima catering", kontak: "085224949471", latitude: -7.5320666, longitude: 107.4803613 },
  { nama: "Toko Baju Putra BR satu", kategori: "Toko Baju", deskripsi: "Menyeiakan baju pantai dewasa dan anak anak", kontak: "085722242010", latitude: -7.533745, longitude: 107.4796702 },
];

async function main() {
  const { prisma, pool } = getPrismaInstance();

  console.log('🌱 Memulai proses seeding data UMKM...');

  for (const item of umkmData) {
    await prisma.umkm.create({
      data: {
        nama: item.nama,
        kategori: item.kategori,
        deskripsi: item.deskripsi,
        kontak: item.kontak,
        gambar: null,
        latitude: item.latitude,
        longitude: item.longitude,
      },
    });
  }

  console.log(`✅ Seeding UMKM berhasil! Added ${umkmData.length} records.`);
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error('❌ Terjadi kesalahan saat seeding UMKM:', e);
  process.exit(1);
});