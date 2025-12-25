/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import { login } from "../api/login";
import { register } from "../api/register";
import { refresh } from "../api/refreshToken";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { getProfileRoles } from "../api/getRoles";
import { useNavigate } from "react-router-dom";
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
    getProfileRoles(jwtDecode(tokens?.access).user_id).then((res) => {
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
    });
  };

  const loginUser = async (formData) => {
    login(formData)
      .then((data) => {
        localStorage.setItem("authTokens", JSON.stringify(data));
        getProfileRoles(jwtDecode(data?.access).user_id)
        .then((res)=>{
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: jwtDecode(data?.access).user_id,
              username: formData.username,
              role:res.role,
            })
          );
          setUser({
            id: jwtDecode(data?.access).user_id,
            username: formData.username,
            role:res.role,
          });
        })
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
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password1", password);        // Django default
      formData.append("password2", confirmPassword); // Django default
      formData.append("ajax_check", "True");

      const response = await fetch("http://127.0.0.1:8000/profile/register/", {
        method: "POST",
        body: formData,
        credentials: "include", // IMPORTANT for CSRF
      });

      const text = await response.text();
      // alert(text); // show Django message
      if (text=="A user with that Email already exists." || text=="This password is too common." || text=="A user with that username already exists." || text=="This field is required." || text=="This password is too short. It must contain at least 8 characters."){
        toast({
          title: "Signup failed",
          description: text,
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: "Signup successful",
          description: text,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      setStatus("typing");
    } catch (err) {
      console.error(err);
    }
  };

  const resetUserPassword = async( { email } ) => {
    try {

      const response = await fetch("http://127.0.0.1:8000/profile/password_reset/", {
        method: "POST",
        body: new URLSearchParams({
          ajax_check: "True",
          email: email,
        }),
      });

      const text = await response.text();

      if (text=="No user with that Email exists."){
        toast({
          title: "Email Not found",
          description: text,
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
      else {
        toast({
          title: "Password Reset Email sent",
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        })

        setStatus("typing");
        navigate("reset/sent");
      }

      setStatus("typing");
    } catch (err){
      console.error(err);
    }
  }

  const resetPasswordSubmit = async({uidb64, newtoken, password, confirmPassword}) => {
    try {

      const response = await fetch(`http://127.0.0.1:8000/profile/reset/${uidb64}/${newtoken}/`, {
        method: "POST",
        body: new URLSearchParams({
          password: password,
          confirmPassword: confirmPassword,
        }),
      });

      const text = await response.text();

      if (text=="Changed."){
        toast({
          title: "Password successfully changed!",
          description: text,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        })

        navigate("");
      }
      else {
        toast({
          title: "Invalid Password",
          description: text,
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
      
      setStatus("typing");
    } catch (err){
      console.error(err);
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
