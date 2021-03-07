import { useContext } from 'react';

import type { PrivilegedUser } from '../entities/privileged-user';
import Services from '../services';

import type { User } from "../entities/user";

export default function useOperations(user: User, currentUser: PrivilegedUser) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
