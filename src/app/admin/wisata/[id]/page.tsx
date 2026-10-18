import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { updateWisata } from '../../actions';

interface EditWisataPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWisataPage({ params }: EditWisataPageProps) {
  const { id } = await params;
  const wisata = await prisma.wisata.findUnique({
    where: { id },
  });

  if (!wisata) {
    notFound();
  }

  const updateWisataWithId = async (formData: FormData): Promise<void> => {
  await updateWisata(wisata.id, formData);
};

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <Link href="/admin/wisata" className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Batal & Kembali
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Edit Destinasi Wisata</h1>
        </div>

        <form action={updateWisataWithId} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Nama Objek Wisata *</label>
            <input
              type="text"
              name="nama"
              defaultValue={wisata.nama}
              required
              placeholder="Contoh: Pantai Rancabuaya"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Kategori *</label>
              <input
                type="text"
                name="kategori"
                defaultValue={wisata.kategori}
                required
                placeholder="Wisata Bahari / Spot Sunset / Edukasi"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Alamat / Lokasi Singkat</label>
              <input
                type="text"
                name="lokasi"
                defaultValue={wisata.lokasi || ''}
                placeholder="Dusun Rancabuaya, Desa Purbayani"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Harga Tiket</label>
              <input
                type="text"
                name="hargaTiket"
                defaultValue={wisata.hargaTiket || ''}
                placeholder="Rp 10.000 / orang"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Jam Operasional</label>
              <input
                type="text"
                name="jamOperasional"
                defaultValue={wisata.jamOperasional || ''}
                placeholder="08.00 - 17.00 WIB / 24 Jam"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">URL Gambar / Path Gambar</label>
            <input
              type="text"
              name="gambar"
              defaultValue={wisata.gambar || ''}
              placeholder="/images/wisata/pantai-rancabuaya.jpg atau URL Unsplash"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">URL Virtual Tour 360° (Google Street View / Pannellum / Kuula)</label>
            <input
              type="text"
              name="virtualTourUrl"
              defaultValue={wisata.virtualTourUrl || ''}
              placeholder="https://my.matterport.com/show/?m=... atau link embed 360"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Latitude (Koordinat G-Maps)</label>
              <input
                type="text"
                name="latitude"
                defaultValue={wisata.latitude ?? ''}
                placeholder="-7.5332"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Longitude (Koordinat G-Maps)</label>
              <input
                type="text"
                name="longitude"
                defaultValue={wisata.longitude ?? ''}
                placeholder="107.4795"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Deskripsi Lengkap *</label>
            <textarea
              name="deskripsi"
              rows={4}
              required
              defaultValue={wisata.deskripsi}
              placeholder="Tuliskan cerita menarik tentang tempat ini..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Perbarui Destinasi Wisata</span>
          </button>
        </form>
      </div>
    </div>
  );
}