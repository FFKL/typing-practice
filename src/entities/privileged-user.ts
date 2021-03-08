import { Moderator } from './moderator';
import { Admin } from './admin';
import or from '../utils/or';

export const PrivilegedUser = or(Admin, Moderator);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PrivilegedUser = ReturnType<typeof PrivilegedUser>;
