import { Session } from 'next-auth';
import { UpdateSession } from 'next-auth/react';

export interface AuthSession {
  update: UpdateSession;
  data: Session | null;
  status: string;
}
