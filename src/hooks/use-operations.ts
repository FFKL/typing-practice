import { useContext } from 'react';

import type { PrivilegedUser } from '../entities/privileged-user';
import Services from '../services';

import type { User } from "../entities/user";

export default function useOperations<U1 extends User, U2 extends PrivilegedUser>(user: U1, currentUser: U2) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
