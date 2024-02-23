import { User, UserRoles } from '@/app/interfaces/general.interface';

export const notAdmins = (user: User | undefined): boolean => {
  if (user && user.role != UserRoles.ADMIN && user.role != UserRoles.HEADCOMPANY) return true
  return false
}