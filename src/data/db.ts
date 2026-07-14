export interface Wisata {
  id: string;
  slug: string;
  nama: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  hargaTiket: string;
  fasilitas: string[];
  koordinat: [number, number];
  gambar: string;
}

export interface UMKM {
  id: string;
  slug: string;
  nama: string;
  pemilik: string;
  produk: string[];
  deskripsi: string;
  kontak: string;
  koordinat: [number, number];
  gambar: string;
}

export interface FasilitasPublik {
  id: string;
  nama: string;
  kategori: 'Administrasi' | 'Kesehatan' | 'Keamanan' | 'Sosial';
  deskripsi: string;
  koordinat: [number, number];
}

export interface UsahaLokal {
  id: string;
  nama: string;
  kategori: 'Homestay' | 'Sewa Alat' | 'Warung Kelontong';
  deskripsi: string;
  kontak: string;
}

export interface Berita {
  id: string;
  slug: string;
  judul: string;
  tanggal: string;
  kategori: string;
  ringkasan: string;
  konten: string;
  gambar: string;
}

export const DATA_WISATA: Wisata[] = [
  {
    id: 'w1',
    slug: 'pantai-purbayani',
    nama: 'Pantai Purbayani (Cilame)',
    kategori: 'Wisata Alam Pesisir',
    lokasi: 'Dusun Cikaso, Desa Purbayani',
    deskripsi: 'Pantai dengan hamparan pasir putih bersih yang menawan dan ombak Samudra Hindia yang megah. Terkenal sebagai spot tersembunyi terbaik di Garut Selatan untuk berburu matahari terbenam tanpa hiruk-pikuk keramaian.',
    hargaTiket: 'Rp 10.000 / orang',
    fasilitas: ['Area Parkir Luas', 'Gazebo Pandang', 'Warung Seafood', 'Toilet Umum & Mushola'],
    koordinat: [-7.5543, 107.6186],
    gambar: '/assets/images/wisata-cover.jpg'
  },
  {
    id: 'w2',
    slug: 'mangrove-purbayani',
    nama: 'Konservasi Mangrove Purbayani',
    kategori: 'Ekowisata & Edukasi',
    lokasi: 'Muara Sungai Cikaso, Desa Purbayani',
    deskripsi: 'Kawasan konservasi hutan bakau yang asri, menawarkan petualangan menyusuri jembatan kayu estetik di tengah rimbunnya pohon mangrove sekaligus menjadi pusat edukasi lingkungan pesisir.',
    hargaTiket: 'Gratis (Donasi Kebersihan)',
    fasilitas: ['Jembatan Kayu (Tracking Board)', 'Spot Foto Instagramable', 'Pusat Bibit Mangrove'],
    koordinat: [-7.5580, 107.6120],
    gambar: '/assets/images/wisata-cover.jpg'
  }
];

export const DATA_UMKM: UMKM[] = [
  {
    id: 'u1',
    slug: 'gula-semut-aren-purbayani',
    nama: 'Gula Semut Aren Wangi Purbayani',
    pemilik: 'Kelompok Tani Hutan (KTH) Purbayani',
    produk: ['Gula Aren Bubuk Organik', 'Gula Jahe Instan'],
    deskripsi: 'Gula aren kualitas premium yang diproses secara tradisional higienis dari nira pohon aren pegunungan Purbayani. Memiliki cita rasa manis karamel yang khas dan bersertifikat halal.',
    kontak: '+62 821-2345-6789',
    koordinat: [-7.5510, 107.6210],
    gambar: '/assets/images/umkm-cover.jpg'
  },
  {
    id: 'u2',
    slug: 'kerajinan-pandan-pesisir',
    nama: 'Kriya Pandan Mandiri Purbayani',
    pemilik: 'Ibu Fatimah & Kelompok Perempuan Pesisir',
    produk: ['Tikar Pandan', 'Tas Etnik Anyaman', 'Topi Pantai'],
    deskripsi: 'Pemanfaatan tanaman pandan duri liar pesisir menjadi anyaman seni bernilai jual tinggi yang membantu menggerakkan roda perekonomian ibu-ibu nelayan setempat.',
    kontak: '+62 813-9876-5432',
    koordinat: [-7.5535, 107.6175],
    gambar: '/assets/images/umkm-cover.jpg'
  }
];

export const DATA_FASILITAS: FasilitasPublik[] = [
  {
    id: 'f1',
    nama: 'Kantor Pemerintahan Desa Purbayani',
    kategori: 'Administrasi',
    deskripsi: 'Pusat pelayanan administratif, pengurusan berkas kependudukan, dan Tourism Information Center (TIC).',
    koordinat: [-7.5460, 107.6200],
  },
  {
    id: 'f2',
    nama: 'Pos Kesehatan Desa (Poskesdes) Purbayani',
    kategori: 'Kesehatan',
    deskripsi: 'Pusat pelayanan kesehatan dasar warga desa dan penanganan darurat kecelakaan bagi wisatawan.',
    koordinat: [-7.5482, 107.6195],
  },
  {
    id: 'f3',
    nama: 'Pos Basarnas & Rescue Pantai Purbayani',
    kategori: 'Keamanan',
    deskripsi: 'Posko pengawasan pantai, penyelamatan laut, mitigasi bencana tsunami, dan titik kumpul evakuasi utama.',
    koordinat: [-7.5550, 107.6160],
  }
];

export const DATA_USAHA_LOKAL: UsahaLokal[] = [
  { id: 'ul1', nama: 'Homestay Pantai Indah Purbayani', kategori: 'Homestay', deskripsi: 'Sewa penginapan rumah warga lokal dengan harga sangat terjangkau, langsung menghadap ke laut.', kontak: '0852-1111-2222' },
  { id: 'ul2', nama: 'Warung Ikan Bakar Bahari', kategori: 'Warung Kelontong', deskripsi: 'Pusat kuliner laut segar hasil tangkapan pagi hari para nelayan lokal.', kontak: '0852-3333-4444' },
  { id: 'ul3', nama: 'Rental Tenda & Alat Camping "Samudra"', kategori: 'Sewa Alat', deskripsi: 'Penyewaan tenda dome, matras, kompor portable untuk aktivitas camping di bibir Pantai Purbayani.', kontak: '0852-5555-6666' }
];

export const DATA_BERITA: Berita[] = [
  {
    id: 'b1',
    slug: 'festival-budaya-pesisir-2026',
    judul: 'Sambut Syukur Nelayan, Festival Budaya Pesisir Purbayani Kembali Digelar!',
    tanggal: '10 Juli 2026',
    kategori: 'Adat & Budaya',
    ringkasan: 'Acara pesta rakyat tahunan sebagai wujud syukur hasil laut nelayan pesisir dengan ragam pertunjukan seni tari, parade perahu hias, dan pasar kuliner ikan gratis.',
    konten: 'Desa Purbayani kembali memancarkan kemeriahan budaya lokalnya. Kegiatan tahunan "Festival Pesisir" ini tidak hanya menjadi wujud syukur nelayan tetapi juga magnet wisatawan domestik dan asing untuk mengenal kearifan lokal Garut Selatan lebih dalam.',
    gambar: '/assets/images/berita-cover.jpg'
  }
];