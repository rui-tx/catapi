import { useState } from "react";

import AuthContext from "../AuthContext";

const getLocalStorageIsLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

const getLocalStorageUser = () => {
  const user = localStorage.getItem("user");
  return localStorage.getItem("user") ? JSON.parse(user) : [];
};

// TODO: Replace with a more secure hashing algorithm, like sh512 or bcrypt
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(getLocalStorageIsLoggedIn());
  const [user, setUser] = useState(getLocalStorageUser());

  const handleLogin = (id) => {
    const hashedId = simpleHash(id);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(hashedId));

    setLoggedIn(true);
    setUser(hashedId);

    return true;
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, user, setUser, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
