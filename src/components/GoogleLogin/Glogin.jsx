/* eslint-disable */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "./GoogleIcon";
import { loginWithGoogle } from "../../api/loginWithGoogle";
import useAuth from "../../hooks/useAuth";
import { useToast } from "@chakra-ui/react";

const Glogin = ({ setJustLoggedInWithGoogle }) => {
  const { decodeTokens, setStatus } = useAuth();
  const toast = useToast();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setStatus("submitting");
        const res = await loginWithGoogle(tokenResponse.access_token);
        if (setJustLoggedInWithGoogle && res?.is_new_user) {
          setJustLoggedInWithGoogle(true);
        }
        await decodeTokens(res);
      } catch (err) {
        console.error("Google login backend error:", err);
        toast({
          title: "Google Login Failed",
          description: err.message || "Failed to authenticate with backend",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setStatus("typing");
      }
    },
    onError: (errorResponse) => {
      console.error("Google OAuth error:", errorResponse);
      toast({
        title: "Google Sign-In Error",
        description:
          errorResponse?.error_description ||
          errorResponse?.error ||
          "Google sign-in was cancelled or popup was blocked. Please enable popups for this site.",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setStatus("typing");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="flex items-center justify-center w-full bg-transparent p-2 text-white rounded-lg cursor-pointer hover:bg-[#58cdff] font-opensans border border-[#58cdff] transition duration-200"
    >
      {/* Google Icon */}
      <div className="mr-4">
        <GoogleIcon />
      </div>
      {/* Text */}
      <div className="font-head font-bold text-sm ml-0">CONTINUE WITH GOOGLE</div>
    </button>
  );
};

export default Glogin;
