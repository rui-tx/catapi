import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  user: {},
  setUser: () => {},
});

export default AuthContext;
