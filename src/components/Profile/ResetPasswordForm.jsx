import { Navigate, useLocation, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import passicon from "../../assets/images/password.svg";
import loginicon from "../../assets/images/login_svg.svg";

const ResetPasswordForm = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { uidb64, newtoken } = useParams();
  const { token, loginUser, setStatus, status, resetPasswordSubmit } = useAuth();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (token) {
      setLoading(false);
      setStatus("typing");
    }
  }, [token, setLoading, setStatus]);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setStatus("submitting");

    const formData = { uidb64, newtoken, password, confirmPassword }; // Include rememberMe in the form data
    await resetPasswordSubmit(formData);
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
            <img src={loginicon} alt="Login Icon" className="w-28 mb-0" />

            <h1 className="text-white text-[2em] font-bold mb-8">Enter new password</h1>

            <div className="flex items-center w-full mb-4">
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

            <div className="flex items-center w-full mb-4">
              <img src={passicon} alt="Password Icon" className="w-11 h-11" />
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={status === "submitting"}
                className="w-full bg-[#313131] text-white border border-[#58CDFF] px-4 py-2 focus:outline-none focus:border-[#58CDFF]"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#58CDFF] text-center text-white font-bold py-2 mt-0 rounded-lg mb-4 hover:bg-[#2B8BB5] focus:outline-none focus:ring-2 focus:ring-[#58CDFF] focus:ring-opacity-50"
            >
              SUBMIT
            </button>

          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
