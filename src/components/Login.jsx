import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import Glogin from "./GoogleLogin/Glogin";
import Usericon from "../assets/images/userr.svg";
import passicon from "../assets/images/password.svg";
import loginicon from "../assets/images/login_svg.svg";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { token, loginUser, setStatus, status } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for remember me checkbox
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (token) {
      setLoading(false);
      setStatus("typing");
    }
  }, [token, setLoading, setStatus]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe); // Toggle remember me

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = { username, password, rememberMe }; // Include rememberMe in the form data
    await loginUser(formData);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {token && <Navigate to={from} />}
      <div className="flex flex-col items-center justify-center p-6 rounded-lg max-w-md mx-auto">
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="flex flex-col items-center mb-4 justify-center">
            {/* Login Icon centered above the Heading */}
            <img src={loginicon} alt="Login Icon" className="w-28 mb-0" />

            <h1 className="text-white text-[2em] font-bold mb-8">Log In</h1>

            {/* Username Input */}
            <div className="flex items-center w-full mb-4">
              <img src={Usericon} alt="User Icon" className="w-11 h-11" />
              <input
                placeholder="Username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                disabled={status === "submitting"}
                className="w-[20em] bg-[#313131] text-white border border-[#58CDFF] px-4 py-2 focus:outline-none focus:border-[#58CDFF]"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center w-full mb-4">
              <img src={passicon} alt="Password Icon" className="w-11 h-11" />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                disabled={status === "submitting"}
                className="w-[20em] bg-[#313131] text-white border border-[#58CDFF] px-4 py-2 focus:outline-none focus:border-[#58CDFF]"
              />
            </div>

            {/* Remember Me and Forgot Password in a Flex Row */}
            <div className="flex justify-between w-full mb-4 mt-0">
              {/* Remember Me Checkbox */}
              <div className="flex items-center ml-0">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  disabled={status === "submitting"}
                  className="mr-2 accent-[#58CDFF]"
                />
                <label htmlFor="remember-me" className="text-white text-sm">
                  Remember me
                </label>
              </div>

              {/* Forgot Password Link */}
              <div className="mr-0">
                <a
                  href="/forgot-password"
                  className="text-[#58CDFF] text-sm hover:underline"
                >
                  Forgot your Password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#58CDFF] text-center text-white font-bold py-2 mt-0 rounded-lg mb-4 hover:bg-[#2B8BB5] focus:outline-none focus:ring-2 focus:ring-[#58CDFF] focus:ring-opacity-50"
            >
              LOGIN
            </button>

            {/* Google Login */}
            <Glogin />
            <div className="mt-2 text-sm ml-0">
              <p className="text-[#ffffff]">
                Do not have an account?
                <a
                  href="/signup"
                  className="font-bold text-[#58cdff] hover:underline"
                >
                  {" "}
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
