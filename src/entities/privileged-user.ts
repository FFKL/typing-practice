import { Moderator } from './moderator';
import { Admin } from './admin';
import or from '../utils/or';

export const PrivilegedUser = or(Admin, Moderator);

export type PrivilegedUser = ReturnType<typeof PrivilegedUser>;
