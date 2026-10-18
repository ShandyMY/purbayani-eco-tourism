import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,
  MapPin,
  Waves,
  Leaf,
  Store,
  Landmark,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
} from 'lucide-react';
import MapClient from '@/components/Map/MapClient';
import PanoramaClient from '@/components/VirtualTour/PanoramaClient';

export const revalidate = 0;

/* ------------------------------------------------------------------
   BERANDA VERSI PRESENTASI (skala diperkecil agar lebih proporsional)
   - Satu file, tanpa komponen klien tambahan.
   - Efek scroll memakai variabel CSS yang diisi skrip kecil di bawah.
   - Panel navigasi titik di sisi kanan membantu berpindah bagian.
------------------------------------------------------------------- */
const css = `
html{scroll-behavior:smooth}
@keyframes rise{from{transform:translateY(112%)}to{transform:none}}
@keyframes fadeup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes marquee{to{transform:translateX(-50%)}}
@keyframes drift{to{transform:translateX(-50%)}}
@keyframes float{50%{transform:translateY(-8px)}}
@keyframes glow{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,-30px) scale(1.2)}}
@keyframes ping2{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.6);opacity:0}}
@keyframes cue{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
.rise{display:inline-block;animation:rise 1.25s cubic-bezier(.2,.7,.1,1) both;animation-delay:var(--d,0s)}
.fadeup{animation:fadeup 1s ease-out both;animation-delay:var(--d,0s)}
.marquee-track{animation:marquee 60s linear infinite}
.marquee:hover .marquee-track{animation-play-state:paused}
.drift{animation:drift 22s linear infinite}
.drift-slow{animation:drift 38s linear infinite reverse}
.float{animation:float 6s ease-in-out infinite}
.glow{animation:glow 11s ease-in-out infinite alternate}
.ping2{animation:ping2 2.4s ease-out infinite}
.cue{animation:cue 2.2s ease-in-out infinite}
.outline-text{-webkit-text-stroke:1px rgba(255,255,255,.18);color:transparent}
.no-scrollbar{scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}

/* ---------- Efek scroll (semua browser) ---------- */
.hero-par{transform:translate3d(0,calc(var(--h,0)*12%),0) scale(calc(1 + var(--h,0)*.08))}
.parallax-img{transform:translate3d(0,calc((var(--p,.5) - .5)*10%),0) scale(1.12)}
.slide-l{transform:translate3d(calc((1 - var(--p,1))*-10%),0,0)}
.scrub .w{opacity:clamp(.18,calc((var(--c,1)*100 - (var(--i)*1.25 + 6))/20),1)}
.fx .reveal:not(.in){opacity:var(--r,1);transform:translateY(calc((1 - var(--r,1))*32px)) scale(calc(.98 + var(--r,1)*.02))}

/* ---------- Sehari di Purbayani: tampilan dasar (statis) ---------- */
.day-stage{position:relative;overflow:hidden;background:linear-gradient(180deg,#8fc6cf 0%,#9ad4ea 42%,#f2a35f 100%);padding:5rem 0 8rem}
.sky,.sun,.dusk,.day-prog{display:none}
.dps{display:grid;gap:1.25rem}
.sky{position:absolute;inset:0}
.sky-pagi{background:linear-gradient(180deg,#7fb7c4 0%,#f3d9b1 62%,#f9e9cf 100%)}
.sky-siang{background:linear-gradient(180deg,#1f86c6 0%,#7cc7e8 55%,#d6f0f5 100%)}
.sky-senja{background:linear-gradient(180deg,#171b4a 0%,#7a3560 38%,#ee8449 74%,#ffc27a 100%)}
.sun{position:absolute;width:clamp(70px,7vw,120px);aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%)}
.dusk{position:absolute;inset:0;background:#02100e}
.hill{color:#2f7d66}

/* ---------- Sehari di Purbayani: mode scroll (kelas .fx dipasang skrip) ---------- */
.fx .day-wrap{height:380svh}
.fx .day-stage{position:sticky;top:0;height:100svh;padding:0;display:flex;align-items:center;background:#9fd0d6}
.fx .sky,.fx .sun,.fx .dusk,.fx .day-prog{display:block}
.fx .dps{gap:0}
.fx .dp{grid-area:1/1;pointer-events:none}
.fx .day-wrap[data-phase="1"] .dp-1,.fx .day-wrap[data-phase="2"] .dp-2,.fx .day-wrap[data-phase="3"] .dp-3{pointer-events:auto}

.fx .sky-pagi{opacity:clamp(0,calc((.4 - var(--d,0))/.12),1)}
.fx .sky-siang{opacity:clamp(0,min(calc((var(--d,0) - .28)/.12),calc((.72 - var(--d,0))/.12)),1)}
.fx .sky-senja{opacity:clamp(0,calc((var(--d,0) - .6)/.12),1)}

.fx .dp-1{opacity:clamp(0,calc((.34 - var(--d,0))/.08),1);transform:translateY(calc(clamp(0,calc((var(--d,0) - .26)/.08),1)*-28px))}
.fx .dp-2{opacity:clamp(0,min(calc((var(--d,0) - .3)/.08),calc((.68 - var(--d,0))/.08)),1);transform:translateY(calc((1 - clamp(0,calc((var(--d,0) - .3)/.08),1))*28px - clamp(0,calc((var(--d,0) - .6)/.08),1)*28px))}
.fx .dp-3{opacity:clamp(0,calc((var(--d,0) - .64)/.08),1);transform:translateY(calc((1 - clamp(0,calc((var(--d,0) - .64)/.08),1))*28px))}

.fx .sun{
  --sun:color-mix(in srgb,#ff6a35 calc(clamp(0,calc((var(--d,0) - .5)/.5),1)*100%),color-mix(in srgb,#fffbe6 calc(clamp(0,calc(var(--d,0)/.5),1)*100%),#ffe3a3));
  left:calc(6% + 88%*var(--d,0));
  top:calc(14% + 52%*(2*var(--d,0) - 1)*(2*var(--d,0) - 1));
  background-color:var(--sun);
  box-shadow:0 0 100px 36px color-mix(in srgb,var(--sun) 50%,transparent);
}
.fx .dusk{opacity:calc(clamp(0,calc((var(--d,0) - .55)/.45),1)*.5)}
.fx .hill{color:color-mix(in srgb,#0a2a24 calc(clamp(0,calc((var(--d,0) - .5)/.5),1)*100%),color-mix(in srgb,#1f6b57 calc(clamp(0,calc(var(--d,0)/.5),1)*100%),#3b8a72))}
.fx .day-bar{transform:scaleX(var(--d,0))}
.fx .pl1{opacity:calc(.4 + .6*clamp(0,calc((.4 - var(--d,0))/.1),1))}
.fx .pl2{opacity:calc(.4 + .6*min(clamp(0,calc((var(--d,0) - .3)/.1),1),clamp(0,calc((.72 - var(--d,0))/.12),1)))}
.fx .pl3{opacity:calc(.4 + .6*clamp(0,calc((var(--d,0) - .64)/.08),1))}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important}
  .hero-video{display:none}
}
`;

const fxScript = `
(function(){
  if(window.__pfx)return;
  window.__pfx=1;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var d=document,root=d.documentElement,raf=0;
  var cl=function(v){return v<0?0:v>1?1:v};
  var cover=function(r,vh){return (vh-r.top)/(vh+r.height)};
  var set=function(el,k,v){el.style.setProperty(k,v.toFixed(4))};
  function each(sel,fn){var n=d.querySelectorAll(sel);for(var i=0;i<n.length;i++)fn(n[i])}
  function tick(){
    raf=0;
    var vh=window.innerHeight,y=window.pageYOffset;
    each('.hero-par',function(el){set(el,'--h',cl(y/vh))});
    each('.reveal',function(el){
      var r=el.getBoundingClientRect(),top=r.top-(el._dy||0);
      var p=cl((vh-top)/Math.min(r.height||1,vh)/.55);
      el._dy=(1-p)*32;
      set(el,'--r',p);
      el.classList.toggle('in',p>=1);
    });
    each('.parallax-img',function(el){set(el,'--p',cl(cover(el.parentElement.getBoundingClientRect(),vh)))});
    each('.slide-l',function(el){set(el,'--p',cl(cover(el.getBoundingClientRect(),vh)/.7))});
    each('.scrub',function(el){set(el,'--c',cl(cover(el.getBoundingClientRect(),vh)))});
    each('.day-wrap',function(el){
      var p=cl((cover(el.getBoundingClientRect(),vh)-.2)/.6);
      set(el,'--d',p);
      el.setAttribute('data-phase',p<.3?'1':p<.66?'2':'3');
    });
    each('.count',function(el){
      var p=cl((cover(el.getBoundingClientRect(),vh)-.2)/.3),to=+el.getAttribute('data-to')||0,t=String(Math.round(to*p));
      if(el.textContent!==t)el.textContent=t;
    });
  }
  function req(){if(!raf)raf=window.requestAnimationFrame(tick)}
  root.classList.add('fx');
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);
  window.setInterval(req,400);
  tick();
})();
`;

/* Skala tipografi & spasi terpusat, ubah di sini untuk menyetel seluruh halaman */
const wrap = 'mx-auto w-full max-w-[1200px] 2xl:max-w-[1360px]';
const h2 = 'text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl';
const eyebrow = 'mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]';
const sectionPad = 'px-6 py-20 sm:px-10 lg:px-16 lg:py-28';

const intro =
  'Di ujung selatan Garut, ombak, kebun, dan dapur-dapur kecil warga bercerita dengan cara mereka sendiri. Purbayani bukan sekadar tempat singgah, melainkan desa yang layak dikenal pelan-pelan.';

const fallbackMarquee = ['Pantai Purbayani', 'Ekowisata', 'Rancabuaya', 'Kuliner Pesisir', 'Panorama 360°', 'Garut Selatan'];

const sectionNav = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'angka', label: 'Dalam angka' },
  { id: 'sehari', label: 'Sehari di Purbayani' },
  { id: 'jelajah', label: 'Jelajahi' },
  { id: 'peta', label: 'Peta digital' },
  { id: 'virtual-tour', label: 'Virtual tour' },
];

const phases = [
  {
    n: 1, icon: Sunrise, time: '05.30 – 09.00', title: 'Pagi',
    line: 'Udara pesisir masih sejuk. Waktu terbaik untuk berjalan di tepi pantai.',
    items: ['Jalan santai di garis pantai', 'Sarapan di warung warga', 'Abadikan cahaya pertama hari'],
    href: '/wisata', cta: 'Lihat destinasi',
  },
  {
    n: 2, icon: Sun, time: '10.00 – 15.00', title: 'Siang',
    line: 'Saatnya menjelajah kawasan ekowisata dan mengenal usaha warga.',
    items: ['Telusuri kawasan alam', 'Mampir ke UMKM lokal', 'Makan siang kuliner pesisir'],
    href: '/umkm', cta: 'Kenali UMKM',
  },
  {
    n: 3, icon: Sunset, time: '16.00 – 18.30', title: 'Senja',
    line: 'Langit berubah jingga. Duduk, tenang, dan nikmati sore di Purbayani.',
    items: ['Menanti matahari terbenam', 'Berbincang dengan warga', 'Rencanakan hari berikutnya'],
    href: '#virtual-tour', cta: 'Lihat panorama 360°',
  },
];

function formatHarga(v: unknown) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') return v === 0 ? 'Gratis' : `Rp ${v.toLocaleString('id-ID')}`;
  return String(v);
}

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

export default async function Home() {
  let wisataList: any[] = [];
  let umkmList: any[] = [];
  let fasilitasList: any[] = [];

  try {
    const [wisata, umkm, fasilitas] = await Promise.all([
      prisma.wisata.findMany({
        select: { id: true, nama: true, kategori: true, deskripsi: true, lokasi: true, hargaTiket: true, jamOperasional: true, gambar: true, latitude: true, longitude: true, virtualTourUrl: true },
      }),
      prisma.umkm.findMany({
        select: { id: true, nama: true, kategori: true, deskripsi: true, kontak: true, gambar: true, latitude: true, longitude: true },
      }),
      prisma.fasilitas.findMany({
        select: { id: true, nama: true, deskripsi: true, kategori: true, alamat: true, kontak: true, jamOperasional: true, gambar: true, latitude: true, longitude: true },
      }),
    ]);
    wisataList = wisata;
    umkmList = umkm;
    fasilitasList = fasilitas;
  } catch (error) {
    console.error('Database belum terhubung. Beranda menggunakan tampilan tanpa data database.', error);
  }

  const directories = [
    { number: '01', title: 'Wisata Alam', subtitle: 'Temukan pesona pesisir selatan', description: 'Jelajahi pantai, kawasan mangrove, dan bentang alam yang menjadi kebanggaan Purbayani.', href: '/wisata', image: '/assets/images/wisata-cover.jpg', tag: 'Nature & Adventure', icon: Compass, color: 'text-emerald-300', span: 'lg:col-span-6 lg:row-span-2' },
    { number: '02', title: 'UMKM Lokal', subtitle: 'Cerita di balik karya warga', description: 'Produk unggulan, kerajinan, dan kuliner yang menggerakkan ekonomi desa.', href: '/umkm', image: '/assets/images/umkm-cover.jpg', tag: 'Local Experiences', icon: Store, color: 'text-amber-300', span: 'lg:col-span-3' },
    { number: '03', title: 'Profil Desa', subtitle: 'Mengenal Purbayani lebih dekat', description: 'Sejarah, potensi wilayah, dan arah pengembangan desa.', href: '/profil', image: '/assets/images/profil-cover.jpg', tag: 'About The Village', icon: Landmark, color: 'text-sky-300', span: 'lg:col-span-3' },
    { number: '04', title: 'Kabar Desa', subtitle: 'Cerita dan perkembangan terbaru', description: 'Kegiatan, agenda masyarakat, dan kabar seputar kehidupan desa.', href: '/berita', image: '/assets/images/berita-cover.jpg', tag: 'Stories & Updates', icon: Sparkles, color: 'text-rose-300', span: 'lg:col-span-6' },
    { number: '05', title: 'Fasilitas Publik', subtitle: 'Perjalanan yang nyaman', description: 'Fasilitas umum, layanan masyarakat, dan sarana pendukung di desa.', href: '/fasilitas', image: '/assets/images/fasilitas-cover.jpg', tag: 'Public Facilities', icon: ShieldCheck, color: 'text-violet-300', span: 'lg:col-span-6' },
    { number: '06', title: 'Usaha Lokal', subtitle: 'Dukung ekonomi warga', description: 'Pilihan usaha dan layanan lokal untuk mendukung perjalanan sekaligus masyarakat.', href: '/umkm', image: '/assets/images/usaha-cover.jpg', tag: 'Discover Local', icon: Leaf, color: 'text-lime-300', span: 'lg:col-span-6' },
  ];

  const stats = [
    { count: wisataList.length, label: 'Destinasi', icon: Compass },
    { count: umkmList.length, label: 'UMKM', icon: Store },
    { count: fasilitasList.length, label: 'Fasilitas', icon: Landmark },
  ];
  const marqueeItems = wisataList.length ? wisataList.map((w) => w.nama) : fallbackMarquee;
  const featured = wisataList.slice(0, 8);
  const words = intro.split(' ');

  return (
    <main className="overflow-x-clip bg-[#f7f8f4] text-[#183b32]">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Script id="purbayani-fx" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: fxScript }} />

      {/* Navigasi titik untuk presentasi */}
      <nav aria-label="Lompat ke bagian" className="fixed right-5 top-1/2 z-[900] hidden -translate-y-1/2 flex-col gap-3.5 xl:flex">
        {sectionNav.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="group flex items-center justify-end gap-3">
            <span className="rounded-full bg-[#061f1b]/90 px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">{s.label}</span>
            <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-900/80 shadow-md ring-1 ring-emerald-950/30 transition group-hover:scale-125 group-hover:bg-emerald-300" />
          </a>
        ))}
      </nav>

      {/* ================= HERO ================= */}
      <section id="beranda" className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#061f1b] text-white">
        <div className="hero-par absolute inset-0 will-change-transform">
          <Image src="/assets/images/hero-fallback.jpg" alt="Panorama alam Desa Purbayani" fill priority sizes="100vw" className="object-cover object-center" />
          <video autoPlay loop muted playsInline poster="/assets/images/hero-fallback.jpg" className="hero-video absolute inset-0 h-full w-full object-cover object-center">
            <source src="/assets/videos/hero-purbayani.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-[#061f1b]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f1b]/85 via-[#061f1b]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061f1b] via-[#061f1b]/25 to-[#061f1b]/40" />
        <div aria-hidden className="glow absolute -left-24 top-1/4 h-[320px] w-[320px] rounded-full bg-emerald-400/20 blur-[100px]" />

        <p aria-hidden className="outline-text pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[14vw] leading-none tracking-tight">
          PURBAYANI
        </p>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-28 pt-28 sm:px-10 lg:px-16 lg:pb-28 lg:pt-32 2xl:max-w-[1440px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <div>
              <div className="fadeup mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md" style={{ ['--d' as string]: '.1s' }}>
                <span className="relative flex h-2 w-2">
                  <span className="ping2 absolute inline-flex h-full w-full rounded-full bg-emerald-300" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">Selamat datang di Desa Purbayani</span>
              </div>

              <h1 className="text-[clamp(2rem,min(8vw,8vh),3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[clamp(2.5rem,min(4.2vw,8vh),4.5rem)] 2xl:text-[5rem]">
                <span className="block overflow-y-clip pb-[0.12em] pt-[0.1em]"><span className="rise" style={{ ['--d' as string]: '.25s' }}>Temukan harmoni</span></span>
                <span className="block overflow-y-clip pb-[0.16em] pt-[0.04em]">
                  <span className="rise bg-gradient-to-r from-emerald-200 via-white to-amber-200 bg-clip-text pb-[0.08em] pr-[0.06em] font-serif font-normal italic text-transparent" style={{ ['--d' as string]: '.45s' }}>
                    alam dan kehidupan.
                  </span>
                </span>
              </h1>

              <p className="fadeup mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base 2xl:max-w-xl 2xl:text-lg" style={{ ['--d' as string]: '1s' }}>
                Dari pesona pesisir selatan hingga potensi masyarakat lokal, kenali pengalaman ekowisata dan cerita autentik Desa Purbayani, Garut.
              </p>

              <div className="fadeup mt-7 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '1.2s' }}>
                <Link href="/wisata" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-7 text-sm font-bold text-[#103c31] shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
                  Jelajahi Destinasi
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="#tentang" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/5 px-7 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15">
                  Kenali Purbayani <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="fadeup hidden lg:block" style={{ ['--d' as string]: '.8s' }}>
                <div className="float rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Sekilas Purbayani</p>
                  <ul className="mt-4 space-y-3">
                    {stats.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                          <span className="flex items-center gap-3 text-sm text-white/80">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Icon className="h-4 w-4 text-emerald-300" /></span>
                            {s.label}
                          </span>
                          <span className="font-serif text-3xl">{s.count}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/70">
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-emerald-300" />Garut</span>
                    <span className="inline-flex items-center gap-1.5"><Waves className="h-3.5 w-3.5 text-emerald-300" />Pesisir Selatan</span>
                    <span className="inline-flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-emerald-300" />Ekowisata</span>
                  </div>
                  <a href="#peta" className="group mt-5 flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-300 hover:text-emerald-950">
                    Buka peta digital
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              <dl className="fadeup grid max-w-sm grid-cols-3 gap-2.5 lg:hidden" style={{ ['--d' as string]: '.8s' }}>
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-md">
                    <dd className="font-serif text-2xl">{s.count}</dd>
                    <dt className="text-[11px] text-white/70">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* petunjuk gulir */}
        <div aria-hidden className="absolute bottom-24 right-10 z-10 hidden flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 lg:flex">
          <span className="[writing-mode:vertical-rl]">Gulir</span>
          <span className="cue h-10 w-px bg-white/70" />
        </div>

        <Wave fill="#10574a" className="opacity-50" anim="drift-slow" />
        <Wave fill="#0b2e28" anim="drift" />
      </section>

      {/* ================= MARQUEE ================= */}
      <section aria-label="Daftar destinasi" className="marquee overflow-hidden bg-[#0b2e28] pb-10 pt-3 text-white">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {marqueeItems.map((name, i) => (
                <span key={`${k}-${i}`} className="flex items-center">
                  <span className={`px-6 font-serif text-3xl sm:text-4xl 2xl:text-5xl ${i % 2 ? 'italic text-emerald-200' : 'text-white/90'}`}>{name}</span>
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ================= TENTANG ================= */}
      <section id="tentang" className="relative scroll-mt-0 overflow-hidden px-6 py-20 sm:px-10 lg:px-16 lg:py-32">
        <div aria-hidden className="absolute -right-40 top-10 h-[440px] w-[440px] rounded-full border border-emerald-900/10" />
        <div aria-hidden className="absolute -right-10 top-36 h-[260px] w-[260px] rounded-full border border-emerald-900/10" />
        <div className="relative mx-auto max-w-[960px] 2xl:max-w-[1100px]">
          <p className={`${eyebrow} text-emerald-800`}>A Village Worth Discovering</p>
          <p className="scrub font-serif text-2xl leading-[1.35] text-[#0f3329] sm:text-3xl lg:text-[2.5rem] 2xl:text-5xl">
            {words.map((w, i) => (
              <span key={i} className="w" style={{ ['--i' as string]: i }}>{w} </span>
            ))}
          </p>
          <Link href="/profil" className="mt-10 inline-flex items-center gap-3 border-b border-emerald-800 pb-1.5 text-sm font-bold text-emerald-900 transition hover:gap-5">
            Mengenal Desa Purbayani <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= DALAM ANGKA ================= */}
      <section id="angka" className={`relative overflow-hidden bg-[#061f1b] text-white ${sectionPad}`}>
        <div aria-hidden className="glow absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-emerald-500/15 blur-[110px]" />
        <div className={`${wrap} relative`}>
          <h2 className={`reveal max-w-2xl ${h2}`}>
            Purbayani
            <span className="font-serif font-normal italic text-emerald-200"> dalam angka.</span>
          </h2>
          <dl className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/15">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="reveal md:px-8 first:md:pl-0">
                  <Icon className="mb-4 h-6 w-6 text-emerald-300" />
                  <dd className="font-serif text-6xl leading-none sm:text-7xl xl:text-8xl">
                    <span className="count" data-to={s.count} suppressHydrationWarning>{s.count}</span>
                  </dd>
                  <dt className="mt-3 text-base text-white/70 xl:text-lg">{s.label} tercatat di portal</dt>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ================= SEHARI DI PURBAYANI ================= */}
      <section id="sehari" aria-label="Sehari di Purbayani" className="day-wrap">
        <div className="day-stage text-white">
          <div aria-hidden className="sky sky-pagi" />
          <div aria-hidden className="sky sky-siang" />
          <div aria-hidden className="sky sky-senja" />
          <div aria-hidden className="sun" />

          <svg aria-hidden viewBox="0 0 1440 400" preserveAspectRatio="none" className="hill absolute inset-x-0 bottom-0 h-[38%] w-full">
            <path d="M0 250 C 200 150 380 210 560 160 S 900 110 1100 180 S 1340 210 1440 150 V400 H0Z" fill="currentColor" opacity=".55" />
            <path d="M0 330 C 220 250 420 320 640 270 S 1000 230 1200 290 S 1380 320 1440 280 V400 H0Z" fill="currentColor" />
          </svg>
          <Wave fill="#0f6a73" anim="drift" />
          <div aria-hidden className="dusk pointer-events-none" />

          <div className="relative z-20 w-full px-6 sm:px-10 lg:px-16">
            <div className={wrap}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">Perjalanan satu hari</p>
              <h2 className="mb-5 font-serif text-3xl drop-shadow sm:text-4xl xl:text-5xl">Sehari di Purbayani</h2>

              <div className="dps max-w-md xl:max-w-lg">
                {phases.map((p) => {
                  const Icon = p.icon;
                  return (
                    <article key={p.n} className={`dp dp-${p.n} rounded-2xl border border-white/20 bg-[#061f1b]/65 p-6 shadow-2xl backdrop-blur-xl sm:p-7`}>
                      <div className="flex items-center gap-2.5 text-emerald-200">
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-semibold tracking-wide">{p.time}</span>
                      </div>
                      <h3 className="mt-2 font-serif text-4xl leading-none sm:text-5xl xl:text-6xl">{p.title}</h3>
                      <p className="mt-4 text-base leading-7 text-white/85">{p.line}</p>
                      <ul className="mt-5 space-y-2 border-t border-white/15 pt-5 text-sm text-white/80 xl:text-base">
                        {p.items.map((it) => (
                          <li key={it} className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            {it}
                          </li>
                        ))}
                      </ul>
                      <Link href={p.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-200 transition hover:gap-4">
                        {p.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="day-prog absolute inset-x-0 bottom-20 z-20 hidden px-6 sm:px-10 md:block lg:px-16">
            <div className={wrap}>
              <div className="flex justify-between text-xs font-semibold text-white">
                <span className="pl1">Pagi</span><span className="pl2">Siang</span><span className="pl3">Senja</span>
              </div>
              <div className="mt-2.5 h-1 rounded-full bg-white/25"><div className="day-bar h-full origin-left rounded-full bg-white" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESTINASI PILIHAN ================= */}
      {featured.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="reveal mx-auto mb-10 flex max-w-[1280px] flex-col justify-between gap-5 px-6 sm:px-10 md:flex-row md:items-end lg:px-16 2xl:max-w-[1440px]">
            <h2 className={`max-w-2xl ${h2}`}>
              Destinasi yang
              <span className="font-serif font-normal italic text-emerald-800"> layak dikunjungi.</span>
            </h2>
            <Link href="/wisata" className="inline-flex items-center gap-3 text-sm font-bold text-emerald-900 transition hover:gap-5">
              Lihat semua destinasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="no-scrollbar mx-auto flex max-w-[1440px] snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:px-10 lg:px-16" tabIndex={0} aria-label="Destinasi pilihan">
            {featured.map((w, i) => {
              const harga = formatHarga(w.hargaTiket);
              return (
                <Link key={w.id} href="/wisata" className={`group relative isolate flex aspect-[4/5] w-[72vw] shrink-0 snap-start items-end overflow-hidden rounded-3xl bg-[#123b31] text-white sm:w-[300px] 2xl:w-[340px] ${i % 2 ? 'lg:mt-10' : ''}`}>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="parallax-img absolute inset-0">
                      <Image src={w.gambar || '/assets/images/wisata-cover.jpg'} alt={w.nama} fill unoptimized sizes="340px" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061b17] via-[#061b17]/30 to-transparent" />
                  {w.kategori && <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">{w.kategori}</span>}
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition group-hover:bg-emerald-300 group-hover:text-emerald-950"><ArrowUpRight className="h-4 w-4" /></span>
                  <div className="relative w-full p-5">
                    <h3 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{w.nama}</h3>
                    {w.lokasi && <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/70"><MapPin className="h-3.5 w-3.5 text-emerald-300" />{w.lokasi}</p>}
                    <p className="mt-3 border-t border-white/20 pt-3 text-sm font-semibold text-emerald-200">{harga ? `Tiket ${harga}` : 'Lihat detail'}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= DIREKTORI ================= */}
      <section id="jelajah" className={`bg-[#eaf0e9] ${sectionPad}`}>
        <div className={wrap}>
          <div className="reveal mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className={`max-w-2xl ${h2}`}>
              Satu desa,
              <span className="font-serif font-normal italic text-emerald-800"> begitu banyak cerita.</span>
            </h2>
            <p className="max-w-sm text-sm leading-7 text-slate-600">Destinasi, karya masyarakat, informasi desa, dan fasilitas dalam satu portal terintegrasi.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[230px] lg:grid-cols-12 2xl:auto-rows-[260px]">
            {directories.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.number} href={item.href} className={`reveal group relative isolate flex min-h-[260px] items-end overflow-hidden rounded-3xl bg-[#123b31] text-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl ${item.span}`}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061b17] via-[#061b17]/45 to-transparent" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                    <span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md">{item.tag}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition group-hover:bg-emerald-300 group-hover:text-emerald-950"><Icon className="h-4 w-4" /></span>
                  </div>
                  <div className="relative w-full p-5 sm:p-6">
                    <p className={`mb-1.5 text-[11px] font-bold tracking-[0.18em] ${item.color}`}>{item.number} / PURBAYANI</p>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-white/85">{item.subtitle}</p>
                    <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden"><p className="mt-2.5 max-w-md text-sm leading-6 text-white/70">{item.description}</p></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-200 transition-all group-hover:gap-4">Jelajahi <ArrowRight className="h-4 w-4" /></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PETA ================= */}
      <section id="peta" className={`scroll-mt-20 ${sectionPad}`}>
        <div className={wrap}>
          <div className="reveal mb-8 grid gap-5 md:grid-cols-[1fr_0.6fr] md:items-end">
            <h2 className={h2}>
              Potensi desa,
              <span className="font-serif font-normal italic text-emerald-800"> dalam satu peta.</span>
            </h2>
            <p className="text-sm leading-7 text-slate-600">Jelajahi sebaran destinasi, usaha masyarakat, dan fasilitas melalui pemetaan digital interaktif.</p>
          </div>

          <div className="mb-4 flex flex-wrap gap-2.5">
            {[
              { label: 'Wisata', n: wisataList.length, dot: 'bg-emerald-500' },
              { label: 'UMKM', n: umkmList.length, dot: 'bg-amber-400' },
              { label: 'Fasilitas', n: fasilitasList.length, dot: 'bg-sky-400' },
            ].map((c) => (
              <span key={c.label} className="inline-flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white px-3.5 py-1.5 text-sm font-medium shadow-sm">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                {c.label}
                <span className="font-serif text-base text-emerald-800">{c.n}</span>
              </span>
            ))}
          </div>

          <div className="reveal overflow-hidden rounded-3xl border border-emerald-950/10 bg-white p-2.5 shadow-[0_30px_70px_-40px_rgba(6,31,27,.5)] sm:p-4">
            <MapClient wisataList={wisataList} umkmList={umkmList} fasilitasList={fasilitasList} />
          </div>
        </div>
      </section>

      {/* ================= VIRTUAL TOUR ================= */}
      <section id="virtual-tour" className={`relative scroll-mt-20 overflow-hidden bg-[#082520] text-white ${sectionPad}`}>
        <div aria-hidden className="glow absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-[110px]" />
        <p aria-hidden className="outline-text slide-l pointer-events-none absolute -top-2 left-0 select-none whitespace-nowrap font-serif text-[11vw] leading-none">360°</p>

        <div className={`${wrap} relative grid gap-10 pt-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center`}>
          <div className="reveal">
            <p className={`${eyebrow} text-emerald-300`}>Beyond the Ordinary</p>
            <h2 className={h2}>
              Rasakan suasananya.
              <span className="mt-1.5 block font-serif font-normal italic text-emerald-200">Sebelum tiba.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/70 sm:text-base">Masuki virtual tour 360° untuk mengenal panorama Purbayani dari sudut pandang berbeda, langsung dari layar perangkat Anda.</p>
            <a href="#virtual-tour-player" className="mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-emerald-300 px-6 text-sm font-bold text-emerald-950 transition hover:bg-white">
              Mulai Virtual Tour <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div id="virtual-tour-player" className="reveal rounded-3xl border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.03] p-2 shadow-[0_0_90px_-30px_rgba(52,211,153,.5)] sm:p-2.5">
            <div className="overflow-hidden rounded-2xl">
              <PanoramaClient imageSrc="/panorama/pantai-360.jpg" title="Panorama Pantai Purbayani" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA PENUTUP ================= */}
      <section className="relative isolate flex min-h-[460px] items-center overflow-hidden bg-[#061f1b] px-6 py-20 text-white sm:px-10 lg:px-16">
        <Image src="/assets/images/hero-fallback.jpg" alt="" fill sizes="100vw" className="parallax-img -z-10 object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061f1b] via-[#061f1b]/75 to-[#061f1b]/20" />

        <div className={`${wrap} flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between`}>
          <div className="reveal max-w-2xl 2xl:max-w-3xl">
            <p className={`${eyebrow} text-emerald-300`}>Your Next Journey Starts Here</p>
            <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Cerita Purbayani
              <span className="block font-serif font-normal italic text-emerald-200">menanti ditemukan.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/80 sm:text-base">Mulai perjalanan mengenal pesona alam, potensi masyarakat, dan pengalaman lokal Desa Purbayani.</p>
          </div>
          <div className="reveal flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/wisata" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-300 px-8 text-sm font-bold text-emerald-950 shadow-[0_10px_30px_-10px_rgba(110,231,183,.7)] transition hover:bg-white">
              Mulai Eksplorasi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/profil" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/10">Kenali desa</Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-emerald-950/10 bg-[#f7f8f4] px-6 py-6 sm:px-10 lg:px-16">
        <div className={`${wrap} flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between`}>
          <div>
            <p className="font-bold tracking-wide text-emerald-950">PURBAYANI <span className="font-normal text-emerald-800">ECO TOURISM</span></p>
            <p className="mt-1 text-xs">Mengenal potensi, menjaga alam, menggerakkan masyarakat.</p>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Desa Purbayani</p>
        </div>
      </footer>
    </main>
  );
}