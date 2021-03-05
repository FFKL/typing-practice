import { useContext } from 'react';

import { navigate } from '@reach/router';

import { PrivilegedUser } from '../entities/privileged-user';
import { LoggedInUser } from '../providers/logged-in-user';

export default function useCurrentUser(): PrivilegedUser | null {
  const { state: { user } = { user: null } } = useContext(LoggedInUser);
  if (user === null) {
    navigate("/login");
  }
  return user;
}

