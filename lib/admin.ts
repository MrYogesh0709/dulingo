import { Roles } from '@/types/globals';
import { auth } from '@clerk/nextjs';

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  if (!sessionClaims || !sessionClaims.metadata) {
    return false;
  }

  return sessionClaims.metadata.role === role;
};
