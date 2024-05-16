import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/src/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');
  const amount = searchParams.get('amount');

  if (Number.isNaN(Number(amount) || Number(amount) > 10 || Number(amount) < 1)) {
    return NextResponse.json({ error: 'Amount must be a number between 1 and 10' }, { status: 400 });
  }

  if (amount) {
    const blogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        language: true,
        description: true,
        imageUrl: true,
        authorId: true,
        updatedAt: true,
        publishedAt: true,
      },
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: Number(amount),
    });

    return NextResponse.json(blogs);
  }

  if (!id) {
    return NextResponse.json({ error: 'Id is required' }, { status: 400 });
  }

  if (id === '*') {
    const blogs = await db.blog.findMany({ where: { published: true } });

    return NextResponse.json(blogs);
  }

  const blog = await db.blog.findUnique({
    where: {
      id,
      published: true,
    },
  });

  return NextResponse.json(blog);
}
