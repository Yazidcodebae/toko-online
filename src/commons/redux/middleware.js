import axios from "axios";
import jwtDecode from "jwt-decode";
import { authAction } from "./auth/slice";

export const tokenInterceptor = (store) => (next) => (action) => {
  const state = store.getState();
  const { token } = state.auth;

  if (token) {
    const decodedToken = jwtDecode(token);

    // clear token after the token expires
    if (decodedToken.exp - new Date().getTime() / 1000 <= 0) {
      next(authAction.updateToken(undefined));
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return next(action);
};
