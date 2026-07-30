import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const photos = {
  'Konser & Fanmeeting': [
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop'
  ],
  'Agensi Iklan': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1600&auto=format&fit=crop'
  ],
  'Agensi Penghubung': [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop'
  ],
  'Kerjasama Influencer': [
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1600&auto=format&fit=crop'
  ]
};

async function main() {
  for (const [title, images] of Object.entries(photos)) {
    const services = await prisma.service.findMany({ where: { title: { contains: title } } });
    for (const service of services) {
      await prisma.service.update({
        where: { id: service.id },
        data: { images }
      });
      console.log('Updated', service.title);
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
