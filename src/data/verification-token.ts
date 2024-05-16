import { db } from '@/src/lib/db';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByWhoRequested = async (request_email_change_by: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { request_email_change_by },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
