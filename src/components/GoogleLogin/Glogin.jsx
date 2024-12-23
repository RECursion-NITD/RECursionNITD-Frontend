/* eslint-disable */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "./GoogleIcon";
import { loginWithGoogle } from "../../api/loginWithGoogle";
import useAuth from "../../hooks/useAuth";
const Glogin = () => {
  const { token, decodeTokens, setStatus, status } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginWithGoogle(tokenResponse.access_token).then((res) => {
        decodeTokens(res);
      });
    },
  });
  return (
    <div
      onClick={() => login()}
      className="flex items-center justify-center w-full bg-transparent p-2 text-white rounded-lg cursor-pointer hover:bg-[#58cdff] font-opensans border border-[#58cdff]"
    >
      {/* Google Icon */}
      <div className="mr-4">
        <GoogleIcon />
      </div>
      {/* Text */}
      <div className="font-head font-bold text-sm ml-0">CONTINUE WITH GOOGLE</div>
    </div>
  );
};

export default Glogin;
