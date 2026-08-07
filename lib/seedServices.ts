import { prisma } from '@/lib/prisma';

export const INITIAL_SERVICES = [
  {
    title: 'PocketDrop (Aplikasi / Online)',
    subtitle: 'Aplikasi koleksi photocard digital & reward',
    category: 'Photocard & Merchandise',
    description: 'PocketDrop adalah platform untuk mengoleksi photocard digital berlisensi resmi dari artis K-Pop. Pengguna dapat mengoleksi photocard digital, melengkapi set untuk mendapatkan photocard fisik edisi terbatas yang belum pernah dirilis, serta menerima pesan video AI yang dipersonalisasi dari artis K-Pop favorit mereka.',
    images: [],
    order: 1,
  },
  {
    title: 'PIC2GO (Kiosk / Offline)',
    subtitle: 'Mesin kiosk cetakan foto koleksi idol',
    category: 'Idol Photo & Merchandise',
    description: 'PIC2GO merupakan layanan kiosk yang dapat langsung mencetak foto K-Pop Idol secara instan. PIC2GO menyediakan koleksi foto eksklusif yang belum pernah dipublikasikan kepada publik yang diperoleh melalui lisensi resmi. Pengguna hanya perlu mencari nama artis atau gambar yang diinginkan, memilih foto favorit, kemudian langsung mencetaknya melalui kiosk. Dengan proses yang cepat, mudah, dan menyenangkan, PIC2GO menghadirkan pengalaman yang lebih personal dalam mengoleksi foto K-Pop Idol serta memberikan kenang-kenangan eksklusif yang dapat langsung dibawa pulang.',
    images: [],
    order: 2,
  },
  {
    title: 'Konser dan Fanmeeting K-Pop',
    subtitle: 'Penyelenggaraan event & fansign',
    category: 'Konser & Fanmeeting',
    description: 'Di Indonesia, melalui konser, fanmeeting, dan fan signing bersama K-Pop Idol serta aktor K-drama, kami berupaya untuk memberikan kesenangan dan kebahagiaan yang lebih besar para penggemar. Di lokasi konser dan lokasi fanmeeting, kami juga akan melakukan penjualan merchandise dari idol dan aktor, serta penjualan K-Food.',
    images: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop'
    ],
    order: 3,
  },
  {
    title: 'Agensi Iklan/Model',
    subtitle: 'Penghubung Brand Indonesia & Idol Korea',
    category: 'Agensi Iklan & Model',
    description: 'Kami akan menghubungkan penyanyi idol Korea dan aktor Korea sebagai model iklan atau model produk untuk produk-produk yang diproduksi di Indonesia. Untuk artis yang telah dipilih sebagai model produk, kami akan membuat photocard eksklusif dan juga merencanakan pemberian photocard sebagai hadiah dengan pembelian produk.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1600&auto=format&fit=crop'
    ],
    order: 4,
  },
  {
    title: 'Kerjasama Influencer',
    subtitle: 'Kemitraan Influencer Indonesia & Korea',
    category: 'Kerjasama Influencer',
    description: 'Kami akan menjalin kemitraan dengan influencer Indonesia untuk membantu pemasaran dan penjualan produk Korea maupun produk Indonesia. Kami juga akan membantu aktivitas influencer Korea di Indonesia, serta bekerja sama dengan influencer Korea agar produk-produk Indonesia dapat lebih dikenal dan memiliki peluang penjualan yang lebih besar di pasar Korea.',
    images: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1600&auto=format&fit=crop'
    ],
    order: 6,
  },
];

export async function ensureServicesSeeded() {
  try {
    const count = await prisma.service.count();
    if (count === 0) {
      console.log('Seeding initial default services into database...');
      await prisma.service.createMany({
        data: INITIAL_SERVICES,
      });
    }
  } catch (error) {
    console.error('Failed to seed services:', error);
  }
}
