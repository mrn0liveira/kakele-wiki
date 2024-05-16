'use client';

import type { UserRole } from '@prisma/client';

import { FormError } from '../form-error';

import { useCurrentRole } from '@/src/hooks/use-current-role';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
  showError?: boolean;
}

export const RoleGate = ({ children, allowedRole, showError }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return showError ? <FormError message='Must be an admin' /> : <></>;
  }

  return <>{children}</>;
};
