import type { Static } from 'runtypes';

import { Admin } from './admin';
import { Moderator } from './moderator';

export const PrivilegedUser = Admin.Or(Moderator);

export type PrivilegedUser = Static<typeof PrivilegedUser>;
