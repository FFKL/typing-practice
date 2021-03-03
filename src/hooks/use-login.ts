import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LoggedInActionType, LoggedInUser } from "../providers/logged-in-user";
import type { User } from "../entities/user";

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
    loginService.login(credentials.email, credentials.password)
      .then((user: User) => dispatch!({ type: LoggedInActionType.LOG_IN, payload: user }))
      .then(() => navigate("/"))
      .catch(e => alert(e.message));
  }, [credentials, dispatch]);

  return state.user;
}
