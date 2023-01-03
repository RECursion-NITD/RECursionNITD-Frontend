import { createContext, useState } from "react";
import { login } from "../api/login";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async (formData) => {
    login(formData)
      .then((data) => {
        setUser(jwtDecode(data?.access).user_id);
        setAuthToken(data);
        localStorage.setItem("authTokens", JSON.stringify(data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const contextData = {
    user: user,
    token: authToken,
    loginUser: loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
