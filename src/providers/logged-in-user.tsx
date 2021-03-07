import { createContext, useReducer } from 'react';

import type { PrivilegedUser } from '../entities/privileged-user';

import type { ReactChild } from "react";
export enum LoggedInActionType {
  LOG_IN = "log in",
}

type LoggedInAction = {
  type: LoggedInActionType.LOG_IN;
  payload: PrivilegedUser;
};

type LoggedInProviderProps = {
  children: ReactChild | ReactChild[];
};

type LoggedInUserState = {
  user: PrivilegedUser | null;
};

type LoggedInProviderContext = {
  state?: LoggedInUserState;
  dispatch?: (action: LoggedInAction) => void;
};

const initialState = {
  user: null,
};

export const LoggedInUser = createContext<LoggedInProviderContext>({});

function LoggedInReducer(state: LoggedInUserState, action: LoggedInAction) {
  switch (action.type) {
    case LoggedInActionType.LOG_IN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function LoggedInProvider({ children }: LoggedInProviderProps) {
  const [state, dispatch] = useReducer(LoggedInReducer, initialState);
  return (
    <LoggedInUser.Provider value={{ dispatch, state }}>
      {children}
    </LoggedInUser.Provider>
  );
}
