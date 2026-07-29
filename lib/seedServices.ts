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
    images: [],
    order: 3,
  },
  {
    title: 'Agensi Iklan / Model',
    subtitle: 'Penghubung Brand Indonesia & Idol Korea',
    category: 'Agensi Iklan & Model',
    description: 'Menghubungkan perusahaan Indonesia dengan idol K-Pop maupun aktor Korea sebagai model iklan atau model produk.',
    images: [],
    order: 4,
  },
  {
    title: 'Agensi Penghubung Perusahaan',
    subtitle: 'Penghubung Brand Korea & Artis Indonesia',
    category: 'Agensi Penghubung Perusahaan',
    description: 'Menghubungkan perusahaan Korea yang masuk ke Indonesia dengan artis Indonesia sebagai model produk.',
    images: [],
    order: 5,
  },
  {
    title: 'Kerjasama Influencer',
    subtitle: 'Kemitraan Influencer Indonesia & Korea',
    category: 'Kerjasama Influencer',
    description: 'Bermitra dengan influencer Indonesia & Korea untuk pemasaran, impor, dan ekspor produk antar negara.',
    images: [],
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
