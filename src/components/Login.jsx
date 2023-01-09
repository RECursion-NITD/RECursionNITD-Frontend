import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { token, loginUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(token);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = { username: username, password: password };
    console.log(formData);
    loginUser(formData);
  };

  return (
    <>
      {token && <Navigate to={from} />}
      <div style={{ display: "flex", flexDirection: "column", margin: "4em" }}>
        <h1>Login Page</h1>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <input
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
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
