import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Compass,
  Heart,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Trees,
  Users,
} from 'lucide-react';

/* Gaya disamakan dengan beranda: skala tipografi kecil, aksen serif miring,
   hijau tua #061f1b + emerald, sudut rounded-3xl, gelombang di hero. */
const css = `
@keyframes fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes drift{to{transform:translateX(-50%)}}
@keyframes glow{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,-30px) scale(1.2)}}
.fadeup{animation:fadeup .9s ease-out both;animation-delay:var(--d,0s)}
.drift{animation:drift 22s linear infinite}
.drift-slow{animation:drift 38s linear infinite reverse}
.glow{animation:glow 11s ease-in-out infinite alternate}
.outline-text{-webkit-text-stroke:1px rgba(255,255,255,.18);color:transparent}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important}}
`;

const wrap = 'mx-auto w-full max-w-[1200px] 2xl:max-w-[1360px]';
const h2 = 'text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl';
const eyebrow = 'mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]';
const sectionPad = 'px-6 py-20 sm:px-10 lg:px-16 lg:py-28';
const serifAccent = 'font-serif font-normal italic';

const missions = [
  'Meningkatkan tata kelola pemerintahan desa yang transparan dan akuntabel.',
  'Mengembangkan potensi pariwisata berbasis Eco-Tourism dan partisipasi warga.',
  'Mendorong pemberdayaan UMKM lokal melalui digitalisasi ekonomi.',
  'Menjaga kelestarian sumber daya alam dan kualitas lingkungan hidup.',
];

const values = [
  { icon: Leaf, title: 'Kelestarian Alam', description: 'Mengembangkan potensi desa dengan tetap menjaga lingkungan dan sumber daya alam.' },
  { icon: Users, title: 'Pemberdayaan Warga', description: 'Mendorong keterlibatan masyarakat dalam kegiatan dan pertumbuhan ekonomi desa.' },
  { icon: Compass, title: 'Inovasi Digital', description: 'Memanfaatkan teknologi informasi untuk memperkenalkan potensi desa kepada lebih banyak orang.' },
];

const facts = [
  { icon: Users, value: '± 4.500', label: 'Jumlah Penduduk', note: 'Angka sesuai informasi yang tersedia.' },
  { icon: MapPin, value: '12,5 km²', label: 'Luas Wilayah', note: 'Angka sesuai informasi yang tersedia.' },
  { icon: Award, value: '4 Dusun', label: 'Wilayah Administratif', note: 'Angka sesuai informasi yang tersedia.' },
  { icon: Trees, value: 'Eco-Village', label: 'Fokus Pembangunan', note: 'Alam, masyarakat, dan inovasi.' },
];

function Wave({ fill, className, anim }: { fill: string; className?: string; anim: string }) {
  const d = 'M0 60 C 180 10 360 110 540 60 S 900 10 1080 60 S 1260 100 1440 60 V120 H0 Z';
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 h-[60px] overflow-hidden ${className ?? ''}`}>
      <div className={`flex h-full w-[200%] ${anim}`}>
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={d} fill={fill} />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default function ProfilPublicPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f8f4] text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-[#061f1b] text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(52,211,153,0.2),transparent_40%),radial-gradient(ellipse_at_0%_100%,rgba(217,171,94,0.12),transparent_40%)]" />
        <div aria-hidden className="glow absolute -left-24 top-1/4 -z-10 h-[320px] w-[320px] rounded-full bg-emerald-400/20 blur-[100px]" />
        <div aria-hidden className="absolute -right-28 -top-32 -z-10 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div aria-hidden className="absolute -right-8 -top-12 -z-10 h-[260px] w-[260px] rounded-full border border-white/10" />
        <p aria-hidden className="outline-text pointer-events-none absolute -bottom-3 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[14vw] leading-none tracking-tight">
          PROFIL
        </p>

        <div className="relative mx-auto max-w-[1280px] px-6 pb-28 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36 2xl:max-w-[1440px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <div>
              <div className="fadeup mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md" style={{ ['--d' as string]: '.1s' }}>
                <Trees className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">Profil dan identitas desa</span>
              </div>

              <h1 className="fadeup text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[clamp(2.5rem,4.2vw,4.5rem)] 2xl:text-[5rem]" style={{ ['--d' as string]: '.2s' }}>
                Mengenal lebih dekat
                <span className={`mt-1 block bg-gradient-to-r from-emerald-200 via-white to-amber-200 bg-clip-text pb-[0.08em] text-transparent ${serifAccent}`}>
                  Desa Purbayani.
                </span>
              </h1>

              <p className="fadeup mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base 2xl:max-w-xl 2xl:text-lg" style={{ ['--d' as string]: '.4s' }}>
                Mengenali identitas, visi, dan potensi desa untuk membangun masa depan yang mandiri, sejahtera, berkelanjutan, dan berbasis teknologi informasi melalui Smart Eco-Tourism.
              </p>

              <div className="fadeup mt-7 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '.55s' }}>
                <a href="#visi-misi" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-7 text-sm font-bold text-[#103c31] shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                  Kenali Visi dan Misi
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="/wisata" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15">
                  Jelajahi Potensi Desa
                </Link>
              </div>
            </div>

            <div className="fadeup relative mx-auto w-full max-w-sm lg:max-w-none" style={{ ['--d' as string]: '.7s' }}>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-emerald-950">
                  <Trees className="h-6 w-6" />
                </div>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Arah pembangunan</p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
                  Alam terjaga,
                  <span className={`block text-emerald-200 ${serifAccent}`}>masyarakat berdaya.</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  Menghubungkan potensi alam, partisipasi masyarakat, dan inovasi digital dalam pengembangan desa.
                </p>
                <div className="my-5 h-px bg-white/15" />
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Heart className="h-4 w-4 text-emerald-300" /></span>
                  Bertumbuh bersama masyarakat
                </div>
              </div>

              <div className="absolute -bottom-4 -left-2 rounded-2xl bg-[#f4e8ce] px-4 py-3 text-emerald-950 shadow-xl sm:-left-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-900/60">Identitas</p>
                <p className="mt-0.5 font-serif text-lg">Smart Eco-Tourism</p>
              </div>
            </div>
          </div>
        </div>

        <Wave fill="#10574a" className="opacity-50" anim="drift-slow" />
        <Wave fill="#f7f8f4" anim="drift" />
      </section>

      {/* ================= TENTANG ================= */}
      <section className={sectionPad}>
        <div className={`${wrap} grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-start md:gap-12`}>
          <div>
            <p className={`${eyebrow} text-emerald-800`}>Tentang Purbayani</p>
            <h2 className={h2}>
              Identitas desa,
              <span className={`block text-emerald-800 ${serifAccent}`}>pijakan masa depan.</span>
            </h2>
          </div>

          <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Sparkles className="h-5 w-5 text-emerald-800" />
            </div>
            <p className="font-serif text-lg leading-8 text-[#0f3329] sm:text-xl sm:leading-9">
              Desa Purbayani memiliki arah pembangunan yang menekankan kemandirian ekonomi, pengembangan potensi agrowisata, pelestarian lingkungan, dan pemanfaatan teknologi informasi.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Melalui pendekatan Smart Eco-Tourism, potensi desa dapat diperkenalkan lebih luas sekaligus membuka peluang partisipasi masyarakat dalam pengembangan pariwisata dan ekonomi lokal.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VISI & MISI ================= */}
      <section id="visi-misi" className={`scroll-mt-8 bg-[#eaf0e9] ${sectionPad}`}>
        <div className={wrap}>
          <div className="mb-10 max-w-2xl">
            <p className={`${eyebrow} text-emerald-800`}>Arah dan komitmen</p>
            <h2 className={h2}>
              Visi yang jelas,
              <span className={`block text-emerald-800 ${serifAccent}`}>langkah yang terarah.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Landasan untuk mewujudkan pembangunan desa yang berkelanjutan dan berpihak pada masyarakat.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <article className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2e28] to-[#061f1b] p-7 text-white shadow-xl sm:p-9 md:min-h-[340px]">
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
              <div aria-hidden className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-white/10" />

              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Target className="h-6 w-6 text-emerald-300" />
              </div>
              <p className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">Visi desa</p>
              <h3 className="relative mt-2 text-xl font-semibold sm:text-2xl">Masa depan Purbayani</h3>
              <blockquote className="relative mt-4 font-serif text-lg leading-8 text-white/90 sm:text-xl sm:leading-9">
                “Terwujudnya Desa Purbayani yang agrowisata, mandiri secara ekonomi, berdaya saing tinggi, serta lestari dalam pelestarian lingkungan dan kearifan lokal.”
              </blockquote>
              <div className="relative mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-emerald-200">
                <Leaf className="h-4 w-4" />
                Berkelanjutan dan berdaya saing
              </div>
            </article>

            <article className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <ShieldCheck className="h-6 w-6 text-emerald-800" />
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800">Misi utama</p>
              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">Empat langkah strategis</h3>

              <ol className="mt-6 space-y-4">
                {missions.map((mission, index) => (
                  <li key={mission} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 font-serif text-base text-emerald-800">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-7 text-slate-600">{mission}</p>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      {/* ================= STATISTIK WILAYAH ================= */}
      <section className={sectionPad}>
        <div className={wrap}>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className={`${eyebrow} text-emerald-800`}>Gambaran umum</p>
              <h2 className={h2}>
                Sekilas tentang
                <span className={`block text-emerald-800 ${serifAccent}`}>wilayah desa.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-600">
              Informasi ringkas yang menggambarkan identitas dan fokus pembangunan Desa Purbayani.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.label} className="group rounded-3xl border border-emerald-950/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 transition group-hover:bg-emerald-100">
                    <Icon className="h-5 w-5 text-emerald-800" />
                  </div>
                  <p className="mt-6 font-serif text-3xl leading-none text-[#0f3329] sm:text-4xl">{f.value}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-700">{f.label}</p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-400">{f.note}</p>
                </article>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            Catatan: data demografi dan luas wilayah perlu diverifikasi dengan data resmi pemerintah desa sebelum dipublikasikan.
          </p>
        </div>
      </section>

      {/* ================= NILAI PEMBANGUNAN ================= */}
      <section className={`relative overflow-hidden bg-[#061f1b] text-white ${sectionPad}`}>
        <div aria-hidden className="glow absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-emerald-500/15 blur-[110px]" />
        <div className={`${wrap} relative`}>
          <div className="max-w-2xl">
            <p className={`${eyebrow} text-emerald-300`}>Prinsip pembangunan</p>
            <h2 className={h2}>
              Tumbuh dengan nilai
              <span className={`block text-emerald-200 ${serifAccent}`}>yang berarti.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Tiga prinsip yang mendukung arah pengembangan desa berbasis Smart Eco-Tourism.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10 sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-6 w-6 text-emerald-300" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-2.5 text-sm leading-7 text-white/70">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={sectionPad}>
        <div className={`${wrap} relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2e28] to-[#10574a] px-7 py-12 text-white sm:px-12 md:px-14 md:py-14`}>
          <div aria-hidden className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -right-2 -top-10 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className={`${eyebrow} text-emerald-300`}>Temukan potensinya</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Purbayani punya
                <span className={`block text-emerald-200 ${serifAccent}`}>banyak cerita.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                Kenali keindahan destinasi wisata dan potensi ekonomi lokal yang menjadi bagian dari identitas desa.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/wisata" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-8 text-sm font-bold text-emerald-950 shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                Jelajahi Wisata
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/umkm" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10">
                Lihat UMKM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-emerald-950/10 bg-[#f7f8f4] px-6 py-6 sm:px-10 lg:px-16">
        <div className={`${wrap} flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between`}>
          <Link href="/" className="flex items-center gap-2 font-bold tracking-wide text-emerald-950">
            <Leaf className="h-4 w-4 text-emerald-800" />
            PURBAYANI <span className="font-normal text-emerald-800">ECO TOURISM</span>
          </Link>
          <p className="text-xs">Mengenal potensi desa, menjaga alam, memberdayakan warga.</p>
        </div>
      </footer>
    </main>
  );
}