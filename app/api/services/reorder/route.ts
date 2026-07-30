import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const isAuth = await verifyAuth(request);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items } = body; // Array of { id: string, order: number }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    }

    // Bulk update service order indices in a transaction
    await prisma.$transaction(
      items.map((item: { id: string; order: number }) =>
        prisma.service.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder services:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
