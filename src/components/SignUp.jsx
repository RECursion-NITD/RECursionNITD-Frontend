import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import Usericon from "../assets/images/userr.svg";
import passicon from "../assets/images/password.svg";
import loginicon from "../assets/images/login_svg.svg";
import emaill from "../assets/images/email.svg";

import { useToast } from "@chakra-ui/react"; // Added useToast import

const SignUp = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { token, loginUser, setStatus, status, registerUser } = useAuth();
  const toast = useToast(); // Initialize useToast

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Separate email state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Separate confirm password state
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (token) {
      setLoading(false);
      setStatus("typing");
    }
  }, [token, setLoading, setStatus]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value); // Handle email change
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value); // Handle confirm password change

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Show sending toast
    const sendingToastId = toast({
      title: "Sending confirmation link to your email...",
      status: "success",
      position: "top",
      duration: null, // Keeps it open until manually closed
      isClosable: false,
    });

    try {
      const formData = { username, email, password, confirmPassword }; // Create the form data
      await registerUser(formData); // Pass the form data to the login function
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      // Close the sending toast when the operation completes (success or failure)
      // This assumes registerUser handles the success/error toasts or state updates that follow
      toast.close(sendingToastId);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {token && <Navigate to={from} />}
      <div className="flex flex-col items-center justify-center p-6 rounded-lg max-w-lg mx-auto">
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="flex flex-col items-center mb-4 justify-center">
            {/* Login Icon centered above the Heading */}
            <img src={loginicon} alt="Login Icon" className="w-28 mb-0" />
            <h1 className="text-white text-[2em] font-bold mb-8">Sign Up</h1>

            {/* Username Input */}
            <div className="flex items-center w-full mb-2">
              <img src={Usericon} alt="User Icon" className="w-11 h-11" />
              <input
                placeholder="Username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                disabled={status === "submitting"}
                className="w-full bg-[#313131] text-white border border-[#58CDFF] px-4 py-2 focus:outline-none focus:border-[#58CDFF]"
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center w-full mb-2">
              <img src={emaill} alt="Email Icon" className="w-11 h-11" />
              <input
                placeholder="Email"
                type="email"
                value={email} // Bind to email state
                onChange={handleEmailChange} // Handle email input change
                disabled={status === "submitting"}
                className="w-full bg-[#313131] text-white border border-[#58CDFF] px-4 py-2 focus:outline-none focus:border-[#58CDFF]"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center w-full mb-2">
              <img src={passicon} alt="Password Icon" className="w-11 h-11" />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                disabled={status === "submitting"}
                className="w-full bg-[#313131] text-white border border-[#58CDFF] px-4 py-2 focus:outline-none focus:border-[#58CDFF]"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex items-center w-full mb-4">
              <img src={passicon} alt="Password Icon" className="w-11 h-11" />
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} // Handle confirm password input
                disabled={status === "submitting"}
                className="w-full bg-[#313131] text-white border border-[#58CDFF] px-4 py-2 focus:outline-none focus:border-[#58CDFF]"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#58CDFF] text-center text-white font-bold py-2 mt-0 rounded-lg mb-4 hover:bg-[#2B8BB5] focus:outline-none focus:ring-2 focus:ring-[#58CDFF] focus:ring-opacity-50"
            >
              SIGNUP
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
