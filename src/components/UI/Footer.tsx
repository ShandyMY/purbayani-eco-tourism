import Link from 'next/link';
import { Leaf, Mail, MapPin, Phone } from 'lucide-react';

const links = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil Desa', href: '/profil' },
  { name: 'Wisata', href: '/wisata' },
  { name: 'UMKM', href: '/umkm' },
  { name: 'Fasilitas', href: '/fasilitas' },
  { name: 'Kabar Desa', href: '/berita' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#061f1b] text-white/70">
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
      <div aria-hidden className="absolute -right-6 -top-6 h-44 w-44 rounded-full border border-white/10" />

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1.3fr_0.7fr_1.2fr] lg:px-16 2xl:max-w-[1360px]">
        {/* Identitas */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Leaf className="h-5 w-5 text-emerald-300" />
            </span>
            <span className="leading-none">
              <span className="block text-base font-bold tracking-[0.14em]">PURBAYANI</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Eco Tourism · Garut
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7">
            Platform Portal &amp; GIS Smart Eco-Tourism terintegrasi Desa Purbayani, Kecamatan Caringin, Kabupaten Garut, Jawa Barat.
          </p>
        </div>

        {/* Navigasi */}
        <nav aria-label="Tautan footer">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">Jelajahi</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-emerald-200">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontak */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">Kontak resmi</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <a href="mailto:pemerintah@purbayani.desa.id" className="break-all transition hover:text-emerald-200">
                pemerintah@purbayani.desa.id
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <a href="tel:+6282144332211" className="transition hover:text-emerald-200">
                +62 821-4433-2211
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <span>Jl. Raya Pesisir Rancabuaya No.12, Caringin, Garut</span>
            </li>
          </ul>

          <p className="mt-5 text-xs leading-6 text-white/55">
            Dikelola bersama Pemerintah Desa Purbayani, Karang Taruna, dan Kelompok Sadar Wisata (Pokdarwis) setempat.
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-5 sm:px-10 lg:px-16">
        <p className="mx-auto max-w-[1200px] text-center text-xs text-white/50 2xl:max-w-[1360px]">
          &copy; {new Date().getFullYear()} Desa Purbayani, Garut. Dibangun untuk Smart Village Eco-Tourism Initiative.
        </p>
      </div>
    </footer>
  );
}