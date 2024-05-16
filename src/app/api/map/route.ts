import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/src/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get('tag');

  if (tag) {
    const data = await db.mapPoint.findMany({
      where: {
        tag: tag,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  }

  return NextResponse.json({ data: [] }, { status: 200 });
}
