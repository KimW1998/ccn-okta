import { State } from "../types";

export const showUser = (reduxState: State) => {
  return reduxState.auth?.user;
};
