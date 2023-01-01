import { useState } from "react";
import { loginUser } from "../api/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  );
};

export default Login;