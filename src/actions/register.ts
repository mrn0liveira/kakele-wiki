'use server';

import { headers } from 'next/headers';
import type * as zod from 'zod';
import bcrypt from 'bcryptjs';

import { hashIp } from '@/src/lib/auth-utils';
import { getUserByEmail } from '@/src/data/user';
import { sendVerificationEmail } from '@/src/lib/mail';
import { RegisterSchema } from '@/src/schemas';
import { db } from '@/src/lib/db';
import { generateVerificationToken } from '@/src/lib/tokens';

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  const headersList = headers();
  const userIp = headersList.get('request-ip');
  const hashedIp = await hashIp(userIp);

  if (userIp === '127.0.0.1' || !userIp || hashedIp === 'unknown') {
    return { error: 'Sorry! Something went wrong. Please try again later.' };
  }

  const existingAccounts = await db.user.count({
    where: { ip: hashedIp },
  });
  if (existingAccounts >= 2) {
    return {
      error: 'You are not allowed to register more accounts on this app preview',
    };
  }

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'Email already registered!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      ip: hashedIp,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
