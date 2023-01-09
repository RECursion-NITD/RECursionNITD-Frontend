import { createContext, useEffect, useState } from "react";
import { login } from "../api/login";
import { refresh } from "../api/refreshToken";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async (formData) => {
    login(formData)
      .then((data) => {
        localStorage.setItem("authTokens", JSON.stringify(data));
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: jwtDecode(data?.access).user_id,
            username: formData.username,
          })
        );
        setUser({
          id: jwtDecode(data?.access).user_id,
          username: formData.username,
        });
        setAuthToken(data);
      })
      .catch((err) => {
        console.log("cant login user -> err", err);
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setUser(null);
    setAuthToken(null);
  };

  const refreshTokens = async () => {
    authToken &&
      refresh(authToken?.refresh)
        .then((data) => {
          data = { access: data?.access, refresh: authToken?.refresh };
          localStorage.setItem("authTokens", JSON.stringify(data));
          setAuthToken(data);
        })
        .catch(() => {
          console.log("cant refresh token -> err");
          logoutUser();
        });

    if (loading) setLoading(false);
  };

  const contextData = {
    user: user,
    token: authToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) refreshTokens();

    let interval = setInterval(() => {
      if (authToken) {
        refreshTokens();
      }
    }, 360000);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
