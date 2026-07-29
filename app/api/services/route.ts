import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { ensureServicesSeeded } from '@/lib/seedServices';

export async function GET() {
  try {
    await ensureServicesSeeded();
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, category, description, images, order } = body;

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        title,
        subtitle,
        category,
        description,
        images: Array.isArray(images) ? images : [],
        order: typeof order === 'number' ? order : 0,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
