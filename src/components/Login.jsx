// export const login = async (formData) => {
//   const response = await fetch(
//     "http://127.0.0.1:8000/api/token/", // TODO: use axi
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify({
//         username: formData.username,
//         password: formData.password,
//       }),
//     }
//   );
//   const data = await response.json();
//   console.log("data", data);
//   return data;
// };

// export default login;
/* eslint-disable */


import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import { Flex, Heading, Input, Button, Box } from "@chakra-ui/react";
import { login } from "../api/login";
import Glogin from "./GoogleLogin/Glogin";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { token, loginUser, setStatus, status } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (token) {
      setLoading(false);
      setStatus("typing");
    }
  }, [token]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = {
      username: username,
      password: password,
    };
    await loginUser(formData);
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      {token && <Navigate to={from} />}
      <Box 
        background={"gray.700"}
        style={{ display: "flex", flexDirection: "column", margin: "auto", padding:'10px',justifyContent:'space-around' }}
        rounded={6}
      >
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <Flex
            height={"fit-content"}
            alignItems={"flex-end"}
            justifyContent={"center"}
          >
            <Flex
              direction={"column"}
              background={"gray.700"}
              px={12}
              rounded={6}
            >
              <Heading mb={50} color={"white"}>
                Log in
              </Heading>
              <Input
                placeholder="Username"
                variant={"filled"}
                background={"whiteAlpha.50"}
                border="1px"
                borderColor="teal.200"
                mb={3}
                type={"text"}
                onChange={(e) => handleUsernameChange(e)}
                value={username}
                disabled={status === "submitting"}
              />
              <Input
                placeholder="Password"
                variant={"filled"}
                mb={3}
                background={"whiteAlpha.50"}
                border="1px"
                borderColor="teal.200"
                type={"password"}
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                disabled={status === "submitting"}
              />
              <Button
                onClick={() => {
                  login({ username, password });
                }}
                background={"teal.200"}
                _hover={{ bg: "teal.300" }}
                _active={{
                  bg: "teal.400",
                  transform: "scale(0.95)",
                }}
                color={"gray.900"}
                mb={3}
                type="submit"
                style={{ hover: "teal.300" }}
                width={"100%"}
                disabled={status === "submitting"}
              >
                Log in
              </Button>
              <Glogin />
            </Flex>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default Login;

