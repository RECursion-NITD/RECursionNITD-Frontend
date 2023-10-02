import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import { login } from "../api/login";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { token, loginUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (token) {
      setLoading(false);
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
    // setLoading(true);
    const formData = { username: username, password: password };
    await loginUser(formData);
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      {token && <Navigate to={from} />}
      <div style={{ display: "flex", flexDirection: "column", margin: "4em" }}>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <Flex
            height={"100vh"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              direction={"column"}
              background={"gray.700"}
              p={12}
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
              >
                Log in
              </Button>
            </Flex>
          </Flex>
        </form>
      </div>
    </>
  );
};

export default Login;
