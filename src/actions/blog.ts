'use server';

import { db } from '@/src/lib/db';

import type { Blog } from '@prisma/client';

import { revalidatePath, unstable_noStore } from 'next/cache';

const DASHBOARD = '/dashboard/blog';

export async function createBlog(data: Omit<Blog, 'id'>, lng = 'en') {
  const blogResult = await db.blog.findUnique({
    where: {
      title: data.title,
    },
  });

  if (blogResult) {
    return JSON.stringify({ error: 'Blog already exists', data: null });
  }
  const result = await db.blog.create({
    data: {
      ...data,
    },
  });
  revalidatePath(DASHBOARD);

  return JSON.stringify(result);
}

export async function getAuthorBlogs(authorId: string) {
  return db.blog.findMany({ where: { authorId } });
}

export async function readBlog(amount = 10) {
  unstable_noStore();
  return db.blog.findMany({
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
    take: amount,
  });
}

export async function readBlogAdmin() {
  return db.blog.findMany({});
}

export async function readBlogByTitle(title: string) {
  unstable_noStore();
  return db.blog.findUnique({ where: { title } });
}

export async function updateBlogById(id: string, data: Blog) {
  const result = await db.blog.update({
    where: { id },
    data: data,
  });

  revalidatePath(DASHBOARD);
  revalidatePath(`/blog/${id}`);

  return JSON.stringify(result);
}

export async function deleteBlogById(title: string) {
  const result = await db.blog.delete({ where: { title } });

  revalidatePath(DASHBOARD);
  revalidatePath(`/blog/${title}`);

  return JSON.stringify(result);
}
