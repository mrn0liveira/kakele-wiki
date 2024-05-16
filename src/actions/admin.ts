'use server';

import { UserRole } from '@prisma/client';

import { currentSessionRole } from '@/src/lib/auth-utils';

export const admin = async () => {
  const role = await currentSessionRole();

  if (role === UserRole.ADMIN) {
    return { success: 'Allowed Server Action!' };
  }

  return { error: 'Forbidden Server Action!' };
};
