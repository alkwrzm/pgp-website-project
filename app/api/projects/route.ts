import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const whereClause = category ? { category } : {};
    
    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { eventDate: 'desc' },
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Basic auth check
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, imageUrl, images, eventDate, description, isActive } = body;

    if (!title || !category || (!imageUrl && (!images || images.length === 0))) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const finalImages = Array.isArray(images) && images.length > 0 ? images : (imageUrl ? [imageUrl] : []);
    const primaryImage = imageUrl || finalImages[0] || '';

    const project = await prisma.project.create({
      data: {
        title,
        category,
        imageUrl: primaryImage,
        images: finalImages,
        eventDate: eventDate ? new Date(eventDate) : null,
        description,
        ...(typeof isActive === 'boolean' && { isActive }),
      } as any,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
