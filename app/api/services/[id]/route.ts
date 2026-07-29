import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, subtitle, category, description, images, order } = body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        title,
        subtitle,
        category,
        description,
        images: Array.isArray(images) ? images : [],
        ...(typeof order === 'number' && { order }),
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Failed to update service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
