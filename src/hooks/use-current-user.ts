import { useContext } from 'react';

import { navigate } from '@reach/router';

import { LoggedInUser } from '../providers/logged-in-user';

import type { User } from '../entities/user';

export default function useCurrentUser(): User | null {
  const { state: { user } = { user: null } } = useContext(LoggedInUser);
  if (user === null) {
    navigate("/login");
  }
  return user;
}

