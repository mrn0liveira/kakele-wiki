'use server';

import type * as zod from 'zod';
import bcrypt from 'bcryptjs';

import { getUserByEmail } from '@/src/data/user';
import { sendVerificationEmail } from '@/src/lib/mail';
import { RegisterSchema } from '@/src/schemas';
import { db } from '@/src/lib/db';
import { generateVerificationToken } from '@/src/lib/tokens';

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  console.log('jhgdfashgdfashg');
  const validatedFields = RegisterSchema.safeParse(values);

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
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
