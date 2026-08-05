/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { login } from "../api/login";
import { register } from "../api/register";
import { refresh } from "../api/refreshToken";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { getProfileRoles } from "../api/getRoles";
import { useNavigate } from "react-router-dom";
import { getApiError } from "../utils/getApiError";
// import useLoading from "../hooks/useLoading";

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("typing");
  const toast = useToast();
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => {
    try {
      const saved = localStorage.getItem("authTokens");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) return JSON.parse(savedUser);

      const savedTokens = localStorage.getItem("authTokens");
      if (savedTokens) {
        const parsed = JSON.parse(savedTokens);
        if (parsed?.access) {
          const decoded = jwtDecode(parsed.access);
          return {
            id: decoded.user_id,
            username: decoded.username || decoded.email?.split("@")[0],
            role: "normal",
          };
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  const decodeTokens = async (tokens) => {
    if (!tokens || !tokens.access) {
      toast({
        title: "Cant Authorize",
        description: tokens?.response || "Failed to authenticate",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setStatus("typing");
      return;
    }

    setAuthToken({
      access: tokens.access,
      refresh: tokens.refresh,
    });
    localStorage.setItem("authTokens", JSON.stringify(tokens));

    let role = "normal";
    try {
      const res = await getProfileRoles(jwtDecode(tokens?.access).user_id);
      if (res?.role) role = res.role;
    } catch (error) {
      console.error("Error fetching roles:", error);
    }

    const decoded = jwtDecode(tokens?.access);
    const username = decoded.username || decoded.email.split("@")[0];
    const userData = {
      id: decoded.user_id,
      username: username,
      email: decoded.email,
      role: role,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setStatus("typing");
  };

  const loginUser = async (formData) => {
    try {
      const data = await login(formData);
      if (!data || !data.access) {
        throw new Error(data?.response || "Invalid login response");
      }

      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthToken(data);

      let role = "normal";
      try {
        const res = await getProfileRoles(jwtDecode(data?.access).user_id);
        if (res?.role) role = res.role;
      } catch (e) {
        console.warn("Could not fetch user role:", e);
      }

      const userData = {
        id: jwtDecode(data?.access).user_id,
        username: formData.username,
        role: role,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setStatus("typing");
    } catch (err) {
      setLoading(false);
      const errorMessage = getApiError(err);
      toast({
        title: "Login Failed",
        description: errorMessage,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setStatus("typing");
    }
  };

  // const registerUser = async (formData) => {
  //   try {
  //     setStatus("submitting");

  //     const data = await register(formData);

  //     if (data?.error || data?.errors) {
  //       toast({
  //         title: "Registration Failed",
  //         description: data?.error || "Invalid details",
  //         position: "top",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //       setStatus("typing");
  //       return;
  //     }

  //     toast({
  //       title: "Account Created",
  //       description: "You can now login with your credentials",
  //       position: "top",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });

  //     setStatus("typing");
  //   } catch (err) {
  //     console.error("register error:", err);
  //     toast({
  //       title: "Registration Error",
  //       description: "Something went wrong",
  //       position: "top",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     setStatus("typing");
  //   }
  // };

  const registerUser = async ({ username, email, password, confirmPassword }) => {
    try {
      const payload = {
        username,
        email,
        password,
        password2: confirmPassword,
      };

      const response = await axios.post("/users/register/", payload);
      
      // Axios throws on 4xx/5xx, so if we are here, it's mostly success.
      // But we should check if the backend wraps errors in 200 OK (unlikely for REST)
      // or if we need to display a specific success message.
      
      toast({
        title: "Account Created",
        description: "Activation link sent to your email.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setStatus("typing");
    } catch (err) {
      console.error(err);
      const errorMessage = getApiError(err);
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setStatus("typing");
    }
  };

  const resetUserPassword = async( { email } ) => {
    try {
      const response = await axios.post("/users/password-reset/", { email });

      toast({
        title: "Password Reset Email sent",
        description: "Check your email for the reset link.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      setStatus("typing");
      navigate("reset/sent");
    } catch (err){
      console.error(err);
      const errorMessage = getApiError(err);

      toast({
        title: "Email Not found", // Or just "Error"
        description: errorMessage,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setStatus("typing");
    }
  }

  const resetPasswordSubmit = async({uidb64, newtoken, password, confirmPassword}) => {
    try {
      const payload = {
        uidb64,
        token: newtoken,
        password,
        confirm_password: confirmPassword,
      };

      const response = await axios.post("/users/password-reset-confirm/", payload);

      toast({
        title: "Password successfully changed!",
        description: "You can now login with your new password.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      navigate("");
      
      setStatus("typing");
    } catch (err){
      console.error(err);
      const errorMessage = getApiError(err);

      toast({
        title: "Reset Failed",
        description: errorMessage,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setStatus("typing");
    }
  }

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

          logoutUser();
        });

    if (loading) setLoading(false);
  };

  const contextData = {
    user: user,
    token: authToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    resetUserPassword: resetUserPassword,
    resetPasswordSubmit: resetPasswordSubmit,
    setStatus: setStatus,
    status: status,
    decodeTokens: decodeTokens,
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
