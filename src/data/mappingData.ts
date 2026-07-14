export interface MapLocation {
  id: string;
  name: string;
  category: 'wisata' | 'umkm' | 'warung' | 'pertanian' | 'fasilitas' | 'strategis';
  coords: [number, number];
  description: string;
  image?: string;
}

export const purbayaniLocations: MapLocation[] = [
  // DESTINASI WISATA
  {
    id: 'w1',
    name: 'Pantai Purbayani (Spot Utama)',
    category: 'wisata',
    coords: [-7.5543, 107.6186],
    description: 'Pantai pasir putih dengan ombak khas Garut Selatan, sangat cocok untuk menikmati matahari terbenam.',
    image: '/images/pantai-thumb.jpg'
  },
  {
    id: 'w2',
    name: 'Hutan Mangrove Purbayani',
    category: 'wisata',
    coords: [-7.5580, 107.6120],
    description: 'Kawasan konservasi mangrove yang melindungi garis pantai desa dan menjadi habitat burung lokal.',
  },
  // UMKM & WARUNG
  {
    id: 'u1',
    name: 'Pengrajin Gula Semut Aren Purbayani',
    category: 'umkm',
    coords: [-7.5510, 107.6210],
    description: 'Produksi gula aren bubuk organik kualitas ekspor hasil tani hutan Purbayani.',
  },
  {
    id: 'wr1',
    name: 'Warung Nasi Seafood Teh Iis',
    category: 'warung',
    coords: [-7.5535, 107.6175],
    description: 'Olahan ikan bakar segar langsung dari nelayan Pantai Purbayani.',
  },
  // PERTANIAN & PERKEBUNAN
  {
    id: 'p1',
    name: 'Sentra Hortikultura & Apotek Hidup',
    category: 'pertanian',
    coords: [-7.5480, 107.6250],
    description: 'Kawasan budidaya tanaman obat keluarga (toga) dan tanaman pangan organik.',
  },
  // FASILITAS PUBLIK & TITIK STRATEGIS
  {
    id: 'f1',
    name: 'Kantor Kepala Desa Purbayani',
    category: 'fasilitas',
    coords: [-7.5460, 107.6200],
    description: 'Pusat administrasi desa, pelayanan publik, dan pusat informasi wisata.',
  },
  {
    id: 'ts1',
    name: 'Pos Basarnas & Mitigasi Bencana Pantai',
    category: 'strategis',
    coords: [-7.5550, 107.6160],
    description: 'Titik evakuasi utama dan pos pemantau keselamatan pantai.',
  }
];