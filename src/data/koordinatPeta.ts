export interface PotensiDesa {
  id: string;
  nama: string;
  kategori: 'wisata' | 'umkm' | 'warung' | 'pertanian' | 'perkebunan' | 'fasilitas' | 'strategis';
  lat: number;
  lng: number;
  deskripsi: string;
  foto: string;
}

export const dataPotensi: PotensiDesa[] = [
  {
    id: 'w1',
    nama: 'Pantai Purbayani (Spot Sunrise)',
    kategori: 'wisata',
    lat: -7.5624, // Koordinat perkiraan Garut Selatan
    lng: 107.5612,
    deskripsi: 'Destinasi wisata pantai asri dengan ombak khas pantai selatan dan hamparan pasir luas.',
    foto: '/assets/images/pantai-purbayani.jpg'
  },
  {
    id: 'u1',
    nama: 'UMKM Gula Semut Aren Purbayani',
    kategori: 'umkm',
    lat: -7.5650,
    lng: 107.5630,
    deskripsi: 'Produksi gula aren tradisional organik kualitas ekspor oleh kelompok tani hutan.',
    foto: '/assets/images/gula-aren.jpg'
  },
  {
    id: 'f1',
    nama: 'Balai Desa Purbayani & Pusat Informasi',
    kategori: 'fasilitas',
    lat: -7.5601,
    lng: 107.5590,
    deskripsi: 'Kantor pemerintahan desa sekaligus pusat layanan informasi wisatawan.',
    foto: '/assets/images/balai-desa.jpg'
  },
  {
    id: 'p1',
    nama: 'Sawah Organik Blok Pasir Salam',
    kategori: 'pertanian',
    lat: -7.5580,
    lng: 107.5645,
    deskripsi: 'Kawasan eduwisata pertanian padi organik terintegrasi.',
    foto: '/assets/images/pertanian.jpg'
  }
];