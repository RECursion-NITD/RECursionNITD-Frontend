import { createContext, useState } from "react";
import { loginUser } from "../api/login";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user] = useState(null);
  const [authToken] = useState(null);

  const contextData = {
    user: user,
    token: authToken,
    loginUser: loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
