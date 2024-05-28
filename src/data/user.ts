import type { User } from '@prisma/client';

import { db } from '@/src/lib/db';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
