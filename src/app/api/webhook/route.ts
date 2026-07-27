import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper untuk mengirim pesan WhatsApp balasan menggunakan API Fonnte
async function sendWhatsapp(to: string, message: string) {
  try {
    await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': process.env.FONNTE_TOKEN || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: to,
        message: message,
      }),
    });
  } catch (error) {
    console.error('Gagal mengirim WhatsApp via Fonnte:', error);
  }
}

// Fungsi helper untuk generate slug otomatis dari judul berita
function createSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter aneh
    .replace(/\s+/g, '-')         // Ganti spasi dengan tanda minus
    .trim();
}

// Helper reset temporary session UMKM & Berita
async function resetSession(phone: string) {
  await prisma.waSession.update({
    where: { phone },
    data: {
      step: 'IDLE',
      tempTitle: null,
      tempIsi: null,
      tempUmkmNama: null,
      tempUmkmKategori: null,
      tempUmkmDeskripsi: null,
      tempUmkmKontak: null,
      tempUmkmLat: null,
      tempUmkmLng: null,
    },
  });
}

// Endpoint POST utama yang akan ditembak oleh Webhook Fonnte
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Fonnte mengirimkan data nomor pengirim di properti 'sender' dan teks di 'message'
    const sender = body.sender; 
    const incomingMessage = body.message?.trim();

    if (!sender || !incomingMessage) {
      return NextResponse.json({ status: 'ignored', message: 'Data tidak lengkap' });
    }

    // 1. Ambil atau buat sesi percakapan (WaSession) untuk nomor WhatsApp ini
    let session = await prisma.waSession.findUnique({
      where: { phone: sender },
    });

    if (!session) {
      session = await prisma.waSession.create({
        data: {
          phone: sender,
          step: 'IDLE',
        },
      });
    }

    // --- FITUR BATAL GLOBAL ---
    if (incomingMessage.toLowerCase() === 'batal' && session.step !== 'IDLE') {
      await resetSession(sender);
      await sendWhatsapp(sender, '❌ Proses telah dibatalkan. Sesi direset ke menu awal.');
      return NextResponse.json({ status: 'success' });
    }

    // 2. Alur Logika State Machine Bot Desa Purbayani
    
    // ==========================================
    // --- STATE 1: IDLE (Menu Awal) ---
    // ==========================================
    if (session.step === 'IDLE') {
      const msg = incomingMessage.toLowerCase();

      if (msg === 'tulis berita') {
        await prisma.waSession.update({
          where: { phone: sender },
          data: { step: 'WAITING_FOR_TITLE' },
        });

        await sendWhatsapp(sender, '📝 Baik, silakan ketik *Judul Berita* yang ingin kamu publikasikan untuk Kabar Desa Purbayani:');
      } 
      else if (msg === 'daftar umkm') {
        await prisma.waSession.update({
          where: { phone: sender },
          data: { step: 'UMKM_WAITING_NAMA' },
        });

        await sendWhatsapp(
          sender,
          '🏪 *Pendaftaran UMKM Purbayani*\n\n' +
          'Silakan ketik **Nama UMKM / Usaha** Anda:\n' +
          '*(Ketik *batal* kapan saja untuk menghentikan)*'
        );
      } 
      else {
        // Balasan menu utama
        const menuUtama = 
          `Halo! Selamat datang di Sistem Informasi Desa Purbayani 👋\n\n` +
          `Silakan ketik salah satu perintah di bawah ini:\n\n` +
          `👉 *tulis berita* : Untuk menerbitkan berita desa ke website\n` +
          `👉 *daftar umkm* : Untuk mendaftarkan UMKM baru ke direktori web`;
        
        await sendWhatsapp(sender, menuUtama);
      }
      return NextResponse.json({ status: 'success' });
    }

    // ==========================================
    // --- ALUR BOT BERITA DESA ---
    // ==========================================

    // --- STATE: WAITING_FOR_TITLE ---
    if (session.step === 'WAITING_FOR_TITLE') {
      await prisma.waSession.update({
        where: { phone: sender },
        data: { 
          step: 'WAITING_FOR_CONTENT',
          tempTitle: incomingMessage 
        },
      });

      await sendWhatsapp(sender, `✔️ Judul berhasil disimpan: *"${incomingMessage}"*\n\nSilakan ketik *Isi Berita* secara lengkap (Ketik *batal* jika ingin menyudahi):`);
      return NextResponse.json({ status: 'success' });
    }

    // --- STATE: WAITING_FOR_CONTENT ---
    if (session.step === 'WAITING_FOR_CONTENT') {
      await prisma.waSession.update({
        where: { phone: sender },
        data: { 
          step: 'WAITING_FOR_CONFIRMATION',
          tempIsi: incomingMessage 
        },
      });

      const reviewPesan = 
        `🔍 *Tinjau Kembali Berita Anda*\n\n` +
        `*Judul:* ${session.tempTitle}\n` +
        `*Isi:* ${incomingMessage}\n\n` +
        `Apakah berita ini sudah benar dan siap dipublikasikan ke website Purbayani?\n` +
        `Ketik *YA* untuk terbitkan, ketik *BATAL* untuk membatalkan.`;

      await sendWhatsapp(sender, reviewPesan);
      return NextResponse.json({ status: 'success' });
    }

    // --- STATE: WAITING_FOR_CONFIRMATION ---
    if (session.step === 'WAITING_FOR_CONFIRMATION') {
      if (incomingMessage.toLowerCase() === 'ya') {
        const judulFinal = session.tempTitle || 'Berita Tanpa Judul';
        const isiFinal = session.tempIsi || '';
        
        const ringkasanFinal = isiFinal.length > 100 ? isiFinal.substring(0, 100) + '...' : isiFinal;
        const baseSlug = createSlug(judulFinal);
        const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
        const tanggalSekarang = new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        await prisma.berita.create({
          data: {
            judul: judulFinal,
            slug: uniqueSlug,
            kategori: 'Umum',
            ringkasan: ringkasanFinal,
            isi: isiFinal,
            gambar: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            tanggal: tanggalSekarang,
          },
        });

        await resetSession(sender);
        await sendWhatsapp(sender, `🚀 *Selamat!* Berita Anda yang berjudul *"${judulFinal}"* telah berhasil terbit di website Purbayani Eco-Tourism! ✨`);
      } else {
        await resetSession(sender);
        await sendWhatsapp(sender, '❌ Publikasi dibatalkan. Sesi telah direset ke awal.');
      }

      return NextResponse.json({ status: 'success' });
    }

    // ==========================================
    // --- ALUR BOT PENDAFTARAN UMKM ---
    // ==========================================

    // --- UMKM STEP 1: NAMA ---
    if (session.step === 'UMKM_WAITING_NAMA') {
      await prisma.waSession.update({
        where: { phone: sender },
        data: {
          step: 'UMKM_WAITING_KATEGORI',
          tempUmkmNama: incomingMessage,
        },
      });

      await sendWhatsapp(
        sender,
        `✔️ Nama UMKM: *"${incomingMessage}"*\n\n` +
        `Pilih atau ketik *Kategori Usaha*:\n` +
        `Contoh: *Kuliner*, *Penginapan*, *Jasa*, *Kriya Kerajinan*, atau *Warung Kelontong*`
      );
      return NextResponse.json({ status: 'success' });
    }

    // --- UMKM STEP 2: KATEGORI ---
    if (session.step === 'UMKM_WAITING_KATEGORI') {
      await prisma.waSession.update({
        where: { phone: sender },
        data: {
          step: 'UMKM_WAITING_DESKRIPSI',
          tempUmkmKategori: incomingMessage,
        },
      });

      await sendWhatsapp(
        sender,
        `✔️ Kategori: *"${incomingMessage}"*\n\n` +
        `Silakan ketik *Deskripsi Singkat Usaha* (produk yang dijual, keunggulan, dll):`
      );
      return NextResponse.json({ status: 'success' });
    }

    // --- UMKM STEP 3: DESKRIPSI ---
    if (session.step === 'UMKM_WAITING_DESKRIPSI') {
      await prisma.waSession.update({
        where: { phone: sender },
        data: {
          step: 'UMKM_WAITING_KONTAK',
          tempUmkmDeskripsi: incomingMessage,
        },
      });

      await sendWhatsapp(
        sender,
        `✔️ Deskripsi disimpan.\n\n` +
        `Ketik *Nomor WhatsApp / Kontak* yang bisa dihubungi pembeli:\n` +
        `*(Ketik tanda minus (-) jika tidak ada nomor hp)*`
      );
      return NextResponse.json({ status: 'success' });
    }

    // --- UMKM STEP 4: KONTAK ---
    if (session.step === 'UMKM_WAITING_KONTAK') {
      const noKontak = incomingMessage === '-' ? null : incomingMessage;

      await prisma.waSession.update({
        where: { phone: sender },
        data: {
          step: 'UMKM_WAITING_KOORDINAT',
          tempUmkmKontak: noKontak,
        },
      });

      await sendWhatsapp(
        sender,
        `✔️ Kontak disimpan.\n\n` +
        `Terakhir, kirimkan *Koordinat Lokasi (Latitude, Longitude)* Google Maps:\n` +
        `Contoh format: *-7.4932, 108.1234*\n\n` +
        `*(Ketik - jika lokasi belum diketahui)*`
      );
      return NextResponse.json({ status: 'success' });
    }

    // --- UMKM STEP 5: KOORDINAT & KONFIRMASI SIMPAN ---
    if (session.step === 'UMKM_WAITING_KOORDINAT') {
      let lat: string | null = null;
      let lng: string | null = null;

      if (incomingMessage !== '-') {
        const parts = incomingMessage.split(',');
        if (parts.length === 2) {
          lat = parts[0].trim();
          lng = parts[1].trim();
        }
      }

      await prisma.waSession.update({
        where: { phone: sender },
        data: {
          step: 'UMKM_WAITING_CONFIRMATION',
          tempUmkmLat: lat,
          tempUmkmLng: lng,
        },
      });

      const reviewUmkm = 
        `🔍 *Tinjau Kembali Data UMKM Anda*\n\n` +
        `🏪 *Nama Usaha:* ${session.tempUmkmNama}\n` +
        `🏷️ *Kategori:* ${session.tempUmkmKategori}\n` +
        `📝 *Deskripsi:* ${session.tempUmkmDeskripsi}\n` +
        `📞 *Kontak:* ${session.tempUmkmKontak || 'Tidak Ada'}\n` +
        `📍 *Koordinat:* ${lat && lng ? `${lat}, ${lng}` : 'Belum Ditentukan'}\n\n` +
        `Apakah data di atas sudah benar?\n` +
        `Ketik *YA* untuk simpan ke website, ketik *BATAL* untuk membatalkan.`;

      await sendWhatsapp(sender, reviewUmkm);
      return NextResponse.json({ status: 'success' });
    }

    // --- UMKM STEP 6: SAVE TO DATABASE ---
    if (session.step === 'UMKM_WAITING_CONFIRMATION') {
      if (incomingMessage.toLowerCase() === 'ya') {
        await prisma.umkm.create({
          data: {
            nama: session.tempUmkmNama || 'UMKM Purbayani',
            kategori: session.tempUmkmKategori || 'Lainnya',
            deskripsi: session.tempUmkmDeskripsi || '-',
            kontak: session.tempUmkmKontak,
            latitude: session.tempUmkmLat,
            longitude: session.tempUmkmLng,
          },
        });

        await resetSession(sender);
        await sendWhatsapp(
          sender,
          `🎉 *Selamat!* UMKM *"${session.tempUmkmNama}"* berhasil terdaftar dan langsung tayang di Direktori UMKM Website Purbayani Eco-Tourism!`
        );
      } else {
        await resetSession(sender);
        await sendWhatsapp(sender, '❌ Pendaftaran UMKM dibatalkan.');
      }

      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}