import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import emaill from "../../assets/images/email.svg";

import { useToast } from "@chakra-ui/react"; // Added useToast import

const ResetPassword = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const { token, resetUserPassword, loginUser, setStatus, status, registerUser } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (token) {
      setLoading(false);
      setStatus("typing");
    }
  }, [token, setLoading, setStatus]);

  const handleEmailChange = (e) => setEmail(e.target.value); // Handle email change

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Show sending toast
    const sendingToastId = toast({
      title: "Sending password reset link to your email...",
      status: "success",
      position: "top",
      duration: null, // Keeps it open until manually closed
      isClosable: false,
    });

    try {
      const formData = { email }; // Create the form data
      await resetUserPassword(formData); // Pass the form data to the login function
    } catch (error) {
       console.error("Password reset failed", error);
    } finally {
       // Close the sending toast when the operation completes (success or failure)
       toast.close(sendingToastId);
    }
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

            {/* <img src={loginicon} alt="Login Icon" className="w-28 mb-0" /> */}
            <h1 className="text-white text-[2em] font-bold mb-8">Password Reset</h1>

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

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#58CDFF] text-center text-white font-bold py-2 mt-0 rounded-lg mb-4 hover:bg-[#2B8BB5] focus:outline-none focus:ring-2 focus:ring-[#58CDFF] focus:ring-opacity-50"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
