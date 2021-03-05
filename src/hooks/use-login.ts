import { Password } from './../entities/password';
import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LoggedInActionType, LoggedInUser } from "../providers/logged-in-user";
import type { User } from "../entities/user";
import { Email } from '../entities/email';

export type Credentials = {
  email: string;
  password: string;
};

export default function useLogin(credentials: Credentials | null): User | null {
  const { loginService } = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LoggedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }
    
    Promise.resolve(credentials)
      .then(({ email, password }) => ({ email: Email.of(email), password: Password.of(password) }))
      .then(({ email, password }) => loginService.login(email, password))
      .then(user => dispatch!({ type: LoggedInActionType.LOG_IN, payload: user }))
      .then(() => navigate("/"))
      .catch(e => alert(e.message));
  }, [credentials, dispatch, loginService]);

  return state.user;
}
