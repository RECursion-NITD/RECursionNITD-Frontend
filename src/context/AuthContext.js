/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import { login } from "../api/login";
import { refresh } from "../api/refreshToken";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
// import useLoading from "../hooks/useLoading";

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("typing");
  const toast = useToast();
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

  const decodeTokens = async (tokens) => {
    if (tokens.response !== "valid") {
      toast({
        title: "Cant Authorize",
        description: tokens.response,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setUser({
      id: jwtDecode(tokens?.access).user_id,
      username: jwtDecode(tokens?.access).email,
    });
    setAuthToken({
      access: tokens.access,
      refresh: tokens.refresh,
    });
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  };

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
        setLoading(false);
        if (formData.username && formData.password) {
          toast({
            title: "Account not Found",
            description: "Username or Password is incorrect.",
            position: "top",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login Failed",
            description: "Please fill in all the fields",
            position: "top",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        console.log("cant login user -> err", err);
        setStatus("typing");
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
    setStatus: setStatus,
    status: status,
    decodeTokens: decodeTokens,
  };

  useEffect(() => {
    if(authToken && !user){
      decodeTokens(authToken)
    }

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
