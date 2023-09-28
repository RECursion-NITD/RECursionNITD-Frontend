import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { login } from "../api/login";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // const {user,
  //   token,
  //   loginUser,
  //   logoutUser}=useContext(AuthContext);
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.300", "gray.700");
  // const navigate=useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { token, loginUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (token) setLoading(false);
  }, [token]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { username: username, password: password };

    // if(token) navigate("/home");

    await loginUser(formData);
    // console.log(formData);
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      {token && <Navigate to={from} />}
      <div style={{ display: "flex", flexDirection: "column", margin: "4em" }}>
        <h1>Login Page</h1>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <Flex
            height={"100vh"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              direction={"column"}
              background={formBackground}
              p={12}
              rounded={6}
            >
              <Heading mb={50}> Log in</Heading>
              <Input
                placeholder="Email ID"
                variant={"filled"}
                mb={3}
                type={"text"}
                onChange={(e) => handleUsernameChange(e)}
                value={username}
              />
              <Input
                placeholder="Password"
                variant={"filled"}
                mb={3}
                type={"password"}
                onChange={(e) => handlePasswordChange(e)}
                value={password}
              />
              <Button
                onClick={() => {
                  login({ username, password });
                }}
                colorScheme={"teal"}
                mb={3}
                type="submit"
              >
                Log in
              </Button>
              <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
            </Flex>
          </Flex>
          {/* <input
            style={{ display: "flex", flexDirection: "column", margin: "4em" }}
            onChange={(e) => handleUsernameChange(e)}
            placeholder="username"
            value={username}
          />

          <input
            style={{ display: "flex", flexDirection: "column", margin: "4em" }}
            onChange={(e) => handlePasswordChange(e)}
            placeholder="password"
            value={password}
          />

          <button
            style={{ display: "flex", flexDirection: "column", margin: "4em" }}
            type="submit"
          >
            Login
          </button> */}
        </form>
      </div>
    </>
  );
};

export default Login;
