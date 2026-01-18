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

    if (!tokens.access) {
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
      setAuthToken({
      access: tokens.access,
      refresh: tokens.refresh,
    });
    localStorage.setItem("authTokens", JSON.stringify(tokens));
    
    try {
      const res = await getProfileRoles(jwtDecode(tokens?.access).user_id);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: jwtDecode(tokens?.access).user_id,
          username: jwtDecode(tokens?.access).email.split("@")[0],
          role: res.role,
        })
      );
      setUser({
        id: jwtDecode(tokens?.access).user_id,
        username: jwtDecode(tokens?.access).email.split("@")[0],
        email: jwtDecode(tokens?.access).email,
        role: res.role,
      });
    } catch (error) {
       console.error("Error fetching roles:", error);
       // Optional: Toast specific to role fetching failure? 
       // For now, allow login but maybe warn? Or just log it.
       // Ensuring it doesn't crash the Google Login flow entirely (though token is valid).
       toast({
          title: "Profile Error",
          description: "Could not fetch user roles.",
          status: "warning",
          duration: 3000,
          isClosable: true,
       });
    }
  };

  const loginUser = async (formData) => {
    try {
      const data = await login(formData);
      localStorage.setItem("authTokens", JSON.stringify(data));

      const res = await getProfileRoles(jwtDecode(data?.access).user_id);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: jwtDecode(data?.access).user_id,
          username: formData.username,
          role: res.role,
        })
      );

      setUser({
        id: jwtDecode(data?.access).user_id,
        username: formData.username,
        role: res.role,
      });

      setAuthToken(data);

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
