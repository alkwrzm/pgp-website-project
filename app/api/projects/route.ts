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
    const { title, category, imageUrl, eventDate, description } = body;

    if (!title || !category || !imageUrl || !eventDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        category,
        imageUrl,
        eventDate: new Date(eventDate),
        description,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
