import { prisma } from '@/lib/prisma';

export const INITIAL_SERVICES = [
  {
    title: 'PocketDrop (Aplikasi / Online)',
    subtitle: 'Aplikasi koleksi photocard digital & reward',
    category: 'Photocard & Merchandise',
    description: 'Aplikasi/platform koleksi photocard digital dan sistem reward yang dibangun menggunakan lisensi resmi idol K-Pop.',
    images: [],
    order: 1,
  },
  {
    title: 'PIC2GO (Kiosk / Offline)',
    subtitle: 'Mesin kiosk cetakan foto koleksi idol',
    category: 'Photocard & Merchandise',
    description: 'Layanan berupa mesin kiosk yang dapat langsung membuat cetakan foto koleksi dari berbagai K-Pop Idol.',
    images: [],
    order: 2,
  },
  {
    title: 'Konser & Fanmeeting K-Pop',
    subtitle: 'Penyelenggaraan event & fansign',
    category: 'Konser & Fanmeeting',
    description: 'Berencana untuk menyelenggarakan konser, fanmeeting, serta fansign K-Pop berkualitas tinggi di Indonesia.',
    images: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop'
    ],
    order: 3,
  },
  {
    title: 'Agensi Iklan / Model',
    subtitle: 'Penghubung Brand Indonesia & Idol Korea',
    category: 'Agensi Iklan & Model',
    description: 'Menghubungkan perusahaan Indonesia dengan idol K-Pop maupun aktor Korea sebagai model iklan atau model produk.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1600&auto=format&fit=crop'
    ],
    order: 4,
  },
  {
    title: 'Agensi Penghubung Perusahaan',
    subtitle: 'Penghubung Brand Korea & Artis Indonesia',
    category: 'Agensi Penghubung Perusahaan',
    description: 'Menghubungkan perusahaan Korea yang masuk ke Indonesia dengan artis Indonesia sebagai model produk.',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop'
    ],
    order: 5,
  },
  {
    title: 'Kerjasama Influencer',
    subtitle: 'Kemitraan Influencer Indonesia & Korea',
    category: 'Kerjasama Influencer',
    description: 'Bermitra dengan influencer Indonesia & Korea untuk pemasaran, impor, dan ekspor produk antar negara.',
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
